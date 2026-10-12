import { NextResponse } from "next/server"
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"
import { randomUUID } from "node:crypto"
import { isIP } from "node:net"

const ALLOWED_ORIGINS = new Set([
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "https://vyomikx.in",
  "https://www.vyomikx.in",
])

if (process.env.NEXT_PUBLIC_SITE_URL) {
  ALLOWED_ORIGINS.add(process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, ""))
}

// In-memory fallback rate limiter for local development
const memoryRateLimit = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000 // 10 minutes
const RATE_LIMIT_MAX = 5

let upstashRatelimit: Ratelimit | null = null

if (
  process.env.UPSTASH_REDIS_REST_URL &&
  process.env.UPSTASH_REDIS_REST_TOKEN
) {
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  })

  upstashRatelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(RATE_LIMIT_MAX, "10 m"),
    analytics: true,
    prefix: "@upstash/ratelimit/vyomikx",
  })
}

export function isValidIp(ip: string): boolean {
  return isIP(ip.trim()) !== 0
}

/**
 * Hardened client IP determination with trusted proxy boundaries:
 * 1. Prioritizes trusted edge headers (x-real-ip, x-vercel-forwarded-for, cf-connecting-ip).
 * 2. Validates IP syntax (IPv4/IPv6).
 * 3. Never groups unknown/unverified traffic into a shared "unknown" key in production.
 */
export function getClientIp(request: Request): string | null {
  const realIp = request.headers.get("x-real-ip")
  if (realIp && isValidIp(realIp)) {
    return realIp.trim()
  }

  const vercelForwardedFor = request.headers.get("x-vercel-forwarded-for")
  if (vercelForwardedFor) {
    const candidate = vercelForwardedFor.split(",")[0].trim()
    if (isValidIp(candidate)) return candidate
  }

  const cfConnectingIp = request.headers.get("cf-connecting-ip")
  if (cfConnectingIp && isValidIp(cfConnectingIp)) {
    return cfConnectingIp.trim()
  }

  const forwardedFor = request.headers.get("x-forwarded-for")
  if (forwardedFor) {
    const candidate = forwardedFor.split(",")[0].trim()
    if (isValidIp(candidate)) return candidate
  }

  if (process.env.NODE_ENV !== "production") {
    return "127.0.0.1"
  }

  return null
}

export function isAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get("origin")
  const referer = request.headers.get("referer")

  let requestOrigin: string | null = null

  if (origin) {
    requestOrigin = origin.toLowerCase().replace(/\/$/, "")
  } else if (referer) {
    try {
      const url = new URL(referer)
      requestOrigin = url.origin.toLowerCase().replace(/\/$/, "")
    } catch {
      requestOrigin = null
    }
  }

  if (!requestOrigin) {
    return false
  }

  return ALLOWED_ORIGINS.has(requestOrigin)
}

export async function checkRateLimit(
  identifier: string
): Promise<{ isLimited: boolean; remaining: number; reset: number }> {
  if (upstashRatelimit) {
    const { success, remaining, reset } = await upstashRatelimit.limit(identifier)
    return { isLimited: !success, remaining, reset }
  }

  // Fail-closed in production if Upstash is absent
  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "Upstash Redis rate limiter is not configured in production environment."
    )
  }

  // In-memory fallback for local development
  const now = Date.now()
  const existing = memoryRateLimit.get(identifier)

  if (!existing || existing.resetAt <= now) {
    memoryRateLimit.set(identifier, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    })
    return { isLimited: false, remaining: RATE_LIMIT_MAX - 1, reset: now + RATE_LIMIT_WINDOW_MS }
  }

  existing.count += 1
  const isLimited = existing.count > RATE_LIMIT_MAX
  const remaining = Math.max(0, RATE_LIMIT_MAX - existing.count)

  return { isLimited, remaining, reset: existing.resetAt }
}

export type ApiGuardConfig = {
  maxBodySize?: number
  routeId?: string
  parseJson?: boolean
}

export type ApiGuardResult<T = unknown> = {
  errorResponse: NextResponse | null
  requestId: string
  data: T | null
}

/**
 * Consumes the request body stream chunk-by-chunk up to maxBodySize bytes.
 * Enforces hard byte limit while actively reading, preventing chunked transfer encoding
 * abuse and bypassed Content-Length headers.
 */
export async function readBoundedJsonStream<T = unknown>(
  request: Request,
  maxBodySize: number,
  requestId: string
): Promise<{ data: T | null; errorResponse: NextResponse | null }> {
  const contentLength = request.headers.get("content-length")
  if (contentLength !== null) {
    const declaredLength = parseInt(contentLength, 10)
    if (Number.isNaN(declaredLength) || declaredLength < 0) {
      const res = NextResponse.json(
        { success: false, error: "Invalid Content-Length header.", requestId },
        { status: 400 }
      )
      res.headers.set("X-Request-ID", requestId)
      res.headers.set("Cache-Control", "no-store")
      return { data: null, errorResponse: res }
    }
    if (declaredLength > maxBodySize) {
      const res = NextResponse.json(
        { success: false, error: "Request body is too large.", requestId },
        { status: 413 }
      )
      res.headers.set("X-Request-ID", requestId)
      res.headers.set("Cache-Control", "no-store")
      return { data: null, errorResponse: res }
    }
  }

  if (!request.body) {
    const res = NextResponse.json(
      { success: false, error: "Missing request body.", requestId },
      { status: 400 }
    )
    res.headers.set("X-Request-ID", requestId)
    res.headers.set("Cache-Control", "no-store")
    return { data: null, errorResponse: res }
  }

  const reader = request.body.getReader()
  const chunks: Uint8Array[] = []
  let totalBytes = 0

  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      if (value) {
        totalBytes += value.byteLength
        if (totalBytes > maxBodySize) {
          await reader.cancel("Payload exceeded size limit")
          const res = NextResponse.json(
            { success: false, error: "Request payload exceeded size limit.", requestId },
            { status: 413 }
          )
          res.headers.set("X-Request-ID", requestId)
          res.headers.set("Cache-Control", "no-store")
          return { data: null, errorResponse: res }
        }
        chunks.push(value)
      }
    }
  } catch {
    const res = NextResponse.json(
      { success: false, error: "Failed to read request body stream.", requestId },
      { status: 400 }
    )
    res.headers.set("X-Request-ID", requestId)
    res.headers.set("Cache-Control", "no-store")
    return { data: null, errorResponse: res }
  }

  if (chunks.length === 0 || totalBytes === 0) {
    const res = NextResponse.json(
      { success: false, error: "Empty request body.", requestId },
      { status: 400 }
    )
    res.headers.set("X-Request-ID", requestId)
    res.headers.set("Cache-Control", "no-store")
    return { data: null, errorResponse: res }
  }

  try {
    const totalBuffer = new Uint8Array(totalBytes)
    let offset = 0
    for (const chunk of chunks) {
      totalBuffer.set(chunk, offset)
      offset += chunk.byteLength
    }
    const rawText = new TextDecoder("utf-8").decode(totalBuffer)
    const parsedData = JSON.parse(rawText) as T
    return { data: parsedData, errorResponse: null }
  } catch {
    const res = NextResponse.json(
      { success: false, error: "Invalid JSON request body.", requestId },
      { status: 400 }
    )
    res.headers.set("X-Request-ID", requestId)
    res.headers.set("Cache-Control", "no-store")
    return { data: null, errorResponse: res }
  }
}

export async function runApiGuard<T = unknown>(
  request: Request,
  config: ApiGuardConfig = {}
): Promise<ApiGuardResult<T>> {
  const requestId = randomUUID()
  const maxBodySize = config.maxBodySize || 20_000
  const routeId = config.routeId || "api"
  const parseJson = config.parseJson ?? false

  // 1. Strict Origin & Referer protection
  if (!isAllowedOrigin(request)) {
    const res = NextResponse.json(
      { success: false, error: "Unauthorized origin.", requestId },
      { status: 403 }
    )
    res.headers.set("X-Request-ID", requestId)
    res.headers.set("Cache-Control", "no-store")
    return { errorResponse: res, requestId, data: null }
  }

  // 2. Client Identity & Multi-dimensional Durable Rate Limiting (IP + route)
  const ip = getClientIp(request)
  if (!ip) {
    const res = NextResponse.json(
      { success: false, error: "Unable to verify trusted client identity.", requestId },
      { status: 400 }
    )
    res.headers.set("X-Request-ID", requestId)
    res.headers.set("Cache-Control", "no-store")
    return { errorResponse: res, requestId, data: null }
  }

  const rateLimitKey = `${routeId}:${ip}`
  
  let isLimited = false
  let remaining = 0
  let reset = Date.now() + 600000

  try {
    const result = await checkRateLimit(rateLimitKey)
    isLimited = result.isLimited
    remaining = result.remaining
    reset = result.reset
  } catch (err) {
    if (process.env.NODE_ENV === "production") {
      const res = NextResponse.json(
        { success: false, error: "Service temporarily unavailable.", requestId },
        { status: 503 }
      )
      res.headers.set("X-Request-ID", requestId)
      res.headers.set("Cache-Control", "no-store")
      return { errorResponse: res, requestId, data: null }
    }
  }

  if (isLimited) {
    const res = NextResponse.json(
      {
        success: false,
        error: "Too many requests. Please wait a few minutes and try again.",
        requestId,
      },
      { status: 429 }
    )
    res.headers.set("X-Request-ID", requestId)
    res.headers.set("Cache-Control", "no-store")
    res.headers.set("Retry-After", "600")
    res.headers.set("X-RateLimit-Limit", String(RATE_LIMIT_MAX))
    res.headers.set("X-RateLimit-Remaining", String(remaining))
    res.headers.set("X-RateLimit-Reset", String(reset))
    return { errorResponse: res, requestId, data: null }
  }

  // 3. Content-Type validation
  const contentType = request.headers.get("content-type") || ""
  if (!contentType.toLowerCase().includes("application/json")) {
    const res = NextResponse.json(
      { success: false, error: "Invalid content type.", requestId },
      { status: 415 }
    )
    res.headers.set("X-Request-ID", requestId)
    res.headers.set("Cache-Control", "no-store")
    return { errorResponse: res, requestId, data: null }
  }

  // 4. Stream consumption or Content-Length verification
  if (parseJson) {
    const streamResult = await readBoundedJsonStream<T>(request, maxBodySize, requestId)
    if (streamResult.errorResponse) {
      return { errorResponse: streamResult.errorResponse, requestId, data: null }
    }
    return { errorResponse: null, requestId, data: streamResult.data }
  }

  const contentLength = request.headers.get("content-length")
  if (contentLength && Number(contentLength) > maxBodySize) {
    const res = NextResponse.json(
      { success: false, error: "Request body is too large.", requestId },
      { status: 413 }
    )
    res.headers.set("X-Request-ID", requestId)
    res.headers.set("Cache-Control", "no-store")
    return { errorResponse: res, requestId, data: null }
  }

  return { errorResponse: null, requestId, data: null }
}

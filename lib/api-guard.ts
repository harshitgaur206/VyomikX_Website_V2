import { NextResponse } from "next/server"
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"
import { randomUUID } from "node:crypto"

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

/**
 * Hardened client IP determination:
 * On Vercel edge runtime, x-real-ip is set by the trusted Vercel proxy.
 * We prioritize x-real-ip to prevent client spoofing via arbitrary x-forwarded-for headers.
 */
export function getClientIp(request: Request): string {
  const realIp = request.headers.get("x-real-ip")
  if (realIp) {
    return realIp.trim()
  }

  const vercelForwardedFor = request.headers.get("x-vercel-forwarded-for")
  if (vercelForwardedFor) {
    return vercelForwardedFor.split(",")[0].trim()
  }

  const forwardedFor = request.headers.get("x-forwarded-for")
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim()
  }

  return "unknown"
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
}

export type ApiGuardResult = {
  errorResponse: NextResponse | null
  requestId: string
}

export async function runApiGuard(
  request: Request,
  config: ApiGuardConfig = {}
): Promise<ApiGuardResult> {
  const requestId = randomUUID()
  const maxBodySize = config.maxBodySize || 20_000
  const routeId = config.routeId || "api"

  // 1. Strict Origin & Referer protection
  if (!isAllowedOrigin(request)) {
    const res = NextResponse.json(
      { success: false, error: "Unauthorized origin.", requestId },
      { status: 403 }
    )
    res.headers.set("X-Request-ID", requestId)
    return { errorResponse: res, requestId }
  }

  // 2. Multi-dimensional Durable Rate Limiting (IP + route)
  const ip = getClientIp(request)
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
        { success: false, error: "Service unavailable.", requestId },
        { status: 503 }
      )
      res.headers.set("X-Request-ID", requestId)
      return { errorResponse: res, requestId }
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
    res.headers.set("Retry-After", "600")
    res.headers.set("X-RateLimit-Limit", String(RATE_LIMIT_MAX))
    res.headers.set("X-RateLimit-Remaining", String(remaining))
    res.headers.set("X-RateLimit-Reset", String(reset))
    return { errorResponse: res, requestId }
  }

  // 3. Content-Type validation
  const contentType = request.headers.get("content-type") || ""
  if (!contentType.toLowerCase().includes("application/json")) {
    const res = NextResponse.json(
      { success: false, error: "Invalid content type.", requestId },
      { status: 415 }
    )
    res.headers.set("X-Request-ID", requestId)
    return { errorResponse: res, requestId }
  }

  // 4. Body size protection
  const contentLength = request.headers.get("content-length")
  if (contentLength && Number(contentLength) > maxBodySize) {
    const res = NextResponse.json(
      { success: false, error: "Request body is too large.", requestId },
      { status: 413 }
    )
    res.headers.set("X-Request-ID", requestId)
    return { errorResponse: res, requestId }
  }

  return { errorResponse: null, requestId }
}

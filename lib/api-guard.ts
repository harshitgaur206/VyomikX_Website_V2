import { NextResponse } from "next/server"
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

const ALLOWED_ORIGINS = new Set([
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "https://vyomikx.in",
  "https://www.vyomikx.in",
])

if (process.env.NEXT_PUBLIC_SITE_URL) {
  ALLOWED_ORIGINS.add(process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, ""))
}

// In-memory fallback rate limiter for local development when Upstash env vars are missing
const memoryRateLimit = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000 // 10 minutes
const RATE_LIMIT_MAX = 5

// Initialize Upstash Ratelimit if UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN exist
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

export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for")
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim()
  }
  return request.headers.get("x-real-ip") || "unknown"
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

  // Reject if neither Origin nor Referer is present, or neither matches allowlist
  if (!requestOrigin) {
    return false
  }

  return ALLOWED_ORIGINS.has(requestOrigin)
}

export async function checkRateLimit(ip: string): Promise<boolean> {
  if (upstashRatelimit) {
    const { success } = await upstashRatelimit.limit(ip)
    return !success
  }

  // In-memory fallback rate limiting
  const now = Date.now()
  const existing = memoryRateLimit.get(ip)

  if (!existing || existing.resetAt <= now) {
    memoryRateLimit.set(ip, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    })
    return false
  }

  existing.count += 1
  return existing.count > RATE_LIMIT_MAX
}

export type ApiGuardConfig = {
  maxBodySize?: number
}

export async function runApiGuard(
  request: Request,
  config: ApiGuardConfig = {}
): Promise<NextResponse | null> {
  const maxBodySize = config.maxBodySize || 20_000

  // 1. Strict Origin & Referer protection
  if (!isAllowedOrigin(request)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized origin." },
      { status: 403 }
    )
  }

  // 2. Durable / Shared Rate Limiting
  const ip = getClientIp(request)
  const isLimited = await checkRateLimit(ip)

  if (isLimited) {
    return NextResponse.json(
      {
        success: false,
        error: "Too many requests. Please wait a few minutes and try again.",
      },
      { status: 429 }
    )
  }

  // 3. Content-Type validation
  const contentType = request.headers.get("content-type") || ""
  if (!contentType.toLowerCase().includes("application/json")) {
    return NextResponse.json(
      { success: false, error: "Invalid content type." },
      { status: 415 }
    )
  }

  // 4. Body size protection
  const contentLength = request.headers.get("content-length")
  if (contentLength && Number(contentLength) > maxBodySize) {
    return NextResponse.json(
      { success: false, error: "Request body is too large." },
      { status: 413 }
    )
  }

  return null
}

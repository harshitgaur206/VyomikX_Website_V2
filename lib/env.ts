import { z } from "zod"

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  DATABASE_URL: z.string().url("DATABASE_URL must be a valid connection string URL."),
  RESEND_API_KEY: z.string().min(1, "RESEND_API_KEY is required."),
  RESEND_FROM_EMAIL: z.string().optional(),
  NEXT_PUBLIC_SITE_URL: z.string().optional(),
  UPSTASH_REDIS_REST_URL: z.string().url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1).optional(),
})

export type Env = z.infer<typeof envSchema>

export function validateEnv(): Env {
  // In production, enforce mandatory distributed rate limiting credentials
  if (process.env.NODE_ENV === "production") {
    const requiredProductionKeys = [
      "DATABASE_URL",
      "RESEND_API_KEY",
      "UPSTASH_REDIS_REST_URL",
      "UPSTASH_REDIS_REST_TOKEN",
    ] as const

    const missing = requiredProductionKeys.filter((key) => !process.env[key])

    if (missing.length > 0) {
      throw new Error(
        `[CRITICAL PRODUCTION CONFIGURATION ERROR] Missing required production environment variables: ${missing.join(", ")}`
      )
    }
  }

  const result = envSchema.safeParse(process.env)

  if (!result.success) {
    if (process.env.NODE_ENV === "production") {
      console.error("Invalid environment variables:", result.error.format())
      throw new Error("Invalid environment configuration.")
    }
  }

  return {
    NODE_ENV: (process.env.NODE_ENV as Env["NODE_ENV"]) || "development",
    DATABASE_URL: process.env.DATABASE_URL || "",
    RESEND_API_KEY: process.env.RESEND_API_KEY || "",
    RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
  }
}

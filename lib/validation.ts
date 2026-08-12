import { z } from "zod"

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function sanitizeText(value: unknown, maxLength: number) {
  if (typeof value !== "string") return ""
  return value.trim().slice(0, maxLength)
}

export function sanitizeHeader(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim()
}

export function jsonError(message: string, status = 400, requestId?: string) {
  const body: Record<string, unknown> = { ok: false, error: message }
  if (requestId) body.requestId = requestId
  const res = Response.json(body, { status })
  if (requestId) res.headers.set("X-Request-ID", requestId)
  return res
}

export function jsonSuccess<T extends Record<string, unknown>>(data: T, requestId?: string) {
  const body: Record<string, unknown> = { ok: true, ...data }
  if (requestId) body.requestId = requestId
  const res = Response.json(body)
  if (requestId) res.headers.set("X-Request-ID", requestId)
  return res
}

export const ALLOWED_CONTACT_TYPES = [
  "School Visit Request",
  "Join a Workshop",
  "Workshop for a School",
  "Request Free Learning Guide",
  "Borrow Equipment",
  "Donate Spare Parts",
  "Mentor a Student",
  "Support Our Work",
  "Collaboration / Partnership",
  "General Inquiry",
] as const

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(120),
  email: z.string().trim().email("Please enter a valid email address.").max(200),
  organization: z.string().trim().max(200).default("Individual Student / Builder"),
  type: z.enum(ALLOWED_CONTACT_TYPES).default("General Inquiry"),
  message: z.string().trim().min(1, "Please enter your message or request details.").max(4000),
  phone: z.string().trim().max(30).optional().default(""),
  preferredTime: z.string().trim().max(60).optional().default(""),
  website: z.string().trim().max(200).optional().default(""),
})

export const feedbackSchema = z.object({
  name: z.string().trim().max(120).optional().nullable(),
  email: z.string().trim().email("Please enter a valid email.").max(200).optional().nullable().or(z.literal("")),
  rating: z.number().int().min(1, "Please select a rating from 1 to 5.").max(5),
  message: z.string().trim().min(1, "Please share your feedback.").max(2000),
  page: z.string().trim().max(200).optional().nullable(),
})

import { z } from "zod"

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function sanitizeText(value: unknown, maxLength: number) {
  if (typeof value !== "string") return ""
  return value.trim().slice(0, maxLength)
}

export function jsonError(message: string, status = 400) {
  return Response.json({ ok: false, error: message }, { status })
}

export function jsonSuccess<T extends Record<string, unknown>>(data: T) {
  return Response.json({ ok: true, ...data })
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

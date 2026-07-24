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

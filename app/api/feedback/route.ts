import { saveFeedbackSubmission } from "@/lib/db"
import { isValidEmail, jsonError, jsonSuccess, sanitizeText } from "@/lib/validation"

export const runtime = "nodejs"

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return jsonError("Invalid JSON body.")
  }

  if (!body || typeof body !== "object") {
    return jsonError("Invalid request body.")
  }

  const data = body as Record<string, unknown>
  const name = sanitizeText(data.name, 120) || null
  const emailRaw = sanitizeText(data.email, 200)
  const email = emailRaw || null
  const message = sanitizeText(data.message, 2000)
  const page = sanitizeText(data.page, 200) || null
  const rating = Number(data.rating)

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return jsonError("Please select a rating from 1 to 5.")
  }
  if (!message) return jsonError("Please share your feedback.")
  if (email && !isValidEmail(email)) return jsonError("Please enter a valid email.")

  try {
    const submission = await saveFeedbackSubmission({
      name,
      email,
      rating,
      message,
      page,
    })
    return jsonSuccess({ id: submission.id })
  } catch {
    return jsonError("Could not save your feedback. Please try again.", 500)
  }
}

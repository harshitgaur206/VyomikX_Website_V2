import { saveFeedbackSubmission } from "@/lib/db"
import { feedbackSchema, jsonError, jsonSuccess } from "@/lib/validation"
import { runApiGuard } from "@/lib/api-guard"
import { logEvent } from "@/lib/logger"

export const runtime = "nodejs"

const MAX_BODY_SIZE = 10_000

export async function POST(request: Request) {
  const { errorResponse, requestId } = await runApiGuard(request, {
    maxBodySize: MAX_BODY_SIZE,
    routeId: "feedback",
  })
  if (errorResponse) return errorResponse

  let jsonBody: unknown
  try {
    jsonBody = await request.json()
  } catch {
    return jsonError("Invalid JSON body.", 400, requestId)
  }

  const parsed = feedbackSchema.safeParse(jsonBody)
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0]?.message || "Invalid input."
    return jsonError(firstIssue, 400, requestId)
  }

  const { name, email, rating, message, page } = parsed.data

  try {
    const submission = await saveFeedbackSubmission({
      name: name || null,
      email: email || null,
      rating,
      message,
      page: page || null,
    })

    logEvent({
      level: "info",
      route: "/api/feedback",
      message: "Feedback submission processed successfully",
      meta: { submissionId: submission.id, requestId },
    })

    return jsonSuccess({ id: submission.id }, requestId)
  } catch (error) {
    logEvent({
      level: "error",
      route: "/api/feedback",
      message: "Save feedback submission failed",
      meta: { requestId },
      error,
    })
    return jsonError("Could not save your feedback. Please try again.", 500, requestId)
  }
}

import { NextResponse } from "next/server"
import { Resend } from "resend"
import { saveContactSubmission } from "@/lib/db"
import {
  contactSchema,
  jsonError,
  jsonSuccess,
  sanitizeHeader,
} from "@/lib/validation"
import { runApiGuard } from "@/lib/api-guard"
import { logEvent } from "@/lib/logger"

export const runtime = "nodejs"

const TARGET_EMAIL = "hgaur9368@gmail.com"
const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "VyomikX Website <onboarding@resend.dev>"
const MAX_BODY_SIZE = 20_000

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

async function sendEmailNotification(
  submission: {
    id: string
    name: string
    email: string
    organization: string
    type: string
    message: string
    phone?: string
    preferredTime?: string
    createdAt: string
  },
  requestId: string
) {
  // Check for API key inside the execution context
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw new Error("RESEND_API_KEY environment variable is not defined.")
  }

  // Instantiate Resend lazily here
  const resend = new Resend(apiKey)

  const safeId = escapeHtml(submission.id)
  const safeName = escapeHtml(submission.name)
  const safeEmail = escapeHtml(submission.email)
  const safeOrganization = escapeHtml(submission.organization)
  const safeType = escapeHtml(submission.type)
  const safeMessage = escapeHtml(submission.message)
  const safePhone = escapeHtml(submission.phone || "Not provided")
  const safePreferredTime = escapeHtml(
    submission.preferredTime || "Flexible / Anytime"
  )
  const safeCreatedAt = escapeHtml(submission.createdAt)

  // Sanitize subject line against CRLF injection
  const safeHeaderSubject = sanitizeHeader(`[VyomikX Contact] ${submission.type} - ${submission.name}`)
  const safeReplyTo = sanitizeHeader(submission.email)

  const mailHtml = `
    <div style="font-family:Arial,sans-serif;padding:24px;color:#333;max-width:600px;margin:0 auto;border:1px solid #e2e8f0;border-radius:12px;">
      <h2 style="color:#735c48;margin-top:0;">New VyomikX Contact Submission</h2>
      <p style="font-size:13px;color:#64748b;">Submitted: ${safeCreatedAt} | Request ID: ${requestId}</p>
      <hr style="border:none;border-top:1px solid #e2e8f0;margin:16px 0;" />
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr><td style="padding:6px 0;font-weight:bold;width:140px;">Submission ID:</td><td>${safeId}</td></tr>
        <tr><td style="padding:6px 0;font-weight:bold;">Full Name:</td><td>${safeName}</td></tr>
        <tr><td style="padding:6px 0;font-weight:bold;">Email Address:</td><td><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
        <tr><td style="padding:6px 0;font-weight:bold;">Phone Number:</td><td>${safePhone}</td></tr>
        <tr><td style="padding:6px 0;font-weight:bold;">School / Org:</td><td>${safeOrganization}</td></tr>
        <tr><td style="padding:6px 0;font-weight:bold;">Request Category:</td><td><span style="background:#f1f5f9;padding:3px 8px;border-radius:4px;font-weight:600;">${safeType}</span></td></tr>
        <tr><td style="padding:6px 0;font-weight:bold;">Preferred Time:</td><td>${safePreferredTime}</td></tr>
      </table>
      <hr style="border:none;border-top:1px solid #e2e8f0;margin:20px 0;" />
      <h3 style="font-size:15px;margin-bottom:8px;">Details &amp; Message</h3>
      <div style="background:#f9f6f0;padding:16px;border-radius:8px;font-size:14px;line-height:1.6;white-space:pre-wrap;">${safeMessage}</div>
      <hr style="border:none;border-top:1px solid #e2e8f0;margin:20px 0;" />
      <p style="font-size:12px;color:#94a3b8;text-align:center;margin-bottom:0;">Submitted through the VyomikX website.</p>
    </div>
  `

  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [TARGET_EMAIL],
    replyTo: safeReplyTo,
    subject: safeHeaderSubject,
    html: mailHtml,
  })

  if (error) {
    logEvent({
      level: "error",
      route: "/api/contact",
      message: "Resend email send error",
      meta: { requestId },
      error,
    })
    throw new Error(error.message)
  }

  return data
}

export async function POST(request: Request) {
  try {
    const { errorResponse, requestId } = await runApiGuard(request, {
      maxBodySize: MAX_BODY_SIZE,
      routeId: "contact",
    })
    if (errorResponse) return errorResponse

    let jsonBody: unknown
    try {
      jsonBody = await request.json()
    } catch {
      return jsonError("Invalid JSON request body.", 400, requestId)
    }

    const parsed = contactSchema.safeParse(jsonBody)
    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0]?.message || "Invalid input."
      return jsonError(firstIssue, 400, requestId)
    }

    const { name, email, organization, type, message, phone, preferredTime, website } = parsed.data

    // Honeypot check
    if (website) {
      logEvent({
        level: "warn",
        route: "/api/contact",
        message: "Honeypot triggered by bot",
        meta: { requestId },
      })
      return jsonSuccess(
        {
          status: "RECEIVED",
          message: "Thank you! Your request has been received.",
        },
        requestId
      )
    }

    let submission
    try {
      submission = await saveContactSubmission({
        name,
        email,
        organization,
        type,
        message,
      })
    } catch (error) {
      logEvent({
        level: "error",
        route: "/api/contact",
        message: "Database save contact submission failed",
        meta: { requestId },
        error,
      })
      return jsonError("We couldn't save your request. Please try again.", 500, requestId)
    }

    try {
      await sendEmailNotification(
        {
          ...submission,
          phone,
          preferredTime,
        },
        requestId
      )
    } catch (error) {
      logEvent({
        level: "error",
        route: "/api/contact",
        message: "Contact email notification failed",
        meta: { requestId },
        error,
      })
      const res = NextResponse.json(
        {
          success: false,
          error: "Your request was saved, but we couldn't send the notification email.",
          requestId,
        },
        { status: 503 }
      )
      res.headers.set("X-Request-ID", requestId)
      return res
    }

    logEvent({
      level: "info",
      route: "/api/contact",
      message: "Contact submission processed successfully",
      meta: { submissionId: submission.id, requestId },
    })

    const successRes = NextResponse.json(
      {
        success: true,
        id: submission.id,
        status: "RECEIVED",
        message: "Thank you! Your request has been received.",
        requestId,
      },
      { status: 200 }
    )
    successRes.headers.set("X-Request-ID", requestId)
    return successRes

  } catch (err) {
    console.error("CRITICAL API ROUTE CRASH:", err)
    return NextResponse.json(
      { success: false, error: String(err) },
      { status: 500 }
    )
  }
}
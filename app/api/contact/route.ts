import { NextResponse } from "next/server"
import { Resend } from "resend"
import { saveContactSubmission } from "@/lib/db"
import {
  isValidEmail,
  jsonError,
  jsonSuccess,
  sanitizeText,
} from "@/lib/validation"

export const runtime = "nodejs"

const resend = new Resend(process.env.RESEND_API_KEY)

const TARGET_EMAIL = "vyomikx@gmail.com"

// Use your verified domain here in production.
// Example:
// const FROM_EMAIL = "VyomikX Website <hello@vyomikx.in>"
const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "VyomikX Website <onboarding@resend.dev>"

const MAX_BODY_SIZE = 20_000

const ALLOWED_TYPES = new Set([
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
])

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

async function sendEmailNotification(submission: {
  id: string
  name: string
  email: string
  organization: string
  type: string
  message: string
  phone?: string
  preferredTime?: string
  createdAt: string
}) {
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

  const mailSubject = `[VyomikX Contact] ${submission.type} - ${submission.name}`

  const mailHtml = `
    <div style="font-family:Arial,sans-serif;padding:24px;color:#333;max-width:600px;margin:0 auto;border:1px solid #e2e8f0;border-radius:12px;">
      
      <h2 style="color:#735c48;margin-top:0;">
        New VyomikX Contact Submission
      </h2>

      <p style="font-size:13px;color:#64748b;">
        Submitted: ${safeCreatedAt}
      </p>

      <hr style="border:none;border-top:1px solid #e2e8f0;margin:16px 0;" />

      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr>
          <td style="padding:6px 0;font-weight:bold;width:140px;">
            Submission ID:
          </td>
          <td>${safeId}</td>
        </tr>

        <tr>
          <td style="padding:6px 0;font-weight:bold;">
            Full Name:
          </td>
          <td>${safeName}</td>
        </tr>

        <tr>
          <td style="padding:6px 0;font-weight:bold;">
            Email Address:
          </td>
          <td>
            <a href="mailto:${safeEmail}">
              ${safeEmail}
            </a>
          </td>
        </tr>

        <tr>
          <td style="padding:6px 0;font-weight:bold;">
            Phone Number:
          </td>
          <td>${safePhone}</td>
        </tr>

        <tr>
          <td style="padding:6px 0;font-weight:bold;">
            School / Org:
          </td>
          <td>${safeOrganization}</td>
        </tr>

        <tr>
          <td style="padding:6px 0;font-weight:bold;">
            Request Category:
          </td>
          <td>
            <span style="background:#f1f5f9;padding:3px 8px;border-radius:4px;font-weight:600;">
              ${safeType}
            </span>
          </td>
        </tr>

        <tr>
          <td style="padding:6px 0;font-weight:bold;">
            Preferred Time:
          </td>
          <td>${safePreferredTime}</td>
        </tr>
      </table>

      <hr style="border:none;border-top:1px solid #e2e8f0;margin:20px 0;" />

      <h3 style="font-size:15px;margin-bottom:8px;">
        Details &amp; Message
      </h3>

      <div style="background:#f9f6f0;padding:16px;border-radius:8px;font-size:14px;line-height:1.6;white-space:pre-wrap;">
        ${safeMessage}
      </div>

      <hr style="border:none;border-top:1px solid #e2e8f0;margin:20px 0;" />

      <p style="font-size:12px;color:#94a3b8;text-align:center;margin-bottom:0;">
        Submitted through the VyomikX website.
      </p>

    </div>
  `

  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [TARGET_EMAIL],
    replyTo: submission.email,
    subject: mailSubject,
    html: mailHtml,
  })

 if (error) {
  console.error("RESEND ERROR:", error)
  throw new Error(error.message)
}

  return data
}

import { runApiGuard } from "@/lib/api-guard"

export async function POST(request: Request) {
  const guardError = await runApiGuard(request, { maxBodySize: MAX_BODY_SIZE })
  if (guardError) return guardError

  let body: unknown

  try {
    body = await request.json()
  } catch {
    return jsonError("Invalid JSON request body.", 400)
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return jsonError("Invalid request payload.", 400)
  }

  const data = body as Record<string, unknown>

  /*
   * 5. Honeypot.
   *
   * Add a hidden "website" field to the frontend.
   * Normal users leave it empty.
   * Simple bots often fill it.
   */
  const honeypot = sanitizeText(data.website, 200)

  if (honeypot) {
    // Return a normal-looking success response.
    // Don't tell bots that they were detected.
    return jsonSuccess({
      status: "RECEIVED",
      message: "Thank you! Your request has been received.",
    })
  }

  /*
   * 6. Sanitize and limit all incoming fields
   */
  const name = sanitizeText(data.name, 120)
  const email = sanitizeText(data.email, 200)
  const organization =
    sanitizeText(data.organization, 200) ||
    "Individual Student / Builder"

  const type = sanitizeText(data.type, 100) || "General Inquiry"

  const message = sanitizeText(data.message, 4000)

  const phone = sanitizeText(data.phone, 30) || ""

  const preferredTime =
    sanitizeText(data.preferredTime, 60) || ""

  /*
   * 7. Validation
   */
  if (!name) {
    return jsonError("Please enter your name.")
  }

  if (!email) {
    return jsonError("Please enter your email address.")
  }

  if (!isValidEmail(email)) {
    return jsonError("Please enter a valid email address.")
  }

  if (!message) {
    return jsonError("Please enter your message or request details.")
  }

  if (!ALLOWED_TYPES.has(type)) {
    return jsonError("Invalid request category.")
  }

  /*
   * 8. Save to database
   */
  let submission: {
    id: string
    name: string
    email: string
    organization: string
    type: string
    message: string
    createdAt: string
  }

  try {
    submission = await saveContactSubmission({
      name,
      email,
      organization,
      type,
      message,
    })
  } catch (error) {
    console.error("Database save failed:", error)

    return jsonError(
      "We couldn't save your request. Please try again.",
      500
    )
  }

  /*
   * 9. Send email
   */
  try {
    await sendEmailNotification({
      ...submission,
      phone,
      preferredTime,
    })
  }  catch (error) {
  console.error("CONTACT EMAIL FAILED:", error)

  return NextResponse.json(
  {
    success: false,
    error:
      "Your request was saved, but we couldn't send the notification email.",
  },
  { status: 503 }
)
}

  /*
   * 10. Success
   */
return NextResponse.json(
  {
    success: true,
    id: submission.id,
    status: "RECEIVED",
    message: "Thank you! Your request has been received.",
  },
  { status: 200 }
)
}
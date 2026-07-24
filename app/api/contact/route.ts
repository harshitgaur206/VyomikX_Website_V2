import { appendFile, mkdir, readFile, writeFile } from "fs/promises"
import path from "path"
import nodemailer from "nodemailer"
import { saveContactSubmission } from "@/lib/db"
import { isValidEmail, jsonError, jsonSuccess, sanitizeText } from "@/lib/validation"

export const runtime = "nodejs"

const TARGET_EMAIL = "vyomikX@gmail.com"

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
  const mailSubject = `[VyomikX Contact] ${submission.type} - ${submission.name}`
  const mailHtml = `
    <div style="font-family: Arial, sans-serif; padding: 24px; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px;">
      <h2 style="color: #735c48; margin-top: 0;">New VyomikX Contact Submission</h2>
      <p style="font-size: 13px; color: #64748b;">Telemetry timestamp: ${submission.createdAt}</p>
      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
      
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr><td style="padding: 6px 0; font-weight: bold; width: 140px;">Submission ID:</td><td>${submission.id}</td></tr>
        <tr><td style="padding: 6px 0; font-weight: bold;">Full Name:</td><td>${submission.name}</td></tr>
        <tr><td style="padding: 6px 0; font-weight: bold;">Email Address:</td><td><a href="mailto:${submission.email}">${submission.email}</a></td></tr>
        <tr><td style="padding: 6px 0; font-weight: bold;">Phone Number:</td><td>${submission.phone || "Not provided"}</td></tr>
        <tr><td style="padding: 6px 0; font-weight: bold;">School / Org:</td><td>${submission.organization}</td></tr>
        <tr><td style="padding: 6px 0; font-weight: bold;">Request Category:</td><td><span style="background: #f1f5f9; padding: 3px 8px; border-radius: 4px; font-weight: 600;">${submission.type}</span></td></tr>
        <tr><td style="padding: 6px 0; font-weight: bold;">Preferred Time:</td><td>${submission.preferredTime || "Flexible / Anytime"}</td></tr>
      </table>

      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
      <h3 style="font-size: 15px; margin-bottom: 8px;">Details &amp; Message:</h3>
      <div style="background: #f9f6f0; padding: 16px; border-radius: 8px; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">
        ${submission.message}
      </div>

      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
      <p style="font-size: 12px; color: #94a3b8; text-align: center; margin-bottom: 0;">
        Forwarded directly to vyomikX@gmail.com &amp; saved to SQL Database.
      </p>
    </div>
  `

  const user = process.env.GMAIL_USER || process.env.SMTP_USER
  const pass = process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS

  if (user && pass) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user, pass },
      })

      await transporter.sendMail({
        from: `VyomikX Web Platform <${user}>`,
        to: TARGET_EMAIL,
        subject: mailSubject,
        html: mailHtml,
        replyTo: submission.email,
      })
    } catch {
      await logOutboundEmail(submission, mailSubject)
    }
  } else {
    await logOutboundEmail(submission, mailSubject)
  }
}

async function logOutboundEmail(submission: unknown, subject: string) {
  try {
    const DATA_DIR = path.join(process.cwd(), "data")
    await mkdir(DATA_DIR, { recursive: true })
    const logFile = path.join(DATA_DIR, "outbound_emails.json")

    const emailRecord = {
      target: TARGET_EMAIL,
      subject,
      submission,
      timestamp: new Date().toISOString(),
      status: "LOGGED_OUTBOUND_QUEUE",
    }

    const raw = await readFile(logFile, "utf-8").catch(() => '{"emails":[]}')
    const store = JSON.parse(raw) as { emails: unknown[] }
    store.emails.unshift(emailRecord)
    await writeFile(logFile, JSON.stringify(store, null, 2), "utf-8")
  } catch {
    // Graceful fallback
  }
}

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return jsonError("Invalid JSON request body.")
  }

  if (!body || typeof body !== "object") {
    return jsonError("Invalid request payload.")
  }

  const data = body as Record<string, unknown>
  const name = sanitizeText(data.name, 120)
  const email = sanitizeText(data.email, 200)
  const organization = sanitizeText(data.organization, 200) || "Individual Student / Builder"
  const type = sanitizeText(data.type, 100) || "General Inquiry"
  const message = sanitizeText(data.message, 4000)
  const phone = sanitizeText(data.phone, 30) || ""
  const preferredTime = sanitizeText(data.preferredTime, 60) || ""

  if (!name) return jsonError("Please enter your name.")
  if (!email) return jsonError("Please enter your email address.")
  if (!isValidEmail(email)) return jsonError("Please enter a valid email address.")
  if (!message) return jsonError("Please enter a brief message or request description.")

  try {
    const submission = await saveContactSubmission({
      name,
      email,
      organization,
      type,
      message,
    })

    const fullPayload = {
      ...submission,
      phone,
      preferredTime,
    }

    // Forward email notification cleanly without throwing
    try {
      await sendEmailNotification(fullPayload)
    } catch {
      // Ignore email errors to ensure client response succeeds
    }

    return jsonSuccess({ id: submission.id, status: "SAVED_AND_FORWARDED" })
  } catch {
    return jsonError("Could not process your submission. Please try again.", 500)
  }
}

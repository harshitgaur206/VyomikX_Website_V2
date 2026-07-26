import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export type ContactSubmission = {
  id: string
  name: string
  email: string
  organization: string
  type: string
  message: string
  createdAt: string
}

export type FeedbackSubmission = {
  id: string
  name: string | null
  email: string | null
  rating: number
  message: string
  page: string | null
  createdAt: string
}

function newId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export async function saveContactSubmission(
  data: Omit<ContactSubmission, "id" | "createdAt">
): Promise<ContactSubmission> {
  const entry: ContactSubmission = {
    id: newId(),
    createdAt: new Date().toISOString(),
    ...data,
  }

  await sql`
    INSERT INTO contact_submissions
    (
      id,
      name,
      email,
      organization,
      type,
      message,
      created_at
    )
    VALUES
    (
      ${entry.id},
      ${entry.name},
      ${entry.email},
      ${entry.organization},
      ${entry.type},
      ${entry.message},
      ${entry.createdAt}
    )
  `

  return entry
}

export async function saveFeedbackSubmission(
  data: Omit<FeedbackSubmission, "id" | "createdAt">
): Promise<FeedbackSubmission> {
  const entry: FeedbackSubmission = {
    id: newId(),
    createdAt: new Date().toISOString(),
    ...data,
  }

  await sql`
    INSERT INTO feedback_submissions
    (
      id,
      name,
      email,
      rating,
      message,
      page,
      created_at
    )
    VALUES
    (
      ${entry.id},
      ${entry.name},
      ${entry.email},
      ${entry.rating},
      ${entry.message},
      ${entry.page},
      ${entry.createdAt}
    )
  `

  return entry
}
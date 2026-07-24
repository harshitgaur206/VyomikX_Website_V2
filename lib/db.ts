import { appendFile, mkdir, readFile, writeFile } from "fs/promises"
import path from "path"

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

type Store<T> = { items: T[] }

const DATA_DIR = path.join(process.cwd(), "data")

async function ensureDataDir() {
  await mkdir(DATA_DIR, { recursive: true })
}

async function readStore<T>(filename: string): Promise<Store<T>> {
  await ensureDataDir()
  const filePath = path.join(DATA_DIR, filename)
  try {
    const raw = await readFile(filePath, "utf-8")
    return JSON.parse(raw) as Store<T>
  } catch {
    return { items: [] }
  }
}

async function writeStore<T>(filename: string, store: Store<T>) {
  await ensureDataDir()
  const filePath = path.join(DATA_DIR, filename)
  await writeFile(filePath, JSON.stringify(store, null, 2), "utf-8")
}

function escapeSql(str: string): string {
  return str.replace(/'/g, "''")
}

async function appendSqlSubmission(entry: ContactSubmission) {
  await ensureDataDir()
  const sqlFile = path.join(DATA_DIR, "contact_submissions.sql")
  
  const createTableStmt = `-- Contact Submissions SQL Database File
CREATE TABLE IF NOT EXISTS contact_submissions (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  organization TEXT NOT NULL,
  type TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);\n\n`

  try {
    const exists = await readFile(sqlFile, "utf-8").then(() => true).catch(() => false)
    if (!exists) {
      await writeFile(sqlFile, createTableStmt, "utf-8")
    }

    const insertStmt = `INSERT INTO contact_submissions (id, name, email, organization, type, message, created_at) VALUES ('${escapeSql(
      entry.id,
    )}', '${escapeSql(entry.name)}', '${escapeSql(entry.email)}', '${escapeSql(
      entry.organization,
    )}', '${escapeSql(entry.type)}', '${escapeSql(entry.message)}', '${escapeSql(
      entry.createdAt,
    )}');\n`

    await appendFile(sqlFile, insertStmt, "utf-8")
  } catch {
    // Gracefully handle file append
  }
}

function newId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export async function saveContactSubmission(
  data: Omit<ContactSubmission, "id" | "createdAt">,
): Promise<ContactSubmission> {
  const store = await readStore<ContactSubmission>("contact-submissions.json")
  const entry: ContactSubmission = {
    id: newId(),
    createdAt: new Date().toISOString(),
    ...data,
  }
  store.items.unshift(entry)
  await writeStore("contact-submissions.json", store)
  
  // Write to SQL Database File
  await appendSqlSubmission(entry)

  return entry
}

export async function saveFeedbackSubmission(
  data: Omit<FeedbackSubmission, "id" | "createdAt">,
): Promise<FeedbackSubmission> {
  const store = await readStore<FeedbackSubmission>("feedback-submissions.json")
  const entry: FeedbackSubmission = {
    id: newId(),
    createdAt: new Date().toISOString(),
    ...data,
  }
  store.items.unshift(entry)
  await writeStore("feedback-submissions.json", store)
  return entry
}

import { appendFile, mkdir, readFile, writeFile } from "fs/promises"
import os from "os"
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

// Determine safe data directory (fallback to OS temp directory if process.cwd() is read-only)
const LOCAL_DATA_DIR = path.join(process.cwd(), "data")
const TMP_DATA_DIR = path.join(os.tmpdir(), "vyomikx-data")

async function getWritableDataDir(): Promise<string> {
  try {
    await mkdir(LOCAL_DATA_DIR, { recursive: true })
    // Test write permission
    const testFile = path.join(LOCAL_DATA_DIR, ".write-test")
    await writeFile(testFile, "test", "utf-8")
    return LOCAL_DATA_DIR
  } catch {
    // Fallback to temp directory on Vercel / serverless environments
    try {
      await mkdir(TMP_DATA_DIR, { recursive: true })
      return TMP_DATA_DIR
    } catch {
      return TMP_DATA_DIR
    }
  }
}

async function readStore<T>(filename: string): Promise<Store<T>> {
  try {
    const dataDir = await getWritableDataDir()
    const filePath = path.join(dataDir, filename)
    const raw = await readFile(filePath, "utf-8")
    return JSON.parse(raw) as Store<T>
  } catch {
    return { items: [] }
  }
}

async function writeStore<T>(filename: string, store: Store<T>) {
  try {
    const dataDir = await getWritableDataDir()
    const filePath = path.join(dataDir, filename)
    await writeFile(filePath, JSON.stringify(store, null, 2), "utf-8")
  } catch {
    // Gracefully handle read-only disk in serverless runtime
  }
}

function escapeSql(str: string): string {
  return str.replace(/'/g, "''")
}

async function appendSqlSubmission(entry: ContactSubmission) {
  try {
    const dataDir = await getWritableDataDir()
    const sqlFile = path.join(dataDir, "contact_submissions.sql")

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
    // Gracefully handle file write errors
  }
}

function newId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export async function saveContactSubmission(
  data: Omit<ContactSubmission, "id" | "createdAt">,
): Promise<ContactSubmission> {
  const entry: ContactSubmission = {
    id: newId(),
    createdAt: new Date().toISOString(),
    ...data,
  }

  try {
    const store = await readStore<ContactSubmission>("contact-submissions.json")
    store.items.unshift(entry)
    await writeStore("contact-submissions.json", store)
    await appendSqlSubmission(entry)
  } catch {
    // Never fail submission if disk write is blocked
  }

  return entry
}

export async function saveFeedbackSubmission(
  data: Omit<FeedbackSubmission, "id" | "createdAt">,
): Promise<FeedbackSubmission> {
  const entry: FeedbackSubmission = {
    id: newId(),
    createdAt: new Date().toISOString(),
    ...data,
  }

  try {
    const store = await readStore<FeedbackSubmission>("feedback-submissions.json")
    store.items.unshift(entry)
    await writeStore("feedback-submissions.json", store)
  } catch {
    // Never fail feedback if disk write is blocked
  }

  return entry
}

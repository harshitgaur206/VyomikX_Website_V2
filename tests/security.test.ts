import { isAllowedOrigin, checkRateLimit } from "@/lib/api-guard"
import { contactSchema, feedbackSchema, sanitizeHeader } from "@/lib/validation"

describe("VyomikX API Security Suite", () => {
  test("Origin Guard rejects missing origin and referer", () => {
    const req = new Request("https://vyomikx.in/api/contact", { method: "POST" })
    expect(isAllowedOrigin(req)).toBe(false)
  })

  test("Origin Guard rejects attacker domain", () => {
    const req = new Request("https://vyomikx.in/api/contact", {
      method: "POST",
      headers: { origin: "https://malicious-hacker.com" },
    })
    expect(isAllowedOrigin(req)).toBe(false)
  })

  test("Origin Guard accepts valid domain origin", () => {
    const req = new Request("https://vyomikx.in/api/contact", {
      method: "POST",
      headers: { origin: "https://vyomikx.in" },
    })
    expect(isAllowedOrigin(req)).toBe(true)
  })

  test("Contact schema rejects invalid emails", () => {
    const res = contactSchema.safeParse({
      name: "Test User",
      email: "invalid-email-string",
      message: "Hello VyomikX",
    })
    expect(res.success).toBe(false)
  })

  test("Contact schema rejects oversized message payload", () => {
    const res = contactSchema.safeParse({
      name: "Test User",
      email: "test@vyomikx.in",
      message: "a".repeat(4001),
    })
    expect(res.success).toBe(false)
  })

  test("CRLF Email Header Sanitization strips newline characters", () => {
    const subjectWithCRLF = "Subject Line\r\nBcc: hacker@evil.com"
    const safe = sanitizeHeader(subjectWithCRLF)
    expect(safe).toBe("Subject Line  Bcc: hacker@evil.com")
    expect(safe).not.toContain("\r")
    expect(safe).not.toContain("\n")
  })
})

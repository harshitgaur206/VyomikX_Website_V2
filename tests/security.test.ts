import { isAllowedOrigin, checkRateLimit, isValidIp, getClientIp } from "@/lib/api-guard"
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

  test("Contact schema accepts and preserves honeypot fields without type mismatches", () => {
    const res = contactSchema.safeParse({
      name: "Legit Human",
      email: "human@vyomikx.in",
      message: "I want to attend a workshop",
      companyWebsiteX9: "http://bot-spam.com",
      website: "http://another-spam.com",
    })
    expect(res.success).toBe(true)
    if (res.success) {
      expect(res.data.companyWebsiteX9).toBe("http://bot-spam.com")
      expect(res.data.website).toBe("http://another-spam.com")
    }
  })

  test("IP Validator correctly validates IPv4 and IPv6 syntax", () => {
    expect(isValidIp("192.168.1.1")).toBe(true)
    expect(isValidIp("203.0.113.195")).toBe(true)
    expect(isValidIp("::1")).toBe(true)
    expect(isValidIp("2001:db8::1")).toBe(true)
    expect(isValidIp("malicious-domain.com")).toBe(false)
    expect(isValidIp("999.999.999.999")).toBe(false)
    expect(isValidIp("192.168.1.1; DROP TABLE users;")).toBe(false)
  })

  test("CRLF Email Header Sanitization strips newline characters", () => {
    const subjectWithCRLF = "Subject Line\r\nBcc: hacker@evil.com"
    const safe = sanitizeHeader(subjectWithCRLF)
    expect(safe).toBe("Subject Line Bcc: hacker@evil.com")
    expect(safe).not.toContain("\r")
    expect(safe).not.toContain("\n")
  })
})

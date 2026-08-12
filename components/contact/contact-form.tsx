"use client"

import { useState, type FormEvent } from "react"
import { CheckCircle2, Cpu, Loader2, Send, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Errors = Partial<Record<"name" | "email" | "type" | "message", string>>

const requestPresets = [
  { label: "School Visit Request", type: "School Visit Request" },
  { label: "Join a Workshop", type: "Join a Workshop" },
  { label: "Equipment Loan", type: "Borrow Equipment" },
  { label: "Mentor a Student", type: "Mentor a Student" },
  { label: "General Inquiry", type: "General Inquiry" },
]

const requestTypes = [
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
]

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle")
  const [type, setType] = useState("School Visit Request")
  const [errors, setErrors] = useState<Errors>({})
  const [apiError, setApiError] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setApiError(null)
    const form = e.currentTarget
    const data = new FormData(form)
    const name = String(data.get("name") || "").trim()
    const email = String(data.get("email") || "").trim()
    const phone = String(data.get("phone") || "").trim()
    const organization = String(data.get("organization") || "").trim()
    const preferredTime = String(data.get("preferredTime") || "").trim()
    const message = String(data.get("message") || "").trim()

    const nextErrors: Errors = {}
    if (!name) nextErrors.name = "Please enter your name."
    if (!email) nextErrors.email = "Please enter your email address."
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      nextErrors.email = "Please enter a valid email address."
    if (!type) nextErrors.type = "Please choose a request type."
    if (!message) nextErrors.message = "Please enter your message or request details."

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setStatus("submitting")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          organization: organization || "Individual Student / Builder",
          type,
          preferredTime,
          message,
        }),
      })
      const result = await res.json()
      if (!res.ok || !result.success) {
        throw new Error(result.error || "Failed to submit request.")
      }
      setStatus("success")
      form.reset()
    } catch (err: unknown) {
      setApiError(err instanceof Error ? err.message : "Submission failed.")
      setStatus("idle")
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center rounded-3xl border border-emerald-500/30 bg-emerald-500/5 p-10 text-center shadow-lg backdrop-blur-md">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20">
          <CheckCircle2 className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs text-emerald-600 dark:text-emerald-400">
          <Cpu className="h-3.5 w-3.5" />
          <p className="mt-2 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
  Thank you! Your request has been received successfully. Our team has been
  notified and will get back to you shortly.
</p>
        </div>
        <h3 className="mt-3 font-display text-2xl font-bold text-foreground">Request Submitted Successfully</h3>
        <p className="mt-2 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
          Thank you! Your submission has been forwarded directly to <strong>vyomikx@gmail.com</strong>. We will get back to you shortly.
        </p>
        <Button className="mt-6 rounded-full bg-primary px-7 text-primary-foreground hover:opacity-90" onClick={() => setStatus("idle")}>
          Send Another Message
        </Button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="relative rounded-3xl border border-border bg-card p-6 shadow-xl backdrop-blur-md sm:p-8"
    >
      {/* Top Telemetry Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-2 border-b border-border/70 pb-4">
        <div className="flex items-center gap-2 font-mono text-xs text-accent">
          <Sparkles className="h-3.5 w-3.5" />
          <span>[DIRECT_DISPATCH_SERVICE]</span>
        </div>
        <span className="font-mono text-[11px] text-muted-foreground">
          Target: <strong className="text-foreground">vyomikX@gmail.com</strong>
        </span>
      </div>

      {/* Quick Select Presets */}
      <div className="mb-6 space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-accent">Quick Request Presets</Label>
        <div className="flex flex-wrap gap-2">
          {requestPresets.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => setType(preset.type)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-all ${
                type === preset.type
                  ? "border-accent bg-accent text-accent-foreground shadow-xs"
                  : "border-border bg-muted/40 text-muted-foreground hover:border-accent/40 hover:text-foreground"
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input
  id="name"
  name="name"
  aria-invalid={!!errors.name}
  aria-describedby={errors.name ? "name-error" : undefined}
/>
{errors.name && <p id="name-error" className="text-xs text-destructive">{errors.name}</p>}
        </div>

        <div
  className="absolute -left-[9999px]"
  aria-hidden="true"
>
  <label htmlFor="website">
    Website
  </label>

  <input
    id="website"
    name="website"
    type="text"
    tabIndex={-1}
    autoComplete="off"
  />
</div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            aria-invalid={!!errors.email}
          />
          {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number (Optional)</Label>
          <Input id="phone" name="phone" placeholder="+91 93065 13210" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="organization">School / Organization (Optional)</Label>
          <Input
            id="organization"
            name="organization"
            placeholder="e.g. AMU / Independent Builder"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Request Category *</Label>
          <Select value={type} onValueChange={(val) => setType(val || "")}>
            <SelectTrigger id="type" aria-invalid={!!errors.type} className="w-full">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {requestTypes.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.type && <p className="text-xs text-destructive">{errors.type}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="preferredTime">Preferred Contact Time (Optional)</Label>
          <Input id="preferredTime" name="preferredTime" placeholder="e.g. Weekdays 4 PM - 7 PM" />
        </div>
      </div>

      <div className="mt-5 space-y-2">
        <Label htmlFor="message">Project / Request Details *</Label>
        <Textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Describe your request, school visit details, or questions..."
          aria-invalid={!!errors.message}
        />
        {errors.message && <p className="text-xs text-destructive">{errors.message}</p>}
      </div>

      {apiError && (
        <div className="mt-4 rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-xs font-medium text-destructive">
          {apiError}
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={status === "submitting"}
        className="mt-6 w-full rounded-full bg-primary font-medium text-primary-foreground shadow-md transition-all hover:opacity-90 sm:w-auto"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Dispatching to vyomikX@gmail.com...
          </>
        ) : (
          <>
            Submit Request
            <Send className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  )
}

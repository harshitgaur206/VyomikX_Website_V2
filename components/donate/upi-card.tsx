"use client"

import { useState } from "react"
import Image from "next/image"
import { Check, Copy, ExternalLink, QrCode, Smartphone, Mail, Phone, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"

const UPI_ID = "mr.professor2770@okhdfcbank"
const PAYEE_NAME = "Nigam Chaudhary"
const UPI_PAY_URL = "upi://pay?pa=mr.professor2770@okhdfcbank&pn=Nigam%20Chaudhary&aid=uGICAgKDzhtPBMg"
const CONTACT_PHONE = "+91 79833 57727"
const CONTACT_PHONE_RAW = "+917983357727"
const CONTACT_EMAIL = "vyomikx@gmail.com"

export function UpiCard() {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(UPI_ID)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // Fallback
    }
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-xl backdrop-blur-md sm:p-8">
      {/* Decorative gradient corner */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
      
      <div className="flex items-center justify-between border-b border-border/80 pb-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <QrCode className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-display text-lg font-bold text-foreground">Scan to Pay via UPI</h3>
            <p className="text-xs text-muted-foreground">Supported on GPay, PhonePe, Paytm, BHIM &amp; all banks</p>
          </div>
        </div>
        <span className="hidden rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 sm:inline-flex items-center gap-1">
          <ShieldCheck className="h-3.5 w-3.5" />
          Verified
        </span>
      </div>

      {/* QR Code Container */}
      <div className="mt-6 flex flex-col items-center">
        <div className="relative rounded-2xl border-2 border-border/80 bg-white p-3 shadow-md transition-transform hover:scale-[1.01]">
          <div className="relative h-60 w-60 sm:h-64 sm:w-64 overflow-hidden rounded-xl bg-white">
            <Image
              src="/donate/upi-qr.png"
              alt="Scan to pay VyomikX via UPI"
              width={512}
              height={512}
              className="h-full w-full object-contain"
              priority
              unoptimized
            />
          </div>
          <p className="mt-2 text-center font-mono text-[11px] font-medium text-slate-600">
            Scan with any UPI app
          </p>
        </div>

        {/* Mobile Deep Link */}
        <div className="mt-5 w-full sm:hidden">
          <Button asChild size="lg" className="w-full rounded-full font-semibold shadow-md">
            <a href={UPI_PAY_URL}>
              <Smartphone className="mr-2 h-4 w-4" />
              Open UPI App on Phone
            </a>
          </Button>
        </div>

        {/* Copy UPI ID Box */}
        <div className="mt-6 w-full rounded-2xl border border-border/80 bg-muted/40 p-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="font-medium">UPI ID / VPA</span>
            <span>Payee: <strong className="text-foreground">{PAYEE_NAME}</strong></span>
          </div>
          
          <div className="mt-2 flex items-center justify-between gap-2 rounded-xl border border-border bg-background px-3.5 py-2.5">
            <code className="font-mono text-sm font-semibold text-foreground select-all break-all">
              {UPI_ID}
            </code>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="shrink-0 gap-1.5 rounded-lg text-xs"
              aria-label="Copy UPI ID"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy</span>
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Confirmation & Coordinator Contact */}
        <div className="mt-6 w-full space-y-3 rounded-2xl border border-border/70 bg-card p-4 text-xs text-muted-foreground">
          <p className="font-medium text-foreground">Need a receipt or want to confirm your transfer?</p>
          <p>
            Share your payment confirmation or transaction ID with our team coordinator:
          </p>
          <div className="flex flex-col gap-2 pt-1 sm:flex-row sm:items-center sm:gap-4">
            <a
              href={`tel:${CONTACT_PHONE_RAW}`}
              className="inline-flex items-center gap-1.5 text-foreground hover:text-primary transition-colors"
            >
              <Phone className="h-3.5 w-3.5 text-primary" />
              <span>{CONTACT_PHONE}</span>
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=VyomikX%20Support%20Confirmation`}
              className="inline-flex items-center gap-1.5 text-foreground hover:text-primary transition-colors"
            >
              <Mail className="h-3.5 w-3.5 text-primary" />
              <span>{CONTACT_EMAIL}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}


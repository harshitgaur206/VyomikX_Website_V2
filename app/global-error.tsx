"use client"

import { useEffect } from "react"
import { AlertTriangle, RefreshCw } from "lucide-react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Global error caught:", error)
  }, [error])

  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center bg-background px-4 font-sans text-foreground antialiased">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 text-destructive mb-6">
          <AlertTriangle className="h-8 w-8" />
        </div>
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Application Error
        </h1>
        <p className="mt-3 max-w-md text-sm text-muted-foreground text-center">
          A critical error occurred. Please refresh or try again later.
        </p>
        <button
          onClick={() => reset()}
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          <RefreshCw className="h-4 w-4" /> Reload Application
        </button>
      </body>
    </html>
  )
}

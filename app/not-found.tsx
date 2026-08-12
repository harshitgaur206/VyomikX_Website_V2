import Link from "next/link"
import { ArrowLeft, FileQuestion } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent mb-6">
        <FileQuestion className="h-8 w-8" />
      </div>
      <span className="font-mono text-xs font-semibold text-accent uppercase tracking-widest">
        404 &middot; Page Not Found
      </span>
      <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Looking for a missing build?
      </h1>
      <p className="mt-3 max-w-md text-sm text-muted-foreground">
        The page or resource you requested does not exist or may have been moved.
      </p>
      <div className="mt-8 flex items-center gap-4">
        <Button asChild className="gap-2">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" /> Return to Homepage
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/projects">View Projects</Link>
        </Button>
      </div>
    </div>
  )
}

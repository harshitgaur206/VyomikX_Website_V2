import Link from "next/link"
import { ArrowRight, Layers, Sprout } from "lucide-react"
import { site } from "@/lib/site-data"
import { Button } from "@/components/ui/button"
import { HeroPhotoGrid } from "@/components/home/hero-photo-grid"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-tech-grid py-12 sm:py-16 lg:py-20">
      {/* Background subtle ambient tech glow */}
      <div 
        className="pointer-events-none absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" 
        aria-hidden="true" 
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div className="animate-fade-up text-center lg:text-left">
          {/* Community Pill Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/60 bg-emerald-100/70 px-4 py-1.5 text-xs font-semibold text-emerald-900 shadow-xs dark:border-emerald-800/40 dark:bg-emerald-950/40 dark:text-emerald-300">
            <Sprout className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            Community-First Education
          </div>

          {/* Prominent VyomikX Brand Title */}
          <h1 className="mt-4 font-display text-6xl font-black tracking-tight text-foreground sm:text-7xl lg:text-8xl">
            VyomikX
          </h1>

          {/* Tagline Subtitle */}
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-foreground/90 sm:text-3xl lg:text-4xl">
            Cultivating Technology &amp; Robotics for{" "}
            <span className="text-accent">Every Student.</span>
          </h2>

          {/* Subtitle Description */}
          <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0">
            A student-led movement at ZHCET, AMU. We share tools, mentorship, and equipment so curious minds from all backgrounds can grow and build real technology naturally.
          </p>

          {/* Action Buttons - Toned Down & Diversified */}
          <div className="mt-8 flex flex-col items-center gap-3.5 sm:flex-row lg:justify-start">
            <Button
  asChild
  size="lg"
  className="w-full rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:opacity-95 sm:w-auto"
>
  <Link
    href="/contact?topic=support"
    className="inline-flex items-center justify-center"
  >
    <span>Support Our Work</span>
    <ArrowRight className="ml-1.5 h-4 w-4 shrink-0" />
  </Link>
</Button>
            
            <Button asChild
  size="lg"
  variant="outline"
  className="w-full rounded-full border border-border bg-card/80 px-7 py-3.5 text-sm font-medium text-foreground shadow-xs backdrop-blur-sm hover:bg-muted sm:w-auto"
>
  <Link
    href="/projects"
    className="inline-flex items-center justify-center"
  >
    <Layers className="mr-1.5 h-4 w-4 shrink-0 text-accent" />
    <span>Browse Projects</span>
  </Link>
</Button>
          </div>

          {/* Clean Open Access Telemetry Bar */}
          <div className="mt-8 flex items-center justify-center gap-3 rounded-full border border-border/80 bg-card/60 px-5 py-2 text-xs font-medium text-muted-foreground backdrop-blur-md lg:justify-start lg:max-w-md">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>100% Free Resources &amp; Your Tech space &amp; Your Gateway to Technology</span>
          </div>
        </div>

        {/* Right Column: Hero Photo Grid with Overlapping Tilted Cards */}
        <div className="animate-fade-up [animation-delay:150ms]">
          <HeroPhotoGrid />
        </div>
      </div>
    </section>
  )
}

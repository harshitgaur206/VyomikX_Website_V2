import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Compass, Cpu, Layers, Rocket, ShieldCheck, Sparkles, Terminal } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { futureVision } from "@/lib/site-data"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Future Vision",
  description:
    "VyomikX strategic roadmap — open campus maker labs, free school outreach, shared hardware libraries, and open engineering documentation.",
}

const strategicPillars = [
  {
    tag: "PILLAR 01",
    title: "Accessible Technology Education",
    description:
      "Making technology easier to understand through practical workshops, beginner-friendly learning resources, and hands-on activities that encourage students to learn by doing.",
    icon: Cpu,
  },
  {
    tag: "PILLAR 02",
    title: "STEM Outreach & School Engagement",
    description:
      "Taking practical technology education beyond the classroom through school visits, demonstrations, interactive sessions, and community-focused STEM activities.",
    icon: Rocket,
  },
  {
    tag: "PILLAR 03",
    title: "Knowledge That Stays Open",
    description:
      "Sharing free guides, tutorials, project documentation, and learning resources so students can continue exploring, experimenting, and building independently.",
    icon: Terminal,
  },
]

const groups = ["Near Term", "Mid Term", "Long Term"] as const

const timeframeBadges: Record<string, { label: string; icon: typeof Sparkles; style: string }> = {
  "Near Term": { label: "Near Term", icon: Sparkles, style: "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400" },
  "Mid Term": { label: "Mid Term", icon: Compass, style: "bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400" },
  "Long Term": { label: "Long Term", icon: Rocket, style: "bg-primary/10 border-primary/30 text-primary" },
}

const commitments = [
  "Keep 100% of our workshops, technical guides, and mentorship sessions completely free",
  "Maintain a shared component bank so no student pays out-of-pocket for microcontrollers or sensors",
  "Conduct hands-on school visit sessions across local schools",
  "Publish open technical schematics, PID control formulas, and code repositories for every build",
]

export default function FuturePage() {
  return (
    <>
      <PageHeader
        eyebrow="Future Vision"
        title="Restructured strategic roadmap for accessible engineering"
        description="Our multi-phase roadmap establishes open-access maker labs, hands-on school outreach visits, and open hardware repositories so zero financial barriers stand between students and technology."
      />

      {/* Strategic Pillars Section */}
      <section className="bg-tech-grid py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-accent">
              [SYSTEM_PILLARS]
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Three Strategic Pillars Driving VyomikX
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {strategicPillars.map((pillar) => {
              const Icon = pillar.icon
              return (
                <div
                  key={pillar.title}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:border-accent/50 hover:shadow-xl"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-accent">{pillar.tag}</span>
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-border bg-muted/50 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                    <h3 className="mt-4 font-display text-xl font-bold text-foreground">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Detailed Timeframe Goals Roadmap */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-16">
          {groups.map((group) => {
            const items = futureVision.filter((f) => f.timeframe === group)
            if (items.length === 0) return null
            const meta = timeframeBadges[group] || timeframeBadges["Near Term"]
            const BadgeIcon = meta.icon

            return (
              <div key={group} className="relative">
                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1 text-xs font-semibold ${meta.style}`}>
                    <BadgeIcon className="h-3.5 w-3.5" />
                    {group} Roadmap
                  </span>
                  <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">{group} Milestones</h2>
                  <span className="h-px flex-1 bg-border" />
                </div>

                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  {items.map((item) => (
                    <div
                      key={item.title}
                      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-xs transition-all duration-300 hover:border-accent/50 hover:shadow-md"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-4">
                          <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-accent transition-colors">
                            {item.title}
                          </h3>
                          <span className="rounded-xl border border-border bg-muted/40 p-2 text-accent">
                            <BadgeIcon className="h-4 w-4" />
                          </span>
                        </div>
                        <p className="mt-3 leading-relaxed text-muted-foreground text-sm sm:text-base">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Core Principles */}
      <section className="section-divider">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-accent">[CORE_COMMITMENTS]</span>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Principles guiding everything we build
            </h2>
          </div>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {commitments.map((goal) => (
              <li
                key={goal}
                className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5 shadow-xs transition-all hover:border-accent/40"
              >
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <span className="text-sm font-medium leading-relaxed text-foreground">{goal}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA Box */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border bg-card/90 p-8 text-center shadow-lg backdrop-blur-md sm:p-12">
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold tracking-tight text-balance">
            Help us open more doors for student builders
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-muted-foreground">
            Whether you want to donate spare electronics, mentor a student, bring a workshop to your
            school, or collaborate on a home automation build — there is a place for you.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
            <Button asChild size="lg" className="rounded-full bg-primary text-primary-foreground px-7 hover:opacity-90">
              <Link href="/contact?topic=donate">
                Donate Spare Parts
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full px-7">
              <Link href="/contact?topic=mentor">Mentor a Student</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}

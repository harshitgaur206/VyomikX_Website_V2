import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { team } from "@/lib/site-data"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Team",
  description:
    "Meet the students behind VyomikX — volunteers at ZHCET, AMU who share tools, mentorship, and equipment so every curious student can build with technology.",
}

const coordinators = team.filter((m) => m.role === "Team Coordinator")
const members = team.filter((m) => m.role !== "Team Coordinator")

function MemberCard({ member }: { member: (typeof team)[number] }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-md">
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          src={member.image || "/placeholder.svg"}
          alt={member.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
        <span className="absolute left-3 top-3 rounded-full border border-border bg-background/90 px-2.5 py-1 text-[11px] font-medium text-primary backdrop-blur-sm">
          {member.enrolment}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h2 className="font-display text-lg font-semibold text-foreground">{member.name}</h2>
        <p className="text-sm text-primary">{member.role}</p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{member.bio}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {member.focus.map((f) => (
            <span
              key={f}
              className="rounded-md border border-border bg-secondary/60 px-2 py-0.5 text-[11px] text-muted-foreground"
            >
              {f}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}

export default function TeamPage() {
  return (
    <>
      <PageHeader
        eyebrow="Team"
        title="Students helping students build with technology"
        description="VyomikX is run entirely by student volunteers at ZHCET, AMU — builders and mentors who believe every curious mind deserves free access to tools and guidance."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <h2 className="font-display text-2xl font-bold text-foreground">Team Coordinators</h2>
          <span className="h-px flex-1 bg-border" />
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {coordinators.map((member) => (
            <MemberCard key={member.name} member={member} />
          ))}
        </div>

        <div className="mt-16 flex items-center gap-4">
          <h2 className="font-display text-2xl font-bold text-foreground">Team Members</h2>
          <span className="h-px flex-1 bg-border" />
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => (
            <MemberCard key={member.name} member={member} />
          ))}
        </div>
      </section>

      <section className="section-divider">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold tracking-tight text-balance">
            Want to join us?
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-muted-foreground">
            No experience needed — just curiosity. We will guide you step-by-step through your
            first build, completely free.
          </p>
          <Button aschild size="lg" className="mt-8 rounded-full">
            <Link href="/contact?topic=workshop">
              Join a Workshop
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  )
}

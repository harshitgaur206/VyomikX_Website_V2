import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, BookOpen } from "lucide-react"
import type { Project } from "@/lib/site-data"

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-xs transition-all duration-300 hover:shadow-md hover:border-accent/50"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <span className="absolute left-3 top-3 rounded-full border border-border/80 bg-background/85 px-3 py-1 text-[11px] font-medium text-foreground backdrop-blur-md shadow-xs">
          {project.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="font-medium text-accent">{project.year}</span>
        </div>
        <h3 className="mt-1 flex items-start justify-between gap-2 font-display text-lg font-semibold leading-snug text-foreground">
          {project.title}
          <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
        </h3>
        <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {project.summary}
        </p>

        <div className="mt-4 rounded-xl border border-border/70 bg-muted/30 p-3">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-accent">Why we built this</p>
          <p className="mt-1 text-xs leading-relaxed text-foreground line-clamp-2">{project.whyWeBuilt}</p>
        </div>

        {project.guideAvailable && (
          <p className="mt-3 flex items-center gap-1.5 text-xs font-medium text-accent">
            <BookOpen className="h-3.5 w-3.5" />
            Free technical report &amp; assembly guide available
          </p>
        )}
      </div>
    </Link>
  )
}

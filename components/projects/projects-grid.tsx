"use client"

import { useMemo, useState } from "react"
import { projects } from "@/lib/site-data"
import { ProjectCard } from "@/components/project-card"
import { cn } from "@/lib/utils"

export function ProjectsGrid() {
  const categories = useMemo(() => {
    return ["All", ...Array.from(new Set(projects.map((p) => p.category)))]
  }, [])
  const [active, setActive] = useState("All")

  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active)

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActive(cat)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              active === cat
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card/60 text-muted-foreground hover:border-primary/50 hover:text-foreground",
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  )
}

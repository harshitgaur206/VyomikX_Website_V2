import type { Metadata } from "next"
import { PageHeader } from "@/components/page-header"
import { ProjectsGrid } from "@/components/projects/projects-grid"

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Robotics projects built by VyomikX to be shared — with free assembly guides, affordable parts, and step-by-step mentorship for every student.",
}

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Work"
        title="Projects built to be shared"
        description="Every project here was designed with accessibility in mind — affordable parts, clear documentation, and free guides so any student can build along with us."
      />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <ProjectsGrid />
      </section>
    </>
  )
}

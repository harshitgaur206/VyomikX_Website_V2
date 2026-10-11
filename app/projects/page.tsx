import type { Metadata } from "next"
import { PageHeader } from "@/components/page-header"
import { ProjectsGrid } from "@/components/projects/projects-grid"

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Robotics projects built by VyomikX to be shared — with free assembly guides, affordable parts, and step-by-step mentorship for every student.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    type: "website",
    url: "/projects",
    title: "Projects — VyomikX",
    description:
      "Robotics projects built by VyomikX to be shared — with free assembly guides, affordable parts, and step-by-step mentorship for every student.",
    siteName: "VyomikX",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "VyomikX Robotics Projects",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects — VyomikX",
    description:
      "Robotics projects built by VyomikX to be shared — with free assembly guides, affordable parts, and step-by-step mentorship for every student.",
    images: ["/og-image.jpg"],
  },
}

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Work"
        title="Projects Built to Inspire"
        description="Every project here was designed with accessibility in mind — affordable parts, clear documentation, and free guides so any student can build along with us."
      />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <ProjectsGrid />
      </section>
    </>
  )
}

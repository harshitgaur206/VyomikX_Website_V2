import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Download,
  ExternalLink,
  Heart,
  Target,
  Trophy,
} from "lucide-react"

import { projects } from "@/lib/site-data"
import { ProjectCard } from "@/components/project-card"
import { Button } from "@/components/ui/button"
import { ProjectGallerySlider } from "@/components/project-gallery-slider"

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return {
      title: "Project Not Found",
    }
  }

  return {
    title: project.title,
    description: project.whyWeBuilt,
  }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    notFound()
  }

  // Create one safe gallery variable so TypeScript knows it always exists.
  const gallery =
    project.gallery && project.gallery.length > 0
      ? project.gallery
      : [{ src: project.image, caption: project.title }]

  const currentIndex = projects.findIndex(
  (p) => p.slug === project.slug
)

const related = [
  ...projects.slice(currentIndex + 1, currentIndex + 4),
  ...projects.slice(0, Math.max(0, 3 - (projects.length - currentIndex - 1))),
].slice(0, 3)

  return (
    <>
      {/* Hero Section */}
      <section className="border-b border-border bg-tech-grid py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/projects"
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            All Projects
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:items-center">
            {/* Project Information */}
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-border/80 bg-card px-3 py-1 text-xs font-semibold text-accent">
                  {project.category}
                </span>

                <span className="text-xs text-muted-foreground">
                  Year {project.year}
                </span>
              </div>

              <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl">
                {project.title}
              </h1>

              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                {project.summary}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.tech.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-md border border-border bg-secondary/60 px-2.5 py-1 text-xs font-medium text-muted-foreground"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </div>

            {/* Main Gallery */}
            <div>
              <ProjectGallerySlider
                title={project.title}
                gallery={gallery}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Left Content */}
          <div className="space-y-12 lg:col-span-2">
            {/* Why We Built This */}
            <div className="flex flex-col gap-3 p-3 sm:flex-row sm:items-center">
  {/* Download Technical Guide */}
  <Button
    asChild
    className="h-10 rounded-full bg-primary px-5 font-medium text-primary-foreground shadow-xs"
  >
    <a
      href={
        project.guideUrl ||
        "https://drive.google.com/drive/folders/vyomikx_guides"
      }
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex h-full items-center justify-center"
    >
      <Download className="mr-1.5 h-4 w-4 shrink-0" />

      <span>Download Technical Guide</span>

      <ExternalLink className="ml-1.5 h-3.5 w-3.5 shrink-0 opacity-80" />
    </a>
  </Button>

  {/* Join a Build Workshop */}
  <Button
    asChild
    variant="outline"
    className="h-10 rounded-full px-5 font-medium"
  >
    <Link
      href="/contact?topic=workshop"
      className="inline-flex h-full items-center justify-center"
    >
      <span>Join a Build Workshop</span>
    </Link>
  </Button>
</div>

            {/* Overview */}
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground">
                Overview
              </h2>

              <p className="mt-4 leading-relaxed text-muted-foreground">
                {project.overview}
              </p>
            </div>

            {/* Highlights */}
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground">
                Highlights
              </h2>

              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {project.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />

                    <span className="text-sm leading-relaxed text-foreground">
                      {highlight}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Challenge + Outcome */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card p-6">
                <Target className="h-6 w-6 text-accent" />

                <h3 className="mt-3 font-display text-lg font-semibold text-foreground">
                  The Challenge
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {project.challenge}
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6">
                <Trophy className="h-6 w-6 text-accent" />

                <h3 className="mt-3 font-display text-lg font-semibold text-foreground">
                  The Outcome
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {project.outcome}
                </p>
              </div>
            </div>

            {/* Project Gallery */}
            {gallery.length > 0 && (
              <div>
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-2xl font-bold text-foreground">
                    Project Media &amp; Build Gallery
                  </h2>

                  <span className="font-mono text-xs text-accent">
                    [{gallery.length} PHOTOS]
                  </span>
                </div>

                <div className="mt-4">
                  <ProjectGallerySlider
                    title={project.title}
                    gallery={gallery}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Specifications Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-border bg-card p-6">
              <h2 className="font-display text-lg font-semibold text-foreground">
                Specifications
              </h2>

              <dl className="mt-4 divide-y divide-border">
                {project.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex items-center justify-between gap-4 py-2.5"
                  >
                    <dt className="text-sm text-muted-foreground">
                      {spec.label}
                    </dt>

                    <dd className="text-right text-sm font-medium text-foreground">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <Button asChild
  className="mt-6 w-full rounded-full"
>
  <Link
    href="/contact?topic=workshop"
    className="inline-flex items-center justify-center"
  >
    <span>Build one with us</span>
    <ArrowRight className="ml-1 h-4 w-4 shrink-0" />
  </Link>
</Button>
            </div>
          </aside>
        </div>
      </section>

      {/* Related Projects */}
      <section className="section-divider">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-foreground">
            More Projects
          </h2>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((relatedProject) => (
              <ProjectCard
                key={relatedProject.slug}
                project={relatedProject}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
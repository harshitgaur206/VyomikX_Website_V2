import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
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
  return [
    ...projects.map((p) => ({ slug: p.slug })),
    { slug: "self-balancing-robot" },
  ]
}

function resolveProject(slug: string) {
  if (slug === "self-balancing-robot") {
    return projects.find((p) => p.slug === "self-balancing-robot-1")
  }
  return projects.find((p) => p.slug === slug)
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = resolveProject(slug)

  if (!project) {
    return {
      title: "Project Not Found",
    }
  }

  const title = `${project.title} — VyomikX`
  const description = project.summary || project.whyWeBuilt
  const canonicalUrl = `/projects/${project.slug}`
  const coverImage = project.image || "/og-image.jpg"

  return {
    title: project.title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "article",
      url: canonicalUrl,
      title,
      description,
      siteName: "VyomikX",
      images: [
        {
          url: coverImage,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [coverImage],
    },
  }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const project = resolveProject(slug)

  if (!project) {
    notFound()
  }

  // Create one safe gallery variable so TypeScript knows it always exists.
  const gallery =
    project.gallery && project.gallery.length > 0
      ? project.gallery
      : [{ src: project.image, caption: project.title }]

  const otherProjects = projects.filter((p) => p.slug !== project.slug)
  const currentIndex = projects.findIndex((p) => p.slug === project.slug)

  const related =
    otherProjects.length <= 3
      ? otherProjects
      : Array.from(
          { length: 3 },
          (_, i) => otherProjects[(currentIndex + i) % otherProjects.length]
        )

  return (
    <>
      {/* Hero Section */}
      <section className="border-b border-border bg-tech-grid py-8 sm:py-12 lg:py-16 overflow-x-hidden w-full">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full min-w-0">
          <div className="flex items-center justify-between">
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-card/80 px-3.5 py-1.5 text-xs sm:text-sm font-medium text-muted-foreground backdrop-blur-sm transition-colors hover:border-border hover:bg-card hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span>All Projects</span>
            </Link>
          </div>

          <div className="mt-6 sm:mt-8 grid gap-8 lg:grid-cols-2 lg:items-center w-full min-w-0">
            {/* Project Information */}
            <div className="flex flex-col w-full min-w-0">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="rounded-full border border-border/80 bg-card px-3 py-1 text-xs font-semibold text-accent shadow-xs">
                  {project.category}
                </span>

                <span className="text-xs text-muted-foreground font-mono">
                  Year {project.year}
                </span>

                <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {project.status || "Completed"}
                </span>
              </div>

              <h1 className="mt-3 sm:mt-4 font-display text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance text-foreground break-words">
                {project.title}
              </h1>

              <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg leading-relaxed text-muted-foreground text-pretty break-words">
                {project.summary}
              </p>

              <div className="mt-4 sm:mt-6 flex flex-wrap gap-1.5 sm:gap-2 w-full min-w-0">
                {project.tech.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-md border border-border bg-secondary/60 px-2.5 py-1 text-xs font-medium text-muted-foreground"
                  >
                    {technology}
                  </span>
                ))}
              </div>

              {/* Action Buttons: Download Guide & Join Workshop right in hero */}
              <div className="mt-6 sm:mt-8 flex flex-col gap-3 sm:flex-row sm:items-center w-full min-w-0">
                <Button
                  asChild
                  size="lg"
                  className="w-full sm:w-auto h-11 sm:h-10 rounded-full bg-primary px-4 sm:px-6 text-xs sm:text-sm font-medium text-primary-foreground shadow-xs transition-all hover:opacity-95"
                >
                  <a
                    href={
                      project.guideUrl ||
                      "https://drive.google.com/drive/folders/vyomikx_guides"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 text-center"
                  >
                    <Download className="h-4 w-4 shrink-0" />
                    <span>Download Technical Guide</span>
                    <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-80" />
                  </a>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto h-11 sm:h-10 rounded-full px-4 sm:px-6 text-xs sm:text-sm font-medium text-center"
                >
                  <Link
                    href="/contact?topic=workshop"
                    className="inline-flex items-center justify-center"
                  >
                    <span>Join a Build Workshop</span>
                  </Link>
                </Button>
              </div>
            </div>

            {/* Main Gallery Slider */}
            <div className="w-full min-w-0 max-w-full overflow-hidden">
              <ProjectGallerySlider
                title={project.title}
                gallery={gallery}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:py-16 sm:px-6 lg:px-8 w-full min-w-0 overflow-x-hidden">
        <div className="grid gap-10 lg:grid-cols-3 lg:gap-12 w-full min-w-0">
          {/* Left Content */}
          <div className="space-y-10 sm:space-y-12 lg:col-span-2 w-full min-w-0">
            {/* Why We Built This Callout */}
            {project.whyWeBuilt && (
              <div className="rounded-2xl border border-accent/25 bg-accent/5 p-5 sm:p-6 shadow-xs">
                <div className="flex items-center gap-2 text-accent font-semibold text-xs sm:text-sm uppercase tracking-wider">
                  <Heart className="h-4 w-4 shrink-0" />
                  <span>Why We Built This</span>
                </div>
                <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-foreground/90">
                  {project.whyWeBuilt}
                </p>
              </div>
            )}

            {/* Overview */}
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground">
                Overview
              </h2>

              <p className="mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
                {project.overview}
              </p>
            </div>

            {/* Highlights */}
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground">
                Highlights &amp; Key Features
              </h2>

              <ul className="mt-3 sm:mt-4 grid gap-2.5 sm:grid-cols-2">
                {project.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-2.5 rounded-xl border border-border/70 bg-card/60 p-3 sm:p-3.5"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-accent" />

                    <span className="text-xs sm:text-sm leading-relaxed text-foreground">
                      {highlight}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Challenge + Outcome */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-xs">
                <div className="flex items-center gap-2 text-accent">
                  <Target className="h-5 w-5 shrink-0" />
                  <h3 className="font-display text-base sm:text-lg font-semibold text-foreground">
                    The Challenge
                  </h3>
                </div>

                <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                  {project.challenge}
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-xs">
                <div className="flex items-center gap-2 text-accent">
                  <Trophy className="h-5 w-5 shrink-0" />
                  <h3 className="font-display text-base sm:text-lg font-semibold text-foreground">
                    The Outcome
                  </h3>
                </div>

                <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                  {project.outcome}
                </p>
              </div>
            </div>

            {/* Project Gallery - Responsive Photo Grid for extra images */}
            {gallery.length > 1 && (
              <div>
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground">
                    Build Gallery &amp; Photos
                  </h2>

                  <span className="font-mono text-xs text-accent">
                    [{gallery.length} PHOTOS]
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
                  {gallery.map((img, idx) => (
                    <figure
                      key={img.src + idx}
                      className="group overflow-hidden rounded-xl sm:rounded-2xl border border-border bg-card shadow-xs transition-shadow hover:shadow-md"
                    >
                      <div className="relative aspect-[4/3] w-full overflow-hidden">
                        <Image
                          src={img.src}
                          alt={img.caption || `${project.title} photo ${idx + 1}`}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 260px"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      {img.caption && (
                        <figcaption className="p-2 sm:p-2.5 text-[11px] sm:text-xs text-muted-foreground line-clamp-2">
                          {img.caption}
                        </figcaption>
                      )}
                    </figure>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Specifications Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-xs">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-base sm:text-lg font-semibold text-foreground">
                  Specifications
                </h2>
                <span className="rounded-full bg-secondary/80 px-2.5 py-0.5 text-[10px] font-semibold uppercase text-accent">
                  Hardware Specs
                </span>
              </div>

              <dl className="mt-4 divide-y divide-border/70">
                {project.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 py-2.5"
                  >
                    <dt className="text-xs sm:text-sm text-muted-foreground shrink-0">
                      {spec.label}
                    </dt>

                    <dd className="text-xs sm:text-sm font-medium text-foreground sm:text-right break-words">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <Button asChild className="mt-6 w-full rounded-full">
                <Link
                  href="/contact?topic=workshop"
                  className="inline-flex items-center justify-center gap-1.5"
                >
                  <span>Build one with us</span>
                  <ArrowRight className="h-4 w-4 shrink-0" />
                </Link>
              </Button>
            </div>
          </aside>
        </div>
      </section>

      {/* Related Projects */}
      <section className="section-divider">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16 sm:px-6 lg:px-8">
          <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground">
            More Projects
          </h2>

          <div className="mt-6 sm:mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
import type { Metadata } from "next"
import Image from "next/image"
import { BookOpen, GraduationCap, HandHeart, Users, Wrench } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { SectionHeading } from "@/components/section-heading"
import { site, values } from "@/lib/site-data"

export const metadata: Metadata = {
  title: "About Us",
  description:
    "VyomikX is a student-led movement at ZHCET, AMU sharing tools, knowledge , mentorship, and equipment so every curious student can build with technology — for free.",
}

const valueIcons = [Wrench, BookOpen, Users, HandHeart]

const journey = [
  {
    month :"Nov",
    year: "2025",
    title: "The First Spark",
    text: "A group of students at ZHCET, AMU started meeting after class to build their first robots from spare parts — because not everyone could afford their own kit.",
  },
  {
    month : "May",
    year: "2026",
    title: "Expanding Workshops & School Visits",
    text: "We formalized as VyomikX and launched free hands-on robotics workshops, taking mobile hardware kits into local schools .",
  },
  {
    month :"July",
    year: "2026",
    title: "Open Hardware & Shared Inventory",
    text: "Engineered projects — including 6-DOF robotic arms, solar trackers, and bionic hands — creating a shared component library for students.",
  },
  {
    month :"July",
    year: "2026",
    title: "VyomikX Today & The Future",
    text: "With over 100+ students mentored and multiple school visits actively running, we are building toward an open campus maker space for every curious mind.",
  },
]

import { ImageSlideshow } from "@/components/image-slideshow"

const aboutSlides = [
  {
    src: "/outreach/workshop-hands-on.jpg",
    alt: "Students assembling electronics and robotics with laptop guidance",
    title: "Practical Hardware Engineering & Circuit Assembly",
    tag: "Workshops",
  },
  {
    src: "/outreach/workshop-girls-solar.jpg",
    alt: "Young students exploring solar tracking robot",
    title: "Free School Visits & Community Demonstrations",
    tag: "School Visits",
  },
  {
    src: "/outreach/workshop-spider-robot.jpg",
    alt: "Mentors guiding students on spider robot gait control",
    title: "Mentorship & Hands-on Robotics",
    tag: "Mentorship",
  },
]

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title="Opening doors to technology for every student"
        description="VyomikX is a student-led movement at ZHCET, AMU. We share tools, mentorship, and equipment so curious minds from all backgrounds can build real technology — completely free."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <ImageSlideshow slides={aboutSlides} />
          <div className="space-y-5 leading-relaxed text-muted-foreground">
            <p>
              What began as a few friends soldering circuits after class has grown into a
              community of builders who believe talent is everywhere — but access to tools and
              mentorship is not.
            </p>
            <p>
              We provide microcontrollers, and components to students who don&apos;t have
              their own. We publish every schematic, line of code, and lesson plan freely. And we
              guide beginners with zero prior experience step-by-step through hands-on workshops.
            </p>
            <p>
              Beyond our campus, we take basic robotics kits into nearby schools to introduce young
              students to programming and electronics — because the next great engineer might be
              sitting in a classroom that has never seen a microcontroller.
            </p>
          </div>
        </div>
      </section>

      <section className="section-divider">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-16 sm:px-6 md:grid-cols-2 lg:px-8">
          <div className="rounded-2xl border border-border bg-card p-8">
            <HandHeart className="h-8 w-8 text-primary" />
            <h2 className="mt-4 font-display text-2xl font-bold text-foreground">Our Mission</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              To remove every financial and knowledge barrier standing between a curious student
              and the ability to build real technology — through free tools, open mentorship, and
              hands-on learning.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-8">
            <GraduationCap className="h-8 w-8 text-accent" />
            <h2 className="mt-4 font-display text-2xl font-bold text-foreground">Our Vision</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              A community where any student — regardless of background or budget — can walk into
              a maker space , rather theoretically and build something practically that changes their future.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
  <SectionHeading
    eyebrow="What We Stand For"
    title="Our impact pillars"
    align="center"
    className="mx-auto"
  />

  <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
    {values.map((value, i) => {
      const Icon = valueIcons[i % valueIcons.length]

      return (
        <div
          key={value.title}
          className="
            rounded-2xl border border-border bg-card p-6
            transition-all duration-300 ease-out
            hover:-translate-y-1
            hover:border-[#8B5E3C]/60
            hover:bg-[#8B5E3C]/5
            hover:shadow-[0_0_25px_rgba(139,94,60,0.35)]
          "
        >
          <Icon className="h-7 w-7 text-primary transition-transform duration-300 group-hover:scale-110" />

          <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
            {value.title}
          </h3>

          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {value.description}
          </p>
        </div>
      )
    })}
  </div>
</section>

      <section className="section-divider">
  <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
    <SectionHeading
      eyebrow="Our Journey"
      title="How we got here"
      align="center"
      className="mx-auto"
    />

    <ol className="mt-12 space-y-8">
      {journey.map((item, i) => (
        <li key={item.title} className="relative flex gap-6">
          {/* Timeline circle + line */}
          <div className="flex flex-col items-center">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10 px-2 text-center font-display text-xs font-bold leading-tight text-accent sm:h-20 sm:w-20 sm:text-sm">
              <div
  className="
    flex h-16 w-16 shrink-0 items-center justify-center
    rounded-full border border-accent/30 bg-accent/10
    text-center font-display text-xs font-bold leading-tight text-accent
    transition-all duration-300 ease-out
    hover:scale-110
    hover:border-accent
    hover:bg-accent/20
    hover:shadow-[0_0_20px_rgba(139,69,19,0.55)]
    sm:h-20 sm:w-20 sm:text-sm
  "
>
  <div className="flex flex-col">
    <span>{item.month}</span>
    <span>{item.year}</span>
  </div>
</div>
            </div>

            {i < journey.length - 1 && (
              <div className="mt-2 w-px flex-1 bg-border" />
            )}
          </div>

          {/* Content */}
          <div className="pb-2 pt-1">
            <h3 className="font-display text-lg font-semibold text-foreground">
              {item.title}
            </h3>

            <p className="mt-1.5 leading-relaxed text-muted-foreground">
              {item.text}
            </p>
          </div>
        </li>
      ))}
    </ol>
  </div>
</section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {site.stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-border bg-card p-6 text-center"
            >
              <dt className="font-display text-4xl font-bold text-primary">{stat.value}</dt>
              <dd className="mt-2 text-sm text-muted-foreground">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  )
}

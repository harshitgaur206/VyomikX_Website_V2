import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  BookOpen,
  Gift,
  HandHeart,
  Package,
  Users,
  Wrench,
  Heart,
  GraduationCap,
} from "lucide-react"
import { projects, values, futureVision, team, communityLinks } from "@/lib/site-data"
import { SectionHeading } from "@/components/section-heading"
import { ProjectCard } from "@/components/project-card"
import { Button } from "@/components/ui/button"

import { ImageSlideshow } from "@/components/image-slideshow"

const valueIcons = [Wrench, BookOpen, Users, HandHeart]
const communityIcons = [BookOpen, Package, Gift, HandHeart]

const aboutSlides = [
  {
    src: "/Workshops/Heeralal_Barahseeni_Inter_College/Photos/workshop (1).jpg",
    alt: "Students engaging in hands-on electronics assembly and circuit testing at Heeralal Barahseeni Inter College",
    title: "Hands-On Robotics & Circuit Workshop",
    tag: "Heeralal Barahseeni Inter College",
  },
  {
    src: "/Workshops/Gopiram_Paliwal_Inter_College/Photos/workshop (14).jpg",
    alt: "Mentors guiding students on microcontroller signals and motor control at Gopiram Paliwal Inter College",
    title: "Circuit Assembly & Electronics Mentoring",
    tag: "Gopiram Paliwal Inter College",
  },
  
  {
    src: "/Workshops/Raghuveer_sahay_Inter_College/Photos/workshop (16).jpg",
    alt: "Practical hardware demonstration of autonomous rovers at Raghuveer Sahay Inter College",
    title: "STEM Outreach & Hardware Demonstration",
    tag: "Raghuveer Sahay Inter College",
  },
  {
    src: "/Workshops/Heeralal_Barahseeni_Inter_College/Photos/workshop (38).jpg",
    alt: "Interactive motor control and PWM speed regulation session",
    title: "Student Electronics & Motor Driver Session",
    tag: "Robotics Mentorship",
  },
  {
    src: "/Workshops/Raghuveer_sahay_Inter_College/Photos/workshop (29).jpg",
    alt: "Students collaborating on robotic arm joint servos and wiring",
    title: "Hands-On Robotics Build & Teamwork",
    tag: "Open Hardware Practice",
  },
  {
  src: "/Workshops/Raghuveer_sahay_Inter_College/Photos/workshop (4).jpg",
  alt: "Students assembling Arduino circuits on breadboards",
  title: "Arduino Circuit Building Session",
  tag: "Electronics Workshop",
},
]

import { WorkshopVideoShowcase, WORKSHOP_DRIVE_URL } from "@/components/workshop-video-showcase"
import { ExternalLink, FolderOpen } from "lucide-react"

export function AboutPreview() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="space-y-12">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative">
            <ImageSlideshow slides={aboutSlides} />
          </div>

          <div>
            <SectionHeading
              eyebrow="Who We Are"
              title="Students helping students build with technology"
              description="VyomikX is a student movement at ZHCET, AMU — we share tools, mentorship, and open hardware resources so curious minds from all backgrounds can build real technology."
            />
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {values.map((value, i) => {
                const Icon = valueIcons[i % valueIcons.length]
                return (
                  <div key={value.title} className="rounded-xl border border-border bg-card p-5 shadow-xs transition-all hover:border-accent/40">
                    <Icon className="h-5 w-5 text-accent" />
                    <h3 className="mt-3 font-display text-base font-semibold text-foreground">
                      {value.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {value.description}
                    </p>
                  </div>
                )
              })}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/about">
                  More About Us
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>

            </div>
          </div>
        </div>

        {/* Looping Workshop Video Showcase Component */}
        
      </div>
    </section>
  )
}

export function FeaturedProjects() {
  const featured = projects.slice(0, 3)
  return (
    <section className="section-divider">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Our Work"
            title="Projects Built to Inspire"
            description="Every build starts with a question: how can we make this accessible to students who don't have expensive tools? Here are three examples."
          />
          <Button asChild variant="outline" className="shrink-0 rounded-full">
            <Link href="/projects">
              View All
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}

export function OpenResources() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Open Resources"
        title="Everything we share is 100% free"
        description="Learning guides, equipments, mentorship — no fees, no paywalls. We exist to remove barriers, not create them."
        align="center"
        className="mx-auto"
      />
      <div className="mx-auto mt-10 grid max-w-5xl gap-5 sm:grid-cols-2">
        {communityLinks.map((link, i) => {
          const Icon = communityIcons[i % communityIcons.length]
          return (
            <Link
              key={link.title}
              href={link.href}
              className="group rounded-2xl border border-border bg-card p-6 shadow-xs transition-all hover:border-accent/40 hover:shadow-md"
            >
              <Icon className="h-6 w-6 text-accent" />
              <h3 className="mt-4 font-display text-lg font-semibold text-foreground group-hover:text-accent">
                {link.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {link.description}
              </p>
              <span className="mt-4 inline-flex items-center text-sm font-medium text-accent">
                {link.cta}
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export function FuturePreview() {
  return (
    <section className="section-divider bg-tech-grid">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Future Vision"
          title="Building an accessible ecosystem for future technology leaders"
          description="Our strategic roadmap is to open-access to all tech tools, hands-on school visits, and shared hardware software repositories to ensure zero financial barriers to engineering education."
          align="center"
          className="mx-auto"
        />
        <div className="mx-auto mt-10 grid max-w-5xl gap-5 sm:grid-cols-3">
          {futureVision.slice(0, 3).map((item) => (
            <div key={item.title} className="rounded-2xl border border-border bg-card/90 p-6 shadow-xs backdrop-blur-xs transition-all hover:border-accent/50 hover:shadow-md">
              <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                {item.timeframe}
              </span>
              <h3 className="mt-3 font-display text-lg font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/future">
              See the Full Vision
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export function TeamPreview() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <SectionHeading
          eyebrow="Team"
          title="Meet the student builders driving VyomikX"
          description="Coordinators, hardware engineers, and student mentors—volunteers committed to making hands-on engineering education accessible to all."
        />
        <Button asChild variant="outline" className="shrink-0 rounded-full">
          <Link href="/team">
            Full Team
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {team.slice(0, 3).map((member) => (
          <div
            key={member.name}
            className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-xs transition-all hover:border-accent/40"
          >
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-border">
              <Image
                src={member.image || "/placeholder.svg"}
                alt={member.name}
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-display text-base font-semibold text-foreground">
                {member.name}
              </h3>
              <p className="text-sm font-medium text-accent">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export function HomeCta() {
  return (
    <section className="section-divider">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border bg-card/90 p-8 text-center shadow-sm backdrop-blur-xs sm:p-14">
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            There are many ways to support our mission
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            Whether you want to learn, donate spare parts, mentor a student, or bring a workshop to
            your school — we would love to hear from you. Everything we offer is free.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3.5 sm:flex-row sm:flex-wrap">
           <div className="flex flex-col gap-3 sm:flex-row">
  {/* Join a Workshop */}
<div className="flex flex-col gap-3 sm:flex-row">
  {/* Join a Workshop */}
  <Button
    asChild
    size="lg"
    className="w-full rounded-full border border-[#8B5E3C] bg-[#f5e6d3] text-[#7a3e28] shadow-sm transition-all duration-300 hover:border-[#8B5E3C] hover:bg-[#8B5E3C] hover:text-white sm:w-auto"
  >
    <Link
      href="/contact?topic=workshop"
      className="inline-flex items-center justify-center gap-2"
    >
      <span>Join a Workshop</span>
      <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  </Button>

  {/* Donate Spare Parts */}
  <Button
    asChild
    size="lg"
    className="w-full rounded-full border border-[#c25e38] bg-[#f5e6d3] text-[#7a3e28] shadow-sm transition-all duration-300 hover:border-[#c25e38] hover:bg-[#c25e38] hover:text-white sm:w-auto"
  >
    <Link
      href="/contact?topic=donate"
      className="inline-flex items-center justify-center gap-2"
    >
      <span>Donate Spare Parts</span>
      <Heart className="h-4 w-4 shrink-0" />
    </Link>
  </Button>

  {/* Mentor a Student */}
  <Button
    asChild
    size="lg"
    className="w-full rounded-full border border-[#c25e38] bg-[#f5e6d3] text-[#7a3e28] shadow-sm transition-all duration-300 hover:border-[#c25e38] hover:bg-[#c25e38] hover:text-white sm:w-auto"
  >
    <Link
      href="/contact?topic=mentor"
      className="inline-flex items-center justify-center gap-2"
    >
      <span>Mentor a Student</span>
      <GraduationCap className="h-4 w-4 shrink-0" />
    </Link>
  </Button>
</div>
</div>
          </div>
        </div>
      </div>
    </section>
  )
}

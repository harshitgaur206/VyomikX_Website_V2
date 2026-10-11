import type { Metadata } from "next"
import { Hero } from "@/components/home/hero"
import {
  AboutPreview,
  FeaturedProjects,
  OpenResources,
  FuturePreview,
  TeamPreview,
  HomeCta,
} from "@/components/home/home-sections"

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "VyomikX — Technology Education for Every Student",
    description:
      "A student-led movement at ZHCET, AMU sharing tools, mentorship, and equipment so curious minds from all backgrounds can build real technology — 100% free.",
    siteName: "VyomikX",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "VyomikX — Technology Education for Every Student",
      },
    ],
  },
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <FeaturedProjects />
      <OpenResources />
      <FuturePreview />
      <TeamPreview />
      <HomeCta />
      
    </>
  )
}

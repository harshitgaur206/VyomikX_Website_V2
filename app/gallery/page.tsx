import type { Metadata } from "next"
import { GalleryPageClient } from "@/components/gallery-page-client"

export const metadata: Metadata = {
  title: "Gallery & Media Archive",
  description:
    "Explore high-resolution photos and video clips from VyomikX's community workshops, school visits, robotics sessions, and team builds.",
  alternates: {
    canonical: "/gallery",
  },
  openGraph: {
    type: "website",
    url: "/gallery",
    title: "Gallery & Media Archive — VyomikX",
    description:
      "Explore high-resolution photos and video clips from VyomikX's community workshops, school visits, robotics sessions, and team builds.",
    siteName: "VyomikX",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "VyomikX Workshop & Media Gallery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gallery & Media Archive — VyomikX",
    description:
      "Explore high-resolution photos and video clips from VyomikX's community workshops, school visits, robotics sessions, and team builds.",
    images: ["/og-image.jpg"],
  },
}

export default function GalleryPage() {
  return <GalleryPageClient />
}

import type { Metadata } from "next"
import { GalleryPageClient } from "@/components/gallery-page-client"

export const metadata: Metadata = {
  title: "Gallery & Media Archive",
  description:
    "Explore high-resolution photos and video clips from VyomikX's community workshops, school visits, robotics sessions, and team builds.",
}

export default function GalleryPage() {
  return <GalleryPageClient />
}

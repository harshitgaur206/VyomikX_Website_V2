import type { MetadataRoute } from "next"
import { projects } from "@/lib/site-data"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vyomikx.in"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/contact",
    "/future",
    "/gallery",
    "/projects",
    "/privacy",
    "/support",
    "/team",
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }))

  const projectRoutes = projects.map((project) => ({
    url: `${siteUrl}/projects/${project.slug}`,
    lastModified: new Date(),
  }))

  return [...staticRoutes, ...projectRoutes]
}

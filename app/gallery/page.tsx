"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { Calendar, MapPin, Maximize2, X } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { galleryItems, type GalleryItem } from "@/lib/site-data"
import { cn } from "@/lib/utils"

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All")
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)

  const categories = useMemo(() => {
    return ["All", "Workshops", "School Visits", "Projects", "Community"]
  }, [])

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") return galleryItems
    return galleryItems.filter((item) => item.category === activeCategory)
  }, [activeCategory])

  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="Captured moments from our builds &amp; outreach"
        description="Browse photos from our community workshops, school visits, robotics build sessions, and hands-on mentorship."
      />

      <section className="bg-tech-grid py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-200 active:scale-95",
                  activeCategory === cat
                    ? "border-accent bg-accent text-accent-foreground shadow-sm"
                    : "border-border bg-card/80 text-muted-foreground hover:border-accent/50 hover:text-foreground",
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Gallery Items Grid */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="group relative cursor-pointer overflow-hidden rounded-3xl border border-border bg-card shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity group-hover:opacity-90" />
                  
                  {/* Category Tag */}
                  <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[11px] font-semibold text-emerald-300 backdrop-blur-md">
                    {item.category}
                  </span>

                  {/* Expand Icon */}
                  <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100">
                    <Maximize2 className="h-4 w-4" />
                  </div>

                  {/* Bottom Text inside Image */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center gap-3 text-[11px] font-medium text-muted-foreground/90">
                      <span className="flex items-center gap-1 text-white/80">
                        <Calendar className="h-3 w-3 text-accent" />
                        {item.date}
                      </span>
                      <span>&middot;</span>
                      <span className="flex items-center gap-1 text-white/80">
                        <MapPin className="h-3 w-3 text-accent" />
                        {item.location}
                      </span>
                    </div>
                    <h3 className="mt-1 font-display text-base font-semibold text-white line-clamp-1">
                      {item.title}
                    </h3>
                  </div>
                </div>

                <div className="p-4">
                  <p className="text-xs leading-relaxed text-muted-foreground line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="mt-16 text-center text-muted-foreground">
              <p className="text-sm font-medium">No images found in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md animate-fade-up"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-border bg-card shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10] w-full bg-black">
              <Image
                src={selectedItem.image}
                alt={selectedItem.title}
                fill
                sizes="100vw"
                className="object-contain"
              />
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-md transition-transform active:scale-95"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="rounded-full border border-border/80 bg-muted px-3 py-1 text-xs font-semibold text-accent">
                  {selectedItem.category}
                </span>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-accent" />
                    {selectedItem.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-accent" />
                    {selectedItem.location}
                  </span>
                </div>
              </div>

              <h2 className="mt-3 font-display text-xl font-bold text-foreground sm:text-2xl">
                {selectedItem.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {selectedItem.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

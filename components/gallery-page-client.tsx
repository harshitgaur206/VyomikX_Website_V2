"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import { Calendar, MapPin, Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { galleryItems, workshopCategories, type GalleryItem } from "@/lib/site-data"
import { cn } from "@/lib/utils"
import { useEscapeToClose } from "@/lib/use-escape-to-close"

const INITIAL_ALL_COUNT = 9

export function GalleryPageClient() {
  const [activeCategory, setActiveCategory] = useState<string>("All")
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)
  const [showAllInAllTab, setShowAllInAllTab] = useState<boolean>(false)

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") return galleryItems
    return galleryItems.filter((item) => item.category === activeCategory)
  }, [activeCategory])

  const displayedItems = useMemo(() => {
    if (activeCategory === "All" && !showAllInAllTab) {
      return filteredItems.slice(0, INITIAL_ALL_COUNT)
    }
    return filteredItems
  }, [filteredItems, activeCategory, showAllInAllTab])

  const currentIndex = useMemo(() => {
    if (!selectedItem) return -1
    return displayedItems.findIndex((it) => it.id === selectedItem.id)
  }, [selectedItem, displayedItems])

  useEscapeToClose(!!selectedItem, () => setSelectedItem(null))

  // Keyboard navigation inside lightbox
  useEffect(() => {
    if (!selectedItem) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && currentIndex > 0) {
        setSelectedItem(displayedItems[currentIndex - 1])
      } else if (e.key === "ArrowRight" && currentIndex < displayedItems.length - 1) {
        setSelectedItem(displayedItems[currentIndex + 1])
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedItem, currentIndex, displayedItems])

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat)
    setShowAllInAllTab(false)
  }

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (currentIndex > 0) {
      setSelectedItem(displayedItems[currentIndex - 1])
    }
  }

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (currentIndex < displayedItems.length - 1) {
      setSelectedItem(displayedItems[currentIndex + 1])
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Workshops &amp; Media Archive"
        title="Captured moments from our workshops"
        description="Explore photos from all the robotics, electronics, and STEM workshops organized by VyomikX across various institutions."
      />

      <section className="bg-tech-grid py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Workshop Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {workshopCategories.map((cat) => {
              const isActive = activeCategory === cat
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategoryChange(cat)}
                  className={cn(
                    "inline-flex items-center rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-200 active:scale-95",
                    isActive
                      ? "border-accent bg-accent text-accent-foreground shadow-sm"
                      : "border-border bg-card/80 text-muted-foreground hover:border-accent/50 hover:text-foreground",
                  )}
                >
                  {cat}
                </button>
              )
            })}
          </div>

          {/* Gallery Items Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {displayedItems.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="group relative cursor-pointer overflow-hidden rounded-3xl border border-border bg-card shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={idx < 6}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity group-hover:opacity-90" />

                  {/* Workshop Tag */}
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

          {/* View All / Show Less Button for "All" Category */}
          {activeCategory === "All" && filteredItems.length > INITIAL_ALL_COUNT && (
            <div className="flex justify-center pt-6">
              {!showAllInAllTab ? (
                <button
                  type="button"
                  onClick={() => setShowAllInAllTab(true)}
                  className="inline-flex items-center justify-center rounded-full border border-accent/40 bg-card px-8 py-3 text-xs font-semibold text-foreground shadow-sm transition-all duration-300 hover:border-accent hover:bg-accent hover:text-accent-foreground active:scale-95"
                >
                  View All
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowAllInAllTab(false)}
                  className="inline-flex items-center justify-center rounded-full border border-border bg-card px-6 py-2.5 text-xs font-semibold text-muted-foreground transition-all duration-200 hover:border-accent/40 hover:text-foreground active:scale-95"
                >
                  Show Less
                </button>
              )}
            </div>
          )}

          {filteredItems.length === 0 && (
            <div className="mt-16 text-center text-muted-foreground">
              <p className="text-sm font-medium">No images found for this workshop yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedItem.title}
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

              {/* Prev Button */}
              {currentIndex > 0 && (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-md transition-all hover:scale-105 active:scale-95"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
              )}

              {/* Next Button */}
              {currentIndex < displayedItems.length - 1 && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-md transition-all hover:scale-105 active:scale-95"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              )}

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-md transition-transform hover:scale-105 active:scale-95"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Counter Pill */}
              <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-[11px] font-mono text-white/90 backdrop-blur-md">
                {currentIndex + 1} / {displayedItems.length}
              </div>
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

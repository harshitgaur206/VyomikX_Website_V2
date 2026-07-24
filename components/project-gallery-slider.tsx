"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react"

export type GalleryImage = {
  src: string
  caption: string
}

export function ProjectGallerySlider({ gallery, title }: { gallery: GalleryImage[]; title: string }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  if (!gallery || gallery.length === 0) return null

  const active = gallery[activeIdx]

  return (
    <div className="space-y-4">
      {/* Main Main Image Slider Display */}
      <div className="group relative overflow-hidden rounded-3xl border border-border bg-card shadow-lg">
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Image
            src={active.src}
            alt={active.caption || title}
            fill
            sizes="(max-width: 1024px) 100vw, 800px"
            className="object-cover transition-transform duration-500 group-hover:scale-102"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Caption Overlay */}
          <div className="absolute bottom-4 left-4 right-4 z-10 flex items-end justify-between gap-4 sm:bottom-6 sm:left-6 sm:right-6">
            <p className="font-display text-sm font-semibold text-white drop-shadow-md sm:text-base">
              {active.caption}
            </p>

            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition-transform active:scale-90 hover:scale-105"
              aria-label="Enlarge image"
            >
              <Maximize2 className="h-4 w-4" />
            </button>
          </div>

          {/* Controls */}
          {gallery.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => setActiveIdx((prev) => (prev - 1 + gallery.length) % gallery.length)}
                className="absolute left-3 top-1/2 z-10 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100 active:scale-90"
                aria-label="Previous photo"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={() => setActiveIdx((prev) => (prev + 1) % gallery.length)}
                className="absolute right-3 top-1/2 z-10 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100 active:scale-90"
                aria-label="Next photo"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Thumbnails Row */}
      {gallery.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          {gallery.map((img, idx) => (
            <button
              key={img.src + idx}
              type="button"
              onClick={() => setActiveIdx(idx)}
              className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-2xl border-2 transition-all duration-200 ${
                idx === activeIdx
                  ? "border-accent ring-2 ring-accent/30 scale-105"
                  : "border-border/70 opacity-70 hover:opacity-100 hover:border-accent/50"
              }`}
            >
              <Image src={img.src} alt={img.caption} fill sizes="112px" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Full-Screen Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md animate-fade-up"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-border bg-card shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10] w-full bg-black">
              <Image
                src={active.src}
                alt={active.caption}
                fill
                sizes="100vw"
                className="object-contain"
              />
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-md active:scale-95"
                aria-label="Close lightbox"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-5 text-center">
              <p className="font-display text-base font-semibold text-foreground">{active.caption}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

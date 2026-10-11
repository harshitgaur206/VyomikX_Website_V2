"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react"
import { useEscapeToClose } from "@/lib/use-escape-to-close"

export type GalleryImage = {
  src: string
  caption: string
}

export function ProjectGallerySlider({ gallery, title }: { gallery: GalleryImage[]; title: string }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  useEscapeToClose(lightboxOpen, () => setLightboxOpen(false))

  if (!gallery || gallery.length === 0) return null

  const active = gallery[activeIdx]

  return (
    <div className="w-full min-w-0 max-w-full space-y-3 sm:space-y-4">
      {/* Main Image Slider Display */}
      <div className="group relative w-full min-w-0 max-w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-border bg-card shadow-lg">
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Image
            src={active.src}
            alt={active.caption || title}
            fill
            sizes="(max-width: 1024px) 100vw, 800px"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            priority
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

          {/* Photo Counter Badge (e.g. 1 / 4) */}
          {gallery.length > 1 && (
            <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-10 rounded-full border border-white/20 bg-black/60 px-2.5 py-0.5 sm:py-1 text-[11px] font-medium text-white backdrop-blur-md shadow-xs">
              {activeIdx + 1} / {gallery.length}
            </div>
          )}

          {/* Caption Overlay */}
          <div className="absolute bottom-2.5 left-2.5 right-2.5 z-10 flex items-end justify-between gap-3 sm:bottom-5 sm:left-5 sm:right-5">
            <p className="font-display text-xs sm:text-sm md:text-base font-semibold text-white drop-shadow-md line-clamp-2 max-w-[calc(100%-2.5rem)]">
              {active.caption}
            </p>

            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-md transition-transform active:scale-90 hover:scale-105 hover:bg-black/70"
              aria-label="Enlarge image"
            >
              <Maximize2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </button>
          </div>

          {/* Navigation Controls - Always accessible on mobile, hover on desktop */}
          {gallery.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => setActiveIdx((prev) => (prev - 1 + gallery.length) % gallery.length)}
                className="absolute left-2 sm:left-3 top-1/2 z-10 -translate-y-1/2 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-md transition-all opacity-90 sm:opacity-0 sm:group-hover:opacity-100 active:scale-90 hover:bg-black/80"
                aria-label="Previous photo"
              >
                <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>

              <button
                type="button"
                onClick={() => setActiveIdx((prev) => (prev + 1) % gallery.length)}
                className="absolute right-2 sm:right-3 top-1/2 z-10 -translate-y-1/2 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-md transition-all opacity-90 sm:opacity-0 sm:group-hover:opacity-100 active:scale-90 hover:bg-black/80"
                aria-label="Next photo"
              >
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Thumbnails Row - Touch friendly horizontal scroll */}
      {gallery.length > 1 && (
        <div className="flex w-full min-w-0 max-w-full items-center gap-2 sm:gap-3 overflow-x-auto pb-1.5 scrollbar-thin">
          {gallery.map((img, idx) => (
            <button
              key={img.src + idx}
              type="button"
              onClick={() => setActiveIdx(idx)}
              className={`relative h-16 w-20 sm:h-20 sm:w-28 shrink-0 overflow-hidden rounded-xl sm:rounded-2xl border-2 transition-all duration-200 ${
                idx === activeIdx
                  ? "border-accent ring-2 ring-accent/30 scale-[1.02]"
                  : "border-border/70 opacity-70 hover:opacity-100 hover:border-accent/50"
              }`}
            >
              <Image src={img.src} alt={img.caption || `${title} photo ${idx + 1}`} fill sizes="112px" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Full-Screen Lightbox Modal */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.caption || "Image preview"}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-3 sm:p-4 backdrop-blur-md animate-fade-up"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-2xl sm:rounded-3xl border border-border bg-card shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[4/3] sm:aspect-[16/10] max-h-[75vh] w-full bg-black flex items-center justify-center">
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
                className="absolute right-3 top-3 sm:right-4 sm:top-4 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white backdrop-blur-md active:scale-95"
                aria-label="Close lightbox"
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>
            <div className="p-3.5 sm:p-5 text-center">
              <p className="font-display text-xs sm:text-base font-semibold text-foreground">{active.caption}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

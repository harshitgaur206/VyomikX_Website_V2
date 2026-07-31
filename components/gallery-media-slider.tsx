"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ExternalLink, FolderOpen, Maximize2, Play, Video, Volume2, VolumeX, X } from "lucide-react"

export type MediaSlide = {
  src: string
  title: string
  caption?: string
  category?: string
  type?: "image" | "video"
  poster?: string
}

const WORKSHOP_DRIVE_URL = "https://"

function isVideo(src: string, type?: string): boolean {
  if (type === "video") return true
  const ext = src.split(".").pop()?.toLowerCase()
  return ext === "mp4" || ext === "webm" || ext === "mov" || ext === "m4v"
}

export function GalleryMediaSlider({ slides }: { slides: MediaSlide[] }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const [isMuted, setIsMuted] = useState(true)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({})

  const active = slides[activeIdx]
  const currentIsVid = active ? isVideo(active.src, active.type) : false

  useEffect(() => {
    Object.keys(videoRefs.current).forEach((key) => {
      const idx = Number(key)
      const vid = videoRefs.current[idx]
      if (vid) {
        if (idx === activeIdx) {
          vid.play().catch(() => {})
        } else {
          vid.pause()
          vid.currentTime = 0
        }
      }
    })
  }, [activeIdx])

  if (!slides || slides.length === 0) return null

  return (
    <div className="space-y-4">
      {/* Main Main Media Viewport */}
      <div className="group relative overflow-hidden rounded-3xl border-2 border-accent/40 bg-black shadow-2xl transition-all duration-300 hover:border-accent/70">
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
          {slides.map((slide, idx) => {
            const vid = isVideo(slide.src, slide.type)
            const isActive = idx === activeIdx

            return (
              <div
                key={slide.src + idx}
                className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                  isActive ? "opacity-100 z-10 scale-100" : "opacity-0 z-0 scale-105 pointer-events-none"
                }`}
              >
                {vid ? (
                  <video
                    ref={(el) => {
                      videoRefs.current[idx] = el
                    }}
                    src={slide.src}
                    autoPlay={isActive}
                    loop
                    muted={isMuted}
                    playsInline
                    poster={slide.poster}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Image
                    src={slide.src}
                    alt={slide.caption || slide.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 950px"
                    className="object-cover"
                    priority={idx === 0}
                  />
                )}
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/10 pointer-events-none" />
              </div>
            )
          })}

          {/* Top Tech Telemetry Header Badge */}
          <div className="absolute left-4 top-4 z-20 flex items-center gap-2.5 rounded-full border border-white/20 bg-black/60 px-3.5 py-1.5 backdrop-blur-md">
            {currentIsVid ? (
              <>
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
               
              </>
            ) : (
              <>
              </>
            )}
            <span className="text-white/40">&middot;</span>
            <span className="font-mono text-[10px] text-muted-foreground/90">
              [{activeIdx + 1} / {slides.length}]
            </span>
          </div>

          {/* Top Controls */}
          <div className="absolute right-4 top-4 z-20 flex items-center gap-2">
            

            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-md transition-all active:scale-90 hover:bg-black/80 hover:border-accent"
              aria-label="Enlarge view"
            >
              <Maximize2 className="h-4 w-4" />
            </button>
          </div>

          {/* Caption Overlay at Bottom */}
          <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div className="max-w-xl space-y-1">
              {active.category && (
                <span className="inline-block rounded-full border border-white/20 bg-black/60 px-3 py-0.5 text-[11px] font-semibold text-emerald-300 backdrop-blur-md">
                  {active.category}
                </span>
              )}
              <h3 className="font-display text-base font-bold text-white sm:text-xl drop-shadow-md">
                {active.title}
              </h3>
              {active.caption && (
                <p className="text-xs text-white/80 line-clamp-1">{active.caption}</p>
              )}
            </div>

            
          </div>

          {/* Controls */}
          {slides.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => setActiveIdx((prev) => (prev - 1 + slides.length) % slides.length)}
                className="absolute left-3 top-1/2 z-20 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100 active:scale-90 hover:border-accent"
                aria-label="Previous media"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={() => setActiveIdx((prev) => (prev + 1) % slides.length)}
                className="absolute right-3 top-1/2 z-20 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100 active:scale-90 hover:border-accent"
                aria-label="Next media"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Thumbnails Row */}
      {slides.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          {slides.map((s, idx) => {
            const vid = isVideo(s.src, s.type)
            const isSelected = idx === activeIdx

            return (
              <button
                key={s.src + idx}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`relative h-20 w-32 shrink-0 overflow-hidden rounded-2xl border-2 transition-all duration-200 ${
                  isSelected
                    ? "border-accent ring-2 ring-accent/30 scale-105 z-10"
                    : "border-border/70 opacity-70 hover:opacity-100 hover:border-accent/50"
                }`}
              >
                {vid ? (
                  <div className="relative h-full w-full bg-black">
                    <video src={s.src} muted className="h-full w-full object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/90 text-black">
                        <Play className="h-3.5 w-3.5 fill-current ml-0.5" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <Image src={s.src} alt={s.title} fill sizes="128px" className="object-cover" />
                )}
                <span className="absolute bottom-1 left-1.5 rounded bg-black/70 px-1.5 py-0.5 font-mono text-[9px] text-white">
                  
                </span>
              </button>
            )
          })}
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md animate-fade-up"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-border bg-card shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/9] w-full bg-black">
              {currentIsVid ? (
                <video src={active.src} autoPlay controls loop className="h-full w-full object-contain" />
              ) : (
                <Image src={active.src} alt={active.title} fill sizes="100vw" className="object-contain" />
              )}
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-md active:scale-95"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-5 text-center">
              <p className="font-display text-base font-semibold text-foreground">{active.title}</p>
              {active.caption && (
                <p className="mt-1 text-xs text-muted-foreground">{active.caption}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

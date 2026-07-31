"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Pause, Play, Sparkles, Video, Volume2, VolumeX } from "lucide-react"

export type SlideItem = {
  src: string
  alt: string
  title: string
  tag?: string
  type?: "image" | "video"
  isVideo?: boolean
}

function isVideoSlide(slide: SlideItem): boolean {
  if (slide.isVideo || slide.type === "video") return true
  const ext = slide.src.split(".").pop()?.toLowerCase()
  return ext === "mp4" || ext === "webm" || ext === "mov" || ext === "m4v"
}

// Custom hook to detect and convert HEIC files on client-side
function useHeicImage(src: string) {
  const [convertedSrc, setConvertedSrc] = useState<string>(src)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const ext = src.split(".").pop()?.toLowerCase()
    const isHeic = ext === "heic" || ext === "heif"

    if (isHeic) {
      setIsLoading(true)
      // Dynamically import heic2any to prevent SSR/build issues
      import("heic2any")
        .then((heic2anyModule) => {
          const heic2any = heic2anyModule.default
          return fetch(src)
            .then((res) => res.blob())
            .then((blob) =>
              heic2any({
                blob,
                toType: "image/jpeg",
                quality: 0.85,
              })
            )
        })
        .then((conversionResult) => {
          const resultBlob = Array.isArray(conversionResult)
            ? conversionResult[0]
            : conversionResult
          const objectUrl = URL.createObjectURL(resultBlob)
          setConvertedSrc(objectUrl)
          setIsLoading(false)
        })
        .catch((err) => {
          console.error("HEIC conversion failed for:", src, err)
          setIsLoading(false)
        })
    } else {
      setConvertedSrc(src)
    }
  }, [src])

  return { displaySrc: convertedSrc, isLoading }
}

// Individual Slide Image Renderer
function SlideImage({ slide, priority }: { slide: SlideItem; priority: boolean }) {
  const { displaySrc, isLoading } = useHeicImage(slide.src)

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-black/60 text-white/70 text-sm font-mono animate-pulse">
        Processing Image...
      </div>
    )
  }

  // If the source was converted to a Blob URL, use standard <img />, otherwise Next.js <Image />
  const isBlobUrl = displaySrc.startsWith("blob:")

  if (isBlobUrl) {
    return (
      <img
        src={displaySrc}
        alt={slide.alt || slide.title}
        className="h-full w-full object-cover"
      />
    )
  }

  return (
    <Image
      src={displaySrc}
      alt={slide.alt || slide.title}
      fill
      sizes="(max-width: 1024px) 100vw, 850px"
      className="object-cover"
      priority={priority}
    />
  )
}

export function ImageSlideshow({ slides }: { slides: SlideItem[] }) {
  const [current, setCurrent] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({})

  const activeSlide = slides[current]
  const currentIsVideo = activeSlide ? isVideoSlide(activeSlide) : false

  useEffect(() => {
    if (!isPlaying || slides.length === 0) return
    const duration = currentIsVideo ? 10000 : 4500
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, duration)
    return () => clearInterval(timer)
  }, [isPlaying, slides.length, currentIsVideo])

  useEffect(() => {
    Object.keys(videoRefs.current).forEach((key) => {
      const idx = Number(key)
      const vid = videoRefs.current[idx]
      if (vid) {
        if (idx === current) {
          vid.play().catch(() => {})
        } else {
          vid.pause()
          vid.currentTime = 0
        }
      }
    })
  }, [current])

  if (!slides || slides.length === 0) return null

  return (
    <div
      className="group relative overflow-hidden rounded-3xl border-2 border-border/80 bg-card shadow-2xl transition-all duration-300 hover:border-accent/50"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      {/* Slides Viewport */}
      <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/10] lg:h-[440px] bg-black">
        {slides.map((slide, idx) => {
          const isVid = isVideoSlide(slide)
          const isActive = idx === current

          return (
            <div
              key={slide.src + idx}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                isActive ? "opacity-100 z-10 scale-100" : "opacity-0 z-0 scale-105 pointer-events-none"
              }`}
            >
              {isVid ? (
                <video
                  ref={(el) => {
                    videoRefs.current[idx] = el
                  }}
                  src={slide.src}
                  autoPlay={isActive}
                  loop
                  muted={isMuted}
                  playsInline
                  className="h-full w-full object-cover"
                />
              ) : (
                <SlideImage slide={slide} priority={idx === 0} />
              )}
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10 pointer-events-none" />
            </div>
          )
        })}

        {/* Top Telemetry & Media Type Pill */}
        <div className="absolute left-4 top-4 z-20 flex items-center gap-2 rounded-full border border-white/20 bg-black/50 px-3.5 py-1 text-[11px] font-mono font-medium text-white backdrop-blur-md">
          {currentIsVideo ? (
            <>
              <Video className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-bold">VIDEO REEL</span>
            </>
          ) : (
            <>
              <Sparkles className="h-3 w-3 text-amber-400" />
              <span>WORKSHOP PHOTO</span>
            </>
          )}
        </div>

        {/* Top Right Controls (Mute toggle for videos) */}
        {currentIsVideo && (
          <button
            type="button"
            onClick={() => setIsMuted((prev) => !prev)}
            className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-black/50 text-white backdrop-blur-md transition-transform active:scale-90 hover:scale-105"
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? <VolumeX className="h-4 w-4 text-amber-400" /> : <Volume2 className="h-4 w-4 text-emerald-400" />}
          </button>
        )}

        {/* Slide Info Badge & Caption Overlay */}
        <div className="absolute bottom-5 left-5 right-5 z-20 flex items-end justify-between gap-4 sm:bottom-6 sm:left-6 sm:right-6">
          <div className="space-y-1.5 max-w-lg">
            {activeSlide.tag && (
              <span className="inline-block rounded-full border border-white/25 bg-black/50 px-3.5 py-1 text-xs font-semibold text-white backdrop-blur-md shadow-xs">
                {activeSlide.tag}
              </span>
            )}
            <h3 className="font-display text-lg font-bold text-white drop-shadow-md sm:text-xl lg:text-2xl">
              {activeSlide.title}
            </h3>
          </div>

          {/* Play/Pause Toggle Indicator */}
          <button
            type="button"
            onClick={() => setIsPlaying((prev) => !prev)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/25 bg-black/50 text-white backdrop-blur-md transition-transform active:scale-90 hover:scale-105"
            aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Prev / Next Controls */}
      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)}
            className="absolute left-4 top-1/2 z-20 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/50 text-white opacity-0 backdrop-blur-md transition-all group-hover:opacity-100 active:scale-90 hover:bg-black/70"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
            className="absolute right-4 top-1/2 z-20 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/50 text-white opacity-0 backdrop-blur-md transition-all group-hover:opacity-100 active:scale-90 hover:bg-black/70"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      {/* Slide Indicators Dots */}
      <div className="absolute bottom-2.5 left-1/2 z-20 flex -translate-x-1/2 gap-2 sm:bottom-3.5">
        {slides.map((s, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? "w-7 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
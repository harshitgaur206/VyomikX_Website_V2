"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Pause, Play, Sparkles } from "lucide-react"

export type SlideItem = {
  src: string
  alt: string
  title: string
  tag?: string
}

export function ImageSlideshow({ slides }: { slides: SlideItem[] }) {
  const [current, setCurrent] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    if (!isPlaying || slides.length === 0) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [isPlaying, slides.length])

  if (!slides || slides.length === 0) return null

  const activeSlide = slides[current]

  return (
    <div
      className="group relative overflow-hidden rounded-3xl border-2 border-border/80 bg-card shadow-2xl transition-all duration-300 hover:border-accent/50"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      {/* Slides Viewport - Prominent Larger Scale */}
      <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/10] lg:h-[440px]">
        {slides.map((slide, idx) => (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              idx === current ? "opacity-100 z-10 scale-100" : "opacity-0 z-0 scale-105 pointer-events-none"
            }`}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 850px"
              className="object-cover"
              priority={idx === 0}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />
          </div>
        ))}

        {/* Top Tech Telemetry Pill */}
        <div className="absolute left-4 top-4 z-20 flex items-center gap-2 rounded-full border border-white/20 bg-black/50 px-3.5 py-1 text-[11px] font-mono font-medium text-emerald-300 backdrop-blur-md">
          <Sparkles className="h-3 w-3 text-emerald-400" />
          <span>[WHO_WE_ARE_FEED]</span>
        </div>

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

      {/* Slide Indicators Dots */}
      <div className="absolute bottom-2.5 left-1/2 z-20 flex -translate-x-1/2 gap-2 sm:bottom-3.5">
        {slides.map((_, i) => (
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

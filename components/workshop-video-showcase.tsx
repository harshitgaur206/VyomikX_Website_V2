"use client"

import { useRef, useState } from "react"
import { ExternalLink, FolderOpen, Maximize2, Volume2, VolumeX, Play, Pause, Sparkles } from "lucide-react"

export const WORKSHOP_DRIVE_URL = "https://drive.google.com/drive/folders/1q6z7CZz8q8R7LcaKeh7mQqMYzlxygyM7?usp=drive_link"

export function WorkshopVideoShowcase({
  videoSrc = "/gallery/outreach-11.mp4",
  title = "Recent Workshops & Hands-On Outreach Reel",
  subtitle = "Watch our team in action conducting robotics sessions, circuit builds, and school outreach visits.",
}: {
  videoSrc?: string
  title?: string
  subtitle?: string
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (!document.fullscreenElement) {
        videoRef.current.requestFullscreen().catch(() => {})
        setIsFullscreen(true)
      } else {
        document.exitFullscreen().catch(() => {})
        setIsFullscreen(false)
      }
    }
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border-2 border-accent/40 bg-card p-1 shadow-2xl transition-all duration-300 hover:border-accent/70">
      {/* Outer Tech Glowing Ambient Border */}
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-accent/20 via-primary/20 to-accent/20 blur-xl opacity-50" />

      <div className="relative overflow-hidden rounded-[22px] bg-black">
        {/* Video Player */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
          <video
            ref={videoRef}
            src={videoSrc}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="h-full w-full object-cover"
          />

          {/* Tech HUD Corner Brackets */}
          <div className="pointer-events-none absolute left-3 top-3 h-4 w-4 border-l-2 border-t-2 border-accent/80" />
          <div className="pointer-events-none absolute right-3 top-3 h-4 w-4 border-r-2 border-t-2 border-accent/80" />
          <div className="pointer-events-none absolute bottom-3 left-3 h-4 w-4 border-b-2 border-l-2 border-accent/80" />
          <div className="pointer-events-none absolute bottom-3 right-3 h-4 w-4 border-b-2 border-r-2 border-accent/80" />

          {/* Tech Telemetry Header Badge */}
          <div className="absolute left-4 top-4 z-10 flex items-center gap-2.5 rounded-full border border-white/20 bg-black/60 px-3.5 py-1.5 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="font-mono text-[11px] font-bold tracking-wider text-emerald-400 uppercase">
              LIVE WORKSHOP REEL
            </span>
            <span className="text-white/40">&middot;</span>
            <span className="font-mono text-[10px] text-muted-foreground/90">60 FPS AUTO-LOOP</span>
          </div>

          {/* Floating Player Controls */}
          <div className="absolute right-4 top-4 z-10 flex items-center gap-2">
            <button
              type="button"
              onClick={togglePlay}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-md transition-all active:scale-90 hover:bg-black/80 hover:border-accent"
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>

            <button
              type="button"
              onClick={toggleMute}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-md transition-all active:scale-90 hover:bg-black/80 hover:border-accent"
              aria-label={isMuted ? "Unmute audio" : "Mute audio"}
            >
              {isMuted ? <VolumeX className="h-4 w-4 text-amber-400" /> : <Volume2 className="h-4 w-4 text-emerald-400" />}
            </button>

            <button
              type="button"
              onClick={toggleFullscreen}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-md transition-all active:scale-90 hover:bg-black/80 hover:border-accent"
              aria-label="Fullscreen video"
            >
              <Maximize2 className="h-4 w-4" />
            </button>
          </div>

          {/* Gradient Overlay at Bottom */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black via-black/40 to-transparent" />

          {/* Bottom Title Bar */}
          <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="font-display text-base font-bold text-white sm:text-lg drop-shadow-md">
                {title}
              </p>
              <p className="mt-0.5 text-xs text-white/80 line-clamp-1">
                {subtitle}
              </p>
            </div>

            <a
              href={WORKSHOP_DRIVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-accent/60 bg-accent px-4 py-2 text-xs font-semibold text-accent-foreground backdrop-blur-md transition-all duration-200 hover:scale-105 hover:shadow-md active:scale-95"
            >
              <FolderOpen className="h-4 w-4" />
              Full Drive Media Archive
              <ExternalLink className="h-3.5 w-3.5 opacity-90" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

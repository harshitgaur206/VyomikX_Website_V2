"use client"

import { useEffect, useRef, useState, useCallback, useId } from "react"
import { Play, Pause, RotateCcw, ChevronRight } from "lucide-react"

export type JourneyItem = {
  month: string
  year: string
  title: string
  text: string
  tag?: string
  iconName?: "Sparkles" | "GraduationCap" | "Cpu" | "Rocket"
}

interface JourneyTimelineProps {
  journey: JourneyItem[]
}

// Ultra-smooth, non-overlapping path with wide arches, deep valley, and a perfect circular loop
const SMOOTH_ROUTE_D =
  "M 0 490 C 140 490, 280 485, 410 445 C 450 410, 445 250, 480 150 C 495 105, 515 75, 545 75 C 580 75, 630 115, 665 190 C 695 250, 690 350, 725 425 C 745 470, 775 480, 810 475 C 850 465, 875 360, 905 240 C 920 170, 935 110, 960 90 C 980 70, 1025 65, 1045 95 C 1065 125, 1055 175, 1015 185 C 975 190, 955 145, 975 105 C 990 75, 1035 80, 1055 110 C 1075 145, 1070 260, 1075 350 C 1080 415, 1090 465, 1110 480"

// 5 Milestone target coordinates located directly on the smooth curve with ample clearances
const MILESTONE_TARGETS = [
  [455, 330],
  [545, 75],
  [675, 215],
  [790, 475],
  [1055, 110],
]

export function JourneyTimeline({ journey }: JourneyTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const routeRef = useRef<SVGPathElement>(null)
  const mpathRef = useRef<SVGPathElement>(null)
  const walkerRef = useRef<SVGCircleElement>(null)
  const feetGroupRef = useRef<SVGGElement>(null)

  const [isPlaying, setIsPlaying] = useState<boolean>(true)
  const [isDone, setIsDone] = useState<boolean>(false)
  const [hasStarted, setHasStarted] = useState<boolean>(false)

  // Internal state refs to run silky 60fps tick loop without React render overhead
  const stateRef = useRef<{
    L: number
    stops: number[]
    feet: { el: SVGUseElement; d: number }[]
    p: number
    idx: number
    playing: boolean
    stepOnly: boolean
    waiting: boolean
    timer: NodeJS.Timeout | null
    lastTime: number
    SPEED: number
    HOLD: number
  }>({
    L: 0,
    stops: [],
    feet: [],
    p: 0,
    idx: 0,
    playing: true,
    stepOnly: false,
    waiting: false,
    timer: null,
    lastTime: 0,
    SPEED: 230,
    HOLD: 1400,
  })

  const maskId = useId()

  const setButtonText = useCallback(() => {
    const s = stateRef.current
    if (s.p >= s.L && s.L > 0) {
      setIsDone(true)
      setIsPlaying(false)
    } else {
      setIsDone(false)
      setIsPlaying(s.playing)
    }
  }, [])

  const draw = useCallback(() => {
    const s = stateRef.current
    if (!mpathRef.current || !walkerRef.current || !routeRef.current) return

    mpathRef.current.style.strokeDashoffset = String(s.L - s.p)
    s.feet.forEach((f) => {
      if (f.d <= s.p) {
        f.el.classList.add("on")
      } else {
        f.el.classList.remove("on")
      }
    })

    if (s.p <= s.L && routeRef.current) {
      const q = routeRef.current.getPointAtLength(s.p)
      walkerRef.current.setAttribute("cx", String(q.x))
      walkerRef.current.setAttribute("cy", String(q.y))
    }
  }, [])

  const tick = useCallback(
    (t: number) => {
      const s = stateRef.current
      if (s.lastTime === 0) s.lastTime = t
      const dt = Math.min((t - s.lastTime) / 1000, 0.05)
      s.lastTime = t

      if (s.playing && !s.waiting && s.p < s.L) {
        const target = s.idx < s.stops.length ? s.stops[s.idx] : s.L
        s.p = Math.min(s.p + s.SPEED * dt, target)
        draw()

        if (s.p >= target) {
          if (s.idx < s.stops.length) {
            const milestoneEl = containerRef.current?.querySelector(`#m${s.idx}`)
            if (milestoneEl) milestoneEl.classList.add("on")
            s.idx++

            if (s.stepOnly) {
              s.playing = false
              s.stepOnly = false
              setButtonText()
            } else {
              s.waiting = true
              s.timer = setTimeout(() => {
                s.waiting = false
              }, s.HOLD)
            }
          } else {
            const endEl = containerRef.current?.querySelector("#end")
            if (endEl) endEl.classList.add("on")
            if (walkerRef.current) walkerRef.current.setAttribute("opacity", "0")
            s.playing = false
            setButtonText()
          }
        }
      }

      requestAnimationFrame(tick)
    },
    [draw, setButtonText]
  )

  // Initialize Route, Length, Stops, and Footprints
  useEffect(() => {
    const route = routeRef.current
    const mp = mpathRef.current
    const feetGroup = feetGroupRef.current
    if (!route || !mp || !feetGroup) return

    const L = route.getTotalLength()
    stateRef.current.L = L
    mp.setAttribute("d", route.getAttribute("d") || "")
    mp.style.strokeDasharray = String(L)
    mp.style.strokeDashoffset = String(L)

    // Calculate nearest path length for each milestone dot
    const stops: number[] = []
    let from = 0

    MILESTONE_TARGETS.forEach(([x, y]) => {
      let best = 1e9
      let bl = from
      for (let l = from; l <= L; l += 3) {
        const p = route.getPointAtLength(l)
        const d = (p.x - x) ** 2 + (p.y - y) ** 2
        if (d < best) {
          best = d
          bl = l
        }
      }
      stops.push(bl)
      from = bl + 10
    })
    stateRef.current.stops = stops

    // Generate footprints along the path alternating left/right
    while (feetGroup.firstChild) {
      feetGroup.removeChild(feetGroup.firstChild)
    }

    const NS = "http://www.w3.org/2000/svg"
    const footPos: number[] = []
    stops.forEach((s) =>
      [-48, -26, 24, 46].forEach((o) => {
        const d = Math.min(Math.max(s + o, 8), L - 10)
        footPos.push(d)
      })
    )
    footPos.sort((a, b) => a - b)

    const feet: { el: SVGUseElement; d: number }[] = []
    let n = 0

    for (const d of footPos) {
      n++
      const a = route.getPointAtLength(d)
      const b = route.getPointAtLength(d + 2)
      const ang = Math.atan2(b.y - a.y, b.x - a.x)
      const side = n % 2 ? 1 : -1
      const x = a.x + Math.cos(ang + Math.PI / 2) * 7 * side
      const y = a.y + Math.sin(ang + Math.PI / 2) * 7 * side

      const u = document.createElementNS(NS, "use") as SVGUseElement
      u.setAttribute("href", `#foot-${maskId}`)
      u.setAttribute(
        "transform",
        `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${(
          (ang * 180) / Math.PI +
          90
        ).toFixed(1)})`
      )
      u.setAttribute("class", "journey-foot")
      feetGroup.appendChild(u)
      feet.push({ el: u, d })
    }
    stateRef.current.feet = feet

    draw()
  }, [draw, maskId])

  // Trigger animation when scrolled into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true)
          if (walkerRef.current) walkerRef.current.setAttribute("opacity", "1")
          stateRef.current.lastTime = 0
          requestAnimationFrame((t) => tick(t))
        }
      },
      { threshold: 0.2 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [hasStarted, tick])

  const handlePlayToggle = () => {
    const s = stateRef.current
    if (s.p >= s.L) return
    s.playing = !s.playing
    s.stepOnly = false
    setButtonText()
  }

  const handleNextStep = () => {
    const s = stateRef.current
    if (s.p >= s.L) return
    if (s.timer) clearTimeout(s.timer)
    s.waiting = false
    s.playing = true
    s.stepOnly = true
    setButtonText()
  }

  const handleReset = () => {
    const s = stateRef.current
    if (s.timer) clearTimeout(s.timer)
    s.waiting = false
    s.p = 0
    s.idx = 0
    s.playing = true
    s.stepOnly = false

    containerRef.current
      ?.querySelectorAll(".journey-fade")
      .forEach((e) => e.classList.remove("on"))

    if (walkerRef.current) walkerRef.current.setAttribute("opacity", "1")
    draw()
    setButtonText()
  }

  return (
    <div ref={containerRef} className="relative mx-auto max-w-[1520px] px-2 py-6 sm:px-4">
      {/* Styles for silky transitions */}
      <style jsx global>{`
        .journey-fade {
          opacity: 0;
          transition: opacity 0.7s ease;
        }
        .journey-fade.on {
          opacity: 1;
        }
        .journey-foot {
          opacity: 0;
          transition: opacity 0.35s ease;
        }
        .journey-foot.on {
          opacity: 1;
        }
        .journey-ms text {
          font-size: 14.5px;
          line-height: 1.25;
        }
        .journey-ms .dot-in {
          transform-box: fill-box;
          transform-origin: center;
          transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .journey-ms.on .dot-in {
          transform: scale(1.35);
        }
        @keyframes journey-pulse {
          to {
            r: 13px;
            opacity: 0.55;
          }
        }
        .journey-pulse {
          animation: journey-pulse 1s infinite alternate ease-in-out;
        }
      `}</style>

      {/* SVG Canvas Stage */}
      <div className="overflow-x-auto rounded-3xl border border-border/80 bg-[#f7faf5] shadow-lg dark:bg-[#1b231c]">
        <svg
          viewBox="0 0 1520 577"
          xmlns="http://www.w3.org/2000/svg"
          className="block h-auto w-full min-w-[900px] select-none"
        >
          <defs>
            {/* Reveal Mask */}
            <mask
              id={`reveal-${maskId}`}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="1520"
              height="577"
            >
              <path
                ref={mpathRef}
                d=""
                fill="none"
                stroke="#fff"
                strokeWidth="16"
                strokeLinecap="butt"
              />
            </mask>

            {/* Miniature Footprint Definition (sole, heel & toes) */}
            <g id={`foot-${maskId}`}>
              <ellipse cx="0" cy="0" rx="3.6" ry="6.5" fill="currentColor" />
              <ellipse cx="0" cy="9" rx="2.6" ry="3" fill="currentColor" />
              <circle cx="-3" cy="-8.8" r="1.4" fill="currentColor" />
              <circle cx="0" cy="-9.8" r="1.5" fill="currentColor" />
              <circle cx="3" cy="-8.8" r="1.4" fill="currentColor" />
            </g>
          </defs>

          {/* Top-Left Title Card */}
          <rect
            x="34"
            y="82"
            width="410"
            height="55"
            rx="6"
            fill="none"
            className="stroke-gray-500 dark:stroke-gray-400"
            strokeWidth="1.5"
          />
          <text
            x="46"
            y="119"
            className="font-display text-[29px] font-bold fill-[#d2662c] dark:fill-[#ef8a52]"
          >
            The Journey of VyomikX
          </text>

          {/* Ultra-Smooth Continuous Winding Path with Mask */}
          <path
            ref={routeRef}
            fill="none"
            strokeWidth="5"
            strokeDasharray="9 11"
            strokeLinecap="round"
            mask={`url(#reveal-${maskId})`}
            className="stroke-[#1a9a3c] dark:stroke-[#3fc261]"
            d={SMOOTH_ROUTE_D}
          />

          {/* Footprints Group */}
          <g
            ref={feetGroupRef}
            className="text-[#1a9a3c] dark:text-[#3fc261]"
            style={{ color: "currentColor" }}
          />

          {/* Milestone 0: Node at (455, 330) with wide 210px clearance to the right */}
          <g className="journey-ms journey-fade" id="m0">
            <circle
              cx="455"
              cy="330"
              r="10"
              fill="none"
              className="stroke-[#1a9a3c] dark:stroke-[#3fc261]"
              strokeWidth="3"
            />
            <circle
              cx="455"
              cy="330"
              r="5"
              className="dot-in fill-[#d2662c] dark:fill-[#ef8a52]"
            />
            <text x="480" y="334" className="fill-gray-900 font-medium dark:fill-gray-100">
              Entering the world of
            </text>
            <text x="480" y="352" className="fill-gray-900 font-medium dark:fill-gray-100">
              robotics & tech with
            </text>
            <text x="480" y="370" className="fill-gray-900 font-medium dark:fill-gray-100">
              spare parts & shared
            </text>
            <text x="480" y="388" className="fill-gray-900 font-medium dark:fill-gray-100">
              knowledge at ZHCET.
            </text>
          </g>

          {/* Milestone 1: Node at (545, 75) at the smooth crest of Arch 1 */}
          <g className="journey-ms journey-fade" id="m1">
            <circle
              cx="545"
              cy="75"
              r="10"
              fill="none"
              className="stroke-[#1a9a3c] dark:stroke-[#3fc261]"
              strokeWidth="3"
            />
            <circle
              cx="545"
              cy="75"
              r="5"
              className="dot-in fill-[#d2662c] dark:fill-[#ef8a52]"
            />
            <text x="575" y="92" className="fill-gray-900 font-medium dark:fill-gray-100">
              Formalizing as VyomikX
            </text>
            <text x="575" y="110" className="fill-gray-900 font-medium dark:fill-gray-100">
              to launch free robotics
            </text>
            <text x="575" y="128" className="fill-gray-900 font-medium dark:fill-gray-100">
              workshops with mobile
            </text>
            <text x="575" y="146" className="fill-gray-900 font-medium dark:fill-gray-100">
              hardware kits in schools.
            </text>
          </g>

          {/* Milestone 2: Node at (675, 215) on smooth descent with 170px clearance */}
          <g className="journey-ms journey-fade" id="m2">
            <circle
              cx="675"
              cy="215"
              r="10"
              fill="none"
              className="stroke-[#1a9a3c] dark:stroke-[#3fc261]"
              strokeWidth="3"
            />
            <circle
              cx="675"
              cy="215"
              r="5"
              className="dot-in fill-[#d2662c] dark:fill-[#ef8a52]"
            />
            <text x="705" y="226" className="fill-gray-900 font-medium dark:fill-gray-100">
              Engineering open
            </text>
            <text x="705" y="244" className="fill-gray-900 font-medium dark:fill-gray-100">
              hardware: 6-DOF arms,
            </text>
            <text x="705" y="262" className="fill-gray-900 font-medium dark:fill-gray-100">
              solar trackers, and a
            </text>
            <text x="705" y="280" className="fill-gray-900 font-medium dark:fill-gray-100">
              shared component
            </text>
            <text x="705" y="298" className="fill-gray-900 font-medium dark:fill-gray-100">
              inventory for students.
            </text>
          </g>

          {/* Milestone 3: Node at (790, 475) in the valley with text placed safely below */}
          <g className="journey-ms journey-fade" id="m3">
            <circle
              cx="790"
              cy="475"
              r="10"
              fill="none"
              className="stroke-[#1a9a3c] dark:stroke-[#3fc261]"
              strokeWidth="3"
            />
            <circle
              cx="790"
              cy="475"
              r="5"
              className="dot-in fill-[#d2662c] dark:fill-[#ef8a52]"
            />
            <text x="760" y="512" className="fill-gray-900 font-medium dark:fill-gray-100">
              Mentoring 100+ curious students with all the
            </text>
            <text x="760" y="530" className="fill-gray-900 font-medium dark:fill-gray-100">
              required practical engineering skills with aspirations for
            </text>
            <text x="760" y="548" className="fill-gray-900 font-medium dark:fill-gray-100">
              an empowered technology future.
            </text>
          </g>

          {/* Milestone 4: Node at (1055, 110) at circular loop exit */}
          <g className="journey-ms journey-fade" id="m4">
            <circle
              cx="1055"
              cy="110"
              r="10"
              fill="none"
              className="stroke-[#1a9a3c] dark:stroke-[#3fc261]"
              strokeWidth="3"
            />
            <circle
              cx="1055"
              cy="110"
              r="5"
              className="dot-in fill-[#d2662c] dark:fill-[#ef8a52]"
            />
            <text x="1080" y="118" className="fill-gray-900 font-medium dark:fill-gray-100">
              Building toward an open
            </text>
            <text x="1080" y="136" className="fill-gray-900 font-medium dark:fill-gray-100">
              campus maker space for
            </text>
            <text x="1080" y="154" className="fill-gray-900 font-medium dark:fill-gray-100">
              every curious student.
            </text>
          </g>

          {/* Destination Group: Arrow, Spacious Destination Icons & Mission Quote Card */}
          <g className="journey-fade" id="end">
            {/* Arrow Polygon pointing right */}
            <polygon
              points="1090,480 1130,478 1105,468 1113,480 1105,492"
              className="fill-[#d2662c] dark:fill-[#ef8a52]"
            />

            {/* Destination Community Icons (Spacious 2x2 Layout at x=1140..1280) */}
            <g className="fill-[#d2662c] dark:fill-[#ef8a52]">
              {/* Maker Space House */}
              <path d="M1142,416 L1156,400 L1170,416 L1166,416 L1166,432 L1146,432 L1146,416Z" />
              {/* Community icon */}
              <circle cx="1230" cy="419" r="8" />
              <circle cx="1214" cy="428" r="6" />
              <circle cx="1246" cy="428" r="6" />
              <path d="M1212,444 q18,-18 36,0 v6 h-36z" />
              {/* Mentors icon */}
              <circle cx="1144" cy="482" r="6" />
              <circle cx="1164" cy="482" r="6" />
              <circle cx="1184" cy="482" r="6" />
              <path d="M1134,505 q25,-20 50,0 v6 h-50z" />
              {/* Builders icon */}
              <circle cx="1220" cy="482" r="7" />
              <circle cx="1240" cy="482" r="7" />
              <circle cx="1258" cy="482" r="7" />
              <path d="M1208,505 q27,-22 54,0 v6 h-54z" />
            </g>

            <text
              className="text-[11px] font-bold fill-[#d2662c] dark:fill-[#ef8a52]"
              x="1136"
              y="446"
            >
              MAKER SPACE
            </text>
            <text
              className="text-[11px] font-bold fill-[#d2662c] dark:fill-[#ef8a52]"
              x="1216"
              y="458"
            >
              COMMUNITY
            </text>
            <text
              className="text-[11px] font-bold fill-[#d2662c] dark:fill-[#ef8a52]"
              x="1144"
              y="522"
            >
              MENTORS
            </text>
            <text
              className="text-[11px] font-bold fill-[#d2662c] dark:fill-[#ef8a52]"
              x="1224"
              y="522"
            >
              BUILDERS
            </text>

            {/* Right-Side Mission Quote Card (Generous 180px width, ZERO text overflow) */}
            <g>
              <path
                d="M1340,258 H1300 Q1295,258 1295,263 V425 Q1295,430 1300,430 H1420 M1460,430 H1475 Q1480,430 1480,425 V263 Q1480,258 1475,258 H1350"
                fill="none"
                className="stroke-gray-400 dark:stroke-gray-600"
                strokeWidth="2.5"
              />
              <text
                x="1312"
                y="266"
                className="fill-[#d2662c] dark:fill-[#ef8a52]"
                style={{ fontSize: "40px", fontFamily: "Georgia, serif" }}
              >
                “
              </text>
              <text x="1310" y="313" className="fill-[#d2662c] font-semibold dark:fill-[#ef8a52]">
                • 100% Free Access
              </text>
              <text x="1310" y="333" className="fill-[#d2662c] font-semibold dark:fill-[#ef8a52]">
                • Hands-on Robotics
              </text>
              <text x="1310" y="353" className="fill-[#d2662c] font-semibold dark:fill-[#ef8a52]">
                • Peer Mentorship
              </text>
              <text x="1310" y="373" className="fill-[#d2662c] font-semibold dark:fill-[#ef8a52]">
                • Open Campus Maker
              </text>
              <text x="1322" y="393" className="fill-[#d2662c] font-semibold dark:fill-[#ef8a52]">
                Space for all students
              </text>
            </g>
          </g>

          {/* Pulsing Orange Walker Ball Leading the Path */}
          <circle
            ref={walkerRef}
            r="9"
            cx="0"
            cy="490"
            opacity="0"
            className="journey-pulse fill-[#d2662c] dark:fill-[#ef8a52]"
          />
        </svg>
      </div>

      {/* Control Buttons */}
      <div className="mt-4 flex flex-wrap items-center gap-2.5">
        <button
          type="button"
          onClick={handlePlayToggle}
          disabled={isDone}
          className="inline-flex items-center gap-1.5 rounded-lg bg-[#1a9a3c] px-4 py-2.5 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-[#15803d] active:scale-95 disabled:opacity-60"
        >
          {isDone ? (
            <span>Done ✓</span>
          ) : isPlaying ? (
            <>
              <Pause className="h-4 w-4" />
              <span>Pause</span>
            </>
          ) : (
            <>
              <Play className="h-4 w-4 fill-current" />
              <span>Play</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleNextStep}
          disabled={isDone}
          className="inline-flex items-center gap-1 rounded-lg border border-gray-400 bg-transparent px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-card active:scale-95 disabled:opacity-40 dark:border-gray-600"
        >
          <span>Next step</span>
          <ChevronRight className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1 rounded-lg border border-gray-400 bg-transparent px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-card active:scale-95 dark:border-gray-600"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Replay ↺</span>
        </button>
      </div>
    </div>
  )
}

import type { Metadata } from "next"
import Link from "next/link"
import { Cpu, Heart, Package, ShieldCheck, Sparkles, Users, ArrowRight, Wrench, CheckCircle2 } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { UpiCard } from "@/components/donate/upi-card"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Support Our Outreach — Donate",
  description:
    "Brilliance is everywhere, but opportunity is not. Support VyomikX to keep hands-on robotics and tech workshops 100% free for school students across India.",
  alternates: {
    canonical: "/donate",
  },
  openGraph: {
    type: "website",
    url: "/donate",
    title: "Support Our Outreach — Donate to VyomikX",
    description:
      "Brilliance is everywhere, but opportunity is not. Support VyomikX to keep hands-on robotics and tech workshops 100% free for school students across India.",
    siteName: "VyomikX",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Support VyomikX Robotics Education",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Support Our Outreach — Donate to VyomikX",
    description:
      "Brilliance is everywhere, but opportunity is not. Help us bring real engineering tools to students across India.",
    images: ["/og-image.jpg"],
  },
}

const impactTiers = [
  {
    range: "₹300 – ₹500",
    title: "Student Sensor & Circuit Kit",
    description:
      "Funds breadboards, jumper wires, ultrasonic sensors, and LEDs for a school student to build obstacle detectors and line sensors.",
    icon: Cpu,
  },
  {
    range: "₹1,200 – ₹2,000",
    title: "Complete Robotics Starter Pack",
    description:
      "Funds a microcontroller (Arduino / ESP32), motor driver, robotic chassis, and battery pack for an autonomous bot build.",
    icon: Wrench,
  },
  {
    range: "₹5,000+",
    title: "Classroom Workshop Session",
    description:
      "Sponsors logistical transport, tool maintenance, and shared hardware kits for a complete school visit reaching 30+ students.",
    icon: Users,
  },
]

const hardwareItems = [
  "Microcontrollers: Arduino Uno/Nano, ESP32, ESP8266, Raspberry Pi Pico",
  "Sensors: Ultrasonic (HC-SR04), IR modules, Gyroscope (MPU6050), LDR, DHT11",
  "Motors & Actuators: BO Motors & wheels, Servo motors (SG90/MG996R), Steppers",
  "Power & Prototyping: Breadboards, jumper wires, battery clips, soldering irons",
  "Fabrication Tools: 3D printing PLA filament, basic hand tools, chassis plates",
]

export default function DonatePage() {
  return (
    <>
      <PageHeader
        eyebrow="Support Our Mission"
        title="Fueling the Next Generation of Builders"
        description="Brilliance is everywhere, but opportunity is not. Your support brings hands-on robotics tools and hardware directly to young minds who lack access — 100% free."
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 space-y-16">
        {/* Quote Banner */}
        <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 via-card to-background p-8 sm:p-12 shadow-sm">
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-mono text-xs font-semibold text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Our Core Belief</span>
            </div>
            <blockquote className="font-serif text-2xl font-semibold leading-relaxed tracking-tight text-foreground sm:text-3xl">
              &ldquo;Brilliance is everywhere, but opportunity is not. We bring hands-on robotics and essential technology education directly to local students who severely lack access, sparking a lifelong passion for engineering.&rdquo;
            </blockquote>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              If you find our mission to empower young, curious minds worthwhile, please consider funding our outreach. Your crucial support ensures these life-changing resources remain entirely free.
            </p>
          </div>
        </div>

        {/* Two-Column Section: Impact & Payment */}
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Tiers & Impact */}
          <div className="space-y-10 lg:col-span-7">
            {/* Impact Tiers */}
            <div className="space-y-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                  Transparent Impact
                </span>
                <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  Where Your Contribution Goes
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Every single rupee is invested directly into reusable components, tools, and workshop travel to underserved schools.
                </p>
              </div>

              <div className="space-y-4">
                {impactTiers.map((tier) => {
                  const Icon = tier.icon
                  return (
                    <div
                      key={tier.title}
                      className="group rounded-2xl border border-border bg-card p-6 shadow-xs transition-all hover:border-accent/40 hover:shadow-md"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                          <Icon className="h-6 w-6" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-display text-base font-semibold text-foreground">
                              {tier.title}
                            </h3>
                            <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 font-mono text-xs font-semibold text-accent">
                              {tier.range}
                            </span>
                          </div>
                          <p className="text-sm leading-relaxed text-muted-foreground">
                            {tier.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Hardware Donations */}
            <div className="rounded-3xl border border-border bg-muted/30 p-6 sm:p-8 space-y-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Package className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground">
                    Hardware &amp; Spare Part Donations
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Have unused components sitting in a drawer? Give them a second life in student hands!
                  </p>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground">
                We gladly welcome donations of functional electronic components, microcontrollers, and tools. We add every working component into our shared student equipment bank:
              </p>

              <ul className="grid gap-2 sm:grid-cols-1 text-xs text-muted-foreground">
                {hardwareItems.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="rounded-2xl border border-border/80 bg-card p-4 text-xs text-foreground">
                <p className="font-semibold text-foreground">Drop-off &amp; Courier Address:</p>
                <p className="mt-1 text-muted-foreground">
                  Team VyomikX, Zakir Husain College of Engineering &amp; Technology (ZHCET),<br />
                  Aligarh Muslim University (AMU), Aligarh, UP – 202002, India
                </p>
                <p className="mt-2 text-primary font-medium">
                  Contact before dispatch: +91-7983357727 | vyomikx@gmail.com
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky UPI Payment Card */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <UpiCard />
          </div>
        </div>

        {/* Guarantees & Transparency */}
        <div className="rounded-3xl border border-border bg-card p-8 sm:p-12 shadow-xs">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Our Transparency Pledge
            </span>
            <h2 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              100% Volunteer Driven. 100% Non-Profit.
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              VyomikX is an independent student movement. We believe money should never be a prerequisite for learning science and robotics.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-border/70 bg-muted/20 p-5 text-center space-y-2">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Heart className="h-5 w-5" />
              </div>
              <h3 className="font-display text-sm font-semibold text-foreground">Zero Fees Charged</h3>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Every school workshop, mentoring hour, and learning guide is provided with no cost to attendees.
              </p>
            </div>

            <div className="rounded-2xl border border-border/70 bg-muted/20 p-5 text-center space-y-2">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="font-display text-sm font-semibold text-foreground">Direct Resource Allocation</h3>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Contributions go directly into purchasing hardware, workshop logistics, and replenishing shared equipment.
              </p>
            </div>

            <div className="rounded-2xl border border-border/70 bg-muted/20 p-5 text-center space-y-2">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                <Users className="h-5 w-5" />
              </div>
              <h3 className="font-display text-sm font-semibold text-foreground">Student Owned &amp; Run</h3>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Maintained entirely by passionate student engineers at ZHCET, AMU volunteering their personal time.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
            <Button asChild variant="outline" className="rounded-full text-xs">
              <Link href="/about">
                Learn More About Our Team
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Link>
            </Button>
            <Button asChild variant="ghost" className="rounded-full text-xs">
              <Link href="/contact">
                Have a Question? Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}


import type { Metadata } from "next"
import Link from "next/link"
import { ShieldCheck, Mail, Camera, Lock, UserCheck } from "lucide-react"
import { PageHeader } from "@/components/page-header"

export const metadata: Metadata = {
  title: "Privacy & Media Safeguarding Policy",
  description:
    "VyomikX privacy policy covering contact form data processing, student/minor media safeguarding, and responsible photo consent.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    type: "website",
    url: "/privacy",
    title: "Privacy & Media Safeguarding Policy — VyomikX",
    description:
      "VyomikX privacy policy covering contact form data processing, student/minor media safeguarding, and responsible photo consent.",
    siteName: "VyomikX",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "VyomikX Privacy & Safeguarding Policy",
      },
    ],
  },
}

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Safeguarding & Trust"
        title="Privacy & Media Safeguarding Policy"
        description="We are committed to protecting the privacy of students, schools, mentors, and donors who engage with our educational initiatives."
      />

      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 space-y-12">
        {/* Section 1 */}
        <section className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center gap-3 text-primary">
            <Lock className="h-6 w-6 shrink-0" />
            <h2 className="font-display text-xl font-bold text-foreground sm:text-2xl">
              1. Information We Collect
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            When you interact with VyomikX through our contact or workshop request forms, we collect the details you voluntarily submit:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-muted-foreground">
            <li><strong>Contact details:</strong> Name, email address, and optional phone number.</li>
            <li><strong>Institutional affiliation:</strong> School, college, or community organization name.</li>
            <li><strong>Request context:</strong> Workshop type, equipment borrow details, or mentorship inquiry message.</li>
          </ul>
          <p className="text-sm leading-relaxed text-muted-foreground">
            We never sell, rent, or trade your personal information. Data is used exclusively by Team VyomikX coordinators to respond to your educational requests and coordinate workshops.
          </p>
        </section>

        {/* Section 2 */}
        <section className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center gap-3 text-accent">
            <Camera className="h-6 w-6 shrink-0" />
            <h2 className="font-display text-xl font-bold text-foreground sm:text-2xl">
              2. Student &amp; School Media Safeguarding
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            As a student-led robotics initiative conducting workshops across local schools and colleges, we follow responsible safeguarding principles regarding photographs and media:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
            <li>
              <strong>School &amp; Institutional Coordination:</strong> Photography and videography during school sessions are coordinated with presiding teachers, principals, and school administration.
            </li>
            <li>
              <strong>Focus on Educational Learning:</strong> Media published on our website focuses on hands-on robotics builds, breadboard circuits, and collective teamwork. We do not publish identifying sensitive personal details (such as home addresses or student contact records).
            </li>
            <li>
              <strong>Takedown &amp; Deletion Rights:</strong> If a student, parent, or school administrator requests the removal or blur of any image or video clip from our gallery, we respect and fulfill the request promptly without question.
            </li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center gap-3 text-primary">
            <ShieldCheck className="h-6 w-6 shrink-0" />
            <h2 className="font-display text-xl font-bold text-foreground sm:text-2xl">
              3. Data Retention &amp; Security
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            All server communications are encrypted in transit via TLS 1.3 / HTTPS. Contact submissions are securely stored in serverless PostgreSQL (Neon) and processed using strict rate limiting, input sanitization, and origin verification. Data is retained only as long as necessary to service educational inquiries and workshop logistical coordination.
          </p>
        </section>

        {/* Section 4 */}
        <section className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center gap-3 text-accent">
            <Mail className="h-6 w-6 shrink-0" />
            <h2 className="font-display text-xl font-bold text-foreground sm:text-2xl">
              4. Contact &amp; Media Removal Inquiries
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            For questions regarding this policy, data deletion requests, or media removal inquiries, please contact our team directly:
          </p>
          <div className="rounded-xl border border-border/80 bg-muted/40 p-4 text-sm text-foreground">
            <p className="font-semibold">Team VyomikX Coordinators</p>
            <p className="text-muted-foreground">Zakir Husain College of Engineering &amp; Technology (ZHCET), AMU, Aligarh, India</p>
            <p className="mt-2 text-primary">
              <a href="mailto:vyomikx@gmail.com" className="hover:underline">vyomikx@gmail.com</a>
            </p>
          </div>
        </section>
      </div>
    </>
  )
}


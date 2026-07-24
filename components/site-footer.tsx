import Link from "next/link"
import { Mail, MapPin, Phone } from "lucide-react"
import { navLinks, site, communityLinks } from "@/lib/site-data"
import { Logo } from "@/components/logo"

export function SiteFooter() {
  return (
    <footer className="border-t border-border/80 bg-card/40 text-muted-foreground">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          <div className="space-y-3 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <Logo className="h-6 w-6 text-foreground" />
              <span className="font-display text-base font-bold tracking-tight text-foreground">{site.name}</span>
            </Link>
            <p className="text-xs leading-relaxed text-muted-foreground">
              {site.tagline}
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {site.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-border px-3 py-1 text-[11px] font-medium transition-colors hover:border-foreground/40 hover:text-foreground"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Navigation
            </h3>
            <ul className="mt-3 space-y-1.5 text-xs">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Get Involved
            </h3>
            <ul className="mt-3 space-y-1.5 text-xs">
              {communityLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-foreground"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Contact
            </h3>
            <ul className="mt-3 space-y-2 text-xs">
              <li className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 shrink-0 text-accent" />
                <a href={`mailto:${site.email}`} className="hover:text-foreground">
                  {site.email}
                </a>
              </li>
              
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                <span>ZHCET, AMU, Aligarh</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border/60 pt-4 flex flex-col items-center justify-between gap-2 text-[11px] sm:flex-row">
          <p>&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p className="text-muted-foreground/80">Built by Team VyomikX.</p>
        </div>
      </div>
    </footer>
  )
}

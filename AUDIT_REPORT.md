# VyomikX Website — Full Audit Report

**Date:** 2026-09-08 (fixes applied 2026-09-08)
**Scope:** Security, code quality, dependencies/config, content/SEO/accessibility — full codebase.

**Status: all Critical/High and Medium items fixed, plus most Low items.** Verified with a clean `tsc --noEmit`, `npm run lint` (0 errors), `npm test` (6/6 passing), `npm audit` (0 vulnerabilities), and a full `npm run build`. One item (CSP `unsafe-inline`/`unsafe-eval`) intentionally deferred — see note at the bottom.

---

## Critical / High priority

| # | Issue | Area |
|---|---|---|
| 1 | **CI is fully broken** — `.github/workflows/security.yml:19` has `actions/target/setup-node@v4` (typo, not a real action). Every CI run fails at step 2, so lint/typecheck/audit/build/tests never actually execute on any PR. | Deps/CI |
| 2 | **`npm run lint` can't run at all** — `eslint` isn't installed as a dependency, and there's no `eslint.config.*`. The lint gate has never worked. | Deps/Code quality |
| 3 | **`tests/security.test.ts` has never run** — it tests the rate-limit/origin-guard logic, but no test runner (Jest/Vitest) is installed and there's no `test` script. The one security-relevant test suite is dead weight. | Deps/Code quality |
| 4 | **Next.js 16.2.6 has multiple high-severity CVEs** (fixed in 16.2.11+/16.3.4): SSRF via rewrites, SSRF in Server Actions, unauthenticated disclosure of internal Server Function endpoints, middleware/proxy bypass. This is the one dependency finding with real production exposure. | Security/Deps |
| 5 | **`/api/drive-stream` is an unauthenticated open proxy** — unlike `contact` and `feedback`, it never calls `runApiGuard` (no rate limit, no origin check), and streams any Google Drive file ID passed in with no allowlist or size cap. Free bandwidth-abuse vector. | Security |
| 6 | **The contact form's honeypot spam protection is inert** — the hidden `website` field is rendered but its value is never included in the POST body, so the server-side bot check (`app/api/contact/route.ts:136`) never actually fires. Real functional bug, not just a nitpick. | Code quality |

## Medium

- Outer catch in `app/api/contact/route.ts:221-227` returns `String(err)` straight to the client — inconsistent with the rest of the route's generic-message + server-side-log pattern; a real leak path if ever hit.
- `shadcn` is listed as a runtime `dependency` (should be `devDependency`) — it drags in an MCP SDK → Express/Hono subtree that accounts for essentially all the moderate/high transitive vulnerabilities `npm audit` reports.
- `pnpm.overrides.hono` pin does nothing — the repo uses npm/`package-lock.json`, so this override is silently ignored.
- Duplicated `<Image>` in `components/home/hero-photo-grid.tsx:44-51` — same hero image rendered twice, both marked `priority`, actively hurting LCP.
- ~350 lines of dead component code (`gallery-media-slider.tsx`, `workshop-video-showcase.tsx`) plus several unused imports, no longer wired to anything.
- No `robots.ts`/`sitemap.ts`, no Open Graph/Twitter metadata anywhere, and `app/gallery/page.tsx` (client component) has no per-page metadata — real SEO/link-preview gaps for a site that likely relies on social sharing.

## Low / good-to-know

- ~519MB of unreferenced `.heic` files sitting in `public/Workshops/` and `public/gallery/` — dead weight bloating the repo (`.git` is already 2.1GB) and deploys.
- `mammoth` dependency is unused anywhere in the codebase.
- CSP allows `unsafe-inline`/`unsafe-eval` in `script-src`, weakening XSS mitigation (no actual XSS sink found, so this is a hardening gap, not an active hole).
- `lib/env.ts`'s `validateEnv()` is dead code — never called, so misconfigured env vars fail late/ugly (e.g. `neon(undefined)`) instead of failing fast at boot.
- Lightbox modals (gallery, project slider) lack `role="dialog"`/focus trap/Escape handling for keyboard/screen-reader users.
- Latent bug in `app/projects/[slug]/page.tsx`'s "related projects" wraparound logic — would produce duplicate entries/keys only if the project catalog ever shrinks to ≤4 (not triggered today, 14 projects exist).

## What's actually solid

SQL access is fully parameterized (no injection risk), no hardcoded secrets, `.env.local` never committed, secrets stay server-side only, rate-limiting fails closed in production, CRLF header injection is properly sanitized and tested, security headers (HSTS/CSP/X-Frame-Options/etc.) are already configured, and accessibility (alt text, aria-labels on icon buttons) is in good shape everywhere except the two flagged spots.

---

## Resolution log

1. **CI typo fixed** — `actions/target/setup-node@v4` → `actions/setup-node@v4`; added a `test` step to the pipeline.
2. **Honeypot wired up** — the `website` field's value is now read from `FormData` and sent in the POST body, so the server-side bot check actually fires.
3. **`/api/drive-stream` deleted**, not guarded — investigation showed it was never called from anywhere in the app (the components that appeared to need it use direct Google Drive/local URLs), so removing the unauthenticated proxy outright was safer than hardening dead code.
4. **Next.js upgraded** to 16.3.4, closing all the high-severity CVEs. `npm audit` now reports 0 vulnerabilities.
5. **Lint and tests now actually run**: added `eslint` + `eslint-config-next` (native flat config) and `vitest`, plus a `test` script and CI step. Running the test suite for the first time caught one bug (see below) and one bad test assertion (CRLF sanitizer collapses `\r\n` into a single space, not two — the code was right, the test expectation was wrong; fixed the test).
6. **Contact route's outer catch** no longer leaks `String(err)` to the client — logs server-side via `logEvent` and returns a generic message.
7. **Dependency cleanup**: `shadcn` moved to `devDependencies`, dead `pnpm.overrides.hono` block removed, unused `mammoth` removed.
8. **Duplicated hero `<Image>` removed**. `GalleryMediaSlider` and `WorkshopVideoShowcase` were restored (re-wired into the gallery and homepage) rather than deleted — they were fully built, backed by real workshop video content, and clearly disconnected by accident rather than intentionally retired (per your call).
9. **SEO**: added `app/robots.ts` and `app/sitemap.ts` (covering all static routes + every project slug), Open Graph/Twitter metadata + `metadataBase` on the root layout, and split the gallery page into a server component (with real per-page metadata) wrapping a client component for the interactive parts.
10. **~520MB of unreferenced `.heic` files deleted** from `public/Workshops/` and `public/gallery/` (per your call) — zero code references, confirmed before deletion.

### Also fixed along the way
- `lib/env.ts`'s `validateEnv()` was dead code — now called on boot via `instrumentation.ts`, so a misconfigured deploy fails fast with a clear error instead of a confusing runtime crash. Removed the unchecked `!` assertion in `lib/db.ts` in favor of an explicit guard.
- Fixed a latent bug in `app/projects/[slug]/page.tsx`'s "related projects" logic that could show a project as related to itself with duplicate React keys if the catalog ever shrank to ≤4 projects.
- Added `role="dialog"` / `aria-modal` / Escape-to-close (via a small shared `useEscapeToClose` hook) to all three lightbox modals (gallery grid, media slider, project gallery slider).
- Wired up `aria-describedby` for the contact form's email/message validation errors (only `name` had it).
- Cleaned up leftover dead code in `gallery-media-slider.tsx` (unused imports, an empty placeholder span, a stripped-out mute toggle that's now restored) while restoring it.
- Added `engines.node` to `package.json` to match the Node version CI/production actually use.

### Deferred — needs a design decision, not a quick fix
- **CSP `script-src` still allows `unsafe-inline`/`unsafe-eval`.** Removing them is the right long-term move, but it requires a nonce-based CSP (per-request nonce generated in middleware and threaded through `<script>` tags), which is a bigger architectural change with real risk of breaking Next's hydration scripts if done hastily. Left as-is rather than rushed.

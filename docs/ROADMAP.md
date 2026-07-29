# Roadmap

## Milestones

### Milestone 1: Project Foundation ✅ (Completed — Commit 1)

- [x] Next.js 16 App Router scaffold
- [x] TypeScript, Tailwind CSS v4, ESLint, Prettier
- [x] Vitest and Playwright installed with unit and browser smoke test scripts
- [x] Branded home page
- [x] Environment validation
- [x] Lead data utilities with TDD
- [x] All tooling scripts
- [x] .editorconfig, .prettierrc, .env.example
- [x] Git initialised on `main`

### Milestone 2: Architecture Documentation ✅ (Completed — Commit 2)

- [x] docs/ARCHITECTURE.md
- [x] docs/PROJECT_MEMORY.md
- [x] docs/DECISIONS.md
- [x] docs/ROADMAP.md
- [x] docs/SECURITY.md
- [x] docs/SETUP.md
- [x] docs/API.md
- [x] docs/superpowers/specs/2026-07-28-roofline-partners-design.md
- [x] README.md updated
- [x] .env.example

### Milestone 3: Design System & Layout (Completed — Commit 3)

- [x] Premium token-based visual system (globals.css CSS custom properties)
- [x] Reusable UI components: Button, Container, Badge, SectionHeading, Card
- [x] Shared Header with responsive nav, mobile menu, skip-to-content, CSS/SVG logo
- [x] Shared Footer component
- [x] Route shells: /packages, /how-it-works, /why-roofline, /faq, /contact, /get-started, /thank-you
- [x] Content configuration module: site.ts, packages.ts, faqs.ts, trust.ts
- [x] Analytics interface with named events
- [x] Self-authored logo SVG and favicon strategy
- [x] Updated documentation
- [x] Review-driven hardening: tablet navigation, rendered header test, content boundary, and truthful sample pricing

### Milestone 4: Marketing Content Completion

- [x] Packages/pricing page (/packages)
- [x] How it works, why Roofline, FAQ, and contact route shells
- [x] Content/configuration modules for public copy and packages
- [x] Complete premium homepage and shared conversion sections
- [x] Contact page with lead form (/contact)
- [x] Placeholder testimonials with explicit sample labeling (pending client-approved reviews)
- [x] JSON-LD: Organization + Service schemas

### Milestone 5: Lead Capture MVP

- [x] Google Sheets lead destination via `google-apps-script/Code.gs` (deploy it before launch)
- [x] Server Action for lead submission
- [x] Form validation and accessible server-error UX
- [x] `GoogleSheetsLeadRepository` webhook adapter
- [x] Server Action and provider contract test coverage
- [x] Analytics event tracking for form submissions (vendor-neutral tracker, privacy-safe, no-op by default)
- [x] Success/error UX for form

### Milestone 6: SEO & Polish

- [x] Favicon (self-authored SVG-based)
- [x] Generated Open Graph image
- [x] robots.txt and sitemap.xml metadata routes
- [x] Open Graph and Twitter card metadata baseline
- [x] Organization and Service structured data
- [ ] Performance audit (Lighthouse) against a deployed preview or production URL
- [ ] Accessibility audit (axe) against a deployed preview or production URL

### Milestone 7: Deployment & CI/CD

- [x] Vercel deployment path documented
- [ ] Production `GOOGLE_SHEETS_WEBHOOK_URL` and other environment variables
- [x] CI pipeline (format, lint, typecheck, unit/browser tests, build on PR)
- [x] Health check endpoint (`/api/health`)
- [x] Rollback procedures documented in `docs/OPERATIONS.md`
- [ ] Admin capability seam (deferred — no full dashboard in v1; `LeadSubmissionService` / `LeadRepository` contract is the extension point)
- [ ] Monitoring & error tracking (deferred — no Sentry, Datadog, or equivalent; `console.error` is current server-side logging)

## Timeline

| Milestone                  | Target     | Status    |
| -------------------------- | ---------- | --------- |
| 1. Foundation              | 2026-07-28 | ✅ Done   |
| 2. Documentation           | 2026-07-28 | ✅ Done   |
| 3. Design System & Layout  | 2026-07-28 | ✅ Done   |
| 4. Marketing Content Pages | 2026-07-29 | ✅ Done*  |
| 5. Lead Capture MVP        | 2026-07-28 | ✅ Done   |
| 6. SEO & Polish            | 2026-07-28 | ✅ Done*  |
| 7. Deployment & CI/CD      | 2026-07-29 | ✅ Ready* |

`*` Repository code, CI, launch documentation, and rollback procedures are ready. External launch prerequisites remain production provider configuration, distributed rate limiting, deployed Lighthouse/axe checks, monitoring/error tracking, and approved business proof/content.

## Deferred / Out of Scope

The following items are explicitly deferred or out of scope for this single-client site:

- **Admin capability seam** — no authenticated admin inbox or dashboard in v1; the `LeadSubmissionService` / `LeadRepository` contract is the extension point for a future admin CRM.
- **Monitoring & error-tracking vendor** — no Sentry, Datadog, or equivalent integration at this time; server-side errors are logged with `console.error`.
- **Distributed edge rate limiting** — the process-local rate limiter in the lead action is not multi-instance safe; edge-level controls (Vercel Firewall, Cloudflare) are deferred until deployment.
- **Placeholder pricing** — current package tiers in `src/content/packages.ts` are sample amounts marked `PLACEHOLDER`; replace with client-approved pricing before launch.
- **Placeholder testimonials** — `src/content/trust.ts` contains sample testimonials marked `placeholder: true`; replace with verified, consented reviews before launch.
- **Deployment readiness** — the codebase and CI are ready pending manual Vercel/domain deployment, env var configuration, and live Lighthouse/axe audits.

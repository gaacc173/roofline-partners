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
- [ ] Verified testimonial/social-proof section once approved evidence is supplied
- [ ] JSON-LD: Organization + Service schemas

### Milestone 5: Lead Capture MVP

- [x] Supabase `leads` migration (apply it to the configured project before launch)
- [x] Server Action for lead submission
- [x] Form validation and accessible server-error UX
- [x] Resend email notification adapter
- [ ] Analytics event tracking for form submissions (typed seam exists; vendor intentionally deferred)
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
- [ ] Production environment variables
- [x] CI pipeline (format, lint, typecheck, unit/browser tests, build on PR)
- [x] Health check endpoint (`/api/health`)
- [ ] Rollback procedures documented
- [ ] Admin capability seam (no full dashboard)
- [ ] Monitoring & error tracking setup

## Timeline

| Milestone                  | Target     | Status    |
| -------------------------- | ---------- | --------- |
| 1. Foundation              | 2026-07-28 | ✅ Done   |
| 2. Documentation           | 2026-07-28 | ✅ Done   |
| 3. Design System & Layout  | 2026-07-28 | ✅ Done   |
| 4. Marketing Content Pages | 2026-07-28 | ✅ Done   |
| 5. Lead Capture MVP        | 2026-07-28 | ✅ Done   |
| 6. SEO & Polish            | 2026-07-28 | ✅ Done*  |
| 7. Deployment & CI/CD      | 2026-07-29 | ✅ Ready* |

`*` Code and documentation are ready; final external launch prerequisites remain environment and provider configuration, distributed rate limiting, and deployed Lighthouse/axe checks.

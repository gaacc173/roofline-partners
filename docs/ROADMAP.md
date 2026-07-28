# Roadmap

## Milestones

### Milestone 1: Project Foundation ✅ (Completed — Commit 1)

- [x] Next.js 16 App Router scaffold
- [x] TypeScript, Tailwind CSS v4, ESLint, Prettier
- [x] Vitest installed; Playwright retained for a future E2E suite
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
- [ ] Complete premium homepage and shared conversion sections
- [ ] Contact page with lead form (/contact)
- [ ] Verified testimonial/social-proof section once approved evidence is supplied
- [ ] JSON-LD: Organization + Service schemas

### Milestone 5: Lead Capture MVP

- [ ] Supabase project setup (PostgreSQL)
- [ ] `leads` table migration (see docs/API.md)
- [ ] Server Action for lead submission
- [ ] Form validation (client + server)
- [ ] Resend email notification on new lead
- [ ] Analytics event tracking for form submissions
- [ ] Success/error UX for form

### Milestone 6: SEO & Polish

- [ ] Favicon (generated SVG-based)
- [ ] OG images (generated via @vercel/og or static)
- [ ] robots.txt
- [ ] sitemap.xml
- [ ] Open Graph meta tags (all pages)
- [ ] Twitter card meta tags
- [ ] Structured data (JSON-LD) on all pages
- [ ] Performance audit (Lighthouse)
- [ ] Accessibility audit (axe)

### Milestone 7: Deployment & CI/CD

- [ ] Vercel deployment configuration
- [ ] Production environment variables
- [ ] CI pipeline (lint, typecheck, test, build on PR)
- [ ] Health check endpoint
- [ ] Rollback procedures documented
- [ ] Admin capability seam (no full dashboard)
- [ ] Monitoring & error tracking setup

## Timeline

| Milestone                  | Target     | Status     |
| -------------------------- | ---------- | ---------- |
| 1. Foundation              | 2026-07-28 | ✅ Done    |
| 2. Documentation           | 2026-07-28 | ✅ Done    |
| 3. Design System & Layout  | 2026-07-28 | ✅ Done    |
| 4. Marketing Content Pages | TBD        | ⏳ Pending |
| 5. Lead Capture MVP        | TBD        | ⏳ Pending |
| 6. SEO & Polish            | TBD        | ⏳ Pending |
| 7. Deployment & CI/CD      | TBD        | ⏳ Pending |

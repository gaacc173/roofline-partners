# Project Memory

## Context

**Roofline Partners** is a premium roofing company that needs a professional website to:

- Showcase services and packages to prospective clients
- Capture leads through a secure contact form
- Maintain brand consistency across all digital touchpoints

## Current State

- Next.js 16 App Router project scaffolded with TypeScript, Tailwind CSS v4, ESLint, Prettier, Vitest
- Branded home page with "Request a Consultation" and "View Services" CTAs
- Typed environment validation module with safe defaults (no local startup failures)
- Lead data utilities (`sanitiseLead`, `stripHtml`, `isLeadValid`) ready for server actions
- TDD cycle demonstrated: failing test → implementation → passing test
- All tooling scripts configured (dev, build, start, lint, test, typecheck, format)
- Playwright is installed for a future E2E suite; no browser tests or Playwright configuration exist yet

## Commit 2: Architecture Documentation

- docs/ARCHITECTURE.md, PROJECT_MEMORY.md, DECISIONS.md, ROADMAP.md, SECURITY.md, SETUP.md, API.md
- .env.example

## Commit 3: Design System and Shared Marketing Layout

- Premium token-based visual system in globals.css (CSS custom properties)
- Reusable UI components: Button, Container, Badge, SectionHeading, Card
- Shared Header (responsive nav with accessible mobile menu, skip-to-content, CSS/SVG logo)
- Shared Footer component
- Route shells: /packages, /how-it-works, /why-roofline, /faq, /contact, /get-started, /thank-you
- Content configuration module: site.ts, packages.ts, faqs.ts, trust.ts
- Analytics interface with named events (no vendor integration)
- Self-authored logo SVG and favicon strategy
- Updated documentation reflecting all changes

## Corrective Layout Hardening

- Desktop navigation now begins at `lg`, leaving the accessible menu available on smaller tablet widths
- Mobile navigation dismisses with Escape and returns focus to its trigger
- Header interaction has a rendered component test with Vitest and Testing Library
- All public marketing copy now originates in `src/content/`; unsupported numerical proof, testimonials, credentials, and service guarantees were removed
- Appointment package prices are explicit sample amounts, with final availability and terms confirmed after qualification
- The App Router now serves the self-authored `src/app/icon.svg` favicon

## Brand

- **Name**: Roofline Partners
- **Positioning**: Premium roofing appointment packages for contractor teams that want qualified conversations
- **Tone**: Professional, trustworthy, craftsmanship-focused
- **Target audience**: Homeowners and property managers seeking quality roofing

## MVP Scope

1. **Premium marketing site** — hero, services, packages, about, testimonials
2. **Secure lead capture** — form → sanitise → validate → store in Supabase → email via Resend
3. **No payments in v1** — manual fulfillment workflow
4. **SEO** — full metadata, OG images, JSON-LD, sitemap, robots.txt
5. **Analytics** — event tracking for form submissions and page views

## Deferred / Future

- Supabase Postgres integration (leads table, auth)
- Resend email integration (lead notifications)
- Admin capability seam (no full dashboard in v1)
- Playwright E2E tests
- Content management for packages/testimonials
- Analytics dashboard

## Key Files

| File                         | Purpose                                                        |
| ---------------------------- | -------------------------------------------------------------- |
| `src/app/layout.tsx`         | Root layout with SEO metadata                                  |
| `src/app/globals.css`        | Tailwind imports, CSS design tokens                            |
| `src/lib/env.ts`             | Public environment resolution and production URL release check |
| `src/lib/lead-utils.ts`      | Lead data utilities                                            |
| `src/lib/lead-utils.test.ts` | TDD test for sanitiseLead                                      |
| `.env.example`               | Documented env var schema                                      |
| `docs/`                      | Architecture documentation                                     |

## Living Document

This file is updated as the project evolves. See [ROADMAP.md](./ROADMAP.md) for planned milestones.

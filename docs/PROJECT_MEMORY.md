# Project Memory

## Context

**Roofline Partners** is a premium roofing company that needs a professional website to:

- Showcase services and packages to prospective clients
- Capture leads through a secure contact form
- Maintain brand consistency across all digital touchpoints

## Current State (Foundation — Commit 1)

- Next.js 16 App Router project scaffolded with TypeScript, Tailwind CSS, ESLint, Prettier, Vitest
- Branded home page with "Request a Consultation" and "View Services" CTAs
- Typed environment validation module for deferred integrations
- Lead data utilities (`sanitiseLead`, `stripHtml`, `isLeadValid`) ready for server actions
- TDD cycle demonstrated: failing test → implementation → passing test
- All tooling scripts configured (dev, build, start, lint, test, typecheck, format)
- Playwright installed and Chromium browser downloaded for future E2E tests

## Brand

- **Name**: Roofline Partners
- **Positioning**: Premium roofing solutions for residential and commercial properties
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

| File                         | Purpose                       |
| ---------------------------- | ----------------------------- |
| `src/app/layout.tsx`         | Root layout with SEO metadata |
| `src/app/page.tsx`           | Home page component           |
| `src/lib/env.ts`             | Environment validation        |
| `src/lib/lead-utils.ts`      | Lead data utilities           |
| `src/lib/lead-utils.test.ts` | TDD test for sanitiseLead     |
| `.env.example`               | Documented env var schema     |
| `docs/`                      | Architecture documentation    |

## Living Document

This file is updated as the project evolves. See [ROADMAP.md](./ROADMAP.md) for planned milestones.

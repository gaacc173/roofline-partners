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
- Lead data utilities (`sanitiseLead`, `stripHtml`, `isLeadValid`) used by the server action
- TDD cycle demonstrated: failing test → implementation → passing test
- All tooling scripts configured (dev, build, start, lint, test, typecheck, format)
- Playwright is configured with browser smoke tests for package selection, SEO routes, and the health endpoint
- `docs/OPERATIONS.md` is the production launch, smoke-test, monitoring, and rollback runbook
- Lead pipeline tests now cover Server Action security gates, the Google Sheets webhook HTTP contract, schema abuse controls, and stored-lead mapping

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

## Commit 4: Marketing Pages

- Homepage now includes a premium self-authored appointment-flow illustration, package preview, qualification context, process, risk-reversal, FAQ preview, and repeated CTAs
- `src/components/marketing/` contains reusable `AppointmentFlow` and `PackageCard` presentation components
- `/get-started?package=<package-id>` reads the selected typed package configuration and explains the pending qualification path without implying an online purchase
- No external images, social proof, credential claims, or unverified performance claims are used

## Commit 5: Lead Capture Pipeline

- `LeadForm` provides accessible qualification and contact forms with user-facing server validation feedback
- `submitLead` is a same-origin Server Action protected by a honeypot, timing threshold, input schema, and local rate-limit safety net
- `GoogleSheetsLeadRepository` implements the narrowly scoped persistence contract behind `LeadSubmissionService` and posts to the Google Apps Script Web App in `google-apps-script/Code.gs`
- The Apps Script Web App appends the lead fields to a configured Google Sheet
- Form submissions require deployment-only `GOOGLE_SHEETS_WEBHOOK_URL` configuration; when absent, requests fail safely and are never treated as saved

## Final SEO and Security Hardening

- Generated Open Graph image, sitemap, robots directives, canonical metadata, and Organization/Service JSON-LD use the Next.js App Router metadata conventions
- Browser-native constraint validation remains enabled for fast client feedback; the server action remains authoritative
- CSP, frame denial, MIME-sniff prevention, referrer policy, permissions policy, and HSTS are explicitly configured in `next.config.ts`
- The lead action confirms that `trial` and paid-package sources cannot be swapped by a manipulated form field
- GitHub Actions now verifies formatting, linting, tests, type checking, and production build on `main` pushes and pull requests
- npm overrides pin patched `postcss` and `sharp` versions for the tested Next.js release; `npm audit --omit=dev` is clean. Revisit the overrides when Next.js ships equivalent direct dependency versions
- The repository does not contain production credentials, distributed rate limiting, deployed Lighthouse/axe results, or an analytics dashboard; these remain external launch tasks

## Commit 7: Vendor-Neutral Analytics Wiring

- `src/lib/analytics.ts` enhanced with `buildPrivacySafePayload` (strips PII), a singleton `analytics` tracker wired to `NEXT_PUBLIC_ANALYTICS_ENABLED`, and typed event constants
- `src/components/analytics/AnalyticsPageView.tsx` — client-side shim that fires `homepage_view`, `package_view`, and `package_selected` on route change via `usePathname`
- `submitLead` server action fires `form_completed`, `free_trial_requested`, and `contact_submitted` after a successful lead save
- `LeadForm` client component fires `form_started` on first focus
- Default production behavior is a true no-op; analytics fire only when `NEXT_PUBLIC_ANALYTICS_ENABLED=true`
- `src/lib/analytics.test.ts` covers disabled/enabled tracker behavior, payload privacy stripping, event constants, and no-op safety
- All calls are isolated from lead submission and page rendering — analytics failures cannot break the conversion path

## Commit 8: Placeholder Pricing, Testimonials, and Deployment Prep

- `src/content/packages.ts` updated with realistic placeholder monthly pricing tiers: Starter $499/mo, Growth $899/mo, Pro/Scale $1,499/mo. Each package includes lead-capture, notification, and tiered benefit features. An explicit `PLACEHOLDER` comment and `SAMPLE` price notes mark all amounts as non-final.
- `src/content/trust.ts` extended with `placeholder` and `verified` fields on `Testimonial`; three sample testimonials added with `verified: false` and `placeholder: true`.
- `src/components/marketing/TestimonialCard.tsx` — new component rendering testimonials with a "Sample" badge and star rating, visually and programmatically distinguishing placeholders from verified reviews.
- Homepage (`src/app/page.tsx`) now includes a testimonials section between the risk-reversal and FAQ sections, with a clear disclaimer that all testimonials are sample placeholders.
- `.env.example` and `docs/SETUP.md` document all required environment variables: `GOOGLE_SHEETS_WEBHOOK_URL`, `NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_ANALYTICS_ENABLED`, `TURNSTILE_SECRET_KEY`.
- `docs/OPERATIONS.md` deployment checklist expanded with explicit Preview deploy, Preview smoke test with Sheet-row confirmation, Production deploy, Production smoke test, and pending Lighthouse/axe steps.
- `docs/ROADMAP.md` and `docs/PROJECT_MEMORY.md` updated to reflect placeholder pricing/testimonials in place, deployment prep ready pending manual Vercel/domain deployment, and deferred items (admin seam, monitoring vendor, distributed rate limiting, Lighthouse/axe).

## Deferred / Out of Scope

## Brand

- **Name**: Roofline Partners
- **Positioning**: Premium roofing appointment packages for contractor teams that want qualified conversations
- **Tone**: Professional, trustworthy, craftsmanship-focused
- **Target audience**: Homeowners and property managers seeking quality roofing

## MVP Scope

1. **Premium marketing site** — hero, packages, process, qualification context, FAQ, and contact
2. **Secure lead capture** — form → sanitise → validate → store in a Google Sheet via the Apps Script Web App
3. **No payments in v1** — manual fulfillment workflow
4. **SEO** — full metadata, OG images, JSON-LD, sitemap, robots.txt
5. **Analytics** — event tracking for form submissions and page views

## Deferred / Out of Scope

- **Admin capability seam** — deferred; no authenticated admin inbox or dashboard in v1. The `LeadRepository` contract is the extension point for a future admin CRM.
- **Monitoring & error-tracking vendor** — deferred; no Sentry, Datadog, or equivalent integration. Server-side errors are logged with `console.error`.
- **Distributed edge rate limiting** — deferred; the process-local in-memory rate limiter is accepted as sufficient for current single-client traffic. Edge controls (Vercel Firewall, Cloudflare) are deferred until multi-client or higher-traffic deployment.
- **Placeholder pricing** — current package tiers are sample amounts with explicit `PLACEHOLDER` comments; replace with client-approved pricing before launch.
- **Placeholder testimonials** — `src/content/trust.ts` contains sample testimonials with `verified: false`; replace with verified, consented reviews before launch.
- **Deployment readiness** — codebase and CI are ready pending manual Vercel/domain deployment, env var configuration, and live Lighthouse/axe audits.

## Key Files

| File                                             | Purpose                                                        |
| ------------------------------------------------ | -------------------------------------------------------------- |
| `src/app/layout.tsx`                             | Root layout with SEO metadata and `AnalyticsPageView`          |
| `src/app/globals.css`                            | Tailwind imports, CSS design tokens                            |
| `src/lib/env.ts`                                 | Public environment resolution and production URL release check |
| `src/lib/analytics.ts`                           | Typed analytics contract, privacy-safe payload builder         |
| `src/lib/lead-utils.ts`                          | Lead data utilities                                            |
| `src/lib/lead-utils.test.ts`                     | TDD test for sanitiseLead                                      |
| `src/components/analytics/AnalyticsPageView.tsx` | Client-side page-view analytics shim                           |
| `src/app/api/health/route.ts`                    | Cache-disabled deployment liveness endpoint                    |
| `tests/marketing.spec.ts`                        | Playwright smoke coverage for public conversion paths          |
| `docs/OPERATIONS.md`                             | Production launch and rollback runbook                         |
| `.env.example`                                   | Documented env var schema                                      |
| `docs/`                                          | Architecture documentation                                     |
| `google-apps-script/Code.gs`                     | Google Sheets webhook deployment script                        |

## Living Document

This file is updated as the project evolves. See [ROADMAP.md](./ROADMAP.md) for planned milestones.

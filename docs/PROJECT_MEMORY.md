# Project Memory

## Current Product Model

**LeadbyLead** is a meeting-first roofing appointment service. The site no longer publishes package tiers or fixed pricing. Visitors share their company, optional ZIP code, preferred call time, timezone, and message on the homepage. Pricing and commercial terms are discussed on the call.

## Current State

- Next.js 16 App Router with TypeScript, Tailwind CSS v4, ESLint, Prettier, Vitest, and Playwright.
- Homepage-only conversion flow with smooth-scroll CTAs and one scheduling form.
- Legacy `/packages`, `/get-started`, and `/contact` routes permanently redirect to the homepage.
- Lead schema stores `company_name`, optional `zip_code`, `requested_contact_at`, and `requested_contact_timezone`; package and legacy qualification fields are removed from the active model.
- Supabase/PostgREST storage and Resend notification adapters remain server-only.
- Optional Google Sheets delivery uses a server-only Apps Script webhook and separate requested date/time and IANA timezone fields.
- FAQ text is visible at rest, form fields have visible borders in light/dark mode, and reduced-motion preferences disable decorative animations.

## Verification

- Unit tests cover the scheduling schema, timezone fields, Server Action security gates, provider payloads, store-first notification behavior, form accessibility, and rate limiting.
- Playwright covers homepage conversion content, legacy 308 redirects, SEO routes, and health.
- Production launch, smoke testing, monitoring, and rollback are documented in [OPERATIONS.md](./OPERATIONS.md).

## Deferred / External

- Production Supabase/Resend credentials and migration execution.
- Distributed edge rate limiting.
- Deployed Lighthouse/axe audits.
- APM/error tracking and analytics vendor integration.
- Approved testimonials/business proof and authenticated admin inbox.

## Key Files

| File                                                       | Purpose                                       |
| ---------------------------------------------------------- | --------------------------------------------- |
| `src/app/page.tsx`                                         | Homepage marketing and sole conversion flow   |
| `src/components/forms/LeadForm.tsx`                        | Scheduling form and timezone capture          |
| `src/app/actions/submit-lead.ts`                           | Secure Server Action                          |
| `src/features/leads/lead-schema.ts`                        | Meeting-first lead contract                   |
| `src/features/leads/lead-repository.ts`                    | Supabase adapter                              |
| `src/features/leads/notification-service.ts`               | Resend adapter                                |
| `supabase/migrations/202607290002_meeting_first_leads.sql` | Removes old fields and adds scheduling fields |
| `docs/OPERATIONS.md`                                       | Production runbook                            |

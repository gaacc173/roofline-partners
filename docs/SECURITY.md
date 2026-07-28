# Security

## Overview

This document covers the security posture, practices, and considerations for the Roofline Partners application.

## Environment Variables

- All sensitive values are stored in `.env.local` (never committed)
- `.env.example` documents the schema without real values
- `src/lib/env.ts` supplies safe local defaults for public site metadata
- `validateProductionEnvironment()` prevents a release from using a localhost canonical URL; Supabase and Resend keys are validated when their integrations are enabled
- No secrets are embedded in source code or client-side bundles

## Data Handling

### Lead Data

1. **Input sanitisation** — All lead fields pass through `stripHtml()` to remove HTML tags
2. **Validation** — `isLeadValid()` checks required fields and email format before processing
3. **Storage** — Leads are stored in Supabase PostgreSQL with row-level security (future)
4. **Transmission** — All API communication uses HTTPS (enforced by Vercel)

### No Payments in v1

- No credit card data handled
- No PCI-DSS requirements for this phase
- Manual fulfillment workflow only

## Dependencies

- All dependencies are from trusted registries (npm, official Next.js ecosystem)
- `npm audit` run before each release
- Lockfile (`package-lock.json`) committed to version control
- No dev dependencies in production builds

## Next.js Security Features

- **CSP headers** — Managed by Vercel deployment; custom policies can be added via `next.config.ts`
- **X-Frame-Options** — will be set explicitly in the application security-header policy before the lead endpoint is released
- **CSRF protection** — the lead endpoint will enforce same-origin checks and request verification; no mutation endpoint exists yet
- **XSS prevention** — React escapes by default; `stripHtml()` adds server-side defense

## Supabase Security (Future)

- Row Level Security (RLS) policies on `leads` table
- Service role key stored server-side only (never client-exposed)
- Anon key scoped to allowed operations only
- Database migrations run through Supabase CLI or manual SQL

## Resend Security (Future)

- API key stored in server-side environment only
- Email templates use server-side rendering
- No user data included in email subjects or preview text

## Vercel Security

- Automatic HTTPS on all deployments
- Environment variables managed in Vercel dashboard
- Deployment previews isolated from production
- Role-based access control for team members

## Analytics Privacy

- Analytics interface defined in `src/lib/analytics.ts` with typed event constants
- No vendor integration or client-side tracking calls in the current phase
- When implemented, analytics will collect only necessary event data
- No personally identifiable information (PII) sent to analytics providers
- No third-party JavaScript without audit (per ADR-009 Asset Policy)

## Asset Security

- Only self-generated SVGs and CSS-based assets used
- No external fonts from untrusted CDNs (Geist from Next.js built-in)
- No third-party JavaScript without audit
- Favicon and OG images generated in-house

## Incident Response

1. Rotate any exposed credentials immediately
2. Update affected environment variables
3. Redeploy to invalidate cached secrets
4. Document the incident and update this document

# Security

## Overview

This document covers the security posture, practices, and considerations for the Roofline Partners application.

## Environment Variables

- All sensitive values are stored in `.env.local` (never committed)
- `.env.example` documents the schema without real values
- `src/lib/env.ts` validates required variables at startup
- Optional integration keys (Supabase, Resend) are validated only when present
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
- **X-Frame-Options** — Set by Next.js/Vercel default
- **CSRF protection** — Server Actions use built-in CSRF tokens
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

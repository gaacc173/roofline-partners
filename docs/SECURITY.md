# Security

## Overview

This document covers the security posture, practices, and considerations for the Roofline Partners application.

## Environment Variables

- All sensitive values are stored in `.env.local` (never committed)
- `.env.example` documents the schema without real values
- `src/lib/env.ts` supplies safe local defaults for public site metadata
- `validateProductionEnvironment()` only prevents a production canonical URL from using `localhost`; it is a release helper and does not validate provider connectivity. Google Sheets configuration is checked when a lead is submitted.
- No secrets are embedded in source code or client-side bundles

## Data Handling

### Lead Data

1. **Validation** — every form field is parsed on the server with a strict Zod schema, allow-listed contact methods, length limits, and normalized email
2. **Abuse controls** — hidden honeypot, minimum completion time, same-origin verification, and a process-local rate-limit safety net protect the Server Action
3. **Storage** — `GoogleSheetsLeadRepository` posts leads from the server to the Google Apps Script Web App, which appends a row to the configured Sheet
4. **Notification** — the Sheet append is the storage and notification mechanism for this single-client build
5. **Transmission** — all production API communication uses HTTPS (enforced by Vercel)

### Rate Limiting and CAPTCHA

The in-process limiter allows five submissions per 15-minute window per derived client identifier and is intentionally only a local safety net; it cannot provide global coordination across serverless instances. Before public launch, enable an edge control such as Vercel WAF rate limiting or Cloudflare. The `TURNSTILE_SECRET_KEY` field is a server-side seam only; Turnstile is not currently enforced by `submitLead` because no client widget/site key is configured.

### No Payments in v1

- No credit card data handled
- No PCI-DSS requirements for this phase
- Manual fulfillment workflow only

## Dependencies

- All dependencies are from trusted registries (npm, official Next.js ecosystem)
- `npm audit --omit=dev` runs in CI before each release; this is the production dependency gate
- Lockfile (`package-lock.json`) committed to version control
- No dev dependencies in production builds

### Dependency Maintenance

The lockfile pins compatible patched `postcss` and `sharp` versions through npm `overrides` while the application remains on the tested Next.js `16.2.12` release. `npm audit --omit=dev` is clean after installation. Keep the overrides until the direct Next.js dependency adopts equivalent versions, then remove them in a dedicated tested maintenance change. Do not run `npm audit fix --force`; it proposes an unsafe downgrade to Next.js 9 for this App Router project.

The full audit also reports a high-severity advisory in the ESLint 9 development-only dependency graph (`minimatch`/`brace-expansion`). A newer `brace-expansion` override was tested and rejected because it breaks ESLint 9's expected module API. Track the compatible ESLint/Next lint-stack upgrade separately; it is not shipped to the production runtime.

## Next.js Security Features

- **CSP headers** — explicit `Content-Security-Policy` limits scripts, connections, forms, frames, objects, and base URLs to the application boundary
- **Browser protections** — `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, strict referrer policy, a restrictive permissions policy, and production HSTS are set through `next.config.ts`
- **CSRF protection** — the Server Action verifies same-origin `Origin`/`Host` before mutating data
- **XSS prevention** — React escapes rendered text; the server schema also strips markup from stored free text
- **Lead boundary tests** — Server Action rejection paths and the Google Sheets adapter contract are covered by focused tests before the webhook URL is used

## Operational Checks

- `GET /api/health` returns `{ "status": "ok" }` with `Cache-Control: no-store` and performs no provider calls.
- Playwright browser smoke tests run against a local development server and cover the primary package-selection and SEO paths.

## Google Sheets / Apps Script Security

- `google-apps-script/Code.gs` executes as the Sheet owner and appends rows to the bound Sheet.
- The Web App is intentionally configured to accept POSTs from anyone with the link for this single-client build; it is not an authenticated public API.
- The webhook URL remains server-only and must not be placed in a `NEXT_PUBLIC_` variable. If it is exposed or abused, redeploy the Apps Script Web App and rotate the Vercel value.
- The actual application gate is the Next.js Server Action: same-origin verification, Zod validation and normalization, honeypot/timing checks, and process-local rate limiting run before the webhook call. Distributed edge rate limiting remains required before public launch.
- `google-apps-script/Code.gs` prefixes formula-leading cell values before appending them, preventing submitted names, phone numbers, notes, or other fields from being evaluated as Sheet formulas.
- Apps Script execution logs and unexpected Sheet rows should be reviewed after launch; the webhook itself does not replace application-level abuse controls.

## Vercel Security

- Automatic HTTPS on all deployments
- Environment variables managed in Vercel dashboard
- Deployment previews isolated from production
- Role-based access control for team members

## Analytics Privacy

- Analytics interface defined in `src/lib/analytics.ts` with typed event constants
- Default production behavior is a true no-op; events fire only when `NEXT_PUBLIC_ANALYTICS_ENABLED=true`
- `buildPrivacySafePayload` strips all known PII fields (name, email, phone, notes, username, company name, service area, best contact time, preferred contact method) before any event is tracked
- No vendor integration or client-side tracking SDK is included; the enabled path logs to `console.log` as a placeholder
- No third-party JavaScript is loaded without audit (per ADR-009 Asset Policy)
- Analytics wiring in `AnalyticsPageView` (layout) and `LeadForm` cannot break lead submission or page rendering — all calls are wrapped in no-op guards
- When a vendor is integrated, the `createTracker` placeholder in `src/lib/analytics.ts` is the single extension point

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

See [docs/OPERATIONS.md](./OPERATIONS.md) for deployment rollback and credential-rotation procedures.

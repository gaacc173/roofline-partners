# Architecture

## Overview

Roofline Partners is a premium roofing company website built with **Next.js App Router**. The application serves as a marketing site with secure lead capture as its MVP feature set.

## Technology Stack

| Layer             | Technology                                      |
| ----------------- | ----------------------------------------------- |
| Framework         | Next.js 16 (App Router, Turbopack by default)   |
| Language          | TypeScript (strict mode)                        |
| Styling           | Tailwind CSS v4                                 |
| Testing           | Vitest (unit), Playwright (browser smoke tests) |
| Linting           | ESLint 9 (ESLint CLI, no `next lint`)           |
| Formatting        | Prettier 3                                      |
| Target Deployment | Vercel                                          |
| Lead storage      | Google Sheets via Apps Script Web App           |

## Directory Structure

```
src/
  app/
    api/health/   # Cache-disabled deployment liveness endpoint
    layout.tsx    # Root layout with metadata (SEO, OG tags)
    page.tsx      # Config-driven premium home page
    globals.css   # Tailwind imports, CSS variables
  components/
    marketing/    # Appointment-flow and package presentation components
    layout/       # Shared navigation and footer
    ui/           # Reusable design-system primitives
  content/        # Typed marketing, package, FAQ, and site configuration
  lib/
    env.ts        # Typed environment validation
    lead-utils.ts # Lead data sanitisation & validation
docs/             # Architecture and project documentation
public/           # Static assets
```

## Data Flow

```
User → Browser → Next.js App Router → Server Components
                                    → Server Action (lead submission)
                                    → GoogleSheetsLeadRepository
                                    → Google Apps Script Web App (Code.gs)
                                    → Google Sheet row
```

### Current State (Shared Marketing Shell)

- **Marketing experience** — homepage, packages, process, differentiation, FAQ, contact, and a query-aware package selection route render through a shared config-driven design system
- **Environment resolution** — public site values have safe local defaults; `validateProductionEnvironment()` is reserved for release/deployment validation so contributors can run the shell without secrets
- **Lead utilities** — pure functions for sanitising and validating lead data used by the server action
- **Lead pipeline** — qualification and contact forms submit through a same-origin Server Action and persist through `GoogleSheetsLeadRepository`, which posts to the Google Apps Script Web App defined in `google-apps-script/Code.gs`

### Operational Verification

- `GET /api/health` provides a minimal liveness signal for Vercel checks and external uptime monitors.
- Playwright smoke tests cover package-to-qualification navigation, the selected package contract, public SEO routes, and the health endpoint.
- The health endpoint intentionally does not perform provider calls, so monitoring cannot create leads or incur webhook traffic.

### Lead Pipeline (MVP)

```
Lead Form (Client) → Server Action → sanitiseLead() → isLeadValid()
                    → GoogleSheetsLeadRepository
                    → GOOGLE_SHEETS_WEBHOOK_URL POST
                    → google-apps-script/Code.gs appends row
                    → Analytics event
```

## Key Design Decisions

1. **App Router only** — no Pages Router; all routes under `src/app/`
2. **Server Components by default** — client components only where interactivity is needed
3. **Pure utility layer** — `src/lib/` contains framework-agnostic helpers
4. **Provider contract** — `GoogleSheetsLeadRepository` is a server-only adapter behind the `LeadRepository` interface; the Sheet is the lead destination and no separate notification provider is used
5. **No payments in v1** — manual fulfillment workflow only

## SEO Configuration

- `Metadata` object in `layout.tsx` defines title, description, open graph, and Twitter card
- Generated Open Graph image via `src/app/opengraph-image.tsx` uses only self-authored visual design
- `robots.ts` allows public marketing routes but excludes qualification and thank-you routes; `sitemap.ts` lists indexable routes
- JSON-LD for **Organization** and **Service** schema is emitted from typed configuration
- `src/app/icon.svg` provides the self-authored App Router favicon

## Security Model

- Public environment values resolved through `src/lib/env.ts`; production URL validation is run as part of deployment hardening
- Lead data sanitised via `stripHtml()` before storage
- No client-side secrets; all sensitive operations server-side
- CSP and browser security headers managed in `next.config.ts`

See [docs/SECURITY.md](./SECURITY.md) for the full security document.

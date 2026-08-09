# Architecture

## Overview

LeadbyLead is a meeting-first roofing appointment website built with the Next.js App Router. The public experience is intentionally simple: the homepage explains the model and contains the only conversion form, which schedules a conversation rather than selecting or purchasing a package.

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
| Database          | Supabase PostgreSQL                             |
| Email             | Resend                                          |
| Optional export   | Google Apps Script → Google Sheets              |

## Directory Structure

```
src/
  app/
    api/health/    # Cache-disabled deployment liveness endpoint
    actions/       # Server Action for the homepage scheduling form
    layout.tsx     # Root layout with metadata and structured data
    page.tsx       # Homepage-only marketing and conversion flow
    globals.css    # Tailwind imports, tokens, motion, and scroll behavior
  components/
    forms/         # Single scheduling form
    marketing/     # Appointment-flow visual
    layout/        # Shared navigation and footer
    ui/            # Reusable design-system primitives
  content/         # Typed marketing, FAQ, trust, and site configuration
  features/leads/  # Schema, service, provider adapters, and tests
  lib/             # Environment, analytics, SEO, and shared utilities

## Data Flow

```

Visitor → Homepage scheduling form → same-origin Server Action
→ Zod validation + abuse controls
→ Supabase contact lead
→ Resend internal notification
→ /thank-you

```

The form captures the visitor-selected local date/time and the browser-detected IANA timezone as separate fields. This preserves timezone context for the team without asking visitors to calculate conversions.

## Product Model

- No published package tiers, fixed prices, package IDs, or online purchase flow exist.
- `/packages`, `/get-started`, and `/contact` are retained only as permanent redirects for old links; the homepage is the sole conversion surface.
- Appointment types covered: storm repair, roof replacement, hail damage, and insurance jobs.
- Pricing, volume, territory, and commercial terms are discussed on the call.

## Security and Operations

- Server-only Supabase service-role and Resend credentials.
- Same-origin verification, honeypot, timing gate, Zod validation, and process-local rate-limit safety net.
- RLS remains enabled; the meeting-first migration removes old package/contact-method columns and adds scheduling fields.
- `GET /api/health` is a liveness-only endpoint.
- See [OPERATIONS.md](./OPERATIONS.md) for launch, smoke testing, monitoring, and rollback.
```

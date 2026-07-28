# Architecture

## Overview

Roofline Partners is a premium roofing company website built with **Next.js App Router**. The application serves as a marketing site with secure lead capture as its MVP feature set.

## Technology Stack

| Layer             | Technology                                    |
| ----------------- | --------------------------------------------- |
| Framework         | Next.js 16 (App Router, Turbopack by default) |
| Language          | TypeScript (strict mode)                      |
| Styling           | Tailwind CSS v4                               |
| Testing           | Vitest (unit), Playwright (E2E, planned)      |
| Linting           | ESLint 9 (ESLint CLI, no `next lint`)         |
| Formatting        | Prettier 3                                    |
| Target Deployment | Vercel                                        |
| Database (future) | Supabase PostgreSQL                           |
| Email (future)    | Resend                                        |

## Directory Structure

```
src/
  app/
    layout.tsx    # Root layout with metadata (SEO, OG tags)
    page.tsx      # Home page (static)
    globals.css   # Tailwind imports, CSS variables
  lib/
    env.ts        # Typed environment validation
    lead-utils.ts # Lead data sanitisation & validation
docs/             # Architecture and project documentation
public/           # Static assets
```

## Data Flow

```
User → Browser → Next.js App Router → Server Components
                                    → Server Actions (future)
                                    → API Routes (future)
                                    → Supabase (future)
```

### Current State (Foundation)

- **Static home page** — rendered at build time via Next.js App Router
- **Environment validation** — runs at module load; throws on missing required vars
- **Lead utilities** — pure functions for sanitising and validating lead data (ready for future server actions/API routes)

### Planned State (MVP)

```
Lead Form (Client) → Server Action → sanitiseLead() → isLeadValid()
                    → Supabase INSERT into leads table
                    → Resend email notification
                    → Analytics event
```

## Key Design Decisions

1. **App Router only** — no Pages Router; all routes under `src/app/`
2. **Server Components by default** — client components only where interactivity is needed
3. **Pure utility layer** — `src/lib/` contains framework-agnostic helpers
4. **Deferred integrations** — Supabase and Resend are documented but not yet wired
5. **No payments in v1** — manual fulfillment workflow only

## SEO Configuration

- `Metadata` object in `layout.tsx` defines title, description, open graph, and Twitter card
- `robots: { index: true, follow: true }` for full indexing
- JSON-LD for **Organization** and **Service** schema (to be added in MVP)
- Favicon and OG images in `public/` (to be added in MVP)

## Security Model

- Environment variables validated at startup via `src/lib/env.ts`
- Lead data sanitised via `stripHtml()` before storage
- No client-side secrets; all sensitive operations server-side
- CSP headers managed by Vercel deployment config (future)

See [docs/SECURITY.md](./SECURITY.md) for the full security document.

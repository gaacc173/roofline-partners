# Architecture Decision Records

## ADR-001: Next.js App Router

- **Status**: Accepted
- **Date**: 2026-07-28
- **Context**: We need a modern React framework with server-side rendering, SEO support, and deployment simplicity on Vercel.
- **Decision**: Use Next.js 16 with App Router exclusively. No Pages Router.
- **Consequences**:
  - Access to Server Components, Server Actions, and route handlers
  - Turbopack for fast dev builds
  - Vercel-native deployment with zero config
  - Must follow App Router conventions (layout.tsx, page.tsx, etc.)

## ADR-002: TypeScript Strict Mode

- **Status**: Accepted
- **Date**: 2026-07-28
- **Context**: Type safety is important for a production application with deferred integrations.
- **Decision**: Enable TypeScript strict mode in `tsconfig.json`.
- **Consequences**: All code is type-checked; no `any`; explicit types at module boundaries.

## ADR-003: Tailwind CSS v4

- **Status**: Accepted
- **Date**: 2026-07-28
- **Context**: We need a utility-first CSS framework that integrates well with Next.js.
- **Decision**: Use Tailwind CSS v4 with PostCSS plugin. CSS variables for theming.
- **Consequences**: No `tailwind.config.js`; configuration via CSS `@theme` directive.

## ADR-004: Vitest for Unit Testing

- **Status**: Accepted
- **Date**: 2026-07-28
- **Context**: We need fast, framework-agnostic unit testing for pure utility functions.
- **Decision**: Use Vitest with `node` environment for unit tests.
- **Consequences**: Tests live alongside source files (`*.test.ts`); pure utilities in `src/lib/` are easily testable.

## ADR-005: Playwright Browser Smoke Testing

- **Status**: Accepted
- **Date**: 2026-07-28
- **Context**: End-to-end testing is needed once the application has interactive features.
- **Decision**: Use Playwright for a small browser smoke suite covering the public conversion path, SEO metadata routes, and health endpoint. Keep provider-backed lead submission out of automated browser tests.
- **Consequences**: Browser confidence covers public behavior without requiring external credentials or creating real leads.

## ADR-006: Deferred Supabase / Resend Integration

- **Status**: Accepted
- **Date**: 2026-07-28
- **Context**: The MVP needs lead capture but we want to keep the foundation lean.
- **Decision**: Implement typed environment validation and lead utilities now; wire Supabase and Resend in the MVP phase.
- **Consequences**:
  - `.env.example` documents the schema for future variables
  - `src/lib/env.ts` resolves public local defaults; deployment validation is explicit so contributors can run the shell without integration credentials
  - `src/lib/lead-utils.ts` is ready for use in server actions/API routes
  - No database or email dependencies in the foundation

## ADR-007: No Payments in v1

- **Status**: Accepted
- **Date**: 2026-07-28
- **Context**: Roofline Partners' initial MVP does not require online payments.
- **Decision**: Manual fulfillment workflow only. No Stripe or payment processor integration.
- **Consequences**: Simpler MVP scope; payments can be added in a future milestone.

## ADR-008: Prettier with PackageJSON Plugin

- **Status**: Accepted
- **Date**: 2026-07-28
- **Context**: Consistent code formatting across all files including package.json.
- **Decision**: Use Prettier 3 with `prettier-plugin-packagejson`.
- **Consequences**: `package.json` fields are sorted alphabetically; consistent formatting across all file types.

## ADR-009: Asset Policy

- **Status**: Accepted
- **Date**: 2026-07-28
- **Context**: We need a clear policy for assets without licensing concerns.
- **Decision**: Only use self-generated SVGs, CSS-based assets, and Next.js built-in fonts (Geist). No unlicensed external assets.
- **Consequences**: All brand assets (logo, OG images, favicon) must be created in-house or sourced with appropriate licenses.

## ADR-010: Git Milestones

- **Status**: Accepted
- **Date**: 2026-07-28
- **Context**: Clear versioning with meaningful commits.
- **Decision**: Six milestones tracked in [ROADMAP.md](./ROADMAP.md), each corresponding to a logical feature boundary.
- **Consequences**: Foundation (Commit 1), documentation (Commit 2), design system (Commit 3), marketing pages, MVP features, and deployment are clearly delineated.

## ADR-011: Content Configuration Module

- **Status**: Accepted
- **Date**: 2026-07-28
- **Context**: Marketing copy and structured data (packages, FAQs, trust signals) should not be hardcoded in components. Components should be reusable and driven by data.
- **Decision**: Create a `src/content/` module with typed configuration files (`site.ts`, `packages.ts`, `faqs.ts`, `trust.ts`) that export plain data objects consumed by components.
- **Consequences**:
  - Components receive data as props, making them testable and reusable
  - Content changes do not require component changes
  - Proof-placeholder content is clearly labeled and separate from real copy
  - Future CMS integration can replace these files with API calls transparently

## ADR-012: Analytics Interface (No Vendor Lock-in)

- **Status**: Accepted
- **Date**: 2026-07-28
- **Context**: The application needs to track user interactions but should not commit to a specific analytics vendor at this stage.
- **Decision**: Define a typed analytics interface in `src/lib/analytics.ts` with named event constants. No vendor integration or client-side tracking calls yet.
- **Consequences**:
  - Event types are centralized and type-safe
  - Adding a vendor in a future milestone requires only implementing the interface
  - No runtime overhead when analytics are disabled
  - Event names follow a consistent `entity_action` convention

## ADR-013: Server Action Lead Pipeline with Provider Contracts

- **Status**: Accepted
- **Date**: 2026-07-28
- **Context**: The MVP needs durable lead capture and internal notifications without coupling public forms to a database, email SDK, or future CRM.
- **Decision**: Accept submissions through a same-origin Next.js Server Action. Parse them with Zod, then use `LeadSubmissionService` with `LeadRepository` and `LeadNotificationService` contracts. Supabase PostgREST and Resend REST are the initial adapters.
- **Consequences**:
  - Provider secrets remain server-only and no database SDK is sent to the browser
  - The lead row is saved before the notification attempt; notification failure is logged without losing a lead
  - Future CRM, queue/outbox, or provider changes replace adapters rather than public form logic
  - Rate limiting requires an edge/shared-provider control before public production launch because the local guard is not globally distributed

## ADR-014: Dependency Overrides for Patched Transitives

- **Status**: Accepted
- **Date**: 2026-07-29
- **Context**: The tested Next.js 16.2.12 release declares vulnerable transitive `postcss` and `sharp` ranges, while npm's automatic remediation proposes an incompatible Next.js 9 downgrade.
- **Decision**: Pin compatible patched `postcss` and `sharp` versions with npm `overrides`, then verify the resulting tree, build, and audit output. Re-evaluate and remove the overrides when the direct framework dependency includes equivalent patches.
- **Consequences**:
  - `npm audit --omit=dev` is clean without a framework downgrade.
  - Dependency upgrades must re-run install, `npm ls`, audit, tests, and build because the override changes framework transitive dependencies.
  - The override is deliberately narrow and does not introduce a runtime package or custom patch.

The full audit may still report a development-only ESLint 9 transitive advisory. A newer `brace-expansion` override was evaluated and rejected because it breaks ESLint 9's module API; that toolchain upgrade remains separate from this production dependency hardening.

## ADR-015: Minimal Liveness Endpoint

- **Status**: Accepted
- **Date**: 2026-07-29
- **Context**: Vercel and uptime monitoring need a safe signal that the application can serve requests without mutating data or depending on third-party providers.
- **Decision**: Add `GET /api/health` returning a cache-disabled `{ status: "ok" }` response. Provider readiness remains a deployment smoke-test concern.
- **Consequences**:
  - Monitoring is cheap, deterministic, and safe to poll.
  - A healthy liveness response does not imply Google Sheets or Apps Script availability.

## ADR-016: Migrate Lead Storage from Supabase/Resend to Google Sheets

- **Status**: Accepted
- **Date**: 2026-07-29
- **Context**: The single-client MVP needs a dependable lead destination without the operational overhead of running a database and email service for one client. ADR-006 records the earlier decision to defer the Supabase/Resend integration and ADR-013 records those providers as the initial adapters.
- **Decision**: Store leads through `GoogleSheetsLeadRepository`, which posts to the `GOOGLE_SHEETS_WEBHOOK_URL` Google Apps Script Web App defined in `google-apps-script/Code.gs`. The Web App appends each accepted lead as a row in the configured Google Sheet; the Sheet is the operational notification and storage destination.
- **Consequences**:
  - The application has no Supabase or Resend runtime dependency for lead capture.
  - Google account access and a deployed Apps Script Web App are required before real submissions can be accepted.
  - The webhook URL remains server-only, while same-origin checks, Zod validation, honeypot/timing checks, and rate limiting remain the application-level gates.
  - A future CRM, queue/outbox, or database adapter can replace the repository without changing public forms or the submission service.

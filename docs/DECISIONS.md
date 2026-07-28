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

## ADR-005: Playwright for Future E2E Testing

- **Status**: Accepted
- **Date**: 2026-07-28
- **Context**: End-to-end testing is needed once the application has interactive features.
- **Decision**: Keep Playwright available for the lead-flow milestone. Browser tests are not claimed until a configuration and test suite exist.
- **Consequences**: No E2E checks currently run; interactive component behavior is covered with Vitest and Testing Library where required.

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

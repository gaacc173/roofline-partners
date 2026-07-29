# Roofline Partners

Premium, qualification-first roofing appointment packages for contractor teams.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
  app/          # Next.js App Router pages and metadata assets
  components/   # Reusable layout, UI, and marketing sections
  content/      # Typed, reviewable package and marketing copy
  lib/          # Shared utilities (environment, analytics, lead helpers)
docs/           # Architecture and project documentation
public/         # Static assets (images, favicons, SVGs)
```

## Scripts

| Script                 | Description                             |
| ---------------------- | --------------------------------------- |
| `npm run dev`          | Start dev server (Turbopack by default) |
| `npm run build`        | Production build                        |
| `npm run start`        | Start production server                 |
| `npm run lint`         | Run ESLint                              |
| `npm run lint:fix`     | Run ESLint with auto-fix                |
| `npm run test`         | Run Vitest unit tests                   |
| `npm run test:watch`   | Run Vitest in watch mode                |
| `npm run test:e2e`     | Run Playwright browser smoke tests      |
| `npm run typecheck`    | TypeScript type checking                |
| `npm run format`       | Format with Prettier                    |
| `npm run format:check` | Check formatting                        |

## Environment Variables

Copy `.env.example` to `.env.local` and fill in values as integrations are added. See [docs/SETUP.md](./docs/SETUP.md) for details.

## Documentation

- [Architecture](./docs/ARCHITECTURE.md) — system overview and data flow
- [Project Memory](./docs/PROJECT_MEMORY.md) — living context document
- [Architecture Decisions](./docs/DECISIONS.md) — recorded decisions
- [Roadmap](./docs/ROADMAP.md) — milestones and timeline
- [Security](./docs/SECURITY.md) — security posture and practices
- [Setup](./docs/SETUP.md) — local development guide
- [Operations](./docs/OPERATIONS.md) — launch, monitoring, smoke testing, and rollback runbook
- [API](./docs/API.md) — API routes and server actions

## Deployment

Target platform: **Vercel**. See [docs/SETUP.md](./docs/SETUP.md) for deployment steps and monitor `/api/health` after release.

## License

Proprietary — all rights reserved.

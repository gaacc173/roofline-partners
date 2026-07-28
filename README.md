# Roofline Partners

Premium roofing solutions for residential and commercial properties.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
  app/          # Next.js App Router pages
  lib/          # Shared utilities (env validation, lead helpers)
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
- [API](./docs/API.md) — API routes and server actions

## Deployment

Target platform: **Vercel**. See [docs/ROADMAP.md](./docs/ROADMAP.md) for deployment milestones.

## License

Proprietary — all rights reserved.

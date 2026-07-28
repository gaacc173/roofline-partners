# Setup

## Prerequisites

- **Node.js** 20.9+ (LTS recommended)
- **npm** 9+ (bundled with Node)
- **Git** for version control

## Local Development

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env.local
```

Edit `.env.local` with your values. At minimum:

```env
NEXT_PUBLIC_APP_NAME="Roofline Partners"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

To accept real lead submissions, also configure:

```env
# Supabase (server-only)
SUPABASE_URL="https://your-project.supabase.co"
SUPABASE_SERVICE_ROLE_KEY=

# Resend (server-only)
RESEND_API_KEY=
RESEND_FROM_EMAIL="Roofline Partners <leads@yourdomain.com>"
LEAD_NOTIFICATION_EMAIL="owner@yourdomain.com"

# Analytics (Milestone 4)
NEXT_PUBLIC_ANALYTICS_ENABLED=false
```

### 3. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

| Script                 | Description                                 |
| ---------------------- | ------------------------------------------- |
| `npm run dev`          | Start dev server (Turbopack by default)     |
| `npm run build`        | Create production build                     |
| `npm run start`        | Start production server                     |
| `npm run lint`         | Run ESLint via the ESLint CLI               |
| `npm run lint:fix`     | Run ESLint with auto-fix via the ESLint CLI |
| `npm run test`         | Run Vitest unit tests                       |
| `npm run test:watch`   | Run Vitest in watch mode                    |
| `npm run typecheck`    | TypeScript type checking                    |
| `npm run format`       | Format all files with Prettier              |
| `npm run format:check` | Check formatting without modifying          |

## Testing

### Unit Tests

```bash
npm run test
```

Tests are located alongside source files (`*.test.ts` and `*.test.tsx`). The lead schema and responsive header behavior are covered alongside their modules.

### End-to-End Tests (Future)

Playwright is installed for a future browser suite. No Playwright configuration or browser tests exist yet.

```bash
# Run E2E tests when ready
npx playwright test
```

## TypeScript

The project uses strict TypeScript mode. Run type checking:

```bash
npm run typecheck
```

## Code Formatting

All files are formatted with Prettier:

```bash
# Format all files
npm run format

# Check formatting (CI-safe)
npm run format:check
```

## Editor Setup

- **VS Code**: Install the recommended extensions (ESLint, Prettier)
- The `.editorconfig` file ensures consistent indentation (2 spaces) and line endings
- `.prettierrc.json` defines formatting rules

## Troubleshooting

### Build fails with TypeScript errors

```bash
npm run typecheck
```

Check the reported errors and fix type mismatches.

### Dev server won't start

The marketing shell has safe local defaults. To submit real leads, configure the Supabase and Resend variables listed above.

### Port already in use

```bash
PORT=3001 npm run dev
```

## Production Deployment (Vercel)

1. Create a Supabase project and run `supabase/migrations/202607280001_create_leads.sql` in its SQL editor or migration workflow.
2. In Resend, verify the sender domain used by `RESEND_FROM_EMAIL`.
3. Import the repository into Vercel and configure the production environment variables from `.env.example`:
   - `NEXT_PUBLIC_APP_URL` must be the final HTTPS production URL.
   - `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, and `LEAD_NOTIFICATION_EMAIL` are required before accepting submissions.
4. Enable Vercel Firewall rate limiting or place Cloudflare in front of the site before exposing the lead form. The in-process limiter is not a distributed production control.
5. Deploy a preview, submit a controlled test request, confirm a row is stored and the internal email arrives, then deploy production.
6. Configure the canonical production URL in search-console tooling and submit `/sitemap.xml` after the site is publicly accessible.

Never place `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, or Turnstile secrets in a `NEXT_PUBLIC_` variable.

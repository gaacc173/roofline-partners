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

Edit the `.env.local` file with your values. At minimum:

```env
NEXT_PUBLIC_APP_NAME="Roofline Partners"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

To accept real lead submissions, also configure:

```env
# Google Sheets lead capture (server-only, required for lead storage)
# Deploy google-apps-script/Code.gs as an Apps Script Web App first,
# then paste its deployed URL here.
GOOGLE_SHEETS_WEBHOOK_URL="https://script.google.com/macros/s/XXXXXXXX/exec"

# Optional: Cloudflare Turnstile (server-only, used if configured)
# TURNSTILE_SECRET_KEY=

# Analytics (set to true to enable event tracking; no-op by default)
NEXT_PUBLIC_ANALYTICS_ENABLED=false
```

Leads are appended as rows to a Google Sheet via a Google Apps Script Web
App (`google-apps-script/Code.gs`) — no database or email provider is used
for this single-client build. See that file's header comment for the full
deployment steps.

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
| `npm run test:e2e`     | Run Playwright browser smoke tests          |
| `npm run typecheck`    | TypeScript type checking                    |
| `npm run format`       | Format all files with Prettier              |
| `npm run format:check` | Check formatting without modifying          |

## Testing

### Unit Tests

```bash
npm run test
```

Tests are located alongside source files (`*.test.ts` and `*.test.tsx`). The lead schema and responsive header behavior are covered alongside their modules.

### Browser Smoke Tests

Playwright covers the highest-value public paths: package selection into the qualification form, the liveness endpoint, and robots/sitemap responses. Install the Chromium browser once on a new machine:

```bash
npx playwright install chromium
npx playwright test
```

The suite starts a local Next.js development server automatically. It does not submit a real lead or require the Google Sheets webhook URL.

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

The marketing shell has safe local defaults. To submit real leads, configure `GOOGLE_SHEETS_WEBHOOK_URL` as described above.

### Port already in use

```bash
PORT=3001 npm run dev
```

## Production Deployment (Vercel)

Follow the complete [Production Operations Runbook](./OPERATIONS.md). At a high level:

1. Deploy `google-apps-script/Code.gs` as an Apps Script Web App bound to your leads sheet and copy its URL.
2. Add the custom domain to Vercel and set `GOOGLE_SHEETS_WEBHOOK_URL` separately for Preview and Production.
3. Enable distributed edge rate limiting before exposing the lead form.
4. Deploy Preview, perform the controlled lead smoke test (confirm a row appears in the sheet), then deploy Production and repeat it.
5. Monitor `GET /api/health`, then run deployed Lighthouse/axe and search-console checks.

Never place `GOOGLE_SHEETS_WEBHOOK_URL` or Turnstile secrets in a `NEXT_PUBLIC_` variable.

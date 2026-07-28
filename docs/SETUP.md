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

For future integrations:

```env
# Supabase (Milestone 4)
SUPABASE_URL=
SUPABASE_ANON_KEY=

# Resend (Milestone 4)
RESEND_API_KEY=

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

Tests are located alongside source files (`*.test.ts`). The TDD example is in `src/lib/lead-utils.test.ts`.

### End-to-End Tests (Future)

Playwright is installed and Chromium is downloaded. E2E test files will be added in Milestone 4.

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

Ensure `.env.local` has the required variables (`NEXT_PUBLIC_APP_NAME`, `NEXT_PUBLIC_APP_URL`).

### Port already in use

```bash
PORT=3001 npm run dev
```

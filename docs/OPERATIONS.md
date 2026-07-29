# Production Operations Runbook

This runbook is the operational source of truth for deploying and maintaining Roofline Partners. The application is deployed through Vercel, stores leads in Supabase, and sends internal notifications through Resend.

## What CI Does

`.github/workflows/ci.yml` is a verification pipeline, not a deployment pipeline. On pull requests and pushes to `main`, it runs:

1. `npm ci`
2. `npm audit --omit=dev`
3. Prettier formatting check
4. ESLint
5. Vitest unit tests
6. TypeScript typecheck
7. Production build
8. Playwright Chromium browser smoke tests

Vercel deployment is managed separately through the repository/Vercel Git integration. A green CI run is required for code confidence, but it does not prove that production provider credentials or database configuration are correct.

## Vercel Environment Scopes

Configure environment variables separately for **Preview** and **Production** in Vercel. Do not point Preview at production Supabase or Resend resources unless shared data and notification risk is explicitly accepted. Prefer a separate Supabase project and Resend test sender for Preview.

Required for real lead submissions:

- `NEXT_PUBLIC_APP_URL` — final HTTPS origin for the relevant Vercel environment
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `LEAD_NOTIFICATION_EMAIL`

Never expose service-role, Resend, or Turnstile secrets through `NEXT_PUBLIC_` variables.

## Initial Production Launch Checklist

- [ ] Confirm the final business name, email, phone, service area, package quantities, and sample pricing in `src/content/`.
- [ ] Add the final production domain to Vercel and confirm HTTPS is active.
- [ ] Set `NEXT_PUBLIC_APP_URL` to the exact final HTTPS origin, without a trailing path.
- [ ] Create the production Supabase project.
- [ ] Apply `supabase/migrations/202607280001_create_leads.sql`.
- [ ] Verify the `leads` table exists, RLS is enabled, and no public table policy permits anonymous access.
- [ ] Verify the Resend sender domain, including the provider-requested SPF/DKIM DNS records.
- [ ] Configure the production Supabase and Resend environment variables in Vercel.
- [ ] Enable edge rate limiting for the lead submission surface through Vercel Firewall, Cloudflare, or an equivalent distributed control.
- [ ] Deploy a Preview and complete the controlled smoke test below.
- [ ] Deploy Production and repeat the controlled smoke test with a real internal test address.
- [ ] Configure uptime monitoring for `GET /api/health`.
- [ ] Submit `/sitemap.xml` to search-console tooling after the final domain is indexed.
- [ ] Run Lighthouse and axe against the deployed URL and record any accepted exceptions.

The application-level limiter allows five submissions per 15-minute window per derived client identifier, but it is process-local and not multi-instance safe. It is not a substitute for the edge control.

## Controlled Lead Smoke Test

The Playwright suite deliberately does **not** submit a real lead. Provider-backed verification must be performed manually in Preview or Production:

1. Open `/get-started?package=trial` or `/contact`.
2. Submit a controlled request using an approved internal test address and clearly identifiable test notes.
3. Confirm the request completes at `/thank-you`.
4. Confirm exactly one new row appears in Supabase with the expected source/package and normalized email.
5. Confirm the internal Resend notification arrives at `LEAD_NOTIFICATION_EMAIL`.
6. Remove or label the test row according to the team’s data-retention procedure.
7. Confirm `GET /api/health` returns HTTP 200 and `{ "status": "ok" }`.

The health endpoint is a liveness check only. A green response does not prove Supabase or Resend connectivity.

## Monitoring and Signals

Configure an uptime probe for:

```text
GET https://<production-domain>/api/health
```

Suggested starting interval: five minutes, alert after two consecutive failures. Alert on a non-2xx response or a body other than `{ "status": "ok" }`.

Current application signals are intentionally minimal:

- Lead storage or notification failures are logged with `console.error` server-side.
- Users receive a generic submission error and no provider details.
- No APM, error-tracking vendor, log sink, or alert routing is configured in the repository yet.
- Review Supabase insert/error activity and Resend delivery/bounce activity after launch.

## Rollback

### Immediate Vercel rollback

Use the Vercel project dashboard to promote the last known-good Production deployment. This is preferred for an urgent runtime regression because it does not require a new build.

After promotion:

1. Confirm production environment variables were not unintentionally changed.
2. Check `/api/health`.
3. Run one controlled lead smoke test only if the rollback affects the lead pipeline.
4. Confirm the Supabase row and Resend notification.
5. Record the incident, deployment IDs, symptoms, and rollback time.

### Code correction rollback

For a code change that must be permanently corrected, revert the offending commit on `main`, allow CI to pass, and deploy the resulting known-good commit through Vercel. Do not rewrite shared history or force-push.

### Database caution

Do not roll back a database migration by deleting tables or columns during an application rollback. First determine whether the previous application version can safely read the current schema. Use an additive forward migration for incompatible schema changes and take a Supabase backup before destructive maintenance.

## Incident Response

If a credential is exposed:

1. Revoke or rotate the credential in Supabase, Resend, Vercel, or the affected provider.
2. Update the correct Vercel environment scope.
3. Redeploy or promote a known-good deployment so the new configuration is active.
4. Check `/api/health` and provider activity.
5. Document the incident and update `docs/SECURITY.md` if the threat model changed.

## Repository-Current Limitations

The following require external production access and cannot be completed solely in this repository:

- Real production environment variables and provider projects
- Distributed edge rate limiting
- Deployed Lighthouse and axe audits
- APM/error-tracking integration
- Analytics vendor integration
- Approved testimonials or additional business proof
- An authenticated admin inbox

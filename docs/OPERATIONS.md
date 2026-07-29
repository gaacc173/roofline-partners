# Production Operations Runbook

This runbook is the operational source of truth for deploying and maintaining Roofline Partners. The application is deployed through Vercel and stores leads in a Google Sheet through the Google Apps Script Web App in `google-apps-script/Code.gs`.

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

Vercel deployment is managed separately through the repository/Vercel Git integration. A green CI run is required for code confidence, but it does not prove that production provider configuration is correct.

## Vercel Environment Scopes

Configure environment variables separately for **Preview** and **Production** in Vercel. Do not point Preview at the production Google Sheet unless shared data and test-row risk is explicitly accepted. Prefer a separate Sheet and Apps Script deployment for Preview.

Required for real lead submissions:

- `NEXT_PUBLIC_APP_URL` — final HTTPS origin for the relevant Vercel environment
- `GOOGLE_SHEETS_WEBHOOK_URL` — deployed Apps Script Web App URL for the relevant Sheet

Never expose `GOOGLE_SHEETS_WEBHOOK_URL` or Turnstile secrets through `NEXT_PUBLIC_` variables.

## Initial Production Launch Checklist

- [ ] Confirm the final business name, email, phone, service area, package quantities, and sample pricing in `src/content/`.
- [ ] Add the final production domain to Vercel and confirm HTTPS is active.
- [ ] Set `NEXT_PUBLIC_APP_URL` to the exact final HTTPS origin, without a trailing path.
- [ ] Create the production Google Sheet with the header row documented in `google-apps-script/Code.gs`.
- [ ] Deploy `google-apps-script/Code.gs` as a Web App executing as the Sheet owner with access set to anyone with the link.
- [ ] Configure `GOOGLE_SHEETS_WEBHOOK_URL` separately for Preview and Production in Vercel.
- [ ] Configure `NEXT_PUBLIC_ANALYTICS_ENABLED` for each environment (leave `false` unless analytics are enabled).
- [ ] Configure `TURNSTILE_SECRET_KEY` in the relevant Vercel environment if Turnstile is in use.
- [ ] **Edge rate limiting (deferred):** the in-memory limiter in the lead action is accepted as sufficient for current single-client traffic. Distributed edge rate limiting through Vercel Firewall, Cloudflare, or an equivalent provider is deferred until multi-client or higher-traffic deployment.
- [ ] **Preview deploy:** push to the Vercel Preview branch and confirm the Preview URL loads without errors.
- [ ] **Preview smoke test:** submit a controlled lead from `/get-started?package=trial` or `/contact`, confirm redirect to `/thank-you`, and verify exactly one new row appears in the Preview Google Sheet with expected source/package and normalized email.
- [ ] **Production deploy:** push to the Vercel Production branch and confirm the live URL loads without errors.
- [ ] **Production smoke test:** repeat the controlled lead smoke test with a real internal test address and confirm the Sheet row.
- [ ] Configure uptime monitoring for `GET /api/health`.
- [ ] Submit `/sitemap.xml` to search-console tooling after the final domain is indexed.
- [ ] **Lighthouse:** run a Lighthouse audit against the deployed URL and record any accepted exceptions.
- [ ] **axe:** run an axe accessibility audit against the deployed URL and record any accepted exceptions.

The application-level limiter allows five submissions per 15-minute window per derived client identifier, but it is process-local and not multi-instance safe. It is accepted as sufficient for current single-client traffic; it is not a substitute for edge-level controls in a multi-instance or multi-client deployment.

## Controlled Lead Smoke Test

The Playwright suite deliberately does **not** submit a real lead. Provider-backed verification must be performed manually in Preview or Production:

1. Open `/get-started?package=trial` or `/contact`.
2. Submit a controlled request using an approved internal test address and clearly identifiable test notes.
3. Confirm the request completes at `/thank-you`.
4. Confirm exactly one new row appears in the configured Google Sheet with the expected source/package and normalized email.
5. Remove or label the test row according to the team’s data-retention procedure.
6. Confirm `GET /api/health` returns HTTP 200 and `{ "status": "ok" }`.

The health endpoint is a liveness check only. A green response does not prove Google Sheets or Apps Script connectivity.

## Monitoring and Signals

Configure an uptime probe for:

```text
GET https://<production-domain>/api/health
```

Suggested starting interval: five minutes, alert after two consecutive failures. Alert on a non-2xx response or a body other than `{ "status": "ok" }`.

Current application signals are intentionally minimal:

- Lead storage failures from the Apps Script Web App are logged with `console.error` server-side.
- Users receive a generic submission error and no provider details.
- No APM, error-tracking vendor, log sink, or alert routing is configured in the repository yet.
- Review the Google Sheet for expected lead rows and Apps Script execution logs for webhook errors after launch.

## Rollback

### Immediate Vercel rollback

Use the Vercel project dashboard to promote the last known-good Production deployment. This is preferred for an urgent runtime regression because it does not require a new build.

After promotion:

1. Confirm production environment variables were not unintentionally changed.
2. Check `/api/health`.
3. Run one controlled lead smoke test only if the rollback affects the lead pipeline.
4. Confirm the Google Sheet row.
5. Record the incident, deployment IDs, symptoms, and rollback time.

### Code correction rollback

For a code change that must be permanently corrected, revert the offending commit on `main`, allow CI to pass, and deploy the resulting known-good commit through Vercel. Do not rewrite shared history or force-push.

### Sheet caution

Do not delete or rearrange the configured Sheet columns during an application rollback. Keep the header order documented in `google-apps-script/Code.gs`, and label or remove test rows according to the team’s data-retention procedure.

## Incident Response

If a credential or webhook URL is exposed:

1. Revoke or rotate the affected Apps Script Web App deployment or credential in Vercel.
2. Update the correct Vercel environment scope.
3. Redeploy or promote a known-good deployment so the new configuration is active.
4. Check `/api/health`, Apps Script execution logs, and the Sheet for unexpected rows.
5. Document the incident and update `docs/SECURITY.md` if the threat model changed.

## Repository-Current Limitations

The following require external production access and cannot be completed solely in this repository:

- Real production environment variables, Google Sheet, and Apps Script deployment
- Distributed edge rate limiting
- Deployed Lighthouse and axe audits
- APM/error-tracking integration
- Analytics vendor integration
- Approved testimonials or additional business proof
- An authenticated admin inbox

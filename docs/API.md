# API and Lead Pipeline

## Lead Submission

The public forms use the Next.js Server Action `submitLead` in `src/app/actions/submit-lead.ts`. There is intentionally no public REST endpoint in v1.

```text
Visitor form
  → browser validation and accessible feedback
  → Server Action same-origin verification
  → honeypot, timing, process-local rate-limit guard
  → Zod validation and normalization
  → GoogleSheetsLeadRepository
  → POST to GOOGLE_SHEETS_WEBHOOK_URL
  → google-apps-script/Code.gs appends a row to the leads sheet
  → /thank-you redirect
```

The Server Action rejects missing/mismatched origins, unsupported sources, rate-limited requests, honeypot values, missing consent, invalid package/source combinations, malformed fields, and requests submitted in less than two seconds or more than 24 hours after the form was started. These checks are covered by focused unit tests in `src/app/actions/submit-lead.test.ts`.

The Google Sheet append is authoritative. The repository treats a non-2xx response or an invalid Apps Script response as a failed submission, so the user is not redirected as though the lead was saved.

For the manual provider-backed smoke test, submit one clearly labeled internal request from `/get-started?package=trial` or `/contact`, then confirm the matching Google Sheet row written by `google-apps-script/Code.gs`. The automated Playwright suite does not submit real leads.

## Health Check

`GET /api/health` is a cache-disabled, unauthenticated liveness endpoint intended for deployment checks and uptime monitoring. A healthy response is:

```json
{ "status": "ok" }
```

The endpoint verifies that the Next.js application can serve requests. It does not test Google Sheets connectivity; integration verification remains part of the controlled deployment smoke test.

## Configuration

| Variable                    | Scope       | Purpose                                                         |
| --------------------------- | ----------- | --------------------------------------------------------------- |
| `NEXT_PUBLIC_APP_URL`       | Public      | Canonical site URL for metadata                                 |
| `GOOGLE_SHEETS_WEBHOOK_URL` | Server only | Deployed Google Apps Script Web App URL for appending lead rows |
| `TURNSTILE_SECRET_KEY`      | Server only | Reserved CAPTCHA integration seam                               |

## Lead Model

The lead model is mapped to a Google Sheet by `GoogleSheetsLeadRepository`. The expected header row and deployment instructions are in `google-apps-script/Code.gs`.

### Initial operational fields

| Field                                | Notes                                 |
| ------------------------------------ | ------------------------------------- |
| `timestamp`                          | Apps Script append timestamp          |
| `status`                             | Currently written as `new`            |
| `source`                             | `package`, `trial`, or `contact`      |
| `name`, `email`, `phone`, `username` | Contact details; username is optional |
| `preferred_contact_method`           | WhatsApp, Telegram, Email, or SMS     |
| `company_name`, `service_area`       | Qualification context                 |
| `selected_package`                   | Optional for general contact requests |
| `best_contact_time`, `notes`         | Follow-up context                     |
| `consent_timestamp`                  | Consent record                        |

The Sheet is the operational lead record for this single-client build. Future admin/CRM fields and workflows can be added as additional columns or a separate adapter when that scope is approved.

## Provider Boundaries

- `LeadRepository` abstracts persistence. `GoogleSheetsLeadRepository` currently implements it through the Google Apps Script Web App.
- `LeadSubmissionService` orchestrates the use case and is unaware of framework routes or provider HTTP details.

This contract is the extension point for a CRM adapter, queue/outbox delivery, a future admin inbox, or a new storage provider.

## Analytics Events

The typed event names in `src/lib/analytics.ts` are wired into the application with a production-safe no-op default. Analytics fire only when `NEXT_PUBLIC_ANALYTICS_ENABLED=true` is set in the environment. No PII (name, email, phone, notes, etc.) is ever included in analytics payloads — `buildPrivacySafePayload` strips all known contact fields before tracking.

| Event                  | Intended trigger                    |
| ---------------------- | ----------------------------------- |
| `homepage_view`        | Home-page visit                     |
| `package_view`         | Package detail or pricing view      |
| `package_selected`     | Navigation to `/get-started`        |
| `form_started`         | Lead form gains focus               |
| `form_completed`       | Successful qualification submission |
| `free_trial_requested` | Trial request submitted             |
| `contact_submitted`    | General contact inquiry submitted   |

The `AnalyticsPageView` client component (rendered in `src/app/layout.tsx`) maps known routes to page-view events. The `submitLead` server action fires `form_completed`, `free_trial_requested`, and `contact_submitted` after a successful lead save. The `LeadForm` client component fires `form_started` on first focus. All calls are no-ops when analytics are disabled.

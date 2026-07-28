# API and Lead Pipeline

## Lead Submission

The public forms use the Next.js Server Action `submitLead` in `src/app/actions/submit-lead.ts`. There is intentionally no public REST endpoint in v1.

```text
Visitor form
  → browser validation and accessible feedback
  → Server Action same-origin verification
  → honeypot, timing, process-local rate-limit guard
  → Zod validation and normalization
  → Supabase `leads` insert through LeadRepository
  → Resend internal notification through LeadNotificationService
  → /thank-you redirect
```

The database insert is authoritative. Notification delivery is attempted afterwards; a temporary notification failure is logged but does not discard a saved lead.

## Health Check

`GET /api/health` is a cache-disabled, unauthenticated liveness endpoint intended for deployment checks and uptime monitoring. A healthy response is:

```json
{ "status": "ok" }
```

The endpoint verifies that the Next.js application can serve requests. It does not test Supabase or Resend connectivity; integration verification remains part of the controlled deployment smoke test.

## Configuration

| Variable                    | Scope       | Purpose                                                                                 |
| --------------------------- | ----------- | --------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_APP_URL`       | Public      | Canonical site URL for metadata                                                         |
| `SUPABASE_URL`              | Server only | Supabase project URL                                                                    |
| `SUPABASE_SERVICE_ROLE_KEY` | Server only | Service role for server-side lead inserts; never expose it in a `NEXT_PUBLIC_` variable |
| `RESEND_API_KEY`            | Server only | Resend API access                                                                       |
| `RESEND_FROM_EMAIL`         | Server only | Verified Resend sender                                                                  |
| `LEAD_NOTIFICATION_EMAIL`   | Server only | Internal receiving address                                                              |
| `TURNSTILE_SECRET_KEY`      | Server only | Reserved CAPTCHA integration seam                                                       |

## Lead Model

Migration: `supabase/migrations/202607280001_create_leads.sql`

### Initial operational fields

| Field                                | Notes                                                                  |
| ------------------------------------ | ---------------------------------------------------------------------- |
| `id`, `created_at`, `updated_at`     | UUID and timestamps                                                    |
| `status`                             | `new`, `reviewing`, `contacted`, `qualified`, `converted`, or `closed` |
| `source`                             | `package`, `trial`, or `contact`                                       |
| `name`, `email`, `phone`, `username` | Contact details; username is optional                                  |
| `preferred_contact_method`           | WhatsApp, Telegram, Email, or SMS                                      |
| `company_name`, `service_area`       | Qualification context                                                  |
| `selected_package`                   | Optional for general contact requests                                  |
| `best_contact_time`, `notes`         | Follow-up context                                                      |
| `consent_timestamp`                  | Consent record                                                         |

### Admin/CRM-ready fields

`assigned_to`, `lifecycle_stage`, `last_contacted_at`, and `conversion_value` exist now so a future authenticated inbox, filtering, exports, CRM sync, and sales reporting can be added without a data migration.

RLS is enabled and no policy grants public table access. The server action writes through the server-only Supabase service role.

## Provider Boundaries

- `LeadRepository` abstracts persistence. `SupabaseLeadRepository` currently implements it through Supabase PostgREST.
- `LeadNotificationService` abstracts notifications. `ResendLeadNotificationService` currently implements it through Resend’s API.
- `LeadSubmissionService` orchestrates the use case and is unaware of framework routes or provider HTTP details.

These contracts are the extension points for a CRM adapter, queue/outbox delivery, a future admin inbox, or a new provider.

## Analytics Events

The typed event names in `src/lib/analytics.ts` are reserved for a privacy-reviewed analytics integration. No PII is sent and no vendor script is enabled in this release.

| Event                  | Intended trigger                       |
| ---------------------- | -------------------------------------- |
| `homepage_view`        | Home-page visit                        |
| `package_view`         | Package detail or pricing view         |
| `package_selected`     | Appointment package selection          |
| `form_started`         | Qualification/contact form interaction |
| `form_completed`       | Successful qualification submission    |
| `free_trial_requested` | Trial request submitted                |
| `contact_submitted`    | General contact inquiry submitted      |

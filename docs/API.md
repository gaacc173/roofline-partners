# API and Lead Pipeline

## Lead Submission

The homepage uses the Next.js Server Action `submitLead` in `src/app/actions/submit-lead.ts`. There is intentionally no public REST submission endpoint.

```text
Homepage scheduling form
  → browser validation and accessible feedback
  → browser IANA timezone capture
  → same-origin verification
  → honeypot, timing, process-local rate-limit guard
  → Zod validation and normalization
  → Supabase `leads` insert through LeadRepository
  → Resend internal notification through LeadNotificationService
  → /thank-you redirect
```

The action accepts only a contact request. It rejects missing/mismatched origins, rate-limited requests, honeypot values, missing consent, malformed fields, invalid IANA timezones, and requests submitted in less than two seconds or more than 24 hours after the form was started.

The database insert is authoritative. Notification delivery is attempted afterwards; a temporary notification failure is logged but does not discard a saved lead.

When configured, the optional Google Sheets webhook receives the same contact request with `requested_contact_at` and `requested_contact_timezone` as separate fields. Its Apps Script receiver is in `google-apps-script/Code.gs`.

## Legacy Routes

`/packages`, `/get-started`, and `/contact` permanently redirect to the homepage scheduling section. They are not conversion surfaces and are not included in the sitemap.

## Health Check

`GET /api/health` is a cache-disabled, unauthenticated liveness endpoint. A healthy response is `{ "status": "ok" }`. It does not test Supabase or Resend connectivity.

## Lead Model

Migrations:

- `supabase/migrations/202607280001_create_leads.sql`
- `supabase/migrations/202607290002_meeting_first_leads.sql`

| Field                                | Notes                                         |
| ------------------------------------ | --------------------------------------------- |
| `id`, `created_at`, `updated_at`     | UUID and timestamps                           |
| `status`                             | Operational lifecycle status                  |
| `source`                             | Always `contact` in the meeting-first model   |
| `name`, `email`, `phone`, `username` | Contact details; username is optional         |
| `company_name`, `zip_code`           | Roofing company and optional target ZIP       |
| `requested_contact_at`               | Visitor-selected local `datetime-local` value |
| `requested_contact_timezone`         | Browser-detected IANA timezone                |
| `notes`                              | Visitor message                               |
| `consent_timestamp`                  | Consent record                                |

RLS is enabled and no public policy grants table access. The server action writes through the server-only Supabase service role.

## Analytics Events

The typed analytics seam contains only events relevant to the meeting-first flow. No vendor script or PII tracking is enabled.

| Event                   | Intended trigger                 |
| ----------------------- | -------------------------------- |
| `homepage_view`         | Homepage visit                   |
| `schedule_call_clicked` | Scheduling CTA interaction       |
| `form_started`          | Scheduling form interaction      |
| `form_completed`        | Successful scheduling submission |
| `contact_submitted`     | Contact request submitted        |

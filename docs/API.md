# API

## Overview

The Roofline Partners application uses Next.js App Router conventions. Currently the foundation provides pure utility functions; API routes and server actions are planned for Milestone 4.

## Environment Variables

### Required (Foundation)

| Variable               | Type   | Description                          |
| ---------------------- | ------ | ------------------------------------ |
| `NEXT_PUBLIC_APP_NAME` | string | Display name shown in the UI         |
| `NEXT_PUBLIC_APP_URL`  | string | Base URL of the deployed application |

### Optional (Future Integrations)

| Variable                        | Type   | Description                   |
| ------------------------------- | ------ | ----------------------------- |
| `SUPABASE_URL`                  | string | Supabase project URL          |
| `SUPABASE_ANON_KEY`             | string | Supabase anonymous/public key |
| `RESEND_API_KEY`                | string | Resend API key for email      |
| `NEXT_PUBLIC_ANALYTICS_ENABLED` | string | `"true"` or `"false"`         |

See `.env.example` for the full schema.

## Lead Data Model

### Supabase `leads` Table

**Initial schema (Milestone 4):**

```sql
CREATE TABLE leads (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  email         TEXT NOT NULL,
  phone         TEXT,
  message       TEXT NOT NULL,
  status        TEXT NOT NULL DEFAULT 'new',
  source        TEXT DEFAULT 'website',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE leads IS 'Incoming lead submissions from the website contact form.';
COMMENT ON COLUMN leads.status IS 'new | in_progress | contacted | converted | dismissed';
COMMENT ON COLUMN leads.source IS 'website | referral | social | other';
```

**Future fields (planned, not yet implemented):**

```sql
-- These columns may be added in later milestones:
-- service_interest  TEXT          -- Which service the lead is interested in
-- property_type     TEXT          -- residential | commercial
-- budget_range      TEXT          -- Client-provided budget
-- scheduled_date    TIMESTAMPTZ   -- Scheduled consultation date
-- notes             TEXT          -- Internal admin notes
-- assigned_to       UUID          -- FK to admin users table
```

### Lead Data Flow

```
1. User submits contact form
2. Client-side validation (React Hook Form, future)
3. Server Action receives form data
4. sanitiseLead() strips HTML, trims whitespace, lowercases email
5. isLeadValid() checks required fields and email format
6. Supabase INSERT into leads table
7. Resend sends notification email
8. Analytics event logged
```

## Server Actions (Planned)

```typescript
// src/app/actions/submit-lead.ts (future)
"use server";

import { sanitiseLead, isLeadValid, type LeadData } from "@/lib/lead-utils";
import { createClient } from "@supabase/supabase-js";

export async function submitLead(data: LeadData) {
  const cleaned = sanitiseLead(data);

  if (!isLeadValid(cleaned)) {
    return { error: "Invalid lead data" };
  }

  // Supabase INSERT — future implementation
  // const { error } = await supabase.from("leads").insert([cleaned]);
  // if (error) return { error: "Failed to submit" };

  // Resend email — future implementation
  // await resend.emails.send({ ... });

  return { success: true };
}
```

## API Routes (Planned)

Reserved paths for future API endpoints:

| Method | Path          | Description                                 |
| ------ | ------------- | ------------------------------------------- |
| POST   | `/api/leads`  | Submit a new lead (server action preferred) |
| GET    | `/api/health` | Health check endpoint                       |

## Analytics Events

| Event                  | Trigger                  | Data             |
| ---------------------- | ------------------------ | ---------------- |
| `homepage_view`        | Homepage load            | `{ path }`       |
| `package_view`         | Package page viewed      | `{ package_id }` |
| `package_selected`     | User selects a package   | `{ package_id }` |
| `form_started`         | User begins form         | `{ form_id }`    |
| `form_completed`       | User completes form      | `{ form_id }`    |
| `free_trial_requested` | User requests free trial | `{ source }`     |
| `contact_submitted`    | Contact form submitted   | `{ source }`     |

Events are defined as typed constants in `src/lib/analytics.ts`. No vendor integration is implemented yet; this interface is reserved for Milestone 5.

Events are logged to the analytics provider (future) and may be stored in a separate `analytics_events` table.

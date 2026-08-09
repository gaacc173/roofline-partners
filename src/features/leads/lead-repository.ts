import type { StoredLead } from "./lead-schema";

export interface LeadRepository {
  create(lead: StoredLead): Promise<{ id: string }>;
}

interface SupabaseLeadResponse {
  id: string;
}

export class SupabaseLeadRepository implements LeadRepository {
  constructor(
    private readonly url: string,
    private readonly serviceRoleKey: string,
  ) {}

  async create(lead: StoredLead): Promise<{ id: string }> {
    const response = await fetch(`${this.url}/rest/v1/leads`, {
      method: "POST",
      headers: {
        apikey: this.serviceRoleKey,
        Authorization: `Bearer ${this.serviceRoleKey}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        status: "new",
        source: lead.source,
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        username: lead.username ?? null,
        company_name: lead.companyName,
        zip_code: lead.zipCode ?? null,
        requested_contact_at: lead.requestedContactAt,
        requested_contact_timezone: lead.requestedContactTimezone,
        notes: lead.notes,
        consent_timestamp: lead.consentTimestamp,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Lead storage failed.");
    }

    const data = (await response.json()) as SupabaseLeadResponse[];
    const created = data[0];
    if (!created?.id) {
      throw new Error("Lead storage returned an invalid response.");
    }

    return { id: created.id };
  }
}

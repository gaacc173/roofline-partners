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
        preferred_contact_method: lead.preferredContactMethod,
        company_name: lead.companyName,
        service_area: lead.serviceArea,
        selected_package: lead.selectedPackage ?? null,
        best_contact_time: lead.bestContactTime,
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

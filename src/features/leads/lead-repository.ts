import type { StoredLead } from "./lead-schema";

export interface LeadRepository {
  create(lead: StoredLead): Promise<{ id: string }>;
}

interface SheetsWebhookResponse {
  ok?: boolean;
  id?: string;
}

export class GoogleSheetsLeadRepository implements LeadRepository {
  constructor(private readonly webhookUrl: string) {}

  async create(lead: StoredLead): Promise<{ id: string }> {
    const response = await fetch(this.webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: "new",
        source: lead.source,
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        username: lead.username ?? "",
        company_name: lead.companyName,
        zip_code: lead.zipCode ?? "",
        requested_contact_at: lead.requestedContactAt,
        requested_contact_timezone: lead.requestedContactTimezone,
        notes: lead.notes,
        consent_timestamp: lead.consentTimestamp,
      }),
      cache: "no-store",
    });

    if (!response.ok) throw new Error("Lead storage failed.");

    const data = (await response.json()) as SheetsWebhookResponse;
    if (!data.ok) throw new Error("Lead storage returned an invalid response.");

    return { id: data.id ?? lead.consentTimestamp };
  }
}

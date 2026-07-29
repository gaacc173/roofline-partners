import type { StoredLead } from "./lead-schema";

export interface LeadRepository {
  create(lead: StoredLead): Promise<{ id: string }>;
}

interface SheetsWebhookResponse {
  ok?: boolean;
  id?: string;
  error?: string;
}

/**
 * Sends a lead to a Google Apps Script Web App bound to a Google Sheet.
 * The Web App appends a row and returns { ok: true, id }.
 * See docs/SETUP.md for the Apps Script deployment steps.
 */
export class GoogleSheetsLeadRepository implements LeadRepository {
  constructor(private readonly webhookUrl: string) {}

  async create(lead: StoredLead): Promise<{ id: string }> {
    const response = await fetch(this.webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "new",
        source: lead.source,
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        username: lead.username ?? "",
        preferred_contact_method: lead.preferredContactMethod,
        company_name: lead.companyName,
        service_area: lead.serviceArea,
        selected_package: lead.selectedPackage ?? "",
        best_contact_time: lead.bestContactTime,
        notes: lead.notes,
        consent_timestamp: lead.consentTimestamp,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Lead storage failed.");
    }

    const data = (await response.json()) as SheetsWebhookResponse;
    if (!data.ok) {
      throw new Error("Lead storage returned an invalid response.");
    }

    return { id: data.id ?? lead.consentTimestamp };
  }
}

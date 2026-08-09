import type { StoredLead } from "./lead-schema";

export interface LeadNotificationService {
  notifyNewLead(lead: StoredLead): Promise<void>;
}

export class GoogleSheetsLeadNotificationService implements LeadNotificationService {
  constructor(
    private readonly webhookUrl: string,
    private readonly webhookSecret: string,
  ) {}

  async notifyNewLead(lead: StoredLead): Promise<void> {
    const response = await fetch(this.webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        webhook_secret: this.webhookSecret,
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

    if (!response.ok) throw new Error("Google Sheets notification failed.");
  }
}

export class FanOutLeadNotificationService implements LeadNotificationService {
  constructor(private readonly services: LeadNotificationService[]) {}

  async notifyNewLead(lead: StoredLead): Promise<void> {
    await Promise.all(
      this.services.map(async (service) => {
        try {
          await service.notifyNewLead(lead);
        } catch (error) {
          console.error("Lead notification failed after storage.", { error });
        }
      }),
    );
  }
}

export class ResendLeadNotificationService implements LeadNotificationService {
  constructor(
    private readonly apiKey: string,
    private readonly from: string,
    private readonly recipient: string,
  ) {}

  async notifyNewLead(lead: StoredLead): Promise<void> {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: this.from,
        to: [this.recipient],
        subject: "New LeadbyLead scheduling request",
        text: formatLeadNotification(lead),
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Lead notification failed.");
    }
  }
}

function formatLeadNotification(lead: StoredLead): string {
  return [
    "A new LeadbyLead scheduling request was submitted.",
    "",
    `Source: ${lead.source}`,
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    `Phone: ${lead.phone}`,
    `Username: ${lead.username ?? "Not supplied"}`,
    `Company: ${lead.companyName}`,
    `ZIP code: ${lead.zipCode ?? "Not supplied"}`,
    `Requested call: ${lead.requestedContactAt}`,
    `Visitor timezone: ${lead.requestedContactTimezone}`,
    `Notes: ${lead.notes}`,
  ].join("\n");
}

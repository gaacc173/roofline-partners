import type { StoredLead } from "./lead-schema";

export interface LeadNotificationService {
  notifyNewLead(lead: StoredLead): Promise<void>;
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
        subject: "New Roofline Partners qualification request",
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
    "A new qualification request was submitted.",
    "",
    `Source: ${lead.source}`,
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    `Phone: ${lead.phone}`,
    `Username: ${lead.username ?? "Not supplied"}`,
    `Preferred contact: ${lead.preferredContactMethod}`,
    `Company: ${lead.companyName}`,
    `Service area: ${lead.serviceArea}`,
    `Selected package: ${lead.selectedPackage ?? "Contact inquiry"}`,
    `Best contact time: ${lead.bestContactTime}`,
    `Notes: ${lead.notes}`,
  ].join("\n");
}

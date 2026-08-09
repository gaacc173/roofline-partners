import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  GoogleSheetsLeadNotificationService,
  ResendLeadNotificationService,
} from "./notification-service";
import type { StoredLead } from "./lead-schema";

const lead: StoredLead = {
  source: "contact",
  name: "Jordan Rivera",
  email: "jordan@example.com",
  phone: "+1 555 555 0199",
  companyName: "Rivera Roofing",
  requestedContactAt: "2026-08-15T14:00",
  requestedContactTimezone: "America/Los_Angeles",
  notes: "Interested in discussing storm repair opportunities.",
  consentTimestamp: "2026-07-29T12:00:00.000Z",
};

describe("ResendLeadNotificationService", () => {
  beforeEach(() => vi.restoreAllMocks());

  it("sends a plain-text scheduling notification without provider secrets", async () => {
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(new Response("{}", { status: 200 }));
    const service = new ResendLeadNotificationService(
      "resend-secret",
      "LeadbyLead <leads@example.com>",
      "owner@example.com",
    );

    await expect(service.notifyNewLead(lead)).resolves.toBeUndefined();
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.resend.com/emails",
      expect.objectContaining({
        method: "POST",
        cache: "no-store",
        headers: expect.objectContaining({ Authorization: "Bearer resend-secret" }),
      }),
    );
    const request = fetchMock.mock.calls[0]?.[1];
    const body = JSON.parse(String(request?.body));
    expect(body.text).toContain("America/Los_Angeles");
    expect(body.text).not.toContain("package");
    expect(body.text).not.toContain("resend-secret");
  });

  it("rejects a failed notification response", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("failed", { status: 500 }));
    const service = new ResendLeadNotificationService(
      "resend-secret",
      "from@example.com",
      "to@example.com",
    );

    await expect(service.notifyNewLead(lead)).rejects.toThrow("Lead notification failed.");
  });

  it("sends separate local date/time and IANA timezone columns to Google Sheets", async () => {
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(new Response("{}", { status: 200 }));
    const service = new GoogleSheetsLeadNotificationService(
      "https://script.example.test",
      "sheet-secret",
    );

    await expect(service.notifyNewLead(lead)).resolves.toBeUndefined();
    const request = fetchMock.mock.calls[0]?.[1];
    expect(JSON.parse(String(request?.body))).toMatchObject({
      webhook_secret: "sheet-secret",
      requested_contact_at: "2026-08-15T14:00",
      requested_contact_timezone: "America/Los_Angeles",
    });
    expect(JSON.stringify(request?.body)).not.toContain("selected_package");
  });
});

import { beforeEach, describe, expect, it, vi } from "vitest";
import { ResendLeadNotificationService } from "./notification-service";
import type { StoredLead } from "./lead-schema";

const lead: StoredLead = {
  source: "trial",
  name: "Jordan Rivera",
  email: "jordan@example.com",
  phone: "+1 555 555 0199",
  preferredContactMethod: "email",
  companyName: "Rivera Roofing",
  serviceArea: "Austin, TX",
  bestContactTime: "Weekday afternoons",
  notes: "Interested in suburban replacement work.",
  consentTimestamp: "2026-07-29T12:00:00.000Z",
};

describe("ResendLeadNotificationService", () => {
  beforeEach(() => vi.restoreAllMocks());

  it("sends a plain-text internal notification without exposing provider secrets", async () => {
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(new Response("{}", { status: 200 }));
    const service = new ResendLeadNotificationService(
      "resend-secret",
      "Roofline Partners <leads@example.com>",
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
    expect(body).toMatchObject({
      from: "Roofline Partners <leads@example.com>",
      to: ["owner@example.com"],
      subject: "New Roofline Partners qualification request",
    });
    expect(body.text).toContain("jordan@example.com");
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
});

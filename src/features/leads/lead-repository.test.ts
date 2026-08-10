import { beforeEach, describe, expect, it, vi } from "vitest";
import { GoogleSheetsLeadRepository } from "./lead-repository";
import type { StoredLead } from "./lead-schema";

const lead: StoredLead = {
  source: "contact",
  name: "Jordan Rivera",
  email: "jordan@example.com",
  phone: "+1 555 555 0199",
  companyName: "Rivera Roofing",
  zipCode: "90210",
  requestedContactAt: "2026-08-15T14:00",
  requestedContactTimezone: "America/Los_Angeles",
  notes: "PRODUCTION TEST ONLY - verify Google Sheets lead capture.",
  consentTimestamp: "2026-07-29T12:00:00.000Z",
};

describe("GoogleSheetsLeadRepository", () => {
  beforeEach(() => vi.restoreAllMocks());

  it("posts the meeting-first lead to the configured webhook", async () => {
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(new Response(JSON.stringify({ ok: true, id: "row-5" }), { status: 200 }));
    const repository = new GoogleSheetsLeadRepository(
      "https://script.google.com/macros/s/xyz/exec",
    );

    await expect(repository.create(lead)).resolves.toEqual({ id: "row-5" });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://script.google.com/macros/s/xyz/exec",
      expect.objectContaining({ method: "POST", cache: "no-store" }),
    );
    const body = JSON.parse(String(fetchMock.mock.calls[0]?.[1]?.body));
    expect(body).toMatchObject({
      status: "new",
      source: "contact",
      company_name: "Rivera Roofing",
      zip_code: "90210",
      requested_contact_at: "2026-08-15T14:00",
      requested_contact_timezone: "America/Los_Angeles",
    });
    expect(JSON.stringify(body)).not.toContain("selected_package");
  });

  it("rejects provider errors and invalid success responses", async () => {
    const repository = new GoogleSheetsLeadRepository(
      "https://script.google.com/macros/s/xyz/exec",
    );
    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("failed", { status: 500 }));
    await expect(repository.create(lead)).rejects.toThrow("Lead storage failed.");

    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ ok: false }), { status: 200 }),
    );
    await expect(repository.create(lead)).rejects.toThrow(
      "Lead storage returned an invalid response.",
    );
  });
});

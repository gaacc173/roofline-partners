import { beforeEach, describe, expect, it, vi } from "vitest";
import { GoogleSheetsLeadRepository } from "./lead-repository";
import type { StoredLead } from "./lead-schema";

const lead: StoredLead = {
  source: "package",
  name: "Jordan Rivera",
  email: "jordan@example.com",
  phone: "+1 555 555 0199",
  preferredContactMethod: "email",
  companyName: "Rivera Roofing",
  serviceArea: "Austin, TX",
  selectedPackage: "growth-20",
  bestContactTime: "Weekday afternoons",
  notes: "Interested in suburban replacement work.",
  consentTimestamp: "2026-07-29T12:00:00.000Z",
};

describe("GoogleSheetsLeadRepository", () => {
  beforeEach(() => vi.restoreAllMocks());

  it("posts the lead to the configured webhook URL", async () => {
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
    const request = fetchMock.mock.calls[0]?.[1];
    expect(JSON.parse(String(request?.body))).toMatchObject({
      status: "new",
      source: "package",
      preferred_contact_method: "email",
      selected_package: "growth-20",
    });
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

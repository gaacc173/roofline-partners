import { beforeEach, describe, expect, it, vi } from "vitest";
import { SupabaseLeadRepository } from "./lead-repository";
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
  notes: "Interested in discussing storm repair opportunities.",
  consentTimestamp: "2026-07-29T12:00:00.000Z",
};

describe("SupabaseLeadRepository", () => {
  beforeEach(() => vi.restoreAllMocks());

  it("posts the scheduling request with server-only authorization", async () => {
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(new Response(JSON.stringify([{ id: "lead-123" }]), { status: 201 }));
    const repository = new SupabaseLeadRepository("https://project.supabase.co", "service-secret");

    await expect(repository.create(lead)).resolves.toEqual({ id: "lead-123" });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://project.supabase.co/rest/v1/leads",
      expect.objectContaining({
        method: "POST",
        cache: "no-store",
        headers: expect.objectContaining({
          apikey: "service-secret",
          Authorization: "Bearer service-secret",
          Prefer: "return=representation",
        }),
      }),
    );
    const request = fetchMock.mock.calls[0]?.[1];
    expect(JSON.parse(String(request?.body))).toMatchObject({
      status: "new",
      source: "contact",
      zip_code: "90210",
      requested_contact_at: "2026-08-15T14:00",
      requested_contact_timezone: "America/Los_Angeles",
    });
    expect(JSON.stringify(request?.body)).not.toContain("selected_package");
  });

  it("maps absent optional values to null", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify([{ id: "lead-789" }]), { status: 201 }),
    );
    const repository = new SupabaseLeadRepository("https://project.supabase.co", "service-secret");

    await repository.create({ ...lead, username: undefined, zipCode: undefined });
    const request = vi.mocked(globalThis.fetch).mock.calls[0]?.[1];
    expect(JSON.parse(String(request?.body))).toMatchObject({ username: null, zip_code: null });
  });

  it("rejects provider errors and invalid success responses", async () => {
    const repository = new SupabaseLeadRepository("https://project.supabase.co", "service-secret");
    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("failed", { status: 500 }));
    await expect(repository.create(lead)).rejects.toThrow("Lead storage failed.");

    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("[]", { status: 201 }));
    await expect(repository.create(lead)).rejects.toThrow(
      "Lead storage returned an invalid response.",
    );
  });
});

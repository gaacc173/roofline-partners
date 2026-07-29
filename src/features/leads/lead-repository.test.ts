import { beforeEach, describe, expect, it, vi } from "vitest";
import { SupabaseLeadRepository } from "./lead-repository";
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

describe("SupabaseLeadRepository", () => {
  beforeEach(() => vi.restoreAllMocks());

  it("posts a server-shaped lead with service-role authorization", async () => {
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
      source: "package",
      preferred_contact_method: "email",
      selected_package: "growth-20",
    });
  });

  it("maps absent optional values to null", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify([{ id: "lead-789" }]), { status: 201 }),
    );
    const repository = new SupabaseLeadRepository("https://project.supabase.co", "service-secret");

    await repository.create({ ...lead, username: undefined, selectedPackage: undefined });
    const request = vi.mocked(globalThis.fetch).mock.calls[0]?.[1];
    expect(JSON.parse(String(request?.body))).toMatchObject({
      username: null,
      selected_package: null,
    });
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

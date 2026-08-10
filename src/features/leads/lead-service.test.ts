import { describe, expect, it, vi } from "vitest";
import { leadSubmissionSchema } from "./lead-schema";
import { LeadSubmissionService } from "./lead-service";

function makeSubmission() {
  return leadSubmissionSchema.parse({
    name: "Jordan Rivera",
    email: "jordan@example.com",
    phone: "+1 555 555 0199",
    companyName: "Rivera Roofing",
    zipCode: "90210",
    requestedContactAt: "2026-08-15T14:00",
    requestedContactTimezone: "America/Los_Angeles",
    notes: "Interested in discussing storm repair opportunities.",
    consent: true,
    website: "",
    formStartedAt: String(Date.now() - 5_000),
  });
}

describe("LeadSubmissionService", () => {
  it("stores before notifying and returns the stored id", async () => {
    const repository = { create: vi.fn().mockResolvedValue({ id: "lead-123" }) };
    const service = new LeadSubmissionService(repository);

    await expect(service.submit(makeSubmission())).resolves.toEqual({ id: "lead-123" });
  });

  it("keeps the stored lead successful when notification fails", async () => {
    const repository = { create: vi.fn().mockResolvedValue({ id: "lead-456" }) };
    const service = new LeadSubmissionService(repository);

    await expect(service.submit(makeSubmission())).resolves.toEqual({ id: "lead-456" });
  });

  it("does not notify when storage fails", async () => {
    const repository = { create: vi.fn().mockRejectedValue(new Error("Supabase unavailable")) };
    const service = new LeadSubmissionService(repository);

    await expect(service.submit(makeSubmission())).rejects.toThrow("Supabase unavailable");
  });
});

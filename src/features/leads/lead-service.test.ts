import { describe, expect, it, vi } from "vitest";
import { leadSubmissionSchema } from "./lead-schema";
import { LeadSubmissionService } from "./lead-service";

function makeSubmission() {
  return leadSubmissionSchema.parse({
    name: "Jordan Rivera",
    email: "jordan@example.com",
    phone: "+1 555 555 0199",
    preferredContactMethod: "email",
    companyName: "Rivera Roofing",
    serviceArea: "Austin, TX",
    selectedPackage: "growth-20",
    bestContactTime: "Weekday afternoons",
    notes: "Interested in suburban replacement work.",
    consent: true,
    website: "",
    formStartedAt: String(Date.now() - 5_000),
  });
}

describe("LeadSubmissionService", () => {
  it("stores the lead and returns the stored id", async () => {
    const repository = { create: vi.fn().mockResolvedValue({ id: "lead-123" }) };
    const service = new LeadSubmissionService(repository);

    await expect(service.submit(makeSubmission(), "package")).resolves.toEqual({ id: "lead-123" });
    expect(repository.create).toHaveBeenCalledOnce();
  });

  it("propagates storage errors", async () => {
    const repository = {
      create: vi.fn().mockRejectedValue(new Error("Sheets webhook unavailable")),
    };
    const service = new LeadSubmissionService(repository);

    await expect(service.submit(makeSubmission(), "package")).rejects.toThrow(
      "Sheets webhook unavailable",
    );
  });
});

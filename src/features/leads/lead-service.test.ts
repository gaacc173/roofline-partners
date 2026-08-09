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
    const notifier = { notifyNewLead: vi.fn().mockResolvedValue(undefined) };
    const service = new LeadSubmissionService(repository, notifier);

    await expect(service.submit(makeSubmission())).resolves.toEqual({ id: "lead-123" });
    expect(notifier.notifyNewLead).toHaveBeenCalledWith(repository.create.mock.calls[0][0]);
  });

  it("keeps the stored lead successful when notification fails", async () => {
    const repository = { create: vi.fn().mockResolvedValue({ id: "lead-456" }) };
    const notifier = { notifyNewLead: vi.fn().mockRejectedValue(new Error("Resend unavailable")) };
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);
    const service = new LeadSubmissionService(repository, notifier);

    await expect(service.submit(makeSubmission())).resolves.toEqual({ id: "lead-456" });
    expect(errorSpy).toHaveBeenCalledWith(
      "Lead notification failed after storage.",
      expect.objectContaining({ leadId: "lead-456" }),
    );
    errorSpy.mockRestore();
  });

  it("does not notify when storage fails", async () => {
    const repository = { create: vi.fn().mockRejectedValue(new Error("Supabase unavailable")) };
    const notifier = { notifyNewLead: vi.fn() };
    const service = new LeadSubmissionService(repository, notifier);

    await expect(service.submit(makeSubmission())).rejects.toThrow("Supabase unavailable");
    expect(notifier.notifyNewLead).not.toHaveBeenCalled();
  });
});

import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  requestHeaders: new Headers(),
  isRateLimited: vi.fn(() => false),
  getLeadIntegrationConfig: vi.fn(() => ({
    googleSheetsWebhookUrl: "https://script.google.com/macros/s/xyz/exec",
  })),
  submit: vi.fn().mockResolvedValue({ id: "row-123" }),
  redirect: vi.fn((destination: string): never => {
    throw new Error(`REDIRECT:${destination}`);
  }),
}));

vi.mock("next/headers", () => ({ headers: vi.fn(async () => mocks.requestHeaders) }));
vi.mock("next/navigation", () => ({ redirect: mocks.redirect }));
vi.mock("@/features/leads/rate-limit", () => ({ isRateLimited: mocks.isRateLimited }));
vi.mock("@/lib/env", () => ({ getLeadIntegrationConfig: mocks.getLeadIntegrationConfig }));
vi.mock("@/features/leads/lead-service", () => ({
  LeadSubmissionService: class {
    submit = mocks.submit;
  },
}));
vi.mock("@/features/leads/lead-repository", () => ({
  GoogleSheetsLeadRepository: class {
    constructor(public readonly url: string) {}
  },
}));

import { submitLead } from "./submit-lead";

function validForm(overrides: Record<string, string> = {}): FormData {
  const formData = new FormData();
  const values = {
    name: "Jordan Rivera",
    email: "jordan@example.com",
    phone: "+1 555 555 0199",
    username: "",
    companyName: "Rivera Roofing",
    zipCode: "90210",
    requestedContactAt: "2026-08-15T14:00",
    requestedContactTimezone: "America/Los_Angeles",
    notes: "PRODUCTION TEST ONLY - verify Google Sheets lead capture.",
    consent: "on",
    website: "",
    formStartedAt: String(Date.now() - 5_000),
    ...overrides,
  };
  for (const [key, value] of Object.entries(values)) formData.set(key, value);
  return formData;
}

describe("submitLead Sheets recovery path", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.requestHeaders = new Headers({
      origin: "https://leadbylead.example",
      host: "leadbylead.example",
      "x-forwarded-for": "203.0.113.10, 10.0.0.1",
    });
    mocks.isRateLimited.mockReturnValue(false);
    mocks.submit.mockResolvedValue({ id: "row-123" });
  });

  it("uses only the configured Sheets repository and redirects after storage", async () => {
    await expect(submitLead({}, validForm())).rejects.toThrow("REDIRECT:/thank-you");
    expect(mocks.getLeadIntegrationConfig).toHaveBeenCalledOnce();
    expect(mocks.submit).toHaveBeenCalledWith(
      expect.objectContaining({
        companyName: "Rivera Roofing",
        requestedContactTimezone: "America/Los_Angeles",
      }),
    );
  });

  it("returns a safe error when Sheets storage fails", async () => {
    mocks.submit.mockRejectedValueOnce(new Error("Sheets unavailable"));
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);

    await expect(submitLead({}, validForm())).resolves.toEqual({
      error:
        "We could not submit your request right now. Please try again shortly or contact us directly.",
    });
    expect(errorSpy).toHaveBeenCalledWith("Lead submission failed.", expect.any(Error));
    errorSpy.mockRestore();
  });
});

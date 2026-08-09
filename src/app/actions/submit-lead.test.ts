import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  requestHeaders: new Headers(),
  isRateLimited: vi.fn(() => false),
  getLeadIntegrationConfig: vi.fn(() => ({
    supabaseUrl: "https://project.supabase.co",
    supabaseServiceRoleKey: "supabase-secret",
    resendApiKey: "resend-secret",
    resendFromEmail: "from@example.com",
    notificationEmail: "owner@example.com",
  })),
  submit: vi.fn().mockResolvedValue({ id: "lead-123" }),
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
vi.mock("@/features/leads/lead-repository", () => ({ SupabaseLeadRepository: class {} }));
vi.mock("@/features/leads/notification-service", () => ({
  FanOutLeadNotificationService: class {},
  GoogleSheetsLeadNotificationService: class {},
  ResendLeadNotificationService: class {},
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
    notes: "Interested in discussing storm repair opportunities.",
    consent: "on",
    website: "",
    formStartedAt: String(Date.now() - 5_000),
    ...overrides,
  };
  for (const [key, value] of Object.entries(values)) formData.set(key, value);
  return formData;
}

describe("submitLead", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.requestHeaders = new Headers({
      origin: "https://leadbylead.example",
      host: "leadbylead.example",
      "x-forwarded-for": "203.0.113.10, 10.0.0.1",
    });
    mocks.isRateLimited.mockReturnValue(false);
    mocks.submit.mockResolvedValue({ id: "lead-123" });
  });

  it("rejects requests from a missing or mismatched origin before rate limiting", async () => {
    mocks.requestHeaders = new Headers({
      origin: "https://attacker.example",
      host: "leadbylead.example",
    });
    await expect(submitLead({}, validForm())).resolves.toEqual({
      error: "We could not verify this request. Please refresh the page and try again.",
    });
    expect(mocks.isRateLimited).not.toHaveBeenCalled();
    expect(mocks.submit).not.toHaveBeenCalled();
  });

  it("rejects rate-limited and malformed requests before provider setup", async () => {
    mocks.isRateLimited.mockReturnValueOnce(true);
    await expect(submitLead({}, validForm())).resolves.toMatchObject({
      error: "Too many requests. Please wait a few minutes and try again.",
    });
    await expect(submitLead({}, validForm({ website: "spam" }))).resolves.toMatchObject({
      error: "Please correct the highlighted fields.",
    });
    expect(mocks.getLeadIntegrationConfig).not.toHaveBeenCalled();
  });

  it("uses the first forwarded address, submits, and redirects after success", async () => {
    await expect(submitLead({}, validForm())).rejects.toThrow("REDIRECT:/thank-you");
    expect(mocks.isRateLimited).toHaveBeenCalledWith("203.0.113.10");
    expect(mocks.submit).toHaveBeenCalledWith(
      expect.objectContaining({ requestedContactTimezone: "America/Los_Angeles" }),
    );
  });

  it("returns a safe error when the integration service fails", async () => {
    mocks.submit.mockRejectedValueOnce(new Error("provider failure"));
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);
    await expect(submitLead({}, validForm())).resolves.toEqual({
      error:
        "We could not submit your request right now. Please try again shortly or contact us directly.",
    });
    expect(mocks.redirect).not.toHaveBeenCalled();
    errorSpy.mockRestore();
  });
});

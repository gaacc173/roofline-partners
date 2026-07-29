import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  requestHeaders: new Headers(),
  isRateLimited: vi.fn(() => false),
  validateEnv: vi.fn(() => ({
    NEXT_PUBLIC_APP_NAME: "Roofline Partners",
    NEXT_PUBLIC_APP_URL: "http://localhost:3000",
    NEXT_PUBLIC_ANALYTICS_ENABLED: undefined,
  })),
  getLeadIntegrationConfig: vi.fn(() => ({
    googleSheetsWebhookUrl: "https://script.google.com/macros/s/xyz/exec",
  })),
  submit: vi.fn().mockResolvedValue({ id: "lead-123" }),
  redirect: vi.fn((destination: string): never => {
    throw new Error(`REDIRECT:${destination}`);
  }),
}));

vi.mock("next/headers", () => ({
  headers: vi.fn(async () => mocks.requestHeaders),
}));
vi.mock("next/navigation", () => ({ redirect: mocks.redirect }));
vi.mock("@/features/leads/rate-limit", () => ({ isRateLimited: mocks.isRateLimited }));
vi.mock("@/lib/env", () => ({
  getLeadIntegrationConfig: mocks.getLeadIntegrationConfig,
  validateEnv: mocks.validateEnv,
}));
vi.mock("@/features/leads/lead-service", () => ({
  LeadSubmissionService: class {
    submit = mocks.submit;
  },
}));
vi.mock("@/features/leads/lead-repository", () => ({
  GoogleSheetsLeadRepository: class {},
}));

import { submitLead } from "./submit-lead";

function validForm(overrides: Record<string, string> = {}): FormData {
  const formData = new FormData();
  const values = {
    source: "package",
    selectedPackage: "growth-20",
    name: "Jordan Rivera",
    email: "jordan@example.com",
    phone: "+1 555 555 0199",
    username: "",
    preferredContactMethod: "email",
    companyName: "Rivera Roofing",
    serviceArea: "Austin, TX",
    bestContactTime: "Weekday afternoons",
    notes: "Interested in suburban replacement work.",
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
      origin: "https://roofline.example",
      host: "roofline.example",
      "x-forwarded-for": "203.0.113.10, 10.0.0.1",
    });
    mocks.isRateLimited.mockReturnValue(false);
    mocks.submit.mockResolvedValue({ id: "lead-123" });
  });

  it("rejects requests from a missing or mismatched origin before rate limiting", async () => {
    mocks.requestHeaders = new Headers({
      origin: "https://attacker.example",
      host: "roofline.example",
    });

    await expect(submitLead({}, validForm())).resolves.toEqual({
      error: "We could not verify this request. Please refresh the page and try again.",
    });
    expect(mocks.isRateLimited).not.toHaveBeenCalled();
    expect(mocks.submit).not.toHaveBeenCalled();
  });

  it("rejects invalid source, rate-limited requests, and forged package combinations", async () => {
    await expect(submitLead({}, validForm({ source: "invalid" }))).resolves.toMatchObject({
      error: "Choose a valid request type and try again.",
    });

    mocks.isRateLimited.mockReturnValueOnce(true);
    await expect(submitLead({}, validForm())).resolves.toMatchObject({
      error: "Too many requests. Please wait a few minutes and try again.",
    });

    await expect(submitLead({}, validForm({ source: "trial" }))).resolves.toMatchObject({
      error: "Choose a valid package before submitting your request.",
    });
    expect(mocks.submit).not.toHaveBeenCalled();
  });

  it("rejects honeypot, consent, and timing failures before provider setup", async () => {
    await expect(submitLead({}, validForm({ website: "spam" }))).resolves.toMatchObject({
      error: "Please correct the highlighted fields.",
    });
    await expect(submitLead({}, validForm({ consent: "off" }))).resolves.toMatchObject({
      error: "Please correct the highlighted fields.",
    });
    await expect(
      submitLead({}, validForm({ formStartedAt: String(Date.now() - 500) })),
    ).resolves.toEqual({
      error: "Please take a moment to review your request before submitting.",
    });
    expect(mocks.getLeadIntegrationConfig).not.toHaveBeenCalled();
    expect(mocks.submit).not.toHaveBeenCalled();
  });

  it("uses the first forwarded address, submits, and redirects after success", async () => {
    await expect(submitLead({}, validForm())).rejects.toThrow("REDIRECT:/thank-you?source=package");

    expect(mocks.isRateLimited).toHaveBeenCalledWith("203.0.113.10");
    expect(mocks.getLeadIntegrationConfig).toHaveBeenCalledOnce();
    expect(mocks.submit).toHaveBeenCalledWith(
      expect.objectContaining({ email: "jordan@example.com", selectedPackage: "growth-20" }),
      "package",
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
    expect(errorSpy).toHaveBeenCalledWith("Lead submission failed.", expect.any(Error));
    errorSpy.mockRestore();
  });
});

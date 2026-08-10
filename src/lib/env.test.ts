import { afterEach, describe, expect, it } from "vitest";
import { getLeadIntegrationConfig } from "./env";

describe("getLeadIntegrationConfig", () => {
  const original = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  afterEach(() => {
    if (original === undefined) delete process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    else process.env.GOOGLE_SHEETS_WEBHOOK_URL = original;
  });

  it("requires only the Google Sheets webhook URL", () => {
    process.env.GOOGLE_SHEETS_WEBHOOK_URL = "https://script.google.com/macros/s/xyz/exec";
    delete process.env.SUPABASE_URL;
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;
    delete process.env.RESEND_API_KEY;
    delete process.env.RESEND_FROM_EMAIL;
    delete process.env.LEAD_NOTIFICATION_EMAIL;

    expect(getLeadIntegrationConfig()).toEqual({
      googleSheetsWebhookUrl: "https://script.google.com/macros/s/xyz/exec",
    });
  });
});

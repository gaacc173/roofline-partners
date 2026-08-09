/**
 * Typed environment variable validation with safe defaults.
 *
 * Public site values resolve safely in every environment. Deployment
 * configuration is checked by `validateProductionEnvironment()` before a
 * production release; optional integrations are validated when enabled.
 *
 * Public-facing variables always resolve to a non-empty string so the
 * application never crashes locally when deployment integrations are absent.
 */

export interface EnvSchema {
  /** Display name shown in the UI */
  NEXT_PUBLIC_APP_NAME: string;
  /** Base URL of the deployed application */
  NEXT_PUBLIC_APP_URL: string;
  /** Supabase project URL — required once Supabase is integrated */
  SUPABASE_URL?: string;
  /** Supabase service role key — server-only, required for lead storage */
  SUPABASE_SERVICE_ROLE_KEY?: string;
  /** Resend API key — required once email is integrated */
  RESEND_API_KEY?: string;
  RESEND_FROM_EMAIL?: string;
  LEAD_NOTIFICATION_EMAIL?: string;
  GOOGLE_SHEETS_WEBHOOK_URL?: string;
  GOOGLE_SHEETS_WEBHOOK_SECRET?: string;
  TURNSTILE_SECRET_KEY?: string;
  /** Feature flag for analytics */
  NEXT_PUBLIC_ANALYTICS_ENABLED?: string;
}

const defaults: EnvSchema = {
  NEXT_PUBLIC_APP_NAME: "LeadbyLead",
  NEXT_PUBLIC_APP_URL: "http://localhost:3000",
};

/**
 * Validate and resolve environment variables, falling back to safe
 * defaults so the app never crashes locally when deployment integrations
 * or placeholders are absent.
 */
export function validateEnv(): EnvSchema {
  const vars: EnvSchema = {
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || defaults.NEXT_PUBLIC_APP_NAME,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || defaults.NEXT_PUBLIC_APP_URL,
  };

  // Optional integrations — read without throwing
  if (process.env.SUPABASE_URL) vars.SUPABASE_URL = process.env.SUPABASE_URL;
  if (process.env.SUPABASE_SERVICE_ROLE_KEY)
    vars.SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (process.env.RESEND_API_KEY) vars.RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (process.env.RESEND_FROM_EMAIL) vars.RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL;
  if (process.env.LEAD_NOTIFICATION_EMAIL)
    vars.LEAD_NOTIFICATION_EMAIL = process.env.LEAD_NOTIFICATION_EMAIL;
  if (process.env.GOOGLE_SHEETS_WEBHOOK_URL)
    vars.GOOGLE_SHEETS_WEBHOOK_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (process.env.GOOGLE_SHEETS_WEBHOOK_SECRET)
    vars.GOOGLE_SHEETS_WEBHOOK_SECRET = process.env.GOOGLE_SHEETS_WEBHOOK_SECRET;
  if (process.env.TURNSTILE_SECRET_KEY)
    vars.TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;
  if (process.env.NEXT_PUBLIC_ANALYTICS_ENABLED)
    vars.NEXT_PUBLIC_ANALYTICS_ENABLED = process.env.NEXT_PUBLIC_ANALYTICS_ENABLED;

  return vars;
}

export function getLeadIntegrationConfig() {
  const env = validateEnv();
  const required = [
    env.SUPABASE_URL,
    env.SUPABASE_SERVICE_ROLE_KEY,
    env.RESEND_API_KEY,
    env.RESEND_FROM_EMAIL,
    env.LEAD_NOTIFICATION_EMAIL,
  ];

  if (required.some((value) => !value)) {
    throw new Error("Lead submission integrations are not configured.");
  }

  return {
    supabaseUrl: env.SUPABASE_URL!,
    supabaseServiceRoleKey: env.SUPABASE_SERVICE_ROLE_KEY!,
    resendApiKey: env.RESEND_API_KEY!,
    resendFromEmail: env.RESEND_FROM_EMAIL!,
    notificationEmail: env.LEAD_NOTIFICATION_EMAIL!,
    googleSheetsWebhookUrl: env.GOOGLE_SHEETS_WEBHOOK_URL,
    googleSheetsWebhookSecret: env.GOOGLE_SHEETS_WEBHOOK_SECRET,
  };
}

/**
 * Guards against accidentally deploying canonical metadata that points at the
 * local development URL. This deliberately runs in release checks rather than
 * at module load so a contributor can run the marketing shell without secrets.
 */
export function validateProductionEnvironment(env = validateEnv()): void {
  if (process.env.NODE_ENV === "production" && env.NEXT_PUBLIC_APP_URL.includes("localhost")) {
    throw new Error(
      "NEXT_PUBLIC_APP_URL must be set to the public site URL before production deployment.",
    );
  }
}

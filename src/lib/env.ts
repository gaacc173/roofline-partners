/**
 * Typed environment variable validation.
 *
 * In production these values are validated at startup.
 * During development, optional integrations (Supabase, Resend, analytics)
 * may be left unset — the app still runs.
 */

export interface EnvSchema {
  /** Display name shown in the UI */
  NEXT_PUBLIC_APP_NAME: string;
  /** Base URL of the deployed application */
  NEXT_PUBLIC_APP_URL: string;
  /** Supabase project URL — required once Supabase is integrated */
  SUPABASE_URL?: string;
  /** Supabase anonymous key — required once Supabase is integrated */
  SUPABASE_ANON_KEY?: string;
  /** Resend API key — required once email is integrated */
  RESEND_API_KEY?: string;
  /** Feature flag for analytics */
  NEXT_PUBLIC_ANALYTICS_ENABLED?: string;
}

/**
 * Validate that required public environment variables are present.
 * Throws on first missing variable so the failure is visible at startup.
 */
export function validateEnv(): EnvSchema {
  const vars: EnvSchema = {
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME ?? "",
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL ?? "",
  };

  // Optional integrations — read without throwing
  if (process.env.SUPABASE_URL) vars.SUPABASE_URL = process.env.SUPABASE_URL;
  if (process.env.SUPABASE_ANON_KEY) vars.SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
  if (process.env.RESEND_API_KEY) vars.RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (process.env.NEXT_PUBLIC_ANALYTICS_ENABLED)
    vars.NEXT_PUBLIC_ANALYTICS_ENABLED = process.env.NEXT_PUBLIC_ANALYTICS_ENABLED;

  // Validate required fields
  const missing: string[] = [];
  if (!vars.NEXT_PUBLIC_APP_NAME) missing.push("NEXT_PUBLIC_APP_NAME");
  if (!vars.NEXT_PUBLIC_APP_URL) missing.push("NEXT_PUBLIC_APP_URL");

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}. ` +
        `See .env.example for the expected schema.`,
    );
  }

  return vars;
}

/**
 * Typed environment variable validation with safe defaults.
 *
 * In production these values are validated at startup.
 * During development, optional integrations (Supabase, Resend, analytics)
 * may be left unset — the app still runs.
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
  /** Supabase anonymous key — required once Supabase is integrated */
  SUPABASE_ANON_KEY?: string;
  /** Resend API key — required once email is integrated */
  RESEND_API_KEY?: string;
  /** Feature flag for analytics */
  NEXT_PUBLIC_ANALYTICS_ENABLED?: string;
}

const defaults: EnvSchema = {
  NEXT_PUBLIC_APP_NAME: "Roofline Partners",
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
  if (process.env.SUPABASE_ANON_KEY) vars.SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
  if (process.env.RESEND_API_KEY) vars.RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (process.env.NEXT_PUBLIC_ANALYTICS_ENABLED)
    vars.NEXT_PUBLIC_ANALYTICS_ENABLED = process.env.NEXT_PUBLIC_ANALYTICS_ENABLED;

  return vars;
}

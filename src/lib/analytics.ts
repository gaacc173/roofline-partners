/**
 * Analytics interface and named events.
 *
 * Defines typed event names and payloads for the analytics tracking seam.
 * No vendor integration or client-side tracking calls are implemented here —
 * this is the contract that future analytics implementations must satisfy.
 *
 * Event naming convention: entity_action (lowercase, underscore-separated).
 *
 * Privacy guarantee: analytics payloads never contain PII. Helper
 * `buildPrivacySafePayload` strips name, email, phone, notes, and other
 * contact fields before any event is tracked.
 */

import { validateEnv } from "./env";

/** Typed event names */
export const AnalyticsEvent = {
  HOMEPAGE_VIEW: "homepage_view",
  PACKAGE_VIEW: "package_view",
  PACKAGE_SELECTED: "package_selected",
  FORM_STARTED: "form_started",
  FORM_COMPLETED: "form_completed",
  FREE_TRIAL_REQUESTED: "free_trial_requested",
  CONTACT_SUBMITTED: "contact_submitted",
} as const;

/** Union type of all analytics event names */
export type AnalyticsEventName = (typeof AnalyticsEvent)[keyof typeof AnalyticsEvent];

/** Generic analytics event payload */
export interface AnalyticsEventPayload {
  [key: string]: string | number | boolean | null | undefined;
}

/**
 * Track an analytics event.
 *
 * Implementations may log to the console, send to a vendor SDK,
 * or queue events for later dispatch. When analytics are disabled,
 * this function is a no-op.
 */
export interface AnalyticsTracker {
  /** Track a named event with optional data */
  track(eventName: AnalyticsEventName, data?: AnalyticsEventPayload): void;
  /** Whether analytics are currently enabled */
  enabled: boolean;
}

/**
 * No-op tracker used when analytics are disabled.
 * Replaced with a real implementation when a vendor is integrated.
 */
export const noopTracker: AnalyticsTracker = {
  track(): void {
    // No-op
  },
  enabled: false,
};

/**
 * Fields that must never appear in analytics payloads.
 * These correspond to PII fields collected by the lead pipeline.
 */
const PII_FIELDS = new Set([
  "name",
  "email",
  "phone",
  "notes",
  "username",
  "companyName",
  "serviceArea",
  "bestContactTime",
  "preferredContactMethod",
  "company_name",
  "service_area",
  "best_contact_time",
  "preferred_contact_method",
]);

/**
 * Build a privacy-safe analytics payload by stripping PII fields.
 *
 * @param data - Raw payload that may contain sensitive fields
 * @returns A new payload with PII fields removed
 */
export function buildPrivacySafePayload(data: AnalyticsEventPayload): AnalyticsEventPayload {
  const safe: AnalyticsEventPayload = {};
  for (const [key, value] of Object.entries(data)) {
    if (!PII_FIELDS.has(key)) {
      safe[key] = value;
    }
  }
  return safe;
}

/**
 * Create a tracker based on the analytics enabled flag.
 *
 * Reads the `NEXT_PUBLIC_ANALYTICS_ENABLED` environment variable.
 * When disabled (default), returns a no-op tracker that incurs
 * zero runtime overhead.
 *
 * @param enabled - Whether analytics tracking is enabled
 * @returns A tracker instance (real or no-op)
 */
export function createTracker(enabled: boolean): AnalyticsTracker {
  if (enabled) {
    // Placeholder: will be replaced with vendor-specific implementation
    // e.g. return new GoogleAnalyticsTracker();
    return {
      track(eventName: AnalyticsEventName, data?: AnalyticsEventPayload): void {
        // Future: send to analytics vendor
        console.log("[analytics]", eventName, data ?? {});
      },
      enabled: true,
    };
  }
  return noopTracker;
}

/**
 * Whether analytics are enabled, resolved from the environment.
 * Defaults to false so analytics are a true no-op in production
 * until a vendor is approved and the flag is set.
 */
const analyticsEnabled = validateEnv().NEXT_PUBLIC_ANALYTICS_ENABLED === "true";

/**
 * Singleton analytics tracker — a no-op unless explicitly enabled
 * via the `NEXT_PUBLIC_ANALYTICS_ENABLED` environment variable.
 */
export const analytics: AnalyticsTracker = createTracker(analyticsEnabled);

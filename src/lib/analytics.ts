/**
 * Analytics interface and named events.
 *
 * Defines typed event names and payloads for the analytics tracking seam.
 * No vendor integration or client-side tracking calls are implemented here —
 * this is the contract that future analytics implementations must satisfy.
 *
 * Event naming convention: entity_action (lowercase, underscore-separated).
 */

/** Typed event names */
export const AnalyticsEvent = {
  HOMEPAGE_VIEW: "homepage_view",
  SCHEDULE_CALL_CLICKED: "schedule_call_clicked",
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
 * Create a tracker based on the analytics enabled flag.
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

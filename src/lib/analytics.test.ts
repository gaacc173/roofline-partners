import { describe, expect, it, vi } from "vitest";
import {
  AnalyticsEvent,
  buildPrivacySafePayload,
  createTracker,
  noopTracker,
  type AnalyticsEventPayload,
} from "./analytics";

describe("buildPrivacySafePayload", () => {
  it("removes all known PII fields from a payload", () => {
    const raw: AnalyticsEventPayload = {
      name: "Jordan Rivera",
      email: "jordan@example.com",
      phone: "+1 555 555 0199",
      notes: "Interested in suburban work",
      source: "package",
      selectedPackage: "growth-20",
      username: "jr",
      companyName: "Rivera Roofing",
      safeField: true,
    };

    const safe = buildPrivacySafePayload(raw);

    expect(safe).not.toHaveProperty("name");
    expect(safe).not.toHaveProperty("email");
    expect(safe).not.toHaveProperty("phone");
    expect(safe).not.toHaveProperty("notes");
    expect(safe).not.toHaveProperty("username");
    expect(safe).not.toHaveProperty("companyName");
    expect(safe).toHaveProperty("source", "package");
    expect(safe).toHaveProperty("selectedPackage", "growth-20");
    expect(safe).toHaveProperty("safeField", true);
  });

  it("returns an empty object when all fields are PII", () => {
    const raw: AnalyticsEventPayload = {
      name: "Alice",
      email: "a@b.com",
      phone: "555-0000",
    };
    expect(buildPrivacySafePayload(raw)).toEqual({});
  });

  it("handles undefined and null safely", () => {
    expect(buildPrivacySafePayload({ name: undefined, safe: null })).toEqual({ safe: null });
  });

  it("preserves snake_case PII aliases", () => {
    const raw: AnalyticsEventPayload = {
      company_name: "Test",
      service_area: "Austin",
      best_contact_time: "Afternoon",
      preferred_contact_method: "email",
      source: "contact",
    };
    const safe = buildPrivacySafePayload(raw);
    expect(safe).not.toHaveProperty("company_name");
    expect(safe).not.toHaveProperty("service_area");
    expect(safe).not.toHaveProperty("best_contact_time");
    expect(safe).not.toHaveProperty("preferred_contact_method");
    expect(safe).toHaveProperty("source", "contact");
  });
});

describe("noopTracker", () => {
  it("does not throw on track calls", () => {
    expect(() => noopTracker.track("homepage_view", { page: "/" })).not.toThrow();
  });

  it("reports disabled", () => {
    expect(noopTracker.enabled).toBe(false);
  });
});

describe("createTracker", () => {
  it("returns a disabled no-op when enabled is false", () => {
    const tracker = createTracker(false);
    expect(tracker.enabled).toBe(false);
    expect(tracker).toBe(noopTracker);
  });

  it("returns an enabled tracker when enabled is true", () => {
    const tracker = createTracker(true);
    expect(tracker.enabled).toBe(true);
    expect(tracker.track).toBeTypeOf("function");
  });

  it("logged tracker emits console output", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => undefined);
    const tracker = createTracker(true);
    tracker.track("homepage_view", { path: "/" });
    expect(spy).toHaveBeenCalledWith("[analytics]", "homepage_view", { path: "/" });
    spy.mockRestore();
  });
});

describe("AnalyticsEvent constants", () => {
  it("exports all expected event names", () => {
    expect(AnalyticsEvent.HOMEPAGE_VIEW).toBe("homepage_view");
    expect(AnalyticsEvent.PACKAGE_VIEW).toBe("package_view");
    expect(AnalyticsEvent.PACKAGE_SELECTED).toBe("package_selected");
    expect(AnalyticsEvent.FORM_STARTED).toBe("form_started");
    expect(AnalyticsEvent.FORM_COMPLETED).toBe("form_completed");
    expect(AnalyticsEvent.FREE_TRIAL_REQUESTED).toBe("free_trial_requested");
    expect(AnalyticsEvent.CONTACT_SUBMITTED).toBe("contact_submitted");
  });
});

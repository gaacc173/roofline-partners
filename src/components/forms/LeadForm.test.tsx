import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LeadForm } from "./LeadForm";

vi.mock("@/lib/analytics", () => ({
  analytics: {
    track: vi.fn(),
    enabled: false,
  },
  AnalyticsEvent: {
    FORM_STARTED: "form_started",
  },
}));

describe("LeadForm", () => {
  afterEach(() => {
    document.body.innerHTML = "";
    vi.clearAllMocks();
  });

  it("tracks FORM_STARTED only once on first user focus, not on every bubbled focus event", async () => {
    const { analytics } = await import("@/lib/analytics");

    render(<LeadForm source="package" submitLabel="Submit" />);

    // Fire focus on the first input (Name) — this bubbles through the form
    const nameInput = screen.getByLabelText(/full name/i);
    fireEvent.focus(nameInput);

    expect(analytics.track).toHaveBeenCalledTimes(1);
    expect(analytics.track).toHaveBeenCalledWith("form_started", { source: "package" });

    // Fire focus on a second input — should NOT trigger another FORM_STARTED
    const emailInput = screen.getByLabelText(/work email/i);
    fireEvent.focus(emailInput);

    expect(analytics.track).toHaveBeenCalledTimes(1);

    // Fire focus on a third input — still only one
    const phoneInput = screen.getByLabelText(/phone number/i);
    fireEvent.focus(phoneInput);

    expect(analytics.track).toHaveBeenCalledTimes(1);
  });
});

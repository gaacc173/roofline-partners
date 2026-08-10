import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LeadForm } from "./LeadForm";

const useActionStateMock = vi.hoisted(() => vi.fn());

vi.mock("react", async (importOriginal) => {
  const react = await importOriginal<typeof import("react")>();
  return { ...react, useActionState: useActionStateMock };
});

vi.mock("@/app/actions/submit-lead", () => ({
  submitLead: vi.fn(),
}));

describe("LeadForm", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("associates field errors with inputs and exposes a focusable summary", () => {
    useActionStateMock.mockReturnValue([
      {
        error: "Please correct the highlighted fields.",
        fieldErrors: { email: ["Enter a valid email address."] },
      },
      vi.fn(),
      false,
    ]);

    render(<LeadForm submitLabel="Send request" />);

    const email = document.getElementById("lead-email");
    expect(email).not.toBeNull();
    expect(email).toHaveAttribute("id", "lead-email");
    expect(email).toHaveAttribute("aria-invalid", "true");
    expect(email).toHaveAttribute("aria-describedby", "lead-email-error");
    expect(screen.getByText("Enter a valid email address.")).toHaveAttribute(
      "id",
      "lead-email-error",
    );
    expect(screen.getByRole("alert")).toHaveAttribute("tabindex", "-1");
  });

  it("announces pending submissions without allowing another submit", () => {
    useActionStateMock.mockReturnValue([{}, vi.fn(), true]);

    render(<LeadForm submitLabel="Send request" />);

    expect(screen.getByRole("form", { name: "Schedule a call form" })).toHaveAttribute(
      "aria-busy",
      "true",
    );
    expect(screen.getByRole("status")).toHaveTextContent("Sending request...");
    expect(screen.getAllByRole("button", { name: "Sending request..." })[0]).toBeDisabled();
  });

  it("adds the browser IANA timezone when the form is submitted", () => {
    useActionStateMock.mockReturnValue([{}, vi.fn(), false]);
    render(<LeadForm submitLabel="Send request" />);

    const form = screen.getByRole("form", { name: "Schedule a call form" });
    fireEvent.submit(form);

    expect(form.querySelector<HTMLInputElement>("[name='requestedContactTimezone']")?.value).toBe(
      Intl.DateTimeFormat().resolvedOptions().timeZone,
    );
  });

  it("uses visible field borders in light and dark mode", () => {
    useActionStateMock.mockReturnValue([{}, vi.fn(), false]);
    render(<LeadForm submitLabel="Send request" />);

    const email = document.getElementById("lead-email");
    expect(email).toHaveClass("border-slate-400", "dark:border-slate-500");
  });

  it("does not render a datetime-local input", () => {
    useActionStateMock.mockReturnValue([{}, vi.fn(), false]);
    render(<LeadForm submitLabel="Send request" />);

    const datetimeInputs = document.querySelectorAll('input[type="datetime-local"]');
    expect(datetimeInputs).toHaveLength(0);
  });

  it("does not use geolocation or permission APIs", () => {
    useActionStateMock.mockReturnValue([{}, vi.fn(), false]);
    render(<LeadForm submitLabel="Send request" />);

    // The form should not reference navigator.geolocation or navigator.permissions
    const formElement = screen.getByRole("form", { name: "Schedule a call form" });
    const formHTML = formElement.outerHTML;
    expect(formHTML).not.toContain("geolocation");
    expect(formHTML).not.toContain("permissions");
    expect(formHTML).not.toContain("navigator.geolocation");
    expect(formHTML).not.toContain("navigator.permissions");
  });

  it("submits the computed requestedContactAt hidden field", () => {
    useActionStateMock.mockReturnValue([{}, vi.fn(), false]);
    render(<LeadForm submitLabel="Send request" />);

    const form = screen.getByRole("form", { name: "Schedule a call form" });
    const hiddenInput = form.querySelector<HTMLInputElement>('input[name="requestedContactAt"]');
    expect(hiddenInput).not.toBeNull();
    // The value should match YYYY-MM-DDTHH:mm format
    expect(hiddenInput?.value).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/);
  });

  it("captures the browser IANA timezone on submit", () => {
    useActionStateMock.mockReturnValue([{}, vi.fn(), false]);
    render(<LeadForm submitLabel="Send request" />);

    const form = screen.getByRole("form", { name: "Schedule a call form" });
    fireEvent.submit(form);

    const hiddenInput = form.querySelector<HTMLInputElement>('[name="requestedContactTimezone"]');
    expect(hiddenInput?.value).toBe(Intl.DateTimeFormat().resolvedOptions().timeZone);
  });
});

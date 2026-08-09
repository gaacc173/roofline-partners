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
});

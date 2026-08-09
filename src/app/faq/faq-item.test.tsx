import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FAQItem } from "./faq-item";

describe("FAQItem", () => {
  it("keeps the question readable before interaction", () => {
    render(
      <FAQItem question="Are appointments shared?" answer="No, appointments are exclusive." />,
    );

    const question = screen.getByRole("button", { name: /are appointments shared/i });
    expect(question).toHaveClass("text-slate-950", "dark:text-white");
    expect(question).toHaveAttribute("aria-expanded", "false");
  });
});

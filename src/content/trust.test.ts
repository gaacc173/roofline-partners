import { describe, expect, it } from "vitest";
import { testimonials, type Testimonial } from "./trust";

describe("testimonials — placeholder contract", () => {
  it("exports exactly three placeholder testimonials", () => {
    expect(testimonials).toHaveLength(3);
  });

  it("every testimonial is marked as a placeholder", () => {
    for (const t of testimonials) {
      expect(t.placeholder).toBe(true);
    }
  });

  it("no testimonial is marked as verified", () => {
    for (const t of testimonials) {
      expect(t.verified).toBe(false);
    }
  });

  it("every testimonial has a name, company, quote, and rating", () => {
    for (const t of testimonials) {
      expect(t.name).toBeTruthy();
      expect(t.company).toBeTruthy();
      expect(t.quote).toBeTruthy();
      expect(t.rating).toBeGreaterThanOrEqual(1);
      expect(t.rating).toBeLessThanOrEqual(5);
    }
  });

  it("every testimonial has a company that includes a city", () => {
    for (const t of testimonials) {
      expect(t.company).toMatch(/\w+,\s+[A-Z]{2}/);
    }
  });

  it("has the expected placeholder testimonial names", () => {
    const names = testimonials.map((t) => t.name);
    expect(names).toContain("Marcus T.");
    expect(names).toContain("Priya K.");
    expect(names).toContain("James R.");
  });

  it("Testimonial type requires placeholder and verified fields", () => {
    const sample: Testimonial = {
      name: "Test",
      company: "Test Co — NYC",
      quote: "Great service",
      rating: 5,
      verified: false,
      placeholder: true,
    };
    expect(sample.placeholder).toBe(true);
    expect(sample.verified).toBe(false);
  });
});

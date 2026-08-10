import { describe, expect, it } from "vitest";
import { computeRequestedContactAt } from "./contact-time";

describe("computeRequestedContactAt", () => {
  it("returns YYYY-MM-DDTHH:mm format", () => {
    const result = computeRequestedContactAt(
      { month: 6, day: 15, hour: 10, minute: 30, ampm: "AM" },
      new Date("2025-01-01T00:00:00Z"),
    );
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/);
  });

  it("uses current year when selected month is in the future", () => {
    const result = computeRequestedContactAt(
      { month: 12, day: 25, hour: 9, minute: 0, ampm: "AM" },
      new Date("2025-06-15T12:00:00Z"),
    );
    expect(result).toBe("2025-12-25T09:00");
  });

  it("uses current year when selected month is the same and day is in the future", () => {
    const result = computeRequestedContactAt(
      { month: 6, day: 20, hour: 2, minute: 0, ampm: "PM" },
      new Date("2025-06-15T12:00:00Z"),
    );
    expect(result).toBe("2025-06-20T14:00");
  });

  it("rolls over to next year when selected month has passed", () => {
    const result = computeRequestedContactAt(
      { month: 3, day: 15, hour: 10, minute: 0, ampm: "AM" },
      new Date("2025-06-15T12:00:00Z"),
    );
    expect(result).toBe("2026-03-15T10:00");
  });

  it("rolls over to next year when selected month is the same but day has passed", () => {
    const result = computeRequestedContactAt(
      { month: 6, day: 10, hour: 10, minute: 0, ampm: "AM" },
      new Date("2025-06-15T12:00:00Z"),
    );
    expect(result).toBe("2026-06-10T10:00");
  });

  // December → January rollover
  it("rolls from December to January of next year", () => {
    const result = computeRequestedContactAt(
      { month: 1, day: 15, hour: 9, minute: 0, ampm: "AM" },
      new Date("2025-12-20T12:00:00Z"),
    );
    expect(result).toBe("2026-01-15T09:00");
  });

  it("rolls from December 31 to January 1 of next year", () => {
    const result = computeRequestedContactAt(
      { month: 1, day: 1, hour: 12, minute: 0, ampm: "PM" },
      new Date("2025-12-31T23:59:00Z"),
    );
    expect(result).toBe("2026-01-01T12:00");
  });

  it("handles December selection in January (future December stays current year)", () => {
    const result = computeRequestedContactAt(
      { month: 12, day: 25, hour: 10, minute: 0, ampm: "AM" },
      new Date("2025-01-15T12:00:00Z"),
    );
    expect(result).toBe("2025-12-25T10:00");
  });

  // AM/PM conversion
  it("converts 12 AM to hour 0", () => {
    const result = computeRequestedContactAt(
      { month: 6, day: 15, hour: 12, minute: 0, ampm: "AM" },
      new Date("2025-01-01T00:00:00Z"),
    );
    expect(result).toBe("2025-06-15T00:00");
  });

  it("converts 12 PM to hour 12", () => {
    const result = computeRequestedContactAt(
      { month: 6, day: 15, hour: 12, minute: 0, ampm: "PM" },
      new Date("2025-01-01T00:00:00Z"),
    );
    expect(result).toBe("2025-06-15T12:00");
  });

  it("converts 1 PM to hour 13", () => {
    const result = computeRequestedContactAt(
      { month: 6, day: 15, hour: 1, minute: 30, ampm: "PM" },
      new Date("2025-01-01T00:00:00Z"),
    );
    expect(result).toBe("2025-06-15T13:30");
  });

  it("converts 1 AM to hour 1", () => {
    const result = computeRequestedContactAt(
      { month: 6, day: 15, hour: 1, minute: 30, ampm: "AM" },
      new Date("2025-01-01T00:00:00Z"),
    );
    expect(result).toBe("2025-06-15T01:30");
  });

  // Edge cases
  it("handles February 29 in a leap year", () => {
    const result = computeRequestedContactAt(
      { month: 2, day: 29, hour: 10, minute: 0, ampm: "AM" },
      new Date("2024-01-01T00:00:00Z"),
    );
    expect(result).toBe("2024-02-29T10:00");
  });

  it("handles minute 0 correctly", () => {
    const result = computeRequestedContactAt(
      { month: 6, day: 15, hour: 10, minute: 0, ampm: "AM" },
      new Date("2025-01-01T00:00:00Z"),
    );
    expect(result).toBe("2025-06-15T10:00");
  });

  it("handles minute 59 correctly", () => {
    const result = computeRequestedContactAt(
      { month: 6, day: 15, hour: 10, minute: 59, ampm: "AM" },
      new Date("2025-01-01T00:00:00Z"),
    );
    expect(result).toBe("2025-06-15T10:59");
  });

  it("rejects impossible calendar dates instead of normalizing them", () => {
    expect(() =>
      computeRequestedContactAt(
        { month: 2, day: 31, hour: 10, minute: 0, ampm: "AM" },
        new Date("2025-01-01T00:00:00Z"),
      ),
    ).toThrow("selected date or time is invalid");
  });
});

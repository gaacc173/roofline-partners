import { describe, expect, it } from "vitest";
import { sanitiseLead } from "./lead-utils";

describe("sanitiseLead — red test (pre-implementation)", () => {
  it("strips whitespace and lowercases email", () => {
    const result = sanitiseLead({
      name: "  Alice  ",
      email: "  ALICE@EXAMPLE.COM  ",
      phone: " 555-0100 ",
      message: "Need a new roof.",
    });

    expect(result).toEqual({
      name: "Alice",
      email: "alice@example.com",
      phone: "555-0100",
      message: "Need a new roof.",
    });
  });
});

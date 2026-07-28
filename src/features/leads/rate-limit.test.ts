import { describe, expect, it } from "vitest";
import { isRateLimited } from "./rate-limit";

describe("isRateLimited", () => {
  it("allows the configured submission count then blocks within the active window", () => {
    const identifier = "rate-limit-test-address";
    const now = 1_000_000;

    for (let attempt = 0; attempt < 5; attempt += 1) {
      expect(isRateLimited(identifier, now)).toBe(false);
    }

    expect(isRateLimited(identifier, now)).toBe(true);
  });
});

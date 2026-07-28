import { describe, expect, it } from "vitest";
import { cn } from "./cn";

describe("cn — red test (pre-implementation)", () => {
  it("merges simple class strings", () => {
    expect(cn("px-4 py-2", "rounded-md")).toBe("px-4 py-2 rounded-md");
  });

  it("handles conditional classes (truthy)", () => {
    const active = true;
    expect(cn("base", active && "active")).toBe("base active");
  });

  it("handles conditional classes (falsy)", () => {
    const active = false;
    expect(cn("base", active && "active")).toBe("base");
  });

  it("handles falsy values like 0 and null", () => {
    expect(cn("base", 0, null, undefined, false, "")).toBe("base");
  });

  it("handles arrays of classes", () => {
    expect(cn(["px-2", "py-1"], "rounded")).toBe("px-2 py-1 rounded");
  });

  it("handles object syntax for conditional classes", () => {
    const active = true;
    const disabled = false;
    expect(cn("base", { active: active, "text-muted": disabled })).toBe("base active");
  });

  it("deduplicates Tailwind variants (lg: and base)", () => {
    expect(cn("px-4", "lg:px-8")).toBe("px-4 lg:px-8");
  });
});

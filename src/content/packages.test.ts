import { describe, expect, it } from "vitest";
import { packages, getPackageById, type Package } from "./packages";

describe("packages — content contract", () => {
  it("exports exactly four packages", () => {
    expect(packages).toHaveLength(4);
  });

  it("preserves the trial package ID", () => {
    const trial = getPackageById("trial");
    expect(trial).toBeDefined();
    expect(trial!.id).toBe("trial");
  });

  it("preserves the starter-10 package ID", () => {
    const starter = getPackageById("starter-10");
    expect(starter).toBeDefined();
    expect(starter!.id).toBe("starter-10");
  });

  it("preserves the growth-20 package ID", () => {
    const growth = getPackageById("growth-20");
    expect(growth).toBeDefined();
    expect(growth!.id).toBe("growth-20");
  });

  it("preserves the scale-40 package ID for Pro/Scale tier", () => {
    const scale = getPackageById("scale-40");
    expect(scale).toBeDefined();
    expect(scale!.id).toBe("scale-40");
  });

  it("does not expose appointmentQuantity (replaced by monthly pricing)", () => {
    for (const pkg of packages) {
      expect(("appointmentQuantity" in pkg) as boolean).toBe(false);
    }
  });

  it("all paid packages have monthly pricing format", () => {
    const paidPackages = packages.filter((p) => p.id !== "trial");
    for (const pkg of paidPackages) {
      expect(pkg.price).toMatch(/\$[\d,]+\/mo/);
    }
  });

  it("all paid packages have placeholder price notes", () => {
    const paidPackages = packages.filter((p) => p.id !== "trial");
    for (const pkg of paidPackages) {
      expect(pkg.priceNote.toLowerCase()).toContain("sample");
      expect(pkg.priceNote.toLowerCase()).toContain("placeholder");
    }
  });

  it("exactly one package is highlighted", () => {
    const highlighted = packages.filter((p) => p.highlighted);
    expect(highlighted).toHaveLength(1);
  });

  it("the Growth package is highlighted", () => {
    const growth = getPackageById("growth-20");
    expect(growth?.highlighted).toBe(true);
  });

  it("each package has a non-empty benefits array", () => {
    for (const pkg of packages) {
      expect(pkg.benefits.length).toBeGreaterThan(0);
    }
  });

  it("each package has all required fields", () => {
    const requiredFields: (keyof Package)[] = [
      "id",
      "name",
      "price",
      "priceNote",
      "description",
      "benefits",
      "highlighted",
      "cta",
    ];
    for (const pkg of packages) {
      for (const field of requiredFields) {
        expect(pkg).toHaveProperty(field);
        // Only check truthiness for string fields; boolean fields are valid either way
        if (field === "highlighted") {
          expect(typeof pkg[field]).toBe("boolean");
        } else {
          expect(pkg[field]).toBeTruthy();
        }
      }
    }
  });

  it("paid packages include placeholder lead volume in benefits", () => {
    const starter = getPackageById("starter-10");
    const growth = getPackageById("growth-20");
    const scale = getPackageById("scale-40");

    expect(starter).toBeDefined();
    expect(growth).toBeDefined();
    expect(scale).toBeDefined();

    // Starter: 10 qualified leads placeholder
    expect(starter!.benefits.some((b) => b.toLowerCase().includes("10 qualified lead"))).toBe(true);
    // Growth: 20 qualified leads placeholder
    expect(growth!.benefits.some((b) => b.toLowerCase().includes("20 qualified lead"))).toBe(true);
    // Scale-40: unlimited placeholder
    expect(scale!.benefits.some((b) => b.toLowerCase().includes("unlimited"))).toBe(true);
  });

  it("paid package benefits reference Google Sheets notifications, not email", () => {
    const paidPackages = packages.filter((p) => p.id !== "trial");
    for (const pkg of paidPackages) {
      // Should reference Sheets/Apps Script
      expect(pkg.benefits.some((b) => b.toLowerCase().includes("google sheets"))).toBe(true);
      // Should NOT reference email notifications (Resend was removed)
      expect(pkg.benefits.some((b) => b.toLowerCase().includes("email"))).toBe(false);
    }
  });

  it("all paid package benefits include placeholder labeling for volumes", () => {
    const paidPackages = packages.filter((p) => p.id !== "trial");
    for (const pkg of paidPackages) {
      const volumeBenefit = pkg.benefits.find((b) => b.toLowerCase().includes("lead"));
      expect(volumeBenefit).toBeDefined();
      expect(volumeBenefit!.toLowerCase()).toContain("placeholder");
    }
  });
});

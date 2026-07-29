import { describe, expect, it } from "vitest";
import { leadSubmissionSchema, toStoredLead } from "./lead-schema";

describe("leadSubmissionSchema", () => {
  it("normalizes a valid package request and rejects unsupported contact methods", () => {
    const validResult = leadSubmissionSchema.safeParse({
      name: "  Jordan Rivera  ",
      email: "JORDAN@EXAMPLE.COM ",
      phone: " +1 (555) 555-0199 ",
      username: "@jordanroofing",
      preferredContactMethod: "whatsapp",
      companyName: "Rivera Roofing",
      serviceArea: "Austin, TX",
      selectedPackage: "growth-20",
      bestContactTime: "Weekday afternoons",
      notes: "Interested in <strong>suburban</strong> replacement work.",
      consent: true,
      website: "",
      formStartedAt: String(Date.now() - 5_000),
    });

    expect(validResult.success).toBe(true);
    if (validResult.success) {
      expect(validResult.data.name).toBe("Jordan Rivera");
      expect(validResult.data.email).toBe("jordan@example.com");
      expect(validResult.data.notes).toBe("Interested in suburban replacement work.");
    }

    expect(
      leadSubmissionSchema.safeParse({
        name: "Jordan Rivera",
        email: "jordan@example.com",
        phone: "+1 555 555 0199",
        preferredContactMethod: "carrier-pigeon",
        companyName: "Rivera Roofing",
        serviceArea: "Austin, TX",
        selectedPackage: "growth-20",
        bestContactTime: "Weekday afternoons",
        notes: "Interested in suburban replacement work.",
        consent: true,
        website: "",
        formStartedAt: String(Date.now() - 5_000),
      }).success,
    ).toBe(false);
  });

  it("rejects spam fields, missing consent, unknown packages, and oversized notes", () => {
    const base = {
      name: "Jordan Rivera",
      email: "jordan@example.com",
      phone: "+1 555 555 0199",
      preferredContactMethod: "email",
      companyName: "Rivera Roofing",
      serviceArea: "Austin, TX",
      selectedPackage: "growth-20",
      bestContactTime: "Weekday afternoons",
      notes: "Interested in suburban replacement work.",
      consent: true,
      website: "",
      formStartedAt: String(Date.now() - 5_000),
    };

    expect(
      leadSubmissionSchema.safeParse({ ...base, website: "https://spam.example" }).success,
    ).toBe(false);
    expect(leadSubmissionSchema.safeParse({ ...base, consent: false }).success).toBe(false);
    expect(
      leadSubmissionSchema.safeParse({ ...base, selectedPackage: "not-a-package" }).success,
    ).toBe(false);
    expect(leadSubmissionSchema.safeParse({ ...base, notes: "x".repeat(2_001) }).success).toBe(
      false,
    );
  });

  it("normalizes empty optional fields and creates a stored lead without form controls", () => {
    const parsed = leadSubmissionSchema.parse({
      name: "Jordan Rivera",
      email: "jordan@example.com",
      phone: "+1 555 555 0199",
      username: "",
      preferredContactMethod: "email",
      companyName: "Rivera Roofing",
      serviceArea: "Austin, TX",
      selectedPackage: "growth-20",
      bestContactTime: "Weekday afternoons",
      notes: "Interested in suburban replacement work.",
      consent: true,
      website: "",
      formStartedAt: String(Date.now() - 5_000),
    });
    const submittedAt = new Date("2026-07-29T12:00:00.000Z");

    expect(parsed.username).toBeUndefined();
    expect(toStoredLead(parsed, "package", submittedAt)).toEqual({
      source: "package",
      name: "Jordan Rivera",
      email: "jordan@example.com",
      phone: "+1 555 555 0199",
      username: undefined,
      preferredContactMethod: "email",
      companyName: "Rivera Roofing",
      serviceArea: "Austin, TX",
      selectedPackage: "growth-20",
      bestContactTime: "Weekday afternoons",
      notes: "Interested in suburban replacement work.",
      consentTimestamp: submittedAt.toISOString(),
    });
  });
});

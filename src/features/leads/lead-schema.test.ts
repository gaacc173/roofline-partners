import { describe, expect, it } from "vitest";
import { leadSubmissionSchema } from "./lead-schema";

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
});

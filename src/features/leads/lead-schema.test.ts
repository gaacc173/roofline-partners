import { describe, expect, it } from "vitest";
import { leadSubmissionSchema, toStoredLead } from "./lead-schema";

const validInput = {
  name: "Jordan Rivera",
  email: "jordan@example.com",
  phone: "+1 555 555 0199",
  username: "@jordanroofing",
  companyName: "Rivera Roofing",
  zipCode: "90210",
  requestedContactAt: "2026-08-15T14:00",
  requestedContactTimezone: "America/Los_Angeles",
  notes: "Interested in discussing storm repair opportunities.",
  consent: true,
  website: "",
  formStartedAt: String(Date.now() - 5_000),
};

describe("leadSubmissionSchema", () => {
  it("normalizes a valid scheduling request", () => {
    const result = leadSubmissionSchema.safeParse({
      ...validInput,
      name: "  Jordan Rivera  ",
      email: "JORDAN@EXAMPLE.COM ",
      notes: "Interested in <strong>storm repair</strong> opportunities.",
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe("Jordan Rivera");
      expect(result.data.email).toBe("jordan@example.com");
      expect(result.data.notes).toBe("Interested in storm repair opportunities.");
    }
  });

  it("rejects spam, missing consent, invalid timezone, and oversized messages", () => {
    expect(leadSubmissionSchema.safeParse({ ...validInput, website: "spam" }).success).toBe(false);
    expect(leadSubmissionSchema.safeParse({ ...validInput, consent: false }).success).toBe(false);
    expect(
      leadSubmissionSchema.safeParse({ ...validInput, requestedContactTimezone: "Not/ATimezone" })
        .success,
    ).toBe(false);
    expect(
      leadSubmissionSchema.safeParse({ ...validInput, notes: "x".repeat(2_001) }).success,
    ).toBe(false);
  });

  it("allows an optional ZIP and username, then creates a stored contact lead", () => {
    const parsed = leadSubmissionSchema.parse({
      ...validInput,
      username: "",
      zipCode: "",
    });
    const submittedAt = new Date("2026-07-29T12:00:00.000Z");

    expect(parsed.username).toBeUndefined();
    expect(parsed.zipCode).toBeUndefined();
    expect(toStoredLead(parsed, submittedAt)).toEqual({
      source: "contact",
      name: "Jordan Rivera",
      email: "jordan@example.com",
      phone: "+1 555 555 0199",
      username: undefined,
      companyName: "Rivera Roofing",
      zipCode: undefined,
      requestedContactAt: "2026-08-15T14:00",
      requestedContactTimezone: "America/Los_Angeles",
      notes: "Interested in discussing storm repair opportunities.",
      consentTimestamp: submittedAt.toISOString(),
    });
  });
});

import { z } from "zod";
import { stripHtml } from "@/lib/lead-utils";

const optionalText = (maximum: number) =>
  z
    .string()
    .trim()
    .max(maximum)
    .transform(stripHtml)
    .transform((value) => value || undefined)
    .optional();

const ianaTimezone = z
  .string()
  .trim()
  .min(1)
  .max(80)
  .refine((value) => {
    try {
      new Intl.DateTimeFormat("en-US", { timeZone: value }).format();
      return value.includes("/") || value === "UTC";
    } catch {
      return false;
    }
  }, "Enter a valid IANA timezone.");

export const leadSubmissionSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name.").max(120).transform(stripHtml),
  email: z
    .string()
    .trim()
    .email("Enter a valid email address.")
    .max(254)
    .transform((value) => value.toLowerCase()),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a phone number we can use to contact you.")
    .max(40)
    .transform(stripHtml),
  username: optionalText(100),
  companyName: z.string().trim().min(2, "Enter your company name.").max(160).transform(stripHtml),
  zipCode: optionalText(20),
  requestedContactAt: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/, "Choose a date and time for your call."),
  requestedContactTimezone: ianaTimezone,
  notes: z
    .string()
    .trim()
    .min(10, "Please add a little context for our review.")
    .max(2_000)
    .transform(stripHtml),
  consent: z.literal(true, { error: "Consent is required before submitting." }),
  website: z.string().max(0, "Unable to submit this request."),
  formStartedAt: z.string().regex(/^\d+$/, "Unable to submit this request."),
});

export type LeadSubmission = z.infer<typeof leadSubmissionSchema>;

export interface StoredLead {
  source: "contact";
  name: string;
  email: string;
  phone: string;
  username?: string;
  companyName: string;
  zipCode?: string;
  requestedContactAt: string;
  requestedContactTimezone: string;
  notes: string;
  consentTimestamp: string;
}

export function toStoredLead(submission: LeadSubmission, submittedAt = new Date()): StoredLead {
  return {
    source: "contact",
    name: submission.name,
    email: submission.email,
    phone: submission.phone,
    username: submission.username,
    companyName: submission.companyName,
    zipCode: submission.zipCode,
    requestedContactAt: submission.requestedContactAt,
    requestedContactTimezone: submission.requestedContactTimezone,
    notes: submission.notes,
    consentTimestamp: submittedAt.toISOString(),
  };
}

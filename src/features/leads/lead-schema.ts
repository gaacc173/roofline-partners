import { z } from "zod";
import { getPackageById } from "@/content/packages";
import { stripHtml } from "@/lib/lead-utils";

export const contactMethods = ["whatsapp", "telegram", "email", "sms"] as const;
export type ContactMethod = (typeof contactMethods)[number];

export const leadSources = ["package", "trial", "contact"] as const;
export type LeadSource = (typeof leadSources)[number];

const optionalText = (maximum: number) =>
  z
    .string()
    .trim()
    .max(maximum)
    .transform(stripHtml)
    .transform((value) => value || undefined)
    .optional();

export const leadSubmissionSchema = z
  .object({
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
    preferredContactMethod: z.enum(contactMethods),
    companyName: z.string().trim().min(2, "Enter your company name.").max(160).transform(stripHtml),
    serviceArea: z
      .string()
      .trim()
      .min(2, "Tell us where your team operates.")
      .max(240)
      .transform(stripHtml),
    selectedPackage: z.string().trim().max(80).optional(),
    bestContactTime: z
      .string()
      .trim()
      .min(2, "Tell us a good time to reach you.")
      .max(120)
      .transform(stripHtml),
    notes: z
      .string()
      .trim()
      .min(10, "Please add a little context for our review.")
      .max(2_000)
      .transform(stripHtml),
    consent: z.literal(true, { error: "Consent is required before submitting." }),
    website: z.string().max(0, "Unable to submit this request."),
    formStartedAt: z.string().regex(/^\d+$/, "Unable to submit this request."),
  })
  .superRefine((data, context) => {
    if (data.selectedPackage && !getPackageById(data.selectedPackage)) {
      context.addIssue({
        code: "custom",
        path: ["selectedPackage"],
        message: "Choose one of the available appointment packages.",
      });
    }
  });

export type LeadSubmission = z.infer<typeof leadSubmissionSchema>;

export interface StoredLead {
  source: LeadSource;
  name: string;
  email: string;
  phone: string;
  username?: string;
  preferredContactMethod: ContactMethod;
  companyName: string;
  serviceArea: string;
  selectedPackage?: string;
  bestContactTime: string;
  notes: string;
  consentTimestamp: string;
}

export function toStoredLead(
  submission: LeadSubmission,
  source: LeadSource,
  submittedAt = new Date(),
): StoredLead {
  return {
    source,
    name: submission.name,
    email: submission.email,
    phone: submission.phone,
    username: submission.username,
    preferredContactMethod: submission.preferredContactMethod,
    companyName: submission.companyName,
    serviceArea: submission.serviceArea,
    selectedPackage: submission.selectedPackage,
    bestContactTime: submission.bestContactTime,
    notes: submission.notes,
    consentTimestamp: submittedAt.toISOString(),
  };
}

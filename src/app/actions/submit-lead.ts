"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getLeadIntegrationConfig } from "@/lib/env";
import { LeadSubmissionService } from "@/features/leads/lead-service";
import { GoogleSheetsLeadRepository } from "@/features/leads/lead-repository";
import { leadSubmissionSchema } from "@/features/leads/lead-schema";
import { isRateLimited } from "@/features/leads/rate-limit";

export interface LeadFormState {
  error?: string;
  fieldErrors?: Record<string, string[]>;
}

function getText(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value : "";
}

function verifyRequestOrigin(requestHeaders: Headers): boolean {
  const origin = requestHeaders.get("origin");
  const host = requestHeaders.get("host");
  if (!origin || !host) return false;

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function submitLead(_: LeadFormState, formData: FormData): Promise<LeadFormState> {
  const requestHeaders = await headers();
  if (!verifyRequestOrigin(requestHeaders)) {
    return { error: "We could not verify this request. Please refresh the page and try again." };
  }

  const forwardedFor = requestHeaders.get("x-forwarded-for");
  const requestId =
    forwardedFor?.split(",")[0]?.trim() || requestHeaders.get("x-real-ip") || "unknown";
  if (isRateLimited(requestId)) {
    return { error: "Too many requests. Please wait a few minutes and try again." };
  }

  const parsed = leadSubmissionSchema.safeParse({
    name: getText(formData, "name"),
    email: getText(formData, "email"),
    phone: getText(formData, "phone"),
    username: getText(formData, "username"),
    companyName: getText(formData, "companyName"),
    zipCode: getText(formData, "zipCode"),
    requestedContactAt: getText(formData, "requestedContactAt"),
    requestedContactTimezone: getText(formData, "requestedContactTimezone"),
    notes: getText(formData, "notes"),
    consent: formData.get("consent") === "on",
    website: getText(formData, "website"),
    formStartedAt: getText(formData, "formStartedAt"),
  });

  if (!parsed.success) {
    return {
      error: "Please correct the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const submittedAt = Number(parsed.data.formStartedAt);
  if (
    !Number.isSafeInteger(submittedAt) ||
    Date.now() - submittedAt < 2_000 ||
    Date.now() - submittedAt > 86_400_000
  ) {
    return { error: "Please take a moment to review your request before submitting." };
  }

  try {
    const config = getLeadIntegrationConfig();
    const service = new LeadSubmissionService(
      new GoogleSheetsLeadRepository(config.googleSheetsWebhookUrl),
    );
    await service.submit(parsed.data);
  } catch (error) {
    console.error("Lead submission failed.", error);
    return {
      error:
        "We could not submit your request right now. Please try again shortly or contact us directly.",
    };
  }

  redirect("/thank-you");
}

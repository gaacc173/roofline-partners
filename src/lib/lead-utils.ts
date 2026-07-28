/**
 * Utility functions for lead data formatting.
 *
 * These helpers are intentionally framework-agnostic so they can be
 * tested in isolation with Vitest and reused across server actions,
 * API routes, and admin utilities.
 */

/** A lead record as it would be stored in the Supabase `leads` table. */
export interface LeadData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

/**
 * Sanitise a lead's fields by trimming whitespace, stripping HTML tags,
 * and lowercasing the email. Returns a new object.
 */
export function sanitiseLead(lead: LeadData): LeadData {
  return {
    name: stripHtml(lead.name.trim()),
    email: lead.email.trim().toLowerCase(),
    phone: lead.phone ? stripHtml(lead.phone.trim()) : undefined,
    message: stripHtml(lead.message.trim()),
  };
}

/** Strip all HTML tags from a string. */
export function stripHtml(input: string): string {
  return input.replace(/<[^>]*>/g, "");
}

/** Validate that a lead has all required fields. */
export function isLeadValid(lead: LeadData): boolean {
  return (
    typeof lead.name === "string" &&
    lead.name.trim().length > 0 &&
    typeof lead.email === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email) &&
    typeof lead.message === "string" &&
    lead.message.trim().length > 0
  );
}

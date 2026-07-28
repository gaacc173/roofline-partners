/**
 * Trust signals configuration.
 *
 * No numerical claims or testimonials are published until the business has
 * verified, consented proof to support them.
 */

export interface TrustSignal {
  label: string;
  value: string;
  description: string;
}

export interface Testimonial {
  name: string;
  location: string;
  quote: string;
  /** Whether this is a verified, real client review */
  verified: boolean;
}

export const trustSignals: TrustSignal[] = [
  {
    label: "Clear package options",
    value: "4",
    description: "A trial plus three appointment-volume options to compare",
  },
  {
    label: "Contact preferences",
    value: "4",
    description: "WhatsApp, Telegram, email, or SMS can be requested",
  },
  {
    label: "Payment collected online",
    value: "0",
    description: "Final terms and payment are handled after a team review",
  },
] as const;

/**
 * Proof-placeholder testimonials.
 *
 * These are NOT real client reviews. They are placeholders to demonstrate
 * layout. Replace with verified testimonials before launch.
 */
export const testimonials: Testimonial[] = [];

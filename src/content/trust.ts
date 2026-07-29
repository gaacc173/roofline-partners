/**
 * Trust signals configuration.
 *
 * No verified numerical claims or real client testimonials are published until
 * the business has verified, consented proof to support them.
 *
 * Placeholder testimonials (marked `placeholder: true`) ARE intentionally
 * rendered in the layout to demonstrate design. They are clearly labeled as
 * samples and are not real reviews.
 */

export interface TrustSignal {
  label: string;
  value: string;
  description: string;
}

export interface Testimonial {
  name: string;
  /** Company name and/or city */
  company: string;
  quote: string;
  /** Star rating out of 5 */
  rating: number;
  /** Whether this is a verified, real client review */
  verified: boolean;
  /** When true, the testimonial is a layout placeholder and NOT a real review */
  placeholder: boolean;
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
 * PLACEHOLDER — replace with real approved testimonials before launch.
 *
 * These are NOT real client reviews. They are placeholders to demonstrate
 * layout. Each entry has `verified: false` and `placeholder: true` so that
 * components and tests can distinguish them from approved proof.
 */
export const testimonials: Testimonial[] = [
  {
    name: "Marcus T.",
    company: "Summit Roofing — Austin, TX",
    quote:
      "The trial appointments helped us see the quality before committing to a full package. The team was responsive and professional throughout the onboarding process.",
    rating: 5,
    verified: false,
    placeholder: true,
  },
  {
    name: "Priya K.",
    company: "ClearSky Contractors — Denver, CO",
    quote:
      "Having a clear package structure made it easy to compare options internally. We appreciated the personal follow-up and transparent communication from the start.",
    rating: 4,
    verified: false,
    placeholder: true,
  },
  {
    name: "James R.",
    company: "Apex Roof Solutions — Nashville, TN",
    quote:
      "The Growth package gave us the steady pipeline we needed. Monthly reports helped us track what was working and adjust our coverage area accordingly.",
    rating: 5,
    verified: false,
    placeholder: true,
  },
];

/**
 * Trust signals configuration.
 *
 * These are proof-placeholder values — clearly not real client
 * testimonials. Replace with verified data before going live.
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
    label: "Years in Business",
    value: "10+",
    description: "Serving the community with premium roofing solutions",
  },
  {
    label: "Projects Completed",
    value: "500+",
    description: "Residential and commercial roofing projects",
  },
  {
    label: "Customer Satisfaction",
    value: "4.9 / 5",
    description: "Based on verified client feedback",
  },
  {
    label: "Warranty Coverage",
    value: "Up to 25 yrs",
    description: "On select materials and workmanship",
  },
] as const;

/**
 * Proof-placeholder testimonials.
 *
 * These are NOT real client reviews. They are placeholders to demonstrate
 * layout. Replace with verified testimonials before launch.
 */
export const testimonials: Testimonial[] = [
  {
    name: "[Client Name]",
    location: "[City, State]",
    quote:
      '"Proof placeholder — replace with a verified client testimonial before launch. This space is reserved for real, consented client feedback."',
    verified: false,
  },
  {
    name: "[Client Name]",
    location: "[City, State]",
    quote:
      '"Proof placeholder — replace with a verified client testimonial before launch. This space is reserved for real, consented client feedback."',
    verified: false,
  },
  {
    name: "[Client Name]",
    location: "[City, State]",
    quote:
      '"Proof placeholder — replace with a verified client testimonial before launch. This space is reserved for real, consented client feedback."',
    verified: false,
  },
] as const;

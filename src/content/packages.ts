/**
 * Package configuration for Roofline Partners.
 *
 * Each package defines the appointment quantity, sample price,
 * benefits, and whether it should be highlighted as the recommended option.
 *
 * Pricing is illustrative only. Final availability and pricing are confirmed
 * by the Roofline team after a qualification request.
 */

export interface Package {
  id: string;
  name: string;
  /** Number of qualified appointments requested */
  appointmentQuantity: number;
  /** Display sample price — never a final purchase price */
  price: string;
  priceNote: string;
  /** Short description */
  description: string;
  /** Bullet-point benefits */
  benefits: string[];
  /** Whether this package is highlighted as the recommended option */
  highlighted: boolean;
  /** CTA button text */
  cta: string;
}

export const packages: Package[] = [
  {
    id: "trial",
    name: "Trial",
    appointmentQuantity: 2,
    price: "Complimentary",
    priceNote: "Available to qualifying roofing companies; subject to service-area fit.",
    description:
      "Request two trial appointments to evaluate fit before considering a paid package.",
    benefits: [
      "Two requested trial appointments",
      "Service-area and company fit review",
      "Personal onboarding follow-up",
      "No payment collected through this site",
    ],
    highlighted: false,
    cta: "Request the trial",
  },
  {
    id: "starter-10",
    name: "Starter",
    appointmentQuantity: 10,
    price: "$1,250",
    priceNote: "Sample price; final package terms are confirmed after qualification.",
    description: "A focused starting package for teams testing a new appointment channel.",
    benefits: [
      "10 requested roofing appointments",
      "Service-area alignment discussion",
      "Preferred-contact capture",
      "Manual onboarding before fulfillment",
    ],
    highlighted: false,
    cta: "Request Starter",
  },
  {
    id: "growth-20",
    name: "Growth",
    appointmentQuantity: 20,
    price: "$2,300",
    priceNote: "Sample price; final package terms are confirmed after qualification.",
    description: "A balanced appointment volume for teams ready to build a steadier pipeline.",
    benefits: [
      "20 requested roofing appointments",
      "Priority package review",
      "Service-area and qualification alignment",
      "Personal handoff to onboarding",
    ],
    highlighted: true,
    cta: "Request Growth",
  },
  {
    id: "scale-40",
    name: "Scale",
    appointmentQuantity: 40,
    price: "$4,200",
    priceNote: "Sample price; final package terms are confirmed after qualification.",
    description:
      "A higher-volume option for established teams with capacity for more conversations.",
    benefits: [
      "40 requested roofing appointments",
      "Capacity and coverage discussion",
      "Preferred-contact capture",
      "Manual onboarding before fulfillment",
    ],
    highlighted: false,
    cta: "Request Scale",
  },
] as const;

export function getPackageById(id: string): Package | undefined {
  return packages.find((p) => p.id === id);
}

/**
 * Package configuration for Roofline Partners.
 *
 * PLACEHOLDER — replace with client-approved pricing before launch.
 *
 * Each package defines the monthly price, lead features,
 * benefits, and whether it should be highlighted as the recommended option.
 *
 * Pricing below is sample/placeholder only. Final availability, pricing, and
 * terms are confirmed by the Roofline team after a qualification request.
 */

export interface Package {
  id: string;
  name: string;
  /** Monthly sample price — illustrative only, not a final purchase price */
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

// PLACEHOLDER — replace with client-approved pricing before launch.
export const packages: Package[] = [
  {
    id: "trial",
    name: "Trial",
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
    price: "$499/mo",
    priceNote: "SAMPLE — placeholder pricing; final terms confirmed after qualification.",
    description:
      "A focused starting package with basic lead capture for teams testing a new appointment channel.",
    benefits: [
      "10 qualified leads per month — placeholder volume; confirm with client before launch",
      "Basic lead capture and qualification form",
      "Google Sheets / Apps Script lead notifications",
      "Service-area alignment discussion",
      "Manual onboarding before fulfillment",
    ],
    highlighted: false,
    cta: "Request Starter",
  },
  {
    id: "growth-20",
    name: "Growth",
    price: "$899/mo",
    priceNote: "SAMPLE — placeholder pricing; final terms confirmed after qualification.",
    description:
      "Higher lead volume with priority routing and monthly reporting for teams ready to build a steadier pipeline.",
    benefits: [
      "20 qualified leads per month — placeholder volume; confirm with client before launch",
      "Priority lead routing",
      "Monthly performance report",
      "Google Sheets / Apps Script lead notifications",
      "Service-area and qualification alignment",
      "Personal handoff to onboarding",
    ],
    highlighted: true,
    cta: "Request Growth",
  },
  {
    id: "scale-40",
    name: "Pro / Scale",
    price: "$1,499/mo",
    priceNote: "SAMPLE — placeholder pricing; final terms confirmed after qualification.",
    description:
      "Our highest-tier option with exclusive territory protection and unlimited leads for established teams.",
    benefits: [
      "Unlimited qualified leads — placeholder; confirm with client before launch",
      "Exclusive territory protection",
      "Dedicated account contact",
      "Priority lead routing",
      "Monthly performance report",
      "Google Sheets / Apps Script lead notifications",
      "Manual onboarding before fulfillment",
    ],
    highlighted: false,
    cta: "Request Pro / Scale",
  },
] as const;

export function getPackageById(id: string): Package | undefined {
  return packages.find((p) => p.id === id);
}

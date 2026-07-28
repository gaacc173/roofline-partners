/**
 * Package configuration for Roofline Partners.
 *
 * Each package defines the appointment quantity, price placeholder,
 * benefits, and whether it should be highlighted as the recommended option.
 *
 * Pricing uses safe USD placeholders — no real client pricing is hard-coded.
 */

export interface Package {
  id: string;
  name: string;
  /** Number of consultation appointments included */
  appointmentQuantity: number;
  /** Display price — placeholder for future real pricing */
  price: string;
  /** Short description */
  description: string;
  /** Bullet-point benefits */
  benefits: string[];
  /** Whether this package is highlighted as the recommended option */
  highlighted: boolean;
  /** CTA button text */
  cta: string;
  /** Route slug for the package detail page */
  slug: string;
}

export const packages: Package[] = [
  {
    id: "inspection",
    name: "Roof Inspection",
    appointmentQuantity: 1,
    price: "$0",
    description: "Comprehensive roof assessment with detailed report and recommendations.",
    benefits: [
      "Professional visual inspection",
      "Detailed condition report",
      "Photo documentation",
      "No-obligation recommendations",
    ],
    highlighted: false,
    cta: "Book Free Inspection",
    slug: "inspection",
  },
  {
    id: "repair",
    name: "Repair & Restore",
    appointmentQuantity: 2,
    price: "From $1,500",
    description: "Targeted repairs and restoration to extend the life of your existing roof.",
    benefits: [
      "Free initial consultation",
      "Secondary follow-up assessment",
      "Quality materials included",
      "Warranty on all workmanship",
    ],
    highlighted: false,
    cta: "Get a Repair Quote",
    slug: "repair",
  },
  {
    id: "replacement",
    name: "Full Replacement",
    appointmentQuantity: 3,
    price: "Custom quote",
    description: "Complete roof replacement with premium materials and guaranteed installation.",
    benefits: [
      "Initial design consultation",
      "Material selection guidance",
      "Project management included",
      "Post-installation inspection",
      "Extended warranty coverage",
    ],
    highlighted: true,
    cta: "Request a Free Estimate",
    slug: "replacement",
  },
] as const;

export function getPackageById(id: string): Package | undefined {
  return packages.find((p) => p.id === id);
}

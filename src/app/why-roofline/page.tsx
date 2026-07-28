import { Container, SectionHeading } from "@/components/ui";
import { trustSignals } from "@/content/trust";

export const metadata = {
  title: "Why Roofline — Roofline Partners",
  description:
    "Discover why property owners choose Roofline Partners for premium roofing solutions.",
};

const reasons = [
  {
    title: "Premium Materials",
    description:
      "We source only industry-leading materials from trusted manufacturers, backed by extended warranties.",
  },
  {
    title: "Certified Craftsmen",
    description:
      "Every technician on our team is certified, insured, and trained in the latest roofing techniques.",
  },
  {
    title: "Transparent Pricing",
    description: "No hidden fees, no surprises. You get a detailed quote before any work begins.",
  },
  {
    title: "Warranty Protection",
    description:
      "Comprehensive workmanship warranties on all projects, plus manufacturer coverage on materials.",
  },
  {
    title: "Local Expertise",
    description:
      "Deep knowledge of local building codes, weather patterns, and material performance.",
  },
  {
    title: "Dedicated Support",
    description:
      "A single point of contact from your first call through project completion and beyond.",
  },
];

export default function WhyRooflinePage() {
  return (
    <Container size="xl">
      <SectionHeading
        tag="Why Choose Us"
        title="Why Roofline Partners?"
        subtitle="We combine craftsmanship, transparency, and dedication to deliver roofs that last."
        align="center"
      />

      {/* Trust signals */}
      <div className="mb-16 grid grid-cols-2 gap-6 lg:grid-cols-4">
        {trustSignals.map((signal) => (
          <div
            key={signal.label}
            className="rounded-lg border border-zinc-200 bg-white p-6 text-center dark:border-zinc-800 dark:bg-zinc-950"
          >
            <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">{signal.value}</p>
            <p className="mt-1 text-sm font-medium text-zinc-700 dark:text-zinc-300">
              {signal.label}
            </p>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{signal.description}</p>
          </div>
        ))}
      </div>

      {/* Reasons grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {reasons.map((reason) => (
          <div key={reason.title}>
            <h3 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              {reason.title}
            </h3>
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {reason.description}
            </p>
          </div>
        ))}
      </div>
    </Container>
  );
}

import { Container, SectionHeading } from "@/components/ui";
import { trustSignals } from "@/content/trust";
import { whyRooflineContent } from "@/content/marketing";

export const metadata = {
  title: whyRooflineContent.metadata.title,
  description: whyRooflineContent.metadata.description,
};

export default function WhyRooflinePage() {
  return (
    <Container size="xl">
      <SectionHeading
        tag={whyRooflineContent.eyebrow}
        title={whyRooflineContent.title}
        subtitle={whyRooflineContent.description}
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
        {whyRooflineContent.reasons.map((reason) => (
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

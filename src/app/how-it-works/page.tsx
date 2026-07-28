import { Container, SectionHeading } from "@/components/ui";
import { processContent } from "@/content/marketing";

export const metadata = {
  title: processContent.metadata.title,
  description: processContent.metadata.description,
};

export default function HowItWorksPage() {
  return (
    <Container size="xl">
      <SectionHeading
        tag={processContent.eyebrow}
        title={processContent.title}
        subtitle={processContent.description}
        align="center"
      />
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {processContent.steps.map((step) => (
          <div key={step.number} className="text-center">
            <span className="mb-4 inline-block rounded-full bg-zinc-100 px-4 py-2 text-sm font-bold text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50">
              {step.number}
            </span>
            <h3 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              {step.title}
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">{step.description}</p>
          </div>
        ))}
      </div>
    </Container>
  );
}

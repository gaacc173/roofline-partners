import { Container, SectionHeading } from "@/components/ui";

export const metadata = {
  title: "How It Works — Roofline Partners",
  description:
    "Learn how Roofline Partners delivers premium roofing solutions — from consultation to completion.",
};

const steps = [
  {
    number: "01",
    title: "Request a Consultation",
    description: "Fill out our contact form or call us to schedule a free roof assessment.",
  },
  {
    number: "02",
    title: "Get Your Assessment",
    description:
      "Our certified roofer inspects your property and provides a detailed report with recommendations.",
  },
  {
    number: "03",
    title: "Choose Your Plan",
    description:
      "Select the package that best fits your needs and budget. No pressure, no obligations.",
  },
  {
    number: "04",
    title: "We Deliver",
    description:
      "Our team completes the work on time, on budget, and to the highest quality standards.",
  },
];

export default function HowItWorksPage() {
  return (
    <Container size="xl">
      <SectionHeading
        tag="Our Process"
        title="How It Works"
        subtitle="A clear, transparent process from first call to final nail."
        align="center"
      />
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => (
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

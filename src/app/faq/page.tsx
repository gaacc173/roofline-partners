import { Container, SectionHeading } from "@/components/ui";
import { faqs } from "@/content/faqs";
import { FAQItem } from "./faq-item";

export const metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about LeadbyLead exclusive roofing appointments and scheduling.",
};

export default function FAQPage() {
  return (
    <Container size="md">
      <SectionHeading
        tag="FAQ"
        title="Frequently Asked Questions"
        subtitle="Answers to the questions we hear most often."
        align="center"
      />
      <div className="space-y-1">
        {faqs.map((faq) => (
          <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </Container>
  );
}

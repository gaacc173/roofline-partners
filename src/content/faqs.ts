/**
 * FAQ configuration.
 *
 * Frequently asked questions are stored here so components
 * can render them without hard-coded copy.
 */

export interface FAQ {
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    question: "How do I schedule a roof inspection?",
    answer:
      "You can schedule a free roof inspection by visiting our contact page or calling us directly. We typically confirm appointments within one business day.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "We serve the greater metropolitan region and surrounding communities. Contact us to confirm service availability in your area.",
  },
  {
    question: "Do you offer emergency repair services?",
    answer:
      "Yes, we provide emergency repair services for storm damage and urgent leaks. Call our dedicated line for immediate assistance.",
  },
  {
    question: "What types of roofing materials do you work with?",
    answer:
      "We work with asphalt shingles, metal roofing, tile, and flat roofing systems. Our team can help you choose the best material for your property.",
  },
  {
    question: "Are your roofers licensed and insured?",
    answer:
      "Yes, all Roofline Partners technicians are fully licensed and insured. We carry comprehensive liability and workers' compensation coverage.",
  },
  {
    question: "How long does a typical roof replacement take?",
    answer:
      "Most residential roof replacements are completed within 1–3 days depending on size and materials. We provide a detailed timeline during your consultation.",
  },
  {
    question: "Do you provide warranties?",
    answer:
      "Yes, all our work includes a workmanship warranty. Manufacturer warranties on materials vary by product and are provided at the time of installation.",
  },
  {
    question: "Can I get a free estimate?",
    answer:
      "Absolutely. We offer free estimates for all projects. Contact us to schedule your no-obligation consultation.",
  },
] as const;

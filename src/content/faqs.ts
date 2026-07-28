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
    question: "What does Roofline Partners provide?",
    answer:
      "Roofline Partners is an appointment-generation service for roofing companies. We help qualified teams request an appointment package and complete onboarding with our team.",
  },
  {
    question: "Who is the free trial for?",
    answer:
      "The two-appointment trial is intended for qualifying roofing companies. We review service area, capacity, and basic company context before confirming availability.",
  },
  {
    question: "Are package prices final?",
    answer:
      "No. Any amount shown is an illustrative sample for planning. Final availability, package terms, and payment are confirmed by our team after qualification.",
  },
  {
    question: "Is payment collected on this website?",
    answer:
      "No. Roofline Partners does not collect payment through this MVP website. A team member discusses final terms and payment after reviewing your request.",
  },
  {
    question: "What information do you need from my company?",
    answer:
      "We ask for your contact details, company name, service area, preferred contact method, selected package, and any context that helps us review fit.",
  },
  {
    question: "How will your team contact me?",
    answer:
      "You can choose WhatsApp, Telegram, email, or SMS in the qualification form. We use that preference when following up where possible.",
  },
  {
    question: "Can I request a package for more than one service area?",
    answer:
      "Yes. Include the relevant areas in your request notes. Our team will discuss coverage and capacity during onboarding.",
  },
  {
    question: "What happens after I submit a request?",
    answer:
      "Your request is reviewed by the Roofline Partners team. We follow up to confirm fit, availability, and the next step before any paid fulfillment begins.",
  },
] as const;

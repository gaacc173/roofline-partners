export interface FAQ {
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    question: "What does LeadbyLead provide?",
    answer:
      "LeadbyLead helps roofing companies connect with exclusive homeowner appointments. We handle the sourcing and qualification work so your team can focus on the customer conversation.",
  },
  {
    question: "What appointment types do you cover?",
    answer: "We cover storm repair, roof replacement, hail damage, and insurance jobs.",
  },
  {
    question: "Are appointments shared with other roofers?",
    answer:
      "No. We work toward one roofer per ZIP code, and a homeowner is never resold to a competing roofing company in your territory.",
  },
  {
    question: "How does pricing work?",
    answer:
      "There is no fixed public package price. Appointments are priced individually, and we discuss pricing and terms on your call based on your market and needs.",
  },
  {
    question: "What happens if a homeowner cancels or does not show?",
    answer: "We review cancellations and no-shows case by case and work with you to make it right.",
  },
  {
    question: "What do you need from my company?",
    answer:
      "Start with your name, company, contact details, ZIP code if you have one in mind, and a short message. We will cover the rest on the call.",
  },
  {
    question: "What happens after I submit the form?",
    answer:
      "We review your request and respond within 24 hours using the contact details you provided. The next step is a conversation about your territory, appointment needs, pricing, and terms.",
  },
] as const;

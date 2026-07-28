/**
 * Public marketing copy is deliberately centralized so factual claims can be
 * reviewed and updated without changing presentation components.
 */

export const homeContent = {
  eyebrow: "Roofing appointment packages",
  title: "More qualified conversations. A clearer path to growth.",
  description:
    "Roofline Partners helps roofing teams start with a practical appointment package, clear expectations, and a responsive onboarding conversation.",
  primaryCta: "Request 2 trial appointments",
  secondaryCta: "Compare packages",
  flowLabels: ["Choose a package", "Tell us about your coverage", "Confirm fit with our team"],
  proofPoints: [
    "Choose a package that fits your coverage",
    "Share your service area before onboarding",
    "Work with a team that follows up personally",
  ],
  preview: {
    eyebrow: "Choose your starting point",
    title: "Flexible packages for focused roofing teams",
    description:
      "Start with the complimentary trial or compare appointment quantities before you submit a no-obligation qualification request.",
  },
  quality: {
    eyebrow: "A better-fit starting point",
    title: "Built to turn intent into a useful first conversation.",
    description:
      "We ask for the details that help a real team assess fit before any package is confirmed.",
    items: [
      {
        title: "Service-area context",
        description: "Share where your team can realistically take on roofing work.",
      },
      {
        title: "Preferred follow-up",
        description: "Choose the channel and time that make it easier to connect.",
      },
      {
        title: "Capacity-aware packages",
        description: "Start with a quantity that matches your current sales capacity.",
      },
    ],
  },
  riskReversal: {
    title: "No card details. No automatic charge. No pressure to continue.",
    description:
      "This MVP uses a qualification-first process. A Roofline Partners team member confirms service-area fit, availability, final terms, and payment separately before paid fulfillment begins.",
    cta: "See how onboarding works",
  },
  faqPreview: {
    eyebrow: "Questions, answered",
    title: "The details before you decide",
    cta: "Read every FAQ",
  },
} as const;

export const processContent = {
  metadata: {
    title: "How it works",
    description:
      "See how to request a Roofline Partners appointment package and what happens next.",
  },
  eyebrow: "A clear onboarding path",
  title: "How it works",
  description: "A straightforward path from package selection to a conversation with our team.",
  steps: [
    {
      number: "01",
      title: "Compare packages",
      description:
        "Review appointment quantities, sample pricing, and the trial option at your own pace.",
    },
    {
      number: "02",
      title: "Tell us about your coverage",
      description:
        "Share the service areas, company context, and contact preferences that matter to your team.",
    },
    {
      number: "03",
      title: "We review your request",
      description:
        "Our team confirms whether the requested package is a fit and follows up using your preferred method.",
    },
    {
      number: "04",
      title: "Confirm and get started",
      description:
        "You review availability, final terms, and next steps with a person before any paid fulfillment begins.",
    },
  ],
} as const;

export const whyRooflineContent = {
  metadata: {
    title: "Why Roofline",
    description: "Learn what Roofline Partners is designed to make simpler for roofing teams.",
  },
  eyebrow: "Built around better conversations",
  title: "Why Roofline Partners",
  description:
    "A practical appointment-first process designed to give roofing teams more clarity before they commit.",
  reasons: [
    {
      title: "Appointment-first approach",
      description:
        "The focus is a scheduled opportunity for a real conversation, not an unfiltered contact list.",
    },
    {
      title: "Clear qualification context",
      description:
        "Your request captures service area, contact preferences, and business context before onboarding begins.",
    },
    {
      title: "Packages you can compare",
      description:
        "Appointment quantities and sample pricing are presented plainly, so your team can choose an appropriate starting point.",
    },
    {
      title: "Human follow-up",
      description:
        "A team member reviews requests and confirms next steps instead of leaving you to navigate an automated purchase flow.",
    },
    {
      title: "Trial before commitment",
      description:
        "Eligible companies can request two trial appointments before deciding whether a paid package makes sense.",
    },
    {
      title: "Built to grow with you",
      description:
        "The starting flow supports future reporting, CRM connections, and additional home-service categories without adding friction today.",
    },
  ],
} as const;

export const contactContent = {
  metadata: {
    title: "Contact",
    description: "Contact Roofline Partners to ask a question or discuss appointment packages.",
  },
  eyebrow: "Talk with our team",
  title: "Start with a conversation",
  description:
    "Have a question before choosing a package? Send your details and we will follow up through your preferred contact method.",
  formTitle: "Tell us a little about your team",
  formDescription: "We use this context to route your inquiry and prepare a useful follow-up.",
  submitLabel: "Send my inquiry",
  phoneLabel: "Call",
} as const;

export const getStartedContent = {
  metadata: {
    title: "Get started",
    description:
      "Choose a Roofline Partners appointment package and prepare your qualification request.",
  },
  eyebrow: "Choose your package",
  title: "Start with the appointment volume that fits your team.",
  description:
    "Select an option below. The secure qualification form is the next step and will confirm your service area, capacity, and preferred contact method.",
  unknownSelection: "Choose a package to begin your qualification request.",
  selectedLabel: "Selected package",
  nextStepTitle: "What happens next",
  nextStepDescription:
    "You will complete a short qualification form. A Roofline Partners team member then reviews fit before confirming availability, final terms, or payment.",
  contactCta: "Ask a question first",
  packageCta: "Compare all packages",
  formTitle: "Complete your qualification request",
  formDescription:
    "Share a few details so our team can review fit before confirming availability or final terms.",
  submitLabel: "Submit qualification request",
} as const;

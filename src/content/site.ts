export const site = {
  name: "LeadbyLead",
  tagline: "Exclusive roofing appointments, built around a better conversation.",
  description:
    "LeadbyLead helps roofing companies connect with exclusive homeowner appointments through a simple, human-first scheduling process.",
  email: "hello@leadbylead.com",
  phone: "(555) 000-0000",
  address: "Serving roofing companies across the United States",
  navLinks: [
    { label: "Home", href: "/" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Why LeadbyLead", href: "/why-roofline" },
    { label: "FAQ", href: "/faq" },
    { label: "Schedule a Call", href: "/#schedule-a-call" },
  ] as const,
  getStartedHref: "/#schedule-a-call",
  metadata: {
    defaultTitle: "Start with zero risk",
    description:
      "LeadbyLead connects roofing companies with exclusive homeowner appointments. Tell us your ZIP code and schedule a conversation with our team.",
  },
  footer: {
    copyright: `© ${new Date().getFullYear()} LeadbyLead. All rights reserved.`,
    links: [
      { label: "How It Works", href: "/how-it-works" },
      { label: "Why LeadbyLead", href: "/why-roofline" },
      { label: "FAQ", href: "/faq" },
      { label: "Schedule a Call", href: "/#schedule-a-call" },
    ],
  },
} as const;

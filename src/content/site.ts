/**
 * Site-wide configuration.
 *
 * Central source of truth for brand name, tagline, nav links,
 * and footer information. Components import from here instead of
 * hard-coding copy.
 */

export const site = {
  name: "Roofline Partners",
  tagline: "Premium roofing solutions for residential and commercial properties.",
  description:
    "Roofline Partners delivers premium roofing solutions for residential and commercial properties. Trusted craftsmanship, lasting results.",
  email: "info@rooflinepartners.com",
  phone: "(555) 000-0000",
  address: "Service area: Greater metropolitan region",
  navLinks: [
    { label: "Home", href: "/" },
    { label: "Packages", href: "/packages" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Why Roofline", href: "/why-roofline" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ] as const,
  getStartedHref: "/get-started",
  footer: {
    copyright: `© ${new Date().getFullYear()} Roofline Partners. All rights reserved.`,
    links: [
      { label: "Packages", href: "/packages" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
    ],
  },
} as const;

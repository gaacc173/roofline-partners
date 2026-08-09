import { site } from "@/content/site";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    description: site.description,
    url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    email: site.email,
    telephone: site.phone,
  };
}

export function serviceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Exclusive roofing appointments",
    description: site.metadata.description,
    provider: {
      "@type": "Organization",
      name: site.name,
    },
    serviceType: "Exclusive roofing appointment generation",
  };
}

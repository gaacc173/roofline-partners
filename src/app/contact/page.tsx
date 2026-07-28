import { Container, SectionHeading } from "@/components/ui";

export const metadata = {
  title: "Contact — Roofline Partners",
  description:
    "Get in touch with Roofline Partners. Request a free consultation or ask us anything.",
};

export default function ContactPage() {
  return (
    <Container size="md">
      <SectionHeading
        tag="Contact Us"
        title="Get in Touch"
        subtitle="We'd love to hear from you. Reach out for a free consultation or any questions."
        align="center"
      />
      <div className="mx-auto max-w-md space-y-6 rounded-lg border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-950">
        <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
          Contact form coming in the next milestone. For now, reach us at{" "}
          <a
            href="mailto:info@rooflinepartners.com"
            className="text-zinc-900 underline dark:text-zinc-50"
          >
            info@rooflinepartners.com
          </a>
        </p>
        <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
          Or call:{" "}
          <a href="tel:5550000000" className="text-zinc-900 dark:text-zinc-50">
            (555) 000-0000
          </a>
        </p>
      </div>
    </Container>
  );
}

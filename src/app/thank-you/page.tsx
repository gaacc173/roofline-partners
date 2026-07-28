import { Container, SectionHeading } from "@/components/ui";
import Link from "next/link";

export const metadata = {
  title: "Thank You — Roofline Partners",
  description: "Thank you for reaching out to Roofline Partners.",
};

export default function ThankYouPage() {
  return (
    <Container size="md">
      <SectionHeading
        tag="Thank You"
        title="We've Received Your Message"
        subtitle="A member of our team will get back to you shortly."
        align="center"
      />
      <div className="mx-auto max-w-md space-y-6 rounded-lg border border-zinc-200 bg-white p-8 text-center dark:border-zinc-800 dark:bg-zinc-950">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Thank you for your interest in Roofline Partners. We value your time and will respond
          promptly.
        </p>
        <Link
          href="/"
          className="inline-flex h-10 items-center justify-center rounded-md border border-zinc-200 bg-white px-5 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:bg-zinc-800"
        >
          Back to Home
        </Link>
      </div>
    </Container>
  );
}

import { Container, SectionHeading } from "@/components/ui";

export const metadata = {
  title: "Get Started — Roofline Partners",
  description: "Begin your roofing project with Roofline Partners.",
};

export default function GetStartedPage() {
  return (
    <Container size="md">
      <SectionHeading
        tag="Get Started"
        title="Ready to Get Started?"
        subtitle="Take the first step toward a better roof."
        align="center"
      />
      <div className="mx-auto max-w-md space-y-6 rounded-lg border border-zinc-200 bg-white p-8 text-center dark:border-zinc-800 dark:bg-zinc-950">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Our contact form will be available in the next milestone. In the meantime, you can reach
          us directly.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a
            href="/contact"
            className="inline-flex h-10 items-center justify-center rounded-md bg-zinc-900 px-5 text-sm font-medium text-zinc-50 transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Contact Us
          </a>
          <a
            href="/packages"
            className="inline-flex h-10 items-center justify-center rounded-md border border-zinc-200 bg-white px-5 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:bg-zinc-800"
          >
            View Packages
          </a>
        </div>
      </div>
    </Container>
  );
}

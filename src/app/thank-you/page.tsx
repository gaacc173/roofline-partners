import Link from "next/link";
import { Container } from "@/components/ui";

export const metadata = {
  title: "Request received",
  description: "LeadbyLead has received your scheduling request.",
};

export default function ThankYouPage() {
  return (
    <div className="py-20 sm:py-32">
      <Container size="md">
        <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-950 sm:p-12">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-2xl font-bold text-amber-900 dark:bg-amber-300/15 dark:text-amber-200">
            ✓
          </span>
          <p className="mt-7 text-sm font-bold tracking-[0.16em] text-amber-700 uppercase dark:text-amber-300">
            Request received
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl dark:text-white">
            Thank you for sharing your details.
          </h1>
          <p className="mt-5 text-base leading-7 text-slate-600 dark:text-slate-300">
            A LeadbyLead team member will review your request and follow up within 24 hours. We will
            discuss your territory, appointment needs, pricing, and terms on the call.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex min-h-11 items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100"
          >
            Back to home
          </Link>
        </div>
      </Container>
    </div>
  );
}

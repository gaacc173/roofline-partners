import { Container, SectionHeading } from "@/components/ui";
import { homeContent } from "@/content/marketing";
import { packages } from "@/content/packages";
import { trustSignals } from "@/content/trust";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-zinc-50 px-4 py-20 dark:bg-zinc-950 sm:px-6 sm:py-28 lg:px-8">
        <Container size="md" className="text-center">
          <p className="text-sm font-semibold tracking-[0.16em] text-amber-700 uppercase dark:text-amber-300">
            {homeContent.eyebrow}
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
            {homeContent.title}
          </h1>
          <p className="mt-5 text-lg text-zinc-600 dark:text-zinc-400 sm:text-xl">
            {homeContent.description}
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <a
              href="/get-started"
              className="inline-flex h-12 items-center justify-center rounded-md bg-zinc-900 px-7 text-base font-medium text-zinc-50 transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              {homeContent.primaryCta}
            </a>
            <a
              href="/packages"
              className="inline-flex h-12 items-center justify-center rounded-md border border-zinc-200 bg-white px-7 text-base font-medium text-zinc-900 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:bg-zinc-800"
            >
              {homeContent.secondaryCta}
            </a>
          </div>
        </Container>
      </section>

      {/* Trust signals */}
      <section className="border-y border-zinc-200 bg-white px-4 py-12 dark:border-zinc-800 dark:bg-zinc-950 sm:px-6 lg:px-8">
        <Container>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {trustSignals.map((signal) => (
              <div key={signal.label} className="text-center">
                <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">{signal.value}</p>
                <p className="mt-1 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  {signal.label}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Packages preview */}
      <section className="px-4 py-20 dark:px-0 sm:px-6 lg:px-8">
        <Container>
          <SectionHeading
            tag={homeContent.preview.eyebrow}
            title={homeContent.preview.title}
            subtitle={homeContent.preview.description}
            align="center"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {packages.slice(0, 3).map((pkg) => (
              <div
                key={pkg.id}
                className="rounded-lg border border-zinc-200 bg-white p-6 transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950"
              >
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                  {pkg.name}
                </h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{pkg.description}</p>
                <a
                  href={`/get-started?package=${pkg.id}`}
                  className="mt-4 inline-block text-sm font-medium text-zinc-900 underline decoration-zinc-300 hover:text-zinc-700 dark:text-zinc-50 dark:decoration-zinc-600 dark:hover:text-zinc-300"
                >
                  {pkg.cta} →
                </a>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}

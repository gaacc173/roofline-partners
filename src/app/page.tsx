import { AppointmentFlow, PackageCard, TestimonialCard } from "@/components/marketing";
import { Container, SectionHeading } from "@/components/ui";
import { faqs } from "@/content/faqs";
import { homeContent, processContent } from "@/content/marketing";
import { packages } from "@/content/packages";
import { testimonials } from "@/content/trust";

export default function Home() {
  return (
    <div className="overflow-hidden">
      <section className="relative isolate bg-slate-950 py-16 text-white sm:py-24 lg:py-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_rgba(245,158,11,0.20),_transparent_34%),radial-gradient(circle_at_bottom_left,_rgba(56,189,248,0.12),_transparent_34%)]" />
        <Container size="xl">
          <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
            <div>
              <p className="text-sm font-semibold tracking-[0.16em] text-amber-300 uppercase">
                {homeContent.eyebrow}
              </p>
              <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-[-0.04em] text-balance sm:text-6xl lg:text-7xl">
                {homeContent.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                {homeContent.description}
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="/get-started?package=trial"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl bg-amber-300 px-6 py-3 text-base font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-amber-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200"
                >
                  {homeContent.primaryCta}
                </a>
                <a
                  href="/packages"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-base font-semibold text-white transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {homeContent.secondaryCta}
                </a>
              </div>
              <ul className="mt-9 grid gap-3 text-sm text-slate-300 sm:grid-cols-3">
                {homeContent.proofPoints.map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <span className="mt-0.5 text-amber-300" aria-hidden="true">
                      ✓
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <AppointmentFlow labels={homeContent.flowLabels} />
          </div>
        </Container>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 py-6 dark:border-slate-800 dark:bg-slate-900/40">
        <Container size="xl">
          <div className="grid gap-5 text-center sm:grid-cols-3 sm:text-left">
            {homeContent.proofPoints.map((point, index) => (
              <div key={point} className="flex items-center justify-center gap-3 sm:justify-start">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-900 dark:bg-amber-300/15 dark:text-amber-200">
                  0{index + 1}
                </span>
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                  {point}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container size="xl">
          <SectionHeading
            tag={homeContent.preview.eyebrow}
            title={homeContent.preview.title}
            subtitle={homeContent.preview.description}
            align="center"
            className="mx-auto max-w-3xl"
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {packages.slice(0, 3).map((packageItem) => (
              <PackageCard key={packageItem.id} packageItem={packageItem} compact />
            ))}
          </div>
          <div className="mt-9 text-center">
            <a
              href="/packages"
              className="text-sm font-bold text-slate-950 underline decoration-amber-400 decoration-2 underline-offset-4 transition hover:text-slate-600 dark:text-white dark:hover:text-slate-300"
            >
              Compare every package →
            </a>
          </div>
        </Container>
      </section>

      <section className="bg-slate-50 py-20 dark:bg-slate-900/40 sm:py-28">
        <Container size="xl">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <SectionHeading
              tag={homeContent.quality.eyebrow}
              title={homeContent.quality.title}
              subtitle={homeContent.quality.description}
            />
            <div className="grid gap-5 sm:grid-cols-3">
              {homeContent.quality.items.map((item, index) => (
                <article
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950"
                >
                  <span className="text-sm font-bold text-amber-700 dark:text-amber-300">
                    0{index + 1}
                  </span>
                  <h3 className="mt-5 text-lg font-bold tracking-tight text-slate-950 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container size="xl">
          <SectionHeading
            tag={processContent.eyebrow}
            title={processContent.title}
            subtitle={processContent.description}
            align="center"
            className="mx-auto max-w-3xl"
          />
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {processContent.steps.map((step) => (
              <li
                key={step.number}
                className="relative rounded-2xl border border-slate-200 p-6 dark:border-slate-800"
              >
                <span className="text-sm font-bold tracking-[0.14em] text-amber-700 dark:text-amber-300">
                  {step.number}
                </span>
                <h3 className="mt-5 text-lg font-bold text-slate-950 dark:text-white">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="pb-20 sm:pb-28">
        <Container size="xl">
          <div className="overflow-hidden rounded-3xl bg-amber-100 p-8 text-slate-950 dark:bg-amber-300 sm:p-12">
            <div className="max-w-3xl">
              <p className="text-sm font-bold tracking-[0.15em] text-amber-900 uppercase">
                Qualification first
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                {homeContent.riskReversal.title}
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-800">
                {homeContent.riskReversal.description}
              </p>
              <a
                href="/how-it-works"
                className="mt-8 inline-flex min-h-11 items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950"
              >
                {homeContent.riskReversal.cta}
              </a>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 py-20 dark:border-slate-800 dark:bg-slate-900/40 sm:py-28">
        <Container size="xl">
          <SectionHeading
            tag="Testimonials"
            title="What roofing teams are saying"
            subtitle="Placeholder testimonials demonstrating layout. These will be replaced with verified client reviews before launch."
            align="center"
            className="mx-auto max-w-3xl"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <TestimonialCard key={t.name + t.quote} testimonial={t} />
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
            All testimonials shown are sample placeholders and have not been verified.
          </p>
        </Container>
      </section>

      <section className="border-t border-slate-200 py-20 dark:border-slate-800 sm:py-28">
        <Container size="lg">
          <SectionHeading
            tag={homeContent.faqPreview.eyebrow}
            title={homeContent.faqPreview.title}
            align="center"
            className="mx-auto max-w-2xl"
          />
          <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 dark:divide-slate-800 dark:border-slate-800">
            {faqs.slice(0, 4).map((faq) => (
              <div key={faq.question} className="p-6">
                <h3 className="font-bold text-slate-950 dark:text-white">{faq.question}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center">
            <a
              href="/faq"
              className="font-bold text-slate-950 underline decoration-amber-400 decoration-2 underline-offset-4 dark:text-white"
            >
              {homeContent.faqPreview.cta} →
            </a>
          </p>
        </Container>
      </section>
    </div>
  );
}

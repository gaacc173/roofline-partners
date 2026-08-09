import { LeadForm } from "@/components/forms/LeadForm";
import { AppointmentFlow } from "@/components/marketing";
import { Container, SectionHeading } from "@/components/ui";
import { faqs } from "@/content/faqs";
import { homeContent, processContent } from "@/content/marketing";

export default function Home() {
  return (
    <div className="overflow-hidden">
      <section className="relative isolate bg-slate-950 py-16 text-white sm:py-24 lg:py-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_rgba(245,158,11,0.20),_transparent_34%),radial-gradient(circle_at_bottom_left,_rgba(56,189,248,0.12),_transparent_34%)]" />
        <Container size="xl">
          <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
            <div className="animate-fade-in-up">
              <p className="text-sm font-semibold tracking-[0.16em] text-amber-300 uppercase">
                {homeContent.eyebrow}
              </p>
              <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-[-0.04em] text-balance sm:text-6xl lg:text-7xl">
                {homeContent.title}
              </h1>
              <p className="mt-5 text-lg font-semibold text-amber-200 sm:text-xl">
                {homeContent.subheading}
              </p>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                {homeContent.description}
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#schedule-a-call"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl bg-amber-300 px-6 py-3 text-base font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-amber-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200"
                >
                  {homeContent.primaryCta}
                </a>
                <a
                  href="#how-it-works"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/30 bg-white/5 px-6 py-3 text-base font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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

      <section
        id="schedule-a-call"
        className="scroll-mt-24 bg-slate-50 py-16 dark:bg-slate-900/40 sm:py-24"
      >
        <Container size="lg">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-16">
            <div className="animate-fade-in-up">
              <SectionHeading
                tag={homeContent.quality.eyebrow}
                title="Tell Us About Your ZIP Code"
                subtitle="Share a little context and choose a time for a call. We will respond within 24 hours."
              />
              <p className="-mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {homeContent.appointmentTypes}
              </p>
              <p className="mt-4 text-sm font-semibold text-slate-800 dark:text-slate-100">
                Have a high-volume need? Mention it in your message — we&apos;ll cover pricing and
                terms on your call.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-300 bg-white p-6 shadow-xl shadow-slate-900/5 dark:border-slate-700 dark:bg-slate-950 sm:p-8">
              <h2 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
                Schedule a conversation
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                No packages to compare and no payment details here — just a straightforward first
                call.
              </p>
              <div className="mt-7">
                <LeadForm submitLabel={homeContent.primaryCta} />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-slate-200 bg-white py-6 dark:border-slate-800 dark:bg-slate-950">
        <Container size="xl">
          <p className="text-center text-sm font-semibold text-slate-700 dark:text-slate-200">
            {homeContent.appointmentTypes}
          </p>
        </Container>
      </section>

      <section id="how-it-works" className="scroll-mt-24 py-20 sm:py-28">
        <Container size="xl">
          <SectionHeading
            tag={processContent.eyebrow}
            title={processContent.title}
            subtitle={processContent.description}
            align="center"
            className="mx-auto max-w-3xl"
          />
          <ol className="grid gap-5 sm:grid-cols-3">
            {processContent.steps.map((step) => (
              <li
                key={step.number}
                className="animate-fade-in-up rounded-2xl border border-slate-300 p-6 transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-700"
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
                  className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-950"
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

      <section className="pb-20 pt-20 sm:pb-28 sm:pt-28">
        <Container size="xl">
          <div className="overflow-hidden rounded-3xl bg-amber-100 p-8 text-slate-950 dark:bg-amber-300 sm:p-12">
            <div className="max-w-3xl">
              <p className="text-sm font-bold tracking-[0.15em] text-amber-900 uppercase">
                Our promise to roofers
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                {homeContent.riskReversal.title}
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-800">
                {homeContent.riskReversal.description}
              </p>
              <a
                href="#schedule-a-call"
                className="mt-8 inline-flex min-h-11 items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950"
              >
                {homeContent.riskReversal.cta}
              </a>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-slate-300 py-20 dark:border-slate-700 sm:py-28">
        <Container size="lg">
          <SectionHeading
            tag={homeContent.faqPreview.eyebrow}
            title={homeContent.faqPreview.title}
            align="center"
            className="mx-auto max-w-2xl"
          />
          <div className="divide-y divide-slate-300 rounded-2xl border border-slate-300 dark:divide-slate-700 dark:border-slate-700">
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

import { LeadForm } from "@/components/forms/LeadForm";
import { Container, SectionHeading } from "@/components/ui";
import { contactContent } from "@/content/marketing";
import { site } from "@/content/site";

export const metadata = {
  title: contactContent.metadata.title,
  description: contactContent.metadata.description,
};

export default function ContactPage() {
  return (
    <div className="py-16 sm:py-24">
      <Container size="xl">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          <div>
            <SectionHeading
              tag={contactContent.eyebrow}
              title={contactContent.title}
              subtitle={contactContent.description}
            />
            <div className="rounded-2xl bg-slate-950 p-7 text-white">
              <p className="text-sm font-bold tracking-[0.14em] text-amber-300 uppercase">
                Prefer direct contact?
              </p>
              <a
                href={`mailto:${site.email}`}
                className="mt-5 block text-lg font-bold underline decoration-amber-300 underline-offset-4"
              >
                {site.email}
              </a>
              <a
                href={`tel:${site.phone.replace(/\D/g, "")}`}
                className="mt-3 block text-sm text-slate-300"
              >
                {site.phone}
              </a>
            </div>
          </div>
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950 sm:p-8">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
              {contactContent.formTitle}
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
              {contactContent.formDescription}
            </p>
            <div className="mt-7">
              <LeadForm source="contact" submitLabel={contactContent.submitLabel} />
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
}

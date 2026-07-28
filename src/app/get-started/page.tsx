import { PackageCard } from "@/components/marketing";
import { LeadForm } from "@/components/forms/LeadForm";
import { Container, SectionHeading } from "@/components/ui";
import { getStartedContent } from "@/content/marketing";
import { getPackageById, packages } from "@/content/packages";

export const metadata = {
  title: getStartedContent.metadata.title,
  description: getStartedContent.metadata.description,
};

interface GetStartedPageProps {
  searchParams: Promise<{ package?: string }>;
}

export default async function GetStartedPage({ searchParams }: GetStartedPageProps) {
  const { package: packageId } = await searchParams;
  const selectedPackage = packageId ? getPackageById(packageId) : undefined;

  return (
    <div className="py-16 sm:py-24">
      <Container size="xl">
        <SectionHeading
          tag={getStartedContent.eyebrow}
          title={getStartedContent.title}
          subtitle={getStartedContent.description}
          align="center"
          className="mx-auto max-w-3xl"
        />
        {selectedPackage ? (
          <section aria-label={getStartedContent.selectedLabel} className="mx-auto mb-12 max-w-xl">
            <p className="mb-3 text-center text-sm font-semibold tracking-[0.14em] text-amber-700 uppercase dark:text-amber-300">
              {getStartedContent.selectedLabel}
            </p>
            <PackageCard packageItem={selectedPackage} selected />
          </section>
        ) : (
          <p className="mx-auto mb-12 max-w-2xl text-center text-sm text-slate-600 dark:text-slate-300">
            {getStartedContent.unknownSelection}
          </p>
        )}
        <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <div className="grid gap-5 sm:grid-cols-2">
            {packages.map((packageItem) => (
              <PackageCard
                key={packageItem.id}
                packageItem={packageItem}
                compact
                selected={packageItem.id === selectedPackage?.id}
              />
            ))}
          </div>
          <aside className="h-fit rounded-2xl bg-slate-950 p-7 text-white lg:sticky lg:top-24">
            {selectedPackage ? (
              <>
                <h2 className="text-xl font-bold">{getStartedContent.formTitle}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  {getStartedContent.formDescription}
                </p>
                <div className="mt-6 rounded-2xl bg-white p-5 text-slate-950">
                  <LeadForm
                    source={selectedPackage.id === "trial" ? "trial" : "package"}
                    selectedPackage={selectedPackage.id}
                    submitLabel={getStartedContent.submitLabel}
                  />
                </div>
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold">{getStartedContent.nextStepTitle}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  {getStartedContent.nextStepDescription}
                </p>
                <a
                  href="/contact"
                  className="mt-7 inline-flex min-h-11 items-center justify-center rounded-xl bg-amber-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-200"
                >
                  {getStartedContent.contactCta}
                </a>
                <a
                  href="/packages"
                  className="mt-4 block text-sm font-semibold text-amber-200 underline underline-offset-4"
                >
                  {getStartedContent.packageCta} →
                </a>
              </>
            )}
          </aside>
        </div>
      </Container>
    </div>
  );
}

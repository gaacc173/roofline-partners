import { Container, SectionHeading, Badge } from "@/components/ui";
import { packages } from "@/content/packages";

export const metadata = {
  title: "Packages — Roofline Partners",
  description: "Explore our roofing packages: free inspections, repairs, and full replacements.",
};

export default function PackagesPage() {
  return (
    <Container size="xl">
      <SectionHeading
        tag="Our Packages"
        title="Roofing Solutions for Every Need"
        subtitle="From free inspections to full replacements, we have a plan that fits your property."
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={`relative flex flex-col rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 ${
              pkg.highlighted ? "ring-2 ring-zinc-900 dark:ring-zinc-100" : ""
            }`}
          >
            {pkg.highlighted && (
              <div className="absolute -top-3 left-4">
                <Badge variant="default">Recommended</Badge>
              </div>
            )}
            <h3 className="mt-2 text-xl font-bold text-zinc-900 dark:text-zinc-50">{pkg.name}</h3>
            <p className="mt-1 text-2xl font-bold text-zinc-900 dark:text-zinc-50">{pkg.price}</p>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{pkg.description}</p>
            <ul className="mt-4 flex-1 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
              {pkg.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400" />
                  {benefit}
                </li>
              ))}
            </ul>
            <a
              href="/get-started"
              className="mt-6 inline-block w-full rounded-md bg-zinc-900 px-4 py-2.5 text-center text-sm font-medium text-zinc-50 transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              {pkg.cta}
            </a>
          </div>
        ))}
      </div>
    </Container>
  );
}

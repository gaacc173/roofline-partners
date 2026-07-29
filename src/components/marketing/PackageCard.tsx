import type { Package } from "@/content/packages";
import { Badge, Card } from "@/components/ui";
import { cn } from "@/lib/cn";

interface PackageCardProps {
  packageItem: Package;
  compact?: boolean;
  selected?: boolean;
}

export function PackageCard({ packageItem, compact = false, selected = false }: PackageCardProps) {
  return (
    <Card
      variant={packageItem.highlighted ? "elevated" : "default"}
      className={cn(
        "relative flex h-full flex-col p-6",
        packageItem.highlighted &&
          "border-slate-900 ring-1 ring-slate-900 dark:border-amber-300 dark:ring-amber-300",
        selected && "border-amber-500 ring-2 ring-amber-400",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-[0.14em] text-slate-500 uppercase">
            Monthly package
          </p>
          <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
            {packageItem.name}
          </h3>
        </div>
        {packageItem.highlighted && <Badge variant="default">Most selected</Badge>}
      </div>
      <p className="mt-5 text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
        {packageItem.price}
      </p>
      <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
        {packageItem.priceNote}
      </p>
      <p className="mt-5 text-sm leading-6 text-slate-600 dark:text-slate-300">
        {packageItem.description}
      </p>
      {!compact && (
        <ul className="mt-6 space-y-3 text-sm text-slate-700 dark:text-slate-200">
          {packageItem.benefits.map((benefit) => (
            <li key={benefit} className="flex gap-3">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-900 dark:bg-amber-300/20 dark:text-amber-200">
                ✓
              </span>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      )}
      <a
        href={`/get-started?package=${packageItem.id}`}
        className="mt-7 inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 dark:focus-visible:outline-white"
      >
        {packageItem.cta}
      </a>
    </Card>
  );
}

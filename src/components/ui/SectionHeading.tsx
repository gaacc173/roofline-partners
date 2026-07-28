import { cn } from "@/lib/cn";
import { forwardRef } from "react";

export interface SectionHeadingProps {
  tag?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export const SectionHeading = forwardRef<HTMLDivElement, SectionHeadingProps>(
  ({ tag, title, subtitle, align = "left", className }, ref) => {
    return (
      <div ref={ref} className={cn("mb-10", align === "center" && "text-center", className)}>
        {tag && (
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            {tag}
          </p>
        )}
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-3 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">{subtitle}</p>
        )}
      </div>
    );
  },
);

SectionHeading.displayName = "SectionHeading";

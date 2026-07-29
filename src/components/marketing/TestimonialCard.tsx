import type { Testimonial } from "@/content/trust";
import { Badge, Card } from "@/components/ui";
import { cn } from "@/lib/cn";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

function StarRating({ rating, isPlaceholder }: { rating: number; isPlaceholder: boolean }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span
        key={i}
        className={cn(
          "text-base",
          i <= rating ? "text-amber-400" : "text-zinc-300 dark:text-zinc-600",
        )}
        aria-hidden="true"
      >
        {i <= rating ? "\u2605" : "\u2606"}
      </span>,
    );
  }
  return (
    <div className="flex items-center gap-1" role="img" aria-label={`${rating} out of 5 stars`}>
      {stars}
      {isPlaceholder && (
        <span className="ml-2 text-xs font-medium text-amber-700 dark:text-amber-300">
          (sample)
        </span>
      )}
    </div>
  );
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const isPlaceholder = testimonial.placeholder;

  return (
    <Card className="flex h-full flex-col p-6">
      <div className="flex items-start justify-between gap-3">
        <blockquote className="flex-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>
        {isPlaceholder && (
          <Badge variant="warning" className="shrink-0">
            Sample
          </Badge>
        )}
      </div>
      <div className="mt-5 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-950 dark:text-white">{testimonial.name}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">{testimonial.company}</p>
        </div>
        <StarRating rating={testimonial.rating} isPlaceholder={isPlaceholder} />
      </div>
    </Card>
  );
}

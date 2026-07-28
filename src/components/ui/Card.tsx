import { cn } from "@/lib/cn";
import { forwardRef } from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "bordered";
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg bg-white transition-shadow",
          variant === "default" && "border border-zinc-200 dark:bg-zinc-950 dark:border-zinc-800",
          variant === "elevated" &&
            "border border-zinc-200 shadow-lg dark:bg-zinc-950 dark:border-zinc-800",
          variant === "bordered" && "border border-zinc-200 dark:bg-zinc-950 dark:border-zinc-800",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = "Card";

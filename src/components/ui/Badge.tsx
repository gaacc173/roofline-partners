import { cn } from "@/lib/cn";
import { forwardRef } from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "outline";
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
          variant === "default" && "bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900",
          variant === "success" &&
            "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
          variant === "warning" &&
            "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
          variant === "outline" &&
            "border border-zinc-200 text-zinc-700 dark:border-zinc-700 dark:text-zinc-300",
          className,
        )}
        {...props}
      >
        {children}
      </span>
    );
  },
);

Badge.displayName = "Badge";

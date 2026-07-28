import { cn } from "@/lib/cn";
import { forwardRef } from "react";

export interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
  size?: "sm" | "md" | "lg" | "xl";
}

export const Container = forwardRef<HTMLElement, ContainerProps>(
  ({ className, size = "lg", children, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(
          "mx-auto w-full px-4 sm:px-6 lg:px-8",
          size === "sm" && "max-w-2xl",
          size === "md" && "max-w-4xl",
          size === "lg" && "max-w-6xl",
          size === "xl" && "max-w-7xl",
          className,
        )}
        {...props}
      >
        {children}
      </section>
    );
  },
);

Container.displayName = "Container";

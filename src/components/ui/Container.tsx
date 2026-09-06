import type { ReactNode } from "react";

const WIDTHS = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
} as const;

export function Container({
  children,
  width = "lg",
  className = "",
}: {
  children: ReactNode;
  width?: keyof typeof WIDTHS;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full ${WIDTHS[width]} px-5 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

import type { ReactNode } from "react";

/** Small uppercase label that opens a section. */
export function Eyebrow({
  children,
  tone = "light",
  className = "",
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <p
      className={`text-[0.6875rem] font-semibold uppercase tracking-[0.16em] ${
        tone === "dark" ? "text-aqua-300" : "text-brand-600"
      } ${className}`}
    >
      {children}
    </p>
  );
}

import Link from "next/link";
import { DISCLAIMER } from "@/lib/site";

/**
 * The site-wide disclaimer. Every page renders one of these variants so the
 * "not an official determination" statement is never more than a screen away.
 */
export function DisclaimerNote({
  variant = "card",
  className = "",
}: {
  variant?: "card" | "inline" | "strip" | "onDark";
  className?: string;
}) {
  if (variant === "inline") {
    return (
      <p className={`text-[0.8125rem] leading-relaxed text-ink-soft ${className}`}>
        <span className="font-semibold text-ink">Informational only.</span> {DISCLAIMER.short}{" "}
        <Link href="/faq#disclaimer" className="font-medium text-brand-700 underline underline-offset-2">
          Read the full disclaimer
        </Link>
        .
      </p>
    );
  }

  if (variant === "onDark") {
    return (
      <div
        className={`rounded-2xl border border-white/12 bg-white/6 p-4 text-[0.8125rem] leading-relaxed text-slate-300 backdrop-blur-sm ${className}`}
      >
        <span className="font-semibold text-white">Informational only.</span> {DISCLAIMER.short}{" "}
        <Link href="/faq#disclaimer" className="font-medium text-aqua-300 underline underline-offset-2">
          Full disclaimer
        </Link>
        .
      </div>
    );
  }

  if (variant === "strip") {
    return (
      <div
        className={`flex items-start gap-2.5 border-y border-slate-200 bg-white/60 px-4 py-3 text-[0.8125rem] leading-relaxed text-ink-soft ${className}`}
      >
        <ShieldIcon />
        <p>
          <span className="font-semibold text-ink">Not a lender determination.</span>{" "}
          {DISCLAIMER.short}
        </p>
      </div>
    );
  }

  return (
    <aside
      className={`print-plain rounded-2xl border border-slate-200 bg-white p-5 shadow-card ${className}`}
      aria-label="Disclaimer"
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 shrink-0 text-brand-600">
          <ShieldIcon />
        </span>
        <div className="space-y-1.5">
          <h2 className="text-sm font-semibold text-ink">Important — read this first</h2>
          <p className="text-[0.8125rem] leading-relaxed text-ink-soft">{DISCLAIMER.short}</p>
          <p className="text-[0.8125rem] leading-relaxed text-ink-soft">
            <Link
              href="/faq#disclaimer"
              className="font-medium text-brand-700 underline underline-offset-2 hover:text-brand-800"
            >
              Full disclaimer and limitations
            </Link>
          </p>
        </div>
      </div>
    </aside>
  );
}

function ShieldIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="size-[18px] shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M10 2.5 4 4.6v4.6c0 3.5 2.4 6.7 6 8.3 3.6-1.6 6-4.8 6-8.3V4.6L10 2.5Z" />
      <path d="M10 7.6v3.2" />
      <path d="M10 13.3h.01" />
    </svg>
  );
}

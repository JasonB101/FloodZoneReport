import Link from "next/link";

/**
 * Always-on notice at the very top of the app. Demo mode is a product-level
 * fact in this build, not a dismissible toast, so it is intentionally static.
 */
export function DemoModeBanner() {
  return (
    <div className="no-print relative z-50 border-b border-amber-300/60 bg-amber-50 text-amber-950">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-center gap-x-3 gap-y-1 px-5 py-2 text-center text-[0.8125rem] leading-snug sm:px-6 lg:px-8">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 px-2 py-0.5 font-semibold uppercase tracking-[0.1em] text-[0.6875rem] text-amber-900 ring-1 ring-amber-500/30">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-amber-500 opacity-70" />
            <span className="relative inline-flex size-1.5 rounded-full bg-amber-600" />
          </span>
          Demo mode
        </span>
        <span className="max-w-2xl">
          Sample data only — no FEMA, geocoding, or payment services are called. Flood zones,
          elevations, and prices shown are fabricated for design review.
        </span>
        <Link
          href="/faq#demo-mode"
          className="font-semibold text-amber-900 underline decoration-amber-400 decoration-2 underline-offset-2 hover:text-amber-950"
        >
          What that means
        </Link>
      </div>
    </div>
  );
}

import Link from "next/link";
import type { FloodReport } from "@/lib/demo-data";
import { zoneDisplayLabel, zoneOf } from "@/lib/demo-data";
import { RISK_TIER_STYLES } from "@/lib/zones";

export function SampleAddressCard({
  report,
  compact = false,
}: {
  report: FloodReport;
  compact?: boolean;
}) {
  const zone = zoneOf(report);
  const tier = RISK_TIER_STYLES[zone.riskTier];

  return (
    <Link
      href={`/report/${report.slug}`}
      className="group relative flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lift sm:p-5"
    >
      <span
        className={`flex size-12 shrink-0 flex-col items-center justify-center rounded-xl font-serif text-xl font-semibold leading-none ring-1 ${tier.badge}`}
      >
        {zone.label}
        {zone.qualifier && (
          <span className="mt-0.5 text-[0.5rem] font-sans font-semibold uppercase tracking-wider opacity-75">
            {zone.qualifier.slice(0, 3)}
          </span>
        )}
      </span>

      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[0.6875rem] font-semibold ring-1 ${tier.badge}`}>
            <span className={`size-1.5 rounded-full ${tier.dot}`} />
            {report.sampleTag}
          </span>
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[0.6875rem] font-medium text-ink-soft">
            SFHA {zone.sfha ? "yes" : "no"}
          </span>
        </span>

        <span className="mt-2 block truncate text-[0.9375rem] font-semibold text-ink">
          {report.address.line1}
        </span>
        <span className="block text-[0.8125rem] text-ink-soft">
          {report.address.city}, {report.address.state} {report.address.zip}
        </span>

        {!compact && (
          <span className="mt-2 block text-[0.8125rem] leading-relaxed text-ink-soft">
            {report.sampleReason}
          </span>
        )}

        <span className="mt-2.5 inline-flex items-center gap-1 text-[0.8125rem] font-semibold text-brand-700">
          View {zoneDisplayLabel(zone)} report
          <svg
            viewBox="0 0 16 16"
            className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M3 8h9" />
            <path d="M8.5 4.5 12 8l-3.5 3.5" />
          </svg>
        </span>
      </span>
    </Link>
  );
}

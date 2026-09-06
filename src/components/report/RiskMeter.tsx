import { RISK_TIER_SCALE, RISK_TIER_STYLES, type RiskTier } from "@/lib/zones";

const STOPS: { tier: RiskTier; label: string }[] = [
  { tier: "minimal", label: "Minimal" },
  { tier: "moderate", label: "Moderate" },
  { tier: "elevated", label: "Elevated" },
  { tier: "high", label: "High" },
];

export function RiskMeter({ tier }: { tier: RiskTier }) {
  const position = RISK_TIER_SCALE[tier];
  const styles = RISK_TIER_STYLES[tier];

  return (
    <div className="print-avoid-break">
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-ink-soft">
          Mapped hazard level
        </p>
        <p className={`text-sm font-semibold ${styles.text}`}>{styles.label}</p>
      </div>

      <div
        className="relative mt-3 h-2.5 rounded-full bg-gradient-to-r from-emerald-300 via-amber-300 to-rose-400"
        role="img"
        aria-label={`Mapped hazard level: ${styles.label}`}
      >
        <span
          className="absolute top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white bg-ink shadow-[0_1px_6px_rgba(11,26,41,0.35)]"
          style={{ left: `${position}%` }}
        />
      </div>

      <div className="mt-2.5 flex justify-between text-[0.6875rem] font-medium text-ink-soft">
        {STOPS.map((stop) => (
          <span key={stop.tier} className={stop.tier === tier ? `font-semibold ${styles.text}` : ""}>
            {stop.label}
          </span>
        ))}
      </div>
    </div>
  );
}

import type { FloodReport } from "@/lib/demo-data";

/**
 * Cross-section showing the structure's ground elevation against the Base Flood
 * Elevation. Rendered only for zones where FEMA publishes a BFE.
 */
export function ElevationDiagram({ report }: { report: FloodReport }) {
  const { bfe, groundElevation, datum } = report.elevation;
  if (bfe === null) return null;

  const delta = groundElevation - bfe;
  const belowBfe = delta < 0;
  const groundY = 92;
  /* One foot of difference reads as 5 units, clamped so extremes stay on canvas. */
  const waterY = Math.min(96, Math.max(20, groundY + delta * 5));

  return (
    <div className="print-avoid-break rounded-2xl border border-slate-200 bg-white p-5 shadow-card print-plain">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="text-sm font-semibold text-ink">Ground level vs. Base Flood Elevation</h3>
        <p className="font-mono text-[0.6875rem] text-ink-soft">Vertical datum {datum}</p>
      </div>

      <svg viewBox="0 0 320 120" className="mt-4 block w-full" role="img" aria-label={report.elevation.note}>
        <defs>
          <linearGradient id={`water-${report.slug}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7cc0e0" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#2f8fbf" stopOpacity="0.45" />
          </linearGradient>
        </defs>

        {/* Ground */}
        <path
          d={`M0 ${groundY} L320 ${groundY} L320 120 L0 120 Z`}
          fill="#e7ded2"
          stroke="#c8b9a5"
          strokeWidth="1"
        />

        {/* Flood water at the BFE */}
        <rect x="0" y={waterY} width="320" height={Math.max(0, 120 - waterY)} fill={`url(#water-${report.slug})`} />
        <line x1="0" y1={waterY} x2="320" y2={waterY} stroke="#1e88bf" strokeWidth="1.6" />

        {/* Structure */}
        <g>
          <rect x="176" y={groundY - 34} width="86" height="34" fill="#ffffff" stroke="#8fa3b3" strokeWidth="1.4" />
          <path d={`M170 ${groundY - 34} L219 ${groundY - 56} L268 ${groundY - 34} Z`} fill="#f1f5f8" stroke="#8fa3b3" strokeWidth="1.4" />
          <rect x="192" y={groundY - 24} width="16" height="14" fill="#dcebf4" stroke="#8fa3b3" strokeWidth="1" />
          <rect x="230" y={groundY - 24} width="16" height="14" fill="#dcebf4" stroke="#8fa3b3" strokeWidth="1" />
        </g>

        {/* BFE annotation */}
        <g>
          <line x1="16" y1={waterY} x2="16" y2={groundY} stroke="#0b1a29" strokeWidth="1" strokeDasharray="3 2" />
          <line x1="11" y1={waterY} x2="21" y2={waterY} stroke="#0b1a29" strokeWidth="1.2" />
          <line x1="11" y1={groundY} x2="21" y2={groundY} stroke="#0b1a29" strokeWidth="1.2" />
          <text x="28" y={waterY - 5} fontSize="10.5" fontWeight="600" fill="#135783" fontFamily="var(--font-sans)">
            BFE {bfe} ft
          </text>
          <text x="28" y={(waterY + groundY) / 2 + 4} fontSize="10" fill="#0b1a29" fontFamily="var(--font-sans)">
            {Math.abs(delta).toFixed(1)} ft {belowBfe ? "below BFE" : "above BFE"}
          </text>
          <text x="28" y={groundY + 13} fontSize="10" fill="#6b5c48" fontFamily="var(--font-sans)">
            Grade {groundElevation} ft
          </text>
        </g>
      </svg>

      <div
        className={`mt-4 rounded-xl border p-3.5 text-[0.8125rem] leading-relaxed ${
          belowBfe
            ? "border-rose-200 bg-rose-50/70 text-rose-900"
            : "border-emerald-200 bg-emerald-50/70 text-emerald-900"
        }`}
      >
        {report.elevation.note}
      </div>

      <p className="mt-3 text-[0.6875rem] leading-relaxed text-ink-soft">
        Schematic, not to scale, and not a substitute for an Elevation Certificate prepared by a
        licensed surveyor.
      </p>
    </div>
  );
}

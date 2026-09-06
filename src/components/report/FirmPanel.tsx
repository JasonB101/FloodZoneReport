import type { FloodReport } from "@/lib/demo-data";
import { MAP_VIEWBOX, bandPolygon, polylinePath, type MapTone } from "@/lib/map-geometry";

const TONE_FILL: Record<MapTone, string> = {
  "open-water": "#a5d8ef",
  "coastal-high": "#5aa7cf",
  sfha: "#9dcbe4",
  floodway: "transparent",
  moderate: "#dcebf4",
  minimal: "#f4f8fa",
};

const TONE_STROKE: Record<MapTone, string> = {
  "open-water": "#7cc0e0",
  "coastal-high": "#2f7ba6",
  sfha: "#5aa0c4",
  floodway: "#1f5f80",
  moderate: "#b6d3e5",
  minimal: "#e2ecf1",
};

/**
 * Illustrative Flood Insurance Rate Map panel.
 *
 * This is a drawing, not a map: the geometry comes from hand-authored
 * centerlines in `demo-data.ts`, and no tile server, basemap, or GIS service is
 * involved. It exists to show what the report layout looks like with a map in
 * it.
 */
export function FirmPanel({ report }: { report: FloodReport }) {
  const { map } = report;
  const uid = report.slug;
  const labelledBands = map.bands.filter((band) => band.zoneLabel && band.labelAt);

  return (
    <figure className="print-avoid-break overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card print-plain">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-slate-200 bg-slate-50/70 px-4 py-3">
        <div>
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-ink-soft">
            Flood Insurance Rate Map — illustrative panel
          </p>
          <p className="font-mono text-sm font-semibold tracking-tight text-ink">
            PANEL {report.firm.panelNumber}
          </p>
        </div>
        <p className="text-[0.6875rem] text-ink-soft">
          Effective {report.firm.panelEffectiveDate} · {map.scaleLabel}
        </p>
      </div>

      <div className="relative">
        <svg
          viewBox={`0 0 ${MAP_VIEWBOX.width} ${MAP_VIEWBOX.height}`}
          className="block w-full"
          role="img"
          aria-label={`Illustrative flood map panel for ${report.address.line1}. The property is shown in Zone ${
            report.zone === "X_SHADED" ? "X shaded" : report.zone
          }.`}
        >
          <defs>
            <pattern
              id={`floodway-${uid}`}
              width="4"
              height="4"
              patternTransform="rotate(45)"
              patternUnits="userSpaceOnUse"
            >
              <line x1="0" y1="0" x2="0" y2="4" stroke="#1f5f80" strokeWidth="0.7" opacity="0.55" />
            </pattern>
            <pattern
              id={`coastal-${uid}`}
              width="3.2"
              height="3.2"
              patternTransform="rotate(45)"
              patternUnits="userSpaceOnUse"
            >
              <line x1="0" y1="0" x2="0" y2="3.2" stroke="#0d4a6b" strokeWidth="0.5" opacity="0.28" />
            </pattern>
            <pattern id={`parcels-${uid}`} width="9" height="7" patternUnits="userSpaceOnUse">
              <path d="M0 0H9M0 0V7" stroke="#0b1a29" strokeWidth="0.22" opacity="0.1" fill="none" />
            </pattern>
            <radialGradient id={`marker-${uid}`} cx="50%" cy="35%" r="70%">
              <stop offset="0%" stopColor="#fb7185" />
              <stop offset="100%" stopColor="#be123c" />
            </radialGradient>
          </defs>

          <rect x="0" y="0" width={MAP_VIEWBOX.width} height={MAP_VIEWBOX.height} fill="#f4f8fa" />

          {map.bands.map((band, index) => (
            <polygon
              key={`band-${index}`}
              points={bandPolygon(map, band, index)}
              fill={band.tone === "floodway" ? `url(#floodway-${uid})` : TONE_FILL[band.tone]}
              stroke={TONE_STROKE[band.tone]}
              strokeWidth={band.tone === "floodway" ? 0.5 : 0.35}
            />
          ))}

          {map.bands
            .filter((band) => band.tone === "coastal-high")
            .map((band, index) => (
              <polygon
                key={`coastal-hatch-${index}`}
                points={bandPolygon(map, band, map.bands.indexOf(band))}
                fill={`url(#coastal-${uid})`}
                stroke="none"
              />
            ))}

          <rect
            x="0"
            y="0"
            width={MAP_VIEWBOX.width}
            height={MAP_VIEWBOX.height}
            fill={`url(#parcels-${uid})`}
          />

          {map.roads.map((road, index) => (
            <g key={`road-${index}`}>
              <path
                d={polylinePath(road.pts)}
                fill="none"
                stroke="#8fa3b3"
                strokeWidth={road.major ? 2.6 : 1.7}
                strokeLinecap="round"
                opacity="0.8"
              />
              <path
                d={polylinePath(road.pts)}
                fill="none"
                stroke="#ffffff"
                strokeWidth={road.major ? 1.7 : 1}
                strokeLinecap="round"
              />
            </g>
          ))}

          {map.water && map.water.width > 0 && (
            <path
              d={polylinePath(map.centerline)}
              fill="none"
              stroke="#2f8fbf"
              strokeWidth={map.water.width}
              strokeLinecap="round"
            />
          )}

          {map.water && map.water.width === 0 && (
            <path
              d={polylinePath(map.centerline)}
              fill="none"
              stroke="#2f8fbf"
              strokeWidth="0.7"
              strokeDasharray="3 1.6"
            />
          )}

          {map.transect && (
            <g>
              <path
                d={polylinePath(map.transect.pts)}
                fill="none"
                stroke="#0b1a29"
                strokeWidth="0.5"
                strokeDasharray="2.4 1.4"
                opacity="0.65"
              />
              <text
                x={map.transect.pts[1][0] + 2}
                y={map.transect.pts[1][1]}
                fontSize="2.9"
                fill="#0b1a29"
                opacity="0.7"
                fontFamily="var(--font-mono)"
              >
                {map.transect.label}
              </text>
            </g>
          )}

          {labelledBands.map((band, index) => (
            <text
              key={`label-${index}`}
              x={band.labelAt![0]}
              y={band.labelAt![1]}
              fontSize="6.5"
              fontWeight="700"
              fill="#0d4a6b"
              opacity="0.5"
              textAnchor="middle"
              fontFamily="var(--font-sans)"
            >
              ZONE {band.zoneLabel}
            </text>
          ))}

          {map.water && (
            <text
              x={map.centerline[Math.floor(map.centerline.length / 2)][0]}
              y={map.centerline[Math.floor(map.centerline.length / 2)][1] - 2.4}
              fontSize="3"
              fill="#0d4a6b"
              opacity="0.8"
              textAnchor="middle"
              letterSpacing="0.35"
              fontFamily="var(--font-sans)"
            >
              {map.water.name}
            </text>
          )}

          {/* Subject property */}
          <g>
            <circle
              cx={map.property[0]}
              cy={map.property[1]}
              r="6.4"
              fill="#be123c"
              opacity="0.12"
            />
            <circle
              cx={map.property[0]}
              cy={map.property[1]}
              r="3.4"
              fill={`url(#marker-${uid})`}
              stroke="#ffffff"
              strokeWidth="1"
            />
            <circle cx={map.property[0]} cy={map.property[1]} r="1.1" fill="#ffffff" />
          </g>

          {/* North arrow */}
          <g transform={`translate(${MAP_VIEWBOX.width - 12} 11)`} opacity="0.75">
            <path d="M0 -6 L3 4 L0 2 L-3 4 Z" fill="#0b1a29" />
            <text x="0" y="9.5" fontSize="3.4" textAnchor="middle" fill="#0b1a29" fontFamily="var(--font-sans)">
              N
            </text>
          </g>

          {/* Scale bar */}
          <g transform={`translate(8 ${MAP_VIEWBOX.height - 8})`} opacity="0.8">
            <rect x="0" y="-2.4" width="12" height="2.4" fill="#0b1a29" />
            <rect x="12" y="-2.4" width="12" height="2.4" fill="#ffffff" stroke="#0b1a29" strokeWidth="0.3" />
            <text x="0" y="4" fontSize="3" fill="#0b1a29" fontFamily="var(--font-sans)">
              0
            </text>
            <text x="24" y="4" fontSize="3" fill="#0b1a29" textAnchor="middle" fontFamily="var(--font-sans)">
              500 ft
            </text>
          </g>
        </svg>

        <span className="pointer-events-none absolute right-2.5 top-2.5 rounded-md bg-white/85 px-2 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.1em] text-ink-soft ring-1 ring-slate-300/70 backdrop-blur-sm">
          Illustrative
        </span>
      </div>

      <figcaption className="border-t border-slate-200 bg-slate-50/70 px-4 py-3">
        <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[0.6875rem] text-ink-soft">
          <LegendKey swatch="#9dcbe4" border="#5aa0c4" label="Zone AE / A — SFHA, 1% annual chance" />
          <LegendKey swatch="#5aa7cf" border="#2f7ba6" label="Zone VE — coastal high hazard" />
          <LegendKey swatch="#dcebf4" border="#b6d3e5" label="Zone X shaded — 0.2% annual chance" />
          <LegendKey swatch="#f4f8fa" border="#dbe4ea" label="Zone X — minimal hazard" />
          <LegendKey swatch="#ffffff" border="#1f5f80" hatched label="Regulatory floodway" />
          <LegendKey swatch="#be123c" border="#be123c" round label="Subject property" />
        </ul>
        <p className="mt-3 text-[0.6875rem] leading-relaxed text-ink-soft">
          Rendered illustration of the mapped flood hazard around this address. Not a survey and not a
          reproduction of an official FEMA FIRM panel. Zone boundaries are drawn at map scale and
          should not be read as parcel-level.
        </p>
      </figcaption>
    </figure>
  );
}

function LegendKey({
  swatch,
  border,
  label,
  hatched = false,
  round = false,
}: {
  swatch: string;
  border: string;
  label: string;
  hatched?: boolean;
  round?: boolean;
}) {
  return (
    <li className="flex items-center gap-1.5">
      <span
        aria-hidden="true"
        className={`inline-block size-3 shrink-0 ${round ? "rounded-full" : "rounded-[3px]"}`}
        style={{
          backgroundColor: swatch,
          border: `1px solid ${border}`,
          backgroundImage: hatched
            ? "repeating-linear-gradient(45deg, #1f5f80 0 1px, transparent 1px 3px)"
            : undefined,
        }}
      />
      {label}
    </li>
  );
}

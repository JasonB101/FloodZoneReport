/**
 * Geometry helpers for the illustrative FIRM-style panel drawn on each report.
 *
 * Every shape is derived from a hand-authored centerline plus perpendicular
 * offsets, then perturbed with a seeded PRNG so zone boundaries look surveyed
 * rather than ruled. The PRNG must stay deterministic: the same spec has to
 * produce identical output on the server and in the browser or React will
 * report a hydration mismatch.
 */

export type Pt = [number, number];

/** All map specs are authored against this viewBox. */
export const MAP_VIEWBOX = { width: 160, height: 100 } as const;

export type MapTone =
  | "open-water"
  | "coastal-high"
  | "sfha"
  | "floodway"
  | "moderate"
  | "minimal";

export interface MapBand {
  /** Zone letter as it would be printed on the panel. */
  zoneLabel: string;
  tone: MapTone;
  /**
   * Perpendicular distance from the centerline, in viewBox units. Following the
   * centerline left to right, positive offsets fall to the right-hand side
   * (visually below a horizontal line) and negative offsets to the left.
   */
  from: number;
  to: number;
  /** Where to print the zone letter, if it should be printed. */
  labelAt?: Pt;
  /** Ragged edge amplitude. Open water and the floodway read better crisp. */
  jitter?: number;
}

export interface MapRoad {
  pts: Pt[];
  name?: string;
  major?: boolean;
}

export interface FloodMapSpec {
  /** Authored left to right, extended past the viewBox so bands bleed off-canvas. */
  centerline: Pt[];
  water: { kind: string; name: string; width: number } | null;
  bands: MapBand[];
  roads: MapRoad[];
  /** Subject property marker. */
  property: Pt;
  /** Cross-section / transect line printed on coastal panels. */
  transect?: { pts: Pt[]; label: string };
  scaleLabel: string;
  seed: number;
}

/** Small, fast, deterministic PRNG. */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Unit normal at each vertex, averaged across adjacent segments. */
function vertexNormals(pts: Pt[]): Pt[] {
  const normals: Pt[] = [];
  for (let i = 0; i < pts.length; i += 1) {
    const prev = pts[Math.max(0, i - 1)];
    const next = pts[Math.min(pts.length - 1, i + 1)];
    const dx = next[0] - prev[0];
    const dy = next[1] - prev[1];
    const len = Math.hypot(dx, dy) || 1;
    normals.push([-dy / len, dx / len]);
  }
  return normals;
}

function offsetPolyline(pts: Pt[], distance: number, jitter: number, seed: number): Pt[] {
  const rng = mulberry32(seed);
  const normals = vertexNormals(pts);
  return pts.map((p, i) => {
    const wobble = jitter === 0 ? 0 : (rng() - 0.5) * 2 * jitter;
    const d = distance + wobble;
    return [p[0] + normals[i][0] * d, p[1] + normals[i][1] * d] as Pt;
  });
}

const fmt = (pts: Pt[]) =>
  pts.map(([x, y]) => `${Math.round(x * 100) / 100},${Math.round(y * 100) / 100}`).join(" ");

/** Polygon covering the strip of ground between two perpendicular offsets. */
export function bandPolygon(spec: FloodMapSpec, band: MapBand, index: number): string {
  const jitter = band.jitter ?? 1.6;
  const near = offsetPolyline(spec.centerline, band.from, jitter, spec.seed + index * 977);
  const far = offsetPolyline(spec.centerline, band.to, jitter, spec.seed + index * 977 + 31);
  return fmt([...near, ...far.reverse()]);
}

/** Smooth-ish path through the authored points, used for water and roads. */
export function polylinePath(pts: Pt[]): string {
  if (pts.length < 2) return "";
  const d = [`M ${pts[0][0]} ${pts[0][1]}`];
  for (let i = 1; i < pts.length; i += 1) {
    const prev = pts[i - 1];
    const cur = pts[i];
    const cx = (prev[0] + cur[0]) / 2;
    const cy = (prev[1] + cur[1]) / 2;
    d.push(`Q ${prev[0]} ${prev[1]} ${cx} ${cy}`);
    if (i === pts.length - 1) d.push(`L ${cur[0]} ${cur[1]}`);
  }
  return d.join(" ");
}

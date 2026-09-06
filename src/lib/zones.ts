/**
 * FEMA flood-zone reference metadata.
 *
 * The descriptions here mirror how FEMA characterizes each zone on a Flood
 * Insurance Rate Map (FIRM), rewritten for a general audience. Nothing in this
 * file is fetched from FEMA — it is static reference copy used to render the
 * demo reports.
 */

export type ZoneCode = "AE" | "A" | "AO" | "VE" | "X_SHADED" | "X";

export type RiskTier = "high" | "elevated" | "moderate" | "minimal";

export interface ZoneDefinition {
  /** Internal key. */
  code: ZoneCode;
  /** How the zone is printed on a FIRM, e.g. "AE" or "X". */
  label: string;
  /** Disambiguating suffix shown next to the label where FEMA uses shading. */
  qualifier?: string;
  /** FEMA's short name for the zone. */
  officialName: string;
  /** One-line answer to "what does this mean for me?" */
  headline: string;
  /** Two or three sentences of plain-English explanation. */
  summary: string;
  /** Is the zone inside a Special Flood Hazard Area? */
  sfha: boolean;
  /** Approximate annual chance of a flood at or above the base flood. */
  annualChanceLabel: string;
  /** Cumulative chance across a 30-year mortgage. */
  thirtyYearChanceLabel: string;
  riskTier: RiskTier;
  /** Does a federally backed mortgage trigger the mandatory purchase rule? */
  insuranceRequired: boolean;
  /** Does FEMA publish a Base Flood Elevation for this zone? */
  hasBaseFloodElevation: boolean;
}

export const ZONE_DEFINITIONS: Record<ZoneCode, ZoneDefinition> = {
  AE: {
    code: "AE",
    label: "AE",
    officialName: "1% annual chance floodplain with Base Flood Elevations",
    headline: "High risk. Inside the mapped floodplain, with a published flood elevation.",
    summary:
      "Zone AE is what most people mean by “in the floodplain.” FEMA models a 1% chance each year that flood water reaches or exceeds a specific height, called the Base Flood Elevation, and prints that height on the map. Zone AE floods are usually driven by rivers, creeks, or stormwater backing up rather than by ocean waves.",
    sfha: true,
    annualChanceLabel: "1% each year",
    thirtyYearChanceLabel: "about 26% over a 30-year mortgage",
    riskTier: "high",
    insuranceRequired: true,
    hasBaseFloodElevation: true,
  },
  A: {
    code: "A",
    label: "A",
    officialName: "1% annual chance floodplain, no Base Flood Elevation determined",
    headline: "High risk, but FEMA never published a flood height for this area.",
    summary:
      "Zone A carries the same 1%-per-year flood chance as Zone AE, but it was mapped with an approximate study, so no Base Flood Elevation was calculated. Lenders still require insurance. Because there is no published elevation, an Elevation Certificate from a surveyor does most of the work in pricing a policy and in any appeal.",
    sfha: true,
    annualChanceLabel: "1% each year",
    thirtyYearChanceLabel: "about 26% over a 30-year mortgage",
    riskTier: "high",
    insuranceRequired: true,
    hasBaseFloodElevation: false,
  },
  AO: {
    code: "AO",
    label: "AO",
    officialName: "Shallow sheet-flow flooding, 1 to 3 feet",
    headline: "High risk from shallow moving water rather than deep standing water.",
    summary:
      "Zone AO describes sheet flow — water that spreads across the ground one to three feet deep instead of pooling in a channel. FEMA publishes a depth rather than an elevation. It is still a Special Flood Hazard Area, so the mandatory purchase rule applies, and shallow flooding is still enough to total a furnace, a car, or a finished floor.",
    sfha: true,
    annualChanceLabel: "1% each year",
    thirtyYearChanceLabel: "about 26% over a 30-year mortgage",
    riskTier: "high",
    insuranceRequired: true,
    hasBaseFloodElevation: false,
  },
  VE: {
    code: "VE",
    label: "VE",
    officialName: "Coastal high hazard area with wave action",
    headline: "The highest-risk zone FEMA maps. Storm surge plus breaking waves.",
    summary:
      "Zone VE is coastal land where FEMA expects a 1% annual chance flood to arrive with breaking waves three feet or higher. Waves add force that still water does not, so building rules are stricter, the Base Flood Elevation is measured to the bottom of the lowest structural member, and insurance is priced well above an equivalent Zone AE property.",
    sfha: true,
    annualChanceLabel: "1% each year, with wave action",
    thirtyYearChanceLabel: "about 26% over a 30-year mortgage",
    riskTier: "high",
    insuranceRequired: true,
    hasBaseFloodElevation: true,
  },
  X_SHADED: {
    code: "X_SHADED",
    label: "X",
    qualifier: "shaded",
    officialName: "0.2% annual chance flood hazard",
    headline: "Moderate risk. Outside the floodplain, inside the 500-year flood area.",
    summary:
      "Shaded Zone X is the area FEMA expects to flood in a 0.2% annual chance event — the one often called the 500-year flood. It sits outside the Special Flood Hazard Area, so no lender requires insurance here, but it is emphatically not a no-risk zone. A large share of federal flood claims come from properties outside the SFHA.",
    sfha: false,
    annualChanceLabel: "0.2% each year",
    thirtyYearChanceLabel: "about 6% over a 30-year mortgage",
    riskTier: "moderate",
    insuranceRequired: false,
    hasBaseFloodElevation: false,
  },
  X: {
    code: "X",
    label: "X",
    qualifier: "unshaded",
    officialName: "Area of minimal flood hazard",
    headline: "Minimal mapped risk. Outside both the 100-year and 500-year flood areas.",
    summary:
      "Unshaded Zone X is everything FEMA maps as being above the 0.2% annual chance flood. No lender will require a flood policy here, and coverage is cheap when you buy it voluntarily. The caveat worth knowing: FEMA maps rivers and coasts, not every storm drain, so intense rainfall can still flood a Zone X property.",
    sfha: false,
    annualChanceLabel: "less than 0.2% each year",
    thirtyYearChanceLabel: "under 6% over a 30-year mortgage",
    riskTier: "minimal",
    insuranceRequired: false,
    hasBaseFloodElevation: false,
  },
};

export const RISK_TIER_STYLES: Record<
  RiskTier,
  { label: string; badge: string; dot: string; bar: string; text: string; ring: string }
> = {
  high: {
    label: "High risk",
    badge: "bg-rose-50 text-rose-700 ring-rose-200",
    dot: "bg-rose-500",
    bar: "bg-rose-500",
    text: "text-rose-700",
    ring: "ring-rose-200",
  },
  elevated: {
    label: "Elevated risk",
    badge: "bg-orange-50 text-orange-700 ring-orange-200",
    dot: "bg-orange-500",
    bar: "bg-orange-500",
    text: "text-orange-700",
    ring: "ring-orange-200",
  },
  moderate: {
    label: "Moderate risk",
    badge: "bg-amber-50 text-amber-800 ring-amber-200",
    dot: "bg-amber-500",
    bar: "bg-amber-500",
    text: "text-amber-800",
    ring: "ring-amber-200",
  },
  minimal: {
    label: "Minimal risk",
    badge: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    dot: "bg-emerald-500",
    bar: "bg-emerald-500",
    text: "text-emerald-700",
    ring: "ring-emerald-200",
  },
};

/** Position of a risk tier on the 0–100 visual scale used by the risk meter. */
export const RISK_TIER_SCALE: Record<RiskTier, number> = {
  minimal: 12,
  moderate: 38,
  elevated: 64,
  high: 88,
};

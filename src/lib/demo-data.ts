/**
 * Demo data set for FloodZoneReport.
 *
 * DEMO MODE. Every value below is hand-written sample content. There is no
 * FEMA request, no geocoder, no third-party flood-data provider, and no API key
 * anywhere in this project. Panel numbers, Base Flood Elevations, community IDs
 * and premium ranges are plausible-looking fabrications used to review the
 * product flow and the report layout.
 */

import type { FloodMapSpec, Pt } from "./map-geometry";
import { ZONE_DEFINITIONS, type ZoneCode, type ZoneDefinition } from "./zones";

export interface Address {
  line1: string;
  city: string;
  state: string;
  zip: string;
}

export interface DeterminationField {
  label: string;
  value: string;
  hint?: string;
}

export interface FloodEvent {
  year: string;
  event: string;
  note: string;
}

export interface InsuranceProfile {
  /** Does a federally backed mortgage trigger the mandatory purchase rule? */
  mandatory: boolean;
  /** Illustrative annual premium band for a typical single-family dwelling. */
  annualLow: number;
  annualHigh: number;
  policyType: string;
  elevationCertificate: "Required to rate accurately" | "Recommended" | "Not needed";
  /** Bullets: what drives the number up or down at this address. */
  priceDrivers: string[];
  /** Bullets: coverage mechanics a buyer should know. */
  coverageNotes: string[];
}

export interface ElevationProfile {
  /** Base Flood Elevation, in feet, or null where FEMA publishes none. */
  bfe: number | null;
  /** Lowest adjacent grade, in feet. */
  groundElevation: number;
  datum: string;
  /** Copy describing the ground-to-BFE relationship. */
  note: string;
}

export interface FloodReport {
  slug: string;
  /** Short chip shown on the sample picker. */
  sampleTag: string;
  /** One-line reason a reviewer would click this sample. */
  sampleReason: string;
  address: Address;
  coordinates: { lat: number; lon: number };
  county: string;
  community: string;
  communityId: string;
  zone: ZoneCode;
  reportId: string;
  determinationDate: string;
  firm: {
    panelNumber: string;
    panelEffectiveDate: string;
    firmIndexDate: string;
    lastMapRevision: string;
  };
  elevation: ElevationProfile;
  floodway: string;
  cbrs: string;
  lomcStatus: string;
  floodSources: string[];
  insurance: InsuranceProfile;
  narrative: {
    /** Two or three sentences answering "what does this mean for my property?" */
    whatThisMeans: string;
    /** Framed for someone mid-transaction. */
    ifYouAreBuying: string;
    /** Plain-English insurance explanation. */
    insurancePlain: string;
    nextSteps: string[];
  };
  history: FloodEvent[];
  mitigation: string[];
  map: FloodMapSpec;
}

/* -------------------------------------------------------------------------- */
/* Map centerlines                                                            */
/* -------------------------------------------------------------------------- */

const RIVERINE_CENTERLINE: Pt[] = [
  [-20, 94],
  [4, 90],
  [22, 82],
  [40, 78],
  [56, 70],
  [72, 67],
  [88, 60],
  [104, 57],
  [120, 50],
  [138, 46],
  [156, 39],
  [180, 35],
];

const COASTLINE_CENTERLINE: Pt[] = [
  [-20, 22],
  [2, 27],
  [20, 30],
  [40, 36],
  [58, 39],
  [76, 45],
  [96, 49],
  [116, 56],
  [136, 60],
  [158, 67],
  [180, 71],
];

const UPLAND_CENTERLINE: Pt[] = [
  [-20, 116],
  [8, 112],
  [34, 108],
  [60, 106],
  [86, 108],
  [112, 112],
  [140, 118],
  [180, 124],
];

const BAYOU_CENTERLINE: Pt[] = [
  [-20, 70],
  [6, 66],
  [26, 70],
  [46, 62],
  [66, 66],
  [86, 57],
  [106, 61],
  [128, 52],
  [152, 56],
  [180, 48],
];

function gridRoads(xs: number[], ys: number[]): FloodMapSpec["roads"] {
  return [
    ...xs.map((x) => ({ pts: [[x, -8], [x + 3, 50], [x - 1, 108]] as Pt[] })),
    ...ys.map((y) => ({ pts: [[-8, y], [80, y + 2], [168, y - 2]] as Pt[] })),
  ];
}

/* -------------------------------------------------------------------------- */
/* Samples                                                                    */
/* -------------------------------------------------------------------------- */

const BATON_ROUGE: FloodReport = {
  slug: "412-riverbend-drive-baton-rouge-la",
  sampleTag: "High risk · Zone AE",
  sampleReason: "Riverine floodplain with a published flood elevation and a mandatory-insurance trigger.",
  address: { line1: "412 Riverbend Drive", city: "Baton Rouge", state: "LA", zip: "70802" },
  coordinates: { lat: 30.4381, lon: -91.1903 },
  county: "East Baton Rouge Parish",
  community: "City of Baton Rouge / East Baton Rouge Parish",
  communityId: "220058",
  zone: "AE",
  reportId: "FZR-2402-118374",
  determinationDate: "March 14, 2026",
  firm: {
    panelNumber: "22033C0135F",
    panelEffectiveDate: "April 2, 2018",
    firmIndexDate: "April 2, 2018",
    lastMapRevision: "Letter of Map Revision 18-06-1142P, effective August 9, 2019",
  },
  elevation: {
    bfe: 24,
    groundElevation: 21.4,
    datum: "NAVD88",
    note:
      "Lowest adjacent grade sits roughly 2.6 feet below the Base Flood Elevation. In a base flood, water would be expected to stand against the structure rather than stay in the yard.",
  },
  floodway: "Outside the regulatory floodway (approximately 180 ft from the floodway boundary)",
  cbrs: "Not in a Coastal Barrier Resources System unit",
  lomcStatus: "No Letter of Map Amendment on file for this parcel",
  floodSources: ["Ward Creek overbank flooding", "Mississippi River backwater", "Stormwater system surcharge"],
  insurance: {
    mandatory: true,
    annualLow: 1850,
    annualHigh: 3400,
    policyType: "NFIP Standard Flood Insurance Policy, Risk Rating 2.0",
    elevationCertificate: "Required to rate accurately",
    priceDrivers: [
      "Lowest floor elevation relative to the 24 ft Base Flood Elevation — every foot of elevation gained moves the premium materially.",
      "Whether the lowest floor is a slab, crawlspace, or has an enclosure below the flood level.",
      "Distance to Ward Creek and to the Mississippi, both of which Risk Rating 2.0 prices directly.",
      "Prior NFIP claims attached to the property, which follow the address and not the owner.",
    ],
    coverageNotes: [
      "An NFIP dwelling policy caps building coverage at $250,000 and contents at $100,000. Excess flood coverage from a private carrier covers the gap above that.",
      "Contents coverage is a separate election. It is not automatically included with building coverage.",
      "New policies carry a 30-day waiting period unless the purchase is tied to a loan closing, so do not leave this to the final week of escrow.",
      "Basement and below-grade finishings are largely excluded even when the building itself is covered.",
    ],
  },
  narrative: {
    whatThisMeans:
      "This address is inside a Special Flood Hazard Area. FEMA models a 1% chance each year that flood water at this location reaches 24 feet — about two and a half feet above the ground at the structure. Over the life of a 30-year mortgage that compounds to roughly a one-in-four chance of at least one base flood, which is why lenders treat Zone AE differently from every zone outside the floodplain.",
    ifYouAreBuying:
      "Expect flood insurance to be a condition of closing, and expect it to be a real line item in the monthly payment rather than a rounding error. Ask the seller for an existing Elevation Certificate and for the property's NFIP claim history before the inspection period ends — both change the premium enough to affect what the house is worth to you.",
    insurancePlain:
      "Because the property is in an SFHA and the loan is federally backed, flood insurance is mandatory, not optional. The single biggest lever on price is how high the lowest floor sits relative to 24 feet. An Elevation Certificate costs a few hundred dollars and is the only way to prove that elevation; without one the carrier rates conservatively, which almost always means you pay more.",
    nextSteps: [
      "Commission an Elevation Certificate from a licensed surveyor before you request quotes.",
      "Request the property's prior NFIP claim history from the seller or the current carrier.",
      "Get quotes from both an NFIP-participating agent and a private flood carrier — private pricing beats NFIP on some elevated properties.",
      "Confirm with East Baton Rouge Parish permitting whether substantial-improvement rules would apply to any renovation you have planned.",
    ],
  },
  history: [
    { year: "2016", event: "August 2016 Louisiana floods", note: "Widespread flooding across the parish; thousands of structures inundated outside as well as inside the mapped SFHA." },
    { year: "2021", event: "Hurricane Ida remnants", note: "Heavy rainfall and localized street flooding; drainage system surcharge reported in the Ward Creek basin." },
    { year: "2023", event: "June convective storm event", note: "Flash flooding on secondary streets after a short-duration, high-intensity rainfall cell." },
  ],
  mitigation: [
    "Elevate the HVAC condenser, water heater, and electrical panel above the Base Flood Elevation.",
    "Install flood vents in any enclosure below the lowest floor — required for compliant rating, and it lowers premiums.",
    "Backflow preventers on sewer lines to stop the most common and most unpleasant failure mode.",
    "Ask the parish about its Community Rating System class; a better class discounts every NFIP policy in the community.",
  ],
  map: {
    centerline: RIVERINE_CENTERLINE,
    water: { kind: "Ward Creek", name: "WARD CREEK", width: 2.4 },
    bands: [
      { zoneLabel: "X", tone: "minimal", from: -120, to: -34, labelAt: [26, 24], jitter: 2.2 },
      { zoneLabel: "X", tone: "moderate", from: -34, to: -17, labelAt: [126, 22], jitter: 2 },
      { zoneLabel: "AE", tone: "sfha", from: -17, to: 60, labelAt: [40, 96], jitter: 1.8 },
      { zoneLabel: "", tone: "floodway", from: -4.5, to: 4.5, jitter: 0.6 },
    ],
    roads: gridRoads([28, 66, 104, 142], [18, 88]),
    property: [90, 52],
    scaleLabel: "1 inch = 500 feet",
    seed: 20338,
  },
};

const BOULDER: FloodReport = {
  slug: "1885-kestrel-ridge-road-boulder-co",
  sampleTag: "Minimal risk · Zone X",
  sampleReason: "Outside the floodplain. No insurance requirement, and the report says so without hedging.",
  address: { line1: "1885 Kestrel Ridge Road", city: "Boulder", state: "CO", zip: "80304" },
  coordinates: { lat: 40.0489, lon: -105.2733 },
  county: "Boulder County",
  community: "City of Boulder",
  communityId: "080024",
  zone: "X",
  reportId: "FZR-2402-118381",
  determinationDate: "March 14, 2026",
  firm: {
    panelNumber: "08013C0378J",
    panelEffectiveDate: "December 18, 2012",
    firmIndexDate: "December 18, 2012",
    lastMapRevision: "No revisions affecting this panel",
  },
  elevation: {
    bfe: null,
    groundElevation: 5412,
    datum: "NAVD88",
    note:
      "FEMA publishes no Base Flood Elevation for unshaded Zone X because the area is mapped above the 0.2% annual chance flood. Ground elevation is shown for reference only.",
  },
  floodway: "Not in a regulatory floodway",
  cbrs: "Not applicable — inland community",
  lomcStatus: "No Letter of Map Amendment needed; the parcel is already outside the SFHA",
  floodSources: ["No mapped riverine or coastal flood source within 1,400 ft", "Localized street drainage during cloudburst events"],
  insurance: {
    mandatory: false,
    annualLow: 385,
    annualHigh: 520,
    policyType: "NFIP policy at the lowest Risk Rating 2.0 tier, or a private carrier equivalent",
    elevationCertificate: "Not needed",
    priceDrivers: [
      "Nothing about this address triggers a flood surcharge — you are quoting into the cheapest tier available.",
      "Replacement cost of the dwelling, since coverage limits scale with it.",
      "Deductible selection, which is the main knob you actually control here.",
    ],
    coverageNotes: [
      "No lender can require flood insurance as a condition of a loan at this address. If one does, this determination is the document you send back.",
      "Voluntary coverage outside the SFHA is inexpensive: roughly the cost of a phone plan for six figures of protection.",
      "Homeowners insurance does not cover flood damage anywhere in the United States, including in Zone X. The two policies do not overlap.",
      "The 30-day waiting period still applies to voluntary purchases, so buying after a forecast does nothing.",
    ],
  },
  narrative: {
    whatThisMeans:
      "This address is outside the Special Flood Hazard Area and outside the 0.2% annual chance flood area as well. In FEMA's terms that is the lowest-risk mapping a property can receive: above both the 100-year and the 500-year flood. No flood elevation is published because none applies here.",
    ifYouAreBuying:
      "Flood risk should not be a factor in this purchase, and no lender can make flood insurance a condition of the loan. Keep this determination in the closing file — escrow and servicing teams occasionally flag properties by ZIP code rather than by parcel, and a one-page determination resolves that in a single email.",
    insurancePlain:
      "Insurance is optional at this address and cheap when purchased voluntarily. Worth knowing: FEMA maps rivers and coastlines, not municipal storm sewers. Boulder's 2013 flood damaged homes that were mapped in Zone X, because six inches of rain in a day overwhelms drainage regardless of what the panel says. A few hundred dollars a year for a minimum-tier policy is a defensible choice even here.",
    nextSteps: [
      "File this determination with your closing documents so a servicer cannot later assert a flood requirement.",
      "Price a voluntary minimum-tier policy once, so the decision is informed rather than assumed.",
      "If you are building or adding a basement, ask the City of Boulder about local drainage criteria — those are stricter than the FEMA map in places.",
    ],
  },
  history: [
    { year: "2013", event: "September 2013 Colorado floods", note: "Catastrophic regional flooding. A substantial share of damaged Boulder homes were mapped outside the SFHA, in Zone X." },
    { year: "2018", event: "July cloudburst", note: "Short-duration street and underpass flooding from drainage capacity, not from a mapped flood source." },
  ],
  mitigation: [
    "Extend downspouts and regrade so surface water moves away from the foundation — the only realistic flood pathway here.",
    "A sump pump with battery backup if the home has any below-grade finished space.",
    "Check that window wells at any garden-level windows drain rather than pond.",
  ],
  map: {
    centerline: UPLAND_CENTERLINE,
    water: { kind: "Fourmile Canyon Creek", name: "FOURMILE CANYON CREEK", width: 1.6 },
    bands: [
      { zoneLabel: "X", tone: "minimal", from: -130, to: -22, labelAt: [66, 34], jitter: 2.4 },
      { zoneLabel: "X", tone: "moderate", from: -22, to: -12, jitter: 1.8 },
      { zoneLabel: "AE", tone: "sfha", from: -12, to: 40, labelAt: [36, 128], jitter: 1.6 },
    ],
    roads: gridRoads([22, 58, 96, 134], [30, 62, 90]),
    property: [72, 44],
    scaleLabel: "1 inch = 500 feet",
    seed: 71104,
  },
};

const FORT_MYERS_BEACH: FloodReport = {
  slug: "27-sandpiper-walk-fort-myers-beach-fl",
  sampleTag: "Highest risk · Zone VE",
  sampleReason: "Coastal high hazard with wave action — stricter build rules and the largest premium spread.",
  address: { line1: "27 Sandpiper Walk", city: "Fort Myers Beach", state: "FL", zip: "33931" },
  coordinates: { lat: 26.4448, lon: -81.9497 },
  county: "Lee County",
  community: "Town of Fort Myers Beach",
  communityId: "120673",
  zone: "VE",
  reportId: "FZR-2402-118392",
  determinationDate: "March 14, 2026",
  firm: {
    panelNumber: "12071C0578H",
    panelEffectiveDate: "November 17, 2022",
    firmIndexDate: "November 17, 2022",
    lastMapRevision: "Physical Map Revision incorporating updated coastal storm surge modeling",
  },
  elevation: {
    bfe: 15,
    groundElevation: 6.2,
    datum: "NAVD88",
    note:
      "Ground sits roughly 8.8 feet below the Base Flood Elevation. In Zone VE the BFE is measured to the bottom of the lowest horizontal structural member, not to the finished floor — a distinction that changes both permitting and rating.",
  },
  floodway: "Not applicable — coastal zone, no riverine floodway mapped",
  cbrs: "Outside the Coastal Barrier Resources System, but within 900 ft of a designated unit boundary",
  lomcStatus: "No Letter of Map Amendment on file; VE removals are rare and require a physical map revision",
  floodSources: ["Gulf of Mexico storm surge", "Breaking wave action of 3 ft or greater", "Estero Bay backflow on the landward side"],
  insurance: {
    mandatory: true,
    annualLow: 4900,
    annualHigh: 9200,
    policyType: "NFIP Standard Flood Insurance Policy plus excess flood coverage in most cases",
    elevationCertificate: "Required to rate accurately",
    priceDrivers: [
      "Elevation of the lowest horizontal structural member against the 15 ft Base Flood Elevation.",
      "Foundation type — open piling or column construction rates very differently from solid perimeter walls, which are not permitted for new VE construction.",
      "Whether any enclosure below the elevated floor uses breakaway walls, as VE construction standards require.",
      "Distance to the shoreline and to the primary frontal dune, priced directly under Risk Rating 2.0.",
    ],
    coverageNotes: [
      "The $250,000 NFIP building cap is well below replacement cost for most coastal structures here. Excess flood coverage is the norm rather than an upgrade.",
      "Wind and flood are separate policies with separate deductibles. In a hurricane, adjusters apportion damage between them, and that apportionment is where disputes happen.",
      "Substantial damage rules bite hard in VE: if repair costs reach 50% of market value, the rebuild must meet current elevation and construction standards.",
      "An enclosure built below the flood level with non-breakaway walls can invalidate compliant rating even when the elevated floor itself is fine.",
    ],
  },
  narrative: {
    whatThisMeans:
      "Zone VE is the most severe designation FEMA maps. It means a 1% annual chance flood is expected to arrive here with breaking waves of three feet or more on top of the storm surge. Wave force is what separates VE from AE: still water pushes, waves hammer. That is why the published 15-foot elevation is measured to the bottom of the lowest structural beam and why solid perimeter foundations are not allowed for new construction.",
    ifYouAreBuying:
      "Treat insurance and construction compliance as primary diligence, not a closing formality. Get the Elevation Certificate and the permit history before the inspection period closes, and specifically confirm how any ground-level enclosure was permitted. A non-conforming enclosure is a rating problem, a permitting problem, and a resale problem at the same time.",
    insurancePlain:
      "Flood insurance is mandatory with any federally backed loan, and this is the zone where the premium spread is widest — a well-elevated piling home and a marginally elevated one on the same street can differ by several thousand dollars a year. Almost every owner here also needs excess flood coverage above the NFIP cap, plus a separate wind policy. Budget for all three.",
    nextSteps: [
      "Obtain the current Elevation Certificate and confirm it reflects the lowest horizontal structural member.",
      "Pull the Town of Fort Myers Beach permit history for the structure and for any ground-level enclosure.",
      "Quote NFIP plus excess flood together so you see the real total, not just the capped NFIP figure.",
      "Confirm the property's substantial-damage status if the structure was repaired after a recent named storm.",
    ],
  },
  history: [
    { year: "2022", event: "Hurricane Ian", note: "Catastrophic surge across the island. Widespread substantial-damage determinations and a subsequent rebuild-to-current-standard requirement for affected structures." },
    { year: "2017", event: "Hurricane Irma", note: "Surge and wave damage along the Gulf-facing shoreline; significant dune erosion recorded." },
    { year: "2004", event: "Hurricane Charley", note: "Direct regional impact; the storm that drove much of the current coastal construction standard in Lee County." },
  ],
  mitigation: [
    "Keep the area below the lowest floor free of anything but parking, access, and storage — that is the compliant use.",
    "Breakaway walls and flood vents on any ground-level enclosure, verified against the permit.",
    "Elevated mechanical platforms for HVAC, pool equipment, and electrical service.",
    "Support dune and vegetation maintenance; the frontal dune is a rated feature, not landscaping.",
  ],
  map: {
    centerline: COASTLINE_CENTERLINE,
    water: { kind: "Gulf of Mexico", name: "GULF OF MEXICO", width: 0 },
    bands: [
      { zoneLabel: "", tone: "open-water", from: -140, to: 0, jitter: 0 },
      { zoneLabel: "VE", tone: "coastal-high", from: 0, to: 17, labelAt: [40, 46], jitter: 1.4 },
      { zoneLabel: "AE", tone: "sfha", from: 17, to: 34, labelAt: [116, 84], jitter: 1.6 },
      { zoneLabel: "X", tone: "moderate", from: 34, to: 46, jitter: 1.8 },
    ],
    roads: [
      { pts: [[-8, 44], [76, 57], [168, 74]] as Pt[], name: "ESTERO BLVD", major: true },
      { pts: [[26, -8], [34, 46], [30, 108]] as Pt[] },
      { pts: [[64, -8], [72, 52], [68, 108]] as Pt[] },
      { pts: [[104, -8], [112, 60], [108, 108]] as Pt[] },
      { pts: [[140, -8], [148, 66], [144, 108]] as Pt[] },
    ],
    property: [88, 56],
    transect: { pts: [[70, 30], [82, 82]] as Pt[], label: "TRANSECT 14" },
    scaleLabel: "1 inch = 300 feet",
    seed: 40877,
  },
};

const HOUSTON: FloodReport = {
  slug: "3140-bayou-oaks-street-houston-tx",
  sampleTag: "Moderate risk · Zone X shaded",
  sampleReason: "The nuanced case: no insurance requirement, but a real flood history a buyer needs to see.",
  address: { line1: "3140 Bayou Oaks Street", city: "Houston", state: "TX", zip: "77098" },
  coordinates: { lat: 29.7371, lon: -95.4142 },
  county: "Harris County",
  community: "City of Houston",
  communityId: "480296",
  zone: "X_SHADED",
  reportId: "FZR-2402-118406",
  determinationDate: "March 14, 2026",
  firm: {
    panelNumber: "48201C0870L",
    panelEffectiveDate: "January 29, 2021",
    firmIndexDate: "January 29, 2021",
    lastMapRevision: "Countywide revision incorporating post-2017 rainfall frequency updates",
  },
  elevation: {
    bfe: null,
    groundElevation: 47.8,
    datum: "NAVD88",
    note:
      "No Base Flood Elevation is published for shaded Zone X. For context, the mapped 1% annual chance flood elevation on the adjacent bayou reach is 46.1 ft, roughly 1.7 feet below the ground at this address.",
  },
  floodway: "Outside the regulatory floodway (approximately 520 ft from the floodway boundary)",
  cbrs: "Not in a Coastal Barrier Resources System unit",
  lomcStatus: "No Letter of Map Amendment on file; none is required outside the SFHA",
  floodSources: [
    "Buffalo Bayou tributary overbank flooding in extreme events",
    "Street and storm-sewer surcharge during high-intensity rainfall",
    "Upstream reservoir release operations",
  ],
  insurance: {
    mandatory: false,
    annualLow: 620,
    annualHigh: 980,
    policyType: "NFIP policy at a non-SFHA tier, or a private carrier equivalent",
    elevationCertificate: "Recommended",
    priceDrivers: [
      "Proximity to the bayou, which Risk Rating 2.0 prices even outside the SFHA.",
      "Any prior NFIP claim on the address — claims follow the property, and Harris County has a lot of them.",
      "First-floor height above grade, which is why an Elevation Certificate is worth having even without a requirement.",
      "Deductible selection and whether contents coverage is included.",
    ],
    coverageNotes: [
      "No lender requirement applies here. Roughly a quarter of NFIP claims nationally come from properties outside the SFHA, so the absence of a requirement is not the absence of risk.",
      "Non-SFHA rating is dramatically cheaper than SFHA rating for the same coverage. This is the best value tier in the whole program.",
      "The 30-day waiting period applies. Hurricane season is not the time to start this process.",
      "Ask specifically whether contents and temporary living expenses are included; buyers routinely assume they are.",
    ],
  },
  narrative: {
    whatThisMeans:
      "This address is outside the Special Flood Hazard Area but inside the 0.2% annual chance flood area — the one commonly called the 500-year flood. FEMA classifies it as moderate risk. In practice this is the most misread designation on a FIRM: people hear \"not in the floodplain\" and stop, when the honest reading is \"not required to insure, and still exposed.\"",
    ifYouAreBuying:
      "Ask the seller directly whether the property has flooded and whether an NFIP claim was ever filed. Texas requires flood disclosure on residential sales, and the answer matters more here than the zone letter does. Harvey put water in thousands of Houston homes that were mapped exactly like this one.",
    insurancePlain:
      "You will not be required to buy flood insurance, and you can buy it at the cheapest NFIP tier because the address is outside the SFHA. That combination — real exposure, low price — makes voluntary coverage an unusually good trade at this address. Quote it before you decide against it.",
    nextSteps: [
      "Request the seller's flood disclosure and any NFIP claim history for the address.",
      "Quote a non-SFHA NFIP policy and a private alternative; the price will likely surprise you on the low side.",
      "Check Harris County Flood Control District project maps for the bayou reach, which affect future risk in both directions.",
      "Consider an Elevation Certificate anyway — it can improve rating even where it is not required.",
    ],
  },
  history: [
    { year: "2017", event: "Hurricane Harvey", note: "Regional rainfall well beyond the mapped 0.2% event. A large share of flooded structures were outside the SFHA, in designations identical to this one." },
    { year: "2016", event: "Tax Day flood", note: "Extreme short-duration rainfall; widespread street and structure flooding driven by drainage capacity." },
    { year: "2015", event: "Memorial Day flood", note: "Bayou overbank flooding across the inner-loop watershed." },
  ],
  mitigation: [
    "Buy the cheap non-SFHA policy. At this address it is the single highest-value action available.",
    "Elevate mechanical equipment and the electrical panel where practical.",
    "Backflow prevention on sewer connections, which is a common failure mode in the inner loop.",
    "Keep the storm inlet on the street clear; local drainage does most of the work in a Houston rain event.",
  ],
  map: {
    centerline: BAYOU_CENTERLINE,
    water: { kind: "Buffalo Bayou tributary", name: "BAYOU TRIBUTARY", width: 2 },
    bands: [
      { zoneLabel: "X", tone: "minimal", from: -120, to: -30, labelAt: [24, 18], jitter: 2.2 },
      { zoneLabel: "X", tone: "moderate", from: -30, to: -14, labelAt: [122, 30], jitter: 2 },
      { zoneLabel: "AE", tone: "sfha", from: -14, to: 46, labelAt: [46, 92], jitter: 1.8 },
      { zoneLabel: "", tone: "floodway", from: -4, to: 4, jitter: 0.6 },
    ],
    roads: gridRoads([24, 60, 98, 136], [22, 92]),
    property: [104, 38],
    scaleLabel: "1 inch = 400 feet",
    seed: 55219,
  },
};

/* -------------------------------------------------------------------------- */
/* Accessors                                                                  */
/* -------------------------------------------------------------------------- */

export const DEMO_REPORTS: FloodReport[] = [BATON_ROUGE, FORT_MYERS_BEACH, HOUSTON, BOULDER];

/** The subset surfaced as one-click samples. Currently all of them. */
export const SAMPLE_REPORTS = DEMO_REPORTS;

export function formatAddress(address: Address): string {
  return `${address.line1}, ${address.city}, ${address.state} ${address.zip}`;
}

export function getReport(slug: string): FloodReport | undefined {
  return DEMO_REPORTS.find((report) => report.slug === slug);
}

export function zoneOf(report: FloodReport): ZoneDefinition {
  return ZONE_DEFINITIONS[report.zone];
}

/** Zone label with FEMA's shaded/unshaded qualifier, e.g. "X (shaded)". */
export function zoneDisplayLabel(zone: ZoneDefinition): string {
  return zone.qualifier ? `${zone.label} (${zone.qualifier})` : zone.label;
}

/**
 * Loose matcher for the demo lookup field. Real geocoding is out of scope in
 * demo mode, so we score the query against street, city, state, and ZIP tokens
 * and return the best sample above a low threshold.
 */
export function matchAddress(query: string): FloodReport | undefined {
  const normalized = query.trim().toLowerCase();
  if (normalized.length < 3) return undefined;

  const tokens = normalized.split(/[\s,]+/).filter((t) => t.length > 1);
  if (tokens.length === 0) return undefined;

  let best: { report: FloodReport; score: number } | undefined;

  for (const report of DEMO_REPORTS) {
    const haystack = `${formatAddress(report.address)} ${report.county} ${report.community}`.toLowerCase();
    let score = 0;
    for (const token of tokens) {
      if (haystack.includes(token)) score += token.length;
    }
    if (!best || score > best.score) best = { report, score };
  }

  return best && best.score >= 4 ? best.report : undefined;
}

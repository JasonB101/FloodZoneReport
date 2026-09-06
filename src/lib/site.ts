export const SITE = {
  name: "FloodZoneReport",
  tagline: "Know your flood zone in plain English",
  description:
    "Enter a US address and get a clear FEMA flood-zone report: zone, SFHA status, base flood elevation, and plain-English insurance notes. Informational only — not a lender determination.",
  url: "https://floodzonereport.example",
  supportEmail: "hello@floodzonereport.example",
} as const;

export const NAV_LINKS = [
  { href: "/lookup", label: "Check an address" },
  { href: "/report", label: "Sample report" },
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" },
] as const;

/**
 * The disclaimer that has to appear on every page. Kept in one place so the
 * wording can never drift between the footer, the report, and the checkout.
 */
export const DISCLAIMER = {
  short:
    "Informational purposes only. FloodZoneReport is not an official lender Standard Flood Hazard Determination Form (SFHDF) and is not a CoreLogic or other regulated flood-zone determination.",
  long: "FloodZoneReport provides informational flood-zone summaries for property owners, buyers, and renters. Our reports are NOT an official Standard Flood Hazard Determination Form (SFHDF), NOT a CoreLogic determination, and NOT a substitute for any lender, insurer, surveyor, or government determination. We are not an insurance producer and do not sell insurance. Flood zones change, and a report reflects our reading of published FEMA mapping at the time it is generated. For a binding determination, consult your lender, a licensed surveyor, your insurance agent, or your local floodplain administrator. Nothing here is legal, engineering, insurance, or financial advice.",
  demo: "This site is running in DEMO MODE. No live FEMA services, geocoders, or flood-data providers are contacted. Every address, flood zone, elevation, panel number, and premium figure shown is fabricated sample content for design and flow review.",
} as const;

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  cadence: string;
  blurb: string;
  featured?: boolean;
  badge?: string;
  features: string[];
  cta: string;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "single",
    name: "Single Report",
    price: 9,
    cadence: "one-time",
    blurb: "One address, one report. The answer plus the reasoning, ready to print or email.",
    features: [
      "FEMA flood zone and SFHA yes/no",
      "Base Flood Elevation where FEMA publishes one",
      "FIRM panel number and effective date",
      "Plain-English risk and insurance notes",
      "Print / PDF-ready report layout",
      "Shareable report link",
    ],
    cta: "Get one report",
  },
  {
    id: "plus",
    name: "Report + Elevation Insight",
    price: 14,
    cadence: "one-time",
    blurb: "Everything in Single Report, plus the elevation context that drives your premium.",
    featured: true,
    badge: "Most popular",
    features: [
      "Everything in Single Report",
      "Ground-to-BFE elevation diagram",
      "Illustrative premium range with price drivers",
      "Elevation Certificate guidance for your zone",
      "Mitigation checklist ranked by impact",
      "Local flood history summary",
    ],
    cta: "Get the full picture",
  },
  {
    id: "bundle",
    name: "Buyer's Bundle",
    price: 19,
    cadence: "3 reports",
    blurb: "House hunting? Compare three addresses side by side before you write an offer.",
    features: [
      "Three full reports, use them any time",
      "Side-by-side zone comparison",
      "Everything in Report + Elevation Insight",
      "One combined PDF for your agent or lender",
      "Reports never expire",
    ],
    cta: "Compare three addresses",
  },
];

export function getPlan(id: string | undefined): PricingPlan {
  return PRICING_PLANS.find((plan) => plan.id === id) ?? PRICING_PLANS[1];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_SECTIONS: { title: string; items: FaqItem[] }[] = [
  {
    title: "What this is",
    items: [
      {
        question: "Is this an official flood determination?",
        answer:
          "No, and we will never claim otherwise. A lender's flood determination is a Standard Flood Hazard Determination Form (SFHDF), typically ordered from a regulated determination vendor and tied to a loan file. FloodZoneReport is an informational report written for the person who owns or is buying the property. Use it to understand your situation and to ask better questions; use your lender's SFHDF for anything binding.",
      },
      {
        question: "What do I actually get?",
        answer:
          "A single report for one address: the FEMA flood zone, whether the address is in a Special Flood Hazard Area, the Base Flood Elevation where FEMA publishes one, the FIRM panel number and effective date, an illustrative map panel, plain-English notes on what the zone means for insurance, local flood history context, and a mitigation checklist. It is formatted to print or save as a PDF.",
      },
      {
        question: "How is this different from the free tools?",
        answer:
          "The underlying flood mapping is public, and we say so plainly. What you are paying for is the interpretation: a report that answers \"what does this mean for me and my insurance\" in sentences instead of handing you a map viewer and a zone letter. The FEMA Map Service Center is authoritative and free. If you are comfortable reading a FIRM panel and a Flood Insurance Study, you may not need us.",
      },
      {
        question: "Do you look up property owners or personal information?",
        answer:
          "No. We report on flood risk at a location. We do not run owner lookups, skip traces, plate searches, or any other people-search product, and we have no interest in building one.",
      },
    ],
  },
  {
    title: "Flood zones and insurance",
    items: [
      {
        question: "What is an SFHA?",
        answer:
          "A Special Flood Hazard Area is land FEMA maps as having a 1% or greater chance of flooding in any given year — zones beginning with A or V. Inside an SFHA, federally backed mortgages carry a mandatory flood-insurance requirement. Outside it, no lender can require a policy, though you can still buy one and it will be much cheaper.",
      },
      {
        question: "Zone X means I am safe, right?",
        answer:
          "It means the mapped risk is low, not that flooding is impossible. FEMA maps rivers and coastlines; it does not model every storm drain and street grade. Nationally, a substantial share of flood-insurance claims come from properties outside the SFHA. Zone X is genuinely good news about your insurance requirement and only partly good news about your risk.",
      },
      {
        question: "What is a Base Flood Elevation?",
        answer:
          "The BFE is the height flood water is expected to reach in a 1% annual chance flood, given in feet above a vertical datum such as NAVD88. It is published for detailed-study zones like AE and VE. The gap between your lowest floor and the BFE is the single largest driver of what a flood policy costs.",
      },
      {
        question: "Do I need an Elevation Certificate?",
        answer:
          "If you are in an A or V zone, almost certainly yes: it is the document that proves your lowest floor elevation, and without it carriers rate conservatively. Outside the SFHA it is optional and occasionally still worth the few hundred dollars, because it can move you into better rating.",
      },
      {
        question: "My zone looks wrong. Can it be changed?",
        answer:
          "Sometimes. If your structure sits on naturally high ground that the map generalizes over, a surveyor can support a Letter of Map Amendment (LOMA) to remove the structure from the SFHA. If the change comes from fill or a physical alteration, the relevant process is a Letter of Map Revision. Both go through FEMA, not through us.",
      },
    ],
  },
  {
    title: "Buying and billing",
    items: [
      {
        question: "How much does a report cost?",
        answer:
          "Nine dollars for a single report, fourteen for the version with the elevation and insurance detail, and nineteen for a three-address bundle if you are comparing houses. One-time payments — there is no subscription and nothing to cancel.",
      },
      {
        question: "Can I get a refund?",
        answer:
          "Yes. If the report is not useful to you, reply to the receipt within thirty days and we refund it. We would rather refund a report than argue about one.",
      },
      {
        question: "Is checkout live on this site?",
        answer:
          "Not in this build. This is a demo of the product experience, so checkout is a mock: no card fields are real, no payment processor is connected, and nothing is charged. Payment handling will be added before launch.",
      },
    ],
  },
  {
    title: "Data and limitations",
    items: [
      {
        question: "Where does the flood data come from?",
        answer:
          "In production, from FEMA's published National Flood Hazard Layer and Flood Insurance Rate Map products, matched to the address you provide. In this demo build, from nothing at all: the sample reports are hand-written fabrications, clearly labeled, so the product flow and report design can be reviewed without touching a live data source.",
      },
      {
        question: "How accurate is the address match?",
        answer:
          "Flood zone boundaries are drawn at map scale, and a parcel can straddle two zones. When an address sits near a boundary, the report says so rather than pretending to a precision the map does not have. For a parcel-level answer near a boundary, you need a surveyor.",
      },
      {
        question: "How current is the mapping?",
        answer:
          "Every report prints the FIRM panel number and its effective date so you can see exactly which map vintage the answer came from. FEMA revises panels on a rolling basis, and a report is a snapshot rather than a monitoring service.",
      },
      {
        question: "Do you sell insurance?",
        answer:
          "No. We are not an insurance producer, we take no commissions, and we have no carrier relationships. The premium figures in a report are illustrative ranges to help you budget and sanity-check a quote, not offers of coverage.",
      },
    ],
  },
];

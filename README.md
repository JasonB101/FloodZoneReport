# FloodZoneReport

A design-first consumer website for a US flood-zone report product. A customer enters a US address
and gets a clear, plain-English FEMA flood-zone report: the zone letter, whether the address sits in
a Special Flood Hazard Area, the Base Flood Elevation, an illustrative map panel, insurance notes,
and a print/PDF-ready layout. Reports are priced from $9 to $19.

**This repository is a demo build.** It contains no flood-data integration, no geocoder, no payment
processor, and no API keys. See [Demo mode](#demo-mode) below.

---

## Run it locally

Requires Node.js 20.9+ (developed on Node 22).

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

| Script              | What it does                                       |
| ------------------- | -------------------------------------------------- |
| `npm run dev`       | Dev server with hot reload                          |
| `npm run build`     | Production build (must pass — it does)              |
| `npm start`         | Serve the production build                          |
| `npm run lint`      | ESLint, using the flat config from `eslint-config-next` |
| `npm run typecheck` | `tsc --noEmit`                                      |

The build fetches Inter and Source Serif 4 through `next/font/google`, so the first `npm run build`
needs network access.

---

## Demo mode

Demo mode is the whole point of this build: it lets the product experience be reviewed before any
data integration exists. A persistent banner at the top of every page says so, and the FAQ has a
[dedicated section](src/app/faq/page.tsx) explaining it.

Concretely, in this build:

- **No FEMA services are contacted.** No National Flood Hazard Layer query, no Map Service Center
  request, no FEMA endpoint of any kind.
- **No geocoding.** Address matching is a loose string match against a four-item local list in
  `src/lib/demo-data.ts`.
- **No paid flood-data provider**, and no API keys anywhere in the project. There is no `.env` to
  populate.
- **No payment processor.** Checkout is a visual mock: the card fields are inert placeholders and the
  submit button routes to a confirmation page after a short delay. Stripe would replace
  `src/components/checkout/CheckoutMock.tsx` wholesale.
- **No accounts, analytics, tracking, or email delivery.**

Every flood zone, Base Flood Elevation, FIRM panel number, community ID, premium range, and flood
history note on this site is **fabricated sample content**. The addresses are invented. Treat nothing
here as real.

### Demo sample addresses

Four samples are wired up so a reviewer can click through the full flow without typing anything. They
are surfaced on the landing page, on the lookup page, in the lookup field's suggestion list, and on
`/report`.

| Address                                        | Zone           | SFHA | BFE          | Insurance required | What it demonstrates                                                |
| ---------------------------------------------- | -------------- | ---- | ------------ | ------------------ | ------------------------------------------------------------------- |
| 412 Riverbend Drive, Baton Rouge, LA 70802     | **AE**         | Yes  | 24 ft NAVD88 | Yes                | High-risk riverine floodplain, ground below the BFE                 |
| 27 Sandpiper Walk, Fort Myers Beach, FL 33931  | **VE**         | Yes  | 15 ft NAVD88 | Yes                | Coastal high hazard with wave action, widest premium spread         |
| 3140 Bayou Oaks Street, Houston, TX 77098      | **X** (shaded) | No   | Not published | No                | The misread case: no requirement, real flood history                |
| 1885 Kestrel Ridge Road, Boulder, CO 80304     | **X**          | No   | Not published | No                | Genuinely low risk, stated without hedging                          |

Each one returns a complete report — same sections, same layout, same print output.

---

## Click-through for review

The full flow, with nothing to type:

1. **Landing** (`/`) — value proposition, lookup field, sample addresses, report anatomy, zone
   glossary, honest comparison against the free tools, pricing teaser.
2. **Lookup** (`/lookup`) — the address field with a suggestion list, plus all four samples as
   one-click cards. Typing anything unrecognized returns a demo-mode message rather than a fake
   result.
3. **Report** (`/report/[slug]`) — the full document. Try the Fort Myers Beach VE sample to see the
   report working hardest, or Houston to see the shaded-X nuance. Use **Print / Save as PDF** in the
   action bar to see the print layout.
4. **Pricing** (`/pricing`) — three one-time plans at $9 / $14 / $19 with a feature matrix.
5. **Checkout** (`/checkout?plan=plus`) — mocked payment form with an order summary, then
   `/checkout/success`.
6. **FAQ & disclaimer** (`/faq`) — including "what a FloodZoneReport is not" and the full disclaimer.

`/report` also has a comparison table across all four samples, which is the quickest way to see that
the report adapts to the zone rather than templating over it.

---

## Disclaimers

The product is informational only, and the site says so everywhere. Every page renders a disclaimer
in one of four variants (`card`, `inline`, `strip`, `onDark`) from
`src/components/site/DisclaimerNote.tsx`, plus the full text in the site footer, plus the demo-mode
banner above the header.

The wording lives in one place — `DISCLAIMER` in `src/lib/site.ts` — so it cannot drift between the
footer, the report, and checkout. The core statement:

> Informational purposes only. FloodZoneReport is not an official lender Standard Flood Hazard
> Determination Form (SFHDF) and is not a CoreLogic or other regulated flood-zone determination.

The report document itself carries three: a demo notice in the letterhead, a full "what this report is
not" block in the methodology section, and a demo-mode line in the document footer that survives
printing.

There is deliberately **no** owner-lookup, skip-trace, or plate-search functionality, and no plan for
any. The product reports flood risk at a location.

---

## Tech and structure

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · React 19. No UI component library, no state
management library, no data layer.

```
src/
  app/
    layout.tsx              Root layout: fonts, demo banner, header, footer
    page.tsx                Landing
    lookup/page.tsx         Address lookup
    report/page.tsx         Sample report index + comparison table
    report/[slug]/page.tsx  The report document (statically generated per sample)
    pricing/page.tsx        Pricing + feature matrix
    checkout/page.tsx       Mocked checkout
    checkout/success/page.tsx
    faq/page.tsx            FAQ + full disclaimer
    not-found.tsx
    globals.css             Tailwind theme, brand ramp, print stylesheet
  components/
    checkout/CheckoutMock.tsx
    lookup/AddressLookupForm.tsx    Client: suggestions + simulated lookup pipeline
    lookup/SampleAddressCard.tsx
    report/ReportDocument.tsx       The full report, nine numbered sections
    report/FirmPanel.tsx            Illustrative FIRM-style map, drawn in SVG
    report/ElevationDiagram.tsx     Ground level vs. Base Flood Elevation cross-section
    report/RiskMeter.tsx
    report/ReportActions.tsx        Client: print + copy link
    site/                           Header, footer, logo, demo banner, disclaimer
    ui/                             Button, Container, Eyebrow
  lib/
    demo-data.ts            The four sample reports. All fabricated.
    zones.ts                Flood-zone reference copy (AE, A, AO, VE, X shaded, X)
    map-geometry.ts         Seeded offset-band geometry for the map panel
    site.ts                 Brand strings, nav, disclaimers, pricing, FAQ content
```

A few notes on the interesting parts:

- **The map panel is a drawing, not a map.** `FirmPanel` derives flood-zone bands by offsetting a
  hand-authored centerline, perturbed by a seeded PRNG so boundaries look surveyed rather than ruled.
  The seed has to stay deterministic or server and client renders diverge and React reports a
  hydration mismatch. There is no tile server or basemap involved, and the panel is labeled
  "Illustrative" in the corner.
- **Print output is a real target.** `globals.css` has a `@media print` block that drops the chrome,
  flattens shadows, and sets Letter page margins. `no-print`, `print-plain`, and `print-avoid-break`
  are used throughout the report.
- **Report content is data, not markup.** Adding a fifth sample means adding one object to
  `DEMO_REPORTS`; the report page, comparison table, suggestion list, and sample cards all pick it up.

---

## Not in this build

Deliberate omissions, in rough order of how load-bearing they are:

- FEMA National Flood Hazard Layer integration and address geocoding.
- Stripe (or any) payment processing, receipts, and order records.
- Report delivery by email, and any persistence at all.
- Accounts, saved reports, and the Buyer's Bundle multi-address flow beyond its pricing card.
- Analytics.

See `docs/design-review/` for walkthrough notes aimed at a founder visual and flow review.

import Link from "next/link";
import { AddressLookupForm } from "@/components/lookup/AddressLookupForm";
import { SampleAddressCard } from "@/components/lookup/SampleAddressCard";
import { FirmPanel } from "@/components/report/FirmPanel";
import { DisclaimerNote } from "@/components/site/DisclaimerNote";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { DEMO_REPORTS, SAMPLE_REPORTS, zoneOf } from "@/lib/demo-data";
import { PRICING_PLANS } from "@/lib/site";
import { ZONE_DEFINITIONS } from "@/lib/zones";

const REPORT_CONTENTS = [
  {
    title: "Your zone, stated once and clearly",
    body: "AE, VE, X, AO — the letter FEMA assigned, whether that puts you in a Special Flood Hazard Area, and what the letter actually implies. No map viewer to interpret.",
  },
  {
    title: "The insurance answer you came for",
    body: "Whether a lender can require a policy, an illustrative premium range, and the specific factors that move that number at your address.",
  },
  {
    title: "Base Flood Elevation in context",
    body: "The published flood elevation next to your ground level, drawn as a cross-section, so \"24 feet NAVD88\" becomes a picture instead of a number.",
  },
  {
    title: "The map vintage, printed on the page",
    body: "FIRM panel number and effective date on every report, so you can verify the exact map we read at the FEMA Map Service Center yourself.",
  },
  {
    title: "What to do next",
    body: "A short, ordered checklist: Elevation Certificate, claim history, who to call, which questions to ask before your inspection period closes.",
  },
  {
    title: "Print-ready, shareable",
    body: "Laid out as a document. Save it as a PDF for your agent, your lender, or your own file in one click.",
  },
];

const STEPS = [
  {
    title: "Enter an address",
    body: "One US property address. No account, no phone number, no upsell funnel.",
  },
  {
    title: "We read the flood mapping",
    body: "We match your address to the FEMA flood hazard layer and pull the panel, the zone, and the flood elevation.",
  },
  {
    title: "You get a report you can use",
    body: "Zone, SFHA status, insurance implications, and next steps — written to be read once and understood.",
  },
];

const HIGHLIGHT_ZONES = [
  ZONE_DEFINITIONS.VE,
  ZONE_DEFINITIONS.AE,
  ZONE_DEFINITIONS.X_SHADED,
  ZONE_DEFINITIONS.X,
];

const HONEST_COMPARISON = [
  {
    them: "Hands you a map viewer and a zone letter",
    us: "Explains what the letter means for your insurance, your loan, and your next step",
  },
  {
    them: "Authoritative but written for floodplain managers",
    us: "Written for the person who owns the house",
  },
  {
    them: "Nothing to keep or share",
    us: "A print-ready report with the panel number and effective date on it",
  },
  {
    them: "Free",
    us: "Nine dollars, once, refundable if it is not useful",
  },
];

export default function HomePage() {
  const featured = DEMO_REPORTS[0];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-950 bg-contour">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-canvas/95 to-transparent"
        />
        <Container width="lg" className="relative py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/8 px-3 py-1.5 text-[0.75rem] font-medium text-slate-200 ring-1 ring-white/15 backdrop-blur-sm">
              <span className="size-1.5 rounded-full bg-aqua-400" />
              FEMA flood-zone reports · from $9 · no subscription
            </span>

            <h1 className="mt-6 font-serif text-[2.5rem] leading-[1.06] tracking-[-0.02em] text-white sm:text-[3.25rem] lg:text-[3.75rem]">
              Is your address in a flood zone?
              <span className="block text-brand-200">Find out in plain English.</span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-slate-300 sm:text-lg">
              Enter a US address and get a clear report: your FEMA flood zone, whether you are in a
              Special Flood Hazard Area, your Base Flood Elevation, and what all of it means for
              insurance — written in sentences, not jargon.
            </p>

            <div className="mx-auto mt-8 max-w-xl text-left">
              <AddressLookupForm />
            </div>

            <ul className="mx-auto mt-7 flex max-w-xl flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[0.8125rem] text-slate-300">
              {["Report in under a minute", "One-time $9, no account", "Print or share as PDF"].map(
                (item) => (
                  <li key={item} className="flex items-center gap-1.5">
                    <svg viewBox="0 0 16 16" className="size-3.5 text-aqua-400" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M3 8.5l3.5 3.5L13 4.5" />
                    </svg>
                    {item}
                  </li>
                ),
              )}
            </ul>
          </div>

          <DisclaimerNote variant="onDark" className="mx-auto mt-12 max-w-3xl" />
        </Container>
      </section>

      {/* Sample addresses */}
      <section id="samples" className="scroll-mt-24 border-b border-slate-200 bg-canvas py-16 sm:py-20">
        <Container width="xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <Eyebrow>One-click demo</Eyebrow>
              <h2 className="mt-2 font-serif text-3xl leading-tight tracking-tight text-ink sm:text-[2.25rem]">
                Nothing to type. Pick a sample address.
              </h2>
              <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-soft">
                Four hand-built sample properties covering the cases that matter: a riverine
                floodplain, a coastal high-hazard lot, the moderate-risk case people misread, and a
                genuinely low-risk address. Each one opens a complete report.
              </p>
            </div>
            <ButtonLink href="/lookup" variant="secondary" size="md">
              Open the lookup page
            </ButtonLink>
          </div>

          <div className="mt-9 grid gap-4 sm:grid-cols-2">
            {SAMPLE_REPORTS.map((report) => (
              <SampleAddressCard key={report.slug} report={report} />
            ))}
          </div>

          <DisclaimerNote variant="inline" className="mt-8 max-w-3xl" />
        </Container>
      </section>

      {/* What's in the report */}
      <section className="border-b border-slate-200 bg-white py-16 sm:py-20">
        <Container width="xl">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-start lg:gap-16">
            <div>
              <Eyebrow>What you get</Eyebrow>
              <h2 className="mt-2 font-serif text-3xl leading-tight tracking-tight text-ink sm:text-[2.25rem]">
                A report, not a map you have to decode
              </h2>
              <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-soft">
                The flood data is public. The interpretation is the product. Every report answers the
                same six questions in the same order, so you can read it once and be done.
              </p>

              <dl className="mt-8 space-y-6">
                {REPORT_CONTENTS.map((item, index) => (
                  <div key={item.title} className="flex gap-4">
                    <span className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-lg bg-brand-50 font-mono text-[0.6875rem] font-semibold text-brand-700 ring-1 ring-brand-100">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <dt className="text-[0.9375rem] font-semibold text-ink">{item.title}</dt>
                      <dd className="mt-1 text-[0.9375rem] leading-relaxed text-ink-soft">
                        {item.body}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>

            <div className="lg:sticky lg:top-24">
              <div className="rounded-3xl border border-slate-200 bg-canvas p-4 shadow-card sm:p-5">
                <div className="flex items-center justify-between gap-3 px-1 pb-3">
                  <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-ink-soft">
                    From the {featured.address.city} sample report
                  </p>
                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-[0.1em] text-amber-900">
                    Demo
                  </span>
                </div>
                <FirmPanel report={featured} />
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <MiniStat label="Zone" value={zoneOf(featured).label} />
                  <MiniStat label="SFHA" value={zoneOf(featured).sfha ? "Yes" : "No"} />
                  <MiniStat
                    label="BFE"
                    value={featured.elevation.bfe ? `${featured.elevation.bfe} ft` : "n/a"}
                  />
                </div>
                <ButtonLink href={`/report/${featured.slug}`} className="mt-4 w-full" size="md">
                  Read the full sample report
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section className="border-b border-slate-200 bg-canvas bg-grid-soft py-16 sm:py-20">
        <Container width="xl">
          <div className="max-w-2xl">
            <Eyebrow>How it works</Eyebrow>
            <h2 className="mt-2 font-serif text-3xl leading-tight tracking-tight text-ink sm:text-[2.25rem]">
              Three steps, fully automated
            </h2>
            <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-soft">
              No phone call, no appointment, no salesperson. You will not talk to anyone unless you
              email us on purpose.
            </p>
          </div>

          <ol className="mt-10 grid gap-5 md:grid-cols-3">
            {STEPS.map((step, index) => (
              <li
                key={step.title}
                className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-card"
              >
                <span className="absolute -right-2 -top-4 font-serif text-[5rem] font-semibold leading-none text-brand-50">
                  {index + 1}
                </span>
                <h3 className="relative text-[1.0625rem] font-semibold text-ink">{step.title}</h3>
                <p className="relative mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Zone explainer */}
      <section className="border-b border-slate-200 bg-white py-16 sm:py-20">
        <Container width="xl">
          <div className="max-w-2xl">
            <Eyebrow>Zone glossary</Eyebrow>
            <h2 className="mt-2 font-serif text-3xl leading-tight tracking-tight text-ink sm:text-[2.25rem]">
              What the letters mean
            </h2>
            <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-soft">
              FEMA&apos;s zone codes are short and unhelpfully similar. Here is the whole hierarchy in
              four cards.
            </p>
          </div>

          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {HIGHLIGHT_ZONES.map((zone) => (
              <div
                key={zone.code}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-card"
              >
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-3xl font-semibold leading-none text-ink">
                    {zone.label}
                  </span>
                  {zone.qualifier && (
                    <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-ink-soft">
                      {zone.qualifier}
                    </span>
                  )}
                </div>
                <p className="mt-3 text-[0.8125rem] font-semibold text-ink">{zone.officialName}</p>
                <p className="mt-2 flex-1 text-[0.8125rem] leading-relaxed text-ink-soft">
                  {zone.headline}
                </p>
                <dl className="mt-4 space-y-1.5 border-t border-slate-100 pt-3 text-[0.75rem]">
                  <div className="flex justify-between gap-2">
                    <dt className="text-ink-soft">SFHA</dt>
                    <dd className={`font-semibold ${zone.sfha ? "text-rose-700" : "text-emerald-700"}`}>
                      {zone.sfha ? "Yes" : "No"}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-ink-soft">Insurance required</dt>
                    <dd className={`font-semibold ${zone.insuranceRequired ? "text-rose-700" : "text-emerald-700"}`}>
                      {zone.insuranceRequired ? "Yes" : "No"}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-ink-soft">Annual chance</dt>
                    <dd className="text-right font-semibold text-ink">{zone.annualChanceLabel}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Honest comparison */}
      <section className="border-b border-slate-200 bg-brand-950 bg-contour py-16 sm:py-20">
        <Container width="lg">
          <div className="max-w-2xl">
            <Eyebrow tone="dark">The honest pitch</Eyebrow>
            <h2 className="mt-2 font-serif text-3xl leading-tight tracking-tight text-white sm:text-[2.25rem]">
              The data is free. The explanation is what you are buying.
            </h2>
            <p className="mt-3 text-[1.0625rem] leading-relaxed text-slate-300">
              FEMA&apos;s Map Service Center is authoritative, free, and public, and so are several map
              viewers built on top of it. If you are comfortable reading a FIRM panel and a Flood
              Insurance Study, you do not need us. Most people are not, and that is the entire
              business.
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-white/12 bg-white/5 backdrop-blur-sm">
            <div className="grid grid-cols-2 gap-px border-b border-white/12 bg-white/5">
              <p className="px-5 py-3 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-slate-400">
                Free map viewers
              </p>
              <p className="px-5 py-3 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-aqua-300">
                FloodZoneReport
              </p>
            </div>
            <ul>
              {HONEST_COMPARISON.map((row) => (
                <li
                  key={row.us}
                  className="grid grid-cols-2 gap-px border-b border-white/8 last:border-0"
                >
                  <p className="px-5 py-4 text-[0.875rem] leading-relaxed text-slate-400">
                    {row.them}
                  </p>
                  <p className="px-5 py-4 text-[0.875rem] leading-relaxed text-white">{row.us}</p>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-6 max-w-3xl text-[0.8125rem] leading-relaxed text-slate-400">
            We hold no exclusive data and make no claim to any. We are not affiliated with FEMA,
            CoreLogic, or any government agency, and we do not produce lender determinations.
          </p>
        </Container>
      </section>

      {/* Pricing teaser */}
      <section className="border-b border-slate-200 bg-white py-16 sm:py-20">
        <Container width="xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <Eyebrow>Pricing</Eyebrow>
              <h2 className="mt-2 font-serif text-3xl leading-tight tracking-tight text-ink sm:text-[2.25rem]">
                Nine to nineteen dollars. Once.
              </h2>
              <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-soft">
                No subscription, no trial that converts, no per-page charge for the PDF you already
                paid for.
              </p>
            </div>
            <ButtonLink href="/pricing" variant="secondary">
              Compare all three
            </ButtonLink>
          </div>

          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {PRICING_PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`flex flex-col rounded-2xl border p-6 ${
                  plan.featured
                    ? "border-brand-300 bg-brand-50/50 shadow-lift"
                    : "border-slate-200 bg-white shadow-card"
                }`}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-[0.9375rem] font-semibold text-ink">{plan.name}</h3>
                  {plan.badge && (
                    <span className="rounded-full bg-brand-600 px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-[0.1em] text-white">
                      {plan.badge}
                    </span>
                  )}
                </div>
                <p className="mt-3 flex items-baseline gap-1.5">
                  <span className="font-serif text-4xl font-semibold tracking-tight text-ink">
                    ${plan.price}
                  </span>
                  <span className="text-[0.8125rem] text-ink-soft">{plan.cadence}</span>
                </p>
                <p className="mt-3 flex-1 text-[0.875rem] leading-relaxed text-ink-soft">
                  {plan.blurb}
                </p>
                <ButtonLink
                  href={`/checkout?plan=${plan.id}`}
                  variant={plan.featured ? "primary" : "secondary"}
                  className="mt-5 w-full"
                >
                  {plan.cta}
                </ButtonLink>
              </div>
            ))}
          </div>
          <p className="mt-5 text-[0.8125rem] text-ink-soft">
            Checkout is mocked in this build — no payment processor is connected and nothing is
            charged.
          </p>
        </Container>
      </section>

      {/* Closing CTA */}
      <section className="bg-canvas py-16 sm:py-20">
        <Container width="lg">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lift">
            <div className="grid gap-8 p-8 sm:p-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-center">
              <div>
                <h2 className="font-serif text-[1.75rem] leading-tight tracking-tight text-ink sm:text-[2rem]">
                  Check an address now
                </h2>
                <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-soft">
                  Pick a sample address and click straight through to a finished report — landing to
                  report to checkout, no data entry required.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <ButtonLink href="/lookup" size="lg">
                    Check an address
                  </ButtonLink>
                  <ButtonLink href="/faq" variant="secondary" size="lg">
                    Read the FAQ
                  </ButtonLink>
                </div>
                <p className="mt-5 text-[0.8125rem] text-ink-soft">
                  Questions about what this is and is not?{" "}
                  <Link
                    href="/faq#disclaimer"
                    className="font-medium text-brand-700 underline underline-offset-2"
                  >
                    Start with the disclaimer
                  </Link>
                  .
                </p>
              </div>
              <div className="space-y-3">
                {SAMPLE_REPORTS.slice(0, 3).map((report) => (
                  <SampleAddressCard key={report.slug} report={report} compact />
                ))}
              </div>
            </div>
            <DisclaimerNote variant="strip" className="border-b-0" />
          </div>
        </Container>
      </section>
    </>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-3 py-2.5">
      <p className="text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-ink-soft">
        {label}
      </p>
      <p className="mt-0.5 text-[0.9375rem] font-semibold text-ink">{value}</p>
    </div>
  );
}

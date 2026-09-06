import type { Metadata } from "next";
import Link from "next/link";
import { DisclaimerNote } from "@/components/site/DisclaimerNote";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PRICING_PLANS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "One-time pricing from $9 to $19. No subscription. Checkout is mocked in this demo build — nothing is charged.",
};

const FEATURE_MATRIX: { feature: string; single: boolean | string; plus: boolean | string; bundle: boolean | string }[] = [
  { feature: "FEMA flood zone and SFHA status", single: true, plus: true, bundle: true },
  { feature: "FIRM panel number and effective date", single: true, plus: true, bundle: true },
  { feature: "Plain-English risk explanation", single: true, plus: true, bundle: true },
  { feature: "Illustrative flood hazard map panel", single: true, plus: true, bundle: true },
  { feature: "Print / PDF-ready layout", single: true, plus: true, bundle: true },
  { feature: "Shareable report link", single: true, plus: true, bundle: true },
  { feature: "Ground-to-BFE elevation diagram", single: false, plus: true, bundle: true },
  { feature: "Premium range with price drivers", single: false, plus: true, bundle: true },
  { feature: "Elevation Certificate guidance", single: false, plus: true, bundle: true },
  { feature: "Local flood history summary", single: false, plus: true, bundle: true },
  { feature: "Mitigation checklist", single: false, plus: true, bundle: true },
  { feature: "Number of addresses", single: "1", plus: "1", bundle: "3" },
  { feature: "Side-by-side zone comparison", single: false, plus: false, bundle: true },
  { feature: "Combined PDF for agent or lender", single: false, plus: false, bundle: true },
];

const GUARANTEES = [
  {
    title: "One-time payment",
    body: "No subscription, no auto-renewal, nothing to remember to cancel. You buy a report; you own the report.",
  },
  {
    title: "Thirty-day refund",
    body: "If the report is not useful, reply to your receipt and we refund it. We would rather refund than argue.",
  },
  {
    title: "No data resale",
    body: "We do not sell or broker your address, and we do not run owner or people lookups. Property flood risk only.",
  },
  {
    title: "No insurance commissions",
    body: "We are not an insurance producer and take no carrier referral fees, so nothing in a report is steering you.",
  },
];

export default function PricingPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-slate-200 bg-brand-950 bg-contour">
        <Container width="lg" className="relative py-14 sm:py-16">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow tone="dark">Pricing</Eyebrow>
            <h1 className="mt-2.5 font-serif text-[2.25rem] leading-[1.08] tracking-[-0.02em] text-white sm:text-[2.75rem]">
              Nine dollars for a straight answer
            </h1>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-slate-300">
              Pay once, keep the report. Two upgrades exist for people who need the elevation and
              insurance detail, or who are comparing several houses at the same time.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-canvas py-14 sm:py-16">
        <Container width="xl">
          <div className="grid items-start gap-5 lg:grid-cols-3">
            {PRICING_PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`relative flex h-full flex-col rounded-3xl border p-7 ${
                  plan.featured
                    ? "border-brand-300 bg-white shadow-lift lg:-mt-3 lg:pb-9 lg:pt-9"
                    : "border-slate-200 bg-white shadow-card"
                }`}
              >
                {plan.badge && (
                  <span className="absolute -top-3 left-7 rounded-full bg-brand-600 px-3 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-white shadow-sm">
                    {plan.badge}
                  </span>
                )}

                <h2 className="text-[1.0625rem] font-semibold text-ink">{plan.name}</h2>
                <p className="mt-3 flex items-baseline gap-2">
                  <span className="font-serif text-[3rem] font-semibold leading-none tracking-tight text-ink">
                    ${plan.price}
                  </span>
                  <span className="text-[0.875rem] text-ink-soft">{plan.cadence}</span>
                </p>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">{plan.blurb}</p>

                <ButtonLink
                  href={`/checkout?plan=${plan.id}`}
                  variant={plan.featured ? "primary" : "secondary"}
                  size="lg"
                  className="mt-6 w-full"
                >
                  {plan.cta}
                </ButtonLink>

                <ul className="mt-7 space-y-3 border-t border-slate-100 pt-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-2.5 text-[0.875rem] leading-relaxed text-ink">
                      <svg
                        viewBox="0 0 20 20"
                        className="mt-0.5 size-4 shrink-0 text-aqua-600"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M4 10.5l4 4 8-9" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-amber-300 bg-amber-50 p-5">
            <p className="text-[0.875rem] leading-relaxed text-amber-950">
              <span className="font-semibold">Demo mode.</span> Checkout on this site is a visual
              mock. No payment processor is connected, no card details are collected or transmitted,
              and no charge is ever made. Payment handling will be integrated before launch.
            </p>
          </div>

          <DisclaimerNote variant="inline" className="mt-6 max-w-3xl" />
        </Container>
      </section>

      {/* Feature matrix */}
      <section className="border-y border-slate-200 bg-white py-14 sm:py-16">
        <Container width="lg">
          <div className="max-w-2xl">
            <Eyebrow>Compare</Eyebrow>
            <h2 className="mt-2 font-serif text-3xl leading-tight tracking-tight text-ink sm:text-[2.125rem]">
              What is in each one
            </h2>
          </div>

          <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200 shadow-card">
            <table className="w-full min-w-[38rem] border-collapse text-left text-[0.875rem]">
              <caption className="sr-only">Feature comparison across the three plans</caption>
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70">
                  <th scope="col" className="px-4 py-3 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-ink-soft">
                    Feature
                  </th>
                  {PRICING_PLANS.map((plan) => (
                    <th
                      key={plan.id}
                      scope="col"
                      className="px-4 py-3 text-center text-[0.75rem] font-semibold text-ink"
                    >
                      {plan.name}
                      <span className="mt-0.5 block font-mono text-[0.6875rem] font-normal text-ink-soft">
                        ${plan.price}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {FEATURE_MATRIX.map((row) => (
                  <tr key={row.feature} className="border-b border-slate-100 last:border-0 bg-white">
                    <th scope="row" className="px-4 py-3 font-normal text-ink">
                      {row.feature}
                    </th>
                    <MatrixCell value={row.single} />
                    <MatrixCell value={row.plus} />
                    <MatrixCell value={row.bundle} />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      {/* Guarantees */}
      <section className="bg-canvas py-14 sm:py-16">
        <Container width="xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {GUARANTEES.map((item) => (
              <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
                <h3 className="text-[0.9375rem] font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-soft">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-lift sm:p-10">
            <h2 className="font-serif text-2xl leading-tight tracking-tight text-ink sm:text-[1.75rem]">
              Not sure yet? Read a full report first.
            </h2>
            <p className="mt-3 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-soft">
              All four sample reports are complete and free to read. Nothing is truncated, blurred, or
              held behind the price.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href="/report" size="lg">
                Read a sample report
              </ButtonLink>
              <ButtonLink href="/faq" variant="secondary" size="lg">
                Pricing FAQ
              </ButtonLink>
            </div>
            <p className="mt-5 text-[0.8125rem] text-ink-soft">
              Questions about refunds or what a report is not?{" "}
              <Link href="/faq#buying-and-billing" className="font-medium text-brand-700 underline underline-offset-2">
                Billing FAQ
              </Link>{" "}
              and{" "}
              <Link href="/faq#disclaimer" className="font-medium text-brand-700 underline underline-offset-2">
                full disclaimer
              </Link>
              .
            </p>
          </div>

          <DisclaimerNote className="mt-8" />
        </Container>
      </section>
    </>
  );
}

function MatrixCell({ value }: { value: boolean | string }) {
  if (typeof value === "string") {
    return <td className="px-4 py-3 text-center font-semibold text-ink">{value}</td>;
  }
  return (
    <td className="px-4 py-3 text-center">
      {value ? (
        <span className="inline-flex items-center justify-center text-aqua-600" aria-label="Included">
          <svg viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 10.5l4 4 8-9" />
          </svg>
        </span>
      ) : (
        <span className="text-slate-300" aria-label="Not included">
          —
        </span>
      )}
    </td>
  );
}

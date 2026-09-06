import type { Metadata } from "next";
import Link from "next/link";
import { CheckoutMock } from "@/components/checkout/CheckoutMock";
import { DisclaimerNote } from "@/components/site/DisclaimerNote";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { formatAddress, getReport, zoneDisplayLabel, zoneOf } from "@/lib/demo-data";
import { PRICING_PLANS, getPlan } from "@/lib/site";

export const metadata: Metadata = {
  title: "Checkout (demo)",
  description:
    "Mocked checkout for FloodZoneReport. No payment processor is connected and nothing is charged.",
};

interface PageProps {
  searchParams: Promise<{ plan?: string; report?: string }>;
}

export default async function CheckoutPage({ searchParams }: PageProps) {
  const { plan: planId, report: reportSlug } = await searchParams;
  const plan = getPlan(planId);
  const report = reportSlug ? getReport(reportSlug) : undefined;

  return (
    <section className="bg-canvas py-12 sm:py-14">
      <Container width="lg">
        <div className="max-w-2xl">
          <Eyebrow>Checkout</Eyebrow>
          <h1 className="mt-2 font-serif text-[2rem] leading-tight tracking-tight text-ink sm:text-[2.375rem]">
            One report, one payment
          </h1>
          <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-soft">
            This is a mocked checkout for design review. It shows the flow and the order summary a
            customer would see; no payment is processed.
          </p>
        </div>

        <div className="mt-9 grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-8">
          {/* Form */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
            <CheckoutMock plan={plan} reportSlug={report?.slug} />
          </div>

          {/* Order summary */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card">
              <div className="border-b border-slate-200 bg-slate-50/70 px-6 py-4">
                <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-ink-soft">
                  Order summary
                </h2>
              </div>

              <div className="px-6 py-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[0.9375rem] font-semibold text-ink">{plan.name}</p>
                    <p className="mt-0.5 text-[0.8125rem] text-ink-soft">{plan.cadence}</p>
                  </div>
                  <p className="font-serif text-2xl font-semibold text-ink">${plan.price}</p>
                </div>

                {report && (
                  <div className="mt-5 rounded-2xl border border-slate-200 bg-canvas p-4">
                    <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-ink-soft">
                      Report address
                    </p>
                    <p className="mt-1.5 text-[0.875rem] font-medium text-ink">
                      {formatAddress(report.address)}
                    </p>
                    <p className="mt-1 text-[0.8125rem] text-ink-soft">
                      Zone {zoneDisplayLabel(zoneOf(report))} · SFHA{" "}
                      {zoneOf(report).sfha ? "yes" : "no"}
                    </p>
                  </div>
                )}

                <ul className="mt-5 space-y-2.5 border-t border-slate-100 pt-5">
                  {plan.features.slice(0, 5).map((feature) => (
                    <li key={feature} className="flex gap-2.5 text-[0.8125rem] leading-relaxed text-ink-soft">
                      <svg viewBox="0 0 20 20" className="mt-0.5 size-3.5 shrink-0 text-aqua-600" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M4 10.5l4 4 8-9" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <dl className="mt-5 space-y-2 border-t border-slate-100 pt-5 text-[0.875rem]">
                  <div className="flex justify-between">
                    <dt className="text-ink-soft">Subtotal</dt>
                    <dd className="font-medium text-ink">${plan.price}.00</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-ink-soft">Estimated tax</dt>
                    <dd className="font-medium text-ink">$0.00</dd>
                  </div>
                  <div className="flex justify-between border-t border-slate-100 pt-2 text-[0.9375rem]">
                    <dt className="font-semibold text-ink">Total due today</dt>
                    <dd className="font-semibold text-ink">${plan.price}.00</dd>
                  </div>
                </dl>

                <p className="mt-4 rounded-xl border border-amber-300 bg-amber-50 px-3.5 py-2.5 text-[0.75rem] leading-relaxed text-amber-950">
                  <span className="font-semibold">Demo mode.</span> Nothing is charged. This summary
                  is illustrative and no order is created.
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
              <p className="text-[0.8125rem] font-semibold text-ink">Change your plan</p>
              <ul className="mt-3 space-y-2">
                {PRICING_PLANS.filter((item) => item.id !== plan.id).map((item) => (
                  <li key={item.id}>
                    <Link
                      href={`/checkout?plan=${item.id}${report ? `&report=${report.slug}` : ""}`}
                      className="flex items-center justify-between gap-3 rounded-xl bg-canvas px-3.5 py-2.5 text-[0.8125rem] text-ink-soft ring-1 ring-slate-200 transition-colors hover:bg-brand-50 hover:text-brand-800 hover:ring-brand-200"
                    >
                      <span className="font-medium">{item.name}</span>
                      <span className="font-mono">${item.price}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <DisclaimerNote variant="inline" className="mt-5" />
          </aside>
        </div>
      </Container>
    </section>
  );
}

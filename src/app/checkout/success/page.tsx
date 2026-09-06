import type { Metadata } from "next";
import { SampleAddressCard } from "@/components/lookup/SampleAddressCard";
import { DisclaimerNote } from "@/components/site/DisclaimerNote";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { DEMO_REPORTS, formatAddress, getReport } from "@/lib/demo-data";
import { getPlan } from "@/lib/site";

export const metadata: Metadata = {
  title: "Demo order confirmed",
  description: "Mocked order confirmation. No payment was processed in this demo build.",
};

interface PageProps {
  searchParams: Promise<{ plan?: string; report?: string }>;
}

export default async function CheckoutSuccessPage({ searchParams }: PageProps) {
  const { plan: planId, report: reportSlug } = await searchParams;
  const plan = getPlan(planId);
  const report = getReport(reportSlug ?? "") ?? DEMO_REPORTS[0];
  const others = DEMO_REPORTS.filter((item) => item.slug !== report.slug).slice(0, 3);

  return (
    <section className="bg-canvas py-12 sm:py-16">
      <Container width="lg">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lift">
          <div className="border-b border-slate-200 bg-brand-950 bg-contour px-7 py-9 sm:px-10 sm:py-11">
            <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-aqua-400/15 ring-1 ring-aqua-400/40">
              <svg viewBox="0 0 24 24" className="size-6 text-aqua-300" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12.5l4.5 4.5L19 7" />
              </svg>
            </span>
            <h1 className="mt-5 font-serif text-[2rem] leading-tight tracking-tight text-white sm:text-[2.375rem]">
              Demo order confirmed
            </h1>
            <p className="mt-3 max-w-xl text-[1.0625rem] leading-relaxed text-slate-300">
              In production this is where your report would be unlocked and emailed to you. In this
              build nothing was charged, no email was sent, and no order was created.
            </p>
            <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-amber-400/15 px-3 py-1.5 text-[0.75rem] font-semibold text-amber-200 ring-1 ring-amber-400/30">
              Mocked payment · no processor connected
            </p>
          </div>

          <div className="grid gap-8 px-7 py-8 sm:px-10 sm:py-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div>
              <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-ink-soft">
                Receipt (illustrative)
              </h2>
              <dl className="mt-4 space-y-3 rounded-2xl border border-slate-200 bg-canvas p-5 text-[0.875rem]">
                <div className="flex justify-between gap-4">
                  <dt className="text-ink-soft">Plan</dt>
                  <dd className="font-medium text-ink">{plan.name}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-ink-soft">Amount</dt>
                  <dd className="font-medium text-ink">${plan.price}.00 USD</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-ink-soft">Order reference</dt>
                  <dd className="font-mono font-medium text-ink">DEMO-0000-0000</dd>
                </div>
                <div className="flex justify-between gap-4 border-t border-slate-200 pt-3">
                  <dt className="text-ink-soft">Address</dt>
                  <dd className="text-right font-medium text-ink">{formatAddress(report.address)}</dd>
                </div>
              </dl>

              <div className="mt-6">
                <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-ink-soft">
                  Your report
                </h2>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">
                  Open the full document, then print it or save it as a PDF from the report page.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <ButtonLink href={`/report/${report.slug}`} size="lg">
                    Open my report
                  </ButtonLink>
                  <ButtonLink href="/lookup" variant="secondary" size="lg">
                    Check another address
                  </ButtonLink>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-ink-soft">
                Other sample reports
              </h2>
              <div className="mt-4 space-y-3">
                {others.map((item) => (
                  <SampleAddressCard key={item.slug} report={item} compact />
                ))}
              </div>
            </div>
          </div>

          <DisclaimerNote variant="strip" className="border-b-0" />
        </div>

        <DisclaimerNote className="mt-8" />
      </Container>
    </section>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SampleAddressCard } from "@/components/lookup/SampleAddressCard";
import { ReportActions } from "@/components/report/ReportActions";
import { ReportDocument } from "@/components/report/ReportDocument";
import { DisclaimerNote } from "@/components/site/DisclaimerNote";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { DEMO_REPORTS, formatAddress, getReport, zoneDisplayLabel, zoneOf } from "@/lib/demo-data";
import { PRICING_PLANS } from "@/lib/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return DEMO_REPORTS.map((report) => ({ slug: report.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const report = getReport(slug);
  if (!report) return { title: "Report not found" };

  const zone = zoneOf(report);
  return {
    title: `Zone ${zoneDisplayLabel(zone)} report — ${report.address.line1}`,
    description: `Demo FEMA flood-zone report for ${formatAddress(report.address)}. Zone ${zoneDisplayLabel(
      zone,
    )}, SFHA ${zone.sfha ? "yes" : "no"}. Informational only — not a lender determination.`,
  };
}

export default async function ReportPage({ params }: PageProps) {
  const { slug } = await params;
  const report = getReport(slug);
  if (!report) notFound();

  const others = DEMO_REPORTS.filter((item) => item.slug !== report.slug);
  const plan = PRICING_PLANS[1];

  return (
    <>
      {/* Action bar */}
      <div className="no-print sticky top-16 z-30 border-b border-slate-200 bg-white/85 backdrop-blur-xl">
        <Container width="lg" className="flex flex-wrap items-center justify-between gap-3 py-3">
          <nav aria-label="Breadcrumb" className="min-w-0">
            <ol className="flex min-w-0 items-center gap-1.5 text-[0.8125rem] text-ink-soft">
              <li>
                <Link href="/lookup" className="hover:text-brand-700">
                  Lookup
                </Link>
              </li>
              <li aria-hidden="true" className="text-slate-300">
                /
              </li>
              <li className="min-w-0 truncate font-medium text-ink">{report.address.line1}</li>
            </ol>
          </nav>
          <ReportActions />
        </Container>
      </div>

      <section className="bg-canvas py-8 sm:py-10">
        <Container width="lg">
          <ReportDocument report={report} />
        </Container>
      </section>

      {/* Post-report upsell + navigation */}
      <section className="no-print border-t border-slate-200 bg-white py-14 sm:py-16">
        <Container width="lg">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-12">
            <div>
              <h2 className="font-serif text-2xl leading-tight tracking-tight text-ink sm:text-[1.75rem]">
                Want this for your own address?
              </h2>
              <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-soft">
                You just read the complete report. Nothing is held back behind the paywall — the
                sample you are looking at is the product. Reports start at ${PRICING_PLANS[0].price}.
              </p>

              <div className="mt-6 rounded-2xl border border-brand-200 bg-brand-50/50 p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-[0.9375rem] font-semibold text-ink">{plan.name}</p>
                  <p className="font-serif text-2xl font-semibold text-ink">
                    ${plan.price}
                    <span className="ml-1 font-sans text-[0.8125rem] font-normal text-ink-soft">
                      {plan.cadence}
                    </span>
                  </p>
                </div>
                <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-soft">{plan.blurb}</p>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  <ButtonLink href={`/checkout?plan=${plan.id}&report=${report.slug}`}>
                    Continue to checkout
                  </ButtonLink>
                  <ButtonLink href="/pricing" variant="secondary">
                    Compare plans
                  </ButtonLink>
                </div>
                <p className="mt-3 text-[0.75rem] text-amber-800">
                  Demo mode — checkout is a mock. No card is collected and nothing is charged.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-ink-soft">
                Compare another sample
              </h2>
              <div className="mt-4 space-y-3">
                {others.map((item) => (
                  <SampleAddressCard key={item.slug} report={item} compact />
                ))}
              </div>
            </div>
          </div>

          <DisclaimerNote className="mt-10" />
        </Container>
      </section>
    </>
  );
}

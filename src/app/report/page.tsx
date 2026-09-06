import type { Metadata } from "next";
import { SampleAddressCard } from "@/components/lookup/SampleAddressCard";
import { DisclaimerNote } from "@/components/site/DisclaimerNote";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SAMPLE_REPORTS, zoneOf } from "@/lib/demo-data";

export const metadata: Metadata = {
  title: "Sample reports",
  description:
    "Four complete sample FloodZoneReport documents covering Zone AE, Zone VE, shaded Zone X, and unshaded Zone X. Demo mode — fabricated sample data.",
};

export default function ReportIndexPage() {
  return (
    <>
      <section className="border-b border-slate-200 bg-white py-14 sm:py-16">
        <Container width="xl">
          <div className="max-w-2xl">
            <Eyebrow>Sample reports</Eyebrow>
            <h1 className="mt-2 font-serif text-[2.25rem] leading-[1.08] tracking-[-0.02em] text-ink sm:text-[2.75rem]">
              Four reports, four different answers
            </h1>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-soft">
              These are complete documents, not previews — same layout, same sections, same print
              output a paying customer would receive. Every value in them is fabricated demo content.
            </p>
          </div>

          <div className="mt-9 grid gap-4 lg:grid-cols-2">
            {SAMPLE_REPORTS.map((report) => (
              <SampleAddressCard key={report.slug} report={report} />
            ))}
          </div>

          <div className="mt-10 overflow-x-auto rounded-2xl border border-slate-200 shadow-card">
            <table className="w-full min-w-[42rem] border-collapse bg-white text-left text-[0.875rem]">
              <caption className="sr-only">Comparison of the four demo sample reports</caption>
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-[0.6875rem] uppercase tracking-[0.12em] text-ink-soft">
                  <th scope="col" className="px-4 py-3 font-semibold">Sample</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Zone</th>
                  <th scope="col" className="px-4 py-3 font-semibold">SFHA</th>
                  <th scope="col" className="px-4 py-3 font-semibold">BFE</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Insurance required</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Illustrative premium</th>
                </tr>
              </thead>
              <tbody>
                {SAMPLE_REPORTS.map((report) => {
                  const zone = zoneOf(report);
                  return (
                    <tr key={report.slug} className="border-b border-slate-100 last:border-0">
                      <th scope="row" className="px-4 py-3.5 font-medium text-ink">
                        {report.address.city}, {report.address.state}
                      </th>
                      <td className="px-4 py-3.5 font-mono font-semibold text-ink">
                        {zone.label}
                        {zone.qualifier ? ` (${zone.qualifier})` : ""}
                      </td>
                      <td className={`px-4 py-3.5 font-semibold ${zone.sfha ? "text-rose-700" : "text-emerald-700"}`}>
                        {zone.sfha ? "Yes" : "No"}
                      </td>
                      <td className="px-4 py-3.5 text-ink-soft">
                        {report.elevation.bfe === null ? "Not published" : `${report.elevation.bfe} ft`}
                      </td>
                      <td className={`px-4 py-3.5 font-semibold ${report.insurance.mandatory ? "text-rose-700" : "text-emerald-700"}`}>
                        {report.insurance.mandatory ? "Yes" : "No"}
                      </td>
                      <td className="px-4 py-3.5 text-ink-soft">
                        ${report.insurance.annualLow.toLocaleString()} – $
                        {report.insurance.annualHigh.toLocaleString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/lookup">Check a different address</ButtonLink>
            <ButtonLink href="/pricing" variant="secondary">
              See pricing
            </ButtonLink>
          </div>

          <DisclaimerNote className="mt-8" />
        </Container>
      </section>
    </>
  );
}

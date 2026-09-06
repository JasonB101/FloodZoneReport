import type { Metadata } from "next";
import Link from "next/link";
import { AddressLookupForm } from "@/components/lookup/AddressLookupForm";
import { SampleAddressCard } from "@/components/lookup/SampleAddressCard";
import { DisclaimerNote } from "@/components/site/DisclaimerNote";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SAMPLE_REPORTS, formatAddress } from "@/lib/demo-data";

export const metadata: Metadata = {
  title: "Check an address",
  description:
    "Enter a US property address to get a FEMA flood-zone report, or click one of the demo sample addresses. Demo mode — sample data only.",
};

export default function LookupPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-slate-200 bg-brand-950 bg-contour">
        <Container width="lg" className="relative py-14 sm:py-16">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow tone="dark">Address lookup</Eyebrow>
            <h1 className="mt-2.5 font-serif text-[2.25rem] leading-[1.08] tracking-[-0.02em] text-white sm:text-[2.75rem]">
              Which address should we check?
            </h1>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-slate-300">
              One US property address is all we need. In this demo build the lookup recognizes the{" "}
              {SAMPLE_REPORTS.length} sample addresses below — click any of them and the full report
              opens immediately.
            </p>
          </div>

          <div className="mx-auto mt-8 max-w-2xl">
            <AddressLookupForm autoFocus />
          </div>

          <DisclaimerNote variant="onDark" className="mx-auto mt-10 max-w-2xl" />
        </Container>
      </section>

      <section className="bg-canvas py-14 sm:py-16">
        <Container width="xl">
          <div className="max-w-2xl">
            <Eyebrow>Demo sample addresses</Eyebrow>
            <h2 className="mt-2 font-serif text-3xl leading-tight tracking-tight text-ink sm:text-[2.125rem]">
              Click through without typing anything
            </h2>
            <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-soft">
              Each sample was written to show a different real-world situation. Start with the coastal
              VE property if you want to see the report working hardest, or the Houston shaded-X
              property if you want to see the case people misread most often.
            </p>
          </div>

          <div className="mt-9 grid gap-4 lg:grid-cols-2">
            {SAMPLE_REPORTS.map((report) => (
              <SampleAddressCard key={report.slug} report={report} />
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
            <h3 className="text-[0.9375rem] font-semibold text-ink">
              Prefer to type? These strings all resolve
            </h3>
            <p className="mt-1.5 text-[0.875rem] leading-relaxed text-ink-soft">
              The demo matcher is deliberately loose — a street name, a city, or a ZIP is enough. It
              matches only against the sample set; there is no geocoder behind it.
            </p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {SAMPLE_REPORTS.map((report) => (
                <li key={report.slug}>
                  <Link
                    href={`/report/${report.slug}`}
                    className="block truncate rounded-lg bg-canvas px-3 py-2 font-mono text-[0.8125rem] text-ink-soft ring-1 ring-slate-200 transition-colors hover:bg-brand-50 hover:text-brand-800 hover:ring-brand-200"
                  >
                    {formatAddress(report.address)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <DisclaimerNote className="mt-8" />
        </Container>
      </section>
    </>
  );
}

import Link from "next/link";
import type { ReactNode } from "react";
import { ElevationDiagram } from "@/components/report/ElevationDiagram";
import { FirmPanel } from "@/components/report/FirmPanel";
import { RiskMeter } from "@/components/report/RiskMeter";
import { Logo } from "@/components/site/Logo";
import {
  formatAddress,
  zoneDisplayLabel,
  zoneOf,
  type DeterminationField,
  type FloodReport,
} from "@/lib/demo-data";
import { DISCLAIMER } from "@/lib/site";
import { RISK_TIER_STYLES } from "@/lib/zones";

export function ReportDocument({ report }: { report: FloodReport }) {
  const zone = zoneOf(report);
  const tier = RISK_TIER_STYLES[zone.riskTier];

  const determination: DeterminationField[] = [
    { label: "Flood zone", value: zoneDisplayLabel(zone), hint: zone.officialName },
    {
      label: "Special Flood Hazard Area",
      value: zone.sfha ? "Yes — inside an SFHA" : "No — outside the SFHA",
      hint: zone.sfha ? "Zones beginning with A or V" : "Zone X designations",
    },
    {
      label: "Base Flood Elevation",
      value: report.elevation.bfe === null ? "Not published for this zone" : `${report.elevation.bfe} ft ${report.elevation.datum}`,
      hint: report.elevation.bfe === null ? undefined : "1% annual chance flood elevation",
    },
    {
      label: "Lowest adjacent grade",
      value: `${report.elevation.groundElevation} ft ${report.elevation.datum}`,
      hint: "Illustrative ground elevation at the structure",
    },
    { label: "FIRM panel", value: report.firm.panelNumber, hint: `Effective ${report.firm.panelEffectiveDate}` },
    { label: "Community", value: report.community, hint: `CID ${report.communityId} · ${report.county}` },
    { label: "Regulatory floodway", value: report.floodway },
    { label: "Coastal Barrier Resources System", value: report.cbrs },
    { label: "Map amendments", value: report.lomcStatus },
    { label: "Latest map action", value: report.firm.lastMapRevision },
  ];

  return (
    <article className="print-plain overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lift">
      {/* Letterhead */}
      <header className="border-b border-slate-200 px-6 py-6 sm:px-9 sm:py-7">
        <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-4">
          <div>
            <Logo />
            <p className="mt-3 font-serif text-xl leading-tight text-ink sm:text-[1.4rem]">
              FEMA Flood Zone Report
            </p>
            <p className="mt-1 text-[0.8125rem] text-ink-soft">
              Informational flood-hazard summary for a single US address
            </p>
          </div>
          <dl className="grid shrink-0 grid-cols-2 gap-x-6 gap-y-2 text-[0.75rem] sm:text-right">
            <div className="sm:col-span-2 sm:flex sm:justify-end sm:gap-2">
              <dt className="text-ink-soft">Report ID</dt>
              <dd className="font-mono font-semibold text-ink">{report.reportId}</dd>
            </div>
            <div className="sm:col-span-2 sm:flex sm:justify-end sm:gap-2">
              <dt className="text-ink-soft">Generated</dt>
              <dd className="font-medium text-ink">{report.determinationDate}</dd>
            </div>
            <div className="sm:col-span-2 sm:flex sm:justify-end sm:gap-2">
              <dt className="text-ink-soft">Basis</dt>
              <dd className="font-medium text-ink">FIRM panel {report.firm.panelNumber}</dd>
            </div>
          </dl>
        </div>

        <div className="mt-6 flex items-start gap-2.5 rounded-xl border border-amber-300 bg-amber-50 px-3.5 py-2.5 text-[0.75rem] leading-relaxed text-amber-950">
          <span className="mt-px font-semibold uppercase tracking-[0.1em]">Demo</span>
          <span>
            Sample report generated from fabricated data. Not an official Standard Flood Hazard
            Determination Form (SFHDF), not a CoreLogic determination, and not for lender use.
          </span>
        </div>
      </header>

      {/* Verdict */}
      <section className="px-6 py-7 sm:px-9">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-ink-soft">
          Subject property
        </p>
        <h1 className="mt-1.5 font-serif text-[1.75rem] leading-tight tracking-tight text-ink sm:text-[2.125rem]">
          {report.address.line1}
        </h1>
        <p className="mt-1 text-base text-ink-soft">
          {report.address.city}, {report.address.state} {report.address.zip}
          <span className="mx-2 text-slate-300">|</span>
          <span className="font-mono text-sm">
            {report.coordinates.lat.toFixed(4)}, {report.coordinates.lon.toFixed(4)}
          </span>
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-stretch">
          <div
            className={`flex flex-col items-center justify-center rounded-2xl px-7 py-6 ring-1 ${tier.badge} print-avoid-break`}
          >
            <p className="text-[0.625rem] font-semibold uppercase tracking-[0.16em] opacity-75">
              FEMA zone
            </p>
            <p className="mt-1 font-serif text-[3.5rem] font-semibold leading-none tracking-tight">
              {zone.label}
            </p>
            {zone.qualifier && (
              <p className="mt-1 text-[0.6875rem] font-medium uppercase tracking-[0.12em] opacity-80">
                {zone.qualifier}
              </p>
            )}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-canvas p-5 print-avoid-break">
            <p className="font-serif text-lg leading-snug text-ink sm:text-xl">{zone.headline}</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <Verdict
                label="In an SFHA?"
                value={zone.sfha ? "Yes" : "No"}
                tone={zone.sfha ? "bad" : "good"}
              />
              <Verdict
                label="Insurance required?"
                value={zone.insuranceRequired ? "Yes, with a federally backed loan" : "No lender can require it"}
                tone={zone.insuranceRequired ? "bad" : "good"}
              />
              <Verdict label="Annual flood chance" value={zone.annualChanceLabel} tone="neutral" />
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-card sm:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] sm:items-center print-plain">
          <RiskMeter tier={zone.riskTier} />
          <dl className="grid gap-3 sm:grid-cols-2">
            <Stat label="Chance in any year" value={zone.annualChanceLabel} />
            <Stat label="Chance over 30 years" value={zone.thirtyYearChanceLabel} />
          </dl>
        </div>
      </section>

      {/* Narrative */}
      <Section title="What this means for this property" step="01">
        <p className="max-w-[46rem] text-[0.9375rem] leading-relaxed text-ink sm:text-base">
          {report.narrative.whatThisMeans}
        </p>
        <div className="mt-4 rounded-xl border border-slate-200 bg-canvas p-4">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-ink-soft">
            How FEMA describes {zoneDisplayLabel(zone)}
          </p>
          <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-soft">{zone.summary}</p>
        </div>
        <div className="mt-4">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-ink-soft">
            Mapped flood sources
          </p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {report.floodSources.map((source) => (
              <li
                key={source}
                className="rounded-lg bg-brand-50 px-2.5 py-1 text-[0.8125rem] font-medium text-brand-800 ring-1 ring-brand-100"
              >
                {source}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Determination details */}
      <Section title="Determination details" step="02">
        <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
          {determination.map((field) => (
            <div key={field.label} className="border-b border-slate-100 pb-3">
              <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-ink-soft">
                {field.label}
              </dt>
              <dd className="mt-1 text-[0.9375rem] font-medium text-ink">{field.value}</dd>
              {field.hint && <dd className="mt-0.5 text-[0.75rem] text-ink-soft">{field.hint}</dd>}
            </div>
          ))}
        </dl>
      </Section>

      {/* Map */}
      <Section title="Flood hazard map" step="03">
        <FirmPanel report={report} />
      </Section>

      {/* Elevation */}
      {report.elevation.bfe !== null ? (
        <Section title="Elevation context" step="04">
          <ElevationDiagram report={report} />
        </Section>
      ) : (
        <Section title="Elevation context" step="04">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card print-plain">
            <h3 className="text-sm font-semibold text-ink">No Base Flood Elevation published</h3>
            <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-soft">
              {report.elevation.note}
            </p>
          </div>
        </Section>
      )}

      {/* Insurance */}
      <Section title="Insurance notes, in plain English" step="05">
        <div
          className={`print-avoid-break rounded-2xl border p-5 ${
            report.insurance.mandatory
              ? "border-rose-200 bg-rose-50/60"
              : "border-emerald-200 bg-emerald-50/60"
          }`}
        >
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-ink-soft">
            Mandatory purchase requirement
          </p>
          <p
            className={`mt-1.5 font-serif text-xl leading-snug ${
              report.insurance.mandatory ? "text-rose-900" : "text-emerald-900"
            }`}
          >
            {report.insurance.mandatory
              ? "Flood insurance is required with a federally backed mortgage."
              : "Flood insurance is not required by any lender at this address."}
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <Stat
              label="Illustrative annual premium"
              value={`$${report.insurance.annualLow.toLocaleString()} – $${report.insurance.annualHigh.toLocaleString()}`}
            />
            <Stat label="Typical policy" value={report.insurance.policyType} />
            <Stat label="Elevation Certificate" value={report.insurance.elevationCertificate} />
          </div>
          <p className="mt-3 text-[0.6875rem] text-ink-soft">
            Premium range is an illustrative budgeting band, not a quote or an offer of coverage.
            FloodZoneReport is not an insurance producer.
          </p>
        </div>

        <p className="mt-5 max-w-[46rem] text-[0.9375rem] leading-relaxed text-ink sm:text-base">
          {report.narrative.insurancePlain}
        </p>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <BulletCard title="What drives the price here" items={report.insurance.priceDrivers} />
          <BulletCard title="Coverage mechanics worth knowing" items={report.insurance.coverageNotes} />
        </div>
      </Section>

      {/* Buying */}
      <Section title="If you are buying or refinancing" step="06">
        <p className="max-w-[46rem] text-[0.9375rem] leading-relaxed text-ink sm:text-base">
          {report.narrative.ifYouAreBuying}
        </p>
        <ol className="mt-5 max-w-[46rem] space-y-3">
          {report.narrative.nextSteps.map((step, index) => (
            <li key={step} className="flex gap-3.5">
              <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-600 text-[0.75rem] font-semibold text-white">
                {index + 1}
              </span>
              <span className="text-[0.9375rem] leading-relaxed text-ink">{step}</span>
            </li>
          ))}
        </ol>
      </Section>

      {/* History */}
      <Section title="Local flood history" step="07">
        <ol className="relative max-w-[46rem] space-y-5 border-l border-slate-200 pl-6">
          {report.history.map((event) => (
            <li key={`${event.year}-${event.event}`} className="print-avoid-break">
              <span className="absolute -left-[5px] mt-1.5 size-2.5 rounded-full bg-brand-500 ring-4 ring-white" />
              <p className="font-mono text-[0.75rem] font-semibold text-brand-700">{event.year}</p>
              <p className="mt-0.5 text-[0.9375rem] font-semibold text-ink">{event.event}</p>
              <p className="mt-1 text-[0.875rem] leading-relaxed text-ink-soft">{event.note}</p>
            </li>
          ))}
        </ol>
        <p className="mt-5 text-[0.75rem] leading-relaxed text-ink-soft">
          Regional context for illustration. Not a property-specific claim or loss history, and not a
          substitute for the seller&apos;s disclosure or an NFIP claim record.
        </p>
      </Section>

      {/* Mitigation */}
      <Section title="What actually reduces risk here" step="08">
        <ul className="grid gap-3 sm:grid-cols-2">
          {report.mitigation.map((item) => (
            <li
              key={item}
              className="print-avoid-break flex gap-3 rounded-xl border border-slate-200 bg-white p-4 text-[0.875rem] leading-relaxed text-ink shadow-card print-plain"
            >
              <svg viewBox="0 0 20 20" className="mt-0.5 size-4 shrink-0 text-aqua-600" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 10.5l4 4 8-9" />
              </svg>
              {item}
            </li>
          ))}
        </ul>
      </Section>

      {/* Methodology */}
      <Section title="Methodology and sources" step="09" last>
        <dl className="max-w-[46rem] space-y-4 text-[0.875rem] leading-relaxed">
          <div>
            <dt className="font-semibold text-ink">In this demo build</dt>
            <dd className="mt-1 text-ink-soft">{DISCLAIMER.demo}</dd>
          </div>
          <div>
            <dt className="font-semibold text-ink">In production</dt>
            <dd className="mt-1 text-ink-soft">
              Reports are assembled from FEMA&apos;s published National Flood Hazard Layer and Flood
              Insurance Rate Map products, matched to a geocoded address, with the panel number and
              effective date printed on every report so you can verify the map vintage yourself at the{" "}
              <span className="font-medium text-ink">FEMA Map Service Center</span>.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-ink">Known limitations</dt>
            <dd className="mt-1 text-ink-soft">
              Flood zone boundaries are drawn at map scale. A parcel can straddle two zones, and a
              structure&apos;s position within a parcel can change the answer. Where an address sits near a
              boundary, only a licensed surveyor can resolve it at parcel level.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-ink">What this report is not</dt>
            <dd className="mt-1 text-ink-soft">{DISCLAIMER.long}</dd>
          </div>
        </dl>
      </Section>

      {/* Document footer */}
      <footer className="border-t border-slate-200 bg-slate-50/70 px-6 py-5 sm:px-9">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-[0.75rem] text-ink-soft">
          <p>
            <span className="font-mono font-semibold text-ink">{report.reportId}</span> ·{" "}
            {formatAddress(report.address)} · Generated {report.determinationDate}
          </p>
          <p className="no-print">
            <Link href="/faq#disclaimer" className="font-medium text-brand-700 underline underline-offset-2">
              Full disclaimer
            </Link>
          </p>
        </div>
        <p className="mt-2 text-[0.75rem] font-medium text-amber-800">
          DEMO MODE — fabricated sample data. Informational purposes only. Not an official lender
          SFHDF or CoreLogic determination.
        </p>
      </footer>
    </article>
  );
}

function Section({
  title,
  step,
  children,
  last = false,
}: {
  title: string;
  step: string;
  children: ReactNode;
  last?: boolean;
}) {
  return (
    <section className={`px-6 py-7 sm:px-9 ${last ? "" : "border-b border-slate-200"}`}>
      <div className="mb-5 flex items-baseline gap-3">
        <span className="font-mono text-[0.75rem] font-semibold text-brand-400">{step}</span>
        <h2 className="font-serif text-xl leading-snug tracking-tight text-ink sm:text-[1.375rem]">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function Verdict({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "good" | "bad" | "neutral";
}) {
  const tones = {
    good: "text-emerald-700",
    bad: "text-rose-700",
    neutral: "text-ink",
  } as const;

  return (
    <div>
      <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-ink-soft">
        {label}
      </p>
      <p className={`mt-1 text-[0.875rem] font-semibold leading-snug ${tones[tone]}`}>{value}</p>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-ink-soft">
        {label}
      </dt>
      <dd className="mt-1 text-[0.9375rem] font-semibold leading-snug text-ink">{value}</dd>
    </div>
  );
}

function BulletCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="print-avoid-break rounded-2xl border border-slate-200 bg-white p-5 shadow-card print-plain">
      <h3 className="text-sm font-semibold text-ink">{title}</h3>
      <ul className="mt-3 space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5 text-[0.875rem] leading-relaxed text-ink-soft">
            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-400" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

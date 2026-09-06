import type { Metadata } from "next";
import { DisclaimerNote } from "@/components/site/DisclaimerNote";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { DISCLAIMER, FAQ_SECTIONS, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ & disclaimer",
  description:
    "What a FloodZoneReport is and is not, how flood zones and insurance work, billing answers, and the full disclaimer. Not a lender SFHDF or CoreLogic determination.",
};

const slug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const NOT_LIST = [
  {
    title: "Not a lender determination",
    body: "A Standard Flood Hazard Determination Form (SFHDF) is what a lender puts in a loan file, usually ordered from a regulated determination vendor. This is not that document and cannot substitute for it.",
  },
  {
    title: "Not a CoreLogic or regulated vendor report",
    body: "We are not CoreLogic, ServiceLink, LERETA, or any other flood determination vendor, and we are not affiliated with them or with FEMA.",
  },
  {
    title: "Not a survey or Elevation Certificate",
    body: "Elevation figures in a report are illustrative context. Only a licensed surveyor can produce an Elevation Certificate, and only that document can establish your lowest floor elevation.",
  },
  {
    title: "Not insurance advice or a quote",
    body: "We are not an insurance producer, take no commissions, and have no carrier relationships. Premium ranges are budgeting context, never an offer of coverage.",
  },
  {
    title: "Not a monitoring service",
    body: "A report is a snapshot of the mapping on the day it is generated. FEMA revises panels on a rolling basis and we do not notify you when that happens.",
  },
  {
    title: "Not a people-search product",
    body: "We report flood risk at a location. We do not run owner lookups, skip traces, or plate searches, and we do not sell your address to anyone who does.",
  },
];

export default function FaqPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-slate-200 bg-brand-950 bg-contour">
        <Container width="lg" className="relative py-14 sm:py-16">
          <div className="max-w-2xl">
            <Eyebrow tone="dark">FAQ &amp; disclaimer</Eyebrow>
            <h1 className="mt-2.5 font-serif text-[2.25rem] leading-[1.08] tracking-[-0.02em] text-white sm:text-[2.75rem]">
              Straight answers, including the unflattering ones
            </h1>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-slate-300">
              What this product is, what it definitively is not, how flood zones and insurance
              actually work, and where our limits are. If something here reads like a reason not to
              buy, we left it in on purpose.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-canvas py-12 sm:py-16">
        <Container width="lg">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:gap-14">
            {/* Table of contents */}
            <nav aria-label="On this page" className="lg:sticky lg:top-24 lg:self-start">
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-ink-soft">
                On this page
              </p>
              <ul className="mt-3 space-y-1 border-l border-slate-200 pl-4">
                {FAQ_SECTIONS.map((section) => (
                  <li key={section.title}>
                    <a
                      href={`#${slug(section.title)}`}
                      className="block py-1 text-[0.875rem] text-ink-soft transition-colors hover:text-brand-700"
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="#demo-mode"
                    className="block py-1 text-[0.875rem] text-ink-soft transition-colors hover:text-brand-700"
                  >
                    About demo mode
                  </a>
                </li>
                <li>
                  <a
                    href="#disclaimer"
                    className="block py-1 text-[0.875rem] font-semibold text-brand-700"
                  >
                    Full disclaimer
                  </a>
                </li>
              </ul>

              <DisclaimerNote variant="inline" className="mt-6 hidden lg:block" />
            </nav>

            {/* Content */}
            <div className="min-w-0 space-y-12">
              {FAQ_SECTIONS.map((section) => (
                <section key={section.title} id={slug(section.title)} className="scroll-mt-32">
                  <h2 className="font-serif text-2xl leading-tight tracking-tight text-ink sm:text-[1.75rem]">
                    {section.title}
                  </h2>
                  <dl className="mt-5 space-y-4">
                    {section.items.map((item) => (
                      <div
                        key={item.question}
                        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card sm:p-6"
                      >
                        <dt className="text-[1.0625rem] font-semibold leading-snug text-ink">
                          {item.question}
                        </dt>
                        <dd className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-soft">
                          {item.answer}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </section>
              ))}

              {/* Demo mode */}
              <section id="demo-mode" className="scroll-mt-32">
                <h2 className="font-serif text-2xl leading-tight tracking-tight text-ink sm:text-[1.75rem]">
                  About demo mode
                </h2>
                <div className="mt-5 rounded-2xl border border-amber-300 bg-amber-50 p-5 sm:p-6">
                  <p className="text-[0.9375rem] font-semibold text-amber-950">
                    This build runs entirely on fabricated sample data.
                  </p>
                  <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-amber-950/90">
                    {DISCLAIMER.demo}
                  </p>
                  <ul className="mt-4 space-y-2 text-[0.875rem] leading-relaxed text-amber-950/90">
                    {[
                      "No FEMA National Flood Hazard Layer request is made, and no FEMA endpoint is contacted.",
                      "No geocoding service is used. Address matching runs against a four-item local list.",
                      "No paid flood-data provider is integrated, and there are no API keys in the project.",
                      "No payment processor is connected. Checkout is a visual mock and no charge is possible.",
                      "No analytics, tracking, accounts, or email delivery.",
                    ].map((item) => (
                      <li key={item} className="flex gap-2.5">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-amber-600" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-[0.875rem] leading-relaxed text-amber-950/90">
                    The purpose is to review the product experience — the flow, the report layout, the
                    copy — before any data integration exists. Treat every zone, elevation, panel
                    number, and premium figure on this site as invented.
                  </p>
                </div>
              </section>

              {/* What this is not */}
              <section id="what-this-is-not" className="scroll-mt-32">
                <h2 className="font-serif text-2xl leading-tight tracking-tight text-ink sm:text-[1.75rem]">
                  What a FloodZoneReport is not
                </h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {NOT_LIST.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card"
                    >
                      <h3 className="text-[0.9375rem] font-semibold text-ink">{item.title}</h3>
                      <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-soft">{item.body}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Full disclaimer */}
              <section id="disclaimer" className="scroll-mt-32">
                <h2 className="font-serif text-2xl leading-tight tracking-tight text-ink sm:text-[1.75rem]">
                  Full disclaimer
                </h2>
                <div className="mt-5 rounded-2xl border border-slate-300 bg-white p-6 shadow-card sm:p-7">
                  <p className="text-[0.9375rem] font-semibold leading-relaxed text-ink">
                    {DISCLAIMER.short}
                  </p>
                  <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-soft">
                    {DISCLAIMER.long}
                  </p>
                  <div className="mt-5 space-y-3 border-t border-slate-200 pt-5 text-[0.875rem] leading-relaxed text-ink-soft">
                    <p>
                      <span className="font-semibold text-ink">No agency affiliation.</span>{" "}
                      FloodZoneReport is an independent service. We are not affiliated with, endorsed
                      by, or acting on behalf of FEMA, the National Flood Insurance Program, any state
                      or local floodplain authority, or any flood determination vendor.
                    </p>
                    <p>
                      <span className="font-semibold text-ink">No warranty.</span> Reports are provided
                      as-is, without warranty of accuracy, completeness, or fitness for a particular
                      purpose. Flood hazard mapping is generalized at map scale and changes over time.
                    </p>
                    <p>
                      <span className="font-semibold text-ink">Limitation of liability.</span> Our
                      liability for any claim arising from a report is limited to the amount you paid
                      for that report. Do not use a report as the sole basis for a purchase, loan,
                      insurance, construction, or evacuation decision.
                    </p>
                    <p>
                      <span className="font-semibold text-ink">Emergencies.</span> This is not an
                      emergency service. For active flooding, follow instructions from local emergency
                      management and the National Weather Service.
                    </p>
                    <p>
                      <span className="font-semibold text-ink">Questions.</span> Email{" "}
                      <a
                        href={`mailto:${SITE.supportEmail}`}
                        className="font-medium text-brand-700 underline underline-offset-2"
                      >
                        {SITE.supportEmail}
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </section>

              <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-lift sm:p-8">
                <h2 className="font-serif text-2xl leading-tight tracking-tight text-ink">
                  Still want to see one?
                </h2>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-soft">
                  All four sample reports are complete and free to read.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <ButtonLink href="/lookup">Check an address</ButtonLink>
                  <ButtonLink href="/report" variant="secondary">
                    Read a sample report
                  </ButtonLink>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

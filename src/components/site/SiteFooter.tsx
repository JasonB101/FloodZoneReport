import Link from "next/link";
import { Logo } from "@/components/site/Logo";
import { Container } from "@/components/ui/Container";
import { DISCLAIMER, SITE } from "@/lib/site";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { href: "/lookup", label: "Check an address" },
      { href: "/report", label: "Sample reports" },
      { href: "/pricing", label: "Pricing" },
      { href: "/checkout?plan=plus", label: "Checkout demo" },
    ],
  },
  {
    title: "Understand your zone",
    links: [
      { href: "/faq#flood-zones-and-insurance", label: "What is an SFHA?" },
      { href: "/faq#flood-zones-and-insurance", label: "Base Flood Elevation" },
      { href: "/faq#flood-zones-and-insurance", label: "Elevation Certificates" },
      { href: "/faq#flood-zones-and-insurance", label: "Changing your zone" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/faq", label: "FAQ" },
      { href: "/faq#disclaimer", label: "Disclaimer" },
      { href: "/faq#data-and-limitations", label: "Data & limitations" },
      { href: "/faq#demo-mode", label: "About demo mode" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="no-print mt-auto border-t border-slate-200 bg-white">
      <Container width="xl" className="py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))]">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              Plain-English FEMA flood-zone reports for homeowners, buyers, and renters. Nine dollars,
              no subscription, no jargon.
            </p>
            <p className="mt-4 text-sm text-ink-soft">
              <a
                href={`mailto:${SITE.supportEmail}`}
                className="font-medium text-brand-700 underline underline-offset-2"
              >
                {SITE.supportEmail}
              </a>
            </p>
          </div>

          {COLUMNS.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3 className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-ink">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.label}`}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-soft transition-colors hover:text-brand-700"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div
          id="footer-disclaimer"
          className="mt-12 rounded-2xl border border-slate-200 bg-canvas p-5 lg:p-6"
        >
          <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink">Disclaimer</h3>
          <p className="mt-2.5 text-[0.8125rem] leading-relaxed text-ink-soft">{DISCLAIMER.long}</p>
          <p className="mt-3 text-[0.8125rem] leading-relaxed font-medium text-amber-800">
            {DISCLAIMER.demo}
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-6 text-[0.8125rem] text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 FloodZoneReport. An independent informational service.</p>
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>Not affiliated with FEMA or any government agency.</span>
            <Link href="/faq#disclaimer" className="font-medium text-brand-700 underline underline-offset-2">
              Terms &amp; limitations
            </Link>
          </p>
        </div>
      </Container>
    </footer>
  );
}

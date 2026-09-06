"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/site/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { NAV_LINKS } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="no-print sticky top-0 z-40 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-5 sm:px-6 lg:px-8">
        <Link href="/" aria-label={`FloodZoneReport home`} className="shrink-0">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`rounded-lg px-3 py-2 text-[0.9375rem] font-medium transition-colors ${
                isActive(link.href)
                  ? "bg-brand-50 text-brand-800"
                  : "text-ink-soft hover:bg-slate-100 hover:text-ink"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ButtonLink href="/lookup" size="sm">
            Check my address
          </ButtonLink>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex size-10 items-center justify-center rounded-lg text-ink ring-1 ring-slate-200 transition-colors hover:bg-slate-100 md:hidden"
        >
          <svg viewBox="0 0 20 20" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
            {open ? (
              <>
                <path d="M5 5l10 10" />
                <path d="M15 5L5 15" />
              </>
            ) : (
              <>
                <path d="M3 6h14" />
                <path d="M3 10h14" />
                <path d="M3 14h14" />
              </>
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div id="mobile-nav" className="border-t border-slate-200 bg-white md:hidden">
          <nav className="mx-auto flex w-full max-w-7xl flex-col gap-1 px-5 py-3 sm:px-6" aria-label="Mobile">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`rounded-lg px-3 py-2.5 text-base font-medium ${
                  isActive(link.href) ? "bg-brand-50 text-brand-800" : "text-ink-soft hover:bg-slate-100"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <ButtonLink href="/lookup" onClick={() => setOpen(false)} className="mt-2 w-full" size="md">
              Check my address
            </ButtonLink>
          </nav>
        </div>
      )}
    </header>
  );
}

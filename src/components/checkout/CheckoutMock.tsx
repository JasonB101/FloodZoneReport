"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import type { PricingPlan } from "@/lib/site";

/**
 * Visual-only checkout. There is no payment provider wired up: the card fields
 * are disabled, the submit handler waits and then routes to the confirmation
 * page. Stripe would replace this whole component.
 */
export function CheckoutMock({
  plan,
  reportSlug,
}: {
  plan: PricingPlan;
  reportSlug?: string;
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    const query = new URLSearchParams({ plan: plan.id });
    if (reportSlug) query.set("report", reportSlug);
    window.setTimeout(() => router.push(`/checkout/success?${query.toString()}`), 900);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <fieldset className="space-y-4">
        <legend className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-ink-soft">
          Where should we send the report?
        </legend>
        <div>
          <label htmlFor="email" className="block text-[0.8125rem] font-medium text-ink">
            Email address
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-[0.9375rem] text-ink shadow-sm outline-none transition-colors placeholder:text-slate-400 focus:border-brand-400 focus:ring-4 focus:ring-brand-100"
          />
          <p className="mt-1.5 text-[0.75rem] text-ink-soft">
            Demo mode: no email is sent and nothing is stored.
          </p>
        </div>
      </fieldset>

      <fieldset
        className="relative space-y-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50/60 p-4"
        aria-describedby="payment-mock-note"
      >
        <legend className="px-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-ink-soft">
          Payment
        </legend>

        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 text-[0.8125rem] font-medium text-ink-soft">
            <svg viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2.5" y="4.5" width="15" height="11" rx="2" />
              <path d="M2.5 8.5h15" />
            </svg>
            Card
          </span>
          <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[0.625rem] font-semibold uppercase tracking-[0.1em] text-amber-900">
            Mocked
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <MockField label="Card number" value="4242 4242 4242 4242" />
          <MockField label="Expiry" value="04 / 29" />
          <MockField label="CVC" value="•••" />
        </div>

        <p id="payment-mock-note" className="text-[0.75rem] leading-relaxed text-ink-soft">
          These fields are inert placeholders. No payment processor is connected to this build, no
          card data is collected, and no charge can be made. Stripe will be integrated before launch.
        </p>
      </fieldset>

      <Button type="submit" size="lg" className="w-full" disabled={submitting}>
        {submitting ? (
          <>
            <span className="inline-block size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            Completing demo order…
          </>
        ) : (
          <>Place demo order · ${plan.price}</>
        )}
      </Button>

      <p className="text-center text-[0.75rem] leading-relaxed text-ink-soft">
        By continuing you would agree that FloodZoneReport provides informational reports only, and
        that a report is not an official lender determination. Nothing is charged in demo mode.
      </p>
    </form>
  );
}

function MockField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="block text-[0.75rem] font-medium text-ink-soft">{label}</span>
      <div
        className="mt-1.5 flex h-11 items-center rounded-xl border border-slate-200 bg-white px-3.5 font-mono text-[0.875rem] text-slate-400"
        aria-hidden="true"
      >
        {value}
      </div>
    </div>
  );
}

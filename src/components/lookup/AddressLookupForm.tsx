"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  SAMPLE_REPORTS,
  formatAddress,
  matchAddress,
  zoneOf,
  type FloodReport,
} from "@/lib/demo-data";

const LOOKUP_STEPS = [
  "Standardizing address",
  "Locating FIRM panel",
  "Reading flood hazard layer",
  "Writing your report",
];

type Status = "idle" | "working" | "not-found";

export function AddressLookupForm({ autoFocus = false }: { autoFocus?: boolean }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [step, setStep] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(
    () => () => {
      timers.current.forEach((t) => window.clearTimeout(t));
    },
    [],
  );

  const suggestions = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (normalized.length < 2) return SAMPLE_REPORTS;
    return SAMPLE_REPORTS.filter((report) =>
      `${formatAddress(report.address)} ${report.county}`.toLowerCase().includes(normalized),
    );
  }, [query]);

  /** Fake pipeline so the demo flow feels like a real lookup instead of a jump cut. */
  const runLookup = (report: FloodReport) => {
    setStatus("working");
    setShowSuggestions(false);
    setStep(0);
    timers.current = LOOKUP_STEPS.map((_, index) =>
      window.setTimeout(() => setStep(index), 190 * (index + 1)),
    );
    timers.current.push(
      window.setTimeout(() => router.push(`/report/${report.slug}`), 190 * LOOKUP_STEPS.length + 260),
    );
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const match = matchAddress(query);
    if (match) {
      runLookup(match);
    } else {
      setStatus("not-found");
      setShowSuggestions(true);
    }
  };

  const pick = (report: FloodReport) => {
    setQuery(formatAddress(report.address));
    runLookup(report);
  };

  return (
    <div className="w-full">
      <form onSubmit={onSubmit} className="relative">
        <label htmlFor="address" className="sr-only">
          Property address
        </label>
        <div className="flex flex-col gap-2.5 rounded-2xl border border-slate-200 bg-white p-2.5 shadow-lift sm:flex-row sm:items-center">
          <div className="flex min-w-0 flex-1 items-center gap-2.5 pl-2">
            <svg
              viewBox="0 0 20 20"
              className="size-5 shrink-0 text-brand-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M10 2.5c3.04 0 5.5 2.4 5.5 5.36 0 3.72-3.9 7.52-5.1 8.6a.6.6 0 0 1-.8 0c-1.2-1.08-5.1-4.88-5.1-8.6C4.5 4.9 6.96 2.5 10 2.5Z" />
              <circle cx="10" cy="7.9" r="2.1" />
            </svg>
            <input
              id="address"
              name="address"
              type="text"
              autoComplete="street-address"
              autoFocus={autoFocus}
              value={query}
              disabled={status === "working"}
              onChange={(event) => {
                setQuery(event.target.value);
                setStatus("idle");
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              placeholder="Enter a US property address"
              aria-describedby="lookup-help"
              className="h-11 w-full min-w-0 bg-transparent text-[0.9375rem] text-ink outline-none placeholder:text-slate-400 disabled:opacity-60"
            />
          </div>
          <Button type="submit" size="md" disabled={status === "working"} className="sm:w-auto">
            {status === "working" ? "Checking…" : "Check flood zone"}
          </Button>
        </div>

        {showSuggestions && status !== "working" && (
          <div className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lift">
            <p className="border-b border-slate-100 bg-amber-50/70 px-4 py-2 text-[0.75rem] font-medium text-amber-900">
              Demo mode recognizes these {SAMPLE_REPORTS.length} sample addresses only. Pick one to
              see the full report.
            </p>
            <ul className="max-h-72 overflow-y-auto py-1">
              {(suggestions.length > 0 ? suggestions : SAMPLE_REPORTS).map((report) => {
                const zone = zoneOf(report);
                return (
                  <li key={report.slug}>
                    <button
                      type="button"
                      onClick={() => pick(report)}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-brand-50"
                    >
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 font-serif text-sm font-semibold text-brand-800 ring-1 ring-brand-100">
                        {zone.label}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[0.875rem] font-medium text-ink">
                          {report.address.line1}
                        </span>
                        <span className="block text-[0.75rem] text-ink-soft">
                          {report.address.city}, {report.address.state} {report.address.zip} ·{" "}
                          {report.sampleTag}
                        </span>
                      </span>
                      <svg
                        viewBox="0 0 16 16"
                        className="size-3.5 shrink-0 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M3 8h9" />
                        <path d="M8.5 4.5 12 8l-3.5 3.5" />
                      </svg>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </form>

      <div className="mt-3 min-h-6" aria-live="polite">
        {status === "working" && (
          <div className="flex items-center gap-2.5 text-[0.8125rem] font-medium text-brand-700">
            <span className="inline-block size-3.5 animate-spin rounded-full border-2 border-brand-200 border-t-brand-600" />
            {LOOKUP_STEPS[step]}…
          </div>
        )}
        {status === "not-found" && (
          <p className="text-[0.8125rem] text-amber-800">
            <span className="font-semibold">Demo mode.</span> That address is not in the sample set —
            pick one of the sample addresses to see a full report.
          </p>
        )}
        {status === "idle" && (
          <p id="lookup-help" className="text-[0.8125rem] text-ink-soft">
            No account needed to see a sample report. Nothing is charged in this build.
          </p>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function ReportActions() {
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button size="sm" onClick={() => window.print()}>
        <svg viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M6 7V3h8v4" />
          <path d="M6 14H4.5A1.5 1.5 0 0 1 3 12.5v-4A1.5 1.5 0 0 1 4.5 7h11A1.5 1.5 0 0 1 17 8.5v4a1.5 1.5 0 0 1-1.5 1.5H14" />
          <path d="M6 11h8v6H6z" />
        </svg>
        Print / Save as PDF
      </Button>
      <Button size="sm" variant="secondary" onClick={copyLink}>
        <svg viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M8.5 11.5a3 3 0 0 0 4.24 0l2.5-2.5a3 3 0 1 0-4.24-4.24l-.9.9" />
          <path d="M11.5 8.5a3 3 0 0 0-4.24 0l-2.5 2.5a3 3 0 1 0 4.24 4.24l.9-.9" />
        </svg>
        {copied ? "Link copied" : "Copy report link"}
      </Button>
    </div>
  );
}

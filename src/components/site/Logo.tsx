interface LogoProps {
  className?: string;
  /** Renders the wordmark in white for dark surfaces. */
  inverted?: boolean;
  markOnly?: boolean;
}

export function Logo({ className = "", inverted = false, markOnly = false }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="relative inline-flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-[11px] bg-gradient-to-br from-brand-500 via-brand-700 to-brand-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]">
        <svg viewBox="0 0 36 36" className="size-9" aria-hidden="true">
          <g stroke="rgba(255,255,255,0.5)" strokeWidth="1.1" fill="none" strokeLinecap="round">
            <path d="M-2 24c5-3.4 9-3.4 14 0s9 3.4 14 0" />
            <path d="M-2 29c5-3.4 9-3.4 14 0s9 3.4 14 0" />
          </g>
          <path
            d="M18 7.5c3.6 0 6.5 2.85 6.5 6.36 0 4.4-4.62 8.9-6.03 10.16a.71.71 0 0 1-.94 0C16.12 22.76 11.5 18.26 11.5 13.86 11.5 10.35 14.4 7.5 18 7.5Z"
            fill="#fff"
            fillOpacity="0.95"
          />
          <circle cx="18" cy="13.9" r="2.5" fill="#135783" />
        </svg>
      </span>
      {!markOnly && (
        <span
          className={`text-[1.0625rem] font-semibold tracking-[-0.015em] ${
            inverted ? "text-white" : "text-ink"
          }`}
        >
          Flood<span className={inverted ? "text-aqua-300" : "text-brand-600"}>Zone</span>Report
        </span>
      )}
    </span>
  );
}

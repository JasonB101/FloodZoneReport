import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "onDark";
type Size = "sm" | "md" | "lg";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold whitespace-nowrap transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-55";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-brand-600 text-white shadow-[0_1px_0_rgba(255,255,255,0.18)_inset,0_8px_20px_-10px_rgba(19,87,131,0.7)] hover:bg-brand-700 active:bg-brand-800",
  secondary:
    "bg-white text-ink ring-1 ring-slate-200 shadow-sm hover:bg-slate-50 hover:ring-slate-300 active:bg-slate-100",
  ghost: "text-brand-700 hover:bg-brand-50 active:bg-brand-100",
  onDark:
    "bg-white/10 text-white ring-1 ring-white/25 backdrop-blur-sm hover:bg-white/18 active:bg-white/25",
};

const SIZES: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-13 px-6 text-base",
};

function classes(variant: Variant, size: Size, className?: string) {
  return [BASE, VARIANTS[variant], SIZES[size], className].filter(Boolean).join(" ");
}

interface ButtonLinkProps extends Omit<ComponentProps<typeof Link>, "className"> {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <Link className={classes(variant, size, className)} {...rest}>
      {children}
    </Link>
  );
}

interface ButtonProps extends Omit<ComponentProps<"button">, "className"> {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button type={type} className={classes(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}

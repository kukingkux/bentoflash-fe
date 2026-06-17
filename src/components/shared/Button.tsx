import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

export type ButtonVariant =
  | "primary"
  | "success"
  | "secondary"
  | "emerald"
  | "slate"
  | "addToCart"
  | "adminSecondary";

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  loadingText?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  children: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-linear-to-b from-[#db7741] to-[#f45d0c] text-white shadow-[0_10px_24px_rgba(244,93,12,0.28),inset_0_1px_0_rgba(255,255,255,0.15)] hover:from-[#e17f48] hover:to-[#ff6a1d]",
  success:
    "bg-emerald-500 text-white shadow-[0_10px_24px_rgba(16,185,129,0.26),inset_0_1px_0_rgba(255,255,255,0.12)] hover:bg-emerald-400",
  secondary:
    "border border-[#ececec] bg-white text-[#1f1f1f] shadow-[0_8px_24px_rgba(15,23,42,0.08),inset_0_1px_0_rgba(255,255,255,0.8)] hover:bg-[#fafafa]",
  emerald:
    "bg-emerald-500 text-white shadow-[0_10px_24px_rgba(16,185,129,0.26),inset_0_1px_0_rgba(255,255,255,0.12)] hover:bg-emerald-400",
  slate:
    "bg-slate-900 text-slate-100 shadow-[0_10px_24px_rgba(15,23,42,0.35),inset_0_1px_0_rgba(255,255,255,0.08)] hover:bg-slate-800",
  addToCart:
    "bg-[#f47a24] text-white shadow-[0_10px_22px_rgba(244,122,36,0.26),inset_0_1px_0_rgba(255,255,255,0.14)] hover:bg-[#ff862e]",
  adminSecondary:
    "bg-[#e0e0e0] text-[#2a2a2a] shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] hover:bg-[#d7d7d7]",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "min-h-10 px-4 text-sm",
  md: "min-h-11 px-5 text-sm",
  lg: "min-h-12 px-6 text-base",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  loading = false,
  loadingText,
  startIcon,
  endIcon,
  children,
  disabled,
  type = "button",
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      className={cn(
        "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-transparent font-medium tracking-[0.01em] transition duration-200 ease-out outline-none focus-visible:ring-2 focus-visible:ring-orange-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:cursor-not-allowed disabled:opacity-60",
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
      disabled={isDisabled}
      type={type}
      {...props}
    >
      {loading ? (
        <>
          <span
            aria-hidden="true"
            className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          />
          <span>{loadingText ?? children}</span>
        </>
      ) : (
        <>
          {startIcon ? <span className="shrink-0">{startIcon}</span> : null}
          <span>{children}</span>
          {endIcon ? <span className="shrink-0">{endIcon}</span> : null}
        </>
      )}
    </button>
  );
}

import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

export type BadgeVariant = "success" | "warning" | "danger" | "info";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  dot?: boolean;
}

const badgeVariantStyles: Record<BadgeVariant, string> = {
  success:
    "border-emerald-400/35 bg-emerald-500/15 text-emerald-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]",
  warning:
    "border-amber-400/35 bg-amber-400/15 text-amber-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]",
  danger:
    "border-red-400/35 bg-red-500/15 text-red-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]",
  info: "border-white/12 bg-slate-400/10 text-slate-100 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]",
};

const badgeDotStyles: Record<BadgeVariant, string> = {
  success: "bg-emerald-300",
  warning: "bg-amber-300",
  danger: "bg-red-300",
  info: "bg-slate-200",
};

export function Badge({
  className,
  variant = "info",
  dot = false,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex min-h-7 items-center justify-center gap-2 rounded-full border px-3 py-1 text-[11px] font-medium tracking-[0.14em] uppercase whitespace-nowrap",
        badgeVariantStyles[variant],
        className
      )}
      {...props}
    >
      {dot ? (
        <span
          aria-hidden="true"
          className={cn("h-1.5 w-1.5 rounded-full", badgeDotStyles[variant])}
        />
      ) : null}
      <span>{children}</span>
    </span>
  );
}

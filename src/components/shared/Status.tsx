import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

export type StatusVariant = "DONE" | "PENDING" | "CANCELLED";

interface StatusProps {
  variant?: StatusVariant;
  className?: string;
  children?: ReactNode;
}

const statusStyles: Record<StatusVariant, { pill: string; text: string }> = {
  DONE: {
    pill: "bg-[rgba(0,255,47,0.25)]",
    text: "text-[#2ca642]",
  },
  PENDING: {
    pill: "bg-[rgba(255,217,0,0.25)]",
    text: "text-[#a6932c]",
  },
  CANCELLED: {
    pill: "bg-[rgba(255,0,0,0.25)]",
    text: "text-[#d25454]",
  },
};

export function Status({
  variant = "DONE",
  className,
  children,
}: StatusProps) {
  const styles = statusStyles[variant];

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <span
        className={cn(
          "inline-flex min-w-[109px] items-center justify-center rounded-full px-3 py-[2px]",
          styles.pill
        )}
      >
        <span className={cn("text-[14px] font-semibold", styles.text)}>
          {children ?? variant}
        </span>
      </span>
    </div>
  );
}

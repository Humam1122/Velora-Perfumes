import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

interface LuxuryBadgeProps {
  children: ReactNode;
  className?: string;
}

export function LuxuryBadge({ children, className }: LuxuryBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 text-[0.68rem] font-medium uppercase tracking-[0.32em] text-[#C6A56B]",
        className,
      )}
    >
      <span className="h-px w-8 bg-[#C6A56B]/70" />
      {children}
    </span>
  );
}

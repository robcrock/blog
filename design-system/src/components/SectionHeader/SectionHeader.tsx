import * as React from "react";
import { cn } from "../../lib/utils";

interface SectionHeaderProps {
  label: string;
  href?: string;
  linkLabel?: string;
  className?: string;
}

/** Hairline section header pattern used on home (Lab / Craft / Projects). */
export function SectionHeader({
  label,
  href,
  linkLabel = "view all",
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-6 flex items-center gap-4", className)}>
      <h2 className="text-lg font-medium tracking-tight">{label}</h2>
      <div className="h-px flex-1 bg-border" aria-hidden />
      {href ? (
        <a
          href={href}
          className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground transition-colors duration-200 hover:text-foreground"
        >
          {linkLabel}
        </a>
      ) : null}
    </div>
  );
}

"use client";

import { useState } from "react";

const ORIGINS = [
  "top left",
  "top center",
  "top right",
  "center left",
  "center",
  "center right",
  "bottom left",
  "bottom center",
  "bottom right",
] as const;

type Origin = (typeof ORIGINS)[number];

export function PopoverOriginExhibit() {
  const [origin, setOrigin] = useState<Origin>("top left");
  const [replayKey, setReplayKey] = useState(0);

  const selectOrigin = (next: Origin) => {
    setOrigin(next);
    setReplayKey((k) => k + 1);
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center gap-8 bg-[radial-gradient(hsl(var(--muted-foreground)/0.12)_1px,transparent_1px)] [background-size:24px_24px]">
      {/* The popover, replayed on every origin change */}
      <div
        key={replayKey}
        aria-hidden
        className="w-40 rounded border border-border bg-popover p-3 shadow-subtle animate-[popoverIn_200ms_cubic-bezier(0.165,0.84,0.44,1)] motion-reduce:animate-none"
        style={{ transformOrigin: origin }}
      >
        <div className="mb-2.5 h-2 w-1/2 rounded-sm bg-foreground/20" />
        <div className="space-y-1.5">
          <div className="h-1.5 w-full rounded-sm bg-muted-foreground/20" />
          <div className="h-1.5 w-5/6 rounded-sm bg-muted-foreground/20" />
          <div className="h-1.5 w-2/3 rounded-sm bg-muted-foreground/20" />
        </div>
      </div>

      {/* 3×3 origin picker */}
      <div>
        <div className="grid grid-cols-3">
          {ORIGINS.map((o) => (
            <button
              key={o}
              type="button"
              aria-label={`Animate from ${o}`}
              aria-pressed={origin === o}
              onClick={() => selectOrigin(o)}
              className="group flex size-10 items-center justify-center rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span
                className={`size-2 rounded-full transition-colors duration-200 ${
                  origin === o
                    ? "bg-primary"
                    : "bg-muted-foreground/30 group-hover:bg-muted-foreground/60"
                }`}
              />
            </button>
          ))}
        </div>
        <p className="mt-2 text-center font-mono text-[11px] tracking-wide text-muted-foreground">
          {origin}
        </p>
      </div>
    </div>
  );
}

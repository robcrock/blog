"use client";

import { useCallback, useRef, useState } from "react";

import { clampedNormalize } from "./math";

// SVG layout
const W = 480;
const H = 256;
const LX = 150;
const RX = 330;
const TY = 44;
const BY = 188;
const SPAN = BY - TY;

const IN_MIN = 0;
const IN_MAX = 100;
const OUT_MIN = 2;
const OUT_MAX = 8;

export function RangeMappingExhibit() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [input, setInput] = useState(62);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    // Pointer height drives the input value: top of canvas = max, bottom = min
    const next = clampedNormalize(
      e.clientY - rect.top,
      (TY / H) * rect.height,
      (BY / H) * rect.height,
      IN_MAX,
      IN_MIN
    );
    setInput(Math.round(next));
  }, []);

  const output = clampedNormalize(input, IN_MIN, IN_MAX, OUT_MIN, OUT_MAX);
  const inputY = BY - ((input - IN_MIN) / (IN_MAX - IN_MIN)) * SPAN;
  const outputY = BY - ((output - OUT_MIN) / (OUT_MAX - OUT_MIN)) * SPAN;

  return (
    <div className="absolute inset-0 bg-[radial-gradient(hsl(var(--muted-foreground)/0.12)_1px,transparent_1px)] [background-size:24px_24px]">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        onPointerMove={handlePointerMove}
        className="size-full cursor-ns-resize"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Axis captions */}
        <text x={LX} y={TY - 16} textAnchor="middle" className="fill-muted-foreground font-mono text-[10px] uppercase" letterSpacing={1.5}>
          input
        </text>
        <text x={RX} y={TY - 16} textAnchor="middle" className="fill-muted-foreground font-mono text-[10px] uppercase" letterSpacing={1.5}>
          output
        </text>

        {/* Endpoint values */}
        <text x={LX - 14} y={TY + 4} textAnchor="end" className="fill-muted-foreground font-mono text-[11px]">{IN_MAX}</text>
        <text x={LX - 14} y={BY + 4} textAnchor="end" className="fill-muted-foreground font-mono text-[11px]">{IN_MIN}</text>
        <text x={RX + 14} y={TY + 4} textAnchor="start" className="fill-muted-foreground font-mono text-[11px]">{OUT_MAX}</text>
        <text x={RX + 14} y={BY + 4} textAnchor="start" className="fill-muted-foreground font-mono text-[11px]">{OUT_MIN}</text>

        {/* Boundary mapping lines */}
        <line x1={LX} y1={TY} x2={RX} y2={TY} strokeWidth={1} strokeDasharray="4 4" className="stroke-border" />
        <line x1={LX} y1={BY} x2={RX} y2={BY} strokeWidth={1} strokeDasharray="4 4" className="stroke-border" />

        {/* Current mapping line */}
        <line x1={LX} y1={inputY} x2={RX} y2={outputY} strokeWidth={2} className="stroke-primary" />

        {/* Vertical axes */}
        <line x1={LX} y1={TY} x2={LX} y2={BY} strokeWidth={2} strokeLinecap="round" className="stroke-foreground/70" />
        <line x1={RX} y1={TY} x2={RX} y2={BY} strokeWidth={2} strokeLinecap="round" className="stroke-foreground/70" />

        {/* Endpoint dots */}
        <circle cx={LX} cy={TY} r={3} className="fill-muted-foreground" />
        <circle cx={LX} cy={BY} r={3} className="fill-muted-foreground" />
        <circle cx={RX} cy={TY} r={3} className="fill-muted-foreground" />
        <circle cx={RX} cy={BY} r={3} className="fill-muted-foreground" />

        {/* Current dots */}
        <circle cx={LX} cy={inputY} r={5.5} className="fill-primary" />
        <circle cx={RX} cy={outputY} r={5.5} className="fill-primary" />
      </svg>

      <p className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[11px] tracking-wide text-muted-foreground tabular-nums">
        clampedNormalize({input}) → {output.toFixed(1)}
      </p>
    </div>
  );
}

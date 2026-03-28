// src/components/playground/controls/dual-range-control.tsx
"use client";

import { cn } from "@/shared/lib/utils";

import { DualRangeControlProps } from "../types";

const thumbClass = [
  // Base thumb appearance
  "[&::-webkit-slider-thumb]:appearance-none",
  "[&::-webkit-slider-thumb]:w-4",
  "[&::-webkit-slider-thumb]:h-4",
  "[&::-webkit-slider-thumb]:rounded-full",
  "[&::-webkit-slider-thumb]:bg-primary",
  "[&::-webkit-slider-thumb]:cursor-pointer",
  "[&::-webkit-slider-thumb]:transition-all",
  // Hover: scale up
  "[&::-webkit-slider-thumb]:hover:scale-110",
  // Active/pressed: scale down + darken
  "[&:active::-webkit-slider-thumb]:scale-95",
  "[&:active::-webkit-slider-thumb]:[filter:brightness(0.8)]",
  // Firefox
  "[&::-moz-range-thumb]:w-4",
  "[&::-moz-range-thumb]:h-4",
  "[&::-moz-range-thumb]:rounded-full",
  "[&::-moz-range-thumb]:bg-primary",
  "[&::-moz-range-thumb]:border-0",
  "[&::-moz-range-thumb]:cursor-pointer",
  "[&::-moz-range-thumb]:transition-all",
  "[&::-moz-range-thumb]:hover:scale-110",
  "[&:active::-moz-range-thumb]:scale-95",
  "[&:active::-moz-range-thumb]:[filter:brightness(0.8)]",
].join(" ");

export function DualRangeControl({
  label,
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
  min = 0,
  max = 100,
  step = 1,
  unit = "",
  formatValue = (v) => String(v),
}: DualRangeControlProps) {
  const toPercent = (v: number) => ((v - min) / (max - min)) * 100;
  const minPct = toPercent(minValue);
  const maxPct = toPercent(maxValue);
  // Split the track at the midpoint between the two thumbs.
  // Each input's clip-path restricts pointer events to its side,
  // so clicks can never accidentally hit the wrong thumb.
  const midPct = (minPct + maxPct) / 2;

  const inputBase = cn(
    "absolute inset-0 w-full h-full appearance-none bg-transparent cursor-pointer z-10",
    "[&::-webkit-slider-runnable-track]:bg-transparent",
    "[&::-moz-range-track]:bg-transparent",
    thumbClass,
  );

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-foreground">{label}</label>
        <span className="font-mono text-sm tabular-nums text-muted-foreground">
          {formatValue(minValue)}
          {unit} – {formatValue(maxValue)}
          {unit}
        </span>
      </div>
      <div className="relative h-4 flex items-center">
        {/* Track background */}
        <div className="absolute inset-x-0 h-2 rounded bg-muted pointer-events-none" />
        {/* Active fill between thumbs */}
        <div
          className="absolute h-2 rounded bg-primary/40 pointer-events-none"
          style={{ left: `${minPct}%`, right: `${100 - maxPct}%` }}
        />
        {/* Min input — clip-path restricts its pointer area to the left portion */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={minValue}
          onChange={(e) => {
            const v = Number(e.target.value);
            onMinChange(Math.min(v, maxValue - step));
          }}
          className={inputBase}
          style={{ clipPath: `inset(-6px ${100 - midPct}% -6px 0)` }}
        />
        {/* Max input — clip-path restricts its pointer area to the right portion */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxValue}
          onChange={(e) => {
            const v = Number(e.target.value);
            onMaxChange(Math.max(v, minValue + step));
          }}
          className={inputBase}
          style={{ clipPath: `inset(-6px 0 -6px ${midPct}%)` }}
        />
      </div>
    </div>
  );
}

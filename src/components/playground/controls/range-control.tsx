// src/components/playground/controls/RangeControl.tsx
"use client";

import { cn } from "@/lib/utils";

import { RangeControlProps } from "../types";

export function RangeControl({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  unit = "",
  showValue = true,
}: RangeControlProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-foreground">{label}</label>
        {showValue && (
          <span className="font-mono text-sm tabular-nums text-muted-foreground">
            {value}
            {unit}
          </span>
        )}
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={cn(
          "w-full h-2 rounded-lg appearance-none cursor-pointer",
          "bg-muted",
          "[&::-webkit-slider-thumb]:appearance-none",
          "[&::-webkit-slider-thumb]:w-4",
          "[&::-webkit-slider-thumb]:h-4",
          "[&::-webkit-slider-thumb]:rounded-full",
          "[&::-webkit-slider-thumb]:bg-primary",
          "[&::-webkit-slider-thumb]:cursor-pointer",
          "[&::-webkit-slider-thumb]:transition-transform",
          "[&::-webkit-slider-thumb]:hover:scale-110",
          "[&::-moz-range-thumb]:w-4",
          "[&::-moz-range-thumb]:h-4",
          "[&::-moz-range-thumb]:rounded-full",
          "[&::-moz-range-thumb]:bg-primary",
          "[&::-moz-range-thumb]:border-0",
          "[&::-moz-range-thumb]:cursor-pointer"
        )}
      />
    </div>
  );
}

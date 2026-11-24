// src/components/playground/controls/RangeControl.tsx
"use client";

import { useId } from "react";

import { cn } from "@/shared/lib/utils";

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
  const inputId = useId();

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-foreground"
        >
          {label}
        </label>
        {showValue && (
          <span className="font-mono text-sm tabular-nums text-muted-foreground">
            {value}
            {unit}
          </span>
        )}
      </div>
      <input
        id={inputId}
        name={inputId}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={cn(
          "h-11 w-full cursor-pointer appearance-none bg-transparent",
          "focus-visible:ring-ring focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2",
          "[&::-webkit-slider-runnable-track]:h-2",
          "[&::-webkit-slider-runnable-track]:rounded",
          "[&::-webkit-slider-runnable-track]:bg-muted",
          "[&::-webkit-slider-thumb]:appearance-none",
          "[&::-webkit-slider-thumb]:w-4",
          "[&::-webkit-slider-thumb]:h-4",
          "[&::-webkit-slider-thumb]:rounded-full",
          "[&::-webkit-slider-thumb]:bg-primary",
          "[&::-webkit-slider-thumb]:cursor-pointer",
          "[&::-webkit-slider-thumb]:hover:scale-110",
          "[&::-webkit-slider-thumb]:-mt-1",
          "[&::-moz-range-track]:h-2",
          "[&::-moz-range-track]:rounded",
          "[&::-moz-range-track]:bg-muted",
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

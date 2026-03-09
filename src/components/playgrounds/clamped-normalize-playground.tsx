"use client";

import { useState } from "react";

import {
  DualRangeControl,
  Playground,
  PlaygroundCanvas,
  PlaygroundCode,
  PlaygroundControls,
  RangeControl,
} from "@/components/playground";

// --- Utilities ---
const clamp = (value: number, min: number, max: number): number => {
  if (min > max) [min, max] = [max, min];
  return Math.max(min, Math.min(max, value));
};

const normalize = (
  number: number,
  currentMin: number,
  currentMax: number,
  newMin: number,
  newMax: number
): number => {
  const t = (number - currentMin) / (currentMax - currentMin);
  return (newMax - newMin) * t + newMin;
};

const clampedNormalize = (
  value: number,
  currentMin: number,
  currentMax: number,
  newMin: number,
  newMax: number
): number =>
  clamp(normalize(value, currentMin, currentMax, newMin, newMax), newMin, newMax);

// --- SVG layout ---
const W = 480;
const H = 300;
const LX = 120;
const RX = 360;
const TY = 100;
const BY = 220;
const LH = BY - TY; // 120

export function ClampedNormalizePlayground() {
  const [input, setInput] = useState(40);
  const [minInput, setMinInput] = useState(0);
  const [maxInput, setMaxInput] = useState(80);
  const [minOutput, setMinOutput] = useState(2);
  const [maxOutput, setMaxOutput] = useState(7);

  const safeInput = clamp(input, minInput, maxInput);
  const output = clampedNormalize(safeInput, minInput, maxInput, maxOutput, minOutput);

  // Left line: minInput at bottom (BY), maxInput at top (TY)
  const lY = (v: number) =>
    BY - ((v - minInput) / (maxInput - minInput)) * LH;
  // Right line: minOutput at bottom (BY), maxOutput at top (TY)
  const rY = (v: number) =>
    BY - ((v - minOutput) / (maxOutput - minOutput)) * LH;

  const curLY = lY(safeInput);
  const curRY = rY(output);

  const showInputLabel = Math.abs(curLY - TY) > 16 && Math.abs(curLY - BY) > 16;
  const showOutputLabel = Math.abs(curRY - TY) > 16 && Math.abs(curRY - BY) > 16;

  const code = [
    "clampedNormalize(",
    `  ${safeInput},   // input (distance)`,
    `  ${minInput},        // min input`,
    `  ${maxInput},      // max input (influence)`,
    `  ${maxOutput},       // max output (MAX_R)`,
    `  ${minOutput}        // min output (BASE_R)`,
    ")",
    `// → ${output.toFixed(2)}`,
  ].join("\n");

  const axis     = "hsl(210deg 15% 35%)";
  const endpoint = "hsl(210deg 15% 50%)";
  const dim      = "hsl(210deg 15% 38%)";
  const val      = "hsl(210deg 15% 70%)";
  const dash     = "hsl(210deg 15% 22%)";
  const active   = "hsl(15deg 65% 55%)";

  return (
    <Playground
      title="clampedNormalize"
      description="Adjust the ranges and drag the input to see how values map."
    >
      <div className="flex flex-col gap-4">
        <PlaygroundCanvas
          backgroundPattern="none"
          className="rounded-lg bg-[hsl(210deg_15%_8%)]"
        >
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">

            {/* ── Left column: MAX INPUT (top) ── */}
            <text x={LX} y={46} textAnchor="middle" fill={dim} fontSize={9} fontFamily="monospace" letterSpacing={2}>MAX INPUT</text>
            <text x={LX} y={72} textAnchor="middle" fill={val} fontSize={18} fontFamily="monospace" fontWeight="bold">{maxInput}</text>

            {/* ── Left column: MIN INPUT (bottom) ── */}
            <text x={LX} y={BY + 26} textAnchor="middle" fill={val} fontSize={18} fontFamily="monospace" fontWeight="bold">{minInput}</text>
            <text x={LX} y={BY + 46} textAnchor="middle" fill={dim} fontSize={9} fontFamily="monospace" letterSpacing={2}>MIN INPUT</text>

            {/* ── Right column: MAX OUTPUT (top) ── */}
            <text x={RX} y={46} textAnchor="middle" fill={dim} fontSize={9} fontFamily="monospace" letterSpacing={2}>MAX OUTPUT</text>
            <text x={RX} y={72} textAnchor="middle" fill={val} fontSize={18} fontFamily="monospace" fontWeight="bold">{maxOutput.toFixed(1)}</text>

            {/* ── Right column: MIN OUTPUT (bottom) ── */}
            <text x={RX} y={BY + 26} textAnchor="middle" fill={val} fontSize={18} fontFamily="monospace" fontWeight="bold">{minOutput.toFixed(1)}</text>
            <text x={RX} y={BY + 46} textAnchor="middle" fill={dim} fontSize={9} fontFamily="monospace" letterSpacing={2}>MIN OUTPUT</text>

            {/* ── Boundary mapping lines (dashed, crossing) ── */}
            <line x1={LX} y1={TY} x2={RX} y2={BY} stroke={dash} strokeWidth={1.5} strokeDasharray="5 5" />
            <line x1={LX} y1={BY} x2={RX} y2={TY} stroke={dash} strokeWidth={1.5} strokeDasharray="5 5" />

            {/* ── Current mapping line ── */}
            <line x1={LX} y1={curLY} x2={RX} y2={curRY} stroke={active} strokeWidth={2} opacity={0.8} />

            {/* ── Vertical lines ── */}
            <line x1={LX} y1={TY} x2={LX} y2={BY} stroke={axis} strokeWidth={2} strokeLinecap="round" />
            <line x1={RX} y1={TY} x2={RX} y2={BY} stroke={axis} strokeWidth={2} strokeLinecap="round" />

            {/* Endpoint dots */}
            <circle cx={LX} cy={TY} r={4} fill={endpoint} />
            <circle cx={LX} cy={BY} r={4} fill={endpoint} />
            <circle cx={RX} cy={TY} r={4} fill={endpoint} />
            <circle cx={RX} cy={BY} r={4} fill={endpoint} />

            {/* ── Current input dot + label ── */}
            <circle cx={LX} cy={curLY} r={6} fill={active} />
            {showInputLabel && (
              <text x={LX - 14} y={curLY + 4} textAnchor="end" fill={active} fontSize={11} fontFamily="monospace" fontWeight="bold">
                {safeInput}
              </text>
            )}

            {/* ── Current output dot + label ── */}
            <circle cx={RX} cy={curRY} r={6} fill={active} />
            {showOutputLabel && (
              <text x={RX + 14} y={curRY + 4} textAnchor="start" fill={active} fontSize={11} fontFamily="monospace" fontWeight="bold">
                {output.toFixed(1)}
              </text>
            )}

          </svg>
        </PlaygroundCanvas>

        <PlaygroundControls>
          {/* Full-width: current input value */}
          <RangeControl
            label="Input (distance)"
            value={input}
            onChange={setInput}
            min={minInput}
            max={maxInput}
            step={1}
          />

          {/* 2-column: input range left, output range right */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-3">
            <DualRangeControl
              label="Input Range"
              minValue={minInput}
              maxValue={maxInput}
              onMinChange={(v) => setMinInput(Math.min(v, maxInput - 1))}
              onMaxChange={(v) => setMaxInput(Math.max(v, minInput + 1))}
              min={0}
              max={150}
              step={1}
            />
            <DualRangeControl
              label="Output Range"
              minValue={minOutput}
              maxValue={maxOutput}
              onMinChange={(v) => setMinOutput(Math.min(v, maxOutput - 0.5))}
              onMaxChange={(v) => setMaxOutput(Math.max(v, minOutput + 0.5))}
              min={1}
              max={20}
              step={0.5}
              formatValue={(v) => v.toFixed(1)}
            />
          </div>
        </PlaygroundControls>

        <PlaygroundCode code={code} className="mt-0" />
      </div>
    </Playground>
  );
}

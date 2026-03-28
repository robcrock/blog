// src/components/playgrounds/interactive-dot-grid-playground.tsx
"use client";

import { useCallback, useRef, useState } from "react";

import {
  Playground,
  PlaygroundCanvas,
  PlaygroundCode,
  PlaygroundControls,
  RangeControl,
} from "../playground";

// --- Types ---
interface Point {
  x: number;
  y: number;
}

// --- Utilities (inlined for playground self-containment) ---
const clamp = (value: number, min = 0, max = 1): number => {
  if (min > max) [min, max] = [max, min];
  return Math.max(min, Math.min(max, value));
};

const normalize = (
  number: number,
  currentMin: number,
  currentMax: number,
  newMin = 0,
  newMax = 1
): number => {
  const standardNormalization =
    (number - currentMin) / (currentMax - currentMin);
  return (newMax - newMin) * standardNormalization + newMin;
};

const clampedNormalize = (
  value: number,
  currentMin: number,
  currentMax: number,
  newMin = 0,
  newMax = 1
): number => {
  return clamp(
    normalize(value, currentMin, currentMax, newMin, newMax),
    newMin,
    newMax
  );
};

const getDistanceBetweenPoints = (p1: Point, p2: Point): number => {
  const deltaX = p1.x - p2.x;
  const deltaY = p1.y - p2.y;
  return Math.sqrt(deltaX ** 2 + deltaY ** 2);
};

// --- Grid configuration ---
const COLS = 30;
const ROWS = 15;
const VIEWBOX_W = 600;
const VIEWBOX_H = 300;
const BASE_R = 2;
const MAX_R = 7;
const STEP_X = (VIEWBOX_W - 2 * MAX_R) / (COLS - 1);
const STEP_Y = (VIEWBOX_H - 2 * MAX_R) / (ROWS - 1);
const DOT_COLOR = "hsl(210deg 15% 50%)";
const HOVER_COLOR = "hsl(15deg 65% 55%)";

// Pre-compute dot positions
const dots: Point[] = [];
for (let r = 0; r < ROWS; r++) {
  for (let c = 0; c < COLS; c++) {
    dots.push({
      x: MAX_R + c * STEP_X,
      y: MAX_R + r * STEP_Y,
    });
  }
}

export function InteractiveDotGridPlayground() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState<Point | null>(null);
  const [influence, setInfluence] = useState(80);

  // Track cursor in SVG coordinates
  const handleMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return;

    // Use SVG's native coordinate transform
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return;
    const svgPt = pt.matrixTransform(ctm.inverse());
    setCursor({ x: svgPt.x, y: svgPt.y });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setCursor(null);
  }, []);

  // Compute radius and color for each dot
  const getDotProps = (dot: Point) => {
    if (!cursor) {
      return { r: BASE_R, fill: DOT_COLOR };
    }
    const distance = getDistanceBetweenPoints(cursor, dot);
    const r = clampedNormalize(distance, 0, influence, MAX_R, BASE_R);
    const fill = distance < influence ? HOVER_COLOR : DOT_COLOR;
    return { r, fill };
  };

  // Find the closest dot for code display
  const closestDot = cursor
    ? dots.reduce(
        (closest, dot, index) => {
          const d = getDistanceBetweenPoints(cursor, dot);
          return d < closest.distance ? { index, distance: d, dot } : closest;
        },
        { index: -1, distance: Infinity, dot: dots[0] }
      )
    : null;

  const distanceDisplay = cursor
    ? `${closestDot?.distance.toFixed(0)}px (closest dot)`
    : "--";
  const radiusDisplay = cursor
    ? `${getDotProps(closestDot?.dot ?? dots[0]).r.toFixed(1)}px`
    : "--";

  const code = [
    "// For each dot, compute distance from cursor",
    "const distance = getDistanceBetweenPoints(cursor, dot);",
    `// distance = ${distanceDisplay}`,
    "",
    "const radius = clampedNormalize(",
    "  distance,",
    "  0,         // min distance (on top of dot)",
    `  ${influence},        // max distance (influence radius)`,
    `  ${MAX_R},         // max radius (on top of dot)`,
    `  ${BASE_R}          // min radius default state`,
    ");",
    `// radius = ${radiusDisplay}`,
  ].join("\n");

  return (
    <Playground
      title="Interactive Dot Grid"
      description="Move your cursor over the grid. Each dot's radius responds to its distance from your cursor."
    >
      <div className="flex flex-col gap-4">
        {/* Full-width canvas */}
        <PlaygroundCanvas
          backgroundPattern="none"
          className="min-h-[360px] rounded-lg bg-[hsl(210deg_15%_8%)]"
        >
          <svg
            ref={svgRef}
            viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
            className="w-full h-full"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ cursor: "crosshair" }}
          >
            {dots.map((dot, i) => {
              const { r, fill } = getDotProps(dot);
              return (
                <circle
                  key={i}
                  cx={dot.x}
                  cy={dot.y}
                  r={r}
                  fill={fill}
                  style={{
                    transition: "r 0.05s ease-out, fill 0.05s ease-out",
                  }}
                />
              );
            })}

            {/* Influence radius indicator */}
            {cursor && (
              <circle
                cx={cursor.x}
                cy={cursor.y}
                r={influence}
                fill="none"
                stroke="hsl(210deg 15% 25%)"
                strokeWidth={1}
                strokeDasharray="4 4"
                style={{ pointerEvents: "none" }}
              />
            )}
          </svg>
        </PlaygroundCanvas>

        {/* Controls */}
        <PlaygroundControls>
          <RangeControl
            label="Influence Radius"
            value={influence}
            onChange={setInfluence}
            min={30}
            max={150}
            step={5}
          />
        </PlaygroundControls>

        {/* Code readout */}
        <PlaygroundCode code={code} className="mt-0 min-h-[280px]" />
      </div>
    </Playground>
  );
}

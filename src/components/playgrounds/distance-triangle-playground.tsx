// src/components/playgrounds/distance-triangle-playground.tsx
"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import {
  Playground,
  PlaygroundCanvas,
  PlaygroundCode,
} from "@/components/playground";

interface Point {
  x: number;
  y: number;
}

function getDistanceBetweenPoints(p1: Point, p2: Point) {
  const deltaX = p1.x - p2.x;
  const deltaY = p1.y - p2.y;
  return Math.sqrt(deltaX ** 2 + deltaY ** 2);
}

export function DistanceTrianglePlayground() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState<Point | null>(null);

  // Center point of the canvas — computed on mount and mouse enter
  const [center, setCenter] = useState<Point>({ x: 0, y: 0 });

  const updateCenter = useCallback(() => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    setCenter({ x: rect.width / 2, y: rect.height / 2 });
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    setCursor({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    updateCenter();
  }, [updateCenter]);

  const handleMouseLeave = useCallback(() => {
    setCursor(null);
  }, []);

  // Compute center on mount and when canvas resizes so placeholder appears in the middle
  useEffect(() => {
    updateCenter();
    if (!canvasRef.current) return;
    const ro = new ResizeObserver(updateCenter);
    ro.observe(canvasRef.current);
    return () => ro.disconnect();
  }, [updateCenter]);

  // Derived values
  const deltaX = cursor ? Math.round(cursor.x - center.x) : 0;
  const deltaY = cursor ? Math.round(cursor.y - center.y) : 0;
  const distance = cursor
    ? Math.round(getDistanceBetweenPoints(cursor, center))
    : 0;

  // Corner point of the right angle (same x as cursor, same y as center)
  const corner: Point = cursor
    ? { x: cursor.x, y: center.y }
    : { x: center.x, y: center.y };

  // Label positions — midpoints of each side
  const deltaXLabelPos = cursor
    ? { x: (center.x + corner.x) / 2, y: center.y }
    : null;
  const deltaYLabelPos = cursor
    ? { x: corner.x, y: (center.y + cursor.y) / 2 }
    : null;
  const distanceLabelPos = cursor
    ? { x: (center.x + cursor.x) / 2, y: (center.y + cursor.y) / 2 }
    : null;

  const code = cursor
    ? `const deltaX = cursor.x - center.x; // ${deltaX}px
const deltaY = cursor.y - center.y; // ${deltaY}px

const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
// √(${deltaX}² + ${deltaY}²) = ${distance}px`
    : `const deltaX = cursor.x - center.x;
const deltaY = cursor.y - center.y;

const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);`;

  // Right-angle indicator size
  const TICK = 10;

  return (
    <Playground
      title="The Distance Triangle"
      description="Move your cursor to see the right triangle formed between two points—and the Pythagorean theorem in action."
    >
      <PlaygroundCanvas backgroundPattern="grid" className="min-h-[400px]">
        <div
          ref={canvasRef}
          className="absolute inset-0 cursor-crosshair"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <svg className="overflow-visible absolute inset-0 w-full h-full">
            {/* Center point */}
            <circle
              cx={center.x}
              cy={center.y}
              r={5}
              className="fill-primary"
            />
            <text
              x={center.x}
              y={center.y - 12}
              textAnchor="middle"
              className="select-none fill-muted-foreground text-[11px] font-medium"
            >
              center
            </text>

            {cursor && (
              <>
                {/* deltaX — horizontal leg */}
                <line
                  x1={center.x}
                  y1={center.y}
                  x2={corner.x}
                  y2={corner.y}
                  strokeWidth={2}
                  strokeDasharray="6 4"
                  className="stroke-muted-foreground/60"
                />

                {/* deltaY — vertical leg */}
                <line
                  x1={corner.x}
                  y1={corner.y}
                  x2={cursor.x}
                  y2={cursor.y}
                  strokeWidth={2}
                  strokeDasharray="6 4"
                  className="stroke-muted-foreground/60"
                />

                {/* Hypotenuse — distance */}
                <line
                  x1={center.x}
                  y1={center.y}
                  x2={cursor.x}
                  y2={cursor.y}
                  strokeWidth={2.5}
                  className="stroke-primary"
                />

                {/* Right-angle indicator at the corner */}
                <polyline
                  points={`
                    ${corner.x + (deltaX >= 0 ? -TICK : TICK)},${corner.y}
                    ${corner.x + (deltaX >= 0 ? -TICK : TICK)},${corner.y + (deltaY >= 0 ? TICK : -TICK)}
                    ${corner.x},${corner.y + (deltaY >= 0 ? TICK : -TICK)}
                  `}
                  fill="none"
                  strokeWidth={1.5}
                  className="stroke-muted-foreground/40"
                />

                {/* Cursor point */}
                <circle
                  cx={cursor.x}
                  cy={cursor.y}
                  r={5}
                  className="fill-primary"
                />

                {/* deltaX label */}
                {deltaXLabelPos && Math.abs(deltaX) > 40 && (
                  <text
                    x={deltaXLabelPos.x}
                    y={deltaXLabelPos.y + (deltaY >= 0 ? -10 : 18)}
                    textAnchor="middle"
                    className="select-none fill-muted-foreground font-mono text-[12px] font-semibold"
                  >
                    Δx: {Math.abs(deltaX)}
                  </text>
                )}

                {/* deltaY label */}
                {deltaYLabelPos && Math.abs(deltaY) > 40 && (
                  <text
                    x={deltaYLabelPos.x + (deltaX >= 0 ? 14 : -14)}
                    y={deltaYLabelPos.y + 4}
                    textAnchor={deltaX >= 0 ? "start" : "end"}
                    className="select-none fill-muted-foreground font-mono text-[12px] font-semibold"
                  >
                    Δy: {Math.abs(deltaY)}
                  </text>
                )}

                {/* Distance label on hypotenuse */}
                {distanceLabelPos && distance > 60 && (
                  <g>
                    <rect
                      x={distanceLabelPos.x - 32}
                      y={distanceLabelPos.y - 24}
                      width={64}
                      height={20}
                      rx={4}
                      className="fill-primary"
                    />
                    <text
                      x={distanceLabelPos.x}
                      y={distanceLabelPos.y - 11}
                      textAnchor="middle"
                      className="select-none fill-primary-foreground font-mono text-[11px] font-bold"
                    >
                      {distance}px
                    </text>
                  </g>
                )}
              </>
            )}

            {/* Idle state hint — centered in canvas */}
            {!cursor && center.x > 0 && (
              <text
                x={center.x}
                y={center.y + 28}
                textAnchor="middle"
                className="select-none fill-muted-foreground/60 text-[13px]"
              >
                Move your cursor into the canvas to see the triangle
              </text>
            )}
          </svg>
        </div>
      </PlaygroundCanvas>

      <PlaygroundCode code={code} language="javascript" />
    </Playground>
  );
}

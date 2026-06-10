"use client";

import { useCallback, useMemo, useRef } from "react";

import { clampedNormalize, distanceBetween, type Point } from "./math";

const VIEWBOX_W = 480;
const VIEWBOX_H = 256;
const COLS = 24;
const ROWS = 13;
const BASE_R = 1.5;
const MAX_R = 7;
const INFLUENCE = 80;
const DOT_COLOR = "hsl(0 0% 74%)";
const HOVER_COLOR = "hsl(7 57% 53%)";

export function DotGridExhibit() {
  const svgRef = useRef<SVGSVGElement>(null);
  const cursorRef = useRef<Point | null>(null);
  const rafRef = useRef(0);
  const ringRef = useRef<SVGCircleElement>(null);

  const dots = useMemo(() => {
    const stepX = (VIEWBOX_W - 2 * MAX_R) / (COLS - 1);
    const stepY = (VIEWBOX_H - 2 * MAX_R) / (ROWS - 1);
    const result: Point[] = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        result.push({ x: MAX_R + c * stepX, y: MAX_R + r * stepY });
      }
    }
    return result;
  }, []);

  // Direct DOM updates inside rAF — keeps hundreds of dots off the React render path
  const updateDots = useCallback(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const cursor = cursorRef.current;
    const circles = svg.querySelectorAll<SVGCircleElement>("circle[data-dot]");

    for (let i = 0; i < circles.length; i++) {
      const circle = circles[i];
      const dot = dots[i];
      if (!dot) continue;

      if (!cursor) {
        circle.setAttribute("r", String(BASE_R));
        circle.setAttribute("fill", DOT_COLOR);
      } else {
        const distance = distanceBetween(cursor, dot);
        const r = clampedNormalize(distance, 0, INFLUENCE, MAX_R, BASE_R);
        circle.setAttribute("r", String(r));
        circle.setAttribute(
          "fill",
          distance < INFLUENCE ? HOVER_COLOR : DOT_COLOR
        );
      }
    }

    const ring = ringRef.current;
    if (ring) {
      if (cursor) {
        ring.setAttribute("cx", String(cursor.x));
        ring.setAttribute("cy", String(cursor.y));
        ring.style.display = "";
      } else {
        ring.style.display = "none";
      }
    }
  }, [dots]);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<SVGSVGElement>) => {
      const svg = svgRef.current;
      if (!svg) return;

      const pt = svg.createSVGPoint();
      pt.x = e.clientX;
      pt.y = e.clientY;
      const ctm = svg.getScreenCTM();
      if (!ctm) return;
      const svgPt = pt.matrixTransform(ctm.inverse());
      cursorRef.current = { x: svgPt.x, y: svgPt.y };

      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateDots);
    },
    [updateDots]
  );

  const handlePointerLeave = useCallback(() => {
    cursorRef.current = null;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(updateDots);
  }, [updateDots]);

  return (
    <div className="absolute inset-0">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="size-full cursor-crosshair"
        preserveAspectRatio="xMidYMid slice"
      >
        {dots.map((dot, i) => (
          <circle
            key={i}
            data-dot
            cx={dot.x}
            cy={dot.y}
            r={BASE_R}
            fill={DOT_COLOR}
            style={{ transition: "r 0.05s ease-out, fill 0.05s ease-out" }}
          />
        ))}
        <circle
          ref={ringRef}
          r={INFLUENCE}
          fill="none"
          strokeWidth={1}
          strokeDasharray="4 4"
          className="stroke-border"
          style={{ pointerEvents: "none", display: "none" }}
        />
      </svg>
    </div>
  );
}

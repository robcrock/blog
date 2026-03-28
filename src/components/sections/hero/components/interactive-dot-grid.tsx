"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import {
  clampedNormalize,
  getDistanceBetweenPoints,
  perlin2D,
} from "@/shared/lib/utils";

const COLS = 20;
const ROWS = 40;
const VIEWBOX_W = 450;
const VIEWBOX_H = 600;
const BASE_R = 2;
const MAX_R = 7;
// Step between dots — corner dots sit MAX_R inset from each edge so they never clip on hover
const STEP_X = (VIEWBOX_W - 2 * MAX_R) / (COLS - 1);
const STEP_Y = (VIEWBOX_H - 2 * MAX_R) / (ROWS - 1);
const INFLUENCE = 100;
const DOT_COLOR = "#c0c0c0";
const HOVER_COLOR = "#CB5142";
const NOISE_SCALE = 0.3;

const ENTRANCE_MS = 1400;

// ─── Component ──────────────────────────────────────────────────────────────

export default function InteractiveDotGrid() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const circlesRef = useRef<(SVGCircleElement | null)[]>([]);
  const cursorSVG = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number | null>(null);
  const entranceRaf = useRef<number | null>(null);
  const [entered, setEntered] = useState(false);
  const reducedMotion = useRef(false);

  // Pre-compute dot positions + entrance delays
  const dots = useMemo(() => {
    const arr = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const cx = MAX_R + c * STEP_X;
        const cy = MAX_R + r * STEP_Y;
        const noise = perlin2D(c * NOISE_SCALE, r * NOISE_SCALE);
        const norm = (noise + 1) / 2;
        const rowBias = 1 - r / ROWS;
        const delay = (norm * 0.55 + rowBias * 0.45) * ENTRANCE_MS;
        arr.push({ cx, cy, delay });
      }
    }
    return arr;
  }, []);

  // Reduced motion check
  useEffect(() => {
    reducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  // ── Entrance animation ──────────────────────────────────────────────────
  useEffect(() => {
    if (reducedMotion.current) {
      circlesRef.current.forEach((el) => {
        if (el) {
          el.setAttribute("r", String(BASE_R));
          el.setAttribute("opacity", "1");
        }
      });
      setEntered(true);
      return;
    }

    const t0 = performance.now();
    function step(now: number) {
      const elapsed = now - t0;
      let done = true;
      dots.forEach((d, i) => {
        const el = circlesRef.current[i];
        if (!el) return;
        if (elapsed >= d.delay) {
          const p = Math.min(1, (elapsed - d.delay) / 900);
          const e = 1 - Math.pow(1 - p, 3); // ease-out cubic
          el.setAttribute("r", String(BASE_R * e));
          el.setAttribute("opacity", String(e));
          if (p < 1) done = false;
        } else {
          el.setAttribute("r", "0");
          el.setAttribute("opacity", "0");
          done = false;
        }
      });
      if (!done) entranceRaf.current = requestAnimationFrame(step);
      else setEntered(true);
    }
    entranceRaf.current = requestAnimationFrame(step);
    return () => {
      if (entranceRaf.current) cancelAnimationFrame(entranceRaf.current);
    };
  }, [dots]);

  // ── Cursor interaction ──────────────────────────────────────────────────
  useEffect(() => {
    if (!entered || reducedMotion.current) return;
    const svgEl = svgRef.current;
    if (!svgEl) return;

    // Use SVG's native coordinate transform — this correctly handles
    // all edge cases including CSS transforms, padding, and aspect ratio
    const pt = svgEl.createSVGPoint();
    let ctm: SVGMatrix | null = null;
    let ctmAge = 0;

    function refreshCTM() {
      if (!svgEl) return;
      const now = performance.now();
      // Cache the inverse CTM, refresh every 500ms
      if (!ctm || now - ctmAge > 500) {
        const screenCTM = svgEl.getScreenCTM();
        ctm = screenCTM ? screenCTM.inverse() : null;
        ctmAge = now;
      }
    }

    function onPointerMove(e: PointerEvent) {
      refreshCTM();
      if (!ctm) return;
      pt.x = e.clientX;
      pt.y = e.clientY;
      const svgPt = pt.matrixTransform(ctm);
      cursorSVG.current = { x: svgPt.x, y: svgPt.y };
    }

    function onPointerLeave() {
      cursorSVG.current = { x: -9999, y: -9999 };
    }

    function tick() {
      const { x, y } = cursorSVG.current;
      for (let i = 0; i < dots.length; i++) {
        const el = circlesRef.current[i];
        if (!el) continue;
        const d = getDistanceBetweenPoints(
          { x, y },
          { x: dots[i].cx, y: dots[i].cy }
        );
        el.setAttribute(
          "r",
          String(clampedNormalize(d, 0, INFLUENCE, MAX_R, BASE_R))
        );
        el.setAttribute("fill", d < INFLUENCE ? HOVER_COLOR : DOT_COLOR);
      }
      rafRef.current = requestAnimationFrame(tick);
    }

    window.addEventListener("pointermove", onPointerMove);
    svgEl.addEventListener("pointerleave", onPointerLeave);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      svgEl.removeEventListener("pointerleave", onPointerLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [entered, dots]);

  return (
    <div className="w-full h-full" style={{ position: "relative" }}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
        preserveAspectRatio="xMidYMid slice"
        className="block w-full h-full"
        role="img"
        aria-label="Decorative interactive dot grid"
      >
        {dots.map((d, i) => (
          <circle
            key={i}
            ref={(el) => {
              circlesRef.current[i] = el;
            }}
            cx={d.cx}
            cy={d.cy}
            r={0}
            fill={DOT_COLOR}
            opacity={0}
          />
        ))}
      </svg>
    </div>
  );
}

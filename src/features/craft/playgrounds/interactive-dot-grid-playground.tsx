"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";

import { DialRoot, DialStore, useDialKit } from "dialkit";

import { Playground, PlaygroundCanvas } from "../playground";

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

// --- Fixed coordinate system ---
const VIEWBOX_W = 600;
const VIEWBOX_H = 300;

// --- Panel name ---
const PANEL_NAME = "Dot Grid";

// --- Mood presets ---
const PRESETS = {
  "Ember Field": {
    influence: 120,
    baseRadius: 1.5,
    maxRadius: 10,
    dotColor: "#4a4a52",
    hoverColor: "#d4623a",
    cols: 20,
    rows: 10,
  },
  Graphite: {
    influence: 50,
    baseRadius: 1,
    maxRadius: 5,
    dotColor: "#8a8a8f",
    hoverColor: "#b0b0b8",
    cols: 45,
    rows: 22,
  },
  "Deep Tide": {
    influence: 160,
    baseRadius: 1,
    maxRadius: 12,
    dotColor: "#3a5a6d",
    hoverColor: "#5ec4b6",
    cols: 25,
    rows: 12,
  },
} as const;

type PresetName = keyof typeof PRESETS;

/** Resolve the internal panel ID by name (useDialKit appends React's useId) */
function getPanelId(): string | undefined {
  return DialStore.getPanels().find(
    (panel: { name: string }) => panel.name === PANEL_NAME
  )?.id;
}

function applyPreset(name: PresetName) {
  const panelId = getPanelId();
  if (!panelId) return;
  const values = PRESETS[name];
  for (const [key, value] of Object.entries(values)) {
    DialStore.updateValue(panelId, key, value);
  }
}

export function InteractiveDotGridPlayground() {
  const svgRef = useRef<SVGSVGElement>(null);
  const cursorRef = useRef<Point | null>(null);
  const rafRef = useRef<number>(0);
  const influenceCircleRef = useRef<SVGCircleElement>(null);

  // All tunable parameters via DialKit
  const p = useDialKit(PANEL_NAME, {
    influence: [80, 30, 200],
    baseRadius: [2, 1, 5, 0.5],
    maxRadius: [7, 3, 15],
    dotColor: "#6d7d8c",
    hoverColor: "#d4623a",
    cols: [30, 10, 60],
    rows: [15, 5, 30],
  });

  // Keep params in a ref so the rAF loop reads fresh values without re-binding
  const paramsRef = useRef(p);
  paramsRef.current = p;

  // Derive dot positions reactively from params
  const dots = useMemo(() => {
    const stepX = (VIEWBOX_W - 2 * p.maxRadius) / (p.cols - 1);
    const stepY = (VIEWBOX_H - 2 * p.maxRadius) / (p.rows - 1);
    const result: Point[] = [];
    for (let r = 0; r < p.rows; r++) {
      for (let c = 0; c < p.cols; c++) {
        result.push({
          x: p.maxRadius + c * stepX,
          y: p.maxRadius + r * stepY,
        });
      }
    }
    return result;
  }, [p.cols, p.rows, p.maxRadius]);

  // Store dots in a ref for the rAF loop
  const dotsRef = useRef(dots);
  dotsRef.current = dots;

  // Direct DOM update — bypasses React render cycle entirely
  const updateDots = useCallback(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const cursor = cursorRef.current;
    const currentDots = dotsRef.current;
    const pr = paramsRef.current;

    // Get all dot circles (skip the influence indicator circle)
    const circles = svg.querySelectorAll<SVGCircleElement>("circle[data-dot]");

    for (let i = 0; i < circles.length; i++) {
      const circle = circles[i];
      const dot = currentDots[i];
      if (!dot) continue;

      if (!cursor) {
        circle.setAttribute("r", String(pr.baseRadius));
        circle.setAttribute("fill", pr.dotColor);
      } else {
        const distance = getDistanceBetweenPoints(cursor, dot);
        const r = clampedNormalize(
          distance,
          0,
          pr.influence,
          pr.maxRadius,
          pr.baseRadius
        );
        const fill = distance < pr.influence ? pr.hoverColor : pr.dotColor;
        circle.setAttribute("r", String(r));
        circle.setAttribute("fill", fill);
      }
    }

    // Update influence radius indicator
    const indicator = influenceCircleRef.current;
    if (indicator) {
      if (cursor) {
        indicator.setAttribute("cx", String(cursor.x));
        indicator.setAttribute("cy", String(cursor.y));
        indicator.setAttribute("r", String(pr.influence));
        indicator.style.display = "";
      } else {
        indicator.style.display = "none";
      }
    }
  }, []);

  // On mousemove, store cursor and schedule a single rAF update
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
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

  const handleMouseLeave = useCallback(() => {
    cursorRef.current = null;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(updateDots);
  }, [updateDots]);

  // When DialKit params change, re-run the DOM update to reflect new values
  useEffect(() => {
    updateDots();
  }, [p, updateDots]);

  return (
    <Playground
      title="Interactive Dot Grid"
      description="Hover to disturb. Tweak the knobs to make it yours."
    >
      <div className="flex flex-col gap-4">
        {/* Mood presets */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            {(Object.keys(PRESETS) as PresetName[]).map((name) => (
              <button
                key={name}
                onClick={() => applyPreset(name)}
                className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground"
              >
                {name}
              </button>
            ))}
            <span className="text-xs text-muted-foreground/60">
              ·{" "}
              <a
                href="https://github.com/joshpuckett/dialkit"
                target="_blank"
                rel="noopener noreferrer"
                className="underline transition-colors underline-offset-2 hover:text-muted-foreground"
              >
                DialKit
              </a>
            </span>
          </div>
        </div>

        {/* Canvas + DialKit panel side by side */}
        <div className="flex gap-4">
          <PlaygroundCanvas
            backgroundPattern="none"
            className="min-h-[360px] flex-1 rounded-lg bg-[hsl(210deg_15%_8%)]"
          >
            <svg
              ref={svgRef}
              viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
              className="w-full h-full"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ cursor: "crosshair" }}
            >
              {dots.map((dot, i) => (
                <circle
                  key={i}
                  data-dot
                  cx={dot.x}
                  cy={dot.y}
                  r={p.baseRadius}
                  fill={p.dotColor}
                  style={{
                    transition: "r 0.05s ease-out, fill 0.05s ease-out",
                  }}
                />
              ))}

              {/* Influence radius indicator — hidden by default, shown via DOM */}
              <circle
                ref={influenceCircleRef}
                r={p.influence}
                fill="none"
                stroke="hsl(210deg 15% 25%)"
                strokeWidth={1}
                strokeDasharray="4 4"
                style={{ pointerEvents: "none", display: "none" }}
              />
            </svg>
          </PlaygroundCanvas>

          <div className="hidden w-[260px] shrink-0 md:block">
            <DialRoot mode="inline" defaultOpen={true} />
          </div>
        </div>
      </div>
    </Playground>
  );
}

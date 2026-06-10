"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { distanceBetween, type Point } from "./math";

const TICK = 8;

export function DistanceTriangleExhibit() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState<Point | null>(null);
  const [center, setCenter] = useState<Point>({ x: 0, y: 0 });

  const updateCenter = useCallback(() => {
    const el = canvasRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setCenter({ x: rect.width / 2, y: rect.height / 2 });
  }, []);

  useEffect(() => {
    updateCenter();
    const el = canvasRef.current;
    if (!el) return;
    const ro = new ResizeObserver(updateCenter);
    ro.observe(el);
    return () => ro.disconnect();
  }, [updateCenter]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    const el = canvasRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  const deltaX = cursor ? Math.round(cursor.x - center.x) : 0;
  const deltaY = cursor ? Math.round(cursor.y - center.y) : 0;
  const distance = cursor ? Math.round(distanceBetween(cursor, center)) : 0;
  const corner: Point = cursor
    ? { x: cursor.x, y: center.y }
    : { x: center.x, y: center.y };

  return (
    <div
      ref={canvasRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setCursor(null)}
      className="absolute inset-0 cursor-crosshair bg-[radial-gradient(hsl(var(--muted-foreground)/0.12)_1px,transparent_1px)] [background-size:24px_24px]"
    >
      <svg className="absolute inset-0 size-full overflow-visible">
        <circle cx={center.x} cy={center.y} r={4} className="fill-foreground" />

        {cursor && (
          <>
            {/* deltaX leg */}
            <line
              x1={center.x}
              y1={center.y}
              x2={corner.x}
              y2={corner.y}
              strokeWidth={1.5}
              strokeDasharray="5 4"
              className="stroke-muted-foreground/50"
            />
            {/* deltaY leg */}
            <line
              x1={corner.x}
              y1={corner.y}
              x2={cursor.x}
              y2={cursor.y}
              strokeWidth={1.5}
              strokeDasharray="5 4"
              className="stroke-muted-foreground/50"
            />
            {/* hypotenuse */}
            <line
              x1={center.x}
              y1={center.y}
              x2={cursor.x}
              y2={cursor.y}
              strokeWidth={2}
              className="stroke-primary"
            />
            {/* right-angle tick */}
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
            <circle cx={cursor.x} cy={cursor.y} r={4} className="fill-primary" />
          </>
        )}
      </svg>

      {/* Readout — fixed position, no layout shift */}
      <p className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[11px] tracking-wide text-muted-foreground tabular-nums">
        {cursor
          ? `√(${Math.abs(deltaX)}² + ${Math.abs(deltaY)}²) = ${distance}px`
          : "trace the hypotenuse"}
      </p>
    </div>
  );
}

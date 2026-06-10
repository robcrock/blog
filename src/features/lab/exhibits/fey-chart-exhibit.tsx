"use client";

import { cubicBezier } from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";

/**
 * Native port of the "fey-chart-animated-numbers" sandbox — a radar
 * chart in the style of Fey. The polygon morphs via SMIL spline
 * interpolation while the labels count up/down on a matching rAF curve.
 */

type ChartData = {
  neutral: number;
  buy: number;
  sell: number;
  strongSell: number;
  strongBuy: number;
};

const MIN = 1;
const MAX = 30;

const AXES: Record<keyof ChartData, { p0: [number, number]; p1: [number, number] }> = {
  neutral: { p0: [50, 20], p1: [50, 44] },
  sell: { p0: [22, 40], p1: [45, 48] },
  strongSell: { p0: [32, 74], p1: [47, 54] },
  strongBuy: { p0: [68, 74], p1: [53, 54] },
  buy: { p0: [78, 40], p1: [55, 48] },
};

const ORDER: (keyof ChartData)[] = [
  "neutral",
  "buy",
  "strongBuy",
  "strongSell",
  "sell",
];

const transform = (
  value: number,
  [a, b]: [number, number],
  [c, d]: [number, number]
) => ((value - a) * (d - c)) / (b - a) + c;

function toPoints(data: ChartData): string {
  return ORDER.map((name) => {
    const { p0, p1 } = AXES[name];
    const x = transform(data[name], [MIN, MAX], [p1[0], p0[0]]);
    const y = transform(data[name], [MIN, MAX], [p1[1], p0[1]]);
    return `${x},${y}`;
  }).join(" ");
}

function usePrevious<T>(value: T): T {
  const ref = useRef(value);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

const ease = cubicBezier(0.25, 0.1, 0.25, 1);

function animateValue({
  from,
  to,
  duration,
  onUpdate,
}: {
  from: number;
  to: number;
  duration: number;
  onUpdate: (value: number) => void;
}) {
  let startTime: number | null = null;
  const frame = (timestamp: number) => {
    if (startTime === null) startTime = timestamp;
    const progress = ease(Math.min((timestamp - startTime) / duration, 1));
    onUpdate(progress * (to - from) + from);
    if (progress < 1) requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}

function AnimatedLabel({
  x,
  y,
  name,
  value,
}: {
  x: string;
  y: string;
  name: string;
  value: number;
}) {
  const previous = usePrevious(value);
  const ref = useRef<SVGTextElement>(null);

  useEffect(() => {
    animateValue({
      from: previous,
      to: value,
      duration: 300,
      onUpdate: (v) => {
        if (!ref.current) return;
        ref.current.textContent = `${name} ${v.toFixed(0)}`;
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return <text ref={ref} x={x} y={y} />;
}

function Background({ data }: { data: ChartData }) {
  return (
    <g>
      <g strokeWidth="0.3">
        <polygon
          points="50,20 22,40 32,74 68,74 78,40"
          stroke="#8A5B43"
          fill="#0E0F13"
        />
        <g stroke="#7D7D4E" strokeDasharray="0.5" fill="none">
          <polygon points="50,44 45,48 47,54 53,54 55,48" />
          <line x1="50" y1="20" x2="50" y2="44" />
          <line x1="22" y1="40" x2="45" y2="48" />
          <line x1="32" y1="74" x2="47" y2="54" />
          <line x1="68" y1="74" x2="53" y2="54" />
          <line x1="78" y1="40" x2="55" y2="48" />
          <g stroke="#4F512F" strokeOpacity="0.26">
            <polygon points="50,40 41,47 44,58 56,58 59,47" />
            <polygon points="50,35 36,45 41,62 59,62 64,45" />
            <polygon points="50,30 31,43 38,66 62,66 69,43" />
            <polygon points="50,25 26,42 35,70 65,70 74,42" />
          </g>
        </g>
      </g>
      <g
        fill="#b4b4b4"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="3"
      >
        <AnimatedLabel x="50" y="15" name="Neutral" value={data.neutral} />
        <AnimatedLabel x="15" y="39" name="Sell" value={data.sell} />
        <AnimatedLabel x="29" y="80" name="Strong sell" value={data.strongSell} />
        <AnimatedLabel x="71" y="80" name="Strong buy" value={data.strongBuy} />
        <AnimatedLabel x="85" y="39" name="Buy" value={data.buy} />
      </g>
    </g>
  );
}

function Data({ data }: { data: ChartData }) {
  const animateRef = useRef<SVGElement>(null);
  const previousData = usePrevious(data);
  const id = useId();

  useEffect(() => {
    (animateRef.current as unknown as { beginElement?: () => void })?.beginElement?.();
  }, [data]);

  return (
    <g>
      <defs>
        <marker id={id} markerWidth="4" markerHeight="4" refX="2" refY="2">
          <circle cx="2" cy="2" r="2" fill="currentColor" />
        </marker>
      </defs>
      <polygon
        points={toPoints(data)}
        stroke="currentColor"
        strokeWidth="0.3"
        fill="#EAEC8A"
        fillOpacity="0.18"
        markerStart={`url(#${id})`}
        markerMid={`url(#${id})`}
      >
        <animate
          ref={animateRef}
          attributeName="points"
          from={toPoints(previousData)}
          to={toPoints(data)}
          dur="0.3s"
          fill="freeze"
          begin="indefinite"
          calcMode="spline"
          keyTimes="0; 1"
          keySplines="0.25 0.1 0.25 1"
        />
      </polygon>
    </g>
  );
}

const randomBetween = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export function FeyChartExhibit() {
  const [data, setData] = useState<ChartData>({
    neutral: 7,
    buy: 22,
    sell: 5,
    strongSell: 1,
    strongBuy: 13,
  });

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#111111] text-[#EAEC8A]">
      <svg viewBox="0 0 100 100" width="210">
        <Background data={data} />
        <Data data={data} />
      </svg>
      <button
        type="button"
        className="absolute bottom-4 rounded-full border border-[#313131] bg-[#222222] px-3 py-1 text-sm font-medium text-[#eeeeee] transition-colors duration-200 hover:bg-[#2a2a2a]"
        onClick={() =>
          setData({
            neutral: randomBetween(1, 30),
            buy: randomBetween(1, 30),
            sell: randomBetween(1, 30),
            strongSell: randomBetween(1, 30),
            strongBuy: randomBetween(1, 30),
          })
        }
      >
        Shuffle
      </button>
    </div>
  );
}

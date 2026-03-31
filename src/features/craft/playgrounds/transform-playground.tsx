// src/components/playgrounds/TransformPlayground.tsx
"use client";

import { useState } from "react";

import {
  Playground,
  PlaygroundCanvas,
  PlaygroundCode,
  PlaygroundControls,
  RangeControl,
  SelectControl,
} from "../playground";
import { cn } from "@/shared/lib/utils";
import { motion, useMotionValue } from "framer-motion";

type TransformOrigin = "center" | "left" | "right" | "top" | "bottom";

const MotionDiv = motion("div");

export function TransformPlayground() {
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [rotate, setRotate] = useState(0);
  const [scale, setScale] = useState(1);
  const [transformOrigin, setTransformOrigin] =
    useState<TransformOrigin>("center");

  // Motion values for direct slider tracking (no spring interpolation)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const mr = useMotionValue(0);
  const ms = useMotionValue(1);

  const handleTranslateX = (v: number) => { setTranslateX(v); mx.set(v); };
  const handleTranslateY = (v: number) => { setTranslateY(v); my.set(v); };
  const handleRotate = (v: number) => { setRotate(v); mr.set(v); };
  const handleScale = (v: number) => { setScale(v); ms.set(v); };

  // Generate code display
  const code = `transform: translate(${translateX}px, ${translateY}px) rotate(${rotate}deg) scale(${scale});
transform-origin: ${transformOrigin};`;

  return (
    <Playground
      title="CSS Transform Explorer"
      description="Hover on the element to see smooth transitions using custom easing functions."
    >
      <PlaygroundCanvas backgroundPattern="dots">
        <MotionDiv
          // @ts-expect-error - Framer Motion 11 + React 19 type compatibility issue
          className={cn("w-[120px] h-[120px]", "rounded bg-primary")}
          style={{
            transformOrigin,
            x: mx,
            y: my,
            rotate: mr,
            scale: ms,
          }}
        />
      </PlaygroundCanvas>

      <PlaygroundCode code={code} />

      <PlaygroundControls className="mt-6 space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <RangeControl
            label="Translate X"
            value={translateX}
            onChange={handleTranslateX}
            min={-200}
            max={200}
            unit="px"
          />

          <RangeControl
            label="Translate Y"
            value={translateY}
            onChange={handleTranslateY}
            min={-200}
            max={200}
            unit="px"
          />

          <RangeControl
            label="Rotate"
            value={rotate}
            onChange={handleRotate}
            min={0}
            max={360}
            unit="deg"
          />

          <RangeControl
            label="Scale"
            value={scale}
            onChange={handleScale}
            min={0.5}
            max={2}
            step={0.1}
          />
        </div>

        <SelectControl
          label="Transform Origin"
          value={transformOrigin}
          onChange={setTransformOrigin}
          options={[
            { label: "Center", value: "center" },
            { label: "Left", value: "left" },
            { label: "Right", value: "right" },
            { label: "Top", value: "top" },
            { label: "Bottom", value: "bottom" },
          ]}
        />
      </PlaygroundControls>
    </Playground>
  );
}

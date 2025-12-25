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
} from "@/components/playground";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type TransformOrigin = "center" | "left" | "right" | "top" | "bottom";

const MotionDiv = motion("div");

export function TransformPlayground() {
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [rotate, setRotate] = useState(0);
  const [scale, setScale] = useState(1);
  const [transformOrigin, setTransformOrigin] =
    useState<TransformOrigin>("center");

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
          className={cn(
            "w-[120px] h-[120px]",
            "bg-primary",
            transformOrigin === "center" && "rounded-full",
            transformOrigin !== "center" && "rounded-xl"
          )}
          style={{
            transformOrigin,
          }}
          animate={{
            x: translateX,
            y: translateY,
            rotate,
            scale,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
          whileHover={{
            scale: scale * 1.1,
          }}
        />
      </PlaygroundCanvas>

      <PlaygroundCode code={code} />

      <PlaygroundControls className="mt-6 space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <RangeControl
            label="Translate X"
            value={translateX}
            onChange={setTranslateX}
            min={-200}
            max={200}
            unit="px"
          />

          <RangeControl
            label="Translate Y"
            value={translateY}
            onChange={setTranslateY}
            min={-200}
            max={200}
            unit="px"
          />

          <RangeControl
            label="Rotate"
            value={rotate}
            onChange={setRotate}
            min={0}
            max={360}
            unit="deg"
          />

          <RangeControl
            label="Scale"
            value={scale}
            onChange={setScale}
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

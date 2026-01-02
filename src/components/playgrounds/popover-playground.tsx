// src/components/playgrounds/PopoverPlayground.tsx
"use client";

import { useState } from "react";

import {
  ButtonControl,
  Playground,
  PlaygroundCanvas,
  PlaygroundCode,
  PlaygroundControls,
  SelectControl,
} from "@/components/playground";
import { cn } from "@/lib/utils";

type TransformOrigin =
  | "top left"
  | "top center"
  | "top right"
  | "center"
  | "bottom left"
  | "bottom center"
  | "bottom right";

export function PopoverPlayground() {
  const [isOpen, setIsOpen] = useState(false);
  const [transformOrigin, setTransformOrigin] =
    useState<TransformOrigin>("top left");

  const code = `<div
  className="animate-[popoverIn_200ms_cubic-bezier(0.165,0.84,0.44,1)]"
  style={{
    transformOrigin: "${transformOrigin}",
  }}
>
  Popover content
</div>

@keyframes popoverIn {
  from {
    opacity: 0;
    scale: 0.95;
  }
  to {
    opacity: 1;
    scale: 1;
  }
}`;

  return (
    <Playground
      title="Popover Transform Origin Demo"
      description="Click the button and watch how the transform-origin affects the popover animation."
      allowOverflow
    >
      <PlaygroundCanvas backgroundPattern="dots" className="!overflow-visible">
        <div className="relative flex items-center justify-center min-h-[400px] py-8">
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded",
                "bg-primary text-primary-foreground",
                "transition-colors duration-200 hover:bg-primary/90",
                "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              )}
            >
              {isOpen ? "Close" : "Open"} Popover
            </button>
            {isOpen && (
              <div
                className={cn(
                  "absolute top-full left-1/2 z-50 mt-2 -translate-x-1/2",
                  "p-4 w-64 rounded shadow-lg",
                  "border bg-popover border-border text-popover-foreground",
                  "animate-[popoverIn_200ms_cubic-bezier(0.165,0.84,0.44,1)]"
                )}
                style={{
                  transformOrigin,
                }}
              >
                <h4 className="mb-2 font-semibold">Popover Content</h4>
                <p className="text-sm text-muted-foreground">
                  Notice how the animation feels different based on the
                  transform origin. The popover appears to "grow" from the
                  anchor point.
                </p>
              </div>
            )}
          </div>
        </div>
      </PlaygroundCanvas>

      <PlaygroundCode code={code} />

      <PlaygroundControls className="mt-6 space-y-4">
        <SelectControl
          label="Transform Origin"
          value={transformOrigin}
          onChange={setTransformOrigin}
          options={[
            { label: "Top Left", value: "top left" },
            { label: "Top Center", value: "top center" },
            { label: "Top Right", value: "top right" },
            { label: "Center", value: "center" },
            { label: "Bottom Left", value: "bottom left" },
            { label: "Bottom Center", value: "bottom center" },
            { label: "Bottom Right", value: "bottom right" },
          ]}
        />

        <ButtonControl
          label={isOpen ? "Close Popover" : "Open Popover"}
          onClick={() => setIsOpen(!isOpen)}
          variant="primary"
        />
      </PlaygroundControls>
    </Playground>
  );
}

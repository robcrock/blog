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
import { AnimatePresence, motion } from "framer-motion";

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

  const code = `<motion.div
  style={{
    transformOrigin: "${transformOrigin}",
  }}
  initial={{ scale: 0, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  exit={{ scale: 0, opacity: 0 }}
  transition={{ 
    type: "spring",
    stiffness: 500,
    damping: 30 
  }}
>
  Popover content
</motion.div>`;

  return (
    <Playground
      title="Popover Transform Origin Demo"
      description="Click the button and watch how the transform-origin affects the popover animation."
    >
      <PlaygroundCanvas backgroundPattern="dots" className="!overflow-visible">
        <div className="relative flex items-center justify-center min-h-[400px] py-8">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "px-4 py-2 rounded-md font-medium text-sm",
              "bg-primary text-primary-foreground",
              "hover:bg-primary/90 transition-colors duration-200",
              "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            )}
          >
            {isOpen ? "Close" : "Open"} Popover
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                className={cn(
                  "absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50",
                  "w-64 p-4 rounded-lg shadow-lg",
                  "bg-popover border border-border",
                  "text-popover-foreground"
                )}
                style={{
                  transformOrigin,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                }}
              >
                <h4 className="mb-2 font-semibold">Popover Content</h4>
                <p className="text-sm text-muted-foreground">
                  Notice how the animation feels different based on the
                  transform origin. The popover appears to "grow" from the
                  anchor point.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
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

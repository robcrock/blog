// src/components/playgrounds/ToastPlayground.tsx
"use client";

import { useState } from "react";

import {
  ButtonControl,
  Playground,
  PlaygroundCanvas,
  PlaygroundControls,
  SelectControl,
} from "@/components/playground";
import { toast } from "sonner"; // You'll need to install this: pnpm add sonner

type ToastType = "success" | "error" | "info";

export function ToastPlayground() {
  const [toastType, setToastType] = useState<ToastType>("success");

  const showToast = () => {
    const messages = {
      success: "Operation completed successfully!",
      error: "Something went wrong!",
      info: "Here's some information",
    };

    toast[toastType](messages[toastType]);
  };

  return (
    <Playground
      title="Toast Notification Demo"
      description="Trigger toast notifications with different styles."
    >
      <PlaygroundCanvas>
        <p className="text-muted-foreground">
          Click the button below to trigger a toast notification
        </p>
      </PlaygroundCanvas>

      <PlaygroundControls className="mt-6 space-y-4">
        <SelectControl
          label="Toast Type"
          value={toastType}
          onChange={setToastType}
          options={[
            { label: "Success", value: "success" },
            { label: "Error", value: "error" },
            { label: "Info", value: "info" },
          ]}
        />

        <ButtonControl
          label="Show Toast"
          onClick={showToast}
          variant="primary"
        />
      </PlaygroundControls>
    </Playground>
  );
}

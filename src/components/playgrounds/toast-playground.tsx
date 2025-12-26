// src/components/playgrounds/ToastPlayground.tsx
"use client";

import { useEffect, useRef, useState } from "react";

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
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const runId = "pre-fix";
    const timestamp = Date.now();

    const sendLog = (payload: {
      hypothesisId: string;
      location: string;
      message: string;
      data?: Record<string, unknown>;
    }) => {
      // #region agent log
      fetch(
        "http://127.0.0.1:7242/ingest/36686942-b0bc-4299-89d5-d245ae30372d",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId: "debug-session",
            runId,
            timestamp,
            ...payload,
          }),
        }
      ).catch(() => {});
      // #endregion
    };

    const html = document.documentElement;
    sendLog({
      hypothesisId: "H1",
      location: "toast-playground.tsx:html",
      message: "HTML font classes and computed font",
      data: {
        className: html.className,
        fontFamily: getComputedStyle(html).fontFamily,
      },
    });

    sendLog({
      hypothesisId: "H1",
      location: "toast-playground.tsx:body",
      message: "Body classes and computed font",
      data: {
        className: document.body.className,
        fontFamily: getComputedStyle(document.body).fontFamily,
      },
    });

    const root = rootRef.current;
    if (root) {
      sendLog({
        hypothesisId: "H2",
        location: "toast-playground.tsx:root",
        message: "Toast playground root font and parent info",
        data: {
          fontFamily: getComputedStyle(root).fontFamily,
          parentClasses: root.parentElement?.className ?? null,
        },
      });

      const proseAncestor = root.closest(".prose");
      sendLog({
        hypothesisId: "H3",
        location: "toast-playground.tsx:prose",
        message: "Whether rendered inside typography prose container",
        data: { hasProseAncestor: Boolean(proseAncestor) },
      });
    }
  }, []);

  const showToast = () => {
    const messages = {
      success: "Operation completed successfully!",
      error: "Something went wrong!",
      info: "Here's some information",
    };

    toast[toastType](messages[toastType]);
  };

  return (
    <div ref={rootRef} data-playground="toast">
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
    </div>
  );
}

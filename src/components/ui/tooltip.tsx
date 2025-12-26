"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";

interface TooltipProps {
  children: React.ReactElement;
  content: string;
  side?: "top" | "bottom" | "left" | "right";
  sideOffset?: number;
  className?: string;
}

export function Tooltip({
  children,
  content,
  side = "top",
  sideOffset = 8,
  className,
}: TooltipProps) {
  return (
    <BaseTooltip.Root>
      <BaseTooltip.Trigger
        render={(props) => {
          // Merge the tooltip props with the child's existing props
          // This ensures onClick and other handlers are preserved
          type ChildProps = Partial<
            Pick<
              React.DOMAttributes<Element>,
              "onClick" | "onMouseEnter" | "onMouseLeave" | "onFocus" | "onBlur"
            >
          >;
          const childProps = (children.props || {}) as ChildProps;
          const mergedProps = {
            ...props,
            ...childProps,
            // Merge event handlers properly
            onClick: (e: React.MouseEvent) => {
              props.onClick?.(e);
              childProps.onClick?.(e);
            },
            onMouseEnter: (e: React.MouseEvent) => {
              props.onMouseEnter?.(e);
              childProps.onMouseEnter?.(e);
            },
            onMouseLeave: (e: React.MouseEvent) => {
              props.onMouseLeave?.(e);
              childProps.onMouseLeave?.(e);
            },
            onFocus: (e: React.FocusEvent) => {
              props.onFocus?.(e);
              childProps.onFocus?.(e);
            },
            onBlur: (e: React.FocusEvent) => {
              props.onBlur?.(e);
              childProps.onBlur?.(e);
            },
          };
          return React.cloneElement(children, mergedProps);
        }}
      />
      <BaseTooltip.Portal>
        <BaseTooltip.Positioner side={side} sideOffset={sideOffset}>
          <BaseTooltip.Popup
            className={cn(
              "overflow-hidden z-50 px-3 py-2 text-sm rounded border shadow-xl border-neutral-800 bg-neutral-900 text-neutral-100",
              "backdrop-blur-sm",
              "data-[starting-style]:animate-in data-[starting-style]:fade-in-0 data-[starting-style]:zoom-in-95",
              "data-[ending-style]:animate-out data-[ending-style]:fade-out-0 data-[ending-style]:zoom-out-95",
              className
            )}
          >
            {content}
          </BaseTooltip.Popup>
        </BaseTooltip.Positioner>
      </BaseTooltip.Portal>
    </BaseTooltip.Root>
  );
}

export { BaseTooltip };

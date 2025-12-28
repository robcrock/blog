import * as React from "react";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 ring-offset-1 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90 focus-visible:ring-primary",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 focus-visible:ring-destructive",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground focus-visible:ring-primary",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 focus-visible:ring-primary",
        ghost:
          "text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-primary",
        link: "text-primary underline-offset-4 hover:underline focus-visible:ring-primary",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-10 px-8 text-base",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  render?: React.ReactElement;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, render, children, tabIndex, ...props }, ref) => {
    const buttonClassName = cn(buttonVariants({ variant, size, className }));

    if (render) {
      return React.cloneElement(render, {
        ...props,
        className: cn(buttonClassName, (render.props as any).className),
        ref,
        children: children || (render.props as any).children,
        // Ensure the element is focusable - Links should have tabIndex 0 by default
        // but we explicitly set it to ensure proper tab order
        tabIndex: tabIndex !== undefined ? tabIndex : 0,
      } as any);
    }

    return (
      <button
        className={buttonClassName}
        ref={ref}
        tabIndex={tabIndex}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

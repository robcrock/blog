// src/components/playgrounds/playgrounds.stories.tsx
import React from "react";

import type { Meta, StoryObj } from "@storybook/react";
import { Toaster } from "sonner";

import { PopoverPlayground, ToastPlayground, TransformPlayground } from "./";

/**
 * # Interactive Playgrounds
 *
 * A collection of interactive playground components that demonstrate various UI concepts
 * and animations. These playgrounds are designed to be embedded in blog posts and documentation
 * to provide hands-on learning experiences.
 *
 * ## Features
 *
 * - **Interactive Controls**: Real-time manipulation of component properties
 * - **Live Code Display**: See the CSS/JavaScript behind the scenes
 * - **Responsive Design**: Works beautifully on all screen sizes
 * - **Accessible**: Built with accessibility in mind
 * - **Composable**: Built from reusable playground components
 *
 * ## Architecture
 *
 * Each playground is composed of:
 * - `Playground`: Main container with title and description
 * - `PlaygroundCanvas`: Visual demonstration area with optional background patterns
 * - `PlaygroundControls`: Container for interactive controls
 * - `PlaygroundCode`: Code snippet display
 * - Control components: `RangeControl`, `SelectControl`, `ButtonControl`
 */
const meta = {
  title: "Playgrounds/Overview",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Interactive playground components for demonstrating UI concepts with live controls and code examples.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * ## Transform Playground
 *
 * An interactive CSS transform explorer that demonstrates:
 * - Translation (X and Y axes)
 * - Rotation
 * - Scaling
 * - Transform origin manipulation
 *
 * Features smooth spring animations using Framer Motion and responds to hover interactions.
 */
export const Transform: Story = {
  render: () => <TransformPlayground />,
  parameters: {
    docs: {
      description: {
        story:
          "Explore CSS transforms with real-time controls. Adjust translation, rotation, scale, and transform origin to see how they affect the element. Hover over the element to see smooth spring animations in action.",
      },
    },
  },
};

/**
 * ## Toast Playground
 *
 * Demonstrates toast notification patterns with different variants:
 * - Success notifications
 * - Error notifications
 * - Info notifications
 *
 * Built using the Sonner library for beautiful, accessible toast notifications.
 */
export const Toast: Story = {
  render: () => (
    <>
      <ToastPlayground />
      <Toaster />
    </>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Test different toast notification styles. Select a toast type and click the button to see it in action. Toasts appear with smooth animations and are automatically dismissed.",
      },
    },
  },
};

/**
 * ## Popover Playground
 *
 * Demonstrates how transform-origin affects popover animations:
 * - Different origin points (top left, center, bottom right, etc.)
 * - Spring-based scale animations
 * - Origin-aware animations for natural feel
 *
 * Shows best practices for origin-aware animations where the popover appears
 * to "grow" from the trigger element.
 */
export const Popover: Story = {
  render: () => <PopoverPlayground />,
  parameters: {
    docs: {
      description: {
        story:
          "Explore how transform-origin affects popover animations. Change the origin point to see how the popover appears to grow from different positions. This demonstrates the importance of origin-aware animations for creating natural, polished UI interactions.",
      },
    },
  },
};

/**
 * ## All Playgrounds
 *
 * View all available playgrounds in a single story. This is useful for:
 * - Getting an overview of all playground types
 * - Testing interactions between multiple playgrounds
 * - Visual regression testing
 */
export const AllPlaygrounds: Story = {
  render: () => (
    <div className="space-y-8">
      <TransformPlayground />
      <ToastPlayground />
      <PopoverPlayground />
      <Toaster />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "A comprehensive view of all available playground components. Each playground is fully interactive and demonstrates different UI concepts.",
      },
    },
  },
};

/**
 * ## Playground Components
 *
 * The playground system is built from composable components that can be used
 * to create custom interactive demonstrations.
 *
 * ### Available Components
 *
 * #### Core Components
 * - `Playground` - Main container with optional title and description
 * - `PlaygroundCanvas` - Visual demonstration area with background pattern options
 * - `PlaygroundControls` - Container for control elements
 * - `PlaygroundCode` - Code snippet display with syntax highlighting
 *
 * #### Control Components
 * - `RangeControl` - Slider input with label and value display
 * - `SelectControl` - Dropdown select with type-safe options
 * - `ButtonControl` - Action button with primary/secondary variants
 *
 * ### Usage Example
 *
 * ```tsx
 * import {
 *   Playground,
 *   PlaygroundCanvas,
 *   PlaygroundControls,
 *   PlaygroundCode,
 *   RangeControl,
 *   SelectControl,
 * } from "@/components/playground";
 *
 * export function MyPlayground() {
 *   const [value, setValue] = useState(50);
 *   const [option, setOption] = useState("a");
 *
 *   return (
 *     <Playground
 *       title="My Interactive Demo"
 *       description="Explore this concept with live controls"
 *     >
 *       <PlaygroundCanvas backgroundPattern="dots">
 *         <div style={{ transform: `scale(${value / 50})` }}>
 *           Content here
 *         </div>
 *       </PlaygroundCanvas>
 *
 *       <PlaygroundCode
 *         code={`transform: scale(${value / 50});`}
 *         language="css"
 *       />
 *
 *       <PlaygroundControls>
 *         <RangeControl
 *           label="Scale"
 *           value={value}
 *           onChange={setValue}
 *           min={0}
 *           max={100}
 *         />
 *         <SelectControl
 *           label="Option"
 *           value={option}
 *           onChange={setOption}
 *           options={[
 *             { label: "Option A", value: "a" },
 *             { label: "Option B", value: "b" },
 *           ]}
 *         />
 *       </PlaygroundControls>
 *     </Playground>
 *   );
 * }
 * ```
 *
 * ### Design Principles
 *
 * 1. **Composability**: Each component has a single responsibility
 * 2. **Flexibility**: Components accept className props for customization
 * 3. **Accessibility**: Built with semantic HTML and ARIA attributes
 * 4. **Performance**: Optimized animations using transform and opacity
 * 5. **Consistency**: Follows the design system's spacing and color tokens
 */
export const ComponentDocumentation: Story = {
  render: () => (
    <div className="p-8 max-w-none prose dark:prose-invert">
      <p className="text-lg">
        See the documentation above for detailed information about the
        playground component system and how to create your own interactive
        demonstrations.
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The playground system provides a flexible, composable architecture for creating interactive demonstrations. See the documentation above for usage examples and best practices.",
      },
    },
  },
};

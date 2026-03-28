// src/components/playgrounds/popover-playground.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";

import { PopoverPlayground } from "./";

const meta = {
  title: "Playgrounds/PopoverPlayground",
  component: PopoverPlayground,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Interactive playground demonstrating popover animations with transform-origin. Shows how different transform origins affect the animation's appearance and feel.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PopoverPlayground>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

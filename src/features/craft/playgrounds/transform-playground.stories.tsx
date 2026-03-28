// src/components/playgrounds/TransformPlayground.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";

import { TransformPlayground } from "./";

const meta = {
  title: "Playgrounds/TransformPlayground",
  component: TransformPlayground,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Interactive playground for demonstrating CSS transforms with live controls.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TransformPlayground>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

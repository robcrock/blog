import type { Meta, StoryObj } from "@storybook/react-vite";

import { SandpackEditor } from "./sandpack-editor";

const meta = {
  component: SandpackEditor,
} satisfies Meta<typeof SandpackEditor>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

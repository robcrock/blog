import type { Meta, StoryObj } from "@storybook/react-vite";
import { Logo } from "./Logo";

const meta = {
  title: "Brand/Logo",
  component: Logo,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { className: "text-foreground" },
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import { SectionHeader } from "./SectionHeader";

const meta = {
  title: "Layout/SectionHeader",
  component: SectionHeader,
  tags: ["autodocs"],
} satisfies Meta<typeof SectionHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: "LAB", href: "/lab", linkLabel: "view all" },
};

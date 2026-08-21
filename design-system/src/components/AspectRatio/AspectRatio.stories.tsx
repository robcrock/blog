import type { Meta, StoryObj } from "@storybook/react-vite";
import { AspectRatio } from "./AspectRatio";

const meta = {
  title: "Components/AspectRatio",
  component: AspectRatio,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof AspectRatio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Widescreen: Story = {
  render: () => (
    <AspectRatio ratio={16 / 9} className="w-[320px] overflow-hidden rounded bg-muted">
      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
        16:9
      </div>
    </AspectRatio>
  ),
};

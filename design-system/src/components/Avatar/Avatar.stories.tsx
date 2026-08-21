import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithImage: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
      <AvatarFallback>RC</AvatarFallback>
    </Avatar>
  ),
};

export const Fallback: Story = {
  render: () => (
    <Avatar>
      <AvatarFallback>RC</AvatarFallback>
    </Avatar>
  ),
};

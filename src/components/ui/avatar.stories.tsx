import React from "react";

import type { Meta, StoryObj } from "@storybook/react-vite";

import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

const meta = {
  title: "UI/Avatar",
  component: Avatar,
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="/images/avatar.png" alt="Robert Crocker" />
      <AvatarFallback>RC</AvatarFallback>
    </Avatar>
  ),
};

export const FallbackOnly: Story = {
  render: () => (
    <Avatar>
      <AvatarFallback>RC</AvatarFallback>
    </Avatar>
  ),
};

export const Large: Story = {
  render: () => (
    <Avatar className="w-[120px] h-[120px] border-2">
      <AvatarImage src="/images/avatar.png" alt="Robert Crocker" />
      <AvatarFallback>RC</AvatarFallback>
    </Avatar>
  ),
};

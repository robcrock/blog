import type { Meta, StoryObj } from "@storybook/react-vite";
import { Container } from "./Container";

const meta = {
  title: "Layout/Container",
  component: Container,
  tags: ["autodocs"],
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Container className="border border-dashed border-border p-6">
      <p className="text-sm text-muted-foreground">
        max-w-[80rem] page container
      </p>
    </Container>
  ),
};

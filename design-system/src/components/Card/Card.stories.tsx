import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./Card";
import { Button } from "../Button";

const meta = {
  title: "Components/Card",
  component: Card,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-[360px]">
      <CardHeader>
        <CardTitle>Card title</CardTitle>
        <CardDescription>Supporting description for the card.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Ported from the site shared UI kit.
        </p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  ),
};

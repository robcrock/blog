import React from "react";

import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";

const meta = {
  title: "UI/Card",
  component: Card,
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-[380px]">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Stay up to date with your latest notifications and updates from your
          team.
        </p>
      </CardContent>
      <CardFooter className="gap-2">
        <button className="px-4 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90">
          Mark all as read
        </button>
        <button className="px-4 py-2 text-sm font-medium rounded-md border border-input hover:bg-accent">
          Settings
        </button>
      </CardFooter>
    </Card>
  ),
};

export const WithImage: Story = {
  render: () => (
    <Card className="w-[350px] overflow-hidden">
      <div className="relative w-full h-48">
        <img
          src="/images/featured-projects/bookmark_landing_page.png"
          alt="Bookmark Landing Page"
          className="object-cover w-full h-full"
        />
      </div>
      <CardHeader>
        <CardTitle>Bookmark Landing Page</CardTitle>
        <CardDescription>Next.js • Tailwind • Shadcn</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          This challenge will really test your layout skills. There are also
          areas that will require some JavaScript.
        </p>
      </CardContent>
      <CardFooter>
        <a
          href="#"
          className="text-sm font-medium text-primary hover:underline"
        >
          View Project →
        </a>
      </CardFooter>
    </Card>
  ),
};

export const Simple: Story = {
  render: () => (
    <Card className="w-[300px]">
      <CardHeader>
        <CardTitle>Team Members</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex gap-2 items-center">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full" />
            <span className="text-sm">Sarah Johnson</span>
          </div>
          <div className="flex gap-2 items-center">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full" />
            <span className="text-sm">Mike Chen</span>
          </div>
          <div className="flex gap-2 items-center">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full" />
            <span className="text-sm">Emily Davis</span>
          </div>
        </div>
      </CardContent>
    </Card>
  ),
};

export const WithoutFooter: Story = {
  render: () => (
    <Card className="w-[380px]">
      <CardHeader>
        <CardTitle>Analytics Overview</CardTitle>
        <CardDescription>Your performance this month</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Page Views</span>
            <span className="text-2xl font-bold">12,543</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              Unique Visitors
            </span>
            <span className="text-2xl font-bold">8,291</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Bounce Rate</span>
            <span className="text-2xl font-bold">42%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  ),
};

import "./preview.css";
import type { Preview } from "@storybook/react-vite";
import React from "react";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: { disable: true },
  },
  globalTypes: {
    theme: {
      description: "Color theme",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "light",
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme ?? "light";
      return (
        <div
          className={theme === "dark" ? "dark" : undefined}
          data-theme={theme}
          style={{
            minHeight: "100%",
            padding: "1.5rem",
            background: "hsl(var(--background))",
            color: "hsl(var(--foreground))",
          }}
        >
          <Story />
        </div>
      );
    },
  ],
};

export default preview;

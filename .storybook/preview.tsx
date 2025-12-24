import type { Preview } from "@storybook/react";
import { ThemeProvider } from "../src/components/theme/theme-provider";
import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "centered",
    backgrounds: {
      options: {
        light: {
          name: "light",
          value: "#ffffff",
        },

        dark: {
          name: "dark",
          value: "#0f172a",
        }
      }
    },
  },

  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],

  initialGlobals: {
    backgrounds: {
      value: "light"
    }
  }
};

export default preview;

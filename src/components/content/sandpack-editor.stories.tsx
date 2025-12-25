import type { Meta, StoryObj } from "@storybook/react-vite";

import { SandpackEditor } from "./sandpack-editor";

const meta = {
  title: "Content/SandpackEditor",
  component: SandpackEditor,
} satisfies Meta<typeof SandpackEditor>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithCustomCSS: Story = {
  args: {
    files: {
      "/App.tsx": {
        code: `export default function App() {
  return (
    <div>
      <h1>Hello World</h1>
      <p>This uses custom global CSS with dark theme variables</p>
    </div>
  );
}`,
      },
      "/styles.css": {
        code: `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  color-scheme: dark;
  --gray1: #111111;
  --gray2: #191919;
  --gray3: #222222;
  --gray4: #2a2a2a;
  --gray5: #313131;
  --gray6: #3a3a3a;
  --gray7: #484848;
  --gray8: #606060;
  --gray9: #6e6e6e;
  --gray10: #7b7b7b;
  --gray11: #b4b4b4;
  --gray12: #eeeeee;
  --blue9: #0090ff;
}

body {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gray1);
  font-family: system-ui, sans-serif;
}`,
      },
      "/index.tsx": {
        code: `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import App from "./App";

const root = createRoot(document.getElementById("root")!);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);`,
      },
    },
  },
};

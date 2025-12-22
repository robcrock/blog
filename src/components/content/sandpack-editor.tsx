"use client";

import {
  Sandpack,
  SandpackFiles,
  SandpackProps,
} from "@codesandbox/sandpack-react";

// Preset configurations for common use cases
const PRESETS = {
  "react-counter": {
    "/App.js": `import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Counter: {count}</h1>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
    </div>
  );
}`,
  },
  "react-form": {
    "/App.js": `import { useState } from 'react';

export default function Form() {
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ padding: '20px' }}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
        <button type="submit">Submit</button>
      </form>
      {submitted && <p>Hello, {name}!</p>}
    </div>
  );
}`,
  },
  "vanilla-hello": {
    "/index.js": `document.getElementById('app').innerHTML = \`
  <h1>Hello Vanilla!</h1>
  <p>Edit the code to see changes</p>
\`;`,
    "/index.html": `<!DOCTYPE html>
<html>
<head><title>App</title></head>
<body>
  <div id="app"></div>
  <script src="index.js"></script>
</body>
</html>`,
  },
};

interface SandpackEditorProps {
  files?: SandpackFiles;
  template?: SandpackProps["template"];
  preset?: keyof typeof PRESETS;
  customSetup?: SandpackProps["customSetup"];
  options?: SandpackProps["options"];
  theme?: "dark" | "light" | "auto";
  showConsole?: boolean;
  showNavigator?: boolean;
  height?: number | string;
}

export function SandpackEditor({
  files,
  template = "react",
  preset,
  customSetup,
  options = {},
  theme = "dark",
  showConsole = false,
  showNavigator = false,
  height = 400,
}: SandpackEditorProps) {
  // Use preset files if provided, otherwise use custom files
  const sandpackFiles = preset ? PRESETS[preset] : files;

  const defaultOptions: SandpackProps["options"] = {
    showNavigator,
    showTabs: true,
    showLineNumbers: true,
    showConsole,
    editorHeight: height,
    ...options,
  };

  return (
    <div className="overflow-hidden my-8 rounded-lg border border-gray-200 shadow-lg dark:border-gray-700">
      <Sandpack
        theme={theme}
        template={template}
        files={sandpackFiles}
        customSetup={customSetup}
        options={defaultOptions}
      />
    </div>
  );
}

// Export presets for documentation
export { PRESETS };

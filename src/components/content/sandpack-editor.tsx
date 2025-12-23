"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { BaseTooltip, Tooltip } from "@/components/ui/tooltip";
import {
  SandpackCodeEditor,
  SandpackConsole,
  SandpackFiles,
  SandpackLayout,
  SandpackPreview,
  SandpackProps,
  SandpackProvider,
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
  showTabs?: boolean;
  closableTabs?: boolean;
}

function SandpackToolbar({
  onReset,
  containerRef,
  isConsoleOpen,
  onToggleConsole,
}: {
  onReset: () => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
  isConsoleOpen: boolean;
  onToggleConsole: () => void;
}) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const handleRefresh = () => {
    const iframe = document.querySelector(
      'iframe[title="Sandpack Preview"]'
    ) as HTMLIFrameElement;
    if (iframe) {
      iframe.src = iframe.src;
    }
  };

  const handleFullscreen = async () => {
    if (!containerRef.current) return;

    try {
      if (!isFullscreen) {
        await containerRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error("Fullscreen error:", error);
    }
  };

  const iconButtonClasses =
    "rounded p-1.5 text-gray-500 dark:text-gray-400 opacity-70 transition-colors hover:opacity-100 hover:text-gray-900 dark:hover:text-gray-50 hover:bg-gray-200 dark:hover:bg-gray-800 focus-visible:outline focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-400 dark:focus-visible:ring-gray-500";

  return (
    <div className="flex justify-between items-center px-4 py-2 bg-gray-50 border-b border-gray-200 dark:border-gray-700 dark:bg-gray-900">
      <div className="flex gap-2 items-center">Code Sandbox</div>
      <div className="flex gap-1 items-center">
        <Tooltip content="Reset code">
          <button
            onClick={onReset}
            className={iconButtonClasses}
            aria-label="Reset code"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-4"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M18.0618 4.13538C18.8928 3.58721 20 4.18326 20 5.17884V18.8213C20 19.8169 18.8928 20.413 18.0618 19.8648L7.71987 13.0436C6.97086 12.5495 6.97086 11.4507 7.71987 10.9566L18.0618 4.13538Z"
                fill="currentColor"
              ></path>
              <path
                d="M4 4.75009C4 4.33588 4.33579 4.00009 4.75 4.00009C5.16421 4.00009 5.5 4.33588 5.5 4.75009V19.2501C5.5 19.6643 5.16421 20.0001 4.75 20.0001C4.33579 20.0001 4 19.6643 4 19.2501V4.75009Z"
                fill="currentColor"
              ></path>
            </svg>
          </button>
        </Tooltip>
        <Tooltip content={isConsoleOpen ? "Hide terminal" : "Show terminal"}>
          <button
            onClick={onToggleConsole}
            className={iconButtonClasses}
            aria-label={isConsoleOpen ? "Hide terminal" : "Show terminal"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="4 17 10 11 4 5"></polyline>
              <line x1="12" y1="19" x2="20" y2="19"></line>
            </svg>
          </button>
        </Tooltip>
        <Tooltip
          content={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          <button
            onClick={handleFullscreen}
            className={iconButtonClasses}
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            <svg
              className="size-4"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.75 4.5C4.61193 4.5 4.5 4.61193 4.5 4.75V8C4.5 8.41421 4.16421 8.75 3.75 8.75C3.33579 8.75 3 8.41421 3 8V4.75C3 3.7835 3.7835 3 4.75 3H8C8.41421 3 8.75 3.33579 8.75 3.75C8.75 4.16421 8.41421 4.5 8 4.5H4.75Z"
                fill="currentColor"
              ></path>
              <path
                d="M15.25 3.75C15.25 3.33579 15.5858 3 16 3H19.25C20.2165 3 21 3.7835 21 4.75V8C21 8.41421 20.6642 8.75 20.25 8.75C19.8358 8.75 19.5 8.41421 19.5 8V4.75C19.5 4.61193 19.3881 4.5 19.25 4.5H16C15.5858 4.5 15.25 4.16421 15.25 3.75Z"
                fill="currentColor"
              ></path>
              <path
                d="M3.75 15.25C4.16421 15.25 4.5 15.5858 4.5 16V19.25C4.5 19.3881 4.61193 19.5 4.75 19.5H8C8.41421 19.5 8.75 19.8358 8.75 20.25C8.75 20.6642 8.41421 21 8 21H4.75C3.7835 21 3 20.2165 3 19.25V16C3 15.5858 3.33579 15.25 3.75 15.25Z"
                fill="currentColor"
              ></path>
              <path
                d="M20.25 15.25C20.6642 15.25 21 15.5858 21 16V19.25C21 20.2165 20.2165 21 19.25 21H16C15.5858 21 15.25 20.6642 15.25 20.25C15.25 19.8358 15.5858 19.5 16 19.5H19.25C19.3881 19.5 19.5 19.3881 19.5 19.25V16C19.5 15.5858 19.8358 15.25 20.25 15.25Z"
                fill="currentColor"
              ></path>
            </svg>
          </button>
        </Tooltip>
      </div>
    </div>
  );
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
  showTabs = true,
  closableTabs = false,
}: SandpackEditorProps) {
  // Use preset files if provided, otherwise use custom files
  const initialFiles = useMemo(
    () => (preset ? PRESETS[preset] : files) ?? {},
    [preset, files]
  );
  const [sandpackFiles, setSandpackFiles] =
    useState<SandpackFiles>(initialFiles);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isConsoleOpen, setIsConsoleOpen] = useState(showConsole);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    setSandpackFiles(initialFiles);
  }, [initialFiles]);

  useEffect(() => {
    setIsConsoleOpen(showConsole);
  }, [showConsole]);

  const handleReset = () => {
    setSandpackFiles({ ...initialFiles });
  };

  const defaultOptions: SandpackProps["options"] = {
    showNavigator,
    showTabs,
    showLineNumbers: true,
    showConsole: isConsoleOpen,
    editorHeight: isFullscreen ? "100%" : height,
    closableTabs,
    ...options,
    // Add custom classes so we can style fullscreen without !important
    classes: {
      ...(options.classes ?? {}),
      "sp-wrapper": "sp-wrapper-fullscreen",
      "sp-layout": "sp-layout-fullscreen",
      "sp-stack": "sp-stack-fullscreen",
      "sp-code-editor": "sp-code-editor-fullscreen",
      "sp-preview": "sp-preview-fullscreen",
      "sp-preview-iframe": "sp-preview-iframe-fullscreen",
    },
  };

  return (
    <BaseTooltip.Provider delay={200} closeDelay={0}>
      <div
        ref={containerRef}
        className={`overflow-hidden col-span-3 col-start-1 mx-auto my-8 w-full max-w-7xl rounded-lg border border-gray-200 shadow-lg sandpack-container dark:border-gray-700 ${
          isFullscreen ? "sandpack-fullscreen" : ""}`}
        style={
          isFullscreen
            ? {
                maxWidth: "100%",
                height: "100vh",
                margin: 0,
                borderRadius: 0,
                display: "flex",
                flexDirection: "column",
              }
            : undefined
        }
      >
        <SandpackProvider
          theme={theme}
          template={template}
          files={sandpackFiles}
          customSetup={customSetup}
          options={defaultOptions}
        >
          <SandpackToolbar
            onReset={handleReset}
            containerRef={containerRef}
            isConsoleOpen={isConsoleOpen}
            onToggleConsole={() => setIsConsoleOpen((prev) => !prev)}
          />
          <SandpackLayout
            style={isFullscreen ? { flex: 1, minHeight: 0 } : undefined}
          >
            <SandpackCodeEditor
              showTabs={showTabs}
              closableTabs={closableTabs}
              showLineNumbers={true}
              style={
                isFullscreen ? { height: "100%", minHeight: 0 } : undefined
              }
            />
            <SandpackPreview
              showRefreshButton={false}
              showOpenInCodeSandbox={false}
              style={
                isFullscreen ? { height: "100%", minHeight: 0 } : undefined
              }
            />
          </SandpackLayout>
          {isConsoleOpen ? (
            <div className="bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900">
              <SandpackConsole
                showHeader
                maxMessageCount={50}
                style={{
                  height: isFullscreen ? "30vh" : 220,
                  overflow: "auto",
                }}
              />
            </div>
          ) : null}
        </SandpackProvider>
      </div>
    </BaseTooltip.Provider>
  );
}

// Export presets for documentation
export { PRESETS };

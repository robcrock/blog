import { useState } from "react";

import { Preset, PRESETS } from "./presets";
import { SandpackEditor } from "./sandpack-editor";
import type { SandpackEditorProps } from "./sandpack-editor";

interface CodeExampleProps extends Omit<SandpackEditorProps, "preset"> {
  mode?: Preset;
  title?: string;
  showCodeToggle?: boolean;
}

export function CodeExample({
  mode = "interactive",
  title,
  showCodeToggle = true,
  files,
  template = "react-ts",
  theme = "dark",
  customSetup,
  options = {},
  ...restProps
}: CodeExampleProps) {
  const [showCode, setShowCode] = useState(mode === "interactive");
  const preset = PRESETS[mode];

  // Merge preset options with custom options and visibility toggle
  const mergedOptions = {
    ...preset.options,
    ...options,
    // For preview mode, control editor visibility
    ...(mode === "preview" && {
      editorWidthPercentage: showCode ? 50 : 0,
    }),
  };

  return (
    <div className="code-example">
      {/* Header with title and controls */}
      {(title || (mode === "preview" && showCodeToggle)) && (
        <div className="code-example-header">
          {title && <h4 className="code-example-title">{title}</h4>}

          <div className="code-example-badges">
            {/* Mode badge */}
            {mode === "interactive" && (
              <span className="badge badge-interactive">✏️ Interactive</span>
            )}
            {mode === "readonly" && (
              <span className="badge badge-readonly">📖 Read Only</span>
            )}

            {/* View Code toggle for preview mode */}
            {mode === "preview" && showCodeToggle && (
              <button
                onClick={() => setShowCode(!showCode)}
                className="view-code-btn"
              >
                {showCode ? "👁️ Hide Code" : "💻 View Code"}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Your existing SandpackEditor */}
      <SandpackEditor
        files={files}
        template={template}
        theme={theme}
        customSetup={customSetup}
        options={mergedOptions}
        showConsole={preset.showConsole}
        showNavigator={preset.showNavigator}
        showTabs={preset.showTabs}
        closableTabs={preset.closableTabs}
        height={preset.height}
        {...restProps}
      />
    </div>
  );
}

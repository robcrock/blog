"use client";

import { Sandpack, SandpackProps } from "@codesandbox/sandpack-react";
import { sandpackDark } from "@codesandbox/sandpack-themes";

interface SandpackEditorProps {
  files?: SandpackProps["files"];
  template?: SandpackProps["template"];
  customSetup?: SandpackProps["customSetup"];
  options?: SandpackProps["options"];
}

export function SandpackEditor({
  files,
  template = "react-ts",
  customSetup,
  options = {},
}: SandpackEditorProps) {
  return (
    <Sandpack
      theme={sandpackDark}
      template={template}
      files={files}
      customSetup={customSetup}
      options={{
        showTabs: true,
        ...options,
      }}
    />
  );
}

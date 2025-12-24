export const PRESETS = {
  interactive: {
    showConsole: false,
    showNavigator: false,
    showTabs: true,
    closableTabs: true,
    height: 400,
    options: {
      showLineNumbers: true,
      showInlineErrors: true,
    },
  },

  preview: {
    showConsole: false,
    showNavigator: false,
    showTabs: false,
    closableTabs: false,
    height: 350,
    options: {
      showLineNumbers: false,
      showInlineErrors: false,
      editorWidthPercentage: 0, // Hide editor by default
    },
  },

  readonly: {
    showConsole: false,
    showNavigator: false,
    showTabs: true,
    closableTabs: false,
    height: 350,
    options: {
      showLineNumbers: true,
      showInlineErrors: false,
      readOnly: true,
    },
  },

  compact: {
    showConsole: false,
    showNavigator: false,
    showTabs: false,
    closableTabs: false,
    height: 250,
    options: {
      showLineNumbers: false,
      editorWidthPercentage: 0,
    },
  },
} as const;

export type Preset = keyof typeof PRESETS;

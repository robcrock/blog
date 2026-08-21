import tailwindcss from "@tailwindcss/vite";
import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@storybook/addon-a11y", "@storybook/addon-docs"],
  framework: "@storybook/react-vite",
  async viteFinal(viteConfig) {
    viteConfig.plugins = [...(viteConfig.plugins ?? []), tailwindcss()];
    viteConfig.esbuild = { ...viteConfig.esbuild, jsx: "automatic" };
    return viteConfig;
  },
};

export default config;

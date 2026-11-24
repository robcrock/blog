import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";
import storybook from "eslint-plugin-storybook";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  ...storybook.configs["flat/recommended"],
  prettier,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next.
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Generated and vendor output.
    ".contentlayer/**",
    "node_modules/**",
    "storybook-static/**",
    "public/**",
    "coverage/**",
    "**/*.tsbuildinfo",
    ".vercel/**",
    ".lab-shots/**",
    "codesandboxes/_extracted/**",
    "design-system/.extraction/**",
    "design-system/figma-desktop-bridge/**",
    "design-system/figma-import-plugin/**",
    // ESLint skips dot-directories by default; Storybook's plugin lints these.
    "!.storybook/**",
    "!design-system/.storybook/**",
  ]),
]);

export default eslintConfig;

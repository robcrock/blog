# @robcrock/design-system

Design system extracted from production application(s) using the
[figma-console-mcp](https://github.com/southleft/figma-console-mcp) design
system extraction workflow.

## Source applications

- `/Users/robcrock/Documents/Code/robcrock.com` (next, react; tailwind-v3, vanilla-css)

## What's here

- `tokens/` — design tokens. `tokens.json` is canonical DTCG (with per-token
  provenance in `$extensions`); the other files are generated projections
  (dtcg, css-vars, tailwind-v3). Import into Figma with `figma_import_tokens`.
- `src/components/` — components ported from the source apps (66 in
  the inventory; see `.extraction/analysis.json` for ranking and
  `.extraction/status.json` for progress).
- `src/docs/Tokens.mdx` — the token showcase (bird's-eye view in Storybook).

## Getting started

```bash
npm create storybook@latest   # auto-detects react, installs latest Storybook
```

Then import `tokens/index.css` (or `tokens/tokens.css`) in `.storybook/preview`
so every story renders with the extracted tokens.

## Workflow

This package is the source of truth for UI going forward:

1. **Code-led**: iterate on components here, version + publish this package,
   and consume it from the product apps.
2. **Design-led**: additionally sync `tokens/tokens.json` into Figma variables
   (`figma_import_tokens`) and rebuild key components as Figma component sets.

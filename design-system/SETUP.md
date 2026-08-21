# Figma Console MCP — setup for this extraction

## Cursor MCP

Merge [`mcp-cursor-snippet.json`](./mcp-cursor-snippet.json) into `~/.cursor/mcp.json` (or enable project MCP), then set:

```bash
export FIGMA_ACCESS_TOKEN=figd_YOUR_TOKEN
```

Restart Cursor. Confirm tools like `figma_ds_analyze` / `figma_import_tokens` appear.

## Desktop Bridge

1. Figma Desktop → Plugins → Development → Import plugin from manifest
2. Select [`figma-desktop-bridge/manifest.json`](./figma-desktop-bridge/manifest.json)
3. Open your “robcrock.com Design System” file and run **Figma Desktop Bridge**

## Extraction driver

Local Mode tools were run via:

```bash
node scripts/ds-extract/run-extraction.mjs analyze|tokens|scaffold|setup-storybook|verify
```

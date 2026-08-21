# Import tokens into Figma

Verification passed. Tokens are ready at `tokens/tokens.json`.

## Option A — One-shot import plugin (works now)

1. In Figma Desktop, create or open **robcrock.com Design System**
2. **Plugins → Development → Import plugin from manifest…**
3. Select [`figma-import-plugin/manifest.json`](./figma-import-plugin/manifest.json)
4. Run **robcrock.com DS Token Import**

Creates **Primitives** and **Semantic** collections with **Light** / **Dark** modes.

## Option B — Figma Console MCP (ongoing sync)

1. Merge [`mcp-cursor-snippet.json`](./mcp-cursor-snippet.json) into `~/.cursor/mcp.json`
2. Set `FIGMA_ACCESS_TOKEN` and restart Cursor
3. Import Desktop Bridge from [`figma-desktop-bridge/manifest.json`](./figma-desktop-bridge/manifest.json) and run it in the file
4. Ask the agent:

```
figma_import_tokens({
  files: ["/Users/robcrock/Documents/Code/robcrock.com/design-system/tokens/tokens.json"],
  strategy: "merge",
  onConflict: "ask"
})
```

## Notes

- Brand primary exact hex: `#CB5142` / Dark `#E85545` (`semantic/brand/primary`)
- Mined shadcn HSL→hex may differ slightly (`#cb5343`) — prefer `brand/primary` for brand work
- Easing/typography recipe strings are skipped by the import plugin (not first-class Figma variable types)

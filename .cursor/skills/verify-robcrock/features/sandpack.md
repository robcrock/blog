# Sandpack embed

Sandpack embed lets a reader edit and preview a sample inside a post or craft page.

## Sub-features

- `sandpack-open` shows the editor on a published page.
- `sandpack-preview` shows the running preview inside that editor.

## How to get to it (user POV)

- Open a published post or craft page that contains the editor.
- No published MDX file currently contains that editor. There is no URL for this feature.

## Driving it with verify-robcrock

Preconditions:

- `doctor` prints `"ok": true`.
- A published page renders the Sandpack editor.

- **Open the editor.** Run `node .cursor/skills/verify-robcrock/verify-robcrock.mjs snapshot <route> --out .cursor/skills/verify-robcrock/artifacts/sandpack/editor.aria.yml` on the published route that contains the editor. The YAML contains the editor's file tabs and a preview frame.
- **Capture it.** Run `node .cursor/skills/verify-robcrock/verify-robcrock.mjs screenshot <route> --theme light --out .cursor/skills/verify-robcrock/artifacts/sandpack/light.png`. The PNG shows the editor and the preview.
- **Unmet precondition.** No published route renders the editor. Stop and report that. Do not mark the feature passed.

## Gotchas

- `SandpackEditor` is registered for MDX, and no file under `content/` uses it. The Storybook story `Content/SandpackEditor` is not the site.
- Lab pages load static sandbox HTML. That is a different reader path. Do not count a lab specimen as this embed.
- Do not invent a temporary MDX file to make the snapshot pass. The missing page is the result.

# robcrock.com verification map

This directory is the maintained source for verifying reader-facing behavior of robcrock.com. Read this index, then use the matching feature file as the recipe.

## Baseline preconditions

- Run commands from the repo root.
- Launch with `node .cursor/skills/verify-robcrock/verify-robcrock.mjs launch`.
- The server listens on `http://127.0.0.1:4173` unless launch was given another `--port`.
- Run `doctor` and require `"ok": true` before driving.
- Drive only the server recorded in `.cursor/skills/verify-robcrock/.run/state.json`.
- One checkout hosts one verification server. `.next` and `.contentlayer` are shared in the tree.

## Driving conventions

- Start every recipe from a healthy doctor result.
- Prefer accessible names and route paths.
- Treat every command as literal. Keep flags and quoted names unchanged.
- Run the CLI at `node .cursor/skills/verify-robcrock/verify-robcrock.mjs`.
- Write proof under `.cursor/skills/verify-robcrock/artifacts/<feature>/`.
- Teardown removes the server and `.run/`. It does not remove proof files.

## Proof and skip reporting

- Capture the reader action and the resulting state, not only a final picture.
- UI proof is an accessibility snapshot and a screenshot that shows the site name.
- Link and SEO proof is the `check-links` JSON, including failed fields.
- A `perf` number is one dev-server sample. It is not a pass bar.
- Record the feature file and the route with every artifact.
- Report an unreachable path with the command you ran and the unmet precondition.
- Do not report a skipped entry point as verified through a different path.

## Feature entry contract

Each feature file starts with an H1 and one paragraph. It then uses these four H2 sections in order.

1. `Sub-features`
2. `How to get to it (user POV)`
3. `Driving it with verify-robcrock`
4. `Gotchas`

Name a source file only to explain why a command fails.

## Features

- [Home](./home.md) covers the hero, lab link, craft links, and work link.
- [Posts index](./posts-index.md) covers the published post list.
- [MDX post](./mdx-post.md) covers a post with highlighted code and the copy button.
- [Sandpack embed](./sandpack.md) covers the in-post Sandpack editor. No published page renders it.
- [Theme toggle](./theme-toggle.md) covers light and dark. The toggle is not mounted.
- [SEO](./seo.md) covers the sitemap, metadata, Open Graph image, and RSS feed.

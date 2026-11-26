---
name: verify-robcrock
description: Drive the robcrock.com Next.js site in a local dev server with Playwright. Use to launch the site, check that the verification server is healthy, screenshot light or dark theme, capture an accessibility tree, toggle theme, resolve internal links plus sitemap.xml and RSS, or record a navigation trace. Use when proving home, posts, MDX, Sandpack, theme, or SEO behavior.
---

# Verify robcrock.com

Drive the local Next.js site the way a reader does. The CLI is `verify-robcrock.mjs`. Run it from the repo root. Every command except `--help` prints one JSON object on stdout and exits non-zero on failure.

```bash
node .cursor/skills/verify-robcrock/verify-robcrock.mjs --help
```

The feature map is [features/README.md](features/README.md). Open the feature file before driving that feature.

## Launch

Start the repo dev script on `127.0.0.1:4173`.

```bash
node .cursor/skills/verify-robcrock/verify-robcrock.mjs launch
```

That runs `contentlayer2 build && next dev --turbopack --port <port> --hostname 127.0.0.1` through `pnpm exec`. Those are the same programs as `pnpm dev`. Pass `--port` when 4173 is taken by a process this CLI did not start.

`pnpm dev -- --port` is the wrong invocation here. pnpm appends a literal `--`, and Next treats the following token as a project directory.

Ready means a reader can use the page. `GET /` returns 200 and the HTML contains `Robert Crocker`. A listening port is not enough. The wait is 180 seconds. Contentlayer runs before Next answers.

The pid, port, and url are written to `.cursor/skills/verify-robcrock/.run/state.json`. The server log is `.cursor/skills/verify-robcrock/.run/server.log`. Both are gitignored.

One checkout runs one verification server. Next writes `.next` and `.contentlayer` in the repo, so a second server in this same tree would share that state. If launch finds the recorded server healthy, it returns `action` `already-running` and does not start another. A second git checkout can run its own server on another port.

Launch sets `VERIFY_ROBCROCK=1` on the server process. Teardown uses that marker.

## Doctor

Read-only. Run this first whenever a later command looks wrong.

```bash
node .cursor/skills/verify-robcrock/verify-robcrock.mjs doctor
```

`ok` is true only when all of these hold.

- The state file exists and names a live pid.
- That pid's environment contains `VERIFY_ROBCROCK=1`.
- A process in that pid's tree is listening on the recorded port.
- `GET /` returns 200 and the body contains `Robert Crocker`.
- If the server log names a Next.js version, it matches `dependencies.next` in `package.json`.

Doctor does not start the server and does not attach to a `pnpm dev` you started yourself.

On Linux, doctor reads `/proc` to see the process marker, the process tree, and the listening socket. On other systems it uses `ps` and `lsof`. The proof run was Linux. The `ps` and `lsof` path has not been run.

## Drive

Prefer the accessible name `Toggle theme`, the route path, and the heading text. The viewport is 1280 by 800. Browser commands wait until every `svg circle` is fully opaque, or for 2 seconds. Pages with no such circles return at once.

Theme `light` is the theme a reader gets. `ThemeProvider` in `src/shared/theme/theme-provider.tsx` sets `forcedTheme` to `light`. Theme `dark` is reached only by clicking the button named `Toggle theme`. That button is `ThemeSwitcher`, and no page renders it. `screenshot --theme dark`, `snapshot --theme dark`, and `toggle-theme` exit non-zero and name that fact. They do not add the `dark` class from script.

```bash
node .cursor/skills/verify-robcrock/verify-robcrock.mjs screenshot / --theme light --out .cursor/skills/verify-robcrock/artifacts/home/light.png
node .cursor/skills/verify-robcrock/verify-robcrock.mjs snapshot / --out .cursor/skills/verify-robcrock/artifacts/home/home.aria.yml
node .cursor/skills/verify-robcrock/verify-robcrock.mjs toggle-theme
node .cursor/skills/verify-robcrock/verify-robcrock.mjs check-links
node .cursor/skills/verify-robcrock/verify-robcrock.mjs perf / --out .cursor/skills/verify-robcrock/artifacts/home/perf.json
```

`check-links` fetches same-origin links from the sitemap pages, every sitemap URL, the feed paths, and the home page `og:image` path. It rewrites `https://robcrock.com` to the local origin. It does not fetch LinkedIn, GitHub, X, or other external hosts. `src/app` has `sitemap.ts` and no feed route, so `rss.ok` is false until a feed exists. The command exits non-zero when any of links, sitemap, RSS, or metadata fails. Read each field. A missing feed does not mean the sitemap failed.

`perf` writes one Playwright trace zip and one navigation timing sample. The sample is a single dev-server navigation with no spread. Use it only as evidence that the command recorded a navigation.

## Evidence

Write proof under `.cursor/skills/verify-robcrock/artifacts/`. The directory is gitignored. Put each feature in its own folder.

A proof shows the reader action and the state after it.

- UI proof is a PNG screenshot and an accessibility snapshot. The snapshot is YAML from the page accessibility tree. The site name is visible in the screenshot.
- `check-links` proof is the JSON result. Keep `links`, `sitemap`, `rss`, and `metadata`.
- `perf` proof is the metrics JSON and the trace zip beside it.
- `toggle-theme` proof is the JSON `before` and `after` classes. When the button is absent, the failure JSON is the proof. A screenshot that merely looks dark is not a substitute.

Drive the pages in `src/app`. Do not call React setters, do not add `class="dark"` from the page, and do not use the Storybook story `Content/SandpackEditor` as proof of the site.

## Cleanup

```bash
node .cursor/skills/verify-robcrock/verify-robcrock.mjs teardown
```

Teardown sends `SIGTERM`, then `SIGKILL`, to the process group of the pid in the state file, and only if that process still has `VERIFY_ROBCROCK=1`. It does not kill by process name. It removes `.cursor/skills/verify-robcrock/.run/`. It leaves `.cursor/skills/verify-robcrock/artifacts/` in place.

If the pid was reused by an unrelated process, teardown exits non-zero and leaves the state file.

After a failed launch, run teardown before the next attempt when a pid is still recorded. A launch that never became ready already stops its own process and removes `.run/`.

## Helpers

```bash
node .cursor/skills/verify-robcrock/verify-robcrock.mjs --help
node .cursor/skills/verify-robcrock/verify-robcrock.mjs <command> --help
```

There is no `package.json` script. The node command is the interface.

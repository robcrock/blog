# Token review (human pass)

Applied after `figma_ds_extract_tokens` (via extraction driver).

## Decisions
- **Excluded** `codesandboxes/`, `public/lab/`, dialkit, Storybook from mining
- **Removed** bogus `opacity: 0` (from Tailwind keyframe mining)
- **Added** Geist Sans/Mono font family tokens
- **Added** `semantic.brand.primary` = `#C84837` / Dark `#E85545` (accessible light-theme brand red; dark mode remains unchanged)
- **Added** typography recipe aliases: hero, page-title, section-label, meta, body
- **Added** documented easings (ease-out-quad/cubic) + `duration.hover` 200ms
- **Dark mode**: full semantic palette retained for Figma Light/Dark modes; production site forces light via `ThemeProvider`

## Import note
EASING/TIMING string tokens may be skipped by `figma_import_tokens` (Plugin API limitation). Colors, dimensions, and fonts import cleanly.

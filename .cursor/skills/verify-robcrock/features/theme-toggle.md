# Theme toggle

Theme toggle switches the site between the light theme and the dark theme.

## Sub-features

- `theme-light` shows the light theme when the page opens.
- `theme-dark` switches to the dark theme from the toggle.
- `theme-return` switches back to light from dark.

## How to get to it (user POV)

- Open any page.
- Activate the button named Toggle theme in the header.

## Driving it with verify-robcrock

Preconditions:

- `doctor` prints `"ok": true`.
- The page shows a button named Toggle theme.
- The theme is not forced, so that button can change the html class.

- **Record light.** Run `node .cursor/skills/verify-robcrock/verify-robcrock.mjs screenshot / --theme light --out .cursor/skills/verify-robcrock/artifacts/theme/light.png`. The JSON `theme.theme` is `light` and `theme.via` is `already`. The PNG is the light page.
- **Switch to dark.** Run `node .cursor/skills/verify-robcrock/verify-robcrock.mjs toggle-theme --route /`. The JSON `before` and `after` values differ, and `after` is `dark`.
- **Capture dark.** Run `node .cursor/skills/verify-robcrock/verify-robcrock.mjs screenshot / --theme dark --out .cursor/skills/verify-robcrock/artifacts/theme/dark.png`. The JSON `theme.theme` is `dark` and `theme.via` is `toggle`.
- **Unmet precondition.** The button is not on the page. `toggle-theme` and `screenshot --theme dark` exit 1 and name the missing button. That failure is the result. Do not mark the feature passed.

## Gotchas

- `ThemeSwitcher` exists in `src/shared/theme/theme-switcher.tsx` and is not rendered. The button name would be Toggle theme, from its visually hidden text.
- `ThemeProvider` sets `forcedTheme` to `light`. A reader stays on light even if a later change mounts the button, until that force is removed.
- Dark CSS under the `.dark` class is present in `src/app/globals.css`. Adding that class from the browser console is not the reader path. The CLI refuses to do it.
- `screenshot --theme light` passes because the page is already light. That does not prove the toggle.

# Home

Home introduces Robert Crocker and links into the lab, craft, and work sections.

## Sub-features

- `home-identity` shows the name and the tagline in the hero.
- `home-lab` links to the lab index.
- `home-craft` links to each published craft page.
- `home-work` links to the projects index.

## How to get to it (user POV)

- Open `/`.
- On the home page, activate the logo. It scrolls to the top and stays on `/`.

## Driving it with verify-robcrock

Preconditions:

- `doctor` prints `"ok": true`.

- **Open the hero.** Go to `/` in the light theme. Run `node .cursor/skills/verify-robcrock/verify-robcrock.mjs screenshot / --theme light --out .cursor/skills/verify-robcrock/artifacts/home/light.png`. The PNG shows the heading Robert Crocker and the line Craft obsessed developer who designs.
- **Read the page.** Run `node .cursor/skills/verify-robcrock/verify-robcrock.mjs snapshot / --out .cursor/skills/verify-robcrock/artifacts/home/home.aria.yml`. The YAML contains `Robert Crocker`, `Craft obsessed developer who designs.`, a link whose url is `/lab`, and a link whose url is `/projects`.
- **Proof.** Keep both files. The screenshot is the hero a reader sees at the top of `/`. The snapshot is the named links.

## Gotchas

- The fixed header stays off screen while `#hero-section` is in view. A viewport screenshot shows the hero heading. The accessibility tree can still include the header, so Robert Crocker can appear twice.
- The logo link on `/` does not navigate. Assert the hero text, not a route change.
- Social links in the hero leave the site. `check-links` does not request them.
- The hero dot grid starts with hidden circles and fades in over about 1.4 seconds. Browser commands wait until those circles are fully opaque, or for 2 seconds. A shot taken before that wait shows an empty left column.
- `next dev` draws its own badge in the corner of development screenshots. That badge is not part of the site.

# SEO

The sitemap, the home page metadata, the Open Graph image, and the RSS feed are how a crawler learns the site.

## Sub-features

- `seo-sitemap` lists the public routes.
- `seo-metadata` exposes the home title and Open Graph title.
- `seo-og-image` serves the image named by that metadata.
- `seo-rss` serves an RSS or Atom feed.

## How to get to it (user POV)

- Open `/sitemap.xml`.
- Open `/` and view the page title and the social preview image.
- Open the feed linked from the page, or the conventional feed path.

## Driving it with verify-robcrock

Preconditions:

- `doctor` prints `"ok": true`.

- **Resolve discovery files.** Run `node .cursor/skills/verify-robcrock/verify-robcrock.mjs check-links > .cursor/skills/verify-robcrock/artifacts/seo/check-links.json`. The JSON `sitemap.ok` is true, and `sitemap.paths` includes `/`, `/posts`, and `/posts/hiding-scrollbars-in-tailwind`.
- **Resolve metadata.** In that same JSON, `metadata.ok` is true, `metadata.title` contains Robert Crocker, and `metadata.ogImageStatus` is 200 with an image content type.
- **Resolve the feed.** In that same JSON, `rss.ok` is true and `rss.resolved` is the feed URL that returned RSS or Atom XML. On this checkout the feed step fails. See Gotchas.
- **Proof.** Keep `artifacts/seo/check-links.json`. A passing feature has `"ok": true` for the command and for `rss`.

## Gotchas

- The command exits 1 when any of links, sitemap, RSS, or metadata fails. Read the fields. A failed feed does not mean the sitemap failed.
- `src/app` has `sitemap.ts` and no feed route. `rss.ok` is false until a feed exists. Do not point `rss.resolved` at an HTML 404 and call it a feed. Do not drop RSS from the command to force a pass.
- `metadataBase` is `https://robcrock.com`, so `og:image` is declared on that host. The CLI requests the same path on the local server. A failure of the public host is not the local check.
- `check-links` also requests every sitemap URL and same-origin link on those pages. External social links are counted and not fetched.
- `/robots.txt` points crawlers at the production sitemap. This recipe checks `/sitemap.xml` on the local server.

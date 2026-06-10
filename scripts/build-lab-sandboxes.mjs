/**
 * Converts exported CodeSandbox (vanilla/Parcel) sandboxes in
 * codesandboxes/_extracted into self-contained static demos under
 * public/lab/sandboxes/<slug>/, embeddable via <iframe>.
 *
 * Transformations:
 *  - bare `lodash` / `motion` imports → pinned ESM CDN URLs
 *  - CSS imports stripped from JS, replaced with <link> tags in the HTML
 *  - extensionless relative imports get a .js extension (browser ESM)
 *  - `/index.js` script srcs rewritten relative so subpath hosting works
 */
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";

const SRC_ROOT = "codesandboxes/_extracted";
const OUT_ROOT = "public/lab/sandboxes";

const CDN = {
  lodash: "https://cdn.jsdelivr.net/npm/lodash-es@4.17.21/+esm",
  motion: "https://cdn.jsdelivr.net/npm/motion@12.23.26/+esm",
};

function transformJs(source) {
  let js = source;
  const cssImports = [];

  // Collect and strip CSS imports
  js = js.replace(/^\s*import\s+["']\.\/([\w.-]+\.css)["'];?\s*$/gm, (_, file) => {
    cssImports.push(file);
    return "";
  });

  // Bare package imports → CDN
  js = js.replace(/from\s+["']lodash["']/g, `from "${CDN.lodash}"`);
  js = js.replace(/from\s+["']motion["']/g, `from "${CDN.motion}"`);

  // Extensionless relative imports → .js
  js = js.replace(/from\s+["'](\.\/[\w-]+)["']/g, (match, p) =>
    p.endsWith(".js") || p.endsWith(".css") ? match : `from "${p}.js"`
  );

  return { js: js.trim(), cssImports };
}

// Shared stylesheet injected last into every demo: kills scrollbars
// inside the fixed-height tile and caps fixed-size SVGs so they scale
// down instead of overflowing the canvas.
const EMBED_CSS = `/* injected for tile embedding on robcrock.com */
html,
body {
  overflow: hidden !important;
}
svg {
  max-width: 92vw;
  max-height: 92vh;
}
`;

// Per-sandbox tweaks for demos designed for a full browser window
const EMBED_OVERRIDES = {
  // 700px-tall iPhone mockup: scale it down and pin the action zone
  // (the CD travels through the top half) inside the tile.
  "move-along-curved-path-cd":
    "body{padding-top:4px !important}.iphone{zoom:0.35}",
  // SVG + play button stack just exceeds the tile; tighten the svg
  "animate-along-path": "svg{max-height:75vh}",
};

// Course-hosted assets that weren't included in the export
const GRID_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M24 0H0v24" fill="none" stroke="hsl(210 15% 14%)" stroke-width="1"/></svg>\n`;
const AVATAR_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="32" r="32" fill="hsl(210 15% 25%)"/><circle cx="32" cy="25" r="11" fill="hsl(210 15% 55%)"/><path d="M10 64a22 16 0 0 1 44 0Z" fill="hsl(210 15% 55%)"/></svg>\n`;

function relativizeAssets(content, outDir) {
  let out = content
    .replace(/href=(["'])\/(base|styles)\.css\1/g, 'href=$1./$2.css$1')
    .replace(/src=(["'])\/index\.js\1/g, "src=$1./index.js$1")
    .replace(
      /url\((['"]?)\/shape-circuit\.png\1\)/g,
      "url($1https://sandpack-bundler.vercel.app/shape-circuit.png$1)"
    );

  if (/\/grid\.svg/.test(out)) {
    out = out.replace(/url\((['"]?)\/grid\.svg\1\)/g, "url($1./grid.svg$1)");
    mkdirSync(outDir, { recursive: true });
    writeFileSync(path.join(outDir, "grid.svg"), GRID_SVG);
  }
  if (/\/img\/avatars\//.test(out)) {
    out = out.replace(/src=(["'])\/img\/avatars\/[^"']+\1/g, "src=$1./avatar.svg$1");
    mkdirSync(outDir, { recursive: true });
    writeFileSync(path.join(outDir, "avatar.svg"), AVATAR_SVG);
  }
  return out;
}

function buildSandbox(slug) {
  const srcDir = path.join(SRC_ROOT, slug);
  const outDir = path.join(OUT_ROOT, slug);

  let html = relativizeAssets(
    readFileSync(path.join(srcDir, "index.html"), "utf8"),
    outDir
  );

  // All CSS files present in the sandbox, in cascade-friendly order
  const cssFiles = readdirSync(srcDir)
    .filter((f) => f.endsWith(".css"))
    .sort((a, b) => {
      const order = (n) => (n.includes("reset") || n.includes("base") ? 0 : 1);
      return order(a) - order(b);
    });

  // Transform JS if present
  let hasJs = false;
  const jsPath = path.join(srcDir, "index.js");
  if (existsSync(jsPath)) {
    const { js } = transformJs(readFileSync(jsPath, "utf8"));
    if (js.length > 0) {
      hasJs = true;
      mkdirSync(outDir, { recursive: true });
      writeFileSync(path.join(outDir, "index.js"), js + "\n");
    }
  }

  // Secondary JS modules (utils.js etc.)
  for (const f of readdirSync(srcDir)) {
    if (f.endsWith(".js") && f !== "index.js") {
      const { js } = transformJs(readFileSync(path.join(srcDir, f), "utf8"));
      mkdirSync(outDir, { recursive: true });
      writeFileSync(path.join(outDir, f), js + "\n");
    }
  }

  mkdirSync(outDir, { recursive: true });

  // Copy CSS (with absolute asset refs rewritten)
  for (const f of cssFiles) {
    writeFileSync(
      path.join(outDir, f),
      relativizeAssets(readFileSync(path.join(srcDir, f), "utf8"), outDir)
    );
  }

  // Only inject links for CSS not already referenced by the HTML
  const links = cssFiles
    .filter((f) => !html.includes(`./${f}`))
    .map((f) => `    <link rel="stylesheet" href="./${f}" />`)
    .join("\n");

  // Some exports are body fragments with no <html>/<head> wrapper —
  // wrap those in a full document so CSS links and scripts can attach.
  const isFragment = !/<html[\s>]/i.test(html);
  if (isFragment) {
    const fragmentHasScript = /<script[^>]*src=["']\.\/index\.js["']/.test(html);
    const scriptTag =
      hasJs && !fragmentHasScript
        ? `\n    <script type="module" src="./index.js"></script>`
        : "";
    html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${slug}</title>
${links}
  </head>
  <body>
${html}${scriptTag}
  </body>
</html>
`;
  } else {
    // Inject CSS links into <head>
    if (links) {
      html = html.replace(/<\/head>/i, `${links}\n  </head>`);
    }

    // Rewrite absolute /index.js refs; dedupe with our own injection
    const hasScriptTag = /<script[^>]*src=["'][./]*index\.js["']/.test(html);
    html = html.replace(/src=["']\/index\.js["']/g, 'src="./index.js"');

    if (hasJs && !hasScriptTag) {
      html = html.replace(/<\/body>/i, `  <script type="module" src="./index.js"></script>\n</body>`);
    }
    if (!hasJs && hasScriptTag) {
      // Script referenced but became empty after stripping CSS imports
      html = html.replace(/<script[^>]*src=["'][./]*index\.js["'][^>]*><\/script>\s*/g, "");
    }
  }

  // Embed stylesheet goes last so it wins the cascade
  const embedCss = EMBED_CSS + (EMBED_OVERRIDES[slug] ?? "");
  writeFileSync(path.join(outDir, "lab-embed.css"), embedCss + "\n");
  html = html.replace(
    /<\/head>/i,
    `    <link rel="stylesheet" href="./lab-embed.css" />\n  </head>`
  );

  writeFileSync(path.join(outDir, "index.html"), html);
  return { slug, hasJs, cssFiles };
}

// --- Run ---
rmSync(OUT_ROOT, { recursive: true, force: true });
mkdirSync(OUT_ROOT, { recursive: true });

const slugs = readdirSync(SRC_ROOT).filter((d) => {
  const dir = path.join(SRC_ROOT, d);
  if (!statSync(dir).isDirectory()) return false;
  // Skip React (CRA) sandboxes — those are ported natively
  return !existsSync(path.join(dir, "src"));
});

const results = slugs.map(buildSandbox);
console.log(`Built ${results.length} sandboxes into ${OUT_ROOT}`);
for (const r of results) {
  console.log(`  ${r.slug} ${r.hasJs ? "(js)" : "(static)"} [${r.cssFiles.join(", ")}]`);
}

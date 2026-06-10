import { chromium } from "playwright";

const BASE = process.env.BASE ?? "http://localhost:3000";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 960 } });
await page.goto(`${BASE}/lab`, { waitUntil: "networkidle" });

// Scroll through to mount every lazy iframe
await page.evaluate(async () => {
  const step = 700;
  for (let y = 0; y < document.body.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 120));
  }
  window.scrollTo(0, 0);
});
// Generous settle: dozens of iframes load CSS/JS concurrently on dev
await page.waitForTimeout(8000);

// Page-level horizontal overflow check
const pageOverflow = await page.evaluate(() => ({
  scrollW: document.documentElement.scrollWidth,
  clientW: document.documentElement.clientWidth,
}));
if (pageOverflow.scrollW > pageOverflow.clientW) {
  console.log(`PAGE H-OVERFLOW: ${pageOverflow.scrollW} > ${pageOverflow.clientW}`);
}

// Per-iframe overflow measurements
const results = [];
for (const frame of page.frames()) {
  if (frame === page.mainFrame()) continue;
  try {
    const m = await frame.evaluate(() => {
      // documentElement governs the scroll viewport; body.scrollHeight
      // over-reports when html centers an oversized body with
      // overflow hidden (no scrollbar, symmetric decorative clip).
      const de = document.documentElement;
      return {
        title: document.title,
        scrollH: de.scrollHeight,
        clientH: de.clientHeight,
        scrollW: de.scrollWidth,
        clientW: de.clientWidth,
        overflowY: getComputedStyle(de).overflowY,
      };
    });
    const url = frame.url().split("/lab/sandboxes/")[1] ?? frame.url();
    results.push({ slug: url.replace("/index.html", ""), ...m });
  } catch {
    // frame detached mid-audit
  }
}

const offenders = results.filter(
  (r) =>
    (r.scrollH > r.clientH + 1 || r.scrollW > r.clientW + 1) &&
    r.overflowY !== "hidden"
);

console.log(`${results.length} frames measured, ${offenders.length} overflow:`);
for (const o of offenders) {
  const v = o.scrollH > o.clientH + 1 ? `V ${o.scrollH}>${o.clientH}` : "";
  const h = o.scrollW > o.clientW + 1 ? `H ${o.scrollW}>${o.clientW}` : "";
  console.log(`  ${o.slug}: ${v} ${h}`);
}

await browser.close();

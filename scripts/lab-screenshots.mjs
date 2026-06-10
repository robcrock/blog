import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
const BASE = process.env.BASE ?? "http://localhost:3000";

const OUT = ".lab-shots";
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 960 } });

async function scrollThrough(p) {
  await p.evaluate(async () => {
    const step = 700;
    const height = document.body.scrollHeight;
    for (let y = 0; y < height; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 150));
    }
    window.scrollTo(0, 0);
  });
  await p.waitForTimeout(2500);
}

// --- /lab full page (desktop) ---
await page.goto(`${BASE}/lab`, { waitUntil: "networkidle" });
await scrollThrough(page);
await page.screenshot({ path: `${OUT}/lab-full.png`, fullPage: true });

// --- Interact inside the magic wand iframe ---
const wandTile = page.locator("article", { hasText: "Magic Wand" }).first();
await wandTile.scrollIntoViewIfNeeded();
await page.waitForTimeout(800);
const wandFrame = page.frameLocator('iframe[title="Magic Wand"]');
const wandBody = wandFrame.locator("body");
await wandBody.click({ position: { x: 200, y: 100 } });
await page.waitForTimeout(400);
await wandTile.screenshot({ path: `${OUT}/magic-wand-clicked.png` });

// --- Hover the sparkline iframe ---
const sparkTile = page.locator("article", { hasText: "Sparkline" }).first();
await sparkTile.scrollIntoViewIfNeeded();
await page.waitForTimeout(800);
const sparkBox = await sparkTile.boundingBox();
if (sparkBox) {
  await page.mouse.move(sparkBox.x + sparkBox.width / 2, sparkBox.y + 110);
  await page.waitForTimeout(900);
  await sparkTile.screenshot({ path: `${OUT}/sparkline-hover.png` });
}

// --- Heart burst ---
const heartTile = page.locator("article", { hasText: "Disperse From Center" }).first();
await heartTile.scrollIntoViewIfNeeded();
await page.waitForTimeout(800);
const heartFrame = page.frameLocator('iframe[title="Disperse From Center"]');
await heartFrame.locator("button").first().click();
await page.waitForTimeout(350);
await heartTile.screenshot({ path: `${OUT}/heart-burst.png` });

// --- Homepage lab section ---
await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
const labSection = page.locator("#lab");
await labSection.scrollIntoViewIfNeeded();
await page.waitForTimeout(2000);
await labSection.screenshot({ path: `${OUT}/home-lab-section.png` });

// --- Mobile /lab ---
await page.setViewportSize({ width: 390, height: 844 });
await page.goto(`${BASE}/lab`, { waitUntil: "networkidle" });
await scrollThrough(page);
await page.screenshot({ path: `${OUT}/lab-mobile-top.png` });

await browser.close();
console.log("done");

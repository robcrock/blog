import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = process.env.BASE ?? "http://localhost:3000";
const OUT = ".lab-shots";
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 960 } });
await page.goto(`${BASE}/lab`, { waitUntil: "networkidle" });

async function shoot(tileText, name, interact) {
  const tile = page.locator("article", { hasText: tileText }).first();
  await tile.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  if (interact) await interact(tile);
  await tile.screenshot({ path: `${OUT}/${name}.png` });
}

// Like button: click, wait for particles mid-flight
await shoot("Like Button, in React", "port-like-button", async (tile) => {
  await tile.locator("button.lab-like-btn").click();
  await page.waitForTimeout(450);
});

// Timer: set time, press play, catch ring draining
await shoot("Animated Timer", "port-timer", async (tile) => {
  await tile.locator("#lab-timer-play").click();
  await page.waitForTimeout(2200);
});

// Fey chart: shuffle, catch morph result
await shoot("Fey Radar Chart", "port-fey-chart", async (tile) => {
  await tile.locator("button", { hasText: "Shuffle" }).click();
  await page.waitForTimeout(500);
});

await browser.close();
console.log("done");

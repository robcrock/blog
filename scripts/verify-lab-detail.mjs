/* Spot-checks the lab detail pages: tile → detail navigation, live demo,
 * file tabs, copy button, dark theme, and mobile layout. */
import { mkdirSync } from "node:fs";
import { chromium } from "playwright";

const BASE = process.env.BASE ?? "http://localhost:3000";
const SHOTS = ".lab-shots";
mkdirSync(SHOTS, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1280, height: 900 },
  permissions: ["clipboard-read", "clipboard-write"],
});
const page = await context.newPage();
const failures = [];
const check = (name, ok) => {
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}`);
  if (!ok) failures.push(name);
};

// --- 1. Gallery tile links to detail page ---
await page.goto(`${BASE}/lab`, { waitUntil: "networkidle" });
const tileLink = page.locator('a[href="/lab/distance-triangle"]').first();
check("tile link to detail exists", (await tileLink.count()) > 0);
await tileLink.click();
await page.waitForURL("**/lab/distance-triangle");
check("navigates to detail page", page.url().includes("/lab/distance-triangle"));

// --- 2. Native exhibit: demo + tabs + copy ---
await page.waitForSelector("main h1");
check(
  "detail h1 shows title",
  (await page.locator("main h1").innerText()).includes("Distance Triangle")
);
check(
  "native demo canvas rendered",
  (await page.locator('[style*="lab-canvas-distance-triangle"]').count()) === 1
);

const tabs = page.locator('[role="tab"]');
check("two file tabs (tsx + math.ts)", (await tabs.count()) === 2);
check(
  "shiki highlighted code present",
  (await page.locator(".lab-code pre.shiki").count()) === 1
);

// Switch tab
await tabs.nth(1).click();
check(
  "tab switch shows math.ts",
  (await page.locator(".lab-code").innerText()).includes("clampedNormalize") ||
    (await page.locator(".lab-code").innerText()).includes("normalize")
);

// Copy button
await page.locator('button[aria-label^="Copy"]').click();
await page.waitForTimeout(200);
const clipboard = await page.evaluate(() => navigator.clipboard.readText());
check("copy puts source on clipboard", clipboard.length > 50);
check(
  "copy button shows confirmation",
  (await page.locator('button[aria-label="Copied"]').count()) === 1
);
await page.screenshot({ path: `${SHOTS}/detail-native-light.png`, fullPage: true });

// --- 3. Dark theme ---
await page.emulateMedia({ colorScheme: "dark" });
await page.evaluate(() => document.documentElement.classList.add("dark"));
await page.waitForTimeout(300);
const darkBg = await page
  .locator(".lab-code pre.shiki")
  .evaluate((el) => getComputedStyle(el).backgroundColor);
check("dark theme code background applied", darkBg !== "rgb(255, 255, 255)");
await page.screenshot({ path: `${SHOTS}/detail-native-dark.png`, fullPage: true });
await page.evaluate(() => document.documentElement.classList.remove("dark"));
await page.emulateMedia({ colorScheme: "light" });

// --- 4. Sandbox exhibit: iframe demo + manifest sources ---
await page.goto(`${BASE}/lab/draw-the-path`, { waitUntil: "networkidle" });
await page.waitForSelector("iframe", { timeout: 10000 });
check("sandbox iframe mounts", (await page.locator("iframe").count()) === 1);
const sandboxTabs = await page.locator('[role="tab"]').allInnerTexts();
check(
  "sandbox tabs from manifest (html + css)",
  sandboxTabs.join(",") === "index.html,styles.css"
);
check(
  "no parcel shim tab",
  !sandboxTabs.includes("index.js")
);
const htmlCode = await page.locator(".lab-code").innerText();
check("original source shown (not CDN rewrite)", !htmlCode.includes("jsdelivr"));
await page.screenshot({ path: `${SHOTS}/detail-sandbox.png`, fullPage: true });

// --- 5. Prev/next navigation ---
const nextLink = page.locator('nav[aria-label="Specimen navigation"] a').last();
await nextLink.click();
await page.waitForFunction(
  () => !window.location.pathname.endsWith("/lab/draw-the-path"),
  null,
  { timeout: 10000 }
);
check("prev/next nav navigates", !page.url().endsWith("/lab/draw-the-path"));

// --- 6. Essay link present where expected ---
await page.goto(`${BASE}/lab/proximity-reveal`, { waitUntil: "networkidle" });
check(
  "essay link on detail page",
  (await page.locator('a[href="/craft/proximity-reveal"]').count()) > 0
);

// --- 7. Mobile layout ---
await page.setViewportSize({ width: 390, height: 844 });
await page.goto(`${BASE}/lab/like-button-react`, { waitUntil: "networkidle" });
const codeBox = await page.locator(".lab-code").boundingBox();
check("mobile: code block fits viewport", codeBox && codeBox.width <= 390);
await page.screenshot({ path: `${SHOTS}/detail-mobile.png`, fullPage: true });

await browser.close();

if (failures.length > 0) {
  console.error(`\n${failures.length} failure(s):\n  ${failures.join("\n  ")}`);
  process.exit(1);
}
console.log("\nAll checks passed.");

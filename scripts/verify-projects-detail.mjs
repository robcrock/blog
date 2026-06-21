/* Verifies the WORK projects now route into on-site detail pages that embed
 * the live Vercel deployment, instead of linking out to Frontend Mentor.
 * Requires the dev server running (BASE, default http://localhost:3000). */
import { mkdirSync } from "node:fs";
import { chromium } from "playwright";

const BASE = process.env.BASE ?? "http://localhost:3000";
const SHOTS = ".project-shots";
mkdirSync(SHOTS, { recursive: true });

// Mirror of the relevant fields in PROJECTS (src/shared/lib/constants.ts).
const PROJECTS = [
  { slug: "bookmark-landing-page", title: "Bookmark Landing Page", liveUrl: "https://bookmark-landing-page-jade-gamma.vercel.app" },
  { slug: "room-homepage", title: "Room Homepage", liveUrl: "https://room-homepage-rust-mu.vercel.app" },
  { slug: "loopstudio-landing-page", title: "Loopstudio Landing Page", liveUrl: "https://loopstudios-landing-page-lovat.vercel.app" },
  { slug: "nft-card-component", title: "NFT Card Component", liveUrl: "https://nft-preview-card-beta-kohl.vercel.app" },
  { slug: "password-generator-app", title: "Password Generator App", liveUrl: "https://password-generator-six-alpha.vercel.app" },
  { slug: "frontend-quiz-app", title: "Frontend Quiz App", liveUrl: "https://quiz-app-jet-three.vercel.app" },
  { slug: "tip-calculator-app", title: "Tip Calculator App", liveUrl: "https://tip-calculator-pearl-iota.vercel.app" },
  { slug: "time-tracking-dashboard", title: "Time Tracking Dashboard", liveUrl: "https://time-tracking-dashboard-three-phi.vercel.app" },
];

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await context.newPage();
const failures = [];
const check = (name, ok) => {
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}`);
  if (!ok) failures.push(name);
};

// Never let any page navigate the top frame to Frontend Mentor.
let femRequest = false;
page.on("request", (req) => {
  if (req.isNavigationRequest() && req.url().includes("frontendmentor.io")) {
    femRequest = true;
  }
});

// --- 1. Home grid links internally, not out ---
await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
const homeLink = page.locator(`a[href="/projects/${PROJECTS[0].slug}"]`).first();
check("home thumbnail links to /projects/{slug}", (await homeLink.count()) > 0);
check("home thumbnail is not target=_blank", (await homeLink.getAttribute("target")) === null);
check("no frontendmentor.io links on home", (await page.locator('a[href*="frontendmentor.io"]').count()) === 0);

// --- 2. /projects grid links internally ---
await page.goto(`${BASE}/projects`, { waitUntil: "networkidle" });
for (const p of PROJECTS) {
  const link = page.locator(`a[href="/projects/${p.slug}"]`).first();
  check(`/projects links to ${p.slug}`, (await link.count()) > 0);
}
check("no frontendmentor.io links on /projects", (await page.locator('a[href*="frontendmentor.io"]').count()) === 0);

// --- 3. Click a thumbnail → stays on-site, lands on detail ---
await page.locator(`a[href="/projects/${PROJECTS[0].slug}"]`).first().click();
await page.waitForURL(`**/projects/${PROJECTS[0].slug}`);
check("click keeps host on localhost", new URL(page.url()).host === new URL(BASE).host);

// --- 4. Every detail page: title, embedded iframe = liveUrl, open-full-site link ---
for (const p of PROJECTS) {
  await page.goto(`${BASE}/projects/${p.slug}`, { waitUntil: "domcontentloaded" });
  await page.waitForSelector("main h1");
  check(`${p.slug}: h1 shows title`, (await page.locator("main h1").innerText()).includes(p.title));

  // Iframe is lazy; scroll it into view then wait for it to mount.
  await page.locator("iframe").scrollIntoViewIfNeeded().catch(() => {});
  await page.waitForSelector("iframe", { timeout: 10000 });
  const iframeSrc = await page.locator("iframe").first().getAttribute("src");
  check(`${p.slug}: iframe src is the live Vercel URL`, iframeSrc === p.liveUrl);

  const openFull = page.locator(`a[href="${p.liveUrl}"][target="_blank"]`);
  check(`${p.slug}: "open full site" link present`, (await openFull.count()) > 0);
}

// --- 5. Embedded live sites actually load (not framing-blocked) ---
for (const p of PROJECTS) {
  await page.goto(`${BASE}/projects/${p.slug}`, { waitUntil: "domcontentloaded" });
  await page.locator("iframe").scrollIntoViewIfNeeded().catch(() => {});
  const handle = await page.waitForSelector("iframe", { timeout: 10000 });
  // contentFrame() resolves only if the browser actually rendered the framed doc.
  const frame = await handle.contentFrame();
  let loaded = false;
  if (frame) {
    try {
      await frame.waitForLoadState("domcontentloaded", { timeout: 15000 });
      loaded = true;
    } catch {
      loaded = false;
    }
  }
  check(`${p.slug}: embedded live site loads (not blocked)`, loaded);
}

// --- 6. No horizontal overflow at desktop + mobile ---
await page.goto(`${BASE}/projects/${PROJECTS[0].slug}`, { waitUntil: "networkidle" });
const overflow1280 = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
check("no horizontal overflow @1280", !overflow1280);
await page.screenshot({ path: `${SHOTS}/detail-desktop.png`, fullPage: true });

await page.setViewportSize({ width: 390, height: 844 });
await page.goto(`${BASE}/projects/${PROJECTS[0].slug}`, { waitUntil: "networkidle" });
const overflow390 = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
check("no horizontal overflow @390", !overflow390);
await page.screenshot({ path: `${SHOTS}/detail-mobile.png`, fullPage: true });
await page.setViewportSize({ width: 1280, height: 900 });

// --- 7. Prev/next navigation ---
await page.goto(`${BASE}/projects/${PROJECTS[0].slug}`, { waitUntil: "domcontentloaded" });
await page.locator('nav[aria-label="Project navigation"] a').last().click();
await page.waitForURL(`**/projects/${PROJECTS[1].slug}`);
check("prev/next nav navigates between projects", page.url().endsWith(`/projects/${PROJECTS[1].slug}`));

check("no top-frame navigation to Frontend Mentor occurred", !femRequest);

await browser.close();

if (failures.length > 0) {
  console.error(`\n${failures.length} failure(s):\n  ${failures.join("\n  ")}`);
  process.exit(1);
}
console.log("\nAll checks passed.");

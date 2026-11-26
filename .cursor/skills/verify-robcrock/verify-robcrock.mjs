#!/usr/bin/env node

import { spawn } from "node:child_process";
import fs from "node:fs";
import net from "node:net";
import path from "node:path";
import { fileURLToPath } from "node:url";

const skillDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = findRepoRoot(skillDir);
const runDir = path.join(skillDir, ".run");
const statePath = path.join(runDir, "state.json");
const logPath = path.join(runDir, "server.log");
const artifactsDir = path.join(skillDir, "artifacts");
const readyTimeoutMs = 180000;
const productionOrigin = "https://robcrock.com";
const defaultPort = 4173;
const perfCaveat =
  "One navigation timing sample from the verification dev server. There is no second sample, so there is no spread. Use it only as evidence that perf recorded a navigation.";

const commands = {
  launch: {
    flags: ["port"],
    summary: "Start pnpm dev for this checkout and wait until GET / is usable.",
    usage: "launch [--port <n>]",
    details: [
    "Runs contentlayer2 build && next dev --turbopack on 127.0.0.1.",
    "The default port is 4173.",
      "Ready means GET / returns 200 and the HTML contains Robert Crocker.",
      "If this checkout already has a healthy verification server, launch returns it.",
      "A second server in this same checkout is refused. .next is shared.",
    ],
  },
  teardown: {
    flags: [],
    summary: "Stop the server this CLI started and remove its run files.",
    usage: "teardown",
    details: [
      "Signals the process group recorded in .run/state.json.",
      "Kills that process only when its environment still contains VERIFY_ROBCROCK=1.",
      "Does not delete artifacts/.",
    ],
  },
  doctor: {
    flags: [],
    summary: "Read-only check that the recorded server is worth driving.",
    usage: "doctor",
    details: [
      "Requires the recorded pid, the VERIFY_ROBCROCK marker, port ownership, and a usable GET /.",
      "Does not start a server and does not attach to one this CLI did not start.",
    ],
  },
  screenshot: {
    flags: ["theme", "out", "full-page"],
    summary: "Write a PNG of a route in the light or dark theme.",
    usage: "screenshot <route> --theme light|dark [--out <file>] [--full-page]",
    details: [
      "The viewport is 1280 by 800. --full-page captures the whole page.",
      "Dark mode is reached only by clicking the button named Toggle theme.",
      "If that button is absent, the command fails. It does not add the dark class from script.",
      "Relative --out is resolved from the current working directory. Run from the repo root.",
    ],
  },
  snapshot: {
    flags: ["theme", "out"],
    summary: "Write the accessibility tree of a route as YAML.",
    usage: "snapshot <route> [--theme light|dark] [--out <file>]",
    details: [
      "Uses Playwright's aria snapshot of the body.",
      "--theme follows the same rule as screenshot.",
    ],
  },
  "toggle-theme": {
    flags: ["route"],
    summary: "Click the button named Toggle theme and report the html class.",
    usage: "toggle-theme [--route <route>]",
    details: [
      "The default route is /.",
      "Fails when the button is not on the page.",
    ],
  },
  "check-links": {
    flags: [],
    summary:
      "Resolve internal links, sitemap.xml, the RSS feed, and the home Open Graph image.",
    usage: "check-links",
    details: [
      "Fetches every URL in sitemap.xml and same-origin links found on those pages.",
      "Rewrites https://robcrock.com to the local server.",
      "Does not fetch external hosts.",
      "Tries an advertised RSS or Atom link, then /rss.xml, /feed.xml, /atom.xml, /feed, and /rss.",
      "Reads og:title and og:image from GET /. The image path is fetched on the local server.",
    ],
  },
  perf: {
    flags: ["theme", "out"],
    summary: "Record one navigation trace and one timing sample.",
    usage: "perf <route> [--theme light|dark] [--out <metrics.json>]",
    details: [
      "Writes a metrics JSON file and a Playwright trace zip with the same basename.",
      perfCaveat,
    ],
  },
};

class CliError extends Error {
  constructor(message, extra = {}) {
    super(message);
    this.extra = extra;
  }
}

function findRepoRoot(start) {
  let dir = start;
  for (let i = 0; i < 8; i += 1) {
    const pkgPath = path.join(dir, "package.json");
    if (fs.existsSync(pkgPath)) {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
      if (pkg.name === "project-blog") return dir;
    }
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  throw new Error(
    "verify-robcrock.mjs must stay inside the project-blog checkout.",
  );
}

function emit(payload, code) {
  if (payload && payload.ok === false && payload.error) {
    fs.writeSync(2, `${String(payload.error).split("\n")[0]}\n`);
  }
  fs.writeSync(1, `${JSON.stringify(payload, null, 2)}\n`);
  process.exit(code);
}

function printHelp(command) {
  if (!command || command === "help") {
    const lines = [
      "verify-robcrock",
      "",
      "Drive the local robcrock.com Next.js site. Run from the repo root.",
      "Every command except --help prints one JSON object on stdout.",
      "A failure also prints one sentence on stderr and exits 1.",
      "",
      "Usage",
      "  node .cursor/skills/verify-robcrock/verify-robcrock.mjs <command> [flags]",
      "  node .cursor/skills/verify-robcrock/verify-robcrock.mjs <command> --help",
      "",
      "Commands",
    ];
    for (const [name, spec] of Object.entries(commands)) {
      lines.push(`  ${name.padEnd(14)} ${spec.summary}`);
    }
    lines.push("");
    lines.push("Proof files default to .cursor/skills/verify-robcrock/artifacts/.");
    lines.push("The dev server state lives in .cursor/skills/verify-robcrock/.run/.");
    lines.push("teardown removes .run and leaves artifacts in place.");
    fs.writeSync(1, `${lines.join("\n")}\n`);
    process.exit(0);
  }
  const spec = commands[command];
  if (!spec) {
    throw new CliError(`Unknown command "${command}". Run --help.`);
  }
  const lines = [
    `verify-robcrock ${command}`,
    "",
    spec.summary,
    "",
    "Usage",
    `  node .cursor/skills/verify-robcrock/verify-robcrock.mjs ${spec.usage}`,
    "",
    ...spec.details,
  ];
  if (spec.flags.length) {
    lines.push("");
    lines.push(`Flags: ${spec.flags.map((flag) => `--${flag}`).join(", ")}`);
  }
  fs.writeSync(1, `${lines.join("\n")}\n`);
  process.exit(0);
}

function parseArgv(argv) {
  const args = argv.slice(2);
  if (
    args.length === 0 ||
    args[0] === "--help" ||
    args[0] === "-h" ||
    args[0] === "help"
  ) {
    return { command: "help", positionals: [], flags: {} };
  }
  const command = args[0];
  const positionals = [];
  const flags = {};
  for (let i = 1; i < args.length; i += 1) {
    const arg = args[i];
    if (arg === "--help" || arg === "-h") {
      flags.help = true;
      continue;
    }
    if (!arg.startsWith("--")) {
      positionals.push(arg);
      continue;
    }
    const body = arg.slice(2);
    if (body === "full-page" || body === "help") {
      flags[body] = true;
      continue;
    }
    const eq = body.indexOf("=");
    if (eq !== -1) {
      flags[body.slice(0, eq)] = body.slice(eq + 1);
      continue;
    }
    const next = args[i + 1];
    if (next === undefined || next.startsWith("--")) flags[body] = true;
    else {
      flags[body] = next;
      i += 1;
    }
  }
  return { command, positionals, flags };
}

function rejectUnknown(command, flags) {
  const allowed = new Set([...(commands[command]?.flags ?? []), "help"]);
  for (const key of Object.keys(flags)) {
    if (!allowed.has(key)) {
      throw new CliError(
        `Unknown flag --${key} for ${command}. Run ${command} --help.`,
      );
    }
  }
}

function parsePort(value) {
  if (!/^\d+$/.test(String(value))) {
    throw new CliError("--port must be an integer from 1 to 65535.");
  }
  const port = Number(value);
  if (port < 1 || port > 65535) {
    throw new CliError("--port must be an integer from 1 to 65535.");
  }
  return port;
}

function parseTheme(value, required) {
  if (value === undefined) {
    if (required) throw new CliError("Pass --theme light or --theme dark.");
    return null;
  }
  if (value === true || (value !== "light" && value !== "dark")) {
    throw new CliError("Pass --theme light or --theme dark.");
  }
  return value;
}

function parseRoute(value) {
  if (
    typeof value !== "string" ||
    !value.startsWith("/") ||
    value.startsWith("//") ||
    value.includes("..")
  ) {
    throw new CliError(
      'Route must be a site path starting with /, for example /posts. Absolute URLs and ".." are refused.',
    );
  }
  return value;
}

function requireOneRoute(command, positionals) {
  if (positionals.length !== 1) {
    throw new CliError(
      `${command} takes one route. Example: ${commands[command].usage}`,
    );
  }
  return parseRoute(positionals[0]);
}

function routeSlug(route) {
  const slug = route
    .replace(/^\//, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return slug || "home";
}

function resolveOut(value, fallback) {
  if (value === true) throw new CliError("--out needs a file path.");
  const chosen = value || fallback;
  const abs = path.resolve(process.cwd(), chosen);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  return abs;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function readState() {
  if (!fs.existsSync(statePath)) return null;
  try {
    const raw = JSON.parse(fs.readFileSync(statePath, "utf8"));
    if (
      !raw ||
      typeof raw.pid !== "number" ||
      typeof raw.port !== "number" ||
      typeof raw.url !== "string" ||
      typeof raw.cwd !== "string"
    ) {
      return { invalid: true };
    }
    return raw;
  } catch {
    return { invalid: true };
  }
}

function writeState(state) {
  fs.mkdirSync(runDir, { recursive: true });
  const tmp = `${statePath}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(state, null, 2));
  fs.renameSync(tmp, statePath);
}

function clearRun() {
  fs.rmSync(runDir, { recursive: true, force: true });
}

function pidAlive(pid) {
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

function hasMarker(pid) {
  try {
    const env = fs.readFileSync(`/proc/${pid}/environ`);
    return env.includes(Buffer.from("VERIFY_ROBCROCK=1"));
  } catch {
    return false;
  }
}

function processTree(rootPid) {
  const children = new Map();
  for (const name of fs.readdirSync("/proc")) {
    if (!/^\d+$/.test(name)) continue;
    try {
      const status = fs.readFileSync(`/proc/${name}/status`, "utf8");
      const match = status.match(/^PPid:\s+(\d+)/m);
      if (!match) continue;
      const parent = Number(match[1]);
      const pid = Number(name);
      const list = children.get(parent) ?? [];
      list.push(pid);
      children.set(parent, list);
    } catch {
      continue;
    }
  }
  const seen = new Set();
  const stack = [rootPid];
  while (stack.length) {
    const pid = stack.pop();
    if (seen.has(pid)) continue;
    seen.add(pid);
    for (const child of children.get(pid) ?? []) stack.push(child);
  }
  return [...seen];
}

function listenInodes(port) {
  const portHex = port.toString(16).toUpperCase().padStart(4, "0");
  const inodes = new Set();
  let sawTable = false;
  for (const file of ["/proc/net/tcp", "/proc/net/tcp6"]) {
    let text = "";
    try {
      text = fs.readFileSync(file, "utf8");
      sawTable = true;
    } catch {
      continue;
    }
    for (const line of text.split("\n").slice(1)) {
      const parts = line.trim().split(/\s+/);
      if (parts.length < 10) continue;
      const local = parts[1] ?? "";
      const state = parts[3];
      const hex = local.split(":")[1];
      if (state === "0A" && hex?.toUpperCase() === portHex) inodes.add(parts[9]);
    }
  }
  if (!sawTable) {
    throw new CliError(
      `Could not read /proc/net/tcp to see who owns port ${port}. doctor will not guess.`,
    );
  }
  return inodes;
}

function portListeners(port) {
  const inodes = listenInodes(port);
  if (inodes.size === 0) return [];
  const pids = new Set();
  for (const name of fs.readdirSync("/proc")) {
    if (!/^\d+$/.test(name)) continue;
    let fds = [];
    try {
      fds = fs.readdirSync(`/proc/${name}/fd`);
    } catch {
      continue;
    }
    for (const fd of fds) {
      try {
        const target = fs.readlinkSync(`/proc/${name}/fd/${fd}`);
        const match = target.match(/^socket:\[(\d+)\]$/);
        if (match && inodes.has(match[1])) pids.add(Number(name));
      } catch {
        continue;
      }
    }
  }
  if (pids.size === 0) {
    throw new CliError(
      `Port ${port} is listening, but no process fd matched its socket. doctor will not guess.`,
    );
  }
  return [...pids];
}

function portInUse(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.unref();
    server.once("error", () => resolve(true));
    server.listen(port, "127.0.0.1", () => {
      server.close(() => resolve(false));
    });
  });
}

function declaredNextVersion() {
  const pkg = JSON.parse(fs.readFileSync(path.join(repoRoot, "package.json"), "utf8"));
  return pkg.dependencies?.next ?? null;
}

function readNextVersionFromLog() {
  if (!fs.existsSync(logPath)) return null;
  const log = fs.readFileSync(logPath, "utf8");
  const match = log.match(/Next\.js\s+v?(\d+\.\d+\.\d+)/);
  return match ? match[1] : null;
}

function logTail() {
  if (!fs.existsSync(logPath)) return "";
  return fs.readFileSync(logPath, "utf8").split("\n").slice(-40).join("\n");
}

function publicServer(state) {
  return { url: state.url, pid: state.pid, port: state.port };
}

async function doctorReport() {
  const state = readState();
  if (!state) {
    return {
      ok: false,
      command: "doctor",
      error:
        "No verification server is recorded. Run launch. This CLI does not attach to an unrelated dev server.",
    };
  }
  if (state.invalid) {
    return {
      ok: false,
      command: "doctor",
      error: `State file ${statePath} is invalid. Run teardown to remove it.`,
    };
  }
  const alive = pidAlive(state.pid);
  const marker = alive ? hasMarker(state.pid) : false;
  let listeners = null;
  let portError = null;
  if (alive && marker) {
    try {
      listeners = portListeners(state.port);
    } catch (error) {
      portError = error.message;
    }
  }
  const tree = alive ? processTree(state.pid) : [];
  const portOwnedByUs =
    listeners === null ? null : listeners.some((pid) => tree.includes(pid));
  let httpStatus = 0;
  let identity = false;
  let httpError = null;
  if (alive && marker) {
    try {
      const response = await fetch(`${state.url}/`, {
        redirect: "follow",
        signal: AbortSignal.timeout(20000),
      });
      const text = await response.text();
      httpStatus = response.status;
      identity = text.includes("Robert Crocker");
    } catch (error) {
      httpError = error.message;
    }
  }
  const nextVersionDeclared = declaredNextVersion();
  const nextVersionFromLog = readNextVersionFromLog();
  const problems = [];
  if (!alive) problems.push(`pid ${state.pid} is not running`);
  else if (!marker) problems.push(`pid ${state.pid} is not marked VERIFY_ROBCROCK=1`);
  if (portError) problems.push(portError);
  else if (portOwnedByUs === false) {
    problems.push(`port ${state.port} is not owned by pid ${state.pid}`);
  }
  if (httpError) problems.push(`GET / failed: ${httpError}`);
  else if (alive && marker && httpStatus !== 200) {
    problems.push(`GET / returned ${httpStatus}`);
  } else if (alive && marker && !identity) {
    problems.push('GET / did not include "Robert Crocker"');
  }
  if (
    nextVersionFromLog &&
    nextVersionDeclared &&
    nextVersionFromLog !== nextVersionDeclared
  ) {
    problems.push(
      `server log says Next.js ${nextVersionFromLog}, package.json declares ${nextVersionDeclared}`,
    );
  }
  const report = {
    ok: problems.length === 0,
    command: "doctor",
    ...publicServer(state),
    portOwnedByUs,
    marker,
    httpStatus,
    identity,
    nextVersionDeclared,
    nextVersionFromLog,
    cwd: state.cwd,
  };
  if (problems.length) report.error = problems.join(". ");
  return report;
}

async function requireReady() {
  const report = await doctorReport();
  if (!report.ok) {
    throw new CliError(`Refusing to drive. ${report.error}`, { doctor: report });
  }
  return report;
}

async function killState(state) {
  if (!state?.pid || state.pid === process.pid || state.pid < 2) {
    return { killed: false };
  }
  if (!pidAlive(state.pid)) return { killed: false };
  if (!hasMarker(state.pid)) {
    throw new CliError(
      `Refusing to kill pid ${state.pid}. It is not marked VERIFY_ROBCROCK=1.`,
    );
  }
  try {
    process.kill(-state.pid, "SIGTERM");
  } catch {
    try {
      process.kill(state.pid, "SIGTERM");
    } catch {
      return { killed: false };
    }
  }
  const deadline = Date.now() + 5000;
  while (pidAlive(state.pid) && Date.now() < deadline) await sleep(100);
  if (pidAlive(state.pid) && hasMarker(state.pid)) {
    try {
      process.kill(-state.pid, "SIGKILL");
    } catch {
      try {
        process.kill(state.pid, "SIGKILL");
      } catch {
        return { killed: false };
      }
    }
    const killedDeadline = Date.now() + 2000;
    while (pidAlive(state.pid) && Date.now() < killedDeadline) await sleep(100);
  }
  return { killed: !pidAlive(state.pid) };
}

function sameEndpoint(left, right) {
  const a = new URL(left);
  const b = new URL(right);
  const host = (value) => (value === "localhost" ? "127.0.0.1" : value);
  return host(a.hostname) === host(b.hostname) && a.port === b.port;
}

async function waitUntilReady(state, child) {
  const deadline = Date.now() + readyTimeoutMs;
  let lastError = "no response yet";
  while (Date.now() < deadline) {
    if (child.exitCode !== null) {
      throw new Error(
        `Dev server exited with code ${child.exitCode} before GET / was usable.`,
      );
    }
    const log = fs.existsSync(logPath) ? fs.readFileSync(logPath, "utf8") : "";
    if (log.includes("EADDRINUSE")) {
      throw new Error(`Port ${state.port} is already in use.`);
    }
    const local = log.match(/Local:\s+(http:\/\/\S+)/);
    if (local && !sameEndpoint(local[1], state.url)) {
      throw new Error(`Dev server bound ${local[1]} instead of ${state.url}.`);
    }
    try {
      const response = await fetch(`${state.url}/`, {
        redirect: "follow",
        signal: AbortSignal.timeout(20000),
      });
      const text = await response.text();
      if (response.status === 200 && text.includes("Robert Crocker")) return;
      lastError = `GET / returned ${response.status} and ${
        text.includes("Robert Crocker") ? "included" : "did not include"
      } the site name`;
    } catch (error) {
      lastError =
        error.name === "TimeoutError" ? "GET / timed out" : error.message;
    }
    await sleep(500);
  }
  throw new Error(`Server was not usable within 180s. ${lastError}`);
}

async function launch(flags) {
  const requested = flags.port === undefined ? defaultPort : parsePort(flags.port);
  let state = readState();
  if (state?.invalid || (state && !pidAlive(state.pid))) {
    clearRun();
    state = null;
  }
  if (state && !hasMarker(state.pid)) {
    throw new CliError(
      `State file pid ${state.pid} is alive but is not marked VERIFY_ROBCROCK=1. Refusing to kill it.`,
    );
  }
  if (state) {
    const report = await doctorReport();
    if (report.ok) {
      const result = {
        ok: true,
        command: "launch",
        action: "already-running",
        ...publicServer(state),
      };
      if (requested !== state.port) {
        result.note = `Requested port ${requested}. The running server is on ${state.port}. Run teardown before changing port.`;
      }
      return result;
    }
    await killState(state);
    clearRun();
  }

  if (await portInUse(requested)) {
    throw new CliError(
      `Port ${requested} is in use by a process this CLI did not start. Pass --port to choose a free port. This checkout can host one verification server.`,
    );
  }

  fs.mkdirSync(runDir, { recursive: true });
  const logFd = fs.openSync(logPath, "w");
  const child = spawn(
    "pnpm",
    [
      "exec",
      "sh",
      "-c",
      `contentlayer2 build && next dev --turbopack --port ${requested} --hostname 127.0.0.1`,
    ],
    {
      cwd: repoRoot,
      detached: true,
      stdio: ["ignore", logFd, logFd],
      env: {
        ...process.env,
        BROWSER: "none",
        NEXT_TELEMETRY_DISABLED: "1",
        VERIFY_ROBCROCK: "1",
      },
    },
  );
  fs.closeSync(logFd);
  if (!child.pid) {
    clearRun();
    throw new CliError("pnpm did not start. The dev server has no pid.");
  }
  const server = {
    pid: child.pid,
    port: requested,
    url: `http://127.0.0.1:${requested}`,
    cwd: repoRoot,
  };
  writeState(server);
  try {
    await waitUntilReady(server, child);
  } catch (error) {
    const tail = logTail();
    let killNote = "";
    try {
      await killState(server);
    } catch (killError) {
      killNote = ` Also failed to stop pid ${server.pid}: ${killError.message}`;
    }
    clearRun();
    throw new CliError(`${error.message}${killNote}`, { logTail: tail });
  }
  child.unref();
  return {
    ok: true,
    command: "launch",
    action: "started",
    ...publicServer(server),
  };
}

async function teardown() {
  const state = readState();
  if (!state) return { ok: true, command: "teardown", action: "noop" };
  if (state.invalid) {
    clearRun();
    return { ok: true, command: "teardown", action: "removed-invalid-state" };
  }
  if (!pidAlive(state.pid)) {
    clearRun();
    return {
      ok: true,
      command: "teardown",
      action: "removed-stale-state",
      pid: state.pid,
    };
  }
  await killState(state);
  if (pidAlive(state.pid)) {
    return {
      ok: false,
      command: "teardown",
      action: "still-alive",
      pid: state.pid,
      port: state.port,
      error: `pid ${state.pid} is still running. State file kept. artifacts/ was left in place.`,
    };
  }
  const stopped = { pid: state.pid, port: state.port };
  clearRun();
  return { ok: true, command: "teardown", action: "stopped", ...stopped };
}

async function loadChromium() {
  try {
    const mod = await import("playwright");
    return mod.chromium;
  } catch (error) {
    throw new CliError(
      `Could not load playwright. From the repo root run pnpm install. ${error.message}`,
    );
  }
}

async function readTheme(page) {
  return page.evaluate(() => {
    const root = document.documentElement;
    if (root.classList.contains("dark")) return "dark";
    if (root.classList.contains("light")) return "light";
    return "unknown";
  });
}

function themeMissingMessage(before, requested) {
  const target = requested ? `theme "${requested}"` : "a theme change";
  return `Cannot reach ${target} from "${before}". No button named "Toggle theme" is on the page. Refusing to add the dark class from script.`;
}

async function applyTheme(page, theme) {
  const before = await readTheme(page);
  if (!theme || before === theme) {
    return {
      theme: before,
      requested: theme,
      via: theme ? "already" : "current",
    };
  }
  const button = page.getByRole("button", { name: "Toggle theme", exact: true });
  if ((await button.count()) === 0) {
    throw new CliError(themeMissingMessage(before, theme), {
      before,
      requested: theme,
    });
  }
  await button.click();
  try {
    await page.waitForFunction(
      (expected) => document.documentElement.classList.contains(expected),
      theme,
      { timeout: 3000 },
    );
  } catch {
    const after = await readTheme(page);
    throw new CliError(
      `Clicked "Toggle theme" but the html class is "${after}", not "${theme}".`,
      { before, after, requested: theme },
    );
  }
  return { theme, requested: theme, via: "toggle", before };
}

async function withBrowser(route, theme, fn, options = {}) {
  await requireReady();
  const state = readState();
  const chromium = await loadChromium();
  let browser;
  try {
    browser = await chromium.launch({
      headless: true,
      args: ["--disable-dev-shm-usage"],
    });
  } catch (error) {
    throw new CliError(
      `Could not launch Chromium. ${error.message} From the repo root run: pnpm exec playwright install chromium`,
    );
  }
  try {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      baseURL: state.url,
    });
    const page = await context.newPage();
    page.setDefaultNavigationTimeout(60000);
    let traceStarted = false;
    if (options.tracePath) {
      await context.tracing.start({ screenshots: true, snapshots: true });
      traceStarted = true;
    }
    try {
      const response = await page.goto(route, { waitUntil: "domcontentloaded" });
      const status = response ? response.status() : 0;
      if (!response || status >= 400) {
        throw new CliError(`GET ${route} returned ${status || "no response"}.`);
      }
      const themeResult = await applyTheme(page, theme);
      await page.evaluate(async () => {
        const deadline = performance.now() + 2000;
        const fadingDots = () =>
          [...document.querySelectorAll("svg circle")].some((circle) => {
            const opacity = Number(circle.getAttribute("opacity"));
            return Number.isFinite(opacity) && opacity < 0.99;
          });
        while (fadingDots() && performance.now() < deadline) {
          await new Promise((resolve) => requestAnimationFrame(resolve));
        }
      });
      let loadState = "domcontentloaded";
      if (options.waitForLoad) {
        try {
          await page.waitForLoadState("load", { timeout: 20000 });
          loadState = "load";
        } catch {
          loadState = "load timed out after 20s";
        }
      }
      return await fn({ page, state, status, themeResult, loadState });
    } finally {
      if (traceStarted) {
        await context.tracing.stop({ path: options.tracePath }).catch(() => {});
      }
    }
  } finally {
    await browser.close();
  }
}

async function screenshot(positionals, flags) {
  const route = requireOneRoute("screenshot", positionals);
  const theme = parseTheme(flags.theme, true);
  const out = resolveOut(
    flags.out,
    path.join(artifactsDir, `${routeSlug(route)}-${theme}.png`),
  );
  const fullPage = flags["full-page"] === true || flags["full-page"] === "true";
  return withBrowser(route, theme, async ({ page, status, themeResult }) => {
    await page.screenshot({ path: out, fullPage });
    return {
      ok: true,
      command: "screenshot",
      route,
      status,
      theme: themeResult,
      path: out,
      bytes: fs.statSync(out).size,
      fullPage,
    };
  });
}

async function snapshot(positionals, flags) {
  const route = requireOneRoute("snapshot", positionals);
  const theme = parseTheme(flags.theme, false);
  const out = resolveOut(
    flags.out,
    path.join(artifactsDir, `snapshot-${routeSlug(route)}.yml`),
  );
  return withBrowser(route, theme, async ({ page, status, themeResult }) => {
    const tree = await page.locator("body").ariaSnapshot();
    fs.writeFileSync(out, tree.endsWith("\n") ? tree : `${tree}\n`);
    return {
      ok: true,
      command: "snapshot",
      route,
      status,
      theme: themeResult,
      path: out,
      bytes: fs.statSync(out).size,
    };
  });
}

async function toggleTheme(flags) {
  if (flags.route === true) throw new CliError("--route needs a path.");
  const route = flags.route ? parseRoute(flags.route) : "/";
  return withBrowser(route, null, async ({ page, status }) => {
    const before = await readTheme(page);
    const button = page.getByRole("button", {
      name: "Toggle theme",
      exact: true,
    });
    if ((await button.count()) === 0) {
      throw new CliError(themeMissingMessage(before, null), { route, before });
    }
    await button.click();
    const after = await readTheme(page);
    return { ok: true, command: "toggle-theme", route, status, before, after };
  });
}

function tagAttr(tag, name) {
  const match = tag.match(
    new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, "i"),
  );
  return match ? match[1] ?? match[2] ?? match[3] ?? null : null;
}

function decodeEntities(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function metaContent(html, key) {
  const tags = html.match(/<meta\b[^>]*>/gi) ?? [];
  for (const tag of tags) {
    const prop = tagAttr(tag, "property") || tagAttr(tag, "name");
    if (prop === key) {
      const content = tagAttr(tag, "content");
      return content === null ? null : decodeEntities(content);
    }
  }
  return null;
}

function advertisedFeeds(html, origin) {
  const tags = html.match(/<link\b[^>]*>/gi) ?? [];
  const feeds = [];
  for (const tag of tags) {
    const rel = tagAttr(tag, "rel") ?? "";
    const type = tagAttr(tag, "type") ?? "";
    const href = tagAttr(tag, "href");
    if (!href || !/alternate/i.test(rel) || !/rss|atom|xml/i.test(type)) continue;
    feeds.push(new URL(href, origin).toString());
  }
  return feeds;
}

function extractHrefs(html) {
  const hrefs = [];
  const re = /<a\b[^>]*\bhref\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/gi;
  for (const match of html.matchAll(re)) {
    hrefs.push(match[1] ?? match[2] ?? match[3]);
  }
  return hrefs;
}

function classifyHref(raw, pageUrl, origin) {
  if (
    !raw ||
    raw.startsWith("#") ||
    raw.startsWith("mailto:") ||
    raw.startsWith("tel:") ||
    raw.startsWith("javascript:")
  ) {
    return { kind: "skip" };
  }
  let url;
  try {
    url = new URL(raw, pageUrl);
  } catch {
    return { kind: "skip" };
  }
  if (url.origin !== origin && url.origin !== productionOrigin) {
    url.hash = "";
    return { kind: "external", url: url.toString() };
  }
  const local = new URL(`${url.pathname}${url.search}`, origin);
  return { kind: "internal", url: local.toString() };
}

function parseLocs(xml) {
  return [...xml.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/g)].map((match) =>
    decodeEntities(match[1].trim()),
  );
}

function toLocal(url, origin) {
  const parsed = new URL(url, origin);
  if (parsed.origin !== origin && parsed.origin !== productionOrigin) return null;
  return new URL(`${parsed.pathname}${parsed.search}`, origin).toString();
}

function looksLikeFeed(contentType, body) {
  const head = body.slice(0, 1500);
  const typed = /rss|atom|xml/i.test(contentType);
  return (
    /^\s*(<\?xml[^>]*>\s*)?<(rss|feed)\b/i.test(head) ||
    (typed && /<(rss|feed)\b/i.test(head))
  );
}

async function requestUrl(url) {
  try {
    const response = await fetch(url, {
      redirect: "follow",
      signal: AbortSignal.timeout(90000),
    });
    const contentType = response.headers.get("content-type") ?? "";
    const textLike =
      contentType === "" ||
      /html|xml|text|json|javascript|svg/.test(contentType);
    const body = textLike ? await response.text() : "";
    return {
      url,
      finalUrl: response.url,
      status: response.status,
      contentType,
      body,
      error: null,
    };
  } catch (error) {
    return {
      url,
      finalUrl: null,
      status: 0,
      contentType: "",
      body: "",
      error: error.name === "TimeoutError" ? "timed out" : error.message,
    };
  }
}

async function mapPool(items, limit, fn) {
  const results = new Array(items.length);
  let cursor = 0;
  async function worker() {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      results[index] = await fn(items[index]);
    }
  }
  const workers = Math.min(limit, items.length);
  await Promise.all(Array.from({ length: workers }, () => worker()));
  return results;
}

function failedFetch(result) {
  if (result.error) return `${result.url} ${result.error}`;
  if (result.status >= 400 || result.status === 0) {
    return `${result.url} returned ${result.status}`;
  }
  return null;
}

async function checkLinks() {
  const report = await requireReady();
  const origin = report.url;
  const sitemapUrl = `${origin}/sitemap.xml`;
  const sitemap = await requestUrl(sitemapUrl);
  const locs = sitemap.status === 200 ? parseLocs(sitemap.body) : [];
  const localLocs = [];
  const externalLocs = [];
  for (const loc of locs) {
    const local = toLocal(loc, origin);
    if (local) localLocs.push(local);
    else externalLocs.push(loc);
  }
  const pages = [...new Set(localLocs)];
  const pageResults = await mapPool(pages, 3, (url) => requestUrl(url));
  const fetched = new Map(pageResults.map((result) => [result.url, result]));
  const internal = new Set(pages);
  const external = new Set();
  for (const result of pageResults) {
    if (!/html/i.test(result.contentType) && !result.body.includes("<a")) continue;
    for (const href of extractHrefs(result.body)) {
      const item = classifyHref(href, result.finalUrl || result.url, origin);
      if (item.kind === "internal") internal.add(item.url);
      if (item.kind === "external") external.add(item.url);
    }
  }
  const extra = [...internal].filter((url) => !fetched.has(url));
  const extraResults = await mapPool(extra, 3, (url) => requestUrl(url));
  for (const result of extraResults) fetched.set(result.url, result);

  const linkFailures = [];
  for (const result of fetched.values()) {
    const failure = failedFetch(result);
    if (failure) linkFailures.push(failure);
  }

  const home = fetched.get(`${origin}/`) ?? (await requestUrl(`${origin}/`));
  const ogTitle = metaContent(home.body, "og:title");
  const ogImageDeclared = metaContent(home.body, "og:image");
  const titleScope = home.body.replace(/<svg\b[\s\S]*?<\/svg>/gi, "");
  const titleMatch = titleScope.match(/<title>([^<]*)<\/title>/i);
  const title = titleMatch ? decodeEntities(titleMatch[1]) : null;
  let ogImageStatus = 0;
  let ogImageContentType = "";
  let ogImagePath = null;
  if (ogImageDeclared) {
    const localImage = toLocal(ogImageDeclared, origin);
    ogImagePath = localImage ? new URL(localImage).pathname : null;
    if (localImage) {
      const image = await requestUrl(localImage);
      ogImageStatus = image.status;
      ogImageContentType = image.contentType;
    }
  }
  const metadataOk = Boolean(
    title?.includes("Robert Crocker") &&
      ogTitle?.includes("Robert Crocker") &&
      ogImageStatus === 200 &&
      /image\//.test(ogImageContentType),
  );

  const feedCandidates = [
    ...advertisedFeeds(home.body, origin),
    ...["/rss.xml", "/feed.xml", "/atom.xml", "/feed", "/rss"].map(
      (feedPath) => `${origin}${feedPath}`,
    ),
  ];
  const tried = [];
  let resolved = null;
  for (const feedUrl of [...new Set(feedCandidates)]) {
    const result = await requestUrl(feedUrl);
    const ok = result.status === 200 && looksLikeFeed(result.contentType, result.body);
    tried.push({
      url: feedUrl,
      status: result.status,
      contentType: result.contentType,
      ok,
      error: result.error,
    });
    if (ok && !resolved) resolved = feedUrl;
  }

  const sitemapOk =
    sitemap.status === 200 && localLocs.length > 0 && externalLocs.length === 0;
  const rssOk = Boolean(resolved);
  const linksOk = linkFailures.length === 0;
  const ok = linksOk && sitemapOk && rssOk && metadataOk;
  const problems = [];
  if (!sitemapOk) {
    problems.push(
      sitemap.status !== 200
        ? `sitemap.xml returned ${sitemap.status}`
        : localLocs.length === 0
          ? "sitemap.xml listed no local URLs"
          : `sitemap.xml listed ${externalLocs.length} URL(s) outside ${productionOrigin}`,
    );
  }
  if (!linksOk) problems.push(`${linkFailures.length} internal link(s) failed`);
  if (!rssOk) problems.push("no RSS or Atom feed resolved");
  if (!metadataOk) problems.push("home metadata or og:image did not resolve");

  return {
    ok,
    command: "check-links",
    error: problems.length ? problems.join(". ") : undefined,
    links: {
      ok: linksOk,
      checked: fetched.size,
      failed: linkFailures,
      externalSkipped: external.size,
    },
    sitemap: {
      ok: sitemapOk,
      url: sitemapUrl,
      status: sitemap.status,
      count: localLocs.length,
      paths: localLocs.map((url) => new URL(url).pathname),
      external: externalLocs,
    },
    rss: { ok: rssOk, resolved, tried },
    metadata: {
      ok: metadataOk,
      title,
      ogTitle,
      ogImageDeclared,
      ogImagePath,
      ogImageStatus,
      ogImageContentType,
    },
  };
}

async function perf(positionals, flags) {
  const route = requireOneRoute("perf", positionals);
  const theme = parseTheme(flags.theme, false);
  const jsonPath = resolveOut(
    flags.out,
    path.join(artifactsDir, `perf-${routeSlug(route)}.json`),
  );
  const tracePath = jsonPath.replace(/\.json$/i, ".zip");
  const result = await withBrowser(
    route,
    theme,
    async ({ page, status, themeResult, loadState }) => {
      const metrics = await page.evaluate(() => {
        const nav = performance.getEntriesByType("navigation")[0];
        if (!nav) return null;
        return {
          durationMs: nav.duration,
          domContentLoadedMs: nav.domContentLoadedEventEnd,
          loadEventEndMs: nav.loadEventEnd,
          responseStatus: nav.responseStatus,
          transferSize: nav.transferSize,
          encodedBodySize: nav.encodedBodySize,
          decodedBodySize: nav.decodedBodySize,
          type: nav.type,
        };
      });
      if (!metrics) {
        throw new CliError(`No navigation timing entry for ${route}.`);
      }
      return {
        ok: true,
        command: "perf",
        route,
        status,
        theme: themeResult,
        loadState,
        sampleCount: 1,
        metrics,
        path: jsonPath,
        trace: tracePath,
        caveat: perfCaveat,
      };
    },
    { tracePath, waitForLoad: true },
  );
  if (!fs.existsSync(tracePath) || fs.statSync(tracePath).size === 0) {
    throw new CliError(`Trace was not written to ${tracePath}.`);
  }
  fs.writeFileSync(jsonPath, `${JSON.stringify(result, null, 2)}\n`);
  return result;
}

async function main() {
  const parsed = parseArgv(process.argv);
  if (parsed.command === "help" || parsed.flags.help) {
    printHelp(parsed.command === "help" ? null : parsed.command);
  }
  if (!commands[parsed.command]) {
    throw new CliError(`Unknown command "${parsed.command}". Run --help.`);
  }
  rejectUnknown(parsed.command, parsed.flags);
  if (parsed.positionals.length && !["screenshot", "snapshot", "perf"].includes(parsed.command)) {
    throw new CliError(
      `${parsed.command} does not take a positional argument. Run ${parsed.command} --help.`,
    );
  }
  const runners = {
    launch: () => launch(parsed.flags),
    teardown: () => teardown(),
    doctor: () => doctorReport(),
    screenshot: () => screenshot(parsed.positionals, parsed.flags),
    snapshot: () => snapshot(parsed.positionals, parsed.flags),
    "toggle-theme": () => toggleTheme(parsed.flags),
    "check-links": () => checkLinks(),
    perf: () => perf(parsed.positionals, parsed.flags),
  };
  const run = runners[parsed.command];
  if (!run) throw new CliError(`No runner for ${parsed.command}.`);
  const result = await run();
  emit(result, result.ok ? 0 : 1);
}

main().catch((error) => {
  const command = parseArgv(process.argv).command;
  const payload = {
    ok: false,
    command,
    error: error.message,
  };
  if (error instanceof CliError) Object.assign(payload, error.extra);
  emit(payload, 1);
});

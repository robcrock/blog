#!/usr/bin/env node
/**
 * Driver for Figma Console MCP design-system extraction modules.
 * Mirrors the figma_ds_* Local Mode tool sequence without requiring MCP mid-session.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = resolve(
  fileURLToPath(new URL(".", import.meta.url)),
  "../../",
);
const OUT_DIR = join(ROOT, "design-system");
const PKG = join(
  fileURLToPath(new URL(".", import.meta.url)),
  "node_modules/figma-console-mcp/dist/core",
);

const {
  analyzeTargets,
  extractionDir,
  initStatusManifest,
  readManifest,
  resolveTargetPath,
  writeManifest,
} = await import(pathToFileURL(join(PKG, "extraction/analyzer.js")).href);
const { extractTokens } = await import(
  pathToFileURL(join(PKG, "extraction/token-extractor.js")).href
);
const { walkFiles } = await import(
  pathToFileURL(join(PKG, "extraction/walker.js")).href
);
const { scaffoldDesignSystem, generateStoryScaffold } = await import(
  pathToFileURL(join(PKG, "extraction/scaffolder.js")).href
);
const { format } = await import(
  pathToFileURL(join(PKG, "tokens/formatters/index.js")).href
);
const { verifyExtraction } = await import(
  pathToFileURL(join(PKG, "extraction/verifier.js")).href
);

const step = process.argv[2] ?? "analyze";
const exclude = [
  "public/lab/",
  "dialkit/",
  ".storybook/",
  "src/features/lab/sandboxes",
  "scripts/ds-extract/",
  "design-system/",
  "codesandboxes/",
  "content/",
];

function loadAnalysis() {
  const path = join(extractionDir(OUT_DIR), "analysis.json");
  const analysis = readManifest(path);
  if (!analysis) throw new Error(`No analysis at ${path}`);
  return analysis;
}

async function analyze() {
  const roots = [resolveTargetPath(ROOT)];
  const analysis = analyzeTargets(roots, {
    outDir: OUT_DIR,
    exclude,
    maxFiles: 5000,
  });
  const manifestPath = join(extractionDir(OUT_DIR), "analysis.json");
  writeManifest(manifestPath, analysis);
  const statusPath = join(extractionDir(OUT_DIR), "status.json");
  if (!existsSync(statusPath)) {
    writeManifest(statusPath, initStatusManifest(analysis));
  }
  const portable = analysis.components.filter(
    (c) => c.classification !== "pure-vendor",
  );
  const summary = {
    manifestPath,
    outDir: OUT_DIR,
    inventory: {
      totalComponents: analysis.components.length,
      portable: portable.length,
      byClassification: analysis.components.reduce((acc, c) => {
        acc[c.classification] = (acc[c.classification] ?? 0) + 1;
        return acc;
      }, {}),
      topByUsage: analysis.components.slice(0, 25).map((c) => ({
        name: c.name,
        file: c.file,
        classification: c.classification,
        usage: c.usage.tagCount + c.usage.importCount,
      })),
    },
    architecture: analysis.architecture
      ? {
          summary: analysis.architecture.summary,
          missingPrimitives: analysis.architecture.missingPrimitives,
          specializations: analysis.architecture.specializations.slice(0, 20),
        }
      : undefined,
    targets: analysis.targets.map((t) => ({
      frameworks: t.frameworks,
      stylingMethods: t.stylingMethods,
      componentLibraries: t.componentLibraries?.map((l) => l.name),
    })),
  };
  console.log(JSON.stringify(summary, null, 2));
}

async function tokens() {
  const analysis = loadAnalysis();
  const roots = analysis.targets.map((t) => t.root);
  const files = roots.flatMap(
    (root) =>
      walkFiles(root, {
        extensions: [
          ".css",
          ".scss",
          ".sass",
          ".less",
          ".tsx",
          ".jsx",
          ".ts",
          ".js",
          ".cjs",
          ".mjs",
        ],
        exclude,
      }).files,
  );
  const extraction = extractTokens(files, {
    minFrequency: 4,
    targetRoots: roots,
  });
  const formats = ["dtcg", "css-vars", "tailwind-v3"];
  const filenames = {
    dtcg: "tokens/tokens.json",
    "css-vars": "tokens/tokens.css",
    "tailwind-v3": "tokens/tailwind.tokens.js",
  };
  const report = {
    version: 1,
    generatedAt: new Date().toISOString(),
    counts: extraction.counts,
    warnings: extraction.warnings,
    belowThreshold: extraction.belowThreshold,
    filesWritten: [],
  };
  for (const f of formats) {
    const res = format(extraction.document, {
      target: { format: f, filename: filenames[f], dtcgDialect: "legacy" },
      projectRoot: OUT_DIR,
    });
    report.warnings.push(...res.warnings);
    for (const file of res.files) {
      const abs = join(OUT_DIR, file.path);
      mkdirSync(dirname(abs), { recursive: true });
      writeFileSync(abs, file.content, "utf-8");
      report.filesWritten.push(abs);
    }
  }
  writeManifest(join(extractionDir(OUT_DIR), "tokens-report.json"), report);
  const modeNames = (extraction.document.sets[0]?.modes ?? ["Default"])
    .map((m) => m.toLowerCase())
    .filter((m) => m !== "default");
  if (modeNames.length > 1) {
    writeManifest(join(extractionDir(OUT_DIR), "tokens-modes.json"), modeNames);
  }
  console.log(
    JSON.stringify(
      {
        counts: extraction.counts,
        sets: extraction.document.sets.map((s) => ({
          name: s.name,
          modes: s.modes,
          tokens: s.tokens.length,
        })),
        warnings: extraction.warnings.slice(0, 20),
        belowThresholdSample: extraction.belowThreshold.slice(0, 15),
        filesWritten: report.filesWritten,
      },
      null,
      2,
    ),
  );
}

async function scaffold() {
  const analysis = loadAnalysis();
  const tokensPath = join(OUT_DIR, "tokens/tokens.json");
  if (!existsSync(tokensPath)) throw new Error("Run tokens first");
  const { parseDtcg } = await import(
    pathToFileURL(join(PKG, "tokens/parsers/dtcg.js")).href
  );
  const { document } = parseDtcg({
    payload: readFileSync(tokensPath, "utf-8"),
    sourcePath: tokensPath,
  });
  const result = scaffoldDesignSystem(analysis, document, {
    outDir: OUT_DIR,
    packageName: "@robcrock/design-system",
    framework: "react",
    formats: ["dtcg", "css-vars", "tailwind-v3"],
    dtcgDialect: "legacy",
    force: false,
  });
  console.log(JSON.stringify(result, null, 2));
}

async function setupStorybook() {
  const analysis = loadAnalysis();
  const { setupStorybookPreset } = await import(
    pathToFileURL(join(PKG, "extraction/storybook-preset.js")).href
  );
  const result = setupStorybookPreset(analysis, OUT_DIR);
  console.log(JSON.stringify(result, null, 2));
}

async function extractComponent(name) {
  const analysis = loadAnalysis();
  const matches = analysis.components.filter(
    (c) => c.name.toLowerCase() === name.toLowerCase(),
  );
  if (!matches.length) {
    const near = analysis.components
      .filter((c) => c.name.toLowerCase().includes(name.toLowerCase()))
      .slice(0, 10)
      .map((c) => c.name);
    throw new Error(
      `Component "${name}" not found. Near: ${near.join(", ") || "(none)"}`,
    );
  }
  const entry = matches.find((c) => c.classification !== "pure-vendor") ?? matches[0];
  if (entry.classification === "pure-vendor" || !entry.file) {
    console.log(JSON.stringify({ component: entry, portable: false }, null, 2));
    return;
  }
  const root = analysis.targets[entry.targetIndex]?.root;
  const absFile = join(root, entry.file);
  let source = readFileSync(absFile, "utf-8");
  const story = generateStoryScaffold(entry);
  console.log(
    JSON.stringify(
      {
        component: entry.name,
        file: entry.file,
        absFile,
        classification: entry.classification,
        props: entry.props,
        observedVariants: entry.observedVariants,
        sourceLength: source.length,
        story,
      },
      null,
      2,
    ),
  );
  // Write porting manifest for the agent
  const portDir = join(extractionDir(OUT_DIR), "porting");
  mkdirSync(portDir, { recursive: true });
  writeFileSync(join(portDir, `${entry.name}.source.tsx`), source);
  writeFileSync(join(portDir, `${entry.name}.story.txt`), story);
  writeFileSync(
    join(portDir, `${entry.name}.meta.json`),
    JSON.stringify(entry, null, 2),
  );
}

async function status(update) {
  const statusPath = join(extractionDir(OUT_DIR), "status.json");
  let status = readManifest(statusPath);
  if (!status) throw new Error("No status.json");
  if (update) {
    const [component, st, notes, storyFile] = update;
    const item = status.components.find(
      (c) => c.component.toLowerCase() === component.toLowerCase(),
    );
    if (item) {
      item.status = st;
      if (notes) item.notes = notes;
      if (storyFile) item.storyFile = storyFile;
      item.updatedAt = new Date().toISOString();
    } else {
      status.components.push({
        component,
        status: st,
        notes,
        storyFile,
        updatedAt: new Date().toISOString(),
      });
    }
    writeManifest(statusPath, status);
  }
  const counts = status.components.reduce((acc, c) => {
    acc[c.status] = (acc[c.status] ?? 0) + 1;
    return acc;
  }, {});
  console.log(
    JSON.stringify(
      {
        counts,
        remaining: status.components
          .filter((c) => c.status === "pending" || c.status === "in-progress")
          .slice(0, 30)
          .map((c) => c.component),
      },
      null,
      2,
    ),
  );
}

async function verify() {
  const analysis = loadAnalysis();
  const status = readManifest(join(extractionDir(OUT_DIR), "status.json"));
  const result = await verifyExtraction(OUT_DIR, analysis, status);
  console.log(JSON.stringify(result, null, 2));
}

const commands = {
  analyze,
  tokens,
  scaffold,
  "setup-storybook": setupStorybook,
  component: () => extractComponent(process.argv[3]),
  status: () =>
    status(
      process.argv[3]
        ? [process.argv[3], process.argv[4], process.argv[5], process.argv[6]]
        : null,
    ),
  verify,
};

if (!commands[step]) {
  console.error(
    `Unknown step: ${step}. Use: ${Object.keys(commands).join(", ")}`,
  );
  process.exit(1);
}
await commands[step]();

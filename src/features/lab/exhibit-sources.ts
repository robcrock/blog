import { readFileSync } from "node:fs";
import path from "node:path";

import { codeToHtml } from "shiki";

import { SHIKI_THEMES } from "@/shared/lib/shiki-themes";

import sandboxSources from "./generated/sandbox-sources.json";
import type { Exhibit } from "./registry";

export interface HighlightedFile {
  /** Display name shown on the tab, e.g. "index.js" */
  name: string;
  /** Raw source for the copy button */
  code: string;
  /** Shiki-rendered HTML (dual high-contrast GitHub themes) */
  html: string;
}

interface RawFile {
  name: string;
  language: string;
  code: string;
}

const EXT_LANGUAGES: Record<string, string> = {
  html: "html",
  js: "js",
  jsx: "jsx",
  ts: "ts",
  tsx: "tsx",
  css: "css",
};

function rawFilesFor(exhibit: Exhibit): RawFile[] {
  if (exhibit.sourceFiles) {
    return exhibit.sourceFiles.map((repoPath) => ({
      name: path.basename(repoPath),
      language: EXT_LANGUAGES[repoPath.split(".").pop() ?? ""] ?? "txt",
      code: readFileSync(path.join(process.cwd(), repoPath), "utf8").trim(),
    }));
  }

  const fromManifest = (
    sandboxSources as Record<string, RawFile[] | undefined>
  )[exhibit.slug];
  return fromManifest ?? [];
}

/** Build-time: read an exhibit's sources and highlight them with Shiki */
export async function highlightedSourcesFor(
  exhibit: Exhibit
): Promise<HighlightedFile[]> {
  const files = rawFilesFor(exhibit);

  return Promise.all(
    files.map(async (file) => ({
      name: file.name,
      code: file.code,
      html: await codeToHtml(file.code, {
        lang: file.language,
        themes: SHIKI_THEMES,
        defaultColor: "light",
      }),
    }))
  );
}

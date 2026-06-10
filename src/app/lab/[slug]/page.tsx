import { notFound } from "next/navigation";
import { Link } from "next-view-transitions";

import { ArrowUpRight } from "lucide-react";

import { CHAPTERS, EXHIBITS } from "@/features/lab";
import { ExhibitCode } from "@/features/lab/exhibit-code";
import { highlightedSourcesFor } from "@/features/lab/exhibit-sources";
import { SandboxFrame } from "@/features/lab/sandbox-frame";
import Container from "@/shared/layout/container";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return EXHIBITS.map((exhibit) => ({ slug: exhibit.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const exhibit = EXHIBITS.find((e) => e.slug === slug);
  if (!exhibit) return {};

  return {
    title: `${exhibit.title} | Lab`,
    description: exhibit.description,
  };
}

export default async function ExhibitPage({ params }: PageProps) {
  const { slug } = await params;
  const index = EXHIBITS.findIndex((e) => e.slug === slug);
  if (index === -1) notFound();

  const exhibit = EXHIBITS[index];
  const chapter = CHAPTERS.find((c) => c.id === exhibit.chapter);
  const prev = EXHIBITS[index - 1];
  const next = EXHIBITS[index + 1];

  const files = await highlightedSourcesFor(exhibit);
  const { Component, src } = exhibit;

  return (
    <Container className="pt-8 pb-20">
      <header className="mb-8">
        <Link
          href="/lab"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          ← Back to the lab
        </Link>

        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h1 className="flex items-baseline gap-3 text-balance text-3xl font-bold tracking-tighter sm:text-4xl">
            <span className="font-mono text-sm font-normal text-muted-foreground tabular-nums">
              {exhibit.number}
            </span>
            {exhibit.title}
          </h1>
          <p className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
            {chapter ? `${chapter.numeral} · ${chapter.title}` : null}
          </p>
        </div>

        <p className="mt-3 max-w-2xl text-pretty text-lg text-muted-foreground">
          {exhibit.description}
        </p>
      </header>

      {/* Live canvas */}
      <div className="overflow-hidden rounded-sm border border-border bg-card">
        <div
          className="relative h-[420px] overflow-hidden sm:h-[480px]"
          style={{ viewTransitionName: `lab-canvas-${exhibit.slug}` }}
        >
          {Component ? (
            <Component />
          ) : src ? (
            <SandboxFrame src={src} title={exhibit.title} />
          ) : null}
        </div>
        {exhibit.hint && (
          <div className="flex justify-end border-t border-border px-4 py-2">
            <span className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
              {exhibit.hint}
            </span>
          </div>
        )}
      </div>

      {/* Source code */}
      {files.length > 0 && (
        <section aria-label="Source code" className="mt-10">
          <div className="mb-4 flex items-baseline gap-4">
            <h2 className="text-lg font-medium">Source</h2>
            <div className="h-px flex-1 self-center bg-border" />
            <span className="font-mono text-[11px] text-muted-foreground tabular-nums">
              {files.length} {files.length === 1 ? "file" : "files"}
            </span>
          </div>
          <ExhibitCode files={files} />
        </section>
      )}

      {exhibit.essayHref && (
        <p className="mt-8 text-sm text-muted-foreground">
          This study grew into a long-form write-up —{" "}
          <Link
            href={exhibit.essayHref}
            className="inline-flex items-center gap-0.5 font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
          >
            read the essay
            <ArrowUpRight aria-hidden className="size-3.5" />
          </Link>
          .
        </p>
      )}

      {/* Prev / next specimen */}
      <nav
        aria-label="Specimen navigation"
        className="mt-12 flex items-stretch justify-between gap-4 border-t border-border pt-6"
      >
        {prev ? (
          <Link
            href={`/lab/${prev.slug}`}
            className="group min-w-0 text-left transition-colors hover:text-primary"
          >
            <span className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
              ← {prev.number}
            </span>
            <span className="mt-0.5 block truncate text-sm font-medium">
              {prev.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/lab/${next.slug}`}
            className="group min-w-0 text-right transition-colors hover:text-primary"
          >
            <span className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
              {next.number} →
            </span>
            <span className="mt-0.5 block truncate text-sm font-medium">
              {next.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </Container>
  );
}

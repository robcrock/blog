import { notFound } from "next/navigation";
import { Link } from "next-view-transitions";

import { ArrowUpRight, Github } from "lucide-react";

import { SandboxFrame } from "@/features/lab/sandbox-frame";
import { PROJECTS } from "@/shared/lib/constants";
import Container from "@/shared/layout/container";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return {};

  return {
    title: `${project.title} | Work`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const index = PROJECTS.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = PROJECTS[index];
  const prev = PROJECTS[index - 1];
  const next = PROJECTS[index + 1];

  return (
    <Container className="pt-8 pb-20">
      <header className="mb-8">
        <Link
          href="/#projects"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          ← Back to work
        </Link>

        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h1 className="text-balance text-3xl font-bold tracking-tighter sm:text-4xl">
            {project.title}
          </h1>
          <div className="flex flex-wrap items-center gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wide text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <p className="mt-3 max-w-2xl text-pretty text-lg text-muted-foreground">
          {project.description}
        </p>
      </header>

      {/* Live embed of the deployed site */}
      <div className="overflow-hidden rounded-sm border border-border bg-card">
        <div
          className="relative h-[480px] overflow-hidden sm:h-[620px]"
          style={{ viewTransitionName: `projects-canvas-${project.slug}` }}
        >
          <SandboxFrame
            src={project.liveUrl}
            title={project.title}
            scale={0.55}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
          />
        </div>
        <div className="flex items-center justify-between gap-4 border-t border-border px-4 py-2">
          <span className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
            Live preview
          </span>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-medium text-foreground transition-colors hover:text-primary"
          >
            Open full site
            <ArrowUpRight aria-hidden className="size-3.5" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
      </div>

      {project.repoUrl && (
        <p className="mt-6 text-sm text-muted-foreground">
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
          >
            <Github aria-hidden className="size-3.5" />
            View source on GitHub
          </a>
        </p>
      )}

      {/* Prev / next project */}
      <nav
        aria-label="Project navigation"
        className="mt-12 flex items-stretch justify-between gap-4 border-t border-border pt-6"
      >
        {prev ? (
          <Link
            href={`/projects/${prev.slug}`}
            className="group min-w-0 text-left transition-colors hover:text-primary"
          >
            <span className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
              ← Previous
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
            href={`/projects/${next.slug}`}
            className="group min-w-0 text-right transition-colors hover:text-primary"
          >
            <span className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
              Next →
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

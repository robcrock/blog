import Container from "@/shared/layout/container";
import { MDXContent } from "@/components/mdx-content";
import type { Craft } from "contentlayer/generated";
import { format } from "date-fns";
import Link from "next/link";

interface CraftDetailPageProps {
  craft: Craft;
  prevCraft: Craft | null;
  nextCraft: Craft | null;
}

export function CraftDetailPage({
  craft,
  prevCraft,
  nextCraft,
}: CraftDetailPageProps) {
  return (
    <Container className="pt-8 pb-20 space-y-4">
      {/* Back Navigation */}
      <Link
        href="/craft"
        className="inline-flex gap-2 items-center text-sm font-medium transition-colors text-muted-foreground hover:text-primary"
      >
        ← All craft
      </Link>

      <article className="grid grid-cols-[1fr_min(700px,100%)_1fr] w-full max-w-[860px] mx-auto mb-10">
        {/* Craft Header */}
        <header className="col-span-3 mb-8 md:col-start-2 md:col-span-1">
          <div className="flex flex-wrap gap-4 items-center mb-4 text-sm font-medium text-muted-foreground">
            <time dateTime={craft.date}>
              {format(new Date(craft.date), "MMMM d, yyyy")}
            </time>
            <span>•</span>
            <span>{craft.readingTime} min read</span>
            {craft.tags && craft.tags.length > 0 && (
              <>
                <span>•</span>
                <div className="flex flex-wrap gap-1.5">
                  {craft.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-xs rounded bg-secondary text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
          <h1 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-6xl">
            {craft.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {craft.description}
          </p>
        </header>

        {/* Craft Content - MDX with embedded interactive components */}
        <MDXContent code={craft.body.code} />

        {/* Craft Footer - Prev/Next Navigation */}
        <footer className="col-span-3 pt-8 mt-16 border-t md:col-start-2 md:col-span-1 border-border">
          <nav className="flex gap-4 justify-between items-start">
            {/* Previous */}
            <div className="flex-1">
              {prevCraft ? (
                <Link
                  href={prevCraft.url}
                  className="block p-4 -m-4 rounded-lg transition-colors group hover:bg-muted/50"
                >
                  <span className="text-sm text-muted-foreground">
                    ← Previous
                  </span>
                  <span className="block mt-1 font-medium transition-colors group-hover:text-primary">
                    {prevCraft.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}
            </div>

            {/* Next */}
            <div className="flex-1 text-right">
              {nextCraft ? (
                <Link
                  href={nextCraft.url}
                  className="block p-4 -m-4 rounded-lg transition-colors group hover:bg-muted/50"
                >
                  <span className="text-sm text-muted-foreground">Next →</span>
                  <span className="block mt-1 font-medium transition-colors group-hover:text-primary">
                    {nextCraft.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </nav>
        </footer>
      </article>
    </Container>
  );
}

// src/app/craft/[slug]/page.tsx
import Container from "@/components/layout/container";
import { MDXContent } from "@/components/mdx-content";
import { allCrafts } from "contentlayer/generated";
import { compareDesc, format } from "date-fns";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface CraftPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all craft pieces
export async function generateStaticParams() {
  return allCrafts
    .filter((craft) => craft.published)
    .map((craft) => ({
      slug: craft.slug,
    }));
}

// Generate metadata for each craft piece
export async function generateMetadata({
  params,
}: CraftPageProps): Promise<Metadata> {
  const { slug } = await params;
  const craft = allCrafts.find((c) => c.slug === slug);

  if (!craft) {
    return {
      title: "Craft Not Found",
    };
  }

  return {
    title: `${craft.title} | Craft | Robert Crocker`,
    description: craft.description,
  };
}

export default async function CraftDetailPage({ params }: CraftPageProps) {
  const { slug } = await params;

  // Get all published crafts sorted by date
  const sortedCrafts = allCrafts
    .filter((c) => c.published)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  const craftIndex = sortedCrafts.findIndex((c) => c.slug === slug);
  const craft = sortedCrafts[craftIndex];

  if (!craft) {
    notFound();
  }

  // Get prev/next for navigation
  const prevCraft =
    craftIndex < sortedCrafts.length - 1 ? sortedCrafts[craftIndex + 1] : null;
  const nextCraft = craftIndex > 0 ? sortedCrafts[craftIndex - 1] : null;

  return (
    <Container className="space-y-4 md:mb-8">
      {/* Back Navigation */}
      <Link
        href="/craft"
        className="inline-flex gap-2 items-center text-sm font-medium transition-colors text-muted-foreground hover:text-primary"
      >
        ← All craft
      </Link>

      <article className="grid grid-cols-[1fr_min(700px,100%)_1fr] w-full max-w-5xl mx-auto px-6 md:px-12 mb-10">
        {/* Craft Header */}
        <header className="col-start-2 mb-8">
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
        <footer className="col-start-2 pt-8 mt-16 border-t border-border">
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

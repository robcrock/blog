// src/app/posts/[slug]/page.tsx
import Container from "@/components/layout/container";
import { MDXContent } from "@/components/mdx-content";
import { allPosts } from "contentlayer/generated";
import { format } from "date-fns";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all posts
export async function generateStaticParams() {
  return allPosts
    .filter((post) => post.published)
    .map((post) => ({
      slug: post.slug,
    }));
}

// Generate metadata for each post
export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = allPosts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | Robert Crocker`,
    description: post.description,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = allPosts.find((p) => p.slug === slug && p.published);

  if (!post) {
    notFound();
  }

  return (
    <Container className="space-y-4 md:mb-8">
      {/* Back Navigation - matches Container from posts page */}
      <Link
        href="/posts"
        className="inline-flex gap-2 items-center text-sm font-medium transition-colors text-muted-foreground hover:text-primary"
      >
        ← All posts
      </Link>
      <article className="grid grid-cols-[1fr_min(700px,100%)_1fr] w-full max-w-5xl mx-auto px-6 md:px-12 mb-10">
        {/* Post Header */}
        <header className="col-start-2 mb-12">
          <div className="flex gap-4 items-center mb-4 text-sm font-medium text-muted-foreground">
            <span className="tracking-wide uppercase">{post.topic}</span>
            <span>•</span>
            <time dateTime={post.date}>
              {format(new Date(post.date), "MMMM d, yyyy")}
            </time>
            <span>•</span>
            <span>{post.readingTime} min read</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-6xl">
            {post.title}
          </h1>
        </header>

        {/* Post Content */}
        <MDXContent code={post.body.code} />

        {/* Post Footer */}
        <footer className="col-start-2 pt-8 mt-16 border-t border-border">
          <Link
            href="/posts"
            className="inline-flex gap-2 items-center text-sm font-medium transition-colors text-muted-foreground hover:text-primary"
          >
            ← Back to all posts
          </Link>
        </footer>
      </article>
    </Container>
  );
}

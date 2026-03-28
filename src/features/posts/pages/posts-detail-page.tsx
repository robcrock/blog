import Container from "@/shared/layout/container";
import { MDXContent } from "@/features/posts/mdx-content";
import type { Post } from "contentlayer/generated";
import { format } from "date-fns";
import Link from "next/link";

interface PostsDetailPageProps {
  post: Post;
}

export function PostsDetailPage({ post }: PostsDetailPageProps) {
  return (
    <Container className="pt-8 pb-20 space-y-4">
      {/* Back Navigation - matches Container from posts page */}
      <Link
        href="/posts"
        className="inline-flex gap-2 items-center text-sm font-medium transition-colors text-muted-foreground hover:text-primary"
      >
        ← All posts
      </Link>
      <article className="grid grid-cols-[1fr_min(700px,100%)_1fr] w-full max-w-[860px] mx-auto mb-10">
        {/* Post Header */}
        <header className="col-span-3 md:col-start-2 md:col-span-1 mb-12">
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
        <footer className="col-span-3 md:col-start-2 md:col-span-1 pt-8 mt-16 border-t border-border">
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

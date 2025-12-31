// src/app/posts/page.tsx
import Container from "@/components/layout/container";
import { allPosts } from "contentlayer/generated";
import { compareDesc, format } from "date-fns";
import Link from "next/link";

export const metadata = {
  title: "Posts | Robert Crocker",
  description:
    "Thoughts on frontend development, design, and building great user interfaces.",
};

export default function PostsPage() {
  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  return (
    <Container>
      {/* Page Header */}
      <header className="mb-4 md:mb-8">
        <Link
          href="/#posts"
          className="inline-flex gap-2 items-center mb-6 text-sm font-medium transition-colors text-muted-foreground hover:text-primary"
        >
          ← Back to home
        </Link>
        <h1 className="mb-6 text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Posts
        </h1>
        <div className="max-w-2xl text-muted-foreground">
          <p className="text-lg">
            Thoughts on frontend development, CSS tricks, and lessons learned
            from building user interfaces.
          </p>
        </div>
      </header>

      {/* Posts List */}
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={post.url}
              className="flex flex-col px-8 py-6 rounded-lg border hover:bg-zinc-50 dark:hover:bg-zinc-800/30 hover:shadow hover:border-primary"
              prefetch={true}
            >
              <div className="flex justify-between mb-6 text-sm font-medium text-muted-foreground">
                <span className="tracking-wide">{post.topic}</span>
                <div className="flex gap-3 items-center">
                  <span>{post.readingTime} min</span>
                  <span>{format(new Date(post.date), "MMM d, y")}</span>
                </div>
              </div>
              <div className="text-2xl font-semibold">{post.title}</div>
              {post.description && (
                <p className="text-base text-muted-foreground">
                  {post.description}
                </p>
              )}
            </Link>
          </li>
        ))}
      </ul>

      {posts.length === 0 && (
        <div className="py-12 text-center text-muted-foreground">
          <p>No posts yet. Check back soon!</p>
        </div>
      )}
    </Container>
  );
}

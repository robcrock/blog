// src/components/sections/home/posts-section.tsx
import { allPosts } from "contentlayer/generated";
import { compareDesc, format } from "date-fns";
import Link from "next/link";

export default function PostsSection() {
  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .slice(0, 5); // Show only the 5 most recent

  if (posts.length === 0) {
    return null;
  }

  return (
    <section id="posts" className="scroll-mt-[72px] mb-20">
      {/* Section Header */}
      <div className="flex gap-4 items-center mb-2">
        <h2 className="text-lg whitespace-nowrap pointer-events-none">
          POSTS
        </h2>
        <div className="flex-1 h-px bg-border" />
        <Link
          href="/posts"
          className="text-sm font-medium whitespace-nowrap transition-colors text-muted-foreground hover:text-primary"
        >
          See all
        </Link>
      </div>

      {/* Section Description */}
      <p className="mb-6 text-sm text-muted-foreground">
        Thoughts on frontend development, CSS, and building great interfaces.
      </p>

      {/* Posts List */}
      <ul className="space-y-2">
        {posts.map((post, index) => (
          <li key={post.slug}>
            <Link
              href={post.url}
              className="block px-4 py-4 rounded-lg border ring-offset-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary hover:border-primary"
            >
              <div className="flex gap-6 justify-between items-start">
                <div className="flex flex-1 gap-4 items-start min-w-0">
                  <span className="text-sm font-medium whitespace-nowrap text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="mb-1 text-lg font-semibold">{post.title}</h3>
                    <p className="text-sm font-medium text-muted-foreground">
                      {post.topic}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-1 items-end text-sm font-medium whitespace-nowrap text-muted-foreground">
                  <span>{format(new Date(post.date), "MMM d, y")}</span>
                  <span className="text-xs">{post.readingTime} min read</span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

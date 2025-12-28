// src/components/Sections/home/posts-section.tsx
import { allPosts } from "contentlayer/generated";
import { compareDesc, format } from "date-fns";
import Link from "next/link";
import { NAVIGATION_ITEMS } from "@/constants";

export default function PostsSection() {
  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .slice(0, 5); // Show only the 5 most recent

  if (posts.length === 0) {
    return null;
  }

  const postsNavItem = NAVIGATION_ITEMS.find((item) => item.id === "posts")!;

  return (
    <section id={postsNavItem.id} className="scroll-mt-[72px] mb-20">
      <div className="flex gap-4 items-center mb-6">
        <h2 className="text-lg whitespace-nowrap">{postsNavItem.label}</h2>
        <div className="flex-1 h-px bg-border" />
      </div>
      <ul className="space-y-0">
        {posts.map((post, index) => (
          <li key={post.slug}>
            <Link
              href={post.url}
              className="block py-4 transition-colors hover:text-primary group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ring-offset-1 rounded"
            >
              <div className="flex gap-6 justify-between items-start">
                <div className="flex flex-1 gap-4 items-start min-w-0">
                  <span className="text-sm font-medium whitespace-nowrap text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="mb-1 text-lg font-semibold transition-colors group-hover:text-primary">
                      {post.title}
                    </h3>
                    <p className="text-sm font-medium text-muted-foreground">
                      {post.topic}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-1 items-end text-sm font-medium whitespace-nowrap text-muted-foreground">
                  <span>{format(new Date(post.date), "yyyy")}</span>
                  <span className="text-xs">{post.readingTime} min read</span>
                </div>
              </div>
            </Link>
            {index < posts.length - 1 && <div className="h-px bg-border" />}
          </li>
        ))}
      </ul>
    </section>
  );
}

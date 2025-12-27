// src/app/posts/page.tsx
import Container from "@/components/layout/container";
import Section from "@/components/layout/section";
import { allPosts } from "contentlayer/generated";
import { compareDesc, format } from "date-fns";
import Link from "next/link";

export const metadata = {
  title: "Posts",
  description: "All blog posts",
};

export default function PostsPage() {
  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  return (
    <Section spacing="compact">
      <Container>
        <h1 className="mb-6 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter sm:mb-10 md:mb-16">
          Posts
        </h1>
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={post.url}
                className="flex flex-col px-8 py-6 space-y-4 rounded-lg border transition duration-200 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 hover:shadow hover:border-primary"
                prefetch={true}
              >
                <div className="flex justify-between text-sm font-medium text-muted-foreground">
                  <span className="uppercase tracking-wide">{post.topic}</span>
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
      </Container>
    </Section>
  );
}

import { Suspense } from "react";

import Container from "@/components/container";
import Section from "@/components/section";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import Link from "next/link";

export const metadata = {
  title: "Posts",
  description:
    "Use these 50 real-world project ideas to learn by doing including building an ecommerce store and a budget manager.",
};

const PostsLoading = () => {
  return (
    <ul className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <li key={i} className="animate-pulse">
          <Skeleton className="px-8 py-6 border rounded-lg">
            <div className="flex justify-between">
              <Skeleton className="w-20 h-4 bg-gray-300 rounded" />
              <Skeleton className="w-24 h-4 bg-gray-300 rounded" />
            </div>
            <div className="w-2/3 h-6 mt-4 bg-gray-300 rounded" />
          </Skeleton>
        </li>
      ))}
    </ul>
  );
};

type Post = {
  slug: string;
  title: string;
  topic: string;
  date: string;
};

const posts = [
  {
    slug: "hiding-scrollbars-in-tailwind",
    title: "Hiding Scrollbars in Tailwind",
    topic: "Tailwind CSS",
    date: "2024-09-01",
  },
];

export default function Posts() {
  return (
    <Section spacing="compact">
      <Container>
        <h1 className="mb-6 text-4xl font-bold sm:text-5xl md:text-6xl sm:mb-10 md:mb-16">
          Posts
        </h1>
        <Suspense fallback={<PostsLoading />}>
          <ul>
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </ul>
        </Suspense>
      </Container>
    </Section>
  );
}

const PostCard = ({ post }: { post: Post }) => {
  const { title, slug, topic, date } = post;
  return (
    <li>
      <Link
        href={`/posts/${slug}`}
        className="flex flex-col px-8 py-6 space-y-4 transition duration-100 border rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800/30 hover:shadow"
        prefetch={true}
      >
        <div className="flex justify-between font-light text-gray-400">
          <span className="text-sm uppercase">{topic}</span>
          <span>{format(new Date(date), "MMM d, y")}</span>
        </div>
        <div className="text-xl font-bold">{title}</div>
      </Link>
    </li>
  );
};

import { Suspense } from "react";

import Article from "@/components/article";
import Container from "@/components/container";
import Section from "@/components/section";
import Link from "next/link";

export const metadata = {
  title: "Posts",
  description:
    "Use these 50 real-world project ideas to learn by doing including building an ecommerce store and a budget manager.",
};

function PostsLoading() {
  return (
    <ul className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <li key={i} className="animate-pulse">
          <div className="px-8 py-6 border rounded-lg">
            <div className="flex justify-between">
              <div className="w-20 h-4 bg-gray-200 rounded" />
              <div className="w-24 h-4 bg-gray-200 rounded" />
            </div>
            <div className="w-2/3 h-6 mt-4 bg-gray-200 rounded" />
          </div>
        </li>
      ))}
    </ul>
  );
}

type Post = {
  slug: string;
  title: string;
  topic: string;
  date: string;
};

async function PostsList() {
  const posts = [
    {
      slug: "hiding-scrollbars-in-tailwind",
      title: "Hiding Scrollbars in Tailwind",
      topic: "Tailwind CSS",
      date: "2021-09-01",
    },
  ];

  return (
    <ul>
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </ul>
  );
}

export default function Posts() {
  return (
    <Section spacing="compact">
      <Container>
        <h1 className="mb-6 text-4xl font-bold sm:text-5xl md:text-6xl sm:mb-10 md:mb-16">
          Posts
        </h1>
        <Article withSidebar={false}>
          <h2 className="sr-only">Project Ideas</h2>
          <Suspense fallback={<PostsLoading />}>
            <PostsList />
          </Suspense>
        </Article>
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
        className="flex flex-col px-8 py-6 space-y-4 transition duration-100 border rounded-lg hover:bg-zinc-50/30 hover:shadow"
        prefetch={true}
      >
        <div className="flex justify-between font-light text-gray-400">
          <span className="text-sm uppercase">{topic}</span>
          <span>{date}</span>
        </div>
        <div className="text-xl font-bold">{title}</div>
      </Link>
    </li>
  );
};

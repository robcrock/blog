import { Suspense } from "react";

import Container from "@/components/container";
import { MdxContent } from "@/features/posts/components/mdx-content";
import { getPost, getPosts } from "@/features/posts/queries/queries";
import Link from "next/link";

// Generate static params for all posts
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    postSlug: post.slug,
  }));
}

function PostContentLoading() {
  return (
    <div className="animate-pulse">
      <div className="w-3/4 h-8 mb-4 bg-gray-200 rounded" />
      <div className="space-y-3">
        <div className="w-full h-4 bg-gray-200 rounded" />
        <div className="w-5/6 h-4 bg-gray-200 rounded" />
        <div className="w-4/6 h-4 bg-gray-200 rounded" />
      </div>
    </div>
  );
}

async function PostContent({ postSlug }: { postSlug: string }) {
  const content = await getPost(postSlug);
  return <MdxContent postContent={content} />;
}

export default async function PostPage(props: { params: Promise<{ postSlug: string }> }) {
  const params = await props.params;
  return (
    <Container className="mt-10">
      <Link href={"/posts"}>
        <div className="mb-4 text-sm">← Back to posts</div>
      </Link>
      <Suspense fallback={<PostContentLoading />}>
        <PostContent postSlug={params.postSlug} />
      </Suspense>
    </Container>
  );
}

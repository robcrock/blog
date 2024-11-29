import { Suspense } from "react";

import Container from "@/components/Container";
import { PostContent } from "@/features/posts/components/post-content";
import { PostSkeleton } from "@/features/posts/components/post-skeleton";
import Link from "next/link";

type PostPageProps = {
  params: {
    postSlug: string;
  };
};

export default function PostPage({ params }: PostPageProps) {
  return (
    <Container className="mt-10">
      <Link href={"/posts"}>
        <div className="mb-4 text-sm">← Back to posts</div>
      </Link>
      <Suspense fallback={<PostSkeleton />}>
        <PostContent postSlug={params.postSlug} />
      </Suspense>
    </Container>
  );
}

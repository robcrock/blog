import { PostsListPage } from "@/features/posts";
import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";

export const metadata = {
  title: "Posts | Robert Crocker",
  description:
    "Thoughts on frontend development, design, and building great user interfaces.",
};

export default function PostsPage() {
  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  return <PostsListPage posts={posts} />;
}

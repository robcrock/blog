import { getAllPosts, type Post } from "@/lib/posts";
import { format } from "date-fns";
import Link from "next/link";

export default async function PostsSection() {
  const posts = await getAllPosts();

  if (posts.length === 0) {
    return null;
  }

  return (
    <section id="posts" className="scroll-mt-[72px]">
      <div className="mb-6 flex items-center gap-4">
        <h2 className="text-base font-bold whitespace-nowrap">Posts</h2>
        <div className="flex-1 h-px bg-border" />
      </div>
      <ul className="space-y-0">
        {posts.map((post, index) => (
          <PostEntry
            key={post.slug}
            post={post}
            index={index}
            isLast={index === posts.length - 1}
          />
        ))}
      </ul>
    </section>
  );
}

const PostEntry = ({
  post,
  index,
  isLast,
}: {
  post: Post;
  index: number;
  isLast: boolean;
}) => {
  const { title, slug, topic, date } = post;
  const year = format(new Date(date), "yyyy");
  const entryNumber = String(index + 1).padStart(2, "0");

  return (
    <li>
      <Link
        href={`/posts/${slug}`}
        className="block py-4 transition-colors hover:text-primary group"
      >
        <div className="flex items-start justify-between gap-6">
          <div className="flex items-start gap-4 flex-1 min-w-0">
            <span className="text-sm font-light text-muted-foreground whitespace-nowrap">
              {entryNumber}
            </span>
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-bold mb-1 group-hover:text-primary transition-colors">
                {title}
              </h3>
              <p className="text-sm font-light text-muted-foreground">
                {topic}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1 text-sm font-light text-muted-foreground whitespace-nowrap">
            <span>{year}</span>
            <span className="text-xs">{topic}</span>
          </div>
        </div>
      </Link>
      {!isLast && <div className="h-px bg-border" />}
    </li>
  );
};

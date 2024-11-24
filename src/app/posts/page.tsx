import { promises as fs } from "fs";
import path from "path";

import Article from "@/components/Article";
import Container from "@/components/Container";
import Section from "@/components/Section";
import { compileMDX } from "next-mdx-remote/rsc";
import Link from "next/link";

export const metadata = {
  title: "Posts",
  description:
    "Use these 50 real-world project ideas to learn by doing including building an ecommerce store and a budget manager.",
};

export default async function Posts() {
  const filenames = await fs.readdir(path.join(process.cwd(), "src/posts"));

  interface Frontmatter {
    title: string;
  }

  const posts = await Promise.all(
    filenames.map(async (filename) => {
      const content = await fs.readFile(
        path.join(process.cwd(), "src/posts", filename),
        "utf-8"
      );
      const { frontmatter } = await compileMDX<Frontmatter>({
        source: content,
        options: {
          parseFrontmatter: true,
        },
      });
      return {
        filename,
        slug: filename.replace(".mdx", ""),
        ...frontmatter,
      };
    })
  );

  return (
    <Section spacing="compact">
      <Container>
        <h1 className="mb-6 text-4xl font-bold sm:text-5xl md:text-6xl sm:mb-10 md:mb-16">
          Posts
        </h1>
        <Article withSidebar={false}>
          <h2 className="sr-only">Project Ideas</h2>
          <ul>
            {posts.map((post) => {
              if (post.title === "Blog") return;
              return <PostCard key={post.title} post={post} />;
            })}
          </ul>
        </Article>
      </Container>
    </Section>
  );
}

const PostCard = ({ post }) => {
  const { title, slug, topic, date } = post;
  return (
    <li>
      <Link
        href={`/posts/${slug}`}
        className="flex flex-col px-8 py-6 space-y-4 transition duration-100 border rounded-lg hover:bg-zinc-50/30 hover:shadow"
      >
        <div className="flex justify-between font-light text-gray-400">
          <span className="text-sm uppercase">{topic}</span>
          <span>{date}</span>
        </div>
        <div className="text-xl font-bold ">{title}</div>
      </Link>
    </li>
  );
};

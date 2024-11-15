import { promises as fs } from "fs";
import path from "path";

import Checklist from "@/components/Checklist";
import Container from "@/components/Container";
import LoginRequired from "@/components/LoginRequired";
import PostContent from "@/components/PostContent";
import PostHeader from "@/components/PostHeader";
import PostSidebar from "@/components/PostSidebar";
import { compileMDX } from "next-mdx-remote/rsc";

export default async function PostPage({
  params,
}: {
  params: { postSlug: string };
}) {
  const content = await fs.readFile(
    path.join(process.cwd(), "src/posts", `${params.postSlug}.mdx`),
    "utf-8"
  );

  interface Frontmatter {
    title: string;
  }

  const data = await compileMDX<Frontmatter>({
    source: content,
    options: {
      parseFrontmatter: true,
    },
    components: {
      PostHeader,
      PostContent,
      PostSidebar,
      Checklist,
      LoginRequired,
    },
  });

  return (
    <Container className="mt-10">
      <h1>{data.frontmatter.title}</h1>
      {data.content}
    </Container>
  );
}

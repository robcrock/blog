import { promises as fs } from "fs";
import path from "path";

import Checklist from "@/components/Checklist";
import Container from "@/components/Container";
import LoginRequired from "@/components/LoginRequired";
import PostContent from "@/components/PostContent";
import PostHeader from "@/components/PostHeader";
import PostImage from "@/components/PostImage";
import PostSidebar from "@/components/PostSidebar";
import { compileMDX } from "next-mdx-remote/rsc";
import Link from "next/link";
import rehypePrettyCode from "rehype-pretty-code";

interface Frontmatter {
  title: string;
  layout: string;
  topic: string;
  description: string;
  date: string;
}

export default async function PostPage({
  params,
}: {
  params: { postSlug: string };
}) {
  const content = await fs.readFile(
    path.join(process.cwd(), "src/posts", `${params.postSlug}.mdx`),
    "utf-8"
  );

  const { content: mdxContent } = await compileMDX<Frontmatter>({
    source: content,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [
          [
            rehypePrettyCode,
            {
              theme: "github-dark", // or any other theme you prefer
              keepBackground: true,
            },
          ],
        ],
      },
    },
    components: {
      PostHeader,
      PostContent,
      PostSidebar,
      Checklist,
      LoginRequired,
      PostImage,
      // Add HTML element overrides
      h2: ({ children }) => (
        <h2 className="mt-12 mb-6 text-3xl font-bold">{children}</h2>
      ),
      h3: ({ children }) => (
        <h3 className="mt-10 mb-4 text-2xl font-semibold">{children}</h3>
      ),
      h4: ({ children }) => (
        <h4 className="mt-8 mb-4 text-xl font-semibold">{children}</h4>
      ),
      a: ({ children, href }) => (
        <a
          href={href}
          className="text-blue-500 transition-all duration-200 hover:text-purple-500"
        >
          {children}
        </a>
      ),
      blockquote: ({ children }) => (
        <blockquote className="py-4 pl-6 my-8 italic =border-l-4 border-blue-500 rounded-r-lg bg-blue-50">
          {children}
        </blockquote>
      ),
      // Add these new overrides
      ul: ({ children }) => (
        <ul className="pl-6 my-6 -mt-2 space-y-1 list-disc list-outside ">
          {children}
        </ul>
      ),
      ol: ({ children }) => (
        <ol className="pl-6 my-6 -mt-2 space-y-1 list-decimal list-outside ">
          {children}
        </ol>
      ),
      // Style list items as well for consistent spacing
      li: ({ children }) => (
        <li className="pl-2 leading-relaxed =">{children}</li>
      ),
    },
  });

  return (
    <Container className="mt-10">
      <Link href={"/posts"}>
        <div className="mb-4 text-sm">← Back to posts</div>
      </Link>
      {mdxContent}
    </Container>
  );
}

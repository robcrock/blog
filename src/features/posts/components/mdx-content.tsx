import Checklist from "@/components/checklist";
import LoginRequired from "@/components/login-required";
import PostContent from "@/components/post-content";
import PostHeader from "@/components/post-header";
import PostImage from "@/components/post-image";
import PostSidebar from "@/components/post-sidebar";
import TransformerCopyButton from "@/components/transformer-copy-button";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";

interface Frontmatter {
  title: string;
  layout: string;
  topic: string;
  description: string;
  date: string;
}

type MdxContentProps = {
  postContent: string;
};

const MdxContent = async ({ postContent }: MdxContentProps) => {
  const { content: mdxContent } = await compileMDX<Frontmatter>({
    source: postContent,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [
          [
            rehypePrettyCode,
            {
              theme: "github-dark",
              keepBackground: true,
              onVisitLine(node: any) {
                if (node.children.length === 0) {
                  node.children = [{ type: "text", value: " " }];
                }
              },
              onVisitHighlightedLine(node: any) {
                node.properties.className.push("highlighted");
              },
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
          className="text-blue-500 transition-all duration-100 border-b border-blue-500 border-opacity-0 hover:border-opacity-100"
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
      pre: ({ children, ...props }) => {
        return (
          <div className="relative">
            <pre {...props}>{children}</pre>
            <TransformerCopyButton>{children}</TransformerCopyButton>
          </div>
        );
      },
    },
  });

  return <>{mdxContent}</>;
};

export { MdxContent };

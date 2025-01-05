import { ComponentPropsWithoutRef } from "react";

import PostContent from "@/app/posts/components/post-content";
import PostHeader from "@/app/posts/components/post-header";
import PostImage from "@/app/posts/components/post-image";
import PostSidebar from "@/app/posts/components/post-sidebar";
import TransformerCopyButton from "@/components/transformer-copy-button";

type HeadingProps = ComponentPropsWithoutRef<"h1">;
type ParagraphProps = ComponentPropsWithoutRef<"p">;
type ListProps = ComponentPropsWithoutRef<"ul">;
type ListItemProps = ComponentPropsWithoutRef<"li">;
type AnchorProps = ComponentPropsWithoutRef<"a">;
type BlockquoteProps = ComponentPropsWithoutRef<"blockquote">;

const components = {
  PostHeader,
  PostContent,
  PostSidebar,
  PostImage,
  // Add HTML element overrides
  h2: (props: HeadingProps) => (
    <h2 className="mt-12 mb-6 text-3xl font-bold" {...props} />
  ),
  h3: (props: HeadingProps) => (
    <h3 className="mt-10 mb-4 text-2xl font-semibold" {...props} />
  ),
  h4: (props: HeadingProps) => (
    <h4 className="mt-8 mb-4 text-xl font-semibold" {...props} />
  ),
  p: (props: ParagraphProps) => (
    <p className="leading-snug text-gray-800" {...props} />
  ),
  a: ({ href, children, ...props }: AnchorProps) => (
    <a
      href={href}
      className="text-blue-500 transition-all duration-100 border-b border-blue-500 border-opacity-0 hover:border-opacity-100"
      {...props}
    >
      {children}
    </a>
  ),
  blockquote: (props: BlockquoteProps) => (
    <blockquote
      className="py-4 pl-6 my-8 italic =border-l-4 border-blue-500 rounded-r-lg bg-blue-50"
      {...props}
    />
  ),
  // Add these new overrides
  ul: (props: ListProps) => (
    <ul
      className="pl-6 my-6 -mt-2 space-y-1 list-disc list-outside "
      {...props}
    />
  ),
  ol: (props: ListProps) => (
    <ol
      className="pl-6 my-6 -mt-2 space-y-1 list-decimal list-outside "
      {...props}
    />
  ),
  // Style list items as well for consistent spacing
  li: (props: ListItemProps) => (
    <li className="pl-2 leading-relaxed =" {...props} />
  ),
  pre: ({ children, ...props }: ComponentPropsWithoutRef<"code">) => {
    return (
      <div className="relative">
        <pre {...props}>{children}</pre>
        <TransformerCopyButton>{children}</TransformerCopyButton>
      </div>
    );
  },
};

declare global {
  type MDXProvidedComponents = typeof components;
}

export function useMDXComponents(): MDXProvidedComponents {
  return components;
}

// export { MdxContent };

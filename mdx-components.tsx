import { ComponentPropsWithoutRef } from "react";

import PostContent from "@/app/posts/components/post-content";
import PostImage from "@/app/posts/components/post-image";
import TransformerCopyButton from "@/components/transformer-copy-button";

type HeadingProps = ComponentPropsWithoutRef<"h1">;
type ParagraphProps = ComponentPropsWithoutRef<"p">;
type ListProps = ComponentPropsWithoutRef<"ul">;
type ListItemProps = ComponentPropsWithoutRef<"li">;
type AnchorProps = ComponentPropsWithoutRef<"a">;
type BlockquoteProps = ComponentPropsWithoutRef<"blockquote">;

const components = {
  PostContent,
  PostImage,
  // Add HTML element overrides
  h1: (props: HeadingProps) => (
    <h1
      className="w-full md:mb-16
        text-4xl text-gray-800 font-bold m-0 mb-4 sm:text-5xl md:text-6xl
        [&_p]:text-xl [&_p]:sm:text-2xl [&_p]:md:text-3xl [&_p]:line-height-1.3"
      {...props}
    />
  ),
  h2: (props: HeadingProps) => (
    <h2 className="mt-12 mb-6 text-3xl font-bold text-gray-900" {...props} />
  ),
  h3: (props: HeadingProps) => (
    <h3
      className="mt-10 mb-4 text-2xl font-semibold text-gray-900"
      {...props}
    />
  ),
  h4: (props: HeadingProps) => (
    <h4 className="mt-8 mb-4 text-xl font-semibold text-gray-900" {...props} />
  ),
  p: (props: ParagraphProps) => (
    <p
      className="px-2 my-3 text-lg leading-snug text-gray-800 md:text-xl md:leading-8"
      {...props}
    />
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

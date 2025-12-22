// src/components/content/mdx-content.tsx
"use client";

import { ComponentPropsWithoutRef } from "react";

import PostImage from "@/components/content/post-image";
import TransformerCopyButton from "@/components/content/transformer-copy-button";
import { useMDXComponent } from "next-contentlayer2/hooks";

type HeadingProps = ComponentPropsWithoutRef<"h1">;
type ParagraphProps = ComponentPropsWithoutRef<"p">;
type ListProps = ComponentPropsWithoutRef<"ul">;
type ListItemProps = ComponentPropsWithoutRef<"li">;
type AnchorProps = ComponentPropsWithoutRef<"a">;
type BlockquoteProps = ComponentPropsWithoutRef<"blockquote">;

const mdxComponents = {
  PostImage,
  h1: (props: HeadingProps) => (
    <h1
      className="mb-8 w-full text-4xl font-bold tracking-tight text-gray-900 md:mb-12 md:text-5xl dark:text-gray-100"
      {...props}
    />
  ),
  h2: (props: HeadingProps) => (
    <h2
      className="mt-12 mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100"
      {...props}
    />
  ),
  h3: (props: HeadingProps) => (
    <h3
      className="mt-8 mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100"
      {...props}
    />
  ),
  h4: (props: HeadingProps) => (
    <h4
      className="mt-6 mb-4 text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-100"
      {...props}
    />
  ),
  p: (props: ParagraphProps) => (
    <p
      className="mb-6 text-lg md:text-xl leading-[1.75] md:leading-[1.8] text-gray-800 dark:text-gray-200"
      {...props}
    />
  ),
  a: ({ href, children, ...props }: AnchorProps) => (
    <a
      href={href}
      className="text-purple-600 underline transition-all duration-100 dark:text-purple-400 decoration-purple-600/30 dark:decoration-purple-400/30 underline-offset-2 hover:decoration-2"
      {...props}
    >
      {children}
    </a>
  ),
  blockquote: (props: BlockquoteProps) => (
    <blockquote
      className="py-4 pl-6 my-8 border-l-4 border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 rounded-r-lg [&>p]:text-gray-700 [&>p]:dark:text-gray-300 [&>p:first-of-type]:mt-0 [&>p:last-of-type]:mb-0"
      {...props}
    />
  ),
  ul: (props: ListProps) => (
    <ul
      className="pl-6 my-6 space-y-3 list-disc list-outside text-gray-800 dark:text-gray-200"
      {...props}
    />
  ),
  ol: (props: ListProps) => (
    <ol
      className="pl-6 my-6 space-y-3 list-decimal list-outside text-gray-800 dark:text-gray-200"
      {...props}
    />
  ),
  li: (props: ListItemProps) => (
    <li
      className="pl-2 text-lg leading-[1.75] marker:text-gray-500 dark:marker:text-gray-400"
      {...props}
    />
  ),
  pre: ({ children, ...props }: ComponentPropsWithoutRef<"pre">) => (
    <div className="overflow-hidden relative my-8 bg-gray-100 rounded-lg dark:bg-gray-900">
      <pre
        className="overflow-x-auto p-4 text-sm text-gray-800 md:text-base dark:text-gray-200"
        {...props}
      >
        {children}
      </pre>
      <TransformerCopyButton>{children}</TransformerCopyButton>
    </div>
  ),
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code
      className="font-mono text-sm bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded"
      {...props}
    />
  ),
};

export function MDXContent({ code }: { code: string }) {
  const Component = useMDXComponent(code);
  return <Component components={mdxComponents} />;
}

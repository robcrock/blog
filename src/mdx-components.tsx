import { ComponentPropsWithoutRef } from "react";

import PostImage from "@/components/content/post-image";
import { SandpackEditor } from "@/components/content/sandpack-editor";
import TransformerCopyButton from "@/components/content/transformer-copy-button";
import {
  DistanceTrianglePlayground,
  PopoverPlayground,
  ProximityReveal,
  ToastPlayground,
  TransformPlayground,
} from "@/components/playgrounds";

type HeadingProps = ComponentPropsWithoutRef<"h1">;
type ParagraphProps = ComponentPropsWithoutRef<"p">;
type ListProps = ComponentPropsWithoutRef<"ul">;
type ListItemProps = ComponentPropsWithoutRef<"li">;
type AnchorProps = ComponentPropsWithoutRef<"a">;
type BlockquoteProps = ComponentPropsWithoutRef<"blockquote">;

// Wrapper component for SandpackEditor to apply grid spanning
const SandpackEditorWrapper = (props: any) => (
  <div className="col-span-3 col-start-1 my-8">
    <SandpackEditor {...props} />
  </div>
);

// Wrapper so ProximityReveal appears below the header (full-width row)
const ProximityRevealWrapper = () => (
  <div className="col-span-3 col-start-1 mb-8">
    <ProximityReveal />
  </div>
);

const mdxComponents = {
  PostImage,
  SandpackEditor: SandpackEditorWrapper,
  // Playground components
  TransformPlayground,
  ToastPlayground,
  PopoverPlayground,
  ProximityReveal: ProximityRevealWrapper,
  DistanceTrianglePlayground,
  // Figure element wraps code blocks with copy directive - needs grid column styling
  figure: (props: ComponentPropsWithoutRef<"figure">) => (
    <figure className="col-span-3 col-start-1 mb-3" {...props} />
  ),
  h1: (props: HeadingProps) => (
    <h1
      className="col-span-3 mb-8 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 md:col-span-1 md:col-start-2 md:mb-12 md:text-4xl lg:text-5xl"
      {...props}
    />
  ),
  h2: (props: HeadingProps) => (
    <h2
      className="col-span-3 mt-4 mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 md:col-span-1 md:col-start-2 md:text-3xl"
      {...props}
    />
  ),
  h3: (props: HeadingProps) => (
    <h3
      className="col-span-3 mt-3 mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100 md:col-span-1 md:col-start-2 md:text-2xl"
      {...props}
    />
  ),
  p: (props: ParagraphProps) => (
    <p
      className="col-span-3 mb-3 text-base leading-relaxed text-gray-800 dark:text-gray-200 md:col-span-1 md:col-start-2 md:text-lg"
      {...props}
    />
  ),
  a: ({ children, ...props }: AnchorProps) => (
    <a
      className="underline text-primary underline-offset-4 hover:text-primary/80"
      {...props}
    >
      {children}
    </a>
  ),
  blockquote: (props: BlockquoteProps) => (
    <blockquote
      className="col-span-3 mb-8 rounded-r-lg border-l-4 border-gray-300 bg-gray-50 py-4 pl-6 dark:border-gray-700 dark:bg-gray-800/50 md:col-span-1 md:col-start-2 [&>p:first-of-type]:mt-0 [&>p:last-of-type]:mb-0 [&>p]:text-gray-700 [&>p]:dark:text-gray-300"
      {...props}
    />
  ),
  ul: (props: ListProps) => (
    <ul
      className="col-span-3 pl-6 mb-3 space-y-3 list-disc list-outside text-gray-800 dark:text-gray-200 md:col-span-1 md:col-start-2"
      {...props}
    />
  ),
  ol: (props: ListProps) => (
    <ol
      className="col-span-3 pl-6 mb-3 space-y-3 list-decimal list-outside text-gray-800 dark:text-gray-200 md:col-span-1 md:col-start-2"
      {...props}
    />
  ),
  li: (props: ListItemProps) => (
    <li
      className="pl-2 text-base leading-relaxed marker:text-gray-500 dark:marker:text-gray-400 md:text-lg"
      {...props}
    />
  ),
  pre: ({ children, ...props }: ComponentPropsWithoutRef<"pre">) => {
    // Extract raw text from code element for reliable copying
    let rawCode = "";
    if (children && typeof children === "object" && "props" in children) {
      const codeProps = (children as any).props;
      // Try to get raw code from the code element's children
      rawCode = codeProps?.children || "";
    }

    return (
      <div className="overflow-hidden relative w-full rounded-lg">
        <pre
          className="overflow-x-auto p-4 text-sm md:text-base"
          data-raw-code={typeof rawCode === "string" ? rawCode : ""}
          {...props}
        >
          {children}
        </pre>
        <TransformerCopyButton />
      </div>
    );
  },
  code: (props: ComponentPropsWithoutRef<"code">) => {
    // Check if code is inside a pre tag (code block) or standalone (inline code)
    const isInline = !props.className?.includes("language-");
    if (isInline) {
      return (
        <code
          className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm dark:bg-gray-800"
          {...props}
        />
      );
    }
    // For code blocks, return as-is (handled by pre component)
    return <code {...props} />;
  },
};

export function useMDXComponents(): typeof mdxComponents {
  return mdxComponents;
}

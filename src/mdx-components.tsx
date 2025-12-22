import { ComponentPropsWithoutRef } from "react";

import PostImage from "@/components/content/post-image";
import { SandpackEditor } from "@/components/content/sandpack-editor";
import TransformerCopyButton from "@/components/content/transformer-copy-button";

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

const mdxComponents = {
  PostImage,
  SandpackEditor: SandpackEditorWrapper,
  // Figure element wraps code blocks with copy directive - needs grid column styling
  figure: (props: ComponentPropsWithoutRef<"figure">) => (
    <figure
      className="col-span-3 col-start-1 my-8"
      {...props}
    />
  ),
  h1: (props: HeadingProps) => (
    <h1
      className="col-start-2 mb-8 md:mb-12
        text-4xl md:text-5xl font-bold tracking-tight
        text-gray-900 dark:text-gray-100
        [&_p]:text-2xl [&_p]:md:text-3xl [&_p]:leading-tight"
      {...props}
    />
  ),
  h2: (props: HeadingProps) => (
    <h2
      className="col-start-2 mt-12 mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100"
      {...props}
    />
  ),
  h3: (props: HeadingProps) => (
    <h3
      className="col-start-2 mt-8 mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100"
      {...props}
    />
  ),
  h4: (props: HeadingProps) => (
    <h4
      className="col-start-2 mt-6 mb-4 text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-100"
      {...props}
    />
  ),
  p: (props: ParagraphProps) => (
    <p
      className="col-start-2 mb-6 text-lg md:text-xl leading-[1.75] md:leading-[1.8]
        text-gray-800 dark:text-gray-200 
        [&:first-of-type]:text-xl [&:first-of-type]:md:text-2xl 
        [&:first-of-type]:leading-[1.6] [&:first-of-type]:text-gray-700 
        [&:first-of-type]:dark:text-gray-300"
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
      className="col-start-2 py-4 pl-6 my-8 
        border-l-4 border-gray-300 dark:border-gray-700
        bg-gray-50 dark:bg-gray-800/50 rounded-r-lg
        [&>p]:text-gray-700 [&>p]:dark:text-gray-300
        [&>p:first-of-type]:mt-0 [&>p:last-of-type]:mb-0"
      {...props}
    />
  ),
  ul: (props: ListProps) => (
    <ul
      className="col-start-2 pl-6 my-6 space-y-3 list-disc list-outside text-gray-800 dark:text-gray-200"
      {...props}
    />
  ),
  ol: (props: ListProps) => (
    <ol
      className="col-start-2 pl-6 my-6 space-y-3 list-decimal list-outside text-gray-800 dark:text-gray-200"
      {...props}
    />
  ),
  li: (props: ListItemProps) => (
    <li
      className="pl-2 text-lg leading-[1.75] marker:text-gray-500 
        dark:marker:text-gray-400"
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
      <div className="overflow-hidden relative col-span-3 col-start-1 my-8 w-full bg-gray-100 rounded-lg dark:bg-gray-900">
        <pre
          className="overflow-x-auto p-4 text-sm text-gray-800 md:text-base dark:text-gray-200"
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
          className="font-mono text-sm bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded"
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

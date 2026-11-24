"use client";

import { useMDXComponent } from "next-contentlayer2/hooks";
import { useMDXComponents } from "@/mdx-components";

interface MDXContentProps {
  code: string;
}

type CompiledMDX = ReturnType<typeof useMDXComponent>;
type MDXComponentsMap = ReturnType<typeof useMDXComponents>;

// The compiled MDX function is produced by contentlayer from `code`. Rendering
// it in a child keeps this component's element type stable across renders
// while the compiled function's identity stays memoized on the source string.
function CompiledMDX({
  content: Content,
  components,
}: {
  content: CompiledMDX;
  components: MDXComponentsMap;
}) {
  return <Content components={components} />;
}

export function MDXContent({ code }: MDXContentProps) {
  const content = useMDXComponent(code);
  const components = useMDXComponents();

  return (
    <div style={{ display: "contents" }}>
      <CompiledMDX content={content} components={components} />
    </div>
  );
}

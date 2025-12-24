import { useMDXComponent } from "next-contentlayer2/hooks";
import Image from "next/image";

import { CodeExample } from "./content/code-example";
import { SandpackEditor } from "./content/code-example/sandpack-editor";

const components = {
  Image,
  CodeExample,
  SandpackEditor,
};

interface MdxProps {
  code: string;
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);
  return <Component components={components} />;
}

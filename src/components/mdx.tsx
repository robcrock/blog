import { useMDXComponent } from "next-contentlayer2/hooks";
import Image from "next/image";

import { SandpackEditor } from "./content/sandpack-editor";

const components = {
  Image,
  SandpackEditor,
};

interface MdxProps {
  code: string;
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);
  return <Component components={components} />;
}

"use client";

import { MDXProvider } from "@mdx-js/react";

import { useMDXComponents } from "../../../mdx-components";

interface PostLayoutProps {
  children: React.ReactNode;
}

const PostLayout = ({ children }: PostLayoutProps) => {
  const components = useMDXComponents();

  return <MDXProvider components={components}>{children}</MDXProvider>;
};

export default PostLayout;

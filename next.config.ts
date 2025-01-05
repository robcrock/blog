import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["mdx", "ts", "tsx"],
  // Note: Using the Rust compiler means we cannot use
  // rehype or remark plugins. For my app, this is fine.
  experimental: {
    mdxRs: true,
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);

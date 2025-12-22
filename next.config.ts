import type { NextConfig } from "next";
import { withContentlayer } from "next-contentlayer2";

const nextConfig: NextConfig = {
  // You can remove pageExtensions since Contentlayer handles MDX
  reactStrictMode: true,
  // Empty turbopack config to acknowledge Turbopack as default in Next.js 16
  turbopack: {},
};

export default withContentlayer(nextConfig);

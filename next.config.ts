import type { NextConfig } from "next";
import { withContentlayer } from "next-contentlayer2";

const nextConfig: NextConfig = {
  // You can remove pageExtensions since Contentlayer handles MDX
  reactStrictMode: true,
};

export default withContentlayer(nextConfig);

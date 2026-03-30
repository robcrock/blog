import type { NextConfig } from "next";
import { withContentlayer } from "next-contentlayer2";

const nextConfig: NextConfig = {
  // You can remove pageExtensions since Contentlayer handles MDX
  reactStrictMode: true,
  // Turbopack resolve aliases for packages with export maps it can't resolve
  turbopack: {
    resolveAlias: {
      dialkit: "dialkit/dist/index.js",
      "dialkit/styles.css": "dialkit/dist/styles.css",
    },
  },
};

export default withContentlayer(nextConfig);

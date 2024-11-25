module.exports = {
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true, ignoreDuringBuilds: true },
  experimental: {
    outputFileTracingIncludes: {
      "/*": ["./content/**/*"],
    },
  },
};

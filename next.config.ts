import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: { root: process.cwd() },
  images: {
    localPatterns: [{ pathname: "/assets/**" }],
  },
  async rewrites() {
    return [{ source: '/sponsors', destination: '/sponsors.html' }];
  },
};

export default nextConfig;

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
  },
  images: {
    localPatterns: [{ pathname: '/assets/**' }],
  },
  async rewrites() {
    return [{ source: '/sponsors', destination: '/sponsors.html' }];
  },
};

export default nextConfig;

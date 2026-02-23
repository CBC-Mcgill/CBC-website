import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
  },
  images: {
    localPatterns: [{ pathname: '/assets/**' }],
  },
};

export default nextConfig;

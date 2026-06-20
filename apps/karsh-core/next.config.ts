import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['ui', 'utils', 'db'],
};

export default nextConfig;

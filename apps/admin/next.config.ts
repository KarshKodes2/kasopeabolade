import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['db', 'ui', 'utils'],
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;

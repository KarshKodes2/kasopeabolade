import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: ['db', 'ui', 'utils'],
  poweredByHeader: false,
  reactStrictMode: true,
}

export default nextConfig

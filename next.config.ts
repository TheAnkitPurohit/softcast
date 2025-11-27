import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'img.clerk.com', pathname: '/**' },
      {
        protocol: 'https',
        hostname: 'dig6zumu50y36.cloudfront.net',
        pathname: '/**',
      },
    ],
  },

  experimental: {
    serverComponentsExternalPackages: ['ffmpeg-static', 'fluent-ffmpeg'],
  },
}

export default nextConfig

import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'img.clerk.com', pathname: '/**' },
      {
        protocol: 'https',
        hostname: 'screenify-softcolon.s3.ap-south-1.amazonaws.com',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig

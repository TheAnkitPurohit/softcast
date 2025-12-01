import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    unoptimized: true,
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        pathname: '**',
      },
    ],
  },

  serverExternalPackages: [
    'ffmpeg-static',
    'fluent-ffmpeg',
    '@ffmpeg-installer/ffmpeg',
  ],
}

export default nextConfig

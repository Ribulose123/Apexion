// next.config.js

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'coin-images.coingecko.com',
        port: '',
        pathname: '/coins/images/**',
      },
      {
        protocol: 'https',
        hostname: 'example.com', 
        port: '',
        pathname: '/**',
      },
       {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ]
  },
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/coingecko/:path*',
        destination: 'https://api.coingecko.com/api/v3/:path*',
      },
    ];
  },
};

export default nextConfig;
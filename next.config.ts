import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
    remotePatterns:[
      {
        protocol:'https',
        hostname:'coin-images.coingecko.com',
        port:'',
        pathname:'/coins/images/**'
      }
    ]
  }
  /* config options here */
};

export default nextConfig;

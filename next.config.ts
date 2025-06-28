import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/costos',
        destination: '/costos',
      },
    ];
  },
};

export default nextConfig;

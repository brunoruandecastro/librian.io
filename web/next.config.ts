import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverComponentsExternalPackages: [
      '192.168.1.7',
      '*.local',
      'localhost',
      '127.0.0.1'
    ]
  }
};

export default nextConfig;

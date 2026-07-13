import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-contained production server (server.js + minimal node_modules),
  // so the Infomaniak host never has to run npm install or next build.
  output: "standalone",
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io"
      }
    ]
  }
};

export default nextConfig;

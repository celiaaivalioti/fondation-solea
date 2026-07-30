import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-contained production server (server.js + minimal node_modules),
  // so the Infomaniak host never has to run npm install or next build.
  output: "standalone",
  trailingSlash: true,
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800, stale-while-revalidate=2592000"
          }
        ]
      }
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io"
      }
    ]
  }
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Placeholder image source. Once every image is a local /public file
    // (see public/artwork/README.md), these remote patterns can be removed.
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
    ],
  },
};

export default nextConfig;

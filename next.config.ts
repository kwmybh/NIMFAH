import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // /terminal was this design's address until it became the home page. Anything already
  // pointing there — a message, a bookmark, a crawler's index — lands on the same page
  // rather than a 404, and is told the move is permanent.
  async redirects() {
    return [{ source: "/terminal", destination: "/", permanent: true }];
  },
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

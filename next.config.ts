import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // /terminal was this design's address until it became the home page. Anything already
  // pointing there — a message, a bookmark, a crawler's index — lands on the same page
  // rather than a 404, and is told the move is permanent.
  async redirects() {
    return [
      { source: "/terminal", destination: "/", permanent: true },
      // Work became Portfolio (1 Oct 2026): the hub for every category of work. Old
      // links — the résumé, LinkedIn, anything already shared — follow it permanently.
      { source: "/work", destination: "/portfolio", permanent: true },
      { source: "/work/:path*", destination: "/portfolio/:path*", permanent: true },
    ];
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

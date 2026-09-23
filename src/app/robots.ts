import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

// The site is deliberately indexable: the whole point is that a hiring manager can
// find it. The one exclusion is the client vault, which is not public-facing work.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/vault"] }],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}

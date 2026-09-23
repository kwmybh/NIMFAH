import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

// The site is deliberately indexable: the whole point is that a hiring manager can
// find it. Nothing is excluded — the client vault that used to be is gone.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}

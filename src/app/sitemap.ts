import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { SHOW_PHOTOGRAPHY, SERIES } from "@/lib/data";

// Only routes that actually resolve. The photography series are behind a flag and
// currently 404, so listing them would hand a crawler a page of dead URLs.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/work`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    {
      url: `${siteUrl}/work/first-15-last-mile-onboarding`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  if (SHOW_PHOTOGRAPHY) {
    for (const s of SERIES) {
      pages.push({
        url: `${siteUrl}/series/${s.idx}`,
        lastModified: now,
        changeFrequency: "yearly",
        priority: 0.5,
      });
    }
  }
  return pages;
}

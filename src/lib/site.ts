// Canonical origin, in one place. layout.tsx, robots.ts and sitemap.ts all need it and
// must agree: a sitemap on one origin and metadata on another is worse than neither.
// Prefers an explicit NEXT_PUBLIC_SITE_URL (set this to the custom domain once DNS
// moves), then Vercel's stable production URL, then the per-deploy URL, then localhost.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

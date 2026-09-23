// The domain is live, so it is the canonical origin — not something to be supplied by
// an environment variable that nobody remembers to set. Deriving this from Vercel's own
// URL is what put https://nimfah.vercel.app into the sitemap, the robots Host line and
// every og:image on the site: three origins serving identical pages and nothing telling
// a crawler which one is the real address.
const PRODUCTION_ORIGIN = "https://nimfah.com";

// Canonical origin, in one place. layout.tsx, robots.ts and sitemap.ts all need it and
// must agree: a sitemap on one origin and metadata on another is worse than neither.
// Production is the domain. Previews keep their own deploy URL so a preview's links
// resolve to the preview; local keeps localhost. NEXT_PUBLIC_SITE_URL still overrides
// everything, for the day the address changes again.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_ENV === "production"
    ? PRODUCTION_ORIGIN
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { bricolage } from "@/lib/fonts";
import { Providers } from "@/components/providers";
import { themeInitScript } from "@/components/theme-provider";

// Canonical origin for absolute metadata/OG URLs. Prefers an explicit NEXT_PUBLIC_SITE_URL
// (set this to a custom domain), then Vercel's stable production URL, then the per-deploy
// URL, then localhost.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

const description =
  "NIMFAH — multidisciplinary practice at the intersection of engineering and fine-art photography.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "NIMFAH — Portfolio",
    template: "NIMFAH — %s",
  },
  description,
  openGraph: {
    title: "NIMFAH — Portfolio",
    description,
    siteName: "NIMFAH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NIMFAH — Portfolio",
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light" className={bricolage.variable} suppressHydrationWarning>
      <head>
        {/* Apply the persisted / preferred theme before first paint (no flash). */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <Providers>{children}</Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

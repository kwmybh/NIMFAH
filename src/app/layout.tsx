import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { bodoni, bricolage, dmSans, plexMono, rajdhani } from "@/lib/fonts";
import { Providers } from "@/components/providers";
import { themeInitScript } from "@/components/theme-provider";
import { siteUrl } from "@/lib/site";

// Canonical origin lives in src/lib/site.ts so robots and sitemap agree with metadata.

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
    <html lang="en" data-theme="dark" className={`${bricolage.variable} ${bodoni.variable} ${plexMono.variable} ${rajdhani.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <head>
        {/* Apply the persisted / preferred theme before first paint (no flash). */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {/* Arm the reveal layer before first paint. Everything [data-reveal] stays
            visible unless this runs, so no-JS and broken-JS both render a complete
            page rather than an empty one. */}
        <script dangerouslySetInnerHTML={{ __html: 'document.documentElement.dataset.motion="on"' }} />
      </head>
      <body>
        <Providers>{children}</Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

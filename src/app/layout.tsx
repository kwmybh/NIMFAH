import type { Metadata } from "next";
import "./globals.css";
import { bricolage } from "@/lib/fonts";
import { Providers } from "@/components/providers";
import { themeInitScript } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: {
    default: "NIMFAH — Portfolio",
    template: "NIMFAH — %s",
  },
  description:
    "NIMFAH — multidisciplinary practice at the intersection of engineering and fine-art photography.",
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
      </body>
    </html>
  );
}

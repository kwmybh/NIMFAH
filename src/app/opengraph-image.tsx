import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Branded social-share card (also used for Twitter). Next auto-wires the resulting image
// into og:image / twitter:image. Gallery-white editorial look with the Bricolage wordmark.
export const alt = "NIMFAH — Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  // Read at build time (this image is statically prerendered) from the bundled TTFs.
  const [extraBold, regular] = await Promise.all([
    readFile(join(process.cwd(), "src/app/og-bricolage-800.ttf")),
    readFile(join(process.cwd(), "src/app/og-bricolage-400.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          fontFamily: "Bricolage",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", marginBottom: 30 }}>
          <div
            style={{
              width: 11,
              height: 11,
              borderRadius: 11,
              background: "#2e7d17",
              marginRight: 14,
            }}
          />
          <div
            style={{
              fontSize: 22,
              fontWeight: 400,
              letterSpacing: 8,
              color: "#66666e",
            }}
          >
            PORTFOLIO
          </div>
        </div>
        <div
          style={{
            fontSize: 210,
            fontWeight: 800,
            letterSpacing: -5,
            lineHeight: 1,
            color: "#101013",
          }}
        >
          NIMFAH
        </div>
        <div
          style={{
            fontSize: 26,
            fontWeight: 400,
            letterSpacing: 6,
            color: "#66666e",
            marginTop: 40,
          }}
        >
          DESIGNER WHO BUILDS
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Bricolage", data: extraBold, weight: 800, style: "normal" },
        { name: "Bricolage", data: regular, weight: 400, style: "normal" },
      ],
    },
  );
}

import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// iOS home-screen icon (Apple adds the rounded corners). Bricolage "N" on brand black.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const font = await readFile(join(process.cwd(), "src/app/og-bricolage-800.ttf"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#101013",
          color: "#f4f3ee",
          fontFamily: "Bricolage",
          fontWeight: 800,
          fontSize: 132,
          letterSpacing: -4,
        }}
      >
        N
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Bricolage", data: font, weight: 800, style: "normal" }],
    },
  );
}

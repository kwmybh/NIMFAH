import type { Metadata } from "next";
import { SERIES } from "@/lib/data";
import { SeriesGallery } from "@/components/series-gallery";

export const metadata: Metadata = {
  // `absolute` because the root-segment page doesn't inherit the layout's title template.
  title: { absolute: "NIMFAH — Artwork" },
};

// Artwork (home): oversized wordmark over a lead artwork, then the four series galleries.
export default function Home() {
  return (
    <section>
      <div className="hero">
        <div className="hero-frame">
          <div className="hero-img">
            {/* eslint-disable-next-line @next/next/no-img-element -- royalty-free placeholder, replaced with client work */}
            <img
              src="https://picsum.photos/seed/nimfah-a/1800/1070?grayscale"
              alt="Lead artwork — monochrome photograph"
            />
          </div>
        </div>
        <h1 className="wordmark" aria-label="NIMFAH">
          NIMFAH
        </h1>
      </div>

      <p className="locations">Accra – Toronto – Washington DC</p>

      <div className="galleries">
        {SERIES.map((s) => (
          <SeriesGallery key={s.idx} cfg={s} />
        ))}
      </div>
    </section>
  );
}

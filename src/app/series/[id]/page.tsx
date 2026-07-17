import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { SERIES, getSeries, seriesMeta } from "@/lib/data";

type Params = { id: string };

// Pre-render the four known series (01–04); any other id 404s.
export function generateStaticParams(): Params[] {
  return SERIES.map((s) => ({ id: s.idx }));
}
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { id } = await params;
  const series = getSeries(id);
  return { title: series ? series.title : "Series" };
}

export default async function SeriesDetail({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;
  const series = getSeries(id);
  if (!series) notFound();

  const count = series.frames.length;

  return (
    <div className="detail">
      <Link href="/" className="back">
        ← All artwork
      </Link>
      <h1>{series.title}</h1>
      <p className="meta">
        Series {series.idx} · {seriesMeta(series)}
      </p>
      <div className="frame-grid">
        {series.frames.map((src, i) => {
          const n = String(i + 1).padStart(2, "0");
          return (
            <figure key={i}>
              <div className="frame-thumb">
                <Image
                  src={src}
                  alt={`${series.title} — frame ${n}`}
                  fill
                  sizes="(max-width: 640px) 45vw, 300px"
                />
              </div>
              <figcaption>
                {n} / {count}
              </figcaption>
            </figure>
          );
        })}
      </div>
    </div>
  );
}

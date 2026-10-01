"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { GalleryPiece } from "@/lib/gallery";

// Tiles that open into a native <dialog>: showModal() gives the focus trap, Esc to
// close, an inert page behind and focus returned to the tile on close, without a
// library. Left/right arrows step through the set while it is open.
export function GalleryGrid({ pieces }: { pieces: GalleryPiece[] }) {
  const dlg = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const [i, setI] = useState<number | null>(null);

  const open = (n: number, el: HTMLButtonElement) => {
    opener.current = el;
    setI(n);
  };
  const close = useCallback(() => dlg.current?.close(), []);
  const step = useCallback(
    (d: number) => setI((c) => (c === null ? c : (c + d + pieces.length) % pieces.length)),
    [pieces.length],
  );

  useEffect(() => {
    const d = dlg.current;
    if (i !== null && d && !d.open) d.showModal();
  }, [i]);

  const p = i === null ? null : pieces[i];

  return (
    <>
      <ul className="gal-grid">
        {pieces.map((g, n) => (
          <li key={g.slug} className="gal-tile">
            <button type="button" className="gal-open" onClick={(e) => open(n, e.currentTarget)}>
              <span className="gal-frame">
                <Image
                  src={g.src}
                  alt={g.alt}
                  width={g.w}
                  height={g.h}
                  sizes="(max-width: 700px) 92vw, (max-width: 1100px) 46vw, 420px"
                />
              </span>
              <span className="gal-title">{g.title}</span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dlg}
        className="gal-dialog"
        aria-label={p ? p.title : "Piece"}
        onClose={() => {
          setI(null);
          opener.current?.focus();
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        onClick={(e) => {
          // a click on the backdrop (the dialog box itself, outside its content) closes
          if (e.target === e.currentTarget) close();
        }}
      >
        {p ? (
          <figure className="gal-fig">
            <Image src={p.src} alt={p.alt} width={p.w} height={p.h} sizes="90vw" className="gal-big" />
            <figcaption>
              <span>{p.caption}</span>
              <span className="gal-count" aria-hidden="true">
                {String((i ?? 0) + 1).padStart(2, "0")} / {String(pieces.length).padStart(2, "0")}
              </span>
            </figcaption>
          </figure>
        ) : null}
        <div className="gal-ctrls">
          <button type="button" onClick={() => step(-1)} aria-label="Previous piece">
            ←
          </button>
          <button type="button" onClick={() => step(1)} aria-label="Next piece">
            →
          </button>
          <button type="button" onClick={close} className="gal-close">
            Close
          </button>
        </div>
      </dialog>
    </>
  );
}

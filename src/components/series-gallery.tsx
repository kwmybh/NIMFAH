"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Series } from "@/lib/data";
import { seriesMeta } from "@/lib/data";
import { makeVtt, makeWav } from "@/lib/audio";

type ItemKind = "photo" | "film" | "sound";
type Item = { kind: ItemKind; label: string; n?: number; glyph: string };

// The five-item media reel: Frame 01 / Reel / Frame 02 / Sound / Frame 03.
const ITEMS: Item[] = [
  { kind: "photo", label: "Frame 01", n: 1, glyph: "▣" },
  { kind: "film", label: "Reel", glyph: "▶" },
  { kind: "photo", label: "Frame 02", n: 2, glyph: "▣" },
  { kind: "sound", label: "Sound", glyph: "♪" },
  { kind: "photo", label: "Frame 03", n: 3, glyph: "▣" },
];

const NUM_BARS = 46;

function fmt(seconds: number): string {
  const s = Math.max(0, Math.floor(seconds || 0));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

// Draw the 46-bar level meter onto the sound-stage canvas. Animates when `active`,
// otherwise draws a low idle pattern (also used under prefers-reduced-motion).
function drawBars(canvas: HTMLCanvasElement, active: boolean) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const w = canvas.width;
  const h = canvas.height;
  const accent =
    getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim() || "#2E7D17";
  ctx.fillStyle = "#0a0a0b";
  ctx.fillRect(0, 0, w, h);
  const bw = w / NUM_BARS;
  const now = performance.now() / 1000;
  for (let i = 0; i < NUM_BARS; i++) {
    const amp = active
      ? 0.18 + 0.82 * Math.abs(Math.sin(now * 2.2 + i * 0.5) * Math.cos(now * 0.7 + i * 0.22))
      : 0.1 + 0.03 * Math.sin(i * 0.6);
    const bh = amp * h * 0.62;
    const x = i * bw + bw * 0.22;
    ctx.fillStyle = i % 3 === 0 ? accent : "rgba(130,130,140,.45)";
    ctx.fillRect(x, h / 2 - bh / 2, bw * 0.56, bh);
  }
}

export function SeriesGallery({ cfg }: { cfg: Series }) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [ccOn, setCcOn] = useState(false);
  const [muted, setMuted] = useState(false);

  const item = ITEMS[active];

  // Media element for the active item (video DOM node or a runtime Audio object).
  const mediaRef = useRef<HTMLMediaElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const timeRef = useRef<HTMLSpanElement | null>(null);
  const seekRef = useRef<HTMLInputElement | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);
  const wavUrlRef = useRef<string | null>(null);
  const vttUrlRef = useRef<string | null>(null);
  const volumeRef = useRef(0.8);
  const playingRef = useRef(false);

  // Revoke the lazily generated audio + captions blobs when the gallery unmounts.
  useEffect(() => {
    return () => {
      if (wavUrlRef.current) URL.revokeObjectURL(wavUrlRef.current);
      if (vttUrlRef.current) URL.revokeObjectURL(vttUrlRef.current);
    };
  }, []);

  // Wire up / tear down the media element whenever the active item changes.
  useEffect(() => {
    const current = ITEMS[active];

    // Reset the transport DOM for the new item (React state is reset in selectItem()).
    playingRef.current = false;
    if (seekRef.current) seekRef.current.value = "0";
    if (timeRef.current) timeRef.current.textContent = "0:00 / 0:00";

    let media: HTMLMediaElement | null = null;
    let createdAudio: HTMLAudioElement | null = null;

    if (current.kind === "film") {
      media = videoRef.current;
      if (media) {
        // Attach captions lazily (generated once, cached, revoked on unmount).
        if (!vttUrlRef.current) vttUrlRef.current = makeVtt(cfg.title, cfg.filmMeta);
        const trackEl = media.querySelector("track");
        if (trackEl && !trackEl.getAttribute("src")) {
          trackEl.setAttribute("src", vttUrlRef.current);
        }
        // Caption visibility itself is synced to `ccOn` by a dedicated effect below.
      }
    } else if (current.kind === "sound") {
      if (!wavUrlRef.current) wavUrlRef.current = makeWav(cfg.base);
      createdAudio = new Audio();
      createdAudio.src = wavUrlRef.current;
      createdAudio.preload = "auto";
      media = createdAudio;
    }

    mediaRef.current = media;
    if (!media) return; // photo — nothing to play

    media.volume = volumeRef.current;
    media.muted = false;

    const onEnded = () => {
      playingRef.current = false;
      setPlaying(false);
    };
    media.addEventListener("ended", onEnded);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const tick = () => {
      const m = mediaRef.current;
      if (m) {
        const cur = m.currentTime || 0;
        const dur = m.duration || 0;
        if (timeRef.current) timeRef.current.textContent = `${fmt(cur)} / ${fmt(dur)}`;
        if (seekRef.current && document.activeElement !== seekRef.current) {
          seekRef.current.value = String(dur > 0 ? Math.round((cur / dur) * 1000) : 0);
        }
      }
      if (canvasRef.current) {
        drawBars(canvasRef.current, playingRef.current && !reduce.matches);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      media.removeEventListener("ended", onEnded);
      media.pause();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      if (createdAudio) createdAudio.src = "";
    };
  }, [active, cfg]);

  // Sync caption visibility to the live TextTrack. `TextTrack.mode` has no declarative
  // React API — it must be written on the DOM object — which the immutability rule can't
  // model, so it's disabled here for this necessary, safe imperative write.
  useEffect(() => {
    const video = videoRef.current;
    const track = video?.textTracks?.[0];
    // eslint-disable-next-line react-hooks/immutability
    if (track) track.mode = ccOn ? "showing" : "hidden";
  }, [ccOn, active]);

  function setPlay(p: boolean) {
    playingRef.current = p;
    setPlaying(p);
  }

  // Switch tabs: reset transport state, then change the active item (which re-wires media).
  function selectItem(i: number) {
    setPlay(false);
    setCcOn(false);
    setMuted(false);
    setActive(i);
  }

  function togglePlay() {
    const media = mediaRef.current;
    if (!media) return;
    if (playingRef.current) {
      media.pause();
      setPlay(false);
    } else {
      const p = media.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
      setPlay(true);
    }
  }

  function onSeek(e: React.ChangeEvent<HTMLInputElement>) {
    const media = mediaRef.current;
    if (media && media.duration) {
      media.currentTime = (Number(e.target.value) / 1000) * media.duration;
    }
  }

  function onVolume(e: React.ChangeEvent<HTMLInputElement>) {
    const v = Number(e.target.value);
    volumeRef.current = v;
    const media = mediaRef.current;
    if (media) {
      media.volume = v;
      media.muted = v === 0;
      setMuted(v === 0);
    }
  }

  function toggleMute() {
    const media = mediaRef.current;
    if (!media) return;
    media.muted = !media.muted;
    setMuted(media.muted);
  }

  function toggleCc() {
    setCcOn((v) => !v);
  }

  function onRailKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    let i = active;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") i = (i + 1) % ITEMS.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") i = (i - 1 + ITEMS.length) % ITEMS.length;
    else if (e.key === "Home") i = 0;
    else if (e.key === "End") i = ITEMS.length - 1;
    else return;
    e.preventDefault();
    selectItem(i);
    tabRefs.current[i]?.focus();
  }

  const captionText =
    item.kind === "photo"
      ? `${item.label} — royalty-free placeholder shown; replace with your own photograph. Arrow keys move through the series.`
      : item.kind === "film"
        ? `Film reel — ${cfg.filmMeta}. Royalty-free sample footage. Play, scrub, or use captions.`
        : cfg.transcript;

  return (
    <article className="series">
      <div className="series-head">
        <div className="series-head-title">
          <span className="idx">Series {cfg.idx}</span>
          <h2>{cfg.title}</h2>
        </div>
        <span className="meta">{seriesMeta(cfg)}</span>
      </div>

      <div className="stage">
        {item.kind === "photo" && (
          <Image
            src={cfg.frames[(item.n ?? 1) - 1] ?? cfg.frames[0]}
            alt={`${cfg.title} — ${item.label}`}
            fill
            sizes="(max-width: 1600px) 100vw, 1500px"
          />
        )}
        {item.kind === "film" && (
          <>
            <video
              ref={videoRef}
              src={cfg.film}
              poster={cfg.poster}
              preload="metadata"
              playsInline
              crossOrigin="anonymous"
              aria-label={`Placeholder film reel for the ${cfg.title} series`}
            >
              {/* src is attached imperatively (generated VTT blob) when the reel loads */}
              <track kind="captions" srcLang="en" label="English" default />
            </video>
            <div className="badge">
              <span className="dot" />
              <span>REEL / {cfg.idx}</span>
            </div>
          </>
        )}
        {item.kind === "sound" && (
          <>
            <canvas ref={canvasRef} width={1280} height={800} aria-hidden="true" />
            <div className="sound-label">
              <div className="k">Field recording</div>
              <div className="v">{cfg.sound}</div>
            </div>
          </>
        )}
      </div>

      <div className="transport" hidden={item.kind === "photo"}>
        <button
          type="button"
          className="play"
          aria-label={playing ? "Pause" : "Play"}
          onClick={togglePlay}
        >
          {playing ? "❚❚" : "▶"}
        </button>
        <span className="time" aria-hidden="true" ref={timeRef}>
          0:00 / 0:00
        </span>
        <input
          className="seek"
          ref={seekRef}
          type="range"
          min={0}
          max={1000}
          defaultValue={0}
          aria-label="Seek position"
          onChange={onSeek}
        />
        <button
          type="button"
          className="cc"
          aria-pressed={ccOn}
          aria-label={ccOn ? "Turn captions off" : "Turn captions on"}
          hidden={item.kind !== "film"}
          onClick={toggleCc}
        >
          CC
        </button>
        <button
          type="button"
          className="mute"
          aria-label={muted ? "Unmute" : "Mute"}
          onClick={toggleMute}
        >
          {muted ? "✕" : "♪"}
        </button>
        <input
          className="vol"
          type="range"
          min={0}
          max={1}
          step={0.01}
          defaultValue={0.8}
          aria-label="Volume"
          onChange={onVolume}
        />
      </div>

      <div className="caption" aria-live="polite">
        {captionText}
      </div>

      <div
        className="rail"
        role="tablist"
        aria-label={`${cfg.title} media selector`}
        onKeyDown={onRailKeyDown}
      >
        {ITEMS.map((it, i) => (
          <button
            key={it.label}
            type="button"
            role="tab"
            aria-selected={active === i}
            tabIndex={active === i ? 0 : -1}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            onClick={() => selectItem(i)}
          >
            <span aria-hidden="true">{it.glyph}</span>
            {it.label}
          </button>
        ))}
      </div>

      <Link href={`/series/${cfg.idx}`} className="view-all">
        View all frames →
      </Link>
    </article>
  );
}

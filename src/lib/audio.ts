// Runtime-generated placeholder audio + captions (browser-only; call from client code).
// The "field recording" for each series is a 22s ambient WAV synthesized in JS, and the
// video captions are a VTT built on the fly. Both are returned as object URLs — remember
// to URL.revokeObjectURL() them when the owning component unmounts.

// Synthesize a ~22s ambient tone (fundamental + harmonics + slow swell/LFO + noise) and
// return a blob URL to a 16-bit mono WAV.
export function makeWav(base: number): string {
  const sr = 22050;
  const dur = 22;
  const n = sr * dur;
  const buf = new ArrayBuffer(44 + n * 2);
  const dv = new DataView(buf);
  const wr = (o: number, s: string) => {
    for (let i = 0; i < s.length; i++) dv.setUint8(o + i, s.charCodeAt(i));
  };
  wr(0, "RIFF");
  dv.setUint32(4, 36 + n * 2, true);
  wr(8, "WAVE");
  wr(12, "fmt ");
  dv.setUint32(16, 16, true);
  dv.setUint16(20, 1, true);
  dv.setUint16(22, 1, true);
  dv.setUint32(24, sr, true);
  dv.setUint32(28, sr * 2, true);
  dv.setUint16(32, 2, true);
  dv.setUint16(34, 16, true);
  wr(36, "data");
  dv.setUint32(40, n * 2, true);
  let o = 44;
  for (let i = 0; i < n; i++) {
    const t = i / sr;
    const swell = 0.45 + 0.55 * Math.sin((2 * Math.PI * t) / dur - Math.PI / 2);
    const lfo = 0.6 + 0.4 * Math.sin(2 * Math.PI * 0.07 * t);
    let s =
      Math.sin(2 * Math.PI * base * t) +
      0.6 * Math.sin(2 * Math.PI * base * 1.5 * t) +
      0.4 * Math.sin(2 * Math.PI * base * 2 * t);
    s += 0.14 * (Math.random() * 2 - 1);
    dv.setInt16(o, Math.max(-1, Math.min(1, s * 0.11 * swell * lfo)) * 32767, true);
    o += 2;
  }
  return URL.createObjectURL(new Blob([buf], { type: "audio/wav" }));
}

// Build a small WEBVTT captions track for the placeholder film reel; return a blob URL.
export function makeVtt(title: string, filmMeta: string): string {
  const vtt = `WEBVTT\n\n00:00.000 --> 00:05.000\n[ ${title} — ambient location sound ]\n\n00:05.000 --> 00:11.000\n[ ${filmMeta} ]\n\n00:11.000 --> 00:18.000\n[ no dialogue ]\n`;
  return URL.createObjectURL(new Blob([vtt], { type: "text/vtt" }));
}

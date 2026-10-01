// Pre-rendered TV snow: a few square tiles of random gray, made once and reused. Each
// frame paints one of them as a pattern at a random offset, which reads as fresh static
// without generating a full screen of random pixels sixty times a second.
let cache: HTMLCanvasElement[] | null = null;

export function noiseTiles(count = 4, size = 192): HTMLCanvasElement[] {
  if (cache) return cache;
  cache = Array.from({ length: count }, () => {
    const c = document.createElement("canvas");
    c.width = size;
    c.height = size;
    const ctx = c.getContext("2d")!;
    const d = ctx.createImageData(size, size);
    for (let i = 0; i < d.data.length; i += 4) {
      const v = Math.random() * 255;
      d.data[i] = d.data[i + 1] = d.data[i + 2] = v;
      d.data[i + 3] = 255;
    }
    ctx.putImageData(d, 0, 0);
    return c;
  });
  return cache;
}

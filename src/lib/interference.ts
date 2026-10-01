// A tile of broadcast "herringbone" interference: fine diagonal stripes in a soft sine
// profile. Made once; painted as a moving pattern by the broadcast portrait and layer.
let tile: HTMLCanvasElement | null = null;

export function interferenceTile(size = 96): HTMLCanvasElement {
  if (tile) return tile;
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const ctx = c.getContext("2d")!;
  const d = ctx.createImageData(size, size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      // two crossing frequencies → the woven look of co-channel interference. Whole
      // numbers of cycles per tile (3,8) and (7,-2), so the tile repeats without seams.
      const k = (2 * Math.PI) / size;
      const v = 0.5 + 0.35 * Math.sin((3 * x + 8 * y) * k) + 0.15 * Math.sin((7 * x - 2 * y) * k);
      const i = (y * size + x) * 4;
      d.data[i] = d.data[i + 1] = d.data[i + 2] = Math.max(0, Math.min(255, v * 255));
      d.data[i + 3] = 255;
    }
  }
  ctx.putImageData(d, 0, 0);
  tile = c;
  return c;
}

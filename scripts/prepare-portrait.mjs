import sharp from "sharp";
import { writeFile } from "node:fs/promises";
import { fileURLToPath, URL } from "node:url";
import { resolve } from "node:path";
import { Buffer } from "node:buffer";
import process from "node:process";
import console from "node:console";

const root = fileURLToPath(new URL("../", import.meta.url));
const width = 280;
const height = 288;
export const stride = 8;

export function isBackground(red, green, blue) {
  return blue > 120 && blue > red * 1.55 && green > red * 1.3;
}

export function reliefDepth(x, y) {
  // A smooth oval preserves the head's volume without adding eyes, a nose, or a mouth.
  const oval = 1 - ((x - 0.5) / 0.29) ** 2 - ((y - 0.38) / 0.41) ** 2;
  return 0.26 * Math.sqrt(Math.max(0, oval));
}

export function portraitPreview(points) {
  const circles = [];
  const projection = 1 / Math.tan(Math.PI / 10);
  const linear = (value) => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  for (let i = 0; i < points.length; i += stride) {
    const [x, y, z, red, green, blue, opacity, seed] = points.slice(i, i + stride);
    const phase = seed * Math.PI * 2;
    const drift = 0.008 + seed * 0.018;
    // Match the live shader's first frame, including its depth, drift, and camera offset.
    const px = x + (Math.sin(phase) + 0.35 * Math.sin(phase * 2.7)) * drift;
    const py = y - 0.14 + (Math.cos(phase * 1.9) + 0.35 * Math.sin(phase)) * drift;
    const pz = z + Math.sin(phase * 0.8) * 0.5 * drift;
    const scale = projection / (5.5 - pz);
    const ndcY = py * scale;
    const fade = Math.max(0, Math.min(1, (y + 1.44) / 0.32));
    const bottomFade = fade * fade * (3 - 2 * fade);
    const rgb = [red, green, blue].map(linear);
    const brightness = Math.sqrt(rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722);
    const tone = 0.6 + brightness * 0.65;
    const alpha = Math.min(1, opacity * tone * bottomFade * 3.5);
    const cx = 300 + px * scale * 300;
    const cy = 300 - ndcY * 300;
    if (alpha < 0.005 || cy < -5 || cy > 605) continue;
    const radius = (2.8 + seed * seed * 3.2) * 5.5 / (5.5 - pz) / 2;
    circles.push(`<circle cx="${cx.toFixed(2)}" cy="${cy.toFixed(2)}" r="${radius.toFixed(2)}" fill="url(#point)" opacity="${alpha.toFixed(2)}"/>`);
  }
  const glow = '<defs><radialGradient id="point"><stop stop-color="#1856b2"/><stop offset=".2" stop-color="#1856b2"/><stop offset=".4" stop-color="#1856b2" stop-opacity=".48"/><stop offset=".7" stop-color="#1856b2" stop-opacity=".14"/><stop offset="1" stop-color="#1856b2" stop-opacity="0"/></radialGradient></defs>';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">${glow}${circles.join("")}</svg>\n`;
}

export async function preparePortrait() {
  const image = sharp(resolve(root, "public/images/particle-portrait-source.jpg"));
  const { width: sourceWidth, height: sourceHeight } = await image.metadata();
  if (!sourceWidth || !sourceHeight) throw new Error("Portrait dimensions unavailable");
  const { data } = await image
    .extract({
      left: Math.round(sourceWidth * 250 / 1600),
      top: Math.round(sourceHeight * 100 / 1600),
      width: Math.round(sourceWidth * 1100 / 1600),
      height: Math.round(sourceHeight * 1132 / 1600),
    })
    .resize(width, height).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const points = [];
  let randomState = 43;
  const random = () => ((randomState = Math.imul(randomState, 1664525) + 1013904223 >>> 0) / 4294967296);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const offset = (y * width + x) * 3;
      const [red, green, blue] = data.subarray(offset, offset + 3);
      if (isBackground(red, green, blue)) continue;
      const nx = (x + 0.5) / width;
      const ny = (y + 0.5) / height;
      const edge = Math.min(1, nx * 18, (1 - nx) * 18, (1 - ny) * 10);
      // Keep the head dense; softly dissolve the suit into the surrounding space.
      const density = ny < 0.72 ? 0.68 : 0.68 * Math.max(0.12, (1 - ny) / 0.28);
      if (random() > density * edge) continue;
      const seed = random();
      points.push(
        (nx - 0.5 + (random() - 0.5) / width * 0.65) * 2.8,
        (0.5 - ny + (random() - 0.5) / height * 0.65) * 2.88,
        reliefDepth(nx, ny) + (random() - 0.5) * 0.008,
        red / 255, green / 255, blue / 255, edge, seed,
      );
    }
  }

  // Shuffle once so a smaller draw range on phones still covers the entire portrait.
  for (let i = points.length / stride - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    for (let k = 0; k < stride; k++) {
      [points[i * stride + k], points[j * stride + k]] = [points[j * stride + k], points[i * stride + k]];
    }
  }
  const buffer = Buffer.alloc(8 + points.length * 4);
  buffer.write("TP01");
  buffer.writeUInt32LE(points.length / stride, 4);
  points.forEach((value, i) => buffer.writeFloatLE(value, 8 + i * 4));
  await writeFile(resolve(root, "public/images/portrait-particles.bin"), buffer);
  await writeFile(resolve(root, "public/images/portrait-particles.svg"),
    portraitPreview(points));
  console.log(`Prepared ${points.length / stride} particles (${Math.round(buffer.length / 1024)} KiB) and a matching blue SVG preview.`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await preparePortrait();

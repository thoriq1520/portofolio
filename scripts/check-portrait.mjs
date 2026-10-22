import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { URL } from "node:url";
import console from "node:console";
import { isBackground, reliefDepth, stride } from "./prepare-portrait.mjs";

assert.equal(isBackground(0, 130, 255), true, "Exclude the blue backdrop");
assert.equal(isBackground(190, 150, 130), false, "Keep skin tones");
assert.equal(isBackground(20, 28, 50), false, "Keep dark hair and the suit");
assert.ok(reliefDepth(0.5, 0.38) > reliefDepth(0.22, 0.38), "The head has a smooth volume");
assert.ok(Math.abs(reliefDepth(0.4, 0.4) - reliefDepth(0.6, 0.4)) < 1e-10, "Faceless depth stays symmetric without eye or nose features");
assert.ok(reliefDepth(0.5, 0.46) - reliefDepth(0.45, 0.46) < 0.01, "The center has no narrow nose protrusion");
const file = await readFile(new URL("../public/images/portrait-particles.bin", import.meta.url));
assert.equal(file.toString("ascii", 0, 4), "TP01");
const count = file.readUInt32LE(4);
assert.ok(count >= 15000 && count <= 35000, `Unexpected portrait count: ${count}`);
assert.equal(file.length, 8 + count * stride * 4);
let left = 0, right = 0, top = 0, bottom = 0;
for (let i = 0; i < count; i++) {
  const point = Array.from({ length: stride }, (_, k) => file.readFloatLE(8 + (i * stride + k) * 4));
  assert.ok(point.every(Number.isFinite));
  assert.ok(Math.abs(point[0]) <= 1.41 && Math.abs(point[1]) <= 1.45);
  assert.ok(point[2] >= -0.01 && point[2] < 0.6);
  assert.ok(point.slice(3).every((value) => value >= 0 && value <= 1));
  assert.equal(isBackground(...point.slice(3, 6).map((value) => Math.round(value * 255))), false);
  // The phone's draw range must cover all quadrants, rather than the first rows of the photo.
  if (i < 11000) {
    if (point[0] < 0) left++; else right++;
    if (point[1] < 0) bottom++; else top++;
  }
}
assert.ok(Math.min(left, right, top, bottom) > 2000, "Phone sample covers the full portrait");
for (const name of ["portrait-particles.svg"]) {
  const svg = await readFile(new URL(`../public/images/${name}`, import.meta.url), "utf8");
  assert.ok(svg.startsWith("<svg") && svg.includes('viewBox="0 0 600 600"'));
  const circles = [...svg.matchAll(/<circle cx="([^"]+)" cy="([^"]+)" r="([^"]+)"/g)];
  assert.ok(circles.length > 15000, "Preview uses the full irregular portrait rather than a sparse grid");
  assert.ok(new Set(circles.slice(0, 100).map((match) => match[3])).size > 20, "Preview dot sizes vary like the live particles");
  assert.ok(!svg.includes("<script") && !svg.includes("href="), "The static fallback is self-contained");
}
console.log(`Portrait checks passed: ${count} finite points, backdrop excluded, 3D relief and phone coverage verified.`);

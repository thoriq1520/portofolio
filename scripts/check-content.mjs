import assert from "node:assert/strict";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { fileURLToPath, URL } from "node:url";
import { log } from "node:console";
import { join } from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const read = (path) => readFileSync(join(root, path), "utf8");
const projects = JSON.parse(read("data/projects.json"));
const registry = read("app/projects/[slug]/page.tsx");
const slugs = projects.map((project) => project.slug);
assert.equal(new Set(slugs).size, slugs.length, "Project slugs must be unique");
assert.deepEqual(
  readdirSync(join(root, "data/projects")).filter((file) => file.endsWith(".mdx")).map((file) => file.slice(0, -4)).sort(),
  [...slugs].sort(),
  "Every case study must have matching project data",
);
for (const project of projects) {
  assert.ok(registry.includes(`import("@/data/projects/${project.slug}.mdx")`), `Missing route loader: ${project.slug}`);
  if (project.cover) assert.ok(existsSync(join(root, "public", project.cover.src)), `Missing cover: ${project.slug}`);
  const publicCopy = JSON.stringify(project) + read(`data/projects/${project.slug}.mdx`);
  assert.doesNotMatch(publicCopy, /\b(?:Rp\.?|IDR|USD)\s*\d|\b(?:salary|hourly rate|contract value)\b/i, `Private financial detail in ${project.slug}`);
}
const experience = JSON.parse(read("data/experience.json"));
assert.equal(experience.find((item) => item.company.includes("Padepokan")).period, "Aug 2023 - Sep 2026");
assert.equal(experience.find((item) => item.company === "Yada Technology").period, "15 Sep - 25 Oct 2026");
assert.equal(experience.find((item) => item.company === "AMC Racing").engagement, "Contract");
log(`Content checks passed: ${projects.length} projects, matching MDX/routes/covers, amended periods, and no financial amounts.`);

import experienceData from "@/data/experience.json";
import profileData from "@/data/profile.json";
import projectsData from "@/data/projects.json";
import skillsData from "@/data/skills.json";

export type Profile = typeof profileData;
export type ExperienceItem = (typeof experienceData)[number];
export type SkillGroup = (typeof skillsData)[number];
export type Project = (typeof projectsData)[number];

const configuredSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.CF_PAGES_URL || "http://localhost:3000";

export const siteUrl = configuredSiteUrl.replace(/\/$/, "");
export const siteName = `${profileData.name} Portfolio`;
export const siteDescription = profileData.tagline;
export const ogImage = "/images/og-cover.webp";

export const profile = profileData;
export const experience = experienceData;
export const skills = skillsData;
export const projects = projectsData;

export function absoluteUrl(path = "/") {
  return new URL(path, `${siteUrl}/`).toString();
}

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

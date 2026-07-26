import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

export type IconName = "briefcase" | "code" | "palette";
export type StatTone = "dark" | "green" | "orange";

export interface NavItem {
  label: string;
  href: string;
}

export interface ProfileContent {
  name: string;
  role: string;
  location: string;
  email: string;
  github: string;
  youtube: string;
  portrait: string;
}

export interface HeroStat {
  value: string;
  label: string;
  tone: StatTone;
}

export interface HeroContent {
  badge: string;
  headline: string;
  intro: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  stats: HeroStat[];
}

export interface FocusArea {
  title: string;
  description: string;
  icon: IconName;
}

export interface TextListSection {
  eyebrow: string;
  title: string;
  items: string[];
}

export interface ProjectLink {
  label: string;
  href: string;
}

export interface ProjectContent {
  name: string;
  type: string;
  date: string;
  image: string;
  description: string;
  tools: string[];
  links: ProjectLink[];
}

export interface WorkSection {
  eyebrow: string;
  title: string;
  description: string;
  emptyLinkText: string;
  projects: ProjectContent[];
}

export interface ToolContent {
  label: string;
  file: string;
}

export interface StackSection {
  eyebrow: string;
  title: string;
  description: string;
  tools: ToolContent[];
}

export interface MediaSection {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  videos: string[];
}

export interface ContactSection {
  eyebrow: string;
  title: string;
  description: string;
}

export interface HomeContent {
  nav: {
    brandLabel: string;
    items: NavItem[];
    contactLabel: string;
  };
  profile: ProfileContent;
  hero: HeroContent;
  focusAreas: FocusArea[];
  experienceSection: TextListSection;
  workSection: WorkSection;
  stackSection: StackSection;
  mediaSection: MediaSection;
  contactSection: ContactSection;
}

const contentFilePath = path.join(process.cwd(), "data", "home-content.json");

const isRecord = (value: unknown): value is Record<string, unknown> =>
  Boolean(value) && typeof value === "object" && !Array.isArray(value);

const objectValue = (value: unknown): Record<string, unknown> =>
  isRecord(value) ? value : {};

const stringValue = (value: unknown, fallback = "") =>
  typeof value === "string" ? value : fallback;

const stringArray = (value: unknown) =>
  Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];

const itemArray = <T>(value: unknown, mapper: (item: Record<string, unknown>) => T) =>
  Array.isArray(value) ? value.map((item) => mapper(objectValue(item))) : [];

const iconValue = (value: unknown): IconName => {
  if (value === "briefcase" || value === "palette" || value === "code") {
    return value;
  }

  return "code";
};

const statToneValue = (value: unknown): StatTone => {
  if (value === "dark" || value === "green" || value === "orange") {
    return value;
  }

  return "dark";
};

export function normalizeHomeContent(value: unknown): HomeContent {
  const raw = objectValue(value);
  const nav = objectValue(raw.nav);
  const profile = objectValue(raw.profile);
  const hero = objectValue(raw.hero);
  const experienceSection = objectValue(raw.experienceSection);
  const workSection = objectValue(raw.workSection);
  const stackSection = objectValue(raw.stackSection);
  const mediaSection = objectValue(raw.mediaSection);
  const contactSection = objectValue(raw.contactSection);

  return {
    nav: {
      brandLabel: stringValue(nav.brandLabel, "Gabriel F."),
      contactLabel: stringValue(nav.contactLabel, "Contact"),
      items: itemArray(nav.items, (item) => ({
        label: stringValue(item.label),
        href: stringValue(item.href),
      })),
    },
    profile: {
      name: stringValue(profile.name),
      role: stringValue(profile.role),
      location: stringValue(profile.location),
      email: stringValue(profile.email),
      github: stringValue(profile.github),
      youtube: stringValue(profile.youtube),
      portrait: stringValue(profile.portrait, "/assets/img/FotoProfile.jpg"),
    },
    hero: {
      badge: stringValue(hero.badge),
      headline: stringValue(hero.headline),
      intro: stringValue(hero.intro),
      primaryCtaLabel: stringValue(hero.primaryCtaLabel, "View work"),
      primaryCtaHref: stringValue(hero.primaryCtaHref, "#work"),
      secondaryCtaLabel: stringValue(hero.secondaryCtaLabel, "GitHub"),
      secondaryCtaHref: stringValue(hero.secondaryCtaHref),
      stats: itemArray(hero.stats, (item) => ({
        value: stringValue(item.value),
        label: stringValue(item.label),
        tone: statToneValue(item.tone),
      })),
    },
    focusAreas: itemArray(raw.focusAreas, (item) => ({
      title: stringValue(item.title),
      description: stringValue(item.description),
      icon: iconValue(item.icon),
    })),
    experienceSection: {
      eyebrow: stringValue(experienceSection.eyebrow, "Experience"),
      title: stringValue(experienceSection.title),
      items: stringArray(experienceSection.items),
    },
    workSection: {
      eyebrow: stringValue(workSection.eyebrow, "Selected work"),
      title: stringValue(workSection.title),
      description: stringValue(workSection.description),
      emptyLinkText: stringValue(workSection.emptyLinkText, "Case study link coming soon"),
      projects: itemArray(workSection.projects, (project) => ({
        name: stringValue(project.name),
        type: stringValue(project.type),
        date: stringValue(project.date),
        image: stringValue(project.image),
        description: stringValue(project.description),
        tools: stringArray(project.tools),
        links: itemArray(project.links, (link) => ({
          label: stringValue(link.label),
          href: stringValue(link.href),
        })),
      })),
    },
    stackSection: {
      eyebrow: stringValue(stackSection.eyebrow, "Stack"),
      title: stringValue(stackSection.title),
      description: stringValue(stackSection.description),
      tools: itemArray(stackSection.tools, (tool) => ({
        label: stringValue(tool.label),
        file: stringValue(tool.file),
      })),
    },
    mediaSection: {
      eyebrow: stringValue(mediaSection.eyebrow, "Media"),
      title: stringValue(mediaSection.title),
      description: stringValue(mediaSection.description),
      ctaLabel: stringValue(mediaSection.ctaLabel, "Open YouTube"),
      videos: stringArray(mediaSection.videos),
    },
    contactSection: {
      eyebrow: stringValue(contactSection.eyebrow, "Contact"),
      title: stringValue(contactSection.title),
      description: stringValue(contactSection.description),
    },
  };
}

export async function getHomeContent() {
  const file = await readFile(contentFilePath, "utf8");
  return normalizeHomeContent(JSON.parse(file));
}

export async function saveHomeContent(content: unknown) {
  const normalizedContent = normalizeHomeContent(content);

  await mkdir(path.dirname(contentFilePath), { recursive: true });
  await writeFile(contentFilePath, `${JSON.stringify(normalizedContent, null, 2)}\n`, "utf8");

  return normalizedContent;
}

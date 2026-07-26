"use client";

import { useState, type ReactNode } from "react";
import { ArrowUpRight, Eye, Plus, RefreshCw, Save, Trash2 } from "lucide-react";
import type {
  FocusArea,
  HomeContent,
  IconName,
  ProjectContent,
  ProjectLink,
  StatTone,
  ToolContent,
} from "@/lib/homeContent";

interface AdminContentEditorProps {
  initialContent: HomeContent;
  passwordHint: string;
}

const inputClass =
  "mt-2 w-full rounded-[8px] border border-black/10 bg-white px-3 py-2 text-sm text-black/75 outline-none transition focus:border-[#184f42] focus:ring-2 focus:ring-[#184f42]/10";
const textareaClass =
  "mt-2 w-full rounded-[8px] border border-black/10 bg-white px-3 py-2 text-sm leading-6 text-black/75 outline-none transition focus:border-[#184f42] focus:ring-2 focus:ring-[#184f42]/10";
const panelClass = "rounded-[8px] border border-black/10 bg-white p-5";
const subtleButtonClass =
  "inline-flex h-9 items-center gap-2 rounded-[8px] border border-black/10 bg-white px-3 text-sm font-medium text-black/65 transition hover:border-black/25 hover:text-black";

const iconOptions: { label: string; value: IconName }[] = [
  { label: "Code", value: "code" },
  { label: "Palette", value: "palette" },
  { label: "Briefcase", value: "briefcase" },
];

const toneOptions: { label: string; value: StatTone }[] = [
  { label: "Green", value: "green" },
  { label: "Orange", value: "orange" },
  { label: "Dark", value: "dark" },
];

const splitCsv = (value: string) =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

function replaceAt<T>(items: T[], index: number, item: T) {
  return items.map((current, currentIndex) => (currentIndex === index ? item : current));
}

function removeAt<T>(items: T[], index: number) {
  return items.filter((_, currentIndex) => currentIndex !== index);
}

const newProject = (): ProjectContent => ({
  name: "New Project",
  type: "Project type",
  date: new Date().getFullYear().toString(),
  image: "/assets/img/Portofolio.jpg",
  description: "Write a short description for this project.",
  tools: ["Next.js"],
  links: [],
});

const newProjectLink = (): ProjectLink => ({
  label: "Live",
  href: "https://example.com",
});

const newTool = (): ToolContent => ({
  label: "New Tool",
  file: "react.svg",
});

const newFocusArea = (): FocusArea => ({
  title: "New Focus Area",
  description: "Describe this focus area.",
  icon: "code",
});

export default function AdminContentEditor({ initialContent, passwordHint }: AdminContentEditorProps) {
  const [content, setContent] = useState<HomeContent>(initialContent);
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("Ready to edit.");
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const updateNav = (patch: Partial<HomeContent["nav"]>) => {
    setContent((current) => ({ ...current, nav: { ...current.nav, ...patch } }));
  };

  const updateProfile = (patch: Partial<HomeContent["profile"]>) => {
    setContent((current) => ({ ...current, profile: { ...current.profile, ...patch } }));
  };

  const updateHero = (patch: Partial<HomeContent["hero"]>) => {
    setContent((current) => ({ ...current, hero: { ...current.hero, ...patch } }));
  };

  const updateExperience = (patch: Partial<HomeContent["experienceSection"]>) => {
    setContent((current) => ({
      ...current,
      experienceSection: { ...current.experienceSection, ...patch },
    }));
  };

  const updateWork = (patch: Partial<HomeContent["workSection"]>) => {
    setContent((current) => ({ ...current, workSection: { ...current.workSection, ...patch } }));
  };

  const updateStack = (patch: Partial<HomeContent["stackSection"]>) => {
    setContent((current) => ({ ...current, stackSection: { ...current.stackSection, ...patch } }));
  };

  const updateMedia = (patch: Partial<HomeContent["mediaSection"]>) => {
    setContent((current) => ({ ...current, mediaSection: { ...current.mediaSection, ...patch } }));
  };

  const updateContact = (patch: Partial<HomeContent["contactSection"]>) => {
    setContent((current) => ({ ...current, contactSection: { ...current.contactSection, ...patch } }));
  };

  const updateProject = (index: number, patch: Partial<ProjectContent>) => {
    setContent((current) => {
      const project = { ...current.workSection.projects[index], ...patch };

      return {
        ...current,
        workSection: {
          ...current.workSection,
          projects: replaceAt(current.workSection.projects, index, project),
        },
      };
    });
  };

  const updateProjectLink = (projectIndex: number, linkIndex: number, patch: Partial<ProjectLink>) => {
    setContent((current) => {
      const project = current.workSection.projects[projectIndex];
      const link = { ...project.links[linkIndex], ...patch };
      const projects = replaceAt(current.workSection.projects, projectIndex, {
        ...project,
        links: replaceAt(project.links, linkIndex, link),
      });

      return { ...current, workSection: { ...current.workSection, projects } };
    });
  };

  const saveContent = async () => {
    setIsSaving(true);
    setStatus("Saving homepage content...");

    try {
      const response = await fetch("/api/home-content", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": password,
        },
        body: JSON.stringify(content),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error ?? "Failed to save content.");
      }

      setContent(result.content);
      setStatus("Saved. Refresh the homepage preview to see the latest content.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Failed to save content.");
    } finally {
      setIsSaving(false);
    }
  };

  const reloadContent = async () => {
    setIsLoading(true);
    setStatus("Reloading content from file...");

    try {
      const response = await fetch("/api/home-content", { cache: "no-store" });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Failed to reload content.");
      }

      setContent(data);
      setStatus("Reloaded latest content from data/home-content.json.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Failed to reload content.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f8f5] text-[#181817]">
      <header className="sticky top-0 z-50 border-b border-black/10 bg-[#f7f8f5]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-[#1f4f46] uppercase">Portfolio Admin</p>
            <h1 className="mt-1 text-2xl font-semibold text-[#181817]">Homepage content editor</h1>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <label className="block min-w-[220px] text-xs font-semibold text-black/55">
              Admin password
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className={inputClass}
                placeholder="Enter password"
              />
            </label>
            <button type="button" onClick={reloadContent} disabled={isLoading} className={subtleButtonClass}>
              <RefreshCw aria-hidden className="h-4 w-4" />
              Reload
            </button>
            <a href="/" target="_blank" rel="noopener noreferrer" className={subtleButtonClass}>
              <Eye aria-hidden className="h-4 w-4" />
              Preview
            </a>
            <button
              type="button"
              onClick={saveContent}
              disabled={isSaving}
              className="inline-flex h-9 items-center gap-2 rounded-[8px] bg-[#184f42] px-4 text-sm font-medium text-white transition hover:bg-[#123c33] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save aria-hidden className="h-4 w-4" />
              {isSaving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-6 lg:grid-cols-[260px_1fr]">
        <aside className="h-fit rounded-[8px] border border-black/10 bg-white p-4 text-sm text-black/62 lg:sticky lg:top-28">
          <p className="font-semibold text-black/80">Editing sections</p>
          <div className="mt-4 space-y-2">
            {[
              ["Profile & Hero", "#profile"],
              ["Navigation", "#navigation"],
              ["Focus Areas", "#focus"],
              ["Experience", "#experience"],
              ["Projects", "#projects"],
              ["Stack", "#stack"],
              ["Media", "#media"],
              ["Contact", "#contact"],
            ].map(([label, href]) => (
              <a key={href} href={href} className="block rounded-[8px] px-3 py-2 transition hover:bg-[#edf1ea] hover:text-black">
                {label}
              </a>
            ))}
          </div>
          <div className="mt-5 rounded-[8px] bg-[#edf1ea] p-3 text-xs leading-5 text-black/60">
            {passwordHint}
          </div>
          <p className="mt-3 rounded-[8px] border border-black/10 p-3 text-xs leading-5 text-black/60">{status}</p>
        </aside>

        <div className="space-y-6">
          <Section id="profile" title="Profile & Hero" description="Edit identity, portrait, headline, intro, CTA, and hero stats.">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Name" value={content.profile.name} onChange={(value) => updateProfile({ name: value })} />
              <Field label="Role" value={content.profile.role} onChange={(value) => updateProfile({ role: value })} />
              <Field label="Location" value={content.profile.location} onChange={(value) => updateProfile({ location: value })} />
              <Field label="Email" value={content.profile.email} onChange={(value) => updateProfile({ email: value })} />
              <Field label="GitHub URL" value={content.profile.github} onChange={(value) => updateProfile({ github: value })} />
              <Field label="YouTube URL" value={content.profile.youtube} onChange={(value) => updateProfile({ youtube: value })} />
              <Field label="Portrait path" value={content.profile.portrait} onChange={(value) => updateProfile({ portrait: value })} />
              <Field label="Hero badge" value={content.hero.badge} onChange={(value) => updateHero({ badge: value })} />
            </div>
            <Field label="Hero headline" value={content.hero.headline} onChange={(value) => updateHero({ headline: value })} textarea />
            <Field label="Hero intro" value={content.hero.intro} onChange={(value) => updateHero({ intro: value })} textarea />
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Primary CTA label" value={content.hero.primaryCtaLabel} onChange={(value) => updateHero({ primaryCtaLabel: value })} />
              <Field label="Primary CTA href" value={content.hero.primaryCtaHref} onChange={(value) => updateHero({ primaryCtaHref: value })} />
              <Field label="Secondary CTA label" value={content.hero.secondaryCtaLabel} onChange={(value) => updateHero({ secondaryCtaLabel: value })} />
              <Field label="Secondary CTA href" value={content.hero.secondaryCtaHref} onChange={(value) => updateHero({ secondaryCtaHref: value })} />
            </div>

            <CollectionHeader label="Hero stats" onAdd={() => updateHero({ stats: [...content.hero.stats, { value: "1", label: "New stat", tone: "dark" }] })} />
            <div className="grid gap-3 md:grid-cols-3">
              {content.hero.stats.map((stat, index) => (
                <div key={`${stat.value}-${index}`} className={panelClass}>
                  <Field
                    label="Value"
                    value={stat.value}
                    onChange={(value) => updateHero({ stats: replaceAt(content.hero.stats, index, { ...stat, value }) })}
                  />
                  <Field
                    label="Label"
                    value={stat.label}
                    onChange={(label) => updateHero({ stats: replaceAt(content.hero.stats, index, { ...stat, label }) })}
                  />
                  <SelectField
                    label="Tone"
                    value={stat.tone}
                    options={toneOptions}
                    onChange={(tone) => updateHero({ stats: replaceAt(content.hero.stats, index, { ...stat, tone }) })}
                  />
                  <RemoveButton onClick={() => updateHero({ stats: removeAt(content.hero.stats, index) })} />
                </div>
              ))}
            </div>
          </Section>

          <Section id="navigation" title="Navigation" description="Edit brand text and menu items shown in the sticky header.">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Brand label" value={content.nav.brandLabel} onChange={(value) => updateNav({ brandLabel: value })} />
              <Field label="Contact button label" value={content.nav.contactLabel} onChange={(value) => updateNav({ contactLabel: value })} />
            </div>
            <CollectionHeader label="Menu items" onAdd={() => updateNav({ items: [...content.nav.items, { label: "New item", href: "#" }] })} />
            <div className="grid gap-3 md:grid-cols-2">
              {content.nav.items.map((item, index) => (
                <div key={`${item.href}-${index}`} className={panelClass}>
                  <Field
                    label="Label"
                    value={item.label}
                    onChange={(label) => updateNav({ items: replaceAt(content.nav.items, index, { ...item, label }) })}
                  />
                  <Field
                    label="Href"
                    value={item.href}
                    onChange={(href) => updateNav({ items: replaceAt(content.nav.items, index, { ...item, href }) })}
                  />
                  <RemoveButton onClick={() => updateNav({ items: removeAt(content.nav.items, index) })} />
                </div>
              ))}
            </div>
          </Section>

          <Section id="focus" title="Focus Areas" description="Edit the three capability cards under the hero.">
            <CollectionHeader label="Focus cards" onAdd={() => setContent((current) => ({ ...current, focusAreas: [...current.focusAreas, newFocusArea()] }))} />
            <div className="grid gap-3 md:grid-cols-3">
              {content.focusAreas.map((area, index) => (
                <div key={`${area.title}-${index}`} className={panelClass}>
                  <Field
                    label="Title"
                    value={area.title}
                    onChange={(title) => setContent((current) => ({ ...current, focusAreas: replaceAt(current.focusAreas, index, { ...area, title }) }))}
                  />
                  <Field
                    label="Description"
                    value={area.description}
                    onChange={(description) =>
                      setContent((current) => ({ ...current, focusAreas: replaceAt(current.focusAreas, index, { ...area, description }) }))
                    }
                    textarea
                  />
                  <SelectField
                    label="Icon"
                    value={area.icon}
                    options={iconOptions}
                    onChange={(icon) => setContent((current) => ({ ...current, focusAreas: replaceAt(current.focusAreas, index, { ...area, icon }) }))}
                  />
                  <RemoveButton onClick={() => setContent((current) => ({ ...current, focusAreas: removeAt(current.focusAreas, index) }))} />
                </div>
              ))}
            </div>
          </Section>

          <Section id="experience" title="Experience" description="Edit experience section copy and list items.">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Eyebrow" value={content.experienceSection.eyebrow} onChange={(value) => updateExperience({ eyebrow: value })} />
              <Field label="Title" value={content.experienceSection.title} onChange={(value) => updateExperience({ title: value })} textarea />
            </div>
            <CollectionHeader label="Experience items" onAdd={() => updateExperience({ items: [...content.experienceSection.items, "New experience"] })} />
            <div className="grid gap-3 md:grid-cols-2">
              {content.experienceSection.items.map((item, index) => (
                <div key={`${item}-${index}`} className={panelClass}>
                  <Field
                    label="Item"
                    value={item}
                    onChange={(value) => updateExperience({ items: replaceAt(content.experienceSection.items, index, value) })}
                  />
                  <RemoveButton onClick={() => updateExperience({ items: removeAt(content.experienceSection.items, index) })} />
                </div>
              ))}
            </div>
          </Section>

          <Section id="projects" title="Projects" description="Add, edit, or remove project cards shown in selected work.">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Eyebrow" value={content.workSection.eyebrow} onChange={(value) => updateWork({ eyebrow: value })} />
              <Field label="Empty link text" value={content.workSection.emptyLinkText} onChange={(value) => updateWork({ emptyLinkText: value })} />
            </div>
            <Field label="Section title" value={content.workSection.title} onChange={(value) => updateWork({ title: value })} textarea />
            <Field label="Section description" value={content.workSection.description} onChange={(value) => updateWork({ description: value })} textarea />
            <CollectionHeader label="Project cards" onAdd={() => updateWork({ projects: [...content.workSection.projects, newProject()] })} />

            <div className="space-y-4">
              {content.workSection.projects.map((project, projectIndex) => (
                <div key={`${project.name}-${projectIndex}`} className={panelClass}>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Name" value={project.name} onChange={(value) => updateProject(projectIndex, { name: value })} />
                    <Field label="Type" value={project.type} onChange={(value) => updateProject(projectIndex, { type: value })} />
                    <Field label="Date" value={project.date} onChange={(value) => updateProject(projectIndex, { date: value })} />
                    <Field label="Image path" value={project.image} onChange={(value) => updateProject(projectIndex, { image: value })} />
                  </div>
                  <Field label="Description" value={project.description} onChange={(value) => updateProject(projectIndex, { description: value })} textarea />
                  <Field
                    label="Tools, comma separated"
                    value={project.tools.join(", ")}
                    onChange={(value) => updateProject(projectIndex, { tools: splitCsv(value) })}
                  />
                  <CollectionHeader
                    label="Project links"
                    compact
                    onAdd={() => updateProject(projectIndex, { links: [...project.links, newProjectLink()] })}
                  />
                  <div className="grid gap-3 md:grid-cols-2">
                    {project.links.map((link, linkIndex) => (
                      <div key={`${link.href}-${linkIndex}`} className="rounded-[8px] border border-black/10 bg-[#f7f8f5] p-4">
                        <Field label="Label" value={link.label} onChange={(value) => updateProjectLink(projectIndex, linkIndex, { label: value })} />
                        <Field label="Href" value={link.href} onChange={(value) => updateProjectLink(projectIndex, linkIndex, { href: value })} />
                        <RemoveButton
                          onClick={() =>
                            updateProject(projectIndex, {
                              links: removeAt(project.links, linkIndex),
                            })
                          }
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => updateWork({ projects: removeAt(content.workSection.projects, projectIndex) })}
                      className="inline-flex h-9 items-center gap-2 rounded-[8px] border border-red-200 bg-red-50 px-3 text-sm font-medium text-red-700 transition hover:bg-red-100"
                    >
                      <Trash2 aria-hidden className="h-4 w-4" />
                      Remove project
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section id="stack" title="Stack" description="Edit the technology section copy and icon list.">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Eyebrow" value={content.stackSection.eyebrow} onChange={(value) => updateStack({ eyebrow: value })} />
              <Field label="Title" value={content.stackSection.title} onChange={(value) => updateStack({ title: value })} textarea />
            </div>
            <Field label="Description" value={content.stackSection.description} onChange={(value) => updateStack({ description: value })} textarea />
            <CollectionHeader label="Tools" onAdd={() => updateStack({ tools: [...content.stackSection.tools, newTool()] })} />
            <div className="grid gap-3 md:grid-cols-3">
              {content.stackSection.tools.map((tool, index) => (
                <div key={`${tool.label}-${index}`} className={panelClass}>
                  <Field
                    label="Label"
                    value={tool.label}
                    onChange={(label) => updateStack({ tools: replaceAt(content.stackSection.tools, index, { ...tool, label }) })}
                  />
                  <Field
                    label="Icon file"
                    value={tool.file}
                    onChange={(file) => updateStack({ tools: replaceAt(content.stackSection.tools, index, { ...tool, file }) })}
                  />
                  <RemoveButton onClick={() => updateStack({ tools: removeAt(content.stackSection.tools, index) })} />
                </div>
              ))}
            </div>
          </Section>

          <Section id="media" title="Media" description="Edit media section copy and embedded YouTube URLs.">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Eyebrow" value={content.mediaSection.eyebrow} onChange={(value) => updateMedia({ eyebrow: value })} />
              <Field label="CTA label" value={content.mediaSection.ctaLabel} onChange={(value) => updateMedia({ ctaLabel: value })} />
            </div>
            <Field label="Title" value={content.mediaSection.title} onChange={(value) => updateMedia({ title: value })} textarea />
            <Field label="Description" value={content.mediaSection.description} onChange={(value) => updateMedia({ description: value })} textarea />
            <CollectionHeader label="Video embeds" onAdd={() => updateMedia({ videos: [...content.mediaSection.videos, "https://www.youtube.com/embed/"] })} />
            <div className="grid gap-3 md:grid-cols-2">
              {content.mediaSection.videos.map((video, index) => (
                <div key={`${video}-${index}`} className={panelClass}>
                  <Field
                    label="Embed URL"
                    value={video}
                    onChange={(value) => updateMedia({ videos: replaceAt(content.mediaSection.videos, index, value) })}
                  />
                  <a href={video} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-[#184f42]">
                    Open link
                    <ArrowUpRight aria-hidden className="h-4 w-4" />
                  </a>
                  <RemoveButton onClick={() => updateMedia({ videos: removeAt(content.mediaSection.videos, index) })} />
                </div>
              ))}
            </div>
          </Section>

          <Section id="contact" title="Contact" description="Edit the closing contact section copy.">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Eyebrow" value={content.contactSection.eyebrow} onChange={(value) => updateContact({ eyebrow: value })} />
              <Field label="Title" value={content.contactSection.title} onChange={(value) => updateContact({ title: value })} textarea />
            </div>
            <Field label="Description" value={content.contactSection.description} onChange={(value) => updateContact({ description: value })} textarea />
          </Section>
        </div>
      </div>
    </main>
  );
}

function Section({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="rounded-[8px] border border-black/10 bg-white/70 p-5 shadow-sm">
      <div className="mb-5 border-b border-black/10 pb-4">
        <h2 className="text-xl font-semibold text-[#181817]">{title}</h2>
        <p className="mt-1 text-sm leading-6 text-black/58">{description}</p>
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  textarea = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  textarea?: boolean;
}) {
  return (
    <label className="block text-xs font-semibold text-black/55">
      {label}
      {textarea ? (
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={textareaClass}
          placeholder={placeholder}
          rows={3}
        />
      ) : (
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={inputClass}
          placeholder={placeholder}
        />
      )}
    </label>
  );
}

function SelectField<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { label: string; value: T }[];
  onChange: (value: T) => void;
}) {
  return (
    <label className="block text-xs font-semibold text-black/55">
      {label}
      <select value={value} onChange={(event) => onChange(event.target.value as T)} className={inputClass}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function CollectionHeader({
  label,
  onAdd,
  compact = false,
}: {
  label: string;
  onAdd: () => void;
  compact?: boolean;
}) {
  return (
    <div className={`flex items-center justify-between ${compact ? "pt-2" : "pt-4"}`}>
      <h3 className="text-sm font-semibold text-black/72">{label}</h3>
      <button type="button" onClick={onAdd} className={subtleButtonClass}>
        <Plus aria-hidden className="h-4 w-4" />
        Add
      </button>
    </div>
  );
}

function RemoveButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-4 inline-flex h-9 items-center gap-2 rounded-[8px] border border-red-200 bg-red-50 px-3 text-sm font-medium text-red-700 transition hover:bg-red-100"
    >
      <Trash2 aria-hidden className="h-4 w-4" />
      Remove
    </button>
  );
}

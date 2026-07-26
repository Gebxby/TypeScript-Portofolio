import {
  ArrowUpRight,
  BriefcaseBusiness,
  Code2,
  Github,
  GraduationCap,
  Mail,
  MapPin,
  Palette,
  Youtube,
} from "lucide-react";
import { getHomeContent, type IconName, type StatTone } from "@/lib/homeContent";
import { toYouTubeEmbedUrl } from "@/lib/youtube";

export const dynamic = "force-dynamic";

const iconMap = {
  briefcase: BriefcaseBusiness,
  code: Code2,
  palette: Palette,
} satisfies Record<IconName, typeof Code2>;

const statToneClass = {
  dark: "text-[#181817]",
  green: "text-[#184f42]",
  orange: "text-[#b45c33]",
} satisfies Record<StatTone, string>;

export default async function Home() {
  const content = await getHomeContent();
  const {
    nav,
    profile,
    hero,
    focusAreas,
    experienceSection,
    workSection,
    stackSection,
    mediaSection,
    contactSection,
  } = content;
  const secondaryCtaIsGithub = hero.secondaryCtaLabel.toLowerCase().includes("git");
  const SecondaryCtaIcon = secondaryCtaIsGithub ? Github : ArrowUpRight;

  return (
    <main className="min-h-screen bg-[#f7f8f5] text-[#181817]">
      <header className="sticky top-0 z-50 border-b border-black/10 bg-[#f7f8f5]/90 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <a href="#top" className="text-sm font-semibold text-[#1f4f46] uppercase">
            {nav.brandLabel}
          </a>
          <div className="hidden items-center gap-6 text-sm text-black/60 md:flex">
            {nav.items.map((item) => (
              <a key={`${item.href}-${item.label}`} href={item.href} className="transition hover:text-black">
                {item.label}
              </a>
            ))}
          </div>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex h-10 items-center gap-2 rounded-[8px] bg-[#184f42] px-4 text-sm font-medium text-white transition hover:bg-[#123c33]"
          >
            <Mail aria-hidden className="h-4 w-4" />
            {nav.contactLabel}
          </a>
        </nav>
      </header>

      <section id="top" className="relative overflow-hidden border-b border-black/10">
        <div className="absolute inset-y-0 right-0 hidden w-[48%] lg:block">
          <img
            src={profile.portrait}
            alt={`Portrait of ${profile.name}`}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#f7f8f5] via-[#f7f8f5]/80 to-[#f7f8f5]/15" />
        </div>

        <div className="mx-auto grid min-h-[78svh] max-w-6xl items-center gap-12 px-5 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
          <div className="relative z-10 max-w-3xl">
            <p className="mb-5 inline-flex items-center gap-2 rounded-[8px] border border-black/10 bg-white/70 px-3 py-2 text-sm font-medium text-black/65">
              <GraduationCap aria-hidden className="h-4 w-4 text-[#b45c33]" />
              {hero.badge || profile.role}
            </p>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[0.98] text-[#171717] sm:text-6xl lg:text-7xl">
              {hero.headline}
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-black/66 sm:text-lg">{hero.intro}</p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href={hero.primaryCtaHref}
                className="inline-flex h-11 items-center gap-2 rounded-[8px] bg-[#181817] px-5 text-sm font-medium text-white transition hover:bg-[#2a2a28]"
              >
                {hero.primaryCtaLabel}
                <ArrowUpRight aria-hidden className="h-4 w-4" />
              </a>
              <a
                href={hero.secondaryCtaHref}
                target={hero.secondaryCtaHref.startsWith("#") ? undefined : "_blank"}
                rel={hero.secondaryCtaHref.startsWith("#") ? undefined : "noopener noreferrer"}
                className="inline-flex h-11 items-center gap-2 rounded-[8px] border border-black/15 bg-white/70 px-5 text-sm font-medium text-black/75 transition hover:border-black/35 hover:text-black"
              >
                <SecondaryCtaIcon aria-hidden className="h-4 w-4" />
                {hero.secondaryCtaLabel}
              </a>
            </div>

            <div className="mt-10 grid max-w-2xl grid-cols-1 gap-3 text-sm text-black/65 sm:grid-cols-3">
              {hero.stats.map((stat) => (
                <div key={`${stat.value}-${stat.label}`} className="border-l border-black/15 pl-4">
                  <span className={`block text-2xl font-semibold ${statToneClass[stat.tone]}`}>{stat.value}</span>
                  {stat.label}
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 aspect-[4/5] overflow-hidden rounded-[8px] border border-black/10 bg-white shadow-sm lg:hidden">
            <img src={profile.portrait} alt={`Portrait of ${profile.name}`} className="h-full w-full object-cover object-center" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-4 md:grid-cols-3">
          {focusAreas.map((area) => {
            const Icon = iconMap[area.icon];

            return (
              <article key={area.title} className="rounded-[8px] border border-black/10 bg-white p-6">
                <Icon aria-hidden className="h-5 w-5 text-[#b45c33]" />
                <h2 className="mt-5 text-lg font-semibold text-[#181817]">{area.title}</h2>
                <p className="mt-3 text-sm leading-6 text-black/60">{area.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-y border-black/10 bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-semibold text-[#1f4f46] uppercase">{experienceSection.eyebrow}</p>
            <h2 className="mt-3 text-3xl font-semibold text-[#181817]">{experienceSection.title}</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {experienceSection.items.map((item) => (
              <div key={item} className="rounded-[8px] border border-black/10 bg-[#f7f8f5] p-5 text-sm font-medium text-black/70">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="work" className="mx-auto max-w-6xl px-5 py-20">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold text-[#1f4f46] uppercase">{workSection.eyebrow}</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold text-[#181817] sm:text-4xl">
              {workSection.title}
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-black/58">{workSection.description}</p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {workSection.projects.map((project) => (
            <article key={project.name} className="overflow-hidden rounded-[8px] border border-black/10 bg-white">
              <div className="relative aspect-[16/9] overflow-hidden bg-[#e8ebe4]">
                <img
                  src={project.image}
                  alt={`${project.name} project preview`}
                  className="h-full w-full object-cover transition duration-500 hover:scale-[1.03]"
                />
              </div>
              <div className="p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-[#b45c33]">{project.type}</p>
                    <h3 className="mt-1 text-2xl font-semibold text-[#181817]">{project.name}</h3>
                  </div>
                  <span className="rounded-[8px] border border-black/10 px-3 py-1 text-sm text-black/55">{project.date}</span>
                </div>
                <p className="mt-4 text-sm leading-6 text-black/62">{project.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <span key={tool} className="rounded-[8px] bg-[#edf1ea] px-3 py-1 text-xs font-medium text-black/65">
                      {tool}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  {project.links.length > 0 ? (
                    project.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-10 items-center gap-2 rounded-[8px] border border-black/15 px-4 text-sm font-medium text-black/75 transition hover:border-[#184f42] hover:text-[#184f42]"
                      >
                        {link.label}
                        <ArrowUpRight aria-hidden className="h-4 w-4" />
                      </a>
                    ))
                  ) : (
                    <span className="text-sm text-black/45">{workSection.emptyLinkText}</span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="stack" className="border-y border-black/10 bg-[#1b1b19] text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-semibold text-[#e0a56f] uppercase">{stackSection.eyebrow}</p>
            <h2 className="mt-3 text-3xl font-semibold">{stackSection.title}</h2>
            <p className="mt-4 text-sm leading-6 text-white/62">{stackSection.description}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {stackSection.tools.map((tool) => (
              <div key={`${tool.label}-${tool.file}`} className="flex h-16 items-center gap-3 rounded-[8px] border border-white/10 bg-white/[0.06] px-4">
                <img src={`/assets/img/${tool.file}`} alt="" className="h-7 w-7 object-contain" />
                <span className="text-sm font-medium text-white/82">{tool.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="media" className="mx-auto max-w-6xl px-5 py-20">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold text-[#1f4f46] uppercase">{mediaSection.eyebrow}</p>
            <h2 className="mt-3 text-3xl font-semibold text-[#181817]">{mediaSection.title}</h2>
            <p className="mt-4 text-sm leading-6 text-black/60">{mediaSection.description}</p>
            <a
              href={profile.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex h-11 items-center gap-2 rounded-[8px] bg-[#c83a30] px-5 text-sm font-medium text-white transition hover:bg-[#a92f28]"
            >
              <Youtube aria-hidden className="h-4 w-4" />
              {mediaSection.ctaLabel}
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {mediaSection.videos.map((video) => {
              const embedUrl = toYouTubeEmbedUrl(video);
              if (!embedUrl) {
                return (
                  <div
                    key={video}
                    className="flex aspect-video items-center justify-center rounded-[8px] border border-black/10 bg-[#f1f3ee] px-4 text-center text-sm text-black/55"
                  >
                    Invalid YouTube URL.
                  </div>
                );
              }

              return (
                <iframe
                  key={video}
                  src={embedUrl}
                  title="Gabriel creative video"
                  className="aspect-video w-full rounded-[8px] border border-black/10 bg-black"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              );
            })}
          </div>
        </div>
      </section>

      <section id="contact" className="border-t border-black/10 bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 md:grid-cols-[1fr_0.8fr] md:items-end">
          <div>
            <p className="text-sm font-semibold text-[#1f4f46] uppercase">{contactSection.eyebrow}</p>
            <h2 className="mt-3 max-w-2xl text-4xl font-semibold text-[#181817]">{contactSection.title}</h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-black/60">{contactSection.description}</p>
          </div>

          <div className="space-y-3">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center justify-between rounded-[8px] border border-black/10 bg-[#f7f8f5] p-4 text-sm font-medium text-black/72 transition hover:border-[#184f42] hover:text-[#184f42]"
            >
              <span className="inline-flex items-center gap-3">
                <Mail aria-hidden className="h-4 w-4" />
                {profile.email}
              </span>
              <ArrowUpRight aria-hidden className="h-4 w-4" />
            </a>
            <div className="flex items-center gap-3 rounded-[8px] border border-black/10 bg-[#f7f8f5] p-4 text-sm font-medium text-black/62">
              <MapPin aria-hidden className="h-4 w-4" />
              {profile.location}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

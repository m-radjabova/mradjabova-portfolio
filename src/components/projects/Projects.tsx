import { useMemo, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  FaExternalLinkAlt,
  FaGithub,
  FaArrowRight,
  FaStar,
  FaServer,
  FaChevronDown,
} from "react-icons/fa";
import useProjects, { type Project } from "../../hooks/useProjects";
import { localProjects, type LocalProject } from "../../data/projects";
import projectFlowerImage from "../../assets/me/flower_for_project.png";

type DisplayProject = {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  accent: string;
  primaryHref: string;
  secondaryHref?: string;
  previewImages?: string[];
  previewLabel?: string;
  isShowcase?: boolean;
};

const accentColors = ["#c7abc3", "#8f87bf", "#d397af", "#a6afd9"];

function createBackendPreview(project: Project, index: number): DisplayProject {
  const image = project.demoLink
    ? `https://api.microlink.io/?url=${project.demoLink}&screenshot=true&meta=false&embed=screenshot.url`
    : "https://placehold.co/1200x900/f6edf3/7d76a3?text=Project";

  return {
    id: project.id,
    title: project.title,
    description: project.description,
    image,
    technologies: project.technologies || [],
    accent: accentColors[index % accentColors.length],
    primaryHref: project.demoLink || project.githubLink || "/projects",
    secondaryHref: project.githubLink,
  };
}

function createLocalPreview(project: LocalProject): DisplayProject {
  return {
    id: String(project.id),
    title: project.title,
    description: project.shortDescription,
    image: project.images[0],
    technologies: project.technologies,
    accent: project.accentColor,
    primaryHref: `/projects/${project.slug}`,
    secondaryHref: project.githubLink,
    previewImages: project.images.slice(0, 3),
    previewLabel: project.stats,
    isShowcase: true,
  };
}

/* ── Sparkle icon ── */
function Sparkle({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={style}
    >
      <path
        d="M12 2l1.5 6.5L20 10l-6.5 1.5L12 18l-1.5-6.5L4 10l6.5-1.5L12 2z"
        fill="currentColor"
        opacity="0.4"
      />
    </svg>
  );
}

/* ── Animated counting number ── */
function AnimatedStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="group relative">
      <div className="relative z-10 rounded-2xl border border-white/50 bg-white/40 px-4 py-3 sm:px-6 sm:py-4 backdrop-blur-sm transition-all duration-500 hover:bg-white/60 hover:shadow-[0_12px_40px_rgba(199,171,195,0.15)] hover:-translate-y-1">
        <p className="font-[var(--font-display)] text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--lavender-strong)]">
          {value}
        </p>
        <p className="mt-1 text-[10px] sm:text-xs font-medium uppercase tracking-[0.16em] sm:tracking-[0.18em] text-[var(--text-secondary)]">
          {label}
        </p>
      </div>
      <div className="absolute inset-0 -z-0 translate-y-2 rounded-2xl bg-gradient-to-br from-[#d397af]/20 to-[#c7abc3]/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
    </div>
  );
}

/* ── Main Component ── */
function Projects() {
  const { t } = useTranslation();
  const { projects, loading, error } = useProjects();
  const sectionRef = useRef<HTMLElement>(null);
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set());
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);

  const allProjects = useMemo(() => {
    const backend = projects.map((project, index) =>
      createBackendPreview(project, index),
    );
    const showcase = localProjects.map(createLocalPreview);

    return [...backend, ...showcase];
  }, [projects]);

  /* ── Intersection Observer for staggered animation ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-project-id");
            if (id) {
              setVisibleCards((prev) => new Set(prev).add(id));
            }
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -30px 0px" },
    );

    const cards = sectionRef.current?.querySelectorAll("[data-project-id]");
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [allProjects]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden px-3 py-10 sm:px-4 sm:py-12 lg:px-8 lg:py-16"
    >
      {/* ═══════ BACKGROUND DECORATIONS ═══════ */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Large gradient orbs */}
        <div
          className="absolute -right-40 -top-40 h-[30rem] w-[30rem] sm:h-[50rem] sm:w-[50rem] rounded-full bg-[radial-gradient(circle,rgba(183,167,205,0.18),transparent_70%)] blur-3xl animate-pulse-soft"
          style={{ animationDuration: "8s" }}
        />
        <div
          className="absolute -left-40 bottom-0 h-[25rem] w-[25rem] sm:h-[40rem] sm:w-[40rem] rounded-full bg-[radial-gradient(circle,rgba(211,169,184,0.14),transparent_70%)] blur-3xl animate-pulse-soft"
          style={{ animationDuration: "10s", animationDelay: "2s" }}
        />
        <div className="absolute left-1/2 top-1/3 h-[40rem] w-[40rem] sm:h-[60rem] sm:w-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(207,163,180,0.06),transparent_70%)] blur-3xl" />

        {/* Floating decorative particles - fewer on mobile */}
        <div className="absolute left-[8%] top-[6%] text-2xl sm:text-3xl text-[#d3a9b8]/30 animate-float">
          <Sparkle className="h-6 w-6 sm:h-8 sm:w-8" />
        </div>
        <div className="hidden sm:block absolute right-[15%] top-[10%] text-4xl text-[#d5bfd7]/25 animate-float-delayed">
          <Sparkle className="h-10 w-10" />
        </div>
        <div className="absolute left-[40%] top-[3%] text-xl sm:text-2xl text-[#c7abc3]/20 animate-twinkle-soft">
          ✦
        </div>
        <div
          className="hidden sm:block absolute right-[5%] top-[40%] text-3xl text-[#d3a9b8]/25 animate-float"
          style={{ animationDuration: "7s" }}
        >
          ✦
        </div>
        <div
          className="absolute left-[20%] bottom-[20%] text-2xl sm:text-3xl text-[#b7acd9]/20 animate-float-delayed"
          style={{ animationDuration: "9s" }}
        >
          ✦
        </div>
        <div className="hidden sm:block absolute right-[30%] bottom-[10%] text-2xl text-[#d397af]/15 animate-twinkle-soft">
          ✦
        </div>

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #7d76a3 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1550px]">
        {/* ═══════ HEADER SECTION ═══════ */}
        <div className="mb-8 sm:mb-12 flex flex-col items-start gap-4 sm:gap-6">
          {/* Eyebrow */}
          <div className="group relative inline-flex items-center gap-2 sm:gap-3 rounded-full border border-white/60 bg-white/50 px-4 sm:px-5 py-2 sm:py-2.5 backdrop-blur-sm">
            <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-[#d397af]/40" />
              <span className="relative inline-flex h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-[#d397af]" />
            </span>
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] sm:tracking-[0.24em] text-[var(--lavender-strong)]">
              {t("nav.projects")}
            </span>
          </div>

          {/* Main title */}
          <div className="relative">
            <div className="absolute -left-8 sm:-left-12 top-1/2 h-px w-16 sm:w-24 -translate-y-1/2 bg-gradient-to-r from-transparent to-[#d3a9b8]/40" />

            <h2 className="section-title-display relative text-[clamp(2.8rem,10vw,8rem)] leading-[0.8]">
              {/* Layered text for depth */}
              <span
                className="absolute -top-2 left-0 text-[clamp(2.8rem,10vw,8rem)] text-[#d3a9b8]/8 select-none"
                aria-hidden="true"
              >
                {t("nav.projects")}
              </span>
              <span className="bg-gradient-to-r from-[#7d76a3] via-[#d996a4] to-[#b3aad7] bg-[length:200%_200%] bg-clip-text text-transparent animate-shimmer">
                {t("nav.projects")}
              </span>

              <span
                className="absolute -right-6 sm:-right-10 -top-3 sm:-top-4 text-3xl sm:text-5xl text-[#d3a9b8]/30 animate-float"
                style={{ animationDuration: "6s" }}
              >
                ✦
              </span>
            </h2>
          </div>

          <p className="max-w-3xl text-base sm:text-lg lg:text-xl leading-relaxed text-[var(--text-secondary)]">
            {t("projects.subtitle")}
          </p>

          {/* Stats row */}
          {!loading && !error && (
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <AnimatedStat
                value={String(allProjects.length)}
                label="Projects"
              />
              <AnimatedStat
                value={String(
                  allProjects.filter((p) => p.isShowcase).length,
                )}
                label="Showcase"
              />
              <AnimatedStat
                value={String(
                  allProjects.filter((p) => !p.isShowcase).length,
                )}
                label="Backend"
              />
            </div>
          )}
        </div>

        {/* ═══════ CONTENT ═══════ */}
        {loading ? (
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 xl:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="group overflow-hidden rounded-2xl sm:rounded-3xl border border-white/50 bg-white/40 shadow-xl backdrop-blur-sm"
              >
                <div className="relative h-48 sm:h-64 animate-pulse overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[rgba(239,229,245,0.6)] to-[rgba(250,244,243,0.4)]" />
                  <div className="absolute -inset-10 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer-skeleton" />
                </div>

                <div className="space-y-3 sm:space-y-4 p-5 sm:p-7">
                  <div className="h-6 sm:h-8 w-2/3 animate-pulse rounded-xl bg-white/60" />
                  <div className="h-16 sm:h-20 animate-pulse rounded-2xl bg-white/50" />

                  <div className="flex gap-2">
                    {[...Array(3)].map((_, j) => (
                      <div
                        key={j}
                        className="h-6 sm:h-8 w-12 sm:w-16 animate-pulse rounded-full bg-white/50"
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-red-200/60 bg-white/60 p-8 sm:p-16 text-center shadow-xl backdrop-blur-sm">
            <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-red-200/30 blur-[70px]" />
            <div className="relative">
              <div className="mx-auto mb-4 flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-2xl border border-red-200/40 bg-red-50/60 text-red-400">
                <svg className="h-6 w-6 sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <p className="text-lg sm:text-xl font-semibold text-[var(--lavender-strong)]">
                {t(`projects.states.errors.${error}`)}
              </p>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                {t("projects.states.errors.description")}
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 xl:grid-cols-3">
            {allProjects.map((project, index) => {
              const primaryIsInternal = project.primaryHref.startsWith("/");
              const isVisible = visibleCards.has(project.id);
              const isExpanded = expandedProjectId === project.id;

              return (
                <article
                  key={project.id}
                  data-project-id={project.id}
                  className={`group relative overflow-hidden rounded-[1.4rem] sm:rounded-[1.8rem] border border-white/70 bg-white/50 shadow-[0_20px_60px_rgba(173,156,196,0.08)] backdrop-blur-sm transition-all duration-700 hover:-translate-y-2 hover:scale-[1.01] hover:shadow-[0_30px_80px_rgba(173,156,196,0.2)] ${
                    isExpanded
                      ? "md:col-span-2 xl:col-span-2 border-[#d6c9e4] bg-white/68 shadow-[0_30px_90px_rgba(173,156,196,0.18)]"
                      : ""
                  }`}
                  onClick={() =>
                    setExpandedProjectId((prev) =>
                      prev === project.id ? null : project.id,
                    )
                  }
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setExpandedProjectId((prev) =>
                        prev === project.id ? null : project.id,
                      );
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isExpanded}
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible
                      ? "translateY(0) scale(1)"
                      : "translateY(60px) scale(0.95)",
                    transition: `all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.08}s`,
                  }}
                >
                  <img
                    src={projectFlowerImage}
                    alt=""
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-2 right-4 z-20 hidden w-24 translate-y-[32%] opacity-55 sm:block lg:w-28 xl:w-32"
                  />

                  {/* Top gradient border */}
                  <div className="absolute inset-x-0 top-0 z-10 h-[3px] bg-gradient-to-r from-[#d996a4] via-[#b3aad7] to-[#d397af] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Inner glow overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

                  {/* Image Container */}
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className={`h-48 w-full object-cover object-top transition-all duration-700 group-hover:scale-110 group-hover:brightness-110 sm:h-64 ${
                        isExpanded ? "lg:h-80" : "lg:h-72"
                      }`}
                      loading="lazy"
                    />

                    {/* Gradient overlay on image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    {/* Image border accent */}
                    <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />

                    {/* Hover shimmer on image */}
                    <div className="absolute -inset-10 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:translate-x-full" />
                  </div>

                  {/* Content */}
                  <div className="relative p-5 sm:p-7">
                    {/* Category badge */}
                    <div className="mb-3 inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/50 bg-white/60 px-3 sm:px-3.5 py-1 sm:py-1.5 text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.16em] sm:tracking-[0.18em] text-[var(--text-secondary)] backdrop-blur-sm">
                      {project.isShowcase ? (
                        <FaStar className="text-[9px] sm:text-[10px] text-[#f59e0b]" />
                      ) : (
                        <FaServer className="text-[9px] sm:text-[10px] text-[#8f87bf]" />
                      )}
                      {project.isShowcase
                        ? "Frontend"
                        : "Full Stack"}
                    </div>

                    <h3 className="font-[var(--font-display)] text-[1.4rem] sm:text-[1.8rem] font-bold leading-tight tracking-[-0.03em] text-[var(--lavender-strong)] transition-colors duration-300 group-hover:text-[#7d76a3]">
                      {project.title}
                    </h3>

                    <div className="mt-2 h-0.5 w-10 sm:w-12 rounded-full bg-gradient-to-r from-[#d996a4] to-[#b3aad7] opacity-0 transition-all duration-500 group-hover:w-16 sm:group-hover:w-20 group-hover:opacity-100" />

                    <p
                      className={`mt-3 text-sm leading-relaxed text-[var(--text-secondary)] sm:mt-4 sm:text-base ${
                        isExpanded
                          ? "min-h-0 line-clamp-none"
                          : "min-h-[3.5rem] line-clamp-2 sm:min-h-[4rem]"
                      }`}
                    >
                      {project.description}
                    </p>

                    {/* Technology tags */}
                    <div className="mt-4 sm:mt-5 flex flex-wrap gap-1.5 sm:gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={`${project.id}-${tech}`}
                          className="rounded-full border border-white/50 bg-white/60 px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs font-semibold tracking-[0.06em] text-[#8d84ac] backdrop-blur-sm transition-all duration-300 hover:bg-white/80 hover:shadow-sm hover:-translate-y-0.5"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 flex items-center justify-between rounded-[1rem] border border-white/55 bg-white/55 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9a8fb6] backdrop-blur-sm transition-all duration-300 group-hover:bg-white/75">
                      <span className="inline-flex items-center gap-2">
                        <span className="inline-block h-2 w-2 rounded-full bg-[#d996a4]" />
                        {isExpanded ? "Tap to collapse" : t("projects.actions.showDescription")}
                      </span>
                      <FaChevronDown
                        className={`text-[10px] transition-transform duration-300 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </div>

                    {/* Preview images for showcase */}
                    {project.isShowcase && project.previewImages?.length ? (
                      <div
                        className={`mt-4 rounded-[1.2rem] bg-[rgba(248,242,248,0.76)] p-3 transition-all duration-300 hover:bg-[rgba(248,242,248,0.9)] sm:mt-5 sm:rounded-[1.4rem] sm:p-4 ${
                          isExpanded ? "" : ""
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-1.5 sm:gap-2">
                            <FaStar className="text-[9px] sm:text-[10px] text-[#f59e0b]" />
                            <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.14em] sm:tracking-[0.16em] text-[#a194bc]">
                              {project.previewLabel}
                            </p>
                          </div>

                          <span className="inline-flex items-center gap-1 sm:gap-1.5 text-[9px] sm:text-[10px] font-medium text-[var(--text-muted)]">
                            {t("projects.actions.openProject")}
                            <FaArrowRight className="text-[7px] sm:text-[8px]" />
                          </span>
                        </div>

                        <div className="mt-2 sm:mt-3 flex gap-1.5 sm:gap-2">
                          {project.previewImages.map((image, imageIndex) => (
                            <div
                              key={`${project.id}-preview-${imageIndex}`}
                              className="h-12 sm:h-16 flex-1 overflow-hidden rounded-[0.8rem] sm:rounded-[1rem] border border-white/70 bg-white/70"
                            >
                              <img
                                src={image}
                                alt={`${project.title} preview ${imageIndex + 1}`}
                                className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                                loading="lazy"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null}

                    {/* Actions */}
                    <div className="mt-5 sm:mt-6 flex items-center justify-between">
                      <div className="flex gap-2 sm:gap-3">
                        {primaryIsInternal ? (
                          <Link
                            to={project.primaryHref}
                            onClick={(event) => event.stopPropagation()}
                            className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#d996a4] to-[#b3aad7] text-white shadow-[0_8px_20px_rgba(199,171,195,0.3)] transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:shadow-[0_12px_30px_rgba(199,171,195,0.4)] active:scale-95"
                            aria-label={t("projects.actions.openProject")}
                          >
                            <FaExternalLinkAlt className="text-xs sm:text-sm" />
                          </Link>
                        ) : (
                          <a
                            href={project.primaryHref}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(event) => event.stopPropagation()}
                            className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#d996a4] to-[#b3aad7] text-white shadow-[0_8px_20px_rgba(199,171,195,0.3)] transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:shadow-[0_12px_30px_rgba(199,171,195,0.4)] active:scale-95"
                            aria-label={t("projects.actions.liveDemo")}
                          >
                            <FaExternalLinkAlt className="text-xs sm:text-sm" />
                          </a>
                        )}

                        {project.secondaryHref && (
                          <a
                            href={project.secondaryHref}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(event) => event.stopPropagation()}
                            className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl border border-white/60 bg-white/60 text-[var(--lavender-strong)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:bg-white/80 hover:shadow-[0_8px_20px_rgba(173,156,196,0.2)] active:scale-95"
                            aria-label={t("projects.actions.sourceCode")}
                          >
                            <FaGithub className="text-base sm:text-lg" />
                          </a>
                        )}
                      </div>

                      {primaryIsInternal ? (
                        <Link
                          to={project.primaryHref}
                          onClick={(event) => event.stopPropagation()}
                          className="group/link inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-[#c7abc3] transition-all duration-300 hover:text-[#b7acd9]"
                        >
                          <span>{t("projects.actions.openProject")}</span>
                          <FaArrowRight className="text-[10px] sm:text-xs transition-all duration-300 group-hover/link:translate-x-1" />
                        </Link>
                      ) : (
                        <a
                          href={project.primaryHref}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(event) => event.stopPropagation()}
                          className="group/link inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-[#c7abc3] transition-all duration-300 hover:text-[#b7acd9]"
                        >
                          <span>{t("projects.actions.liveDemo")}</span>
                          <FaArrowRight className="text-[10px] sm:text-xs transition-all duration-300 group-hover/link:translate-x-1" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Bottom border accent */}
                  <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-[#d397af]/0 via-[#d397af]/40 to-[#d397af]/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </article>
              );
            })}
          </div>
        )}
      </div>

      <style>{`
        @keyframes shimmer {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-shimmer {
          animation: shimmer 5s ease-in-out infinite;
        }

        @keyframes shimmer-skeleton {
          0% {
            transform: translateX(-100%) skewX(-15deg);
          }
          100% {
            transform: translateX(200%) skewX(-15deg);
          }
        }

        .animate-shimmer-skeleton {
          animation: shimmer-skeleton 2.5s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-18px) rotate(5deg);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float 8s ease-in-out infinite 2s;
        }

        @keyframes twinkle-soft {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1) rotate(0deg);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.3) rotate(10deg);
          }
        }

        .animate-twinkle-soft {
          animation: twinkle-soft 4s ease-in-out infinite;
        }

        @keyframes pulse-soft {
          0%, 100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.05);
          }
        }

        .animate-pulse-soft {
          animation: pulse-soft 6s ease-in-out infinite;
        }

        @keyframes fade-up {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-fade-up {
          animation: fade-up 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }
      `}</style>
    </section>
  );
}

export default Projects;

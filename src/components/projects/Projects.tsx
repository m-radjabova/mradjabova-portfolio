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

// A calmer, more considered palette — one warm (blush) + one cool (lavender)
// tone that both derive from the same brand hue, alternating per card so the
// grid reads as a set rather than a rainbow.
const accentColors = ["#d996a4", "#8f87bf", "#c7abc3", "#a6afd9"];

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

function ProjectCard({
  project,
  index,
  isVisible,
  isExpanded,
  onToggle,
  t,
}: {
  project: DisplayProject;
  index: number;
  isVisible: boolean;
  isExpanded: boolean;
  onToggle: () => void;
  t: (key: string) => string;
}) {
  const primaryIsInternal = project.primaryHref.startsWith("/");

  return (
    <article
      data-project-id={project.id}
      className="min-w-0"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.55s ease-out ${index * 0.04}s, transform 0.55s cubic-bezier(0.22,1,0.36,1) ${
          index * 0.04
        }s`,
      }}
    >
      <div
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        onClick={onToggle}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onToggle();
          }
        }}
        className={`group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-[1.5rem] border bg-white/55 backdrop-blur-sm transition-[transform,box-shadow,border-color] duration-400 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lavender-strong)]/50 focus-visible:ring-offset-2 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_-15px_rgba(153,132,178,0.35)] ${
          isExpanded
            ? "border-[var(--lavender-strong)]/25 bg-white/70 shadow-[0_24px_60px_-15px_rgba(153,132,178,0.3)]"
            : "border-white/70 shadow-[0_10px_35px_-15px_rgba(153,132,178,0.2)]"
        }`}
      >
        {/* Accent edge — a single, quiet identity mark per card */}
        <span
          className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"
          style={{ background: project.accent }}
          aria-hidden="true"
        />

        {/* Image */}
        <div className="relative overflow-hidden">
          <div className="aspect-[16/11] w-full overflow-hidden bg-[#f3ecf1]">
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.06]"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/0 to-black/0" />

          {/* Category badge — sits on the image, not floating separately below */}
          <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/40 bg-black/30 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-md">
            {project.isShowcase ? (
              <FaStar className="text-[10px] text-amber-300" />
            ) : (
              <FaServer className="text-[10px] text-white/90" />
            )}
            {project.isShowcase ? "Frontend" : "Full Stack"}
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <h3 className="font-[var(--font-display)] text-[1.35rem] font-bold leading-tight tracking-[-0.02em] text-[var(--lavender-strong)] transition-colors duration-300 group-hover:text-[#7d76a3] sm:text-[1.55rem]">
            {project.title}
          </h3>

          <p
            className={`mt-2.5 text-sm leading-relaxed text-[var(--text-secondary)] ${
              isExpanded ? "line-clamp-none" : "line-clamp-2"
            }`}
          >
            {project.description}
          </p>

          {/* Tech chips */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.technologies.slice(0, isExpanded ? undefined : 4).map((tech) => (
              <span
                key={`${project.id}-${tech}`}
                className="rounded-full border border-black/[0.06] bg-black/[0.03] px-2.5 py-1 text-[11px] font-medium text-[var(--text-secondary)]"
              >
                {tech}
              </span>
            ))}
            {!isExpanded && project.technologies.length > 4 && (
              <span className="rounded-full px-2 py-1 text-[11px] font-medium text-[var(--text-muted)]">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>

          {/* Showcase preview strip — only when expanded, only when relevant */}
          {project.isShowcase && project.previewImages?.length ? (
            <div
              className={`grid transition-[grid-template-rows,margin] duration-400 ease-out ${
                isExpanded ? "mt-4 grid-rows-[1fr]" : "mt-0 grid-rows-[0fr]"
              }`}
              aria-hidden={!isExpanded}
            >
              <div className="min-h-0 overflow-hidden">
                <div className="flex items-center justify-between pb-2">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">
                    <FaStar className="text-[10px] text-amber-400" />
                    {project.previewLabel}
                  </span>
                </div>
                <div className="flex gap-1.5">
                  {project.previewImages.map((image, imageIndex) => (
                    <div
                      key={`${project.id}-preview-${imageIndex}`}
                      className="h-14 flex-1 overflow-hidden rounded-lg border border-black/[0.06]"
                    >
                      <img
                        src={image}
                        alt={`${project.title} preview ${imageIndex + 1}`}
                        className="h-full w-full object-cover object-top"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          {/* Expand toggle — quiet text control, not a heavy bar */}
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onToggle();
            }}
            className="mt-4 inline-flex w-fit items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--text-muted)] transition-colors duration-200 hover:text-[var(--lavender-strong)]"
          >
            {isExpanded ? t("projects.actions.hideDescription") ?? "Yopish" : t("projects.actions.showDescription")}
            <FaChevronDown
              className={`text-[9px] transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
            />
          </button>

          {/* Footer — actions, pinned to bottom for equal card heights */}
          <div className="mt-auto flex items-center justify-between pt-5">
            <div className="flex gap-2">
              {primaryIsInternal ? (
                <Link
                  to={project.primaryHref}
                  onClick={(event) => event.stopPropagation()}
                  className="flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-sm transition-transform duration-200 hover:scale-110 active:scale-95"
                  style={{ background: `linear-gradient(135deg, ${project.accent}, var(--lavender-strong))` }}
                  aria-label={t("projects.actions.openProject")}
                >
                  <FaExternalLinkAlt className="text-xs" />
                </Link>
              ) : (
                <a
                  href={project.primaryHref}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(event) => event.stopPropagation()}
                  className="flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-sm transition-transform duration-200 hover:scale-110 active:scale-95"
                  style={{ background: `linear-gradient(135deg, ${project.accent}, var(--lavender-strong))` }}
                  aria-label={t("projects.actions.liveDemo")}
                >
                  <FaExternalLinkAlt className="text-xs" />
                </a>
              )}

              {project.secondaryHref && (
                <a
                  href={project.secondaryHref}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(event) => event.stopPropagation()}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/[0.08] bg-white/70 text-[var(--lavender-strong)] transition-transform duration-200 hover:scale-110 hover:bg-white active:scale-95"
                  aria-label={t("projects.actions.sourceCode")}
                >
                  <FaGithub className="text-base" />
                </a>
              )}
            </div>

            {primaryIsInternal ? (
              <Link
                to={project.primaryHref}
                onClick={(event) => event.stopPropagation()}
                className="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--lavender-strong)]"
              >
                <span>{t("projects.actions.openProject")}</span>
                <FaArrowRight className="text-xs transition-transform duration-300 group-hover/link:translate-x-1" />
              </Link>
            ) : (
              <a
                href={project.primaryHref}
                target="_blank"
                rel="noreferrer"
                onClick={(event) => event.stopPropagation()}
                className="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--lavender-strong)]"
              >
                <span>{t("projects.actions.liveDemo")}</span>
                <FaArrowRight className="text-xs transition-transform duration-300 group-hover/link:translate-x-1" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
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
    const backend = projects.map((project, index) => createBackendPreview(project, index));
    const showcase = localProjects.map(createLocalPreview);
    return [...backend, ...showcase];
  }, [projects]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-project-id");
            if (id) setVisibleCards((prev) => new Set(prev).add(id));
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
    );

    const cards = sectionRef.current?.querySelectorAll("[data-project-id]");
    cards?.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [allProjects]);

  useEffect(() => {
    if (!expandedProjectId) return;
    const el = sectionRef.current?.querySelector(`[data-project-id="${expandedProjectId}"]`);
    el?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [expandedProjectId]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-3 py-10 sm:px-4 sm:py-14 lg:px-8 lg:py-20"
    >
      {/* ═══ Background — two soft orbs, nothing else competing for attention ═══ */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(183,167,205,0.16),transparent_70%)] blur-3xl sm:h-[42rem] sm:w-[42rem]" />
        <div className="absolute -left-40 bottom-0 h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(211,169,184,0.12),transparent_70%)] blur-3xl sm:h-[34rem] sm:w-[34rem]" />
      </div>

      <div className="relative mx-auto">
        {/* ═══ Header ═══ */}
        <div className="mb-10 flex flex-col gap-5 sm:mb-14">
          
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="section-title-display max-w-2xl bg-gradient-to-r from-[#7d76a3] via-[#c7899a] to-[#7d76a3] bg-clip-text text-[clamp(2.5rem,7vw,5rem)] leading-[0.95] text-transparent">
              {t("nav.projects")}
            </h2>
          </div>

          <p className="max-w-2xl text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
            {t("projects.subtitle")}
          </p>
        </div>

        {/* ═══ Content ═══ */}
        {loading ? (
          <div className="grid gap-6 sm:gap-7 md:grid-cols-2 xl:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-[1.5rem] border border-white/60 bg-white/40 shadow-sm"
              >
                <div className="relative aspect-[16/11] overflow-hidden bg-[#f3ecf1]">
                  <div className="absolute -inset-10 animate-shimmer-skeleton bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                </div>
                <div className="space-y-3 p-5 sm:p-6">
                  <div className="h-6 w-2/3 animate-pulse rounded-lg bg-black/[0.06]" />
                  <div className="h-4 w-full animate-pulse rounded-lg bg-black/[0.04]" />
                  <div className="h-4 w-4/5 animate-pulse rounded-lg bg-black/[0.04]" />
                  <div className="flex gap-2 pt-1">
                    {[...Array(3)].map((_, j) => (
                      <div key={j} className="h-6 w-14 animate-pulse rounded-full bg-black/[0.05]" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="rounded-[1.5rem] border border-red-200/60 bg-white/60 p-10 text-center shadow-sm sm:p-16">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-red-200/40 bg-red-50/60 text-red-400 sm:h-14 sm:w-14">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <p className="text-lg font-semibold text-[var(--lavender-strong)] sm:text-xl">
              {t(`projects.states.errors.${error}`)}
            </p>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">{t("projects.states.errors.description")}</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:gap-7 md:grid-cols-2 xl:grid-cols-3">
            {allProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                isVisible={visibleCards.has(project.id)}
                isExpanded={expandedProjectId === project.id}
                onToggle={() =>
                  setExpandedProjectId((prev) => (prev === project.id ? null : project.id))
                }
                t={t}
              />
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes shimmer-skeleton {
          0% { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(200%) skewX(-15deg); }
        }
        .animate-shimmer-skeleton {
          animation: shimmer-skeleton 2.2s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-shimmer-skeleton { animation: none; }
        }
      `}</style>
      
    </section>
  );
}

export default Projects;
import { FaExternalLinkAlt, FaGithub, FaLayerGroup, FaServer, FaExclamationTriangle, FaInbox, FaDatabase } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import useProjects from "../../hooks/useProjects";
import type { TechIcons } from "./WithoutBackend";
import {
  SiBootstrap,
  SiCss3,
  SiFigma,
  SiFirebase,
  SiJavascript,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import ProjectShowcaseCard from "./ProjectShowcaseCard";

type WithBackendProps = {
  showHeader?: boolean;
};

/* ── Skeleton Card ── */
function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/6 bg-white/[0.03] backdrop-blur-xl">
      {/* Image skeleton */}
      <div className="relative h-56 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-white/[0.05] animate-pulse" />
        <div className="absolute inset-0 -translate-x-full animate-pulse bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
        <div className="absolute left-4 top-4 h-9 w-28 rounded-xl border border-white/6 bg-white/[0.05]" />
        <div className="absolute bottom-4 left-4 flex gap-1.5">
          <div className="h-6 w-14 rounded-lg border border-white/6 bg-white/[0.05]" />
          <div className="h-6 w-14 rounded-lg border border-white/6 bg-white/[0.05]" />
        </div>
      </div>
      {/* Content skeleton */}
      <div className="space-y-3 px-5 pb-5 pt-4">
        <div className="h-6 w-3/4 rounded-lg bg-white/[0.05] animate-pulse" />
        <div className="space-y-1.5">
          <div className="h-3.5 w-full rounded-lg bg-white/[0.03] animate-pulse" />
          <div className="h-3.5 w-5/6 rounded-lg bg-white/[0.03] animate-pulse" />
        </div>
        <div className="flex gap-2.5 pt-2">
          <div className="h-11 flex-1 rounded-xl bg-white/[0.03] animate-pulse" />
          <div className="h-11 flex-1 rounded-xl bg-white/[0.03] animate-pulse" />
        </div>
      </div>
    </div>
  );
}

/* ── Loading Section ── */
function LoadingState() {
  return (
    <div className="relative">
      <div className="mb-8">
        <div className="flex items-center gap-3.5">
          <div className="h-11 w-11 rounded-xl border border-white/6 bg-white/[0.03] animate-pulse" />
          <div>
            <div className="h-5 w-32 rounded-lg border border-white/6 bg-white/[0.03] animate-pulse" />
            <div className="mt-2 h-7 w-48 rounded-lg bg-white/[0.03] animate-pulse" />
          </div>
        </div>
      </div>
      <div className="grid gap-6">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </div>
  );
}

/* ── Error State ── */
function ErrorState({ errorKey }: { errorKey: string }) {
  const { t } = useTranslation();
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-red-500/8 bg-gradient-to-br from-red-500/[0.03] to-red-500/[0.01] px-8 py-14 text-center backdrop-blur-xl transition-all duration-300 hover:border-red-500/12 hover:shadow-[0_16px_48px_rgba(220,38,38,0.04)]">
      <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-red-500/8 blur-[70px]" />
      
      <div className="relative">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl border border-red-500/12 bg-gradient-to-br from-red-500/[0.08] to-red-500/[0.03] text-red-400 shadow-[0_6px_20px_rgba(220,38,38,0.06)] transition-all duration-300 group-hover:shadow-[0_10px_28px_rgba(220,38,38,0.1)] group-hover:scale-105">
          <FaExclamationTriangle className="text-xl" />
        </div>
        <h4 className="text-lg font-bold text-[var(--text-primary)]">
          {t(`projects.states.errors.${errorKey}`)}
        </h4>
        <p className="mx-auto mt-2 max-w-sm text-sm text-[var(--text-secondary)]/65">
          {t("projects.states.errors.description")}
        </p>
      </div>
    </div>
  );
}

/* ── Empty State ── */
function EmptyState() {
  const { t } = useTranslation();
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/6 bg-gradient-to-br from-white/[0.03] to-white/[0.01] px-8 py-14 text-center backdrop-blur-xl transition-all duration-300 hover:border-white/10 hover:shadow-[0_16px_48px_rgba(0,0,0,0.03)]">
      <div className="pointer-events-none absolute -left-16 -bottom-16 h-32 w-32 rounded-full bg-[var(--accent-secondary)]/8 blur-[70px]" />
      
      <div className="relative">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl border border-white/8 bg-gradient-to-br from-white/[0.06] to-white/[0.02] text-[var(--accent-secondary)] shadow-[0_6px_20px_rgba(0,0,0,0.03)] transition-all duration-300 group-hover:shadow-[0_10px_28px_rgba(0,0,0,0.05)] group-hover:scale-105">
          <FaInbox className="text-xl" />
        </div>
        <h4 className="text-lg font-bold text-[var(--text-primary)]">
          {t("projects.states.empty")}
        </h4>
        <p className="mx-auto mt-2 max-w-sm text-sm text-[var(--text-secondary)]/65">
          {t("projects.states.emptyDescription")}
        </p>
      </div>
    </div>
  );
}

/* ── Main ── */
function WithBackend({ showHeader = true }: WithBackendProps) {
  const { t } = useTranslation();
  const { projects, loading, error } = useProjects();

  const techIcons: TechIcons = {
    react: <SiReact />,
    typescript: <SiTypescript />,
    bootstrap: <SiBootstrap />,
    figma: <SiFigma />,
    css: <SiCss3 />,
    javascript: <SiJavascript />,
    tailwind: <SiTailwindcss />,
    firebase: <SiFirebase />,
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState errorKey={error} />;
  if (!projects.length) return <EmptyState />;

  return (
    <div className="relative">
      {showHeader && (
        <div className="group/header mb-8">
          <div className="flex items-center gap-3.5">
            {/* Icon badge */}
            <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--accent-secondary)]/15 bg-gradient-to-br from-[var(--accent-secondary)]/10 to-[var(--accent-secondary)]/4 shadow-[0_4px_16px_color-mix(in_srgb,var(--accent-secondary),8%)] transition-all duration-300 group-hover/header:shadow-[0_8px_24px_color-mix(in_srgb,var(--accent-secondary),16%)] group-hover/header:scale-105">
              <FaServer className="text-base text-[var(--accent-secondary)]" />
            </div>

            <div>
              <div className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-soft)] bg-[var(--card-bg)] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent-secondary)] backdrop-blur-xl transition-all duration-300 hover:border-[var(--accent-secondary)]/15 sm:text-[11px]">
                <span className="inline-flex h-4 w-4 items-center justify-center rounded-md border border-white/8 bg-white/[0.06] text-[9px]">
                  <FaDatabase />
                </span>
                {t("projects.withBackend.badge")}
              </div>
              <h3 className="mt-1.5 text-xl font-black tracking-[-0.02em] text-[var(--text-primary)] transition-all duration-300 sm:text-2xl">
                {t("projects.withBackend.title")}
              </h3>
            </div>
          </div>

          {/* Underline */}
          <div className="mt-3 flex items-center gap-1.5">
            <span className="h-0.5 w-6 rounded-full bg-[var(--accent-secondary)]/35" />
            <span className="h-0.5 w-12 rounded-full bg-gradient-to-r from-[var(--accent-secondary)] via-[var(--accent-tertiary)] to-[var(--accent-primary)] animate-[shimmer-text_3s_ease-in-out_infinite] bg-[length:200%_100%]" />
            <span className="h-0.5 w-6 rounded-full bg-[var(--accent-primary)]/35" />
          </div>

          <p className="mt-2.5 max-w-lg text-sm leading-6 text-[var(--text-secondary)]/70 sm:text-[14px]">
            {t("projects.withBackend.description")}
          </p>
        </div>
      )}

      {/* ── Projects Grid ── */}
      <div className="grid gap-6">
        {projects.map((project, index) => {
          const screenshotUrl = `https://api.microlink.io/?url=${project.demoLink}&screenshot=true&meta=false&embed=screenshot.url`;
          const shortDescription =
            project.description.length > 88 ? `${project.description.slice(0, 88).trimEnd()}...` : project.description;

          return (
            <div
              key={project.id}
              className="animate-[fade-up_0.5s_ease-out_both]"
              style={{ animationDelay: `${0.08 + index * 0.06}s` }}
            >
              <ProjectShowcaseCard
                title={project.title}
                shortDescription={shortDescription}
                description={project.description}
                image={screenshotUrl}
                imageAlt={project.title}
                badge={t("projects.withBackend.badge")}
                badgeIcon={<FaLayerGroup />}
                technologies={project.technologies}
                techIcons={techIcons}
                previewHref={project.demoLink}
                actions={[
                  ...(project.githubLink
                    ? [
                        {
                          href: project.githubLink,
                          label: t("projects.actions.sourceCode"),
                          icon: <FaGithub />,
                          variant: "secondary" as const,
                        },
                      ]
                    : []),
                  {
                    href: project.demoLink,
                    label: t("projects.actions.liveDemo"),
                    icon: <FaExternalLinkAlt />,
                    variant: "primary" as const,
                  },
                ]}
              />
            </div>
          );
        })}
      </div>

      {/* ── Floating decorative elements ── */}
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-12 -right-6 h-44 w-44 rounded-full bg-[var(--accent-secondary)] opacity-[0.03] blur-[70px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-6 -top-12 h-36 w-36 rounded-full bg-[var(--accent-tertiary)] opacity-[0.02] blur-[60px]" />
    </div>
  );
}

export default WithBackend;

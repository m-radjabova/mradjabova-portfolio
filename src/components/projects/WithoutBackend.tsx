import { type ReactElement } from "react";
import { FaExternalLinkAlt, FaGithub, FaCode } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { localProjects, type LocalProject } from "../../data/projects";
import {
  SiBootstrap,
  SiCss3,
  SiFigma,
  SiJavascript,
  SiReact,
  SiTypescript,
} from "react-icons/si";
import ProjectShowcaseCard from "./ProjectShowcaseCard";

export type Project = LocalProject;
export type TechIcons = {
  [key: string]: ReactElement;
};

type WithoutBackendProps = {
  showHeader?: boolean;
};

function WithoutBackend({ showHeader = true }: WithoutBackendProps) {
  const { t } = useTranslation();
  const techIcons: TechIcons = {
    react: <SiReact />,
    typescript: <SiTypescript />,
    bootstrap: <SiBootstrap />,
    figma: <SiFigma />,
    css: <SiCss3 />,
    javascript: <SiJavascript />,
  };

  return (
    <div className="relative">
      {showHeader && (
        <div className="group/header mb-8">
          <div className="flex items-center gap-3.5">
            {/* Icon badge */}
            <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--accent-primary)]/15 bg-gradient-to-br from-[var(--accent-primary)]/10 to-[var(--accent-primary)]/4 shadow-[0_4px_16px_color-mix(in_srgb,var(--accent-primary),8%)] transition-all duration-300 group-hover/header:shadow-[0_8px_24px_color-mix(in_srgb,var(--accent-primary),16%)] group-hover/header:scale-105">
              <FaCode className="text-base text-[var(--accent-primary)]" />
            </div>

            <div>
              <div className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-soft)] bg-[var(--card-bg)] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent-primary)] backdrop-blur-xl transition-all duration-300 hover:border-[var(--accent-primary)]/15 sm:text-[11px]">
                <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--accent-primary)]" />
                {t("projects.withoutBackend.badge")}
              </div>
              <h3 className="section-title-display mt-2 text-[2rem] text-[var(--text-primary)] transition-all duration-300 sm:text-[2.35rem]">
                {t("projects.withoutBackend.title")}
              </h3>
            </div>
          </div>

          {/* Underline */}
          <div className="mt-3 flex items-center gap-1.5">
            <span className="h-0.5 w-6 rounded-full bg-[var(--accent-primary)]/35" />
            <span className="h-0.5 w-12 rounded-full bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-tertiary)] animate-[shimmer-text_3s_ease-in-out_infinite] bg-[length:200%_100%]" />
            <span className="h-0.5 w-6 rounded-full bg-[var(--accent-tertiary)]/35" />
          </div>

          <p className="mt-2.5 max-w-lg text-sm leading-6 text-[var(--text-secondary)]/70 sm:text-[14px]">
            {t("projects.withoutBackend.description")}
          </p>
        </div>
      )}

      {/* ── Projects Grid ── */}
      <div className="grid gap-6">
        {localProjects.map((project, index) => (
          <div
            key={project.id}
            className="animate-[fade-up_0.5s_ease-out_both]"
            style={{ animationDelay: `${0.08 + index * 0.06}s` }}
          >
            <ProjectShowcaseCard
              title={t(`projects.localItems.${project.slug}.title`)}
              shortDescription={t(`projects.localItems.${project.slug}.shortDescription`)}
              description={t(`projects.localItems.${project.slug}.description`)}
              image={project.images[0]}
              imageAlt={t(`projects.localItems.${project.slug}.title`)}
              badge={t(`projects.localItems.${project.slug}.category`)}
              badgeIcon={project.icon}
              badgeAccent={project.accentColor}
              technologies={project.technologies}
              techIcons={techIcons}
              stats={t(`projects.localItems.${project.slug}.stats`)}
              actions={[
                {
                  to: `/projects/${project.slug}`,
                  label: t("projects.actions.openPage"),
                  icon: <FaExternalLinkAlt />,
                  variant: "primary",
                },
                {
                  href: project.githubLink,
                  label: t("projects.actions.sourceCode"),
                  icon: <FaGithub />,
                  variant: "secondary",
                },
              ]}
            />
          </div>
        ))}
      </div>

      {/* ── Floating decorative elements ── */}
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-[var(--accent-primary)] opacity-[0.03] blur-[70px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full bg-[var(--accent-secondary)] opacity-[0.02] blur-[50px]" />
    </div>
  );
}

export default WithoutBackend;

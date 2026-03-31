import { type ReactElement } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaGithub } from "react-icons/fa";
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

export type Project = LocalProject;
export type TechIcons = {
  [key: string]: ReactElement;
};

function WithoutBackend() {
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
    <div>
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent-primary)] sm:text-sm sm:tracking-[0.28em]">
          {t("projects.withoutBackend.badge")}
        </p>
        <h3 className="mt-2 text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
          {t("projects.withoutBackend.title")}
        </h3>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        {localProjects.map((project) => (
          <article
            key={project.id}
            className="group overflow-hidden rounded-[1.7rem] border border-[var(--border-soft)] bg-[color:var(--card-bg)] shadow-[var(--shadow-soft)] backdrop-blur-2xl transition duration-300 hover:-translate-y-2 hover:shadow-[var(--shadow-glow)] sm:rounded-[2rem]"
          >
            <Link to={`/projects/${project.slug}`} className="block">
              <div className="relative overflow-hidden">
                <img
                  src={project.images[0]}
                  alt={t(`projects.localItems.${project.slug}.title`)}
                  className="h-56 w-full object-cover object-top transition duration-500 group-hover:scale-105 sm:h-72"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent dark:from-slate-950/80" />
                <div className="absolute left-4 top-4 inline-flex max-w-[calc(100%-2rem)] items-center gap-2 rounded-full border border-white/45 bg-white/55 px-3 py-2 text-xs font-medium text-white backdrop-blur-xl dark:border-white/30 dark:bg-white/25 sm:left-5 sm:top-5 sm:text-sm">
                  <span style={{ color: project.accentColor }}>{project.icon}</span>
                  {t(`projects.localItems.${project.slug}.category`)}
                </div>
                <div className="absolute bottom-5 left-5 flex flex-wrap gap-2 pr-5">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/35 px-2.5 py-1.5 text-[11px] font-medium text-white backdrop-blur-xl dark:border-white/20 dark:bg-white/15 sm:px-3 sm:text-xs"
                    >
                      {techIcons[tech.toLowerCase()] || <SiReact />}
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Link>

            <div className="space-y-5 p-5 sm:space-y-6 sm:p-6">
              <div className="space-y-3">
                <h4 className="text-2xl font-black text-[var(--text-primary)] sm:text-3xl">
                  {t(`projects.localItems.${project.slug}.title`)}
                </h4>
                <p className="text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
                  {t(`projects.localItems.${project.slug}.description`)}
                </p>
              </div>

              <div className="flex flex-col items-start justify-between gap-3 text-sm text-[var(--text-secondary)] sm:flex-row sm:items-center">
                <span className="leading-6">{t(`projects.localItems.${project.slug}.stats`)}</span>
                <Link
                  to={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-2 font-semibold text-[var(--accent-primary)] transition hover:text-[var(--accent-secondary)]"
                >
                  {t("projects.actions.openPage")}
                  <FaArrowRight />
                </Link>
              </div>

              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[var(--border-soft)] bg-white/82 px-4 py-3 text-sm font-semibold text-[var(--text-primary)] shadow-[0_10px_24px_rgba(255,107,154,0.08)] transition duration-300 hover:-translate-y-0.5 hover:border-[var(--accent-primary)]/35 hover:text-[var(--accent-primary)] dark:bg-white/5"
                onClick={(event) => event.stopPropagation()}
              >
                <FaGithub />
                {t("projects.actions.sourceCode")}
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default WithoutBackend;

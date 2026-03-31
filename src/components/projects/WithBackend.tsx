import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
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

function WithBackend() {
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

  if (loading) {
    return (
      <div className="rounded-[2rem] border border-[var(--border-soft)] bg-[color:var(--card-bg)] p-8 text-[var(--text-secondary)] shadow-[var(--shadow-soft)] backdrop-blur-2xl">
        {t("projects.states.loading")}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-[2rem] border border-[var(--border-soft)] bg-[color:var(--card-bg)] p-8 text-[var(--text-secondary)] shadow-[var(--shadow-soft)] backdrop-blur-2xl">
        {t(`projects.states.errors.${error}`)}
      </div>
    );
  }

  if (!projects.length) {
    return (
      <div className="rounded-[2rem] border border-[var(--border-soft)] bg-[color:var(--card-bg)] p-8 text-[var(--text-secondary)] shadow-[var(--shadow-soft)] backdrop-blur-2xl">
        {t("projects.states.empty")}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent-secondary)] sm:text-sm sm:tracking-[0.28em]">
          {t("projects.withBackend.badge")}
        </p>
        <h3 className="mt-2 text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
          {t("projects.withBackend.title")}
        </h3>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        {projects.map((project) => {
          const screenshotUrl = `https://api.microlink.io/?url=${project.demoLink}&screenshot=true&meta=false&embed=screenshot.url`;

          return (
            <article
              key={project.id}
              className="overflow-hidden rounded-[1.7rem] border border-[var(--border-soft)] bg-[color:var(--card-bg)] shadow-[var(--shadow-soft)] backdrop-blur-2xl transition duration-300 hover:-translate-y-2 hover:shadow-[var(--shadow-glow)] sm:rounded-[2rem]"
            >
              <div className="relative overflow-hidden">
                <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                  <img
                    src={screenshotUrl}
                    alt={project.title}
                    className="h-56 w-full object-cover object-top transition duration-500 hover:scale-105 sm:h-72"
                  />
                </a>

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent dark:from-slate-950/80" />
                <div className="absolute bottom-5 left-5 flex flex-wrap gap-2 pr-5">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={`${tech}-${index}`}
                      className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/35 px-2.5 py-1.5 text-[11px] font-medium text-white backdrop-blur-xl dark:border-white/20 dark:bg-white/15 sm:px-3 sm:text-xs"
                    >
                      {techIcons[tech.toLowerCase()] || <SiReact />}
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-5 p-5 sm:space-y-6 sm:p-6">
                <div className="space-y-3">
                  <h4 className="text-2xl font-black text-[var(--text-primary)] sm:text-3xl">{project.title}</h4>
                  <p className="text-sm leading-7 text-[var(--text-secondary)] sm:text-base">{project.description}</p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-[var(--border-soft)] bg-white/82 px-4 py-3 text-sm font-semibold text-[var(--text-primary)] shadow-[0_10px_24px_rgba(255,107,154,0.08)] transition duration-300 hover:-translate-y-0.5 hover:border-[var(--accent-primary)]/35 hover:text-[var(--accent-primary)] dark:bg-white/5"
                    >
                      <FaGithub />
                      {t("projects.actions.sourceCode")}
                    </a>
                  )}
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] px-4 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(255,107,154,0.22)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(255,107,154,0.28)]"
                  >
                    <FaExternalLinkAlt />
                    {t("projects.actions.liveDemo")}
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default WithBackend;

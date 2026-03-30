import { type ReactElement } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaGithub } from "react-icons/fa";
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
        <p className="text-sm uppercase tracking-[0.28em] text-[var(--accent-primary)]">
          Without backend
        </p>
        <h3 className="mt-2 text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
          Static and showcase projects
        </h3>
      </div>

      <div className="grid gap-8 xl:grid-cols-3">
        {localProjects.map((project) => (
          <article
            key={project.id}
            className="group overflow-hidden rounded-[2rem] border border-[var(--border-soft)] bg-[color:var(--card-bg)] shadow-[var(--shadow-soft)] backdrop-blur-2xl transition duration-300 hover:-translate-y-2 hover:shadow-[var(--shadow-glow)]"
          >
            <Link to={`/projects/${project.slug}`} className="block">
              <div className="relative overflow-hidden">
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="h-72 w-full object-cover object-top transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent dark:from-slate-950/80" />
                <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/45 bg-white/55 px-3 py-2 text-sm font-medium text-white backdrop-blur-xl dark:border-white/30 dark:bg-white/25">
                  <span style={{ color: project.accentColor }}>{project.icon}</span>
                  {project.category}
                </div>
                <div className="absolute bottom-5 left-5 flex flex-wrap gap-2 pr-5">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/35 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-xl dark:border-white/20 dark:bg-white/15"
                    >
                      {techIcons[tech.toLowerCase()] || <SiReact />}
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Link>

            <div className="space-y-6 p-6">
              <div className="space-y-3">
                <h4 className="text-3xl font-black text-[var(--text-primary)]">{project.title}</h4>
                <p className="leading-7 text-[var(--text-secondary)]">{project.description}</p>
              </div>

              <div className="flex items-center justify-between gap-3 text-sm text-[var(--text-secondary)]">
                <span>{project.stats}</span>
                <Link
                  to={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-2 font-semibold text-[var(--accent-primary)] transition hover:text-[var(--accent-secondary)]"
                >
                  Open page
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
                Source Code
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default WithoutBackend;

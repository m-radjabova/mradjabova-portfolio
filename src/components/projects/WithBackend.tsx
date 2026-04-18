import { FaExternalLinkAlt, FaGithub, FaLayerGroup } from "react-icons/fa";
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
          const shortDescription =
            project.description.length > 88 ? `${project.description.slice(0, 88).trimEnd()}...` : project.description;

          return (
            <ProjectShowcaseCard
              key={project.id}
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
          );
        })}
      </div>
    </div>
  );
}

export default WithBackend;

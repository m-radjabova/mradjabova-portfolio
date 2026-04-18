import { type ReactElement } from "react";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
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
          <ProjectShowcaseCard
            key={project.id}
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
        ))}
      </div>
    </div>
  );
}

export default WithoutBackend;

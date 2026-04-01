import WithoutBackend from "./WithoutBackend";
import WithBackend from "./WithBackend";
import { useTranslation } from "react-i18next";

function Projects() {
  const { t } = useTranslation();

  return (
    <section id="projects" className="relative px-4 pb-16 pt-28 sm:px-6 sm:pb-24 sm:pt-32 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(168,85,247,0.06),transparent_25%),radial-gradient(circle_at_90%_20%,rgba(255,107,154,0.08),transparent_30%),linear-gradient(180deg,transparent,rgba(255,255,255,0.2))] dark:bg-[radial-gradient(circle_at_10%_20%,rgba(168,85,247,0.12),transparent_25%),radial-gradient(circle_at_90%_20%,rgba(255,107,154,0.14),transparent_30%),linear-gradient(180deg,transparent,rgba(15,23,42,0.52))]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center animate-[fade-up_0.8s_ease-out_both]">
          <h2 className="mt-6 text-3xl font-black tracking-[-0.03em] text-[var(--text-primary)] sm:text-5xl">
            {t("projects.title.lead")}
            <span className="bg-gradient-to-r from-[var(--accent-gradient-from)] via-[var(--accent-gradient-via)] to-[var(--accent-gradient-to)] bg-clip-text text-transparent">
              {" "}{t("projects.title.accent")}
            </span>
          </h2>
          <p className="mt-4 text-base leading-7 text-[var(--text-secondary)] sm:text-lg sm:leading-8">
            {t("projects.subtitle")}
          </p>
        </div>

        <div className="mt-12 sm:mt-16">
          <WithoutBackend />
        </div>

        <div className="mt-12 sm:mt-16">
          <WithBackend />
        </div>
      </div>
    </section>
  );
}

export default Projects;

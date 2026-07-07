import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaCode, FaServer } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import WithBackend from "../../components/projects/WithBackend";
import WithoutBackend from "../../components/projects/WithoutBackend";

function ProjectsPage() {
  const { t } = useTranslation();

  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#f7eff3_0%,#f9f3f2_42%,#fff9f8_100%)] px-4 pb-20 pt-24 sm:px-6 lg:px-8">
    
      <div className="relative mx-auto max-w-7xl">
        <div className="rounded-[2.2rem] border border-white/70 bg-[rgba(255,251,250,0.78)] p-6 shadow-[0_30px_80px_rgba(183,167,205,0.14)] backdrop-blur-2xl sm:p-8 lg:p-10">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[var(--lavender-strong)]/82">
                {t("projects.page.eyebrow")}
              </p>
              <h1 className="section-title-display mt-4 text-[2.9rem] text-[var(--lavender-strong)] sm:text-[4rem]">
                {t("projects.page.title")}
              </h1>
              <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)] sm:text-[15px]">
                {t("projects.page.description")}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="#with-backend"
                className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/72 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--lavender-strong)] transition duration-300 hover:-translate-y-0.5"
              >
                <FaServer className="text-[0.75rem]" />
                {t("projects.panel.withLabel")}
              </a>
              <a
                href="#without-backend"
                className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/72 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--lavender-strong)] transition duration-300 hover:-translate-y-0.5"
              >
                <FaCode className="text-[0.75rem]" />
                {t("projects.panel.withoutLabel")}
              </a>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(183,170,212,0.3)] bg-white/80 px-4 py-2.5 text-sm font-medium text-[var(--lavender-strong)] transition duration-300 hover:-translate-y-0.5"
            >
              <FaArrowLeft className="text-xs" />
              {t("projects.page.backHome")}
            </Link>

            <span className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/60 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--text-secondary)]">
              <span className="h-2 w-2 rounded-full bg-[var(--accent-secondary)]" />
              {t("projects.page.splitLabel")}
            </span>
          </div>
        </div>

        <section
          id="with-backend"
          className="mt-10 rounded-[2.2rem] border border-white/70 bg-[rgba(255,251,250,0.8)] p-6 shadow-[0_28px_70px_rgba(183,167,205,0.12)] backdrop-blur-2xl sm:p-8"
        >
          <div className="mb-7 flex flex-col gap-4 border-b border-white/60 pb-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-secondary)]/20 bg-[var(--accent-secondary)]/8 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--accent-secondary)]">
                <FaServer />
                {t("projects.panel.withBadge")}
              </div>
              <h2 className="section-title-display mt-4 text-[2.5rem] text-[var(--text-primary)] sm:text-[3rem]">
                {t("projects.withBackend.title")}
              </h2>
              <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)] sm:text-[15px]">
                {t("projects.withBackend.description")}
              </p>
            </div>

            <a
              href="#without-backend"
              className="inline-flex items-center gap-2 self-start text-sm font-semibold text-[var(--lavender-strong)] transition duration-300 hover:gap-3"
            >
              {t("projects.panel.withoutLabel")}
              <FaArrowRight className="text-xs" />
            </a>
          </div>

          <WithBackend showHeader={false} />
        </section>

        <section
          id="without-backend"
          className="mt-8 rounded-[2.2rem] border border-white/70 bg-[rgba(255,251,250,0.8)] p-6 shadow-[0_28px_70px_rgba(183,167,205,0.12)] backdrop-blur-2xl sm:p-8"
        >
          <div className="mb-7 flex flex-col gap-4 border-b border-white/60 pb-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-primary)]/20 bg-[var(--accent-primary)]/8 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--accent-primary)]">
                <FaCode />
                {t("projects.panel.withoutBadge")}
              </div>
              <h2 className="section-title-display mt-4 text-[2.5rem] text-[var(--text-primary)] sm:text-[3rem]">
                {t("projects.withoutBackend.title")}
              </h2>
              <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)] sm:text-[15px]">
                {t("projects.withoutBackend.description")}
              </p>
            </div>
          </div>

          <WithoutBackend showHeader={false} />
        </section>
      </div>
    </main>
  );
}

export default ProjectsPage;

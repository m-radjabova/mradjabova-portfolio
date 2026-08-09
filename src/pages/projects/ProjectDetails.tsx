import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { SiBootstrap, SiCss3, SiFigma, SiReact, SiTypescript } from "react-icons/si";
import NotFound from "../../components/NotFound";
import { getLocalProjectBySlug } from "../../data/projects";

const techIcons = {
  react: <SiReact />,
  typescript: <SiTypescript />,
  bootstrap: <SiBootstrap />,
  figma: <SiFigma />,
  css: <SiCss3 />,
};

function ProjectDetails() {
  const { t } = useTranslation();
  const { slug } = useParams();
  const project = useMemo(() => getLocalProjectBySlug(slug), [slug]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [slug]);

  if (!project) {
    return <NotFound />;
  }

  const safeCurrentIndex = Math.min(currentIndex, project.images.length - 1);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === project.images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? project.images.length - 1 : prev - 1));
  };

  return (
    <section className="relative min-h-screen overflow-hidden px-4 py-20 sm:px-6 lg:px-6 lg:py-10">
      {/* ── Background — one soft orb per corner, quiet ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle,rgba(183,167,205,0.1),transparent_70%)] blur-3xl" />
        <div className="absolute -left-40 bottom-0 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(211,169,184,0.08),transparent_70%)] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* ── Back Button ── */}
        <Link
          to="/"
          className="group inline-flex animate-fade-up items-center gap-2.5 rounded-xl border border-white/60 bg-white/55 px-5 py-3 text-sm font-semibold text-[var(--lavender-strong)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/75 hover:shadow-[0_12px_30px_-10px_rgba(153,132,178,0.35)]"
        >
          <FaArrowLeft className="text-sm transition-transform duration-300 group-hover:-translate-x-1" />
          <span>{t("projects.details.backToHome")}</span>
        </Link>

        {/* ── Main Content ── */}
        <div
          className="mt-7 grid animate-fade-up gap-8 xl:grid-cols-[1.15fr_0.85fr] xl:gap-10"
          style={{ animationDelay: "0.08s" }}
        >
          {/* ── Left Column — Image Gallery ── */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="group relative overflow-hidden rounded-2xl border border-white/60 bg-white/40 shadow-[0_20px_60px_-20px_rgba(153,132,178,0.3)]">
              <img
                key={safeCurrentIndex}
                src={project.images[safeCurrentIndex]}
                alt={`${t(`projects.localItems.${project.slug}.title`)} ${t(
                  "projects.details.screenshot",
                ).toLowerCase()} ${safeCurrentIndex + 1}`}
                className="aspect-[16/10] w-full animate-[fade-up_0.4s_ease-out_both] object-contain"
              />

              {project.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    aria-label={t("projects.details.backToHome") /* prev image */}
                    className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-xl border border-white/50 bg-white/80 text-[var(--lavender-strong)] opacity-0 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white group-hover:opacity-100 sm:opacity-100"
                  >
                    <FaArrowLeft className="text-sm" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-xl border border-white/50 bg-white/80 text-[var(--lavender-strong)] opacity-0 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white group-hover:opacity-100 sm:opacity-100"
                  >
                    <FaArrowRight className="text-sm" />
                  </button>

                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/45 px-3.5 py-1 text-xs font-medium text-white backdrop-blur-md">
                    {safeCurrentIndex + 1} / {project.images.length}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {project.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2.5">
                {project.images.map((image, index) => (
                  <button
                    key={`${project.slug}-${index}`}
                    onClick={() => setCurrentIndex(index)}
                    aria-label={`${t("projects.details.thumbnail")} ${index + 1}`}
                    className={`relative overflow-hidden rounded-xl transition-all duration-300 ${
                      safeCurrentIndex === index
                        ? "ring-2 ring-[var(--lavender-strong)] ring-offset-2 ring-offset-[#f7eff3]"
                        : "opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${t(`projects.localItems.${project.slug}.title`)} ${t(
                        "projects.details.thumbnail",
                      ).toLowerCase()} ${index + 1}`}
                      className="aspect-[4/3] w-full object-cover object-top"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Right Column — Details ── */}
          <div className="space-y-5">
            {/* Main Info Card */}
            <div className="relative overflow-hidden rounded-2xl border border-white/60 bg-white/45 p-6 shadow-[0_20px_60px_-20px_rgba(153,132,178,0.3)] backdrop-blur-xl sm:p-8">
              <div className="absolute left-0 right-0 top-0 h-[3px] bg-gradient-to-r from-[#c7abc3] via-[#b7acd9] to-[#dba4af]" />

              {/* Category badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(199,171,195,0.25)] bg-white/60 px-3.5 py-2 text-xs font-semibold text-[var(--lavender-strong)]">
                <span style={{ color: project.accentColor }} className="text-base leading-none">
                  {project.icon}
                </span>
                {t(`projects.localItems.${project.slug}.category`)}
              </div>

              {/* Title */}
              <h1 className="mt-4 font-[var(--font-display)] text-[2.4rem] font-bold leading-[1.05] tracking-[-0.03em] text-[var(--lavender-strong)] sm:text-[3rem]">
                {t(`projects.localItems.${project.slug}.title`)}
              </h1>

              {/* Description */}
              <p className="mt-3.5 text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
                {t(`projects.localItems.${project.slug}.description`)}
              </p>

              {/* Technologies */}
              <div className="mt-5 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/60 bg-white/55 px-3.5 py-2 text-[13px] font-medium text-[var(--lavender-strong)] transition-colors duration-200 hover:bg-white/80"
                  >
                    <span className="text-[#c7abc3]">
                      {techIcons[tech.toLowerCase() as keyof typeof techIcons] || <SiReact />}
                    </span>
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="mt-7 flex flex-wrap gap-3">
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2.5 rounded-xl border border-white/60 bg-white/55 px-5 py-3 text-sm font-semibold text-[var(--lavender-strong)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/80"
                  >
                    <FaGithub className="text-base transition-transform duration-300 group-hover:scale-110" />
                    {t("projects.actions.sourceCode")}
                  </a>
                )}

                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-[#c7abc3] to-[#b7acd9] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_28px_-8px_rgba(199,171,195,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_-8px_rgba(199,171,195,0.6)]"
                  >
                    <FaExternalLinkAlt className="text-sm transition-transform duration-300 group-hover:rotate-12" />
                    {t("projects.actions.liveDemo")}
                  </a>
                )}
              </div>
            </div>

            {/* Features Card */}
            <div className="relative overflow-hidden rounded-2xl border border-white/60 bg-white/45 p-6 shadow-[0_20px_60px_-20px_rgba(153,132,178,0.3)] backdrop-blur-xl sm:p-8">
              <h2 className="flex items-center gap-2.5 text-xl font-bold text-[var(--lavender-strong)]">
                {t("projects.details.keyFeatures")}
              </h2>

              <div className="mt-4 space-y-2">
                {(
                  t(`projects.localItems.${project.slug}.features`, { returnObjects: true }) as string[]
                ).map((feature) => (
                  <div
                    key={feature}
                    className="flex items-start gap-3 rounded-xl border border-white/50 bg-white/45 px-4 py-3 transition-colors duration-200 hover:bg-white/65"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c7abc3]" />
                    <span className="text-[15px] leading-relaxed text-[var(--text-secondary)]">{feature}</span>
                  </div>
                ))}
              </div>

              {project.note && (
                <div className="mt-4 rounded-xl border border-[rgba(199,171,195,0.25)] bg-gradient-to-r from-[#c7abc3]/10 to-[#b7acd9]/10 px-4 py-3.5">
                  <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                    <strong className="text-[var(--lavender-strong)]">💡 {t("projects.details.note")}:</strong>{" "}
                    {t(`projects.localItems.${project.slug}.note`)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProjectDetails;
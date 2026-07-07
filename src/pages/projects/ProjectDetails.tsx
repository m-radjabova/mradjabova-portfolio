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
      {/* ====== Premium Background Effects ====== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Animated gradient orbs */}
        <div className="absolute -right-40 -top-40 h-[50rem] w-[50rem] rounded-full bg-[radial-gradient(circle,rgba(183,167,205,0.12),transparent_70%)] blur-3xl animate-pulse-soft" style={{ animationDuration: "8s" }} />
        <div className="absolute -left-40 bottom-0 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle,rgba(211,169,184,0.08),transparent_70%)] blur-3xl animate-pulse-soft" style={{ animationDuration: "10s", animationDelay: "2s" }} />
        <div className="absolute left-1/2 top-1/2 h-[60rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(207,163,180,0.04),transparent_70%)] blur-3xl" />
        
        {/* Floating particles */}
        <div className="absolute left-[5%] top-[10%] text-3xl text-[#d3a9b8]/20 animate-float">✦</div>
        <div className="absolute right-[10%] top-[15%] text-2xl text-[#d5bfd7]/20 animate-float-delayed">✦</div>
        <div className="absolute left-[45%] top-[5%] text-xl text-[#c7abc3]/15 animate-twinkle-soft">✦</div>
        <div className="absolute right-[5%] bottom-[25%] text-2xl text-[#d3a9b8]/20 animate-float" style={{ animationDuration: "7s" }}>✦</div>
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* ====== Back Button ====== */}
        <Link
          to="/"
          className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl bg-white/60 backdrop-blur-sm border border-white/60 px-6 py-3.5 text-sm font-semibold text-[var(--lavender-strong)] transition-all duration-300 hover:shadow-[0_15px_35px_rgba(173,156,196,0.12)] hover:-translate-y-0.5"
        >
          {/* Shine effect */}
          <span className="absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          
          <FaArrowLeft className="relative text-sm transition-transform duration-300 group-hover:-translate-x-1" />
          <span className="relative">{t("projects.details.backToHome")}</span>
        </Link>

        {/* ====== Main Content ====== */}
        <div className="mt-8 grid gap-8 xl:grid-cols-[1.2fr_0.8fr] xl:gap-10">
          {/* ====== Left Column - Image Gallery ====== */}
          <div className="space-y-5">
            {/* Main Image */}
            <div className="group relative overflow-hidden rounded-3xl bg-white/40 backdrop-blur-sm border border-white/60 shadow-[0_20px_60px_rgba(173,156,196,0.08)]">
              {/* Glass reflection */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent pointer-events-none" />
              
              <img
                src={project.images[safeCurrentIndex]}
                alt={`${t(`projects.localItems.${project.slug}.title`)} ${t("projects.details.screenshot").toLowerCase()} ${safeCurrentIndex + 1}`}
                className="aspect-[16/10] w-full object-contain transition-transform duration-700 group-hover:scale-[1.02]"
              />
              
              {/* Image navigation */}
              {project.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-2xl bg-white/80 backdrop-blur-md border border-white/60 text-[var(--lavender-strong)] transition-all duration-300 hover:bg-white hover:shadow-[0_10px_30px_rgba(173,156,196,0.15)] hover:scale-110"
                  >
                    <FaArrowLeft className="text-sm" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-2xl bg-white/80 backdrop-blur-md border border-white/60 text-[var(--lavender-strong)] transition-all duration-300 hover:bg-white hover:shadow-[0_10px_30px_rgba(173,156,196,0.15)] hover:scale-110"
                  >
                    <FaArrowRight className="text-sm" />
                  </button>

                  {/* Image counter */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/40 backdrop-blur-md px-4 py-1.5 text-xs font-medium text-white">
                    {safeCurrentIndex + 1} / {project.images.length}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {project.images.map((image, index) => (
                <button
                  key={`${project.slug}-${index}`}
                  onClick={() => setCurrentIndex(index)}
                  className={`group relative overflow-hidden rounded-2xl transition-all duration-300 ${
                    safeCurrentIndex === index
                      ? "ring-2 ring-[#c7abc3] ring-offset-2 ring-offset-white/50 shadow-[0_8px_25px_rgba(199,171,195,0.2)]"
                      : "hover:ring-2 hover:ring-[#c7abc3]/40 hover:ring-offset-2 hover:ring-offset-white/30"
                  }`}
                >
                  {/* Glass overlay */}
                  <div className="absolute inset-0 bg-white/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  
                  <img
                    src={image}
                    alt={`${t(`projects.localItems.${project.slug}.title`)} ${t("projects.details.thumbnail").toLowerCase()} ${index + 1}`}
                    className="aspect-[4/3] w-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Active indicator */}
                  {safeCurrentIndex === index && (
                    <div className="absolute inset-0 border-2 border-[#c7abc3] rounded-2xl" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* ====== Right Column - Details ====== */}
          <div className="space-y-6">
            {/* Main Info Card */}
            <div className="relative overflow-hidden rounded-3xl bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_20px_60px_rgba(173,156,196,0.08)] p-6 sm:p-8">
              {/* Glass reflection */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent pointer-events-none" />
              
              {/* Top accent gradient */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#c7abc3] via-[#b7acd9] to-[#dba4af]" />

              <div className="relative">
                {/* Category Badge */}
                <div className="inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-[#c7abc3]/20 to-[#b7acd9]/20 px-4 py-2.5 text-sm font-semibold text-[var(--lavender-strong)] border border-[rgba(199,171,195,0.2)]">
                  <span style={{ color: project.accentColor }} className="text-lg">
                    {project.icon}
                  </span>
                  {t(`projects.localItems.${project.slug}.category`)}
                </div>

                {/* Title */}
                <h1 className="mt-5 font-[var(--font-display)] text-4xl font-bold tracking-[-0.03em] text-[var(--lavender-strong)] sm:text-5xl">
                  {t(`projects.localItems.${project.slug}.title`)}
                </h1>

                {/* Description */}
                <p className="mt-4 text-lg leading-relaxed text-[var(--text-secondary)] sm:text-xl">
                  {t(`projects.localItems.${project.slug}.description`)}
                </p>

                {/* Technologies */}
                <div className="mt-6 flex flex-wrap gap-2.5">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="group inline-flex items-center gap-2.5 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/60 px-4 py-2.5 text-sm font-medium text-[var(--lavender-strong)] transition-all duration-300 hover:bg-white/80 hover:shadow-[0_8px_25px_rgba(173,156,196,0.1)] hover:scale-105"
                    >
                      <span className="text-[#c7abc3] transition-transform duration-300 group-hover:scale-110">
                        {techIcons[tech.toLowerCase() as keyof typeof techIcons] || <SiReact />}
                      </span>
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex flex-wrap gap-3">
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noreferrer"
                      className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl bg-white/60 backdrop-blur-sm border border-white/60 px-6 py-3.5 text-sm font-semibold text-[var(--lavender-strong)] transition-all duration-300 hover:shadow-[0_15px_35px_rgba(173,156,196,0.12)] hover:-translate-y-0.5"
                    >
                      <span className="absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                      <FaGithub className="relative text-lg transition-transform duration-300 group-hover:scale-110" />
                      <span className="relative">{t("projects.actions.sourceCode")}</span>
                    </a>
                  )}
                  
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noreferrer"
                      className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-[#c7abc3] to-[#b7acd9] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_8px_25px_rgba(199,171,195,0.25)] transition-all duration-300 hover:shadow-[0_12px_35px_rgba(199,171,195,0.35)] hover:-translate-y-0.5"
                    >
                      <span className="absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                      <FaExternalLinkAlt className="relative text-sm transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
                      <span className="relative">{t("projects.actions.liveDemo")}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Features Card */}
            <div className="relative overflow-hidden rounded-3xl bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_20px_60px_rgba(173,156,196,0.08)] p-6 sm:p-8">
              {/* Glass reflection */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent pointer-events-none" />
              
              <div className="relative">
                <h2 className="flex items-center gap-3 text-2xl font-bold text-[var(--lavender-strong)]">
                  <span className="text-3xl text-[#c7abc3]">✦</span>
                  {t("projects.details.keyFeatures")}
                </h2>
                
                <div className="mt-5 space-y-3">
                  {(t(`projects.localItems.${project.slug}.features`, { returnObjects: true }) as string[]).map((feature, index) => (
                    <div
                      key={feature}
                      className="group flex items-start gap-4 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/60 px-5 py-4 transition-all duration-300 hover:bg-white/70 hover:shadow-[0_8px_25px_rgba(173,156,196,0.08)] hover:scale-[1.02]"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <span className="mt-0.5 text-sm text-[#c7abc3]">✦</span>
                      <span className="text-[var(--text-secondary)]">{feature}</span>
                    </div>
                  ))}
                </div>

                {project.note && (
                  <div className="mt-5 rounded-2xl bg-gradient-to-r from-[#c7abc3]/10 to-[#b7acd9]/10 border border-[rgba(199,171,195,0.2)] px-5 py-4">
                    <p className="text-sm text-[var(--text-secondary)]">
                      <strong className="text-[var(--lavender-strong)]">💡 {t("projects.details.note")}:</strong>{" "}
                      {t(`projects.localItems.${project.slug}.note`)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 8s ease-in-out infinite 2s;
        }
        
        @keyframes twinkle-soft {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.2); }
        }
        .animate-twinkle-soft {
          animation: twinkle-soft 4s ease-in-out infinite;
        }
        
        @keyframes pulse-soft {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        .animate-pulse-soft {
          animation: pulse-soft 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}

export default ProjectDetails;
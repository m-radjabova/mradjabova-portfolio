import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaDownload, FaEye, FaFilePdf, FaFileWord, FaQuoteRight } from "react-icons/fa";
import { SiGoogledocs } from "react-icons/si";
import { resumeAssets, type ResumeLanguage } from "../../data/resume";
import { downloadResumeAsPdf, downloadResumeAsWord } from "../../utils/resumeDownloads";

type ResumeSectionProps = {
  standalone?: boolean;
};

function ResumeSection({ standalone = false }: ResumeSectionProps) {
  const { t, i18n } = useTranslation();
  const [downloading, setDownloading] = useState<"pdf" | "word" | null>(null);
  const [hoveredPreview, setHoveredPreview] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const selectedLanguage = (i18n.language.slice(0, 2) in resumeAssets
    ? i18n.language.slice(0, 2)
    : "en") as ResumeLanguage;
  const resume = resumeAssets[selectedLanguage];

  const handlePdfDownload = async () => {
    try {
      setDownloading("pdf");
      await downloadResumeAsPdf(resume.image, resume.fileBaseName);
    } finally {
      setDownloading(null);
    }
  };

  const handleWordDownload = async () => {
    try {
      setDownloading("word");
      await downloadResumeAsWord(
        resume.image,
        resume.fileBaseName,
        `${t("resume.title")} - ${selectedLanguage.toUpperCase()}`,
      );
    } finally {
      setDownloading(null);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-up");
          }
        });
      },
      { threshold: 0.08 },
    );

    const section = sectionRef.current;
    if (section) {
      const children = section.querySelectorAll(".stagger-item");
      children.forEach((child, i) => {
        (child as HTMLElement).style.animationDelay = `${i * 0.08}s`;
        observer.observe(child);
      });
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="resume"
      ref={sectionRef}
      className={`relative overflow-hidden px-3 sm:px-4 ${
        standalone ? "pb-8 pt-16 sm:pt-20" : "pb-8 pt-6 sm:pb-10 sm:pt-8"
      } lg:px-8`}
    >
      {/* ===== Decorative background elements ===== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Floating orbs - fewer on mobile */}
        <div className="absolute left-[6%] top-[12%] h-3 w-3 sm:h-4 sm:w-4 rounded-full bg-[#c18fa0]/20 animate-float" />
        <div className="hidden sm:block absolute right-[10%] top-[25%] h-3 w-3 rounded-full bg-[#b3aad7]/25 animate-float-delayed" />
        <div className="absolute left-[18%] bottom-[20%] h-3 w-3 sm:h-5 sm:w-5 rounded-full bg-[#c18fa0]/15 animate-float" style={{ animationDelay: "0.8s" }} />
        <div className="hidden sm:block absolute right-[22%] bottom-[30%] h-2.5 w-2.5 rounded-full bg-[#716895]/20 animate-float-delayed" />
        <div className="absolute left-[55%] top-[8%] h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-[#d996a4]/25 animate-float" style={{ animationDelay: "1.5s" }} />
        <div className="hidden sm:block absolute right-[35%] top-[45%] h-3.5 w-3.5 rounded-full bg-[#b3aad7]/15 animate-float" style={{ animationDelay: "2s" }} />

        {/* Elegant ring decorations - smaller on mobile */}
        <div className="absolute -left-16 -top-16 h-40 w-40 sm:h-60 sm:w-60 rounded-full border border-[#c18fa0]/8 animate-spin-slow" />
        <div className="hidden sm:block absolute -right-24 -bottom-24 h-72 w-72 rounded-full border border-[#b3aad7]/6 animate-spin-slow" style={{ animationDirection: "reverse" }} />
        <div className="absolute left-[35%] -top-28 h-48 w-48 sm:h-80 sm:w-80 rounded-full border border-[#c18fa0]/5 animate-spin-slow" style={{ animationDuration: "25s" }} />

        {/* Sparkle effects - fewer on mobile */}
        <div className="absolute left-[15%] top-[35%] text-[10px] sm:text-xs text-[#c18fa0]/25 animate-twinkle-soft select-none">✦</div>
        <div className="hidden sm:block absolute right-[18%] top-[50%] text-sm text-[#b3aad7]/20 animate-twinkle-soft select-none" style={{ animationDelay: "1s" }}>✦</div>
        <div className="absolute left-[65%] bottom-[40%] text-[8px] sm:text-[10px] text-[#d996a4]/25 animate-twinkle-soft select-none" style={{ animationDelay: "0.5s" }}>✦</div>
        <div className="hidden sm:block absolute right-[45%] top-[18%] text-xs text-[#c18fa0]/20 animate-twinkle-soft select-none" style={{ animationDelay: "1.5s" }}>✦</div>
      </div>

      <div className="mx-auto max-w-7xl">
        {/* ===== Section header ===== */}
        <div className="mb-6 sm:mb-8 text-center stagger-item opacity-0">
          <div className="inline-flex items-center gap-2 sm:gap-3 rounded-full border border-[#c18fa0]/20 bg-white/40 px-4 sm:px-5 py-1.5 sm:py-2 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] sm:tracking-[0.35em] text-[#7d719e] shadow-lg shadow-[#8c83aa]/6 backdrop-blur-md">
            <span className="inline-flex h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-[#c18fa0] animate-pulse" />
            {t("resume.eyebrow")}
            <span className="inline-flex h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-[#c18fa0] animate-pulse" />
          </div>

          <div className="mx-auto mt-3 sm:mt-4 flex items-center justify-center gap-2 sm:gap-3">
            <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent via-[#c18fa0]/40 to-transparent" />
            <span className="text-[10px] sm:text-xs text-[#c18fa0]/60 select-none">✦</span>
            <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent via-[#c18fa0]/40 to-transparent" />
          </div>
        </div>

        {/* ===== Main card ===== */}
        <div className="relative overflow-hidden rounded-[1.8rem] sm:rounded-[2.75rem] border border-white/70 bg-[rgba(255,251,249,0.75)] shadow-[0_30px_80px_rgba(189,173,209,0.12)] backdrop-blur-2xl transition-all duration-500 hover:shadow-[0_40px_100px_rgba(189,173,209,0.18)]">
          {/* Subtle gradient overlay */}
          <div className="pointer-events-none absolute inset-0 rounded-[1.8rem] sm:rounded-[2.75rem] bg-gradient-to-br from-[#c18fa0]/3 via-transparent to-[#b3aad7]/5" />

          {/* Animated gradient border line at top */}
          <div
            className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#c18fa0]/40 to-transparent"
            style={{
              backgroundSize: "200% 100%",
              animation: "shimmer-text 3s ease-in-out infinite",
            }}
          />

          <div className="relative grid gap-0 lg:grid-cols-[0.82fr_1.18fr]">
            {/* ===== LEFT PANEL – Download options ===== */}
            <div className="relative border-b border-[rgba(190,181,212,0.15)] px-4 sm:px-5 py-5 sm:py-6 lg:border-b-0 lg:border-r">
              {/* Decorative quote icon */}
              <div className="absolute -top-2 -left-2 text-3xl sm:text-5xl text-[#c18fa0]/8 select-none leading-none">
                <FaQuoteRight className="rotate-180" />
              </div>

              <div className="relative z-10">
                <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] sm:tracking-[0.34em] text-[var(--lavender-strong)]/70 stagger-item opacity-0">
                  {t("resume.eyebrow")}
                </p>
                <h2 className="section-title-display mt-3 sm:mt-4 text-[2rem] sm:text-[2.6rem] text-[var(--lavender-strong)] stagger-item opacity-0">
                  {t("resume.title")}
                </h2>
                <p className="mt-3 sm:mt-4 max-w-md text-xs sm:text-sm leading-6 sm:leading-7 text-[var(--text-secondary)] stagger-item opacity-0">
                  {t("resume.description")}
                </p>

                {/* Decorative divider */}
                <div className="my-5 sm:my-7 flex items-center gap-3 sm:gap-4 stagger-item opacity-0">
                  <div className="h-px flex-1 bg-gradient-to-r from-[#c18fa0]/20 to-transparent" />
                  <div className="flex gap-1.5 sm:gap-2">
                    <span className="h-1 sm:h-1.5 w-1 sm:w-1.5 rounded-full bg-[#c18fa0]/40" />
                    <span className="h-1 sm:h-1.5 w-1 sm:w-1.5 rounded-full bg-[#b3aad7]/40" />
                    <span className="h-1 sm:h-1.5 w-1 sm:w-1.5 rounded-full bg-[#c18fa0]/40" />
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-l from-[#b3aad7]/20 to-transparent" />
                </div>

                {/* Download buttons */}
                <div className="grid gap-2 sm:gap-3 sm:grid-cols-2 stagger-item opacity-0">
                  <button
                    type="button"
                    onClick={handlePdfDownload}
                    disabled={downloading !== null}
                    className="group relative inline-flex min-h-10 sm:min-h-12 items-center justify-center gap-2 sm:gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[#c18fa0] to-[#b3aad7] px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white shadow-[0_12px_28px_rgba(193,143,160,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(193,143,160,0.4)] disabled:opacity-70"
                  >
                    <span className="absolute inset-0 translate-x-[-100%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-[100%]" />
                    <FaFilePdf className="relative" />
                    <span className="relative">
                      {downloading === "pdf" ? t("resume.downloadPreparing") : t("resume.downloadPdf")}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={handleWordDownload}
                    disabled={downloading !== null}
                    className="group relative inline-flex min-h-10 sm:min-h-12 items-center justify-center gap-2 sm:gap-3 overflow-hidden rounded-full border border-white/35 bg-white/60 px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-[var(--lavender-strong)] shadow-[0_8px_24px_rgba(193,143,160,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#c18fa0]/35 hover:shadow-[0_12px_32px_rgba(193,143,160,0.2)] disabled:opacity-70"
                  >
                    <span className="absolute inset-0 translate-x-[-100%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-[#c18fa0]/10 to-transparent transition-transform duration-500 group-hover:translate-x-[100%]" />
                    <FaFileWord className="relative" />
                    <span className="relative">
                      {downloading === "word" ? t("resume.downloadPreparing") : t("resume.downloadWord")}
                    </span>
                  </button>
                </div>

                {/* Download image link */}
                <a
                  href={resume.image}
                  download={`${resume.fileBaseName}.png`}
                  className="group mt-2 sm:mt-3 inline-flex w-full items-center justify-center gap-2 sm:gap-3 rounded-full border border-[rgba(190,181,212,0.2)] bg-white/40 px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-[var(--text-secondary)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#b3aad7]/30 hover:text-[var(--lavender-strong)] hover:shadow-[0_8px_24px_rgba(179,170,215,0.15)] stagger-item opacity-0"
                >
                  <FaDownload className="transition-transform duration-300 group-hover:translate-y-0.5" />
                  {t("resume.downloadImage")}
                </a>

                {/* Language badge */}
                <div className="mt-4 sm:mt-5 flex items-center gap-1.5 sm:gap-2 stagger-item opacity-0">
                  <SiGoogledocs className="text-[var(--text-muted)]" />
                  <span className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.18em] sm:tracking-[0.2em] text-[var(--text-muted)]">
                    {selectedLanguage.toUpperCase()} version
                  </span>
                </div>
              </div>
            </div>

            {/* ===== RIGHT PANEL – Resume preview ===== */}
            <div
              className="relative bg-[linear-gradient(135deg,rgba(255,250,251,0.9),rgba(248,242,250,0.95))] p-3 sm:p-4 md:p-6"
              onMouseEnter={() => setHoveredPreview(true)}
              onMouseLeave={() => setHoveredPreview(false)}
            >
              <div
                className={`overflow-hidden rounded-[1.4rem] sm:rounded-[1.8rem] border border-white/70 bg-white/72 shadow-[0_20px_46px_rgba(177,162,201,0.12)] transition-all duration-500 ${
                  hoveredPreview ? "shadow-[0_28px_60px_rgba(177,162,201,0.22)]" : ""
                }`}
              >
                {/* MacOS-style window header */}
                <div className="flex items-center justify-between border-b border-[rgba(185,177,212,0.22)] px-3 sm:px-4 py-2 sm:py-3">
                  <div className="flex items-center gap-1 sm:gap-1.5">
                    <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-rose-300 transition-all duration-300 hover:scale-125" />
                    <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-amber-300 transition-all duration-300 hover:scale-125" />
                    <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-emerald-300 transition-all duration-300 hover:scale-125" />
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.22em] text-[var(--text-muted)]">
                      {selectedLanguage.toUpperCase()}
                    </span>
                    <div className="h-2 sm:h-3 w-px bg-[rgba(185,177,212,0.22)]" />
                    <FaEye className="text-[8px] sm:text-[10px] text-[var(--text-muted)]" />
                  </div>
                </div>

                {/* Preview content */}
                <div className="p-3 sm:p-4">
                  <div className="relative overflow-hidden rounded-[1rem] sm:rounded-[1.2rem]">
                    <img
                      src={resume.image}
                      alt={t("resume.title")}
                      className={`max-h-[24rem] sm:max-h-[34rem] w-full object-contain transition-transform duration-700 ${
                        hoveredPreview ? "scale-[1.02]" : "scale-100"
                      }`}
                    />
                    {/* Gradient fade at bottom */}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 sm:h-20 bg-[linear-gradient(180deg,rgba(255,255,255,0),rgba(255,250,251,0.92))]" />
                  </div>
                  <div className="mt-3 sm:mt-4 inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/75 bg-white/75 px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.22em] text-[var(--lavender-strong)]">
                    <FaEye />
                    {t("resume.previewLabel")}
                  </div>
                </div>
              </div>

              {/* Decorative subtle text at the bottom */}
              <p
                className="mt-2 sm:mt-3 text-right text-base sm:text-lg text-[#c18fa0]/40 select-none"
                style={{ fontFamily: "var(--font-script)" }}
              >
                Muslima Radjabova
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ResumeSection;
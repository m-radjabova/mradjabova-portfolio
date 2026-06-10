import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FaDownload,
  FaFilePdf,
  FaFileWord,
  FaCloudDownloadAlt,
  FaEye,
  FaAward,
  FaStar,
} from "react-icons/fa";
import { resumeAssets, type ResumeLanguage } from "../../data/resume";
import { downloadResumeAsPdf, downloadResumeAsWord } from "../../utils/resumeDownloads";

type ResumeSectionProps = {
  standalone?: boolean;
};

function ResumeSection({ standalone = false }: ResumeSectionProps) {
  const { t, i18n } = useTranslation();
  const [downloading, setDownloading] = useState<"pdf" | "word" | null>(null);
  const [isHoveringPreview, setIsHoveringPreview] = useState(false);
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
        `${t("resume.title")} - ${selectedLanguage.toUpperCase()}`
      );
    } finally {
      setDownloading(null);
    }
  };

  return (
    <section
      id="resume"
      className={`relative overflow-hidden px-4 ${
        standalone ? "pb-8 pt-24 sm:pb-10 sm:pt-28" : "py-12 sm:py-16"
      } sm:px-6 lg:min-h-[100svh] lg:px-8 lg:py-20`}
    >
      {/* ====== Premium Background Layers ====== */}

      {/* Base gradient canvas – uses CSS variables for proper dark/light switching */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,107,154,0.06),transparent_50%),radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.08),transparent_50%),linear-gradient(180deg,color-mix(in srgb,var(--bg-base) 8%,transparent),transparent)] dark:bg-[radial-gradient(circle_at_20%_30%,rgba(255,107,154,0.10),transparent_50%),radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.12),transparent_50%),linear-gradient(180deg,color-mix(in srgb,var(--bg-base) 90%,transparent),color-mix(in srgb,var(--bg-soft) 70%,transparent))]" />

      {/* Floating gradient orbs */}
      <div className="absolute left-[5%] top-[15%] h-72 w-72 animate-[glow-drift_8s_ease-in-out_infinite] rounded-full bg-[var(--accent-primary)]/[0.07] blur-[100px]" />
      <div className="absolute bottom-[10%] right-[8%] h-80 w-80 animate-[glow-drift_12s_ease-in-out_infinite_reverse] rounded-full bg-[var(--accent-secondary)]/[0.07] blur-[100px]" />
      <div className="absolute left-[40%] top-[50%] h-60 w-60 animate-[glow-drift_10s_ease-in-out_infinite_1s] rounded-full bg-[var(--accent-tertiary)]/[0.05] blur-[80px]" />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Decorative ring */}
      <div className="absolute right-[12%] top-[25%] h-40 w-40 animate-[spin-slow_20s_linear_infinite] rounded-full border border-[var(--accent-primary)]/[0.06]">
        <div className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-[var(--accent-primary)]/[0.15]" />
        <div className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[var(--accent-secondary)]/[0.12]" />
      </div>
      <div className="absolute left-[8%] bottom-[20%] h-28 w-28 animate-[spin-slow_25s_linear_infinite_reverse] rounded-full border border-[var(--accent-secondary)]/[0.06]">
        <div className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[var(--accent-secondary)]/[0.12]" />
      </div>

      {/* ====== Floating Particles ====== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[25%] top-[18%] h-1.5 w-1.5 animate-[float_4s_ease-in-out_infinite] rounded-full bg-[var(--accent-primary)]/30" />
        <div className="absolute right-[30%] top-[35%] h-1 w-1 animate-[float_5s_ease-in-out_infinite_0.5s] rounded-full bg-[var(--accent-secondary)]/30" />
        <div className="absolute left-[15%] bottom-[30%] h-1 w-1 animate-[float_6s_ease-in-out_infinite_1s] rounded-full bg-[var(--accent-primary)]/20" />
        <div className="absolute right-[20%] bottom-[15%] h-1.5 w-1.5 animate-[float_4.5s_ease-in-out_infinite_1.5s] rounded-full bg-[var(--accent-tertiary)]/20" />
        <div className="absolute left-[50%] top-[10%] h-1 w-1 animate-[float_5.5s_ease-in-out_infinite_0.8s] rounded-full bg-[var(--accent-secondary)]/20" />
        <div className="absolute right-[55%] bottom-[40%] h-0.5 w-0.5 animate-[float_3.5s_ease-in-out_infinite_2s] rounded-full bg-[var(--accent-primary)]/40" />
      </div>

      {/* ====== Main Content ====== */}
      <div
        className={`relative mx-auto mt-10 flex max-w-6xl animate-[fade-up_0.8s_ease-out_both] items-center ${
          standalone ? "" : "lg:min-h-[calc(100svh-10rem)]"
        }`}
      >
        <div className="w-full">
          {/* Section Header */}
          <div className="mb-8 text-center">
            
            <h2 className="bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-tertiary)] bg-clip-text text-3xl font-extrabold leading-tight text-transparent sm:text-4xl lg:text-5xl">
              {t("resume.title")}
            </h2>
            <p className="mt-2 text-sm text-[var(--text-secondary)] sm:text-base">
              {t("resume.description")}
            </p>
          </div>

          {/* ====== Main Grid ====== */}
          <div className="grid gap-4 rounded-[2rem] border border-[var(--border-soft)] bg-[var(--card-bg)] p-3 shadow-[var(--shadow-soft)] backdrop-blur-2xl transition-all duration-500 hover:shadow-[var(--shadow-glow)] sm:p-4 lg:grid-cols-[0.72fr_1.28fr] lg:items-stretch">
            
            {/* ====== LEFT: Download Panel ====== */}
            <div className="group relative overflow-hidden rounded-[1.6rem] border border-[var(--border-soft)] bg-gradient-to-b from-[var(--card-solid)] to-[var(--card-bg)] p-5 shadow-[var(--shadow-soft)] backdrop-blur-xl transition-all duration-500 hover:shadow-[var(--shadow-glow)] dark:from-white/[0.04] dark:to-white/[0.01] sm:p-6">
              {/* Panel glow */}
              <div className="pointer-events-none absolute -inset-20 -top-40 rounded-full bg-[var(--accent-primary)]/[0.04] opacity-0 blur-[60px] transition-opacity duration-700 group-hover:opacity-100" />

              <div className="relative">
                {/* Icon header */}
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--accent-primary)]/15 to-[var(--accent-secondary)]/15 text-[var(--accent-primary)] shadow-[0_4px_16px_color-mix(in_srgb,var(--accent-primary)_10%,transparent)]">
                    <FaCloudDownloadAlt className="text-lg" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--accent-primary)]">
                      {t("resume.previewLabel")}
                    </p>
                    <p className="text-xs text-[var(--text-muted)]">
                      {t("resume.downloadFormats", "PDF · Word · PNG")}
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="mb-5 h-px bg-gradient-to-r from-[var(--accent-primary)]/20 via-[var(--accent-secondary)]/20 to-transparent" />

                {/* Download Buttons */}
                <div className="grid gap-3">
                  {/* PDF Button */}
                  <button
                    type="button"
                    onClick={handlePdfDownload}
                    disabled={downloading !== null}
                    className="btn-resume-download relative inline-flex min-h-12 items-center justify-center gap-3 overflow-hidden rounded-[1.1rem] bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_36px_color-mix(in_srgb,var(--accent-primary)_28%,transparent)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_48px_color-mix(in_srgb,var(--accent-primary)_35%,transparent)] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {/* Shine overlay */}
                    <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[20deg] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                    <FaFilePdf className="text-base" />
                    <span>
                      {downloading === "pdf"
                        ? t("resume.downloadPreparing")
                        : t("resume.downloadPdf")}
                    </span>
                    {downloading === "pdf" && (
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    )}
                  </button>

                  {/* Word Button */}
                  <button
                    type="button"
                    onClick={handleWordDownload}
                    disabled={downloading !== null}
                    className="btn-resume-download relative inline-flex min-h-12 items-center justify-center gap-3 overflow-hidden rounded-[1.1rem] border border-[var(--border-soft)] bg-[var(--card-solid)] px-5 py-3 text-sm font-semibold text-[var(--text-primary)] shadow-[var(--shadow-soft)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--accent-primary)]/30 hover:text-[var(--accent-primary)] hover:shadow-[0_12px_32px_color-mix(in_srgb,var(--accent-primary)_12%,transparent)] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[20deg] bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                    <FaFileWord className="text-base" />
                    <span>
                      {downloading === "word"
                        ? t("resume.downloadPreparing")
                        : t("resume.downloadWord")}
                    </span>
                    {downloading === "word" && (
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--accent-primary)]/30 border-t-[var(--accent-primary)]" />
                    )}
                  </button>

                  {/* PNG Download */}
                  <a
                    href={resume.image}
                    download={`${resume.fileBaseName}.png`}
                    className="btn-resume-download group/link relative inline-flex min-h-12 items-center justify-center gap-3 overflow-hidden rounded-[1.1rem] border border-dashed border-[var(--border-soft)] bg-transparent px-5 py-3 text-sm font-semibold text-[var(--text-secondary)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--accent-primary)]/25 hover:text-[var(--accent-primary)] hover:shadow-[0_8px_24px_color-mix(in_srgb,var(--accent-primary)_8%,transparent)]"
                  >
                    <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[20deg] bg-gradient-to-r from-transparent via-[var(--accent-primary)]/5 to-transparent transition-transform duration-700 group-hover/link:translate-x-full" />
                    <FaDownload className="text-base transition-transform duration-300 group-hover/link:-translate-y-0.5" />
                    <span>{t("resume.downloadImage")}</span>
                  </a>
                </div>

                {/* Trust badges */}
                <div className="mt-5 flex items-center justify-center gap-4 text-[10px] text-[var(--text-muted)]">
                  <span className="flex items-center gap-1">
                    <FaStar className="text-[9px] text-amber-400" />
                    {t("resume.highQuality", "High Quality")}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaAward className="text-[9px] text-amber-400" />
                    {t("resume.upToDate", "Up to Date")}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaEye className="text-[9px] text-[var(--text-muted)]" />
                    {t("resume.atsFriendly", "ATS Friendly")}
                  </span>
                </div>
              </div>
            </div>

            {/* ====== RIGHT: Resume Preview ====== */}
            <div
              className="group/preview relative overflow-hidden rounded-[1.6rem] border border-[var(--border-soft)] bg-[var(--card-solid)] shadow-[var(--shadow-soft)] transition-all duration-500 hover:shadow-[0_24px_60px_rgba(15,23,42,0.12),0_0_60px_color-mix(in_srgb,var(--accent-primary)_4%,transparent)] dark:bg-[var(--card-bg)]"
              onMouseEnter={() => setIsHoveringPreview(true)}
              onMouseLeave={() => setIsHoveringPreview(false)}
            >
              {/* Top bar mockup */}
              <div className="flex items-center gap-2 border-b border-[var(--border-soft)]/60 px-4 py-3">
                <div className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                  <div className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                </div>
                <div className="ml-3 flex-1 rounded-md bg-[var(--border-soft)]/40 px-3 py-1 text-[10px] text-[var(--text-muted)]">
                  {resume.fileBaseName}.png
                </div>
                <div className="flex items-center gap-1 text-[10px] text-[var(--text-muted)]">
                  <FaEye className="text-[9px]" />
                  {t("resume.preview", "Preview")}
                </div>
              </div>

              {/* Image container */}
              <div className="flex h-full items-center justify-center p-3 sm:p-4">
                <div className="relative w-full overflow-hidden rounded-[1rem]">
                  {/* Hover zoom overlay */}
                  <div
                    className={`absolute inset-0 z-10 flex items-center justify-center rounded-[1rem] bg-black/20 opacity-0 backdrop-blur-[2px] transition-all duration-500 ${
                      isHoveringPreview ? "opacity-100" : ""
                    }`}
                  >
                    <span className="flex items-center gap-2 rounded-full bg-[var(--bg-elevated)] px-4 py-2 text-xs font-semibold text-[var(--text-primary)] shadow-[var(--shadow-soft)] backdrop-blur-md">
                      <FaEye className="text-[var(--accent-primary)]" />
                      {t("resume.viewFull", "View Full Resume")}
                    </span>
                  </div>

                  {/* Resume image with zoom effect */}
                  <img
                    src={resume.image}
                    alt={t("resume.title")}
                    className={`w-full rounded-[1rem] object-contain transition-all duration-700 ${
                      isHoveringPreview
                        ? "scale-[1.03]"
                        : "scale-100"
                    } max-h-[55svh] lg:max-h-[65svh]`}
                    style={{
                      boxShadow: isHoveringPreview
                        ? "0 8px 40px rgba(0,0,0,0.12)"
                        : "0 4px 20px rgba(0,0,0,0.06)",
                    }}
                  />

                  {/* Bottom gradient fade – uses CSS variable for proper dark/light */}
                  <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[var(--card-solid)] to-transparent" />
                </div>
              </div>

              {/* Bottom status bar */}
              <div className="flex items-center justify-between border-t border-[var(--border-soft)]/60 px-4 py-2.5">
                <div className="flex items-center gap-2 text-[10px] text-[var(--text-muted)]">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  {t("resume.ready", "Ready to download")}
                </div>
                <div className="flex items-center gap-1 text-[10px] font-medium text-[var(--text-secondary)]">
                  <FaFilePdf className="text-[9px] text-[var(--accent-primary)]" />
                  {selectedLanguage.toUpperCase()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ResumeSection;
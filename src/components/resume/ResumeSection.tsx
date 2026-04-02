import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaDownload, FaFilePdf, FaFileWord } from "react-icons/fa";
import { resumeAssets, type ResumeLanguage } from "../../data/resume";
import { downloadResumeAsPdf, downloadResumeAsWord } from "../../utils/resumeDownloads";

type ResumeSectionProps = {
  standalone?: boolean;
};

function ResumeSection({ standalone = false }: ResumeSectionProps) {
  const { t, i18n } = useTranslation();
  const [downloading, setDownloading] = useState<"pdf" | "word" | null>(null);
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
      className={`relative px-4 ${standalone ? "pb-8 pt-24 sm:pb-10 sm:pt-28" : "py-12 sm:py-16"} sm:px-6 lg:min-h-[100svh] lg:px-8 lg:py-20`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,107,154,0.08),transparent_24%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.12),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.08),transparent)] dark:bg-[radial-gradient(circle_at_top_left,rgba(255,107,154,0.14),transparent_24%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.18),transparent_24%),linear-gradient(180deg,rgba(2,6,23,0.18),rgba(15,23,42,0.3))]" />
      <div className="absolute left-[8%] top-20 h-52 w-52 rounded-full bg-[var(--accent-primary)]/10 blur-3xl" />
      <div className="absolute bottom-16 right-[6%] h-64 w-64 rounded-full bg-[var(--accent-secondary)]/10 blur-3xl" />

      <div className="relative mt-10 mx-auto flex max-w-6xl items-center animate-[fade-up_0.8s_ease-out_both] lg:min-h-[calc(100svh-10rem)]">
        <div className="w-full">
        <div className="grid gap-4 rounded-[1.9rem] border border-[var(--border-soft)] bg-[color:var(--card-bg)] p-3 shadow-[var(--shadow-soft)] backdrop-blur-2xl sm:p-4 lg:grid-cols-[0.76fr_1.24fr] lg:items-stretch">
          <div className="rounded-[1.6rem] border border-[var(--border-soft)] bg-white/72 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:bg-white/5 sm:p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--accent-primary)]">
              {t("resume.previewLabel")}
            </p>
            <div className="mt-5 grid gap-3">
              <button
                type="button"
                onClick={handlePdfDownload}
                disabled={downloading !== null}
                className="inline-flex min-h-11 items-center justify-center gap-3 rounded-[1.1rem] bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_36px_rgba(255,107,154,0.28)] transition duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <FaFilePdf />
                {downloading === "pdf" ? t("resume.downloadPreparing") : t("resume.downloadPdf")}
              </button>

              <button
                type="button"
                onClick={handleWordDownload}
                disabled={downloading !== null}
                className="inline-flex min-h-11 items-center justify-center gap-3 rounded-[1.1rem] border border-[var(--border-soft)] bg-white/82 px-5 py-3 text-sm font-semibold text-[var(--text-primary)] shadow-[var(--shadow-soft)] transition duration-300 hover:-translate-y-0.5 hover:border-[var(--accent-primary)]/35 hover:text-[var(--accent-primary)] disabled:cursor-not-allowed disabled:opacity-70 dark:bg-white/5"
              >
                <FaFileWord />
                {downloading === "word" ? t("resume.downloadPreparing") : t("resume.downloadWord")}
              </button>

              <a
                href={resume.image}
                download={`${resume.fileBaseName}.png`}
                className="inline-flex min-h-11 items-center justify-center gap-3 rounded-[1.1rem] border border-dashed border-[var(--border-soft)] bg-transparent px-5 py-3 text-sm font-semibold text-[var(--text-secondary)] transition duration-300 hover:border-[var(--accent-primary)]/35 hover:text-[var(--accent-primary)]"
              >
                <FaDownload />
                {t("resume.downloadImage")}
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-[1.6rem] border border-[var(--border-soft)] bg-white/90 shadow-[0_18px_44px_rgba(15,23,42,0.1)] dark:bg-slate-950/40">
            <div className="flex h-full items-center justify-center p-3 sm:p-4">
              <img
                src={resume.image}
                alt={t("resume.title")}
                className="max-h-[60svh] w-full rounded-[1rem] object-contain lg:max-h-[68svh]"
              />
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}

export default ResumeSection;

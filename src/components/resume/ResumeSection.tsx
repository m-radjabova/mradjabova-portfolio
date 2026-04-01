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
      className={`relative px-4 ${standalone ? "pb-16 pt-28 sm:pb-20 sm:pt-32" : "py-16 sm:py-24"} sm:px-6 lg:px-8`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,107,154,0.08),transparent_24%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.12),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.08),transparent)] dark:bg-[radial-gradient(circle_at_top_left,rgba(255,107,154,0.14),transparent_24%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.18),transparent_24%),linear-gradient(180deg,rgba(2,6,23,0.18),rgba(15,23,42,0.3))]" />
      <div className="absolute left-[8%] top-20 h-52 w-52 rounded-full bg-[var(--accent-primary)]/10 blur-3xl" />
      <div className="absolute bottom-16 right-[6%] h-64 w-64 rounded-full bg-[var(--accent-secondary)]/10 blur-3xl" />

      <div className="relative mx-auto max-w-5xl animate-[fade-up_0.8s_ease-out_both]">
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent-primary)] sm:text-sm sm:tracking-[0.28em]">
            {t("resume.eyebrow")}
          </p>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.03em] text-[var(--text-primary)] sm:text-5xl">
            {t("resume.title")}
          </h2>
        </div>

        <div className="rounded-[1.9rem] border border-[var(--border-soft)] bg-[color:var(--card-bg)] p-3 shadow-[var(--shadow-soft)] backdrop-blur-2xl sm:p-5">
          <div className="overflow-hidden rounded-[1.6rem] border border-[var(--border-soft)] bg-white/90 shadow-[0_18px_44px_rgba(15,23,42,0.1)] dark:bg-slate-950/40">
            <div>
              <img
                src={resume.image}
                alt={t("resume.title")}
                className="w-full object-contain"
              />
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <button
              type="button"
              onClick={handlePdfDownload}
              disabled={downloading !== null}
              className="inline-flex min-h-13 items-center justify-center gap-3 rounded-[1.2rem] bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_36px_rgba(255,107,154,0.28)] transition duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <FaFilePdf />
              {downloading === "pdf" ? t("resume.downloadPreparing") : t("resume.downloadPdf")}
            </button>

            <button
              type="button"
              onClick={handleWordDownload}
              disabled={downloading !== null}
              className="inline-flex min-h-13 items-center justify-center gap-3 rounded-[1.2rem] border border-[var(--border-soft)] bg-white/82 px-5 py-3 text-sm font-semibold text-[var(--text-primary)] shadow-[var(--shadow-soft)] transition duration-300 hover:-translate-y-0.5 hover:border-[var(--accent-primary)]/35 hover:text-[var(--accent-primary)] disabled:cursor-not-allowed disabled:opacity-70 dark:bg-white/5"
            >
              <FaFileWord />
              {downloading === "word" ? t("resume.downloadPreparing") : t("resume.downloadWord")}
            </button>

            <a
              href={resume.image}
              download={`${resume.fileBaseName}.png`}
              className="inline-flex min-h-13 items-center justify-center gap-3 rounded-[1.2rem] border border-dashed border-[var(--border-soft)] bg-transparent px-5 py-3 text-sm font-semibold text-[var(--text-secondary)] transition duration-300 hover:border-[var(--accent-primary)]/35 hover:text-[var(--accent-primary)]"
            >
              <FaDownload />
              {t("resume.downloadImage")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ResumeSection;

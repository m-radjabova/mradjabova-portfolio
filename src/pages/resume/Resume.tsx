import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaArrowLeft, FaDownload, FaFilePdf, FaFileWord } from "react-icons/fa";
import { resumeAssets, type ResumeLanguage } from "../../data/resume";
import { downloadResumeAsPdf, downloadResumeAsWord } from "../../utils/resumeDownloads";

function Resume() {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState<ResumeLanguage>("en");
  const [downloading, setDownloading] = useState<"pdf" | "word" | null>(null);

  useEffect(() => {
    const language = i18n.language.slice(0, 2) as ResumeLanguage;
    if (language in resumeAssets) {
      setSelectedLanguage(language);
    }
  }, [i18n.language]);

  const resume = resumeAssets[selectedLanguage];
  const resumeTitle = t(`resume.languages.${selectedLanguage}`);

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
        `${t("resume.title")} - ${resumeTitle}`
      );
    } finally {
      setDownloading(null);
    }
  };

  return (
    <section className="relative px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,107,154,0.08),transparent_24%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.12),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.08),transparent)] dark:bg-[radial-gradient(circle_at_top_left,rgba(255,107,154,0.14),transparent_24%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.18),transparent_24%),linear-gradient(180deg,rgba(2,6,23,0.18),rgba(15,23,42,0.3))]" />

      <div className="relative mx-auto max-w-7xl space-y-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full border border-[var(--border-soft)] bg-[color:var(--card-bg)] px-5 py-3 text-sm font-semibold text-[var(--text-primary)] shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5 hover:border-[var(--accent-primary)]/35 hover:text-[var(--accent-primary)]"
        >
          <FaArrowLeft />
          {t("resume.backToHome")}
        </Link>

        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr] xl:gap-8">
          <div className="rounded-[1.7rem] border border-[var(--border-soft)] bg-[color:var(--card-bg)] p-5 shadow-[var(--shadow-soft)] backdrop-blur-2xl sm:rounded-[2rem] sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent-primary)] sm:text-sm sm:tracking-[0.28em]">
              {t("resume.eyebrow")}
            </p>
            <h1 className="mt-4 text-3xl font-black text-[var(--text-primary)] sm:text-5xl">
              {t("resume.title")}
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg sm:leading-8">
              {t("resume.description")}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {(["en", "ru", "uz"] as ResumeLanguage[]).map((language) => (
                <button
                  key={language}
                  type="button"
                  onClick={() => setSelectedLanguage(language)}
                  className={`rounded-full px-4 py-3 text-sm font-semibold transition duration-300 sm:px-5 ${
                    selectedLanguage === language
                      ? "bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white shadow-[0_16px_36px_rgba(255,107,154,0.28)]"
                      : "border border-[var(--border-soft)] bg-white/70 text-[var(--text-secondary)] hover:text-[var(--text-primary)] dark:bg-white/5"
                  }`}
                >
                  {t(`resume.languages.${language}`)}
                </button>
              ))}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <button
                type="button"
                onClick={handleWordDownload}
                disabled={downloading !== null}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border-soft)] bg-white/82 px-5 py-3 text-sm font-semibold text-[var(--text-primary)] shadow-[var(--shadow-soft)] transition duration-300 hover:-translate-y-0.5 hover:border-[var(--accent-primary)]/35 hover:text-[var(--accent-primary)] disabled:cursor-not-allowed disabled:opacity-70 dark:bg-white/5"
              >
                <FaFileWord />
                {downloading === "word" ? t("resume.downloadPreparing") : t("resume.downloadWord")}
              </button>

              <button
                type="button"
                onClick={handlePdfDownload}
                disabled={downloading !== null}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_36px_rgba(255,107,154,0.28)] transition duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <FaFilePdf />
                {downloading === "pdf" ? t("resume.downloadPreparing") : t("resume.downloadPdf")}
              </button>
            </div>

            <a
              href={resume.image}
              download={`${resume.fileBaseName}.png`}
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent-primary)] transition hover:text-[var(--accent-secondary)]"
            >
              <FaDownload />
              {t("resume.downloadImage")}
            </a>
          </div>

          <div className="rounded-[1.7rem] border border-[var(--border-soft)] bg-[color:var(--card-bg)] p-3 shadow-[var(--shadow-soft)] backdrop-blur-2xl sm:rounded-[2rem] sm:p-6">
            <div className="overflow-hidden rounded-[1.5rem] border border-[var(--border-soft)] bg-white/85 shadow-[0_14px_34px_rgba(15,23,42,0.08)] dark:bg-slate-950/40">
              <img
                src={resume.image}
                alt={`${t("resume.title")} ${resumeTitle}`}
                className="w-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Resume;

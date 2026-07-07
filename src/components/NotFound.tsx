import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaHome, FaSearch } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import useResolvedTheme from "../hooks/useResolvedTheme";

function NotFound() {
  useResolvedTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--bg-base)] px-4 py-10 transition-colors duration-300">
      {/* ── Background layers ── */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,248,250,0.5),rgba(255,243,246,0.62),rgba(253,247,248,0.72))] dark:bg-[linear-gradient(180deg,rgba(15,23,42,0.38),rgba(17,24,39,0.48),rgba(26,26,46,0.6))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,107,154,0.14),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(243,196,255,0.18),transparent_28%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(255,107,154,0.2),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.22),transparent_28%)]" />

      {/* ── Glowing orbs ── */}
      <div className="absolute -left-20 top-16 h-72 w-72 rounded-full bg-[var(--accent-primary)]/16 blur-3xl animate-[glow-drift_14s_ease-in-out_infinite]" />
      <div className="absolute right-0 bottom-10 h-80 w-80 rounded-full bg-[var(--accent-secondary)]/16 blur-3xl animate-[glow-drift_16s_ease-in-out_infinite]" />
      <div className="absolute left-1/3 bottom-1/4 h-52 w-52 rounded-full bg-[#c18fa0]/10 blur-3xl animate-[glow-drift_18s_ease-in-out_infinite]" />

      {/* ── Dot pattern overlay ── */}
      <div className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(circle_at_1px_1px,rgba(255,107,154,0.2)_1px,transparent_0)] [background-size:30px_30px] dark:opacity-[0.08]" />

      {/* ── Floating decorative sparkles ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <span className="absolute left-[8%] top-[12%] animate-[sparkle-pop_4s_ease-in-out_infinite] text-[12px] text-[#c18fa0]/30 select-none">✦</span>
        <span className="absolute right-[15%] top-[18%] animate-[sparkle-pop_4.5s_ease-in-out_1s_infinite] text-[10px] text-[#b3aad7]/30 select-none">✦</span>
        <span className="absolute left-[55%] top-[8%] animate-[sparkle-pop_5s_ease-in-out_2s_infinite] text-[11px] text-[#d996a4]/25 select-none">✦</span>
        <span className="absolute right-[30%] bottom-[25%] animate-[sparkle-pop_4.2s_ease-in-out_0.5s_infinite] text-[9px] text-[#c18fa0]/25 select-none">✦</span>
        <span className="absolute left-[22%] bottom-[18%] animate-[sparkle-pop_4.8s_ease-in-out_1.5s_infinite] text-[10px] text-[#8c83aa]/25 select-none">✦</span>
      </div>

      {/* ── Decorative rings ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute left-[12%] top-[22%] h-14 w-14 animate-[ring-expand_4s_ease-out_infinite] rounded-full border border-[#c18fa0]/20" />
        <div className="absolute left-[12%] top-[22%] h-14 w-14 animate-[ring-expand_4s_ease-out_2s_infinite] rounded-full border border-[#c18fa0]/15" />
        <div className="absolute right-[18%] bottom-[32%] h-12 w-12 animate-[ring-expand_4s_ease-out_1s_infinite] rounded-full border border-[#b3aad7]/20" />
        <div className="absolute right-[18%] bottom-[32%] h-12 w-12 animate-[ring-expand_4s_ease-out_3s_infinite] rounded-full border border-[#b3aad7]/15" />
      </div>

      {/* ── Main card ── */}
      <div
        className={`relative w-full max-w-4xl rounded-[1.8rem] border border-[var(--border-soft)] bg-[color:var(--card-bg)] p-5 shadow-[var(--shadow-soft)] backdrop-blur-2xl transition-all duration-700 sm:rounded-[2.2rem] sm:p-12 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <div className="grid items-center gap-10 lg:grid-cols-[0.88fr_1.12fr]">
          {/* ── Left: Visual area ── */}
          <div className="relative">
            {/* Glow behind the visual */}
            <div className="absolute inset-x-6 top-12 h-48 rounded-full bg-gradient-to-r from-[var(--accent-primary)]/18 to-[var(--accent-secondary)]/18 blur-3xl" />

            {/* Orbiting decorative ring */}
            <div className="absolute left-1/2 top-1/2 h-56 w-56 sm:h-64 sm:w-64 -translate-x-1/2 -translate-y-1/2 animate-[spin-slow_20s_linear_infinite] rounded-full border border-dashed border-[var(--accent-primary)]/20" />

            {/* Main visual circle */}
            <div className="relative mx-auto flex aspect-square max-w-[19rem] items-center justify-center rounded-full border border-[var(--border-soft)] bg-[linear-gradient(135deg,rgba(255,255,255,0.7),rgba(255,255,255,0.26))] shadow-[0_22px_60px_rgba(255,107,154,0.14)] dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] animate-[float-gentle_6s_ease-in-out_infinite]">
              {/* Inner decorative ring */}
              <div className="absolute inset-4 rounded-full border border-[var(--accent-primary)]/16" />
              <div className="absolute inset-7 rounded-full border border-[var(--accent-secondary)]/12" />

              {/* Floating sparkle inside */}
              <span className="absolute -top-1 -right-1 text-[16px] text-[var(--accent-primary)]/35 animate-[orbit-icon_3s_ease-in-out_infinite] select-none">✦</span>
              <span className="absolute -bottom-2 -left-1 text-[13px] text-[var(--accent-secondary)]/30 animate-[orbit-icon_3.5s_ease-in-out_0.5s_infinite] select-none">✦</span>

              {/* 404 text */}
              <div className="text-center relative z-10">
                <p className="text-[5rem] font-black leading-none sm:text-[6.5rem] font-[var(--font-display)]">
                  4
                  <span className="bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-gradient-via)] to-[var(--accent-secondary)] bg-clip-text text-transparent">
                    0
                  </span>
                  4
                </p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.34em] text-[var(--text-secondary)]">
                  {t("notFound.orbitLabel")}
                </p>
              </div>
            </div>
          </div>

          {/* ── Right: Content area ── */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div
              className={`inline-flex items-center rounded-full border border-[var(--border-soft)] bg-white/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--accent-primary)] backdrop-blur-xl dark:bg-white/5 transition-all duration-500 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
              }`}
              style={{ transitionDelay: "0.15s" }}
            >
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[var(--accent-primary)] mr-2 animate-pulse" />
              {t("notFound.badge")}
            </div>

            {/* Title */}
            <h1
              className={`mt-5 text-3xl font-black leading-tight sm:text-5xl transition-all duration-500 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
              }`}
              style={{ transitionDelay: "0.25s" }}
            >
              <span className="bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-gradient-via)] to-[var(--accent-secondary)] bg-clip-text text-transparent">
                {t("notFound.title")}
              </span>
            </h1>

            {/* Description */}
            <p
              className={`mt-4 max-w-xl text-base leading-8 text-[var(--text-secondary)] sm:text-lg transition-all duration-500 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
              }`}
              style={{ transitionDelay: "0.35s" }}
            >
              {t("notFound.description")}
            </p>

            {/* Decorative divider */}
            <div
              className={`mt-6 flex items-center justify-center gap-3 lg:justify-start transition-all duration-500 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
              }`}
              style={{ transitionDelay: "0.45s" }}
            >
              <div className="h-px w-8 bg-gradient-to-r from-transparent via-[var(--accent-primary)]/30 to-transparent" />
              <span className="text-[var(--accent-primary)]/40 select-none">✦</span>
              <div className="h-px w-8 bg-gradient-to-r from-transparent via-[var(--accent-primary)]/30 to-transparent" />
            </div>

            {/* Buttons */}
            <div
              className={`mt-6 flex flex-wrap justify-center gap-3 lg:justify-start sm:gap-4 transition-all duration-500 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
              }`}
              style={{ transitionDelay: "0.55s" }}
            >
              {/* Back button */}
              <button
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-[var(--border-soft)] bg-white/72 px-5 py-3 font-semibold text-[var(--text-primary)] shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--accent-primary)]/35 hover:text-[var(--accent-primary)] dark:bg-white/5 sm:px-6"
                onClick={() => navigate(-1)}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <FaArrowLeft className="transition-transform duration-300 group-hover:-translate-x-0.5" />
                  {t("notFound.back")}
                </span>
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-[var(--accent-primary)]/8 to-transparent transition-transform duration-500 group-hover:translate-x-0" />
              </button>

              {/* Home button */}
              <button
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] px-5 py-3 font-semibold text-white shadow-[0_14px_30px_rgba(217,150,164,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_38px_rgba(217,150,164,0.35)] sm:px-6"
                onClick={() => navigate("/")}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <FaHome />
                  {t("notFound.home")}
                </span>
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="absolute inset-0 animate-[shimmer_3s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </span>
              </button>

              {/* Projects button */}
              <button
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-[var(--border-soft)] bg-[color:var(--card-bg)] px-5 py-3 font-semibold text-[var(--text-primary)] shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--accent-primary)]/35 hover:text-[var(--accent-primary)] sm:px-6"
                onClick={() => navigate("/", { state: { scrollTo: "projects" } })}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <FaSearch />
                  {t("notFound.projects")}
                </span>
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-[var(--accent-primary)]/8 to-transparent transition-transform duration-500 group-hover:translate-x-0" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;

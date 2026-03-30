import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaHome, FaSearch } from "react-icons/fa";
import useResolvedTheme from "../hooks/useResolvedTheme";

function NotFound() {
  useResolvedTheme();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--bg-base)] px-4 py-10 transition-colors duration-300">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,248,250,0.5),rgba(255,243,246,0.62),rgba(253,247,248,0.72))] dark:bg-[linear-gradient(180deg,rgba(15,23,42,0.38),rgba(17,24,39,0.48),rgba(26,26,46,0.6))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,107,154,0.14),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(243,196,255,0.18),transparent_28%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(255,107,154,0.2),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.22),transparent_28%)]" />
      <div className="absolute -left-20 top-16 h-72 w-72 rounded-full bg-[var(--accent-primary)]/16 blur-3xl animate-[glow-drift_14s_ease-in-out_infinite]" />
      <div className="absolute right-0 bottom-10 h-80 w-80 rounded-full bg-[var(--accent-secondary)]/16 blur-3xl animate-[glow-drift_16s_ease-in-out_infinite]" />
      <div className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(circle_at_1px_1px,rgba(255,107,154,0.2)_1px,transparent_0)] [background-size:30px_30px] dark:opacity-[0.08]" />

      <div
        className={`relative w-full max-w-4xl rounded-[2.2rem] border border-[var(--border-soft)] bg-[color:var(--card-bg)] p-8 shadow-[var(--shadow-soft)] backdrop-blur-2xl transition duration-500 sm:p-12 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <div className="grid items-center gap-10 lg:grid-cols-[0.88fr_1.12fr]">
          <div className="relative">
            <div className="absolute inset-x-8 top-12 h-44 rounded-full bg-gradient-to-r from-[var(--accent-primary)]/18 to-[var(--accent-secondary)]/18 blur-3xl" />
            <div className="relative mx-auto flex aspect-square max-w-[19rem] items-center justify-center rounded-full border border-[var(--border-soft)] bg-[linear-gradient(135deg,rgba(255,255,255,0.7),rgba(255,255,255,0.26))] shadow-[0_22px_60px_rgba(255,107,154,0.14)] dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]">
              <div className="absolute inset-5 rounded-full border border-[var(--accent-primary)]/18" />
              <div className="text-center">
                <p className="text-[5rem] font-black leading-none sm:text-[6.5rem]">
                  4
                  <span className="bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-gradient-via)] to-[var(--accent-secondary)] bg-clip-text text-transparent">
                    0
                  </span>
                  4
                </p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.34em] text-[var(--text-secondary)]">
                  Lost in navigation
                </p>
              </div>
            </div>
          </div>

          <div className="text-center lg:text-left">
            <div className="inline-flex items-center rounded-full border border-[var(--border-soft)] bg-white/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--accent-primary)] backdrop-blur-xl dark:bg-white/5">
              Page Not Found
            </div>
            <h1 className="mt-5 text-3xl font-black leading-tight sm:text-5xl">
              This page doesn't exist
            </h1>
            <p className="mt-4 max-w-xl text-base leading-8 text-[var(--text-secondary)] sm:text-lg">
              The link you followed may have been broken or the page may have been removed.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
              <button
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border-soft)] bg-white/72 px-6 py-3 font-semibold text-[var(--text-primary)] shadow-[var(--shadow-soft)] transition duration-300 hover:-translate-y-0.5 hover:border-[var(--accent-primary)]/35 hover:text-[var(--accent-primary)] dark:bg-white/5"
                onClick={() => navigate(-1)}
              >
                <FaArrowLeft />
                Go Back
              </button>
              <button
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] px-6 py-3 font-semibold text-white shadow-[0_16px_36px_rgba(255,107,154,0.28)] transition duration-300 hover:-translate-y-0.5"
                onClick={() => navigate("/")}
              >
                <FaHome />
                Home
              </button>
              <button
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border-soft)] bg-[color:var(--card-bg)] px-6 py-3 font-semibold text-[var(--text-primary)] shadow-[var(--shadow-soft)] transition duration-300 hover:-translate-y-0.5 hover:border-[var(--accent-primary)]/35 hover:text-[var(--accent-primary)]"
                onClick={() => navigate("/", { state: { scrollTo: "projects" } })}
              >
                <FaSearch />
                Projects
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;

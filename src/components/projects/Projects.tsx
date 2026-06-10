import WithoutBackend from "./WithoutBackend";
import WithBackend from "./WithBackend";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaCode, FaServer } from "react-icons/fa";

type ProjectTab = "without" | "with";

function Projects() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<ProjectTab>("with");

  return (
    <section id="projects" className="relative overflow-hidden px-4 pb-16 pt-24 sm:px-6 sm:pb-24 sm:pt-32 lg:px-8">
      {/* ── Ambient background layers ── */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(168,85,247,0.06),transparent_35%),radial-gradient(circle_at_80%_25%,rgba(255,107,154,0.07),transparent_40%),radial-gradient(circle_at_50%_75%,rgba(74,168,255,0.04),transparent_45%),linear-gradient(180deg,transparent,rgba(255,255,255,0.06))] dark:bg-[radial-gradient(circle_at_20%_30%,rgba(168,85,247,0.1),transparent_35%),radial-gradient(circle_at_80%_25%,rgba(255,107,154,0.12),transparent_40%),radial-gradient(circle_at_50%_75%,rgba(74,168,255,0.08),transparent_45%),linear-gradient(180deg,transparent,rgba(8,17,29,0.4))]" />

      {/* ── Floating decorative orbs ── */}
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-20 h-[400px] w-[400px] rounded-full opacity-[0.04] blur-[100px] dark:opacity-[0.08]" style={{ background: "radial-gradient(circle, var(--accent-primary), transparent 70%)" }} />
      <div aria-hidden="true" className="pointer-events-none absolute -right-28 top-40 h-[360px] w-[360px] rounded-full opacity-[0.03] blur-[90px] dark:opacity-[0.06]" style={{ background: "radial-gradient(circle, var(--accent-tertiary), transparent 70%)" }} />
      <div aria-hidden="true" className="pointer-events-none absolute bottom-16 left-1/4 h-[260px] w-[260px] rounded-full opacity-[0.02] blur-[80px] dark:opacity-[0.05]" style={{ background: "radial-gradient(circle, var(--accent-secondary), transparent 70%)" }} />

      <div className="relative mx-auto max-w-7xl">
        {/* ── Section Header ── */}
        <div className="mx-auto max-w-3xl text-center">
          

          <h2 className="mt-2 text-3xl font-black tracking-[-0.03em] text-[var(--text-primary)] sm:text-5xl lg:text-6xl">
            {t("projects.title.lead")}
            <span className="bg-gradient-to-r from-[var(--accent-gradient-from)] via-[var(--accent-gradient-via)] to-[var(--accent-gradient-to)] bg-clip-text text-transparent bg-[length:200%_100%] animate-[shimmer-text_4s_ease-in-out_infinite]">
              {" "}{t("projects.title.accent")}
            </span>
          </h2>

          {/* Decorative divider */}
          <div className="mx-auto mt-5 flex items-center justify-center gap-2">
            <span className="h-px w-5 rounded-full bg-[var(--accent-primary)]/30" />
            <span className="flex items-center gap-1">
              <span className="inline-block h-px w-6 rounded-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)]" />
              <span className="inline-block h-1.5 w-1.5 rotate-45 rounded-sm bg-gradient-to-br from-[var(--accent-secondary)] to-[var(--accent-tertiary)]" />
              <span className="inline-block h-px w-6 rounded-full bg-gradient-to-r from-[var(--accent-secondary)] to-[var(--accent-tertiary)]" />
            </span>
            <span className="h-px w-5 rounded-full bg-[var(--accent-tertiary)]/30" />
          </div>
          {/* Toggle tabs */}
          <div className="group/tabs mt-8 inline-flex flex-wrap items-center justify-center gap-1 rounded-[1.35rem] border border-[var(--border-soft)] bg-[var(--card-bg)]/80 p-1.5 backdrop-blur-2xl shadow-[0_18px_50px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0_24px_60px_rgba(0,0,0,0.12)] hover:border-[var(--accent-primary)]/10">
            <button
              type="button"
              onClick={() => setActiveTab("without")}
              className={`group/btn relative inline-flex items-center gap-2.5 overflow-hidden rounded-[1.1rem] px-5 py-3 text-sm font-bold tracking-[-0.01em] transition-all duration-500 ease-out ${
                activeTab === "without"
                  ? "text-white shadow-[0_8px_32px_color-mix(in_srgb,var(--accent-primary),35%)] scale-105"
                  : "text-[var(--text-secondary)]/80 hover:text-[var(--text-primary)]"
              }`}
            >
              {/* Active bg layer */}
              <span
                className={`absolute inset-0 rounded-[inherit] bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] transition-all duration-500 ease-out ${
                  activeTab === "without"
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-90"
                }`}
              />
              {/* Hover bg layer */}
              <span
                className={`absolute inset-0 rounded-[inherit] bg-white/[0.06] transition-all duration-300 ${
                  activeTab === "without" ? "opacity-0" : "opacity-0 group-hover/btn:opacity-100"
                }`}
              />
              {/* Shimmer on active */}
              <span
                className={`absolute inset-0 -translate-x-full skew-x-[-15deg] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-[900ms] ${
                  activeTab === "without" ? "group-hover/btn:translate-x-full" : ""
                }`}
              />
              {/* Glow ring on active */}
              <span
                className={`absolute -inset-[2px] rounded-[inherit] bg-gradient-to-r from-[var(--accent-primary)]/40 to-[var(--accent-secondary)]/40 blur-sm transition-all duration-500 ${
                  activeTab === "without" ? "opacity-100" : "opacity-0"
                }`}
                aria-hidden="true"
              />
              <FaCode className={`relative z-10 text-xs transition-all duration-300 ${activeTab === "without" ? "scale-110" : "opacity-60 group-hover/btn:opacity-100"}`} />
              <span className="relative z-10">{t("projects.withoutBackend.badge")}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("with")}
              className={`group/btn relative inline-flex items-center gap-2.5 overflow-hidden rounded-[1.1rem] px-5 py-3 text-sm font-bold tracking-[-0.01em] transition-all duration-500 ease-out ${
                activeTab === "with"
                  ? "text-white shadow-[0_8px_32px_color-mix(in_srgb,var(--accent-primary),35%)] scale-105"
                  : "text-[var(--text-secondary)]/80 hover:text-[var(--text-primary)]"
              }`}
            >
              {/* Active bg layer */}
              <span
                className={`absolute inset-0 rounded-[inherit] bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] transition-all duration-500 ease-out ${
                  activeTab === "with"
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-90"
                }`}
              />
              {/* Hover bg layer */}
              <span
                className={`absolute inset-0 rounded-[inherit] bg-white/[0.06] transition-all duration-300 ${
                  activeTab === "with" ? "opacity-0" : "opacity-0 group-hover/btn:opacity-100"
                }`}
              />
              {/* Shimmer on active */}
              <span
                className={`absolute inset-0 -translate-x-full skew-x-[-15deg] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-[900ms] ${
                  activeTab === "with" ? "group-hover/btn:translate-x-full" : ""
                }`}
              />
              {/* Glow ring on active */}
              <span
                className={`absolute -inset-[2px] rounded-[inherit] bg-gradient-to-r from-[var(--accent-primary)]/40 to-[var(--accent-secondary)]/40 blur-sm transition-all duration-500 ${
                  activeTab === "with" ? "opacity-100" : "opacity-0"
                }`}
                aria-hidden="true"
              />
              <FaServer className={`relative z-10 text-xs transition-all duration-300 ${activeTab === "with" ? "scale-110" : "opacity-60 group-hover/btn:opacity-100"}`} />
              <span className="relative z-10">{t("projects.withBackend.badge")}</span>
            </button>
          </div>
        </div>

        {/* ── Active Section ── */}
        <div className="mt-16 sm:mt-20">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/8 bg-[var(--card-bg)]/70 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.12)] backdrop-blur-2xl sm:p-6">
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute inset-x-0 top-0 h-px transition-all duration-300 ${
                activeTab === "with"
                  ? "bg-gradient-to-r from-transparent via-[var(--accent-secondary)]/60 to-transparent"
                  : "bg-gradient-to-r from-transparent via-[var(--accent-primary)]/60 to-transparent"
              }`}
            />
            <div className="mb-5 flex items-center justify-between gap-3 border-b border-white/6 pb-4">
              <div className="flex items-center gap-3">
                <span
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl border ${
                    activeTab === "with"
                      ? "border-[var(--accent-secondary)]/20 bg-[var(--accent-secondary)]/10 text-[var(--accent-secondary)]"
                      : "border-[var(--accent-primary)]/20 bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]"
                  }`}
                >
                  {activeTab === "with" ? <FaServer className="text-sm" /> : <FaCode className="text-sm" />}
                </span>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">
                    {activeTab === "with" ? "Backend Projects" : "Frontend Projects"}
                  </p>
                  <h3 className="mt-1 text-lg font-bold tracking-[-0.02em] text-[var(--text-primary)] sm:text-xl">
                    {activeTab === "with"
                      ? t("projects.withBackend.title")
                      : t("projects.withoutBackend.title")}
                  </h3>
                </div>
              </div>
              <span
                className={`hidden rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] sm:inline-flex ${
                  activeTab === "with"
                    ? "border-[var(--accent-secondary)]/15 bg-[var(--accent-secondary)]/6 text-[var(--accent-secondary)]"
                    : "border-[var(--accent-primary)]/15 bg-[var(--accent-primary)]/6 text-[var(--accent-primary)]"
                }`}
              >
                {activeTab === "with" ? "Featured first" : "Showcase"}
              </span>
            </div>

            <div key={activeTab} className="animate-[fade-up_0.35s_ease-out_both]">
              {activeTab === "without" ? <WithoutBackend showHeader={false} /> : <WithBackend showHeader={false} />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Projects;

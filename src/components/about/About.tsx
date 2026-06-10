import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  FaGraduationCap,
  FaHeart,
  FaCode,
  FaRocket,
  FaStar,
  FaPalette,
  FaBullseye,
  FaArrowRight,
  FaCrown,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { FiExternalLink } from "react-icons/fi";

// ── Types ──────────────────────────────────────────────────────
interface DecorativeItem {
  id: number;
  size: number;
  left: string;
  top: string;
  delay: string;
  duration: string;
  opacity: number;
}

// ── Floating Orbs Generator ────────────────────────────────────
const useOrbs = (count: number): DecorativeItem[] => {
  const [orbs, setOrbs] = useState<DecorativeItem[]>([]);

  useEffect(() => {
    const items: DecorativeItem[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      size: Math.floor(Math.random() * 140) + 60,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 6}s`,
      duration: `${Math.random() * 8 + 10}s`,
      opacity: Math.random() * 0.12 + 0.04,
    }));
    setOrbs(items);
  }, [count]);

  return orbs;
};

// ── Animated Counter ───────────────────────────────────────────
const AnimatedCounter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted.current) {
          hasStarted.current = true;
          let start = 0;
          const step = Math.ceil(value / 50);
          const interval = setInterval(() => {
            start += step;
            if (start >= value) {
              setCount(value);
              clearInterval(interval);
            } else {
              setCount(start);
            }
          }, 28);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
};

// ── Skill Bar ──────────────────────────────────────────────────
const SkillBar = ({ label, level }: { label: string; level: number }) => {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setWidth(level), 200);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [level]);

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-[var(--text-primary)]">{label}</span>
        <span className="text-xs font-semibold text-[var(--accent-primary)]">{level}%</span>
      </div>
      <div className="relative h-2 overflow-hidden rounded-full bg-[var(--border-strong)]">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] transition-all duration-[1200ms] ease-out"
          style={{ width: `${width}%` }}
        >
          <div className="absolute inset-0 animate-[shimmer_2.4s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>
      </div>
    </div>
  );
};

// ── Petal Component ────────────────────────────────────────────
const SakuraPetal = () => (
  <div
    className="absolute pointer-events-none"
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      width: `${Math.floor(Math.random() * 8) + 6}px`,
      height: `${Math.floor(Math.random() * 8) + 6}px`,
      opacity: Math.random() * 0.2 + 0.05,
      animation: `float-petal ${Math.random() * 10 + 12}s ease-in-out ${Math.random() * 8}s infinite`,
    }}
  >
    <svg viewBox="0 0 24 24" fill="currentColor" className="text-[var(--accent-primary)]">
      <path d="M12 2C12 2 8 6 8 10C8 13.3 10.7 16 12 16C13.3 16 16 13.3 16 10C16 6 12 2 12 2Z" />
    </svg>
  </div>
);

// ── Main Component ─────────────────────────────────────────────
const About = () => {
  const { t } = useTranslation();
  const orbs = useOrbs(5);
  const [activeTab, setActiveTab] = useState<"education" | "skills">("education");

  const education = [
    {
      year: t("about.education.year"),
      degree: t("about.education.degree"),
      institution: t("about.education.institution"),
      description: t("about.education.description"),
      icon: <FaGraduationCap />,
    },
  ];

  const skillCategories = [
    {
      name: "Frontend",
      skills: [
        { label: "React / TypeScript", level: 94 },
        { label: "Tailwind CSS", level: 92 },
        { label: "Next.js", level: 82 },
      ],
    },
    {
      name: "Design",
      skills: [
        { label: "UI/UX Design", level: 88 },
        { label: "Figma", level: 85 },
        { label: "Responsive Layouts", level: 90 },
      ],
    },
    {
      name: "Backend & Tools",
      skills: [
        { label: "Node.js / Express", level: 78 },
        { label: "Firebase", level: 80 },
        { label: "Git / GitHub", level: 90 },
      ],
    },
  ];

  const stats = [
    { value: 12, label: "Projects", suffix: "+", icon: <FaCode /> },
    { value: 3, label: "Years Exp", suffix: "+", icon: <FaStar /> },
    { value: 50, label: "UI Components", suffix: "+", icon: <FaPalette /> },
    { value: 24, label: "Achievements", suffix: "", icon: <FaCrown /> },
  ];

  return (
    <section
      id="about"
      className="relative overflow-hidden px-4 pb-20 pt-28 sm:px-6 sm:pb-28 sm:pt-32 lg:px-8"
    >
      {/* ── Background Layers ── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_25%,rgba(255,107,154,0.08),transparent_45%),radial-gradient(ellipse_at_85%_35%,rgba(168,85,247,0.06),transparent_45%),radial-gradient(ellipse_at_50%_75%,rgba(74,168,255,0.05),transparent_40%)] dark:bg-[radial-gradient(ellipse_at_15%_25%,rgba(255,107,154,0.15),transparent_45%),radial-gradient(ellipse_at_85%_35%,rgba(168,85,247,0.12),transparent_45%),radial-gradient(ellipse_at_50%_75%,rgba(74,168,255,0.08),transparent_40%)]" />

      {/* ── Floating Orbs ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {orbs.map((orb) => (
          <div
            key={orb.id}
            className="absolute rounded-full blur-3xl animate-[glow-drift_variables]"
            style={{
              width: orb.size,
              height: orb.size,
              left: orb.left,
              top: orb.top,
              opacity: orb.opacity,
              background: `radial-gradient(circle, ${
                orb.id % 3 === 0
                  ? "var(--accent-primary)"
                  : orb.id % 3 === 1
                  ? "var(--accent-secondary)"
                  : "var(--accent-tertiary)"
              }, transparent 70%)`,
              animation: `glow-drift ${orb.duration} ${orb.delay} infinite`,
            } as React.CSSProperties}
          />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <SakuraPetal key={`petal-${i}`} />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* ════ Section Header ════ */}
        <div className="mx-auto max-w-3xl text-center animate-[fade-up_0.9s_ease-out_both]">

          <h2 className="mt-6 text-3xl font-black tracking-[-0.03em] text-[var(--text-primary)] sm:text-5xl lg:text-6xl">
            {t("about.title.lead")}
            <br />
            <span className="bg-gradient-to-r from-[var(--accent-gradient-from)] via-[var(--accent-gradient-via)] to-[var(--accent-gradient-to)] bg-clip-text text-transparent bg-[length:200%_auto] animate-[shimmer-text_4s_ease_infinite]">
              {t("about.title.accent")}
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg sm:leading-8">
            {t("about.subtitle")}
          </p>
        </div>

        {/* ════ Stats Row ════ */}
        <div className="mt-16 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 lg:gap-5">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group relative rounded-2xl border border-[var(--border-soft)] bg-white/60 px-4 py-5 text-center backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-glow)] dark:bg-white/[0.04] sm:rounded-[1.5rem] sm:px-5 sm:py-7"
            >
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--accent-primary)]/20 to-[var(--accent-secondary)]/20 text-sm text-[var(--accent-primary)] transition-transform duration-300 group-hover:scale-110 sm:h-12 sm:w-12 sm:rounded-2xl sm:text-base">
                {stat.icon}
              </div>
              <div className="text-2xl font-extrabold text-[var(--text-primary)] sm:text-3xl">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-0.5 text-xs font-medium text-[var(--text-muted)] sm:text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* ════ Main Grid ════ */}
        <div className="mt-14 grid gap-8 lg:mt-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 xl:gap-12">
          {/* ──────── LEFT CARD - Profile ──────── */}
          <div className="group relative animate-[fade-up_0.9s_ease-out_0.1s_both]">
            {/* Glow border */}
            <div className="absolute -inset-0.5 rounded-[2.25rem] bg-gradient-to-br from-[var(--accent-primary)]/30 via-[var(--accent-secondary)]/20 to-[var(--accent-tertiary)]/30 opacity-0 blur-sm transition-all duration-500 group-hover:opacity-100 sm:rounded-[2.75rem]" />

            <div className="relative rounded-[2rem] border border-[var(--border-soft)] bg-[color:var(--card-bg)] p-6 shadow-[var(--shadow-soft)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-glow)] sm:rounded-[2.5rem] sm:p-10">
              {/* Avatar & Name */}
              <div className="mb-8 flex flex-col items-center gap-5 sm:flex-row sm:items-start">
                <div className="relative shrink-0">
                  {/* Avatar ring glow */}
                  <div className="absolute -inset-1.5 rounded-full bg-gradient-to-br from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-tertiary)] opacity-30 blur-md animate-[ring-pulse_3s_ease-in-out_infinite]" />
                  <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] text-4xl text-white shadow-[0_20px_40px_rgba(255,107,154,0.28)] sm:h-28 sm:w-28 sm:text-5xl">
                    <FaHeart className="animate-[orbit-icon_4s_ease-in-out_infinite]" />
                    {/* Small decorative dot */}
                    <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-2 border-white bg-emerald-400 dark:border-[var(--bg-base)]" />
                  </div>
                </div>

                <div className="text-center sm:text-left">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--text-muted)]">
                    {t("about.profileLabel")}
                  </p>
                  <h3 className="mt-1.5 text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
                    Muslima Radjabova
                  </h3>
                  <p className="mt-1 text-sm font-medium text-[var(--accent-primary)]">
                    {t("about.role")}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="relative">
                <div className="absolute -left-3 top-0 text-4xl text-[var(--accent-primary)]/15 select-none leading-none">
                  "
                </div>
                <p className="relative z-[1] pl-4 text-base leading-8 text-[var(--text-secondary)] italic">
                  {t("about.description")}
                </p>
              </div>

              {/* Highlights as chips */}
              <div className="mt-7 grid grid-cols-2 gap-3">
                {(t("about.highlights", { returnObjects: true }) as string[]).map((item, idx) => (
                  <div
                    key={item}
                    className="group/chip relative overflow-hidden rounded-2xl border border-[var(--border-soft)] bg-white/70 px-4 py-3.5 backdrop-blur-xl transition-all duration-300 hover:border-[var(--accent-primary)]/30 hover:shadow-md dark:bg-white/[0.04] sm:rounded-[1.35rem]"
                    style={{
                      animationDelay: `${idx * 0.12}s`,
                    }}
                  >
                    {/* Shimmer on hover */}
                    <div className="absolute inset-0 -translate-x-full group-hover/chip:translate-x-full transition-transform duration-[800ms] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                    <div className="relative flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--accent-primary)]/15 to-[var(--accent-secondary)]/15 text-xs text-[var(--accent-primary)]">
                        <FaBullseye />
                      </div>
                      <span className="text-sm leading-5 font-medium text-[var(--text-secondary)]">
                        {item}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Availability badge */}
              <div className="mt-7 inline-flex w-full items-center justify-center gap-3 rounded-full border border-emerald-400/20 bg-gradient-to-r from-emerald-400/10 to-emerald-400/5 px-5 py-3 text-sm font-semibold text-emerald-600 backdrop-blur-xl dark:text-emerald-300 sm:w-auto sm:justify-start">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400" />
                </span>
                {t("about.availability")}
              </div>
            </div>
          </div>

          {/* ──────── RIGHT CARD - Education / Skills ──────── */}
          <div className="group relative animate-[fade-up_0.9s_ease-out_0.2s_both]">
            <div className="absolute -inset-0.5 rounded-[2.25rem] bg-gradient-to-br from-[var(--accent-secondary)]/20 via-[var(--accent-tertiary)]/15 to-[var(--accent-primary)]/20 opacity-0 blur-sm transition-all duration-500 group-hover:opacity-100 sm:rounded-[2.75rem]" />

            <div className="relative rounded-[2rem] border border-[var(--border-soft)] bg-[color:var(--card-bg)] p-6 shadow-[var(--shadow-soft)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-glow)] sm:rounded-[2.5rem] sm:p-8">
              {/* Tab Switcher */}
              <div className="mb-8 flex gap-2 rounded-2xl border border-[var(--border-soft)] bg-white/40 p-1.5 backdrop-blur-2xl dark:bg-white/[0.04]">
                <button
                  onClick={() => setActiveTab("education")}
                  className={`relative flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300 ${
                    activeTab === "education"
                      ? "bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white shadow-lg shadow-[var(--accent-primary)]/20"
                      : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  <FaGraduationCap />
                  {t("about.tabs.education")}
                </button>
                <button
                  onClick={() => setActiveTab("skills")}
                  className={`relative flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300 ${
                    activeTab === "skills"
                      ? "bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white shadow-lg shadow-[var(--accent-primary)]/20"
                      : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  <FaCode />
                  {t("about.tabs.skills")}
                </button>
              </div>

              {/* ── Education Tab Content ── */}
              {activeTab === "education" && (
                <div className="space-y-4 animate-[fade-up_0.5s_ease-out]">
                  {education.map((edu) => (
                    <div
                      key={edu.degree}
                      className="group/card relative overflow-hidden rounded-2xl border border-[var(--border-soft)] bg-white/60 p-6 shadow-[0_10px_24px_rgba(255,107,154,0.08)] backdrop-blur-xl transition-all duration-300 hover:border-[var(--accent-primary)]/25 hover:shadow-lg dark:bg-white/[0.04] sm:rounded-[1.8rem] sm:p-7"
                    >
                      {/* Accent bar */}
                      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-r-full" />

                      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] text-2xl text-white shadow-[0_12px_28px_rgba(255,107,154,0.24)] transition-transform duration-300 group-hover/card:scale-110 group-hover/card:rotate-3 sm:h-18 sm:w-18 sm:rounded-2xl">
                          {edu.icon}
                        </div>
                        <div className="flex-1">
                          <span className="inline-block rounded-full border border-[var(--accent-primary)]/20 bg-[var(--accent-primary)]/10 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--accent-primary)]">
                            {edu.year}
                          </span>
                          <h4 className="mt-3 text-xl font-bold text-[var(--text-primary)] sm:text-2xl">
                            {edu.degree}
                          </h4>
                          <p className="mt-1 text-sm font-semibold text-[var(--accent-secondary)]">
                            {edu.institution}
                          </p>
                          <p className="mt-3 leading-7 text-[var(--text-secondary)]">
                            {edu.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Extra decoration for education tab */}
                  <div className="flex items-center gap-3 rounded-2xl border border-dashed border-[var(--border-strong)] bg-white/30 px-5 py-4 backdrop-blur-sm dark:bg-white/[0.02]">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400/20 to-amber-500/10 text-amber-500">
                      <FaRocket />
                    </div>
                    <p className="text-sm font-medium text-[var(--text-secondary)]">
                      Continuously learning and building with modern technologies
                    </p>
                  </div>
                </div>
              )}

              {/* ── Skills Tab Content ── */}
              {activeTab === "skills" && (
                <div className="space-y-6 animate-[fade-up_0.5s_ease-out]">
                  {skillCategories.map((cat) => (
                    <div key={cat.name}>
                      <div className="mb-3 flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-[var(--accent-primary)]" />
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                          {cat.name}
                        </span>
                      </div>
                      <div className="space-y-3 pl-4 border-l-2 border-[var(--border-soft)]">
                        {cat.skills.map((skill) => (
                          <SkillBar key={skill.label} label={skill.label} level={skill.level} />
                        ))}
                      </div>
                    </div>
                  ))}

                  <div className="mt-4 flex items-center justify-between rounded-2xl bg-gradient-to-r from-[var(--accent-primary)]/5 to-[var(--accent-secondary)]/5 p-4">
                    <span className="text-sm font-semibold text-[var(--text-primary)]">
                      Tools & Platforms
                    </span>
                    <div className="flex items-center gap-2 text-xs text-[var(--accent-primary)]">
                      <span>VSCode · Git · Figma · Firebase · Chrome DevTools</span>
                      <FiExternalLink className="opacity-60" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ════ Bottom CTA Banner ════ */}
        <div className="group relative mt-14 animate-[fade-up_0.9s_ease-out_0.3s_both] lg:mt-20">
          <div className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-r from-[var(--accent-primary)]/20 via-[var(--accent-secondary)]/20 to-[var(--accent-tertiary)]/20 opacity-0 blur-lg transition-all duration-500 group-hover:opacity-100" />
          <div className="relative overflow-hidden rounded-[2rem] border border-[var(--border-soft)] bg-gradient-to-br from-white/60 to-white/30 px-6 py-8 text-center backdrop-blur-2xl transition-all duration-500 hover:shadow-[var(--shadow-glow)] dark:from-white/[0.06] dark:to-white/[0.02] sm:rounded-[2.5rem] sm:px-12 sm:py-12">
            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,107,154,0.04),transparent_50%),radial-gradient(circle_at_70%_50%,rgba(168,85,247,0.04),transparent_50%)]" />

            <div className="relative">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--text-muted)]">
                {t("about.profileLabel")}
              </p>
              <h3 className="mt-3 text-2xl font-extrabold text-[var(--text-primary)] sm:text-3xl">
                Let's create something{" "}
                <span className="bg-gradient-to-r from-[var(--accent-gradient-from)] via-[var(--accent-gradient-via)] to-[var(--accent-gradient-to)] bg-clip-text text-transparent">
                  extraordinary
                </span>{" "}
                together
              </h3>
              <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-[var(--text-secondary)]">
                Currently exploring modern front-end patterns, design systems, and building
                production-ready user interfaces.
              </p>
              <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[var(--accent-primary)]/20 transition-all duration-300 hover:shadow-xl hover:shadow-[var(--accent-primary)]/30 hover:scale-105">
                <FaRocket />
                Open to opportunities
                <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </div>

        {/* ════ Decorative divider ════ */}
        <div className="mt-16 flex items-center justify-center gap-4 text-[var(--text-muted)]/30">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[var(--border-strong)]" />
          <HiSparkles className="text-lg" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[var(--border-strong)]" />
        </div>
      </div>
    </section>
  );
};

export default About;
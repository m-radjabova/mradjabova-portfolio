import { useEffect, useRef, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { HiSparkles } from "react-icons/hi2";
import { otherSkills, skills, type SkillItem } from "../../data/skills";
import CursorSparkles from "../CursorSparkles";

/* ---------- Aylana progress (circular ring) ---------- */
function SkillRing({ level }: { level: number }) {
  const [progress, setProgress] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const radius = 30;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setProgress(level), 250);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [level]);

  const offset = circumference - (progress / 100) * circumference;

  return (
    <div ref={ref} className="relative h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem] shrink-0">
      <svg viewBox="0 0 72 72" className="h-full w-full -rotate-90">
        <defs>
          <linearGradient id={`ring-grad-${level}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#dba4af" />
            <stop offset="55%" stopColor="#b9b2de" />
            <stop offset="100%" stopColor="#f3ddd1" />
          </linearGradient>
        </defs>
        <circle
          cx="36"
          cy="36"
          r={radius}
          fill="none"
          stroke="rgba(228,218,233,0.45)"
          strokeWidth="5"
        />
        <circle
          cx="36"
          cy="36"
          r={radius}
          fill="none"
          stroke={`url(#ring-grad-${level})`}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-[stroke-dashoffset] duration-[1400ms] ease-out"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[0.7rem] sm:text-[0.8rem] font-bold text-[var(--lavender-strong)]">
        {progress}%
      </span>
    </div>
  );
}

/* ---------- Kursorni kuzatib boradigan "spotlight" karta ---------- */
function useSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }, []);
  return { ref, onMouseMove };
}

/* ---------- Alohida ko'nikma kartasi (spotlight bilan) ---------- */
function SkillCard({
  skill,
  index,
  visible,
}: {
  skill: SkillItem;
  index: number;
  visible: boolean;
}) {
  const { ref, onMouseMove } = useSpotlight();

  return (
    <article
      ref={ref}
      onMouseMove={onMouseMove}
      className={`group relative overflow-hidden rounded-[1.3rem] sm:rounded-[1.7rem] border border-[rgba(236,226,235,0.9)] bg-[rgba(255,251,252,0.72)] p-4 sm:p-6 shadow-[0_18px_42px_rgba(183,167,205,0.08)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-[rgba(217,150,164,0.35)] hover:shadow-[0_28px_60px_rgba(183,167,205,0.2)] ${
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Kursorga ergashuvchi spotlight yorug'lik */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(220px circle at var(--mx,50%) var(--my,50%), rgba(217,150,164,0.14), transparent 70%)",
        }}
      />

      {/* Yuqori qism: icon + nom + aylana progress */}
      <div className="relative flex items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-3 sm:gap-4">
          <div
            className={`flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center rounded-[0.9rem] sm:rounded-[1.15rem] bg-gradient-to-br ${skill.tone} text-[1.2rem] sm:text-[1.6rem] text-white shadow-[0_12px_26px_rgba(193,143,160,0.16)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_16px_32px_rgba(193,143,160,0.28)]`}
          >
            {skill.icon}
          </div>
          <h4 className="text-base sm:text-lg font-semibold text-[var(--lavender-strong)]">
            {skill.name}
          </h4>
        </div>

        <SkillRing level={skill.level} />
      </div>

      {/* Pastki dekorativ chiziq */}
      <div className="relative mt-4 sm:mt-6 h-[2px] w-0 rounded-full bg-gradient-to-r from-[#dba4af]/50 via-[#b9b2de]/50 to-transparent transition-all duration-500 group-hover:w-full" />
    </article>
  );
}

function SkillsCarousel() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const cards = Array.from({ length: skills.length }, (_, i) => i);
          cards.forEach((i, idx) => {
            setTimeout(() => {
              setVisibleCards((prev) => new Set(prev).add(i));
            }, idx * 100);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative min-h-screen overflow-hidden px-3 py-10 sm:px-4 sm:py-12 lg:px-8 lg:py-16"
    >
      {/* Fon dekoratsiyalari */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-[10%] top-[5%] h-[25rem] w-[25rem] sm:h-[40rem] sm:w-[40rem] animate-glow-drift rounded-full bg-[radial-gradient(circle,rgba(222,210,240,0.25),rgba(248,243,248,0.04)_60%,transparent_78%)]" />
        <div
          className="absolute -right-[8%] top-[40%] h-[20rem] w-[20rem] sm:h-[35rem] sm:w-[35rem] animate-glow-drift rounded-full bg-[radial-gradient(circle,rgba(217,150,164,0.18),rgba(248,243,248,0.03)_55%,transparent_75%)]"
          style={{ animationDelay: "-3s" }}
        />
        <div
          className="hidden sm:block absolute left-[30%] top-[70%] h-[28rem] w-[28rem] animate-glow-drift rounded-full bg-[radial-gradient(circle,rgba(179,170,215,0.15),transparent_65%)]"
          style={{ animationDelay: "-1.5s" }}
        />

        <div className="absolute left-[8%] top-[6%] animate-twinkle-soft text-[10px] sm:text-[12px] text-[#d3a9b8]/60">✦</div>
        <div className="hidden sm:block absolute right-[12%] top-[10%] animate-twinkle-soft text-[10px] text-[#d7c4dd]/50" style={{ animationDelay: "-1s" }}>✦</div>
        <div className="absolute left-[45%] top-[3%] animate-twinkle-soft text-[11px] sm:text-[14px] text-[#d3a9b8]/50" style={{ animationDelay: "-2s" }}>✦</div>
        <div className="hidden sm:block absolute right-[25%] top-[35%] animate-twinkle-soft text-[11px] text-[#d7c4dd]/60" style={{ animationDelay: "-0.5s" }}>✦</div>
        <div className="absolute left-[15%] top-[55%] animate-twinkle-soft text-[8px] sm:text-[9px] text-[#d3a9b8]/50" style={{ animationDelay: "-3s" }}>✦</div>
        <div className="hidden sm:block absolute right-[8%] top-[75%] animate-twinkle-soft text-[13px] text-[#d7c4dd]/50" style={{ animationDelay: "-1.8s" }}>✦</div>

        <div className="absolute left-[20%] top-[20%] h-1 sm:h-1.5 w-1 sm:w-1.5 animate-pulse-soft rounded-full bg-[#dba4af]/30" />
        <div className="hidden sm:block absolute right-[30%] top-[15%] h-2 w-2 animate-pulse-soft rounded-full bg-[#b9b2de]/25" style={{ animationDelay: "-1.2s" }} />
        <div className="absolute left-[60%] top-[45%] h-1 sm:h-1.5 w-1 sm:w-1.5 animate-pulse-soft rounded-full bg-[#dba4af]/25" style={{ animationDelay: "-2.5s" }} />
        <div className="hidden sm:block absolute right-[15%] top-[55%] h-2 w-2 animate-pulse-soft rounded-full bg-[#b9b2de]/20" style={{ animationDelay: "-0.8s" }} />
      </div>

      <div className="relative mx-auto max-w-[1500px]">
        {/* Sarlavha */}
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_6rem]">
          <div>
            <div className="flex items-start gap-2 sm:gap-3">
              <h2 className="section-title-display bg-gradient-to-r from-[#746ba0] via-[#d996a4] to-[#b3aad7] bg-clip-text text-[clamp(2.8rem,9vw,6.8rem)] text-transparent">
                {t("skillsCarousel.mySkills")}
              </h2>
              <HiSparkles className="mt-3 sm:mt-5 h-5 w-5 sm:h-6 sm:w-6 animate-orbit-icon text-[#d3a9b8]" />
            </div>

            <p className="mt-4 sm:mt-6 max-w-2xl text-sm sm:text-base leading-7 sm:leading-9 text-[var(--text-secondary)]">
              {t("skillsCarousel.description")}
            </p>
          </div>
        </div>

        {/* Texnik ko'nikmalar */}
        <div className="mt-8 sm:mt-10">
          <div className="mb-6 sm:mb-8 flex items-center gap-3 sm:gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#dba4af]/40 to-transparent" />
            <h3 className="bg-gradient-to-r from-[#7d76a3] to-[#d996a4] bg-clip-text text-[1.3rem] sm:text-[1.75rem] font-semibold text-transparent whitespace-nowrap">
              {t("skillsCarousel.technicalSkills")}
            </h3>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#dba4af]/40 to-transparent" />
          </div>

          <div className="mt-4 grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
            {skills.map((skill, index) => (
              <SkillCard
                key={skill.name}
                skill={skill}
                index={index}
                visible={visibleCards.has(index)}
              />
            ))}
          </div>
        </div>

        {/* Boshqa ko'nikmalar */}
        <div className="mt-10 sm:mt-12">
          <div className="mb-6 sm:mb-8 flex items-center gap-3 sm:gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#b9b2de]/40 to-transparent" />
            <h3 className="bg-gradient-to-r from-[#d996a4] to-[#7d76a3] bg-clip-text text-[1.3rem] sm:text-[1.75rem] font-semibold text-transparent whitespace-nowrap">
              {t("skillsCarousel.otherSkills")}
            </h3>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#b9b2de]/40 to-transparent" />
          </div>

          <div className="mt-4 sm:mt-6 flex flex-wrap justify-center gap-2 sm:gap-3">
            {otherSkills.map((skill, index) => (
              <div
                key={skill.name}
                className="group relative inline-flex items-center gap-1.5 sm:gap-2.5 overflow-hidden rounded-full border border-[rgba(235,225,235,0.88)] bg-[rgba(245,237,245,0.82)] px-3 sm:px-5 py-2 sm:py-3 text-xs sm:text-sm font-semibold text-[#8f86ae] shadow-[0_4px_16px_rgba(183,167,205,0.06)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:border-[rgba(217,150,164,0.35)] hover:bg-[rgba(255,251,252,0.95)] hover:text-[var(--lavender-strong)] hover:shadow-[0_10px_26px_rgba(183,167,205,0.18)]"
                style={{
                  animation: `fade-up 0.5s ease-out ${index * 0.08}s forwards`,
                  opacity: 0,
                }}
              >
                <div className="absolute inset-0 -translate-x-full rounded-full bg-gradient-to-r from-transparent via-[rgba(217,150,164,0.14)] to-transparent transition-transform duration-500 group-hover:translate-x-full" />
                <span className="relative text-sm sm:text-base transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12 group-hover:text-[#d996a4]">
                  {skill.icon}
                </span>
                <span className="relative">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pastki dekorativ ajratkich */}
        <div className="mt-10 sm:mt-12 flex items-center justify-center gap-2 sm:gap-3">
          <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent to-[#dba4af]/30" />
          <span className="animate-pulse-soft text-[9px] sm:text-[10px] text-[#d3a9b8]/50">✦ ✦ ✦</span>
          <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-[#dba4af]/30 to-transparent" />
        </div>
      </div>
       <CursorSparkles />
    </section>
  );
}

export default SkillsCarousel;
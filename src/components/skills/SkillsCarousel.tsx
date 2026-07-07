import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { otherSkills, skills } from "../../data/skills";

function SkillBar({ level }: { level: number }) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setWidth(level), 300);          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [level]);

  return (
    <div ref={ref} className="relative h-1.5 sm:h-2 overflow-hidden rounded-full bg-[rgba(228,218,233,0.5)]">
      <div
        className="h-full rounded-full bg-gradient-to-r from-[#dba4af] via-[#b9b2de] to-[#f3ddd1] transition-all duration-[1200ms] ease-out"
        style={{ width: `${width}%` }}
      >
        <div className="absolute inset-0 animate-shimmer bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)]" />
      </div>
    </div>
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
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Large gradient orbs - smaller on mobile */}
        <div className="absolute -left-[10%] top-[5%] h-[25rem] w-[25rem] sm:h-[40rem] sm:w-[40rem] animate-glow-drift rounded-full bg-[radial-gradient(circle,rgba(222,210,240,0.25),rgba(248,243,248,0.04)_60%,transparent_78%)]" />
        <div className="absolute -right-[8%] top-[40%] h-[20rem] w-[20rem] sm:h-[35rem] sm:w-[35rem] animate-glow-drift rounded-full bg-[radial-gradient(circle,rgba(217,150,164,0.18),rgba(248,243,248,0.03)_55%,transparent_75%)]" style={{ animationDelay: "-3s" }} />
        <div className="hidden sm:block absolute left-[30%] top-[70%] h-[28rem] w-[28rem] animate-glow-drift rounded-full bg-[radial-gradient(circle,rgba(179,170,215,0.15),transparent_65%)]" style={{ animationDelay: "-1.5s" }} />

        {/* Floating stars - fewer on mobile */}
        <div className="absolute left-[8%] top-[6%] animate-twinkle-soft text-[10px] sm:text-[12px] text-[#d3a9b8]/60">✦</div>
        <div className="hidden sm:block absolute right-[12%] top-[10%] animate-twinkle-soft text-[10px] text-[#d7c4dd]/50" style={{ animationDelay: "-1s" }}>✦</div>
        <div className="absolute left-[45%] top-[3%] animate-twinkle-soft text-[11px] sm:text-[14px] text-[#d3a9b8]/50" style={{ animationDelay: "-2s" }}>✦</div>
        <div className="hidden sm:block absolute right-[25%] top-[35%] animate-twinkle-soft text-[11px] text-[#d7c4dd]/60" style={{ animationDelay: "-0.5s" }}>✦</div>
        <div className="absolute left-[15%] top-[55%] animate-twinkle-soft text-[8px] sm:text-[9px] text-[#d3a9b8]/50" style={{ animationDelay: "-3s" }}>✦</div>
        <div className="hidden sm:block absolute right-[8%] top-[75%] animate-twinkle-soft text-[13px] text-[#d7c4dd]/50" style={{ animationDelay: "-1.8s" }}>✦</div>

        {/* Small decorative dots */}
        <div className="absolute left-[20%] top-[20%] h-1 sm:h-1.5 w-1 sm:w-1.5 animate-pulse-soft rounded-full bg-[#dba4af]/30" />
        <div className="hidden sm:block absolute right-[30%] top-[15%] h-2 w-2 animate-pulse-soft rounded-full bg-[#b9b2de]/25" style={{ animationDelay: "-1.2s" }} />
        <div className="absolute left-[60%] top-[45%] h-1 sm:h-1.5 w-1 sm:w-1.5 animate-pulse-soft rounded-full bg-[#dba4af]/25" style={{ animationDelay: "-2.5s" }} />
        <div className="hidden sm:block absolute right-[15%] top-[55%] h-2 w-2 animate-pulse-soft rounded-full bg-[#b9b2de]/20" style={{ animationDelay: "-0.8s" }} />
      </div>

      <div className="relative mx-auto max-w-[1500px]">
        {/* Header */}
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_6rem]">
          <div>
            <div className="flex items-start gap-2 sm:gap-3">
              <h2 className="section-title-display bg-gradient-to-r from-[#746ba0] via-[#d996a4] to-[#b3aad7] bg-clip-text text-[clamp(2.8rem,9vw,6.8rem)] text-transparent">
                My Skills
              </h2>
              <span className="mt-2 sm:mt-3 animate-orbit-icon text-lg sm:text-xl text-[#d3a9b8]">✦</span>
            </div>

            <p className="mt-4 sm:mt-6 max-w-2xl text-sm sm:text-base leading-7 sm:leading-9 text-[var(--text-secondary)]">
              {t("skillsCarousel.description")}
            </p>
          </div>
        </div>

        {/* Technical Skills */}
        <div className="mt-8 sm:mt-10">
          <div className="mb-6 sm:mb-8 flex items-center gap-3 sm:gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#dba4af]/40 to-transparent" />
            <h3 className="bg-gradient-to-r from-[#7d76a3] to-[#d996a4] bg-clip-text text-[1.3rem] sm:text-[1.75rem] font-semibold text-transparent whitespace-nowrap">
              Technical Skills
            </h3>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#dba4af]/40 to-transparent" />
          </div>

          <div className="mt-4 grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
            {skills.map((skill, index) => (
              <article
                key={skill.name}
                className={`group relative rounded-[1.3rem] sm:rounded-[1.7rem] border border-[rgba(236,226,235,0.9)] bg-[rgba(255,251,252,0.72)] p-4 sm:p-6 shadow-[0_18px_42px_rgba(183,167,205,0.08)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_28px_60px_rgba(183,167,205,0.18)] ${
                  visibleCards.has(index)
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                {/* Card shimmer overlay on hover */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[1.3rem] sm:rounded-[1.7rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_30%,rgba(255,255,255,0.25)_50%,transparent_70%)] bg-[length:200%_200%] animate-gradient-x" />
                </div>

                {/* Top section with icon and name */}
                <div className="relative flex items-start justify-between gap-3 sm:gap-4">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div
                      className={`flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center rounded-[0.9rem] sm:rounded-[1.15rem] bg-gradient-to-br ${skill.tone} text-[1.2rem] sm:text-[1.6rem] text-white shadow-[0_12px_26px_rgba(193,143,160,0.16)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_16px_32px_rgba(193,143,160,0.28)]`}
                    >
                      {skill.icon}
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-semibold text-[var(--lavender-strong)]">
                        {skill.name}
                      </h4>
                      <p className="mt-0.5 text-xs sm:text-sm font-semibold text-[var(--text-secondary)]">
                        {skill.level}%
                      </p>
                    </div>
                  </div>

                  <span className="pt-1 text-xs sm:text-sm font-semibold text-[#b5aac9]">
                    {skill.level}%
                  </span>
                </div>

                {/* Animated progress bar */}
                <div className="relative mt-3 sm:mt-5">
                  <SkillBar level={skill.level} />
                </div>

                {/* Bottom decorative gradient line */}
                <div className="mt-3 sm:mt-5 h-[2px] w-0 rounded-full bg-gradient-to-r from-[#dba4af]/40 via-[#b9b2de]/40 to-transparent transition-all duration-500 group-hover:w-full" />
              </article>
            ))}
          </div>
        </div>

        {/* Other Skills */}
        <div className="mt-10 sm:mt-12">
          <div className="mb-6 sm:mb-8 flex items-center gap-3 sm:gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#b9b2de]/40 to-transparent" />
            <h3 className="bg-gradient-to-r from-[#d996a4] to-[#7d76a3] bg-clip-text text-[1.3rem] sm:text-[1.75rem] font-semibold text-transparent whitespace-nowrap">
              Other Skills
            </h3>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#b9b2de]/40 to-transparent" />
          </div>

          <div className="mt-4 sm:mt-6 flex flex-wrap justify-center gap-2 sm:gap-3">
            {otherSkills.map((skill, index) => (
              <div
                key={skill.name}
                className="group relative inline-flex items-center gap-1.5 sm:gap-2.5 overflow-hidden rounded-full border border-[rgba(235,225,235,0.88)] bg-[rgba(245,237,245,0.82)] px-3 sm:px-5 py-2 sm:py-3 text-xs sm:text-sm font-semibold text-[#8f86ae] shadow-[0_4px_16px_rgba(183,167,205,0.06)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(217,150,164,0.3)] hover:bg-[rgba(255,251,252,0.95)] hover:text-[var(--lavender-strong)] hover:shadow-[0_8px_24px_rgba(183,167,205,0.14)]"
                style={{
                  animation: `fade-up 0.5s ease-out ${index * 0.08}s forwards`,
                  opacity: 0,
                }}
              >
                {/* Hover glow */}
                <div className="absolute inset-0 -translate-x-full rounded-full bg-gradient-to-r from-transparent via-[rgba(217,150,164,0.12)] to-transparent transition-transform duration-500 group-hover:translate-x-full" />
                <span className="relative text-sm sm:text-base transition-transform duration-300 group-hover:scale-110 group-hover:text-[#d996a4]">
                  {skill.icon}
                </span>
                <span className="relative">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom decorative divider */}
        <div className="mt-10 sm:mt-12 flex items-center justify-center gap-2 sm:gap-3">
          <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent to-[#dba4af]/30" />
          <span className="animate-pulse-soft text-[9px] sm:text-[10px] text-[#d3a9b8]/50">✦ ✦ ✦</span>
          <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-[#dba4af]/30 to-transparent" />
        </div>
      </div>
    </section>
  );
}

export default SkillsCarousel;
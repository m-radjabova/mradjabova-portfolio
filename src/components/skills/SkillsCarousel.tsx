import Slider from "react-slick";
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { skills } from "../../data/skills";

const sliderSettings = {
  arrows: false,
  dots: false,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 0,
  speed: 8000,
  cssEase: "linear",
  pauseOnHover: false,
  pauseOnFocus: false,
  draggable: true,
  responsive: [
    {
      breakpoint: 1280,
      settings: { slidesToShow: 2.4 },
    },
    {
      breakpoint: 1024,
      settings: { slidesToShow: 1.35 },
    },
    {
      breakpoint: 768,
      settings: { slidesToShow: 1.02, centerMode: false },
    },
    {
      breakpoint: 480,
      settings: { slidesToShow: 1, centerMode: false },
    },
  ],
} as const;

function useIsMobile(maxWidth = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${maxWidth}px)`);
    const update = () => setIsMobile(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);

    return () => mediaQuery.removeEventListener("change", update);
  }, [maxWidth]);

  return isMobile;
}

function AnimatedLevel({ value }: { value: number }) {
  const [displayed, setDisplayed] = useState(0);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const duration = 1200;
          const stepTime = 16;
          const totalSteps = duration / stepTime;
          const increment = value / totalSteps;

          const timer = setInterval(() => {
            start += increment;
            if (start >= value) {
              setDisplayed(value);
              clearInterval(timer);
            } else {
              setDisplayed(Math.round(start));
            }
          }, stepTime);

          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [value]);

  return (
    <p ref={ref} className="mt-1 text-3xl font-black tracking-[-0.04em] text-[var(--text-primary)] sm:mt-2 sm:text-4xl tabular-nums">
      {displayed}%
    </p>
  );
}

function SkillsCarousel() {
  const { t } = useTranslation();
  const blobsRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile(768);

  return (
    <section
      id="skills"
      className="relative overflow-hidden px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 lg:px-8"
    >
      {/* ─── Luxurious background layers ─── */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(233,79,138,0.06)_0%,transparent_50%),radial-gradient(circle_at_80%_30%,rgba(168,85,247,0.06)_0%,transparent_45%),radial-gradient(circle_at_50%_80%,rgba(74,168,255,0.04)_0%,transparent_40%)] dark:bg-[radial-gradient(circle_at_20%_20%,rgba(255,122,172,0.10)_0%,transparent_50%),radial-gradient(circle_at_80%_30%,rgba(168,139,255,0.10)_0%,transparent_45%),radial-gradient(circle_at_50%_80%,rgba(104,214,255,0.07)_0%,transparent_40%)]" />

      {/* Animated floating orbs */}
      <div ref={blobsRef} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -left-20 top-16 h-72 w-72 animate-[blobFloat_14s_ease-in-out_infinite] rounded-full bg-[var(--accent-primary)]/15 blur-[100px] dark:bg-[var(--accent-primary)]/20" />
        <div className="absolute -right-20 top-1/3 h-80 w-80 animate-[blobFloat_18s_ease-in-out_infinite_reverse] rounded-full bg-[var(--accent-secondary)]/12 blur-[100px] dark:bg-[var(--accent-secondary)]/18" />
        <div className="absolute left-1/3 top-3/4 h-60 w-60 animate-[blobFloat_16s_ease-in-out_infinite_2s] rounded-full bg-[var(--accent-tertiary)]/8 blur-[100px] dark:bg-[var(--accent-tertiary)]/12" />
        <div className="absolute left-2/3 top-10 h-44 w-44 animate-[blobFloat_20s_ease-in-out_infinite_4s] rounded-full bg-amber-400/8 blur-[100px] dark:bg-amber-400/12" />
      </div>

      {/* Subtle grid overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" 
        style={{ backgroundImage: `radial-gradient(circle at 1px 1px, var(--text-primary) 1px, transparent 0)`, backgroundSize: '40px 40px' }} 
        aria-hidden 
      />

      {/* Decorative top line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-primary)]/40 to-transparent" />

      <div className="relative mx-auto max-w-7xl">
        {/* ─── HEADER ─── */}
        <div className="mx-auto max-w-3xl text-center">

          {/* Animated gradient title */}
          <h2 className="relative mt-4 text-4xl font-black tracking-[-0.03em] sm:text-6xl">
            <span className="bg-[linear-gradient(135deg,var(--accent-gradient-from),var(--accent-gradient-via),var(--accent-gradient-to))] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              {t("skillsCarousel.title")}
            </span>
          </h2>

          <p className="mt-5 text-base leading-7 text-[var(--text-secondary)] sm:text-lg sm:leading-8">
            {t("skillsCarousel.description")}
          </p>
        </div>

        {/* ─── CAROUSEL ─── */}
        <div className="skills-carousel relative mt-14 sm:mt-16">
          {isMobile ? (
            <div className="grid gap-4 sm:hidden">
              {skills.map((skill) => (
                <div key={skill.name} className="px-1">
                  <article className="group relative overflow-hidden rounded-[1.6rem] border border-white/30 bg-[linear-gradient(160deg,rgba(255,255,255,0.85),rgba(255,255,255,0.55))] p-4 shadow-[0_24px_60px_rgba(190,24,93,0.10)] backdrop-blur-2xl transition duration-500 dark:border-white/8 dark:bg-[linear-gradient(160deg,rgba(17,24,39,0.72),rgba(17,24,39,0.38))] dark:shadow-[0_24px_60px_rgba(4,10,21,0.50)]">
                    <div className="pointer-events-none absolute -inset-x-20 -top-20 h-40 rounded-full bg-white/40 blur-3xl dark:bg-white/6" />
                    <div className={`pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gradient-to-br ${skill.tone} opacity-15 blur-3xl`} />

                    <div className="relative z-10 flex items-start gap-4">
                      <div className="relative shrink-0">
                        <div className={`h-14 w-14 rounded-[1.2rem] bg-gradient-to-br ${skill.tone} p-[1px] shadow-[0_16px_34px_rgba(255,107,154,0.18)]`}>
                          <div className="flex h-full w-full items-center justify-center rounded-[1.15rem] bg-white/12 text-2xl text-white backdrop-blur-sm">
                            {skill.icon}
                          </div>
                        </div>
                        <span className={`absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-gradient-to-br ${skill.tone} ring-2 ring-white/50 dark:ring-white/20 animate-pulse`} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                          {t("skillsCarousel.level")}
                        </p>
                        <h3 className="mt-1 text-[1.35rem] font-black tracking-[-0.03em] text-[var(--text-primary)]">
                          {skill.name}
                        </h3>

                        <div className="mt-4 rounded-[1.2rem] border border-white/30 bg-white/50 p-4 backdrop-blur-xl dark:border-white/8 dark:bg-white/5">
                          <div className="mb-2 flex items-center justify-between gap-3">
                            <span className="flex items-center gap-2 text-xs font-semibold text-[var(--text-primary)]">
                              <span className={`inline-block h-3 w-1 rounded-full bg-gradient-to-b ${skill.tone}`} />
                              {t("skillsCarousel.readiness")}
                            </span>
                            <span className="tabular-nums text-[10px] text-[var(--text-muted)]">
                              <span className={`font-semibold bg-gradient-to-r ${skill.tone} bg-clip-text text-transparent`}>
                                {skill.level}
                              </span>
                              <span className="text-[var(--text-muted)]">/100</span>
                            </span>
                          </div>

                          <div className="relative h-3 rounded-full bg-black/6 dark:bg-white/8">
                            <div
                              className={`relative h-full rounded-full bg-gradient-to-r ${skill.tone} transition-all duration-[1500ms] ease-out`}
                              style={{ width: `${skill.level}%` }}
                            >
                              <span className="absolute inset-0 rounded-full bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.5)_50%,transparent_100%)] animate-shimmer" />
                              <span className={`absolute -right-1 -top-0.5 h-4 w-4 rounded-full bg-gradient-to-br ${skill.tone} shadow-[0_0_12px_rgba(255,255,255,0.6)]`} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          ) : (
            <Slider {...sliderSettings}>
              {skills.map((skill) => (
                <div key={skill.name} className="px-2 sm:px-3">
                  <article className="group relative min-h-[18.5rem] overflow-hidden rounded-[1.6rem] border border-white/30 bg-[linear-gradient(160deg,rgba(255,255,255,0.85),rgba(255,255,255,0.55))] p-4 shadow-[0_24px_60px_rgba(190,24,93,0.10)] backdrop-blur-2xl transition duration-500 hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(190,24,93,0.16)] sm:min-h-[22rem] sm:rounded-[2.8rem] sm:p-8 dark:border-white/8 dark:bg-[linear-gradient(160deg,rgba(17,24,39,0.72),rgba(17,24,39,0.38))] dark:shadow-[0_24px_60px_rgba(4,10,21,0.50)] dark:hover:shadow-[0_30px_80px_rgba(4,10,21,0.65)]">
                    {/* Card top glow */}
                    <div className="pointer-events-none absolute -inset-x-20 -top-20 h-40 rounded-full bg-white/50 blur-3xl dark:bg-white/6" />

                    {/* Gradient orb behind icon */}
                    <div className={`pointer-events-none absolute -right-8 -top-8 h-36 w-36 rounded-full bg-gradient-to-br ${skill.tone} opacity-15 blur-3xl transition duration-700 group-hover:opacity-25 group-hover:scale-110`} />

                    {/* Animated border glow on hover */}
                    <div className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-0 transition duration-500 group-hover:opacity-100 sm:rounded-[2.8rem]">
                      <div className={`absolute inset-0 rounded-[2rem] bg-gradient-to-br ${skill.tone} opacity-8 blur-[2px] sm:rounded-[2.8rem]`} />
                    </div>

                    <div className="relative z-10">
                      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                        <div className="space-y-3 sm:space-y-5">
                          <div className="relative">
                            <div className={`h-14 w-14 rounded-[1.2rem] bg-gradient-to-br ${skill.tone} p-[1px] shadow-[0_16px_34px_rgba(255,107,154,0.18)] transition duration-500 group-hover:shadow-[0_16px_40px_rgba(255,107,154,0.30)] sm:h-20 sm:w-20 sm:rounded-[2rem]`}>
                              <div className="flex h-full w-full items-center justify-center rounded-[1.35rem] bg-white/12 text-2xl text-white backdrop-blur-sm sm:rounded-[1.95rem] sm:text-3xl">
                                {skill.icon}
                              </div>
                            </div>
                            <span className={`absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-gradient-to-br ${skill.tone} ring-2 ring-white/50 dark:ring-white/20 animate-pulse sm:h-3.5 sm:w-3.5`} />
                          </div>

                          <div>
                            <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)] sm:text-[11px] sm:tracking-[0.32em]">
                              {t("skillsCarousel.level")}
                            </p>
                            <h3 className="mt-1.5 text-[1.45rem] font-black tracking-[-0.03em] text-[var(--text-primary)] transition duration-300 group-hover:text-[var(--accent-primary)] sm:mt-3 sm:text-[2rem]">
                              {skill.name}
                            </h3>
                          </div>
                        </div>

                        <div className="relative w-fit rounded-[1.2rem] border border-white/30 bg-white/60 px-3 py-2 shadow-[0_12px_30px_rgba(255,255,255,0.14)] backdrop-blur-xl transition duration-500 group-hover:border-[var(--accent-primary)]/20 sm:rounded-[1.8rem] sm:px-5 sm:py-3.5 dark:border-white/8 dark:bg-white/6 dark:group-hover:border-[var(--accent-primary)]/30">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)] sm:text-[11px] sm:tracking-[0.28em]">
                            {t("skillsCarousel.mastery")}
                          </p>
                          <AnimatedLevel value={skill.level} />
                        </div>
                      </div>

                      <div className="mt-6 rounded-[1.4rem] border border-white/30 bg-white/50 p-4 backdrop-blur-xl transition duration-500 group-hover:bg-white/60 sm:mt-10 sm:rounded-[2rem] sm:p-6 dark:border-white/8 dark:bg-white/5 dark:group-hover:bg-white/8">
                        <div className="mb-3 flex items-center justify-between gap-3">
                          <span className="flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)]">
                            <span className={`inline-block h-3 w-1 rounded-full bg-gradient-to-b ${skill.tone}`} />
                            {t("skillsCarousel.readiness")}
                          </span>
                          <span className="tabular-nums text-xs text-[var(--text-muted)] sm:text-sm">
                            <span className={`font-semibold bg-gradient-to-r ${skill.tone} bg-clip-text text-transparent`}>{skill.level}</span>
                            <span className="text-[var(--text-muted)]">/100</span>
                          </span>
                        </div>

                        <div className="relative h-3 rounded-full bg-black/6 sm:h-3.5 dark:bg-white/8">
                          <div
                            className={`relative h-full rounded-full bg-gradient-to-r ${skill.tone} transition-all duration-[1500ms] ease-out`}
                            style={{ width: `${skill.level}%` }}
                          >
                            <span className="absolute inset-0 rounded-full bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.50)_50%,transparent_100%)] animate-shimmer" />
                            <span className={`absolute -right-1 -top-0.5 h-4 w-4 rounded-full bg-gradient-to-br ${skill.tone} shadow-[0_0_12px_rgba(255,255,255,0.6)] sm:h-5 sm:w-5`} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </Slider>
          )}
        </div>
      </div>
    </section>
  );
}

export default SkillsCarousel;

import Slider from "react-slick";
import { useTranslation } from "react-i18next";
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
  speed: 7000,
  cssEase: "linear",
  pauseOnHover: false,
  pauseOnFocus: false,
  draggable: true,
  responsive: [
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 2.4,
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 1.6,
      },
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 1.08,
      },
    },
  ],
} as const;

function SkillsCarousel() {
  const { t } = useTranslation();

  return (
    <section
      id="skills"
      className="relative overflow-hidden px-4 pb-12 pt-28 sm:px-6 sm:pb-14 sm:pt-32 lg:px-8"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_30%,rgba(255,107,154,0.08),transparent_24%),radial-gradient(circle_at_88%_35%,rgba(168,85,247,0.08),transparent_24%)] dark:bg-[radial-gradient(circle_at_12%_30%,rgba(255,107,154,0.12),transparent_24%),radial-gradient(circle_at_88%_35%,rgba(168,85,247,0.14),transparent_24%)]" />
      <div className="absolute -left-12 top-10 h-56 w-56 rounded-full bg-[var(--accent-primary)]/10 blur-3xl" />
      <div className="absolute right-0 top-1/4 h-72 w-72 rounded-full bg-[var(--accent-secondary)]/10 blur-3xl" />
      <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent dark:via-white/8" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent-primary)] sm:text-sm sm:tracking-[0.28em]">
            {t("skillsCarousel.eyebrow")}
          </p>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.03em] text-[var(--text-primary)] sm:text-5xl">
            {t("skillsCarousel.title")}
          </h2>
          <p className="mt-4 text-base leading-7 text-[var(--text-secondary)] sm:text-lg sm:leading-8">
            {t("skillsCarousel.description")}
          </p>
        </div>

        <div className="skills-carousel relative mt-10 sm:mt-14">
          <Slider {...sliderSettings}>
            {skills.map((skill) => (
              <div key={skill.name} className="px-2 sm:px-3">
                <article className="group relative min-h-[18rem] overflow-hidden rounded-[2rem] border border-white/35 bg-[linear-gradient(180deg,rgba(255,255,255,0.8),rgba(255,255,255,0.48))] p-5 shadow-[0_24px_60px_rgba(190,24,93,0.12)] backdrop-blur-2xl transition duration-500 hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(190,24,93,0.18)] sm:min-h-[20rem] sm:rounded-[2.5rem] sm:p-7 dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(17,24,39,0.68),rgba(17,24,39,0.4))] dark:shadow-[0_24px_60px_rgba(15,23,42,0.42)]">
                  <div className="absolute inset-x-10 top-0 h-24 rounded-full bg-white/40 blur-3xl dark:bg-white/6" />
                  <div className={`absolute -right-10 -top-10 h-36 w-36 rounded-full bg-gradient-to-br ${skill.tone} opacity-20 blur-3xl transition duration-500 group-hover:opacity-30`} />
                  <div className="relative">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                      <div className="space-y-4 sm:space-y-5">
                        <div
                          className={`relative flex h-16 w-16 items-center justify-center rounded-[1.4rem] bg-gradient-to-br ${skill.tone} text-2xl text-white shadow-[0_16px_34px_rgba(255,107,154,0.22)] sm:h-20 sm:w-20 sm:rounded-[2rem] sm:text-3xl`}
                        >
                          <span className="absolute inset-[1px] rounded-[1.35rem] bg-white/10 sm:rounded-[1.95rem]" />
                          <span className="relative">{skill.icon}</span>
                        </div>

                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--text-secondary)] sm:text-[11px] sm:tracking-[0.32em]">
                            {t("skillsCarousel.level")}
                          </p>
                          <h3 className="mt-2 text-[1.65rem] font-black tracking-[-0.03em] text-[var(--text-primary)] sm:mt-3 sm:text-[2rem]">
                            {skill.name}
                          </h3>
                        </div>
                      </div>

                      <div className="w-fit rounded-[1.2rem] border border-white/35 bg-white/60 px-3 py-2 text-left shadow-[0_12px_30px_rgba(255,255,255,0.16)] backdrop-blur-xl sm:rounded-[1.6rem] sm:px-4 sm:py-3 sm:text-right dark:border-white/10 dark:bg-white/5">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--text-secondary)] sm:text-[11px] sm:tracking-[0.28em]">
                          {t("skillsCarousel.mastery")}
                        </p>
                        <p className="mt-1 text-3xl font-black tracking-[-0.04em] text-[var(--text-primary)] sm:mt-2 sm:text-4xl">
                          {skill.level}%
                        </p>
                      </div>
                    </div>

                    <div className="mt-8 rounded-[1.5rem] border border-white/35 bg-white/55 p-4 backdrop-blur-xl sm:mt-10 sm:rounded-[1.8rem] sm:p-5 dark:border-white/10 dark:bg-white/5">
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <span className="text-sm font-semibold text-[var(--text-primary)]">
                          {t("skillsCarousel.readiness")}
                        </span>
                        <span className="text-xs text-[var(--text-secondary)] sm:text-sm">
                          {skill.level}/100
                        </span>
                      </div>

                      <div className="h-2.5 rounded-full bg-black/6 sm:h-3 dark:bg-white/8">
                        <div
                          className={`relative h-2.5 rounded-full bg-gradient-to-r sm:h-3 ${skill.tone}`}
                          style={{ width: `${skill.level}%` }}
                        >
                          <span className="absolute inset-0 rounded-full bg-[linear-gradient(90deg,rgba(255,255,255,0.45),transparent)]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}

export default SkillsCarousel;

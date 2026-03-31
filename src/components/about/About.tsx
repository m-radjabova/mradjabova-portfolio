import { useTranslation } from "react-i18next";
import {
  FaGraduationCap,
  FaHeart,
} from "react-icons/fa";

const About = () => {
  const { t } = useTranslation();

  const education = [
    {
      year: t("about.education.year"),
      degree: t("about.education.degree"),
      institution: t("about.education.institution"),
      description: t("about.education.description"),
      icon: <FaGraduationCap />,
    },
  ];

  return (
    <section id="about" className="relative px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,107,154,0.08),transparent_25%),radial-gradient(circle_at_80%_30%,rgba(168,85,247,0.06),transparent_25%)] dark:bg-[radial-gradient(circle_at_20%_20%,rgba(255,107,154,0.14),transparent_25%),radial-gradient(circle_at_80%_30%,rgba(168,85,247,0.12),transparent_25%)]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center animate-[fade-up_0.8s_ease-out_both]">
          <h2 className="mt-6 text-3xl font-black tracking-[-0.03em] text-[var(--text-primary)] sm:text-5xl">
            {t("about.title.lead")}
            <span className="bg-gradient-to-r from-[var(--accent-gradient-from)] via-[var(--accent-gradient-via)] to-[var(--accent-gradient-to)] bg-clip-text text-transparent">
              {" "}{t("about.title.accent")}
            </span>
          </h2>
          <p className="mt-4 text-base leading-7 text-[var(--text-secondary)] sm:text-lg sm:leading-8">
            {t("about.subtitle")}
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:mt-16 lg:gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[1.8rem] border border-[var(--border-soft)] bg-[color:var(--card-bg)] p-5 shadow-[var(--shadow-soft)] backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-glow)] sm:rounded-[2.25rem] sm:p-8">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] text-2xl text-white shadow-[0_16px_34px_rgba(255,107,154,0.28)]">
                <FaHeart />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-[var(--text-secondary)]">
                  {t("about.profileLabel")}
                </p>
                <h3 className="mt-1 text-2xl font-bold text-[var(--text-primary)]">
                  Muslima Radjabova
                </h3>
              </div>
            </div>

            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent-primary)]">
                {t("about.role")}
              </p>
              <p className="text-base leading-8 text-[var(--text-secondary)]">
                {t("about.description")}
              </p>
              <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                {(t("about.highlights", { returnObjects: true }) as string[]).map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.2rem] border border-[var(--border-soft)] bg-white/78 px-4 py-3 text-sm leading-6 text-[var(--text-secondary)] backdrop-blur-xl dark:bg-white/5 sm:rounded-[1.35rem]"
                  >
                    {item}
                  </div>
                ))}
              </div>
              <div className="inline-flex items-center gap-3 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-500 dark:text-emerald-300">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
                {t("about.availability")}
              </div>
            </div>
          </div>

          <div className="rounded-[1.8rem] border border-[var(--border-soft)] bg-[color:var(--card-bg)] p-5 shadow-[var(--shadow-soft)] backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-glow)] sm:rounded-[2.25rem] sm:p-6">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(255,107,154,0.24)]">
              <FaGraduationCap />
              {t("about.tabs.education")}
            </div>

            <div className="space-y-4">
              {education.map((edu) => (
                <div
                  key={edu.degree}
                  className="rounded-[1.5rem] border border-[var(--border-soft)] bg-white/78 p-5 shadow-[0_10px_24px_rgba(255,107,154,0.08)] backdrop-blur-xl dark:bg-white/5 sm:rounded-[1.8rem] sm:p-6"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] text-xl text-white">
                      {edu.icon}
                    </div>
                    <div>
                      <p className="text-sm uppercase tracking-[0.24em] text-[var(--accent-primary)]">
                        {edu.year}
                      </p>
                      <h4 className="mt-2 text-xl font-bold text-[var(--text-primary)]">
                        {edu.degree}
                      </h4>
                      <p className="mt-1 text-sm font-semibold text-[var(--text-secondary)]">
                        {edu.institution}
                      </p>
                      <p className="mt-3 leading-7 text-[var(--text-secondary)]">
                        {edu.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

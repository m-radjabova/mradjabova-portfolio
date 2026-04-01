import {
  FaArrowRight,
  FaArrowUp,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaMapMarkerAlt,
  FaTelegramPlane,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { SiGmail, SiReact } from "react-icons/si";

const Contact = () => {
  const { t } = useTranslation();

  const contactInfo = [
    {
      icon: <FaEnvelope />,
      title: t("contact.email"),
      value: "muslimarajabova1997@gmail.com",
      note: t("contact.emailNote"),
      link: "mailto:muslimarajabova1997@gmail.com",
      accent: "from-rose-500 to-pink-500",
    },
    {
      icon: <FaMapMarkerAlt />,
      title: t("contact.location"),
      value: t("contact.locationValue"),
      note: t("contact.locationNote"),
      link: "https://maps.google.com/?q=Bukhara,Uzbekistan",
      accent: "from-violet-500 to-fuchsia-500",
    },
  ];

  const socialLinks = [
    {
      icon: <FaGithub />,
      name: "GitHub",
      handle: "@m-radjabova",
      url: "https://github.com/m-radjabova",
    },
    {
      icon: <FaLinkedin />,
      name: "LinkedIn",
      handle: "Professional profile",
      url: "https://www.linkedin.com",
    },
    {
      icon: <FaTelegramPlane />,
      name: "Telegram",
      handle: "Quick chat",
      url: "https://t.me/",
    },
    {
      icon: <SiGmail />,
      name: "Gmail",
      handle: "Direct email",
      url: "mailto:muslimarajabova1997@gmail.com",
    },
  ];

  return (
    <section id="contact" className="relative overflow-hidden px-4 pb-12 pt-28 sm:px-6 sm:pb-16 sm:pt-32 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,107,154,0.16),transparent_24%),radial-gradient(circle_at_85%_15%,rgba(168,85,247,0.14),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.16))] dark:bg-[radial-gradient(circle_at_18%_18%,rgba(255,107,154,0.18),transparent_24%),radial-gradient(circle_at_85%_15%,rgba(168,85,247,0.2),transparent_24%),linear-gradient(180deg,rgba(15,23,42,0.16),rgba(2,6,23,0.52))]" />
      <div className="absolute -left-14 top-12 h-56 w-56 rounded-full bg-[var(--accent-primary)]/16 blur-3xl" />
      <div className="absolute right-0 top-10 h-64 w-64 rounded-full bg-[var(--accent-secondary)]/16 blur-3xl" />

      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-[var(--border-soft)] bg-[color:var(--card-bg)] shadow-[var(--shadow-soft)] backdrop-blur-2xl sm:rounded-[2.6rem]">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative p-6 sm:p-8 lg:p-10">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),transparent_60%)] dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.05),transparent_60%)]" />
            <div className="relative">
              <div className="inline-flex items-center gap-3 rounded-full border border-[var(--border-soft)] bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-primary)] shadow-[0_14px_32px_rgba(255,107,154,0.1)] dark:bg-white/5">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(74,222,128,0.7)]" />
                {t("contact.workTogether")}
              </div>

              <h2 className="mt-6 max-w-xl text-4xl font-black tracking-[-0.04em] text-[var(--text-primary)] sm:text-5xl">
                {t("contact.title")}
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--text-secondary)] sm:text-lg">
                {t("contact.description")}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="https://github.com/m-radjabova"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--border-soft)] bg-white/72 px-5 py-3 text-sm font-semibold text-[var(--text-primary)] shadow-[0_12px_28px_rgba(255,107,154,0.1)] transition duration-300 hover:-translate-y-0.5 hover:border-[var(--accent-primary)]/35 dark:bg-white/5"
                >
                  <FaGithub />
                  {t("contact.secondaryCta")}
                </a>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-1">
                {contactInfo.map((item) => (
                  <a
                    key={item.title}
                    href={item.link}
                    target={item.link.startsWith("http") ? "_blank" : undefined}
                    rel={item.link.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group rounded-[1.7rem] border border-[var(--border-soft)] bg-white/70 p-5 shadow-[0_16px_32px_rgba(255,107,154,0.08)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[var(--accent-primary)]/30 dark:bg-white/5"
                  >
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${item.accent} text-lg text-white shadow-[0_12px_28px_rgba(255,107,154,0.24)]`}>
                      {item.icon}
                    </div>
                    <p className="mt-4 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--text-secondary)]">
                      {item.title}
                    </p>
                    <p className="mt-2 text-lg font-bold text-[var(--text-primary)]">
                      {item.value}
                    </p>
                    {/* <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                      {item.note}
                    </p> */}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-[var(--border-soft)] bg-[linear-gradient(180deg,rgba(255,255,255,0.4),rgba(255,255,255,0.14))] p-6 dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.02))] sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
            <div className="grid gap-6">
              <div className="rounded-[1.8rem] border border-[var(--border-soft)] bg-[color:var(--card-solid)] p-5 shadow-[0_18px_40px_rgba(255,107,154,0.08)] backdrop-blur-xl sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-primary)]">
                  {t("contact.getInTouch")}
                </p>
                <h3 className="mt-2 text-2xl font-bold text-[var(--text-primary)]">
                  {t("contact.socialTitle")}
                </h3>

                <div className="mt-6 grid gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-4 rounded-[1.35rem] border border-[var(--border-soft)] bg-white/68 px-4 py-4 transition duration-300 hover:-translate-y-0.5 hover:border-[var(--accent-primary)]/35 dark:bg-white/5"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(255,107,154,0.2),rgba(168,85,247,0.24))] text-lg text-[var(--accent-primary)]">
                          {social.icon}
                        </div>
                        <div>
                          <p className="font-semibold text-[var(--text-primary)]">{social.name}</p>
                          <p className="text-sm text-[var(--text-secondary)]">{social.handle}</p>
                        </div>
                      </div>
                      <FaArrowRight className="text-sm text-[var(--text-secondary)] transition group-hover:text-[var(--accent-primary)]" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4 rounded-[1.8rem] border border-[var(--border-soft)] bg-[linear-gradient(135deg,rgba(255,107,154,0.12),rgba(168,85,247,0.1))] p-5 shadow-[0_18px_40px_rgba(255,107,154,0.08)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between sm:p-6">
                <div className="flex items-center gap-3 text-[var(--text-primary)]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/75 text-lg shadow-[0_12px_28px_rgba(255,107,154,0.12)] dark:bg-white/10">
                    <SiReact className="text-[var(--accent-primary)]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t("contact.builtWith")}</p>
                    <p className="text-sm text-[var(--text-secondary)]">React / TypeScript / Tailwind CSS</p>
                  </div>
                </div>

                <button
                  className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--border-soft)] bg-white/82 text-[var(--text-primary)] shadow-[0_10px_24px_rgba(255,107,154,0.08)] transition duration-300 hover:-translate-y-1 hover:text-[var(--accent-primary)] dark:bg-white/5"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  aria-label={t("contact.scrollTop")}
                >
                  <FaArrowUp />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

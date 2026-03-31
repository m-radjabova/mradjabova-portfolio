import { type CSSProperties } from "react";
import {
  FaArrowUp,
  FaCode,
  FaEnvelope,
  FaGithub,
  FaHeart,
  FaLinkedin,
  FaMapMarkerAlt,
  FaTelegram,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { SiGmail, SiReact } from "react-icons/si";

interface CustomCSSProperties extends CSSProperties {
  "--social-color"?: string;
}

const Contact = () => {
  const { t } = useTranslation();

  const contactInfo = [
    {
      icon: <FaEnvelope />,
      title: t("contact.email"),
      value: "muslimarajabova1997@gmail.com",
      link: "mailto:muslimarajabova1997@gmail.com",
    },
    {
      icon: <FaMapMarkerAlt />,
      title: t("contact.location"),
      value: t("contact.locationValue"),
      link: "#contact",
    },
  ];

  const socialLinks = [
    { icon: <FaLinkedin />, name: "LinkedIn", url: "https://www.linkedin.com", color: "#0077B5" },
    { icon: <FaGithub />, name: "GitHub", url: "https://github.com/m-radjabova", color: "#333" },
    { icon: <FaTelegram />, name: "Telegram", url: "https://t.me/", color: "#0088CC" },
    {
      icon: <SiGmail />,
      name: "Gmail",
      url: "mailto:muslimarajabova1997@gmail.com",
      color: "#D14836",
    },
  ];

  const quickLinks = [
    { name: t("nav.home"), href: "#home" },
    { name: t("nav.about"), href: "#about" },
    { name: t("nav.projects"), href: "#projects" },
    { name: t("nav.contact"), href: "#contact" },
  ];

  return (
    <footer id="contact" className="relative px-4 pb-8 pt-16 sm:px-6 sm:pb-10 sm:pt-24 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,107,154,0.08),transparent_25%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,183,197,0.16))] dark:bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.12),transparent_25%),linear-gradient(180deg,rgba(15,23,42,0),rgba(2,6,23,0.7))]" />
      <div className="relative mx-auto max-w-7xl rounded-[1.8rem] border border-[var(--border-soft)] bg-[color:var(--card-bg)] p-5 shadow-[var(--shadow-soft)] backdrop-blur-2xl sm:rounded-[2.25rem] sm:p-8 xl:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.7fr_0.9fr_1fr] lg:gap-10">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-tertiary)] p-[1px]">
                <div className="flex h-full w-full items-center justify-center rounded-2xl bg-[var(--card-solid)] text-sm font-bold text-[var(--text-primary)] backdrop-blur">
                  MR
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[var(--text-primary)]">M.Radjabova</h3>
                <p className="text-sm text-[var(--text-secondary)]">{t("contact.role")}</p>
              </div>
            </div>
            <p className="max-w-sm leading-7 text-[var(--text-secondary)]">
              {t("contact.description")}
            </p>
            <div className="inline-flex items-center gap-3 rounded-full border border-[var(--border-soft)] bg-white/82 px-4 py-2 text-sm text-[var(--text-secondary)] backdrop-blur-xl dark:bg-white/5">
              <span>{t("contact.builtWith")}</span>
              <div className="flex items-center gap-2 font-semibold text-[var(--text-primary)]">
                <SiReact className="text-[var(--accent-primary)]" />
                React
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-[var(--text-primary)]">{t("contact.quickLinks")}</h4>
            <ul className="mt-5 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-[var(--text-secondary)] transition duration-300 hover:text-[var(--accent-primary)]"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-[var(--text-primary)]">{t("contact.getInTouch")}</h4>
            <div className="mt-5 space-y-3">
              {contactInfo.map((item) => (
                <a
                  key={item.title}
                  href={item.link}
                  className="flex items-start gap-3 rounded-[1.4rem] border border-[var(--border-soft)] bg-white/82 p-4 text-[var(--text-secondary)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[var(--accent-primary)]/30 dark:bg-white/5"
                >
                  <div className="mt-1 text-[var(--accent-primary)]">{item.icon}</div>
                  <div className="flex flex-col">
                    <span className="text-sm uppercase tracking-[0.2em] text-[var(--text-secondary)]">
                      {item.title}
                    </span>
                    <span className="mt-1 break-all text-[var(--text-primary)] sm:break-normal">{item.value}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-[var(--text-primary)]">{t("contact.workTogether")}</h4>
            <p className="mt-4 leading-7 text-[var(--text-secondary)]">
              {t("contact.workTogetherText")}
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--border-soft)] bg-white/82 text-lg text-[var(--text-primary)] shadow-[0_10px_24px_rgba(255,107,154,0.08)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:text-[var(--accent-primary)] dark:bg-white/5"
                  style={{ "--social-color": social.color } as CustomCSSProperties}
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-[var(--border-soft)] pt-6 sm:mt-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex flex-wrap items-center gap-2 text-sm leading-6 text-[var(--text-secondary)]">
            {t("contact.footer")}
            <FaHeart className="text-rose-400" />
            {t("contact.footerAnd")} <FaCode className="text-[var(--accent-secondary)]" />
          </p>

          <button
            className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--border-soft)] bg-white/82 text-[var(--text-primary)] shadow-[0_10px_24px_rgba(255,107,154,0.08)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:text-[var(--accent-primary)] dark:bg-white/5"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label={t("contact.scrollTop")}
          >
            <FaArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Contact;

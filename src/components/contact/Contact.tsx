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
import { SiGmail, SiReact } from "react-icons/si";

interface CustomCSSProperties extends CSSProperties {
  "--social-color"?: string;
}

const Contact = () => {
  const currentYear = new Date().getFullYear();

  const contactInfo = [
    {
      icon: <FaEnvelope />,
      title: "Email",
      value: "muslimarajabova1997@gmail.com",
      link: "mailto:muslimarajabova1997@gmail.com",
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Location",
      value: "Bukhara, Uzbekistan",
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
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <footer id="contact" className="relative px-4 pb-10 pt-24 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,107,154,0.08),transparent_25%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,183,197,0.16))] dark:bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.12),transparent_25%),linear-gradient(180deg,rgba(15,23,42,0),rgba(2,6,23,0.7))]" />
      <div className="relative mx-auto max-w-7xl rounded-[2.25rem] border border-[var(--border-soft)] bg-[color:var(--card-bg)] p-8 shadow-[var(--shadow-soft)] backdrop-blur-2xl xl:p-10">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.7fr_0.9fr_1fr]">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-tertiary)] p-[1px]">
                <div className="flex h-full w-full items-center justify-center rounded-2xl bg-[var(--card-solid)] text-sm font-bold text-[var(--text-primary)] backdrop-blur">
                  MR
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[var(--text-primary)]">M.Radjabova</h3>
                <p className="text-sm text-[var(--text-secondary)]">Frontend Developer</p>
              </div>
            </div>
            <p className="max-w-sm leading-7 text-[var(--text-secondary)]">
              Frontend Developer & UI/UX Designer passionate about creating beautiful
              and functional digital experiences.
            </p>
            <div className="inline-flex items-center gap-3 rounded-full border border-[var(--border-soft)] bg-white/82 px-4 py-2 text-sm text-[var(--text-secondary)] backdrop-blur-xl dark:bg-white/5">
              <span>Built with</span>
              <div className="flex items-center gap-2 font-semibold text-[var(--text-primary)]">
                <SiReact className="text-[var(--accent-primary)]" />
                React
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-[var(--text-primary)]">Quick Links</h4>
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
            <h4 className="text-lg font-semibold text-[var(--text-primary)]">Get In Touch</h4>
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
                    <span className="mt-1 text-[var(--text-primary)]">{item.value}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-[var(--text-primary)]">Let&apos;s Work Together</h4>
            <p className="mt-4 leading-7 text-[var(--text-secondary)]">
              Have a project in mind? Let&apos;s discuss it.
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

        <div className="mt-10 flex flex-col gap-4 border-t border-[var(--border-soft)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
            © {currentYear} Muslima Radjabova. Made with
            <FaHeart className="text-rose-400" />
            and <FaCode className="text-[var(--accent-secondary)]" />
          </p>

          <button
            className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--border-soft)] bg-white/82 text-[var(--text-primary)] shadow-[0_10px_24px_rgba(255,107,154,0.08)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:text-[var(--accent-primary)] dark:bg-white/5"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <FaArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Contact;

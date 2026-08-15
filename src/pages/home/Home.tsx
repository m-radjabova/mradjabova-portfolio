import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  FaEnvelope,
  FaFileAlt,
  FaFolderOpen,
  FaHome,
  FaInstagram,
  FaLinkedinIn,
  FaUser,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import About from "../../components/about/About";
import Contact from "../../components/contact/Contact";
import Hero from "../../components/hero/Hero";
import Projects from "../../components/projects/Projects";
import ResumeSection from "../../components/resume/ResumeSection";
import SkillsCarousel from "../../components/skills/SkillsCarousel";
type SupportedLanguage = "en" | "ru" | "uz";
type SectionId = "home" | "skills" | "about" | "projects" | "resume" | "contact";

const languageOptions: Array<{
  code: SupportedLanguage;
  label: string;
}> = [
  { code: "en", label: "EN" },
  { code: "ru", label: "RU" },
  { code: "uz", label: "UZ" },
];

const sectionIds: SectionId[] = ["home", "skills", "about", "projects", "resume", "contact"];

function Home() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [activeSection, setActiveSection] = useState<SectionId>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentLanguage = (
    languageOptions.find(
      ({ code }) =>
        i18n.resolvedLanguage?.startsWith(code) || i18n.language?.startsWith(code),
    )?.code ?? "en"
  ) as SupportedLanguage;

  const navItems = useMemo(
    () => [
      { id: "home" as const, label: t("nav.home"), icon: <FaHome /> },
      { id: "skills" as const, label: t("nav.skills"), icon: <HiSparkles /> },
      { id: "about" as const, label: t("nav.about"), icon: <FaUser /> },
      { id: "projects" as const, label: t("nav.projects"), icon: <FaFolderOpen /> },
      { id: "resume" as const, label: t("nav.resume"), icon: <FaFileAlt /> },
      { id: "contact" as const, label: t("nav.contact"), icon: <FaEnvelope /> },
    ],
    [t],
  );

  useEffect(() => {
    const nextSection = location.hash.replace("#", "") as SectionId;
    if (sectionIds.includes(nextSection)) {
      setActiveSection(nextSection);
    }
  }, [location.hash]);

  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    window.history.replaceState(null, "", activeSection === "home" ? "/" : `/#${activeSection}`);
  }, [activeSection]);

  const handleSectionChange = (sectionId: SectionId) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
  };

  const handleLanguageChange = (language: SupportedLanguage) => {
    void i18n.changeLanguage(language);
  };

  const socialItems = [
    { icon: <FaLinkedinIn />, label: "LinkedIn", href: "https://www.linkedin.com" },
    { icon: <FaInstagram />, label: "Instagram", href: "https://www.instagram.com" },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case "skills":
        return <SkillsCarousel />;
      case "about":
        return <About />;
      case "projects":
        return <Projects />;
      case "resume":
        return <ResumeSection />;
      case "contact":
        return <Contact />;
      case "home":
      default:
        return <Hero onNavigate={handleSectionChange} />;
    }
  };

  return (
    <div className="min-h-[100dvh] bg-[var(--hero-bg)]">
      <div className="relative h-[100dvh] overflow-hidden bg-[var(--hero-bg)]">
        {/* ====== MOBILE HEADER BAR ====== */}
        <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-[rgba(247,238,243,0.92)] backdrop-blur-xl border-b border-white/30 md:hidden">
          <span
            className="text-lg font-semibold text-[var(--lavender-strong)]"
            style={{ fontFamily: "var(--font-script)" }}
          >
            Muslima
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/70 border border-white/40 text-[var(--lavender-strong)] shadow-sm"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* ====== MOBILE OVERLAY MENU ====== */}
        <div
          className={`fixed inset-0 z-40 bg-[rgba(247,238,243,0.98)] backdrop-blur-2xl transition-all duration-400 md:hidden ${
            mobileMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="flex h-full flex-col items-center justify-center gap-5 overflow-y-auto px-6 py-20">
            {/* Language switcher in overlay */}
            <div className="flex gap-2 rounded-2xl border border-white/40 bg-white/60 p-2 shadow-lg">
              {languageOptions.map((language) => (
                <button
                  key={language.code}
                  type="button"
                  onClick={() => handleLanguageChange(language.code)}
                  className={`px-4 py-2 text-sm font-semibold tracking-wider rounded-xl transition-all duration-300 ${
                    currentLanguage === language.code
                      ? "bg-gradient-to-r from-[#dba4af] to-[#b9b2de] text-white shadow-md"
                      : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {language.label}
                </button>
              ))}
            </div>

            {/* Navigation items */}
            <nav className="flex w-full max-w-xs flex-col items-center gap-2.5">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSectionChange(item.id)}
                    className={`flex w-full items-center gap-3 rounded-2xl border px-6 py-3.5 text-base font-semibold transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-[#dba4af]/20 to-[#b9b2de]/20 text-[var(--lavender-strong)] border-white/60 shadow-md"
                        : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-white/50 border-transparent"
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Social links */}
            <div className="flex gap-4 mt-2">
              {socialItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-white/70 border border-white/40 text-[var(--text-muted)] hover:text-[var(--accent-primary)] hover:shadow-md transition-all duration-300"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ====== DESKTOP / TABLET SIDEBAR (md+) ====== */}
        {/* Vertical dock from md upward: consistent orientation on tablet and desktop,
            only spacing/size grows at lg — avoids the row-inside-a-tall-thin-bar
            mismatch that broke the tablet layout before. */}
        <aside
          className="
            hidden md:flex
            absolute left-2 top-1/2 -translate-y-1/2 z-30
            flex-col
            transition-all duration-500
            md:left-3 lg:left-4
            w-auto h-auto
            rounded-2xl md:rounded-3xl
            border border-white/35
            bg-[linear-gradient(180deg,rgba(247,238,243,0.88),rgba(245,232,239,0.80),rgba(240,228,235,0.72))]
            shadow-[0_18px_40px_rgba(179,170,215,0.10)]
            backdrop-blur-xl
            max-h-[calc(100dvh-1rem)]
          "
        >
          <div className="relative z-10 flex h-full flex-col items-center gap-2 overflow-y-auto p-2 md:gap-3 md:p-3 lg:gap-4 lg:p-5">
            {/* ====== LANGUAGE SWITCHER ====== */}
            <div className="relative flex flex-col gap-1 rounded-[1.5rem] md:rounded-[2rem] border border-white/30 bg-[linear-gradient(135deg,rgba(248,239,244,0.88),rgba(238,230,244,0.72))] p-1 md:gap-1.5 md:p-1.5 shadow-[0_16px_36px_rgba(180,165,200,0.05),inset_0_1px_0_rgba(255,255,255,0.75)] backdrop-blur-xl">
              <div className="absolute -inset-2 rounded-[2.5rem] bg-gradient-to-br from-pink-200/15 via-purple-200/10 to-transparent blur-xl opacity-60 pointer-events-none" />

              {languageOptions.map((language, index) => (
                <button
                  key={language.code}
                  type="button"
                  onClick={() => handleLanguageChange(language.code)}
                  aria-label={t("common.actions.switchLanguage", { language: language.label })}
                  className={`
                    relative flex items-center justify-center
                    min-h-[2.2rem] min-w-[2.2rem] md:min-h-[2.6rem] md:min-w-[2.6rem] px-1.5 md:px-2 py-1 md:py-1.5 text-[0.7rem] md:text-[0.82rem] font-normal tracking-wide
                    rounded-[1.2rem] md:rounded-[1.5rem] transition-all duration-500 cursor-pointer overflow-hidden group
                    ${
                      currentLanguage === language.code
                        ? "text-white shadow-[0_8px_20px_rgba(200,170,210,0.2)]"
                        : "text-[rgba(140,135,165,0.85)] hover:text-[rgba(180,145,175,0.95)]"
                    }
                  `}
                  style={{ transitionDelay: `${index * 40}ms` }}
                >
                  {currentLanguage === language.code && (
                    <>
                      <span className="absolute inset-0 bg-[linear-gradient(135deg,rgba(226,190,200,0.95),rgba(205,185,225,0.92),rgba(215,175,200,0.88))] rounded-[1.2rem] md:rounded-[1.5rem] animate-gradient-x" />
                      <span className="absolute inset-[1.5px] rounded-[1.1rem] md:rounded-[1.35rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.22),transparent_50%)]" />
                      <span className="absolute -inset-[2px] rounded-[1.3rem] md:rounded-[1.6rem] bg-[linear-gradient(135deg,transparent_30%,rgba(255,255,255,0.25)_50%,transparent_70%)] animate-shimmer" />
                    </>
                  )}

                  {currentLanguage !== language.code && (
                    <span className="absolute inset-0 rounded-[1.2rem] md:rounded-[1.5rem] bg-white/0 group-hover:bg-white/40 transition-all duration-400" />
                  )}

                  <span className="relative z-10 text-[0.65rem] md:text-[0.78rem] font-medium tracking-[0.08em] transition-all duration-300 group-hover:scale-[1.04]">
                    {language.label}
                  </span>

                  {currentLanguage === language.code && (
                    <span className="absolute -bottom-[2px] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white/70 shadow-[0_0_6px_rgba(255,255,255,0.5)]" />
                  )}
                </button>
              ))}
            </div>

            {/* ====== NAVIGATION ====== */}
            <nav className="flex flex-col gap-1.5 md:gap-2 w-full">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSectionChange(item.id)}
                    aria-label={item.label}
                    className={`
                      group relative cursor-pointer flex h-[2.8rem] w-[2.8rem] md:h-[3.55rem] md:w-[3.55rem] min-w-[2.8rem] md:min-w-[3.55rem] items-center justify-center
                      rounded-[1.2rem] md:rounded-[1.55rem] transition-all duration-300
                      ${
                        isActive
                          ? `
                            bg-[linear-gradient(180deg,rgba(248,239,244,0.96),rgba(239,231,244,0.88))]
                            text-[#b88397]
                            shadow-[0_12px_28px_rgba(193,143,160,0.12)]
                            ring-1 ring-[rgba(193,143,160,0.20)]
                          `
                          : `
                            bg-[rgba(247,238,243,0.52)]
                            text-[var(--text-muted)]
                            hover:bg-[rgba(245,232,239,0.88)]
                            hover:text-[var(--text-primary)]
                            hover:scale-[1.04]
                            hover:shadow-[0_10px_24px_rgba(170,155,194,0.08)]
                          `
                      }
                    `}
                    style={{ animationDelay: `${index * 70}ms` }}
                  >
                    <span className="text-[1rem] md:text-[1.2rem] transition-transform duration-300 group-hover:scale-110">
                      {item.icon}
                    </span>

                    {/* Active indicator */}
                    {isActive && (
                      <span className="absolute -bottom-1 left-1/2 h-1.5 w-1.5 md:h-2 md:w-2 -translate-x-1/2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.65)]" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Decorative divider */}
            <div className="block w-8 h-px bg-gradient-to-r from-transparent via-[rgba(179,170,215,0.2)] to-transparent md:w-full" />

            {/* ====== SOCIAL LINKS ====== */}
            <div className="flex flex-col items-center gap-2 md:gap-3 w-full">
              <div className="flex flex-col gap-1.5 md:gap-2">
                {socialItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.label}
                    className={`
                      flex h-7 w-7 md:h-9 md:w-9 items-center justify-center
                      rounded-xl md:rounded-2xl text-xs md:text-base
                      bg-[rgba(247,238,243,0.56)]
                      text-[var(--text-muted)]
                      transition-all duration-300
                      hover:bg-gradient-to-br hover:from-[var(--accent-primary)] hover:to-[var(--accent-secondary)]
                      hover:text-white
                      hover:scale-110
                      hover:shadow-[0_4px_16px_rgba(217,150,164,0.25)]
                    `}
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* ====== MAIN CONTENT ====== */}
        <section
          ref={contentRef}
          className={`h-full overflow-y-auto pt-16 md:pt-0 ${
  activeSection === "home" ? "" : "md:pl-24 lg:pl-28"
}`}
        >
          <div
            key={activeSection}
            className="h-full animate-[fade-up_0.5s_ease-out_both]"
          >
            {renderSection()}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
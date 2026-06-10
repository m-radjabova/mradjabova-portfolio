import { useEffect, useRef, useState, type JSX } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  FaBars,
  FaCheck,
  FaEnvelope,
  FaFileAlt,
  FaFolderOpen,
  FaHome,
  FaMoon,
  FaSun,
  FaTimes,
  FaUser,
  FaArrowUp,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import { useTranslation } from "react-i18next";
import flagEn from "../../assets/flags/en.svg";
import flagRu from "../../assets/flags/ru.svg";
import flagUz from "../../assets/flags/uz.svg";
import Logo from "../../../public/logo.png";

type HeaderProps = {
  theme: "light" | "dark";
  onToggleTheme: () => void;
};

type SupportedLanguage = "en" | "ru" | "uz";

const languageOptions: Array<{
  code: SupportedLanguage;
  asset: string;
  tone: string;
  glow: string;
  accent: string;
}> = [
  {
    code: "en",
    asset: flagEn,
    tone: "from-sky-500 via-blue-500 to-indigo-500",
    glow: "shadow-[0_0_30px_rgba(59,130,246,0.35),0_0_60px_rgba(59,130,246,0.15)]",
    accent: "#3b82f6",
  },
  {
    code: "ru",
    asset: flagRu,
    tone: "from-indigo-500 via-violet-500 to-fuchsia-500",
    glow: "shadow-[0_0_30px_rgba(139,92,246,0.35),0_0_60px_rgba(139,92,246,0.15)]",
    accent: "#8b5cf6",
  },
  {
    code: "uz",
    asset: flagUz,
    tone: "from-emerald-500 via-teal-500 to-cyan-500",
    glow: "shadow-[0_0_30px_rgba(16,185,129,0.35),0_0_60px_rgba(16,185,129,0.15)]",
    accent: "#10b981",
  },
];

/* ── each nav item gets its own accent so the active indicator feels alive ── */
const navAccents = [
  { id: "home",     color: "#ff7aac", shadow: "rgba(255,122,172,0.35)" },
  { id: "skills",   color: "#a78bfa", shadow: "rgba(167,139,250,0.35)" },
  { id: "about",    color: "#60a5fa", shadow: "rgba(96,165,250,0.35)" },
  { id: "projects", color: "#34d399", shadow: "rgba(52,211,153,0.35)" },
  { id: "resume",   color: "#fbbf24", shadow: "rgba(251,191,36,0.35)" },
  { id: "contact",  color: "#f472b6", shadow: "rgba(244,114,182,0.35)" },
];

const Header = ({ theme, onToggleTheme }: HeaderProps) => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const languageMenuRef = useRef<HTMLDivElement | null>(null);
  const themeMenuRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activeSection = searchParams.get("section") ?? "home";
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);

  const navItems = [
    { id: "home",     label: t("nav.home"),     icon: <FaHome /> },
    { id: "skills",   label: t("nav.skills"),   icon: <HiSparkles /> },
    { id: "about",    label: t("nav.about"),    icon: <FaUser /> },
    { id: "projects", label: t("nav.projects"), icon: <FaFolderOpen /> },
    { id: "resume",   label: t("nav.resume"),   icon: <FaFileAlt /> },
    { id: "contact",  label: t("nav.contact"),  icon: <FaEnvelope /> },
  ];

  const currentLanguage = (
    languageOptions.find(
      ({ code }) =>
        i18n.resolvedLanguage?.startsWith(code) || i18n.language?.startsWith(code),
    )?.code ?? "en"
  ) as SupportedLanguage;
  const selectedLanguage =
    languageOptions.find(({ code }) => code === currentLanguage) ?? languageOptions[0];

  /* ── scroll handler ─────────────────────────────────────────── */
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 30);

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ── outside click & escape ─────────────────────────────────── */
  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!languageMenuRef.current?.contains(event.target as Node)) {
        setIsLanguageMenuOpen(false);
      }
      if (!themeMenuRef.current?.contains(event.target as Node)) {
        setIsThemeMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsLanguageMenuOpen(false);
        setIsThemeMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  /* ── lock body scroll when mobile menu is open ──────────────── */
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  const handleNavClick = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    if (location.pathname !== "/") {
      navigate(`/?section=${sectionId}`);
      return;
    }
    navigate(`/?section=${sectionId}`, { replace: true });
  };

  const handleLanguageChange = (language: SupportedLanguage) => {
    void i18n.changeLanguage(language);
    setIsLanguageMenuOpen(false);
  };

  const handleThemeChange = (nextTheme: "light" | "dark") => {
    if (nextTheme !== theme) onToggleTheme();
    setIsThemeMenuOpen(false);
  };

  const toggleLabel =
    theme === "light"
      ? t("common.theme.switchToDark")
      : t("common.theme.switchToLight");

  const themeOptions: Array<{
    id: "light" | "dark";
    icon: JSX.Element;
    tone: string;
    activeClass: string;
  }> = [
    {
      id: "light",
      icon: <FaSun />,
      tone: "from-amber-400 via-yellow-300 to-orange-300",
      activeClass:
        "border-amber-200/80 bg-[linear-gradient(180deg,#fff4bf_0%,#fde68a_55%,#fbbf24_100%)] text-amber-950 shadow-[0_0_40px_rgba(251,191,36,0.25)]",
    },
    {
      id: "dark",
      icon: <FaMoon />,
      tone: "from-slate-500 via-slate-700 to-slate-900",
      activeClass:
        "border-slate-600/90 bg-[linear-gradient(180deg,#334155_0%,#1e293b_55%,#0f172a_100%)] text-white shadow-[0_0_40px_rgba(15,23,42,0.3)]",
    },
  ];
  const selectedTheme =
    themeOptions.find((o) => o.id === theme) ?? themeOptions[0];

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-[linear-gradient(180deg,rgba(7,15,31,0.65),rgba(7,15,31,0))]"
            : "bg-transparent"
        }`}
      >
        {/* ── Scroll progress bar ─────────────────────────────── */}
        <div
          className="absolute bottom-0 left-0 h-[2px] transition-all duration-150"
          style={{
            width: `${scrollProgress * 100}%`,
            background: `linear-gradient(90deg, var(--accent-primary), var(--accent-secondary), var(--accent-tertiary))`,
            boxShadow: `0 0 20px var(--accent-primary), 0 0 40px var(--accent-secondary)`,
            opacity: isScrolled ? 1 : 0,
          }}
        />

        {/* ── Background orbs (only when scrolled) ────────────── */}
        {isScrolled && (
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-b-[2rem]">
            <div className="absolute -left-20 -top-24 h-48 w-48 rounded-full bg-[var(--accent-primary)]/8 blur-[80px] animate-[glow-drift_12s_ease-in-out_infinite]" />
            <div className="absolute -right-16 -bottom-20 h-44 w-44 rounded-full bg-[var(--accent-secondary)]/6 blur-[70px] animate-[glow-drift_14s_ease-in-out_infinite_0.5s]" />
          </div>
        )}

        {/* ── Main header bar ─────────────────────────────────── */}
        <div
          className={`mx-auto mt-2 flex max-w-7xl items-center justify-between gap-3 rounded-[2rem] px-4 py-3 transition-all duration-500 sm:px-6 sm:py-3 lg:px-8 ${
            isScrolled
              ? "translate-y-0 border border-white/15 bg-[color:var(--card-bg)]/88 shadow-[0_25px_60px_-12px_rgba(0,0,0,0.25)] backdrop-blur-3xl dark:bg-slate-950/30"
              : "border-transparent bg-transparent shadow-none"
          }`}
        >
          {/* ── Logo ──────────────────────────────────────────── */}
          <button
            onClick={() => handleNavClick("home")}
            className="group cursor-pointer flex items-center gap-3 rounded-full px-1 text-left transition-all duration-500 hover:scale-[1.02]"
          >
            <div className="relative h-11 w-11">
              <div className="absolute -inset-2 rounded-[1.6rem] bg-gradient-to-br from-[var(--accent-primary)]/20 to-[var(--accent-secondary)]/20 opacity-0 blur-xl transition duration-500 group-hover:opacity-100" />
              <div className="relative flex h-full w-full items-center justify-center">
                <img
                  src={Logo}
                  alt="Logo"
                  className="h-10 w-10 animate-[float-petal_6s_ease-in-out_infinite]"
                />
              </div>
            </div>
            <div className="hidden min-w-0 min-[380px]:block">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--text-secondary)] sm:text-[11px] sm:tracking-[0.32em]">
                {t("common.portfolio")}
              </p>
              <p className="truncate text-sm font-semibold text-[var(--text-primary)] transition group-hover:text-[var(--accent-primary)] sm:text-base">
                Muslima Radjabova
              </p>
            </div>
          </button>

          {/* ── Desktop Nav ───────────────────────────────────── */}
          <nav className="hidden items-center gap-1 rounded-full border border-white/15 bg-white/10 p-1.5 shadow-[0_16px_36px_rgba(255,107,154,0.06)] backdrop-blur-2xl dark:bg-slate-950/15 md:flex">
            {navItems.map((item) => {
              const accent =
                navAccents.find((a) => a.id === item.id) ?? navAccents[0];
              const isActive = activeSection === item.id && location.pathname === "/";
              const isHovered = hoveredNav === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  onMouseEnter={() => setHoveredNav(item.id)}
                  onMouseLeave={() => setHoveredNav(null)}
                  className="group cursor-pointer relative"
                  aria-label={item.label}
                  title={item.label}
                >
                  <div
                    className={`relative flex h-10 items-center gap-2 rounded-full px-3.5 text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? "text-white"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    {/* Active / hover background */}
                    {(isActive || isHovered) && (
                      <span
                        className="absolute inset-0 rounded-full transition-all duration-300"
                        style={{
                          background: isActive
                            ? `linear-gradient(135deg, ${accent.color}, ${accent.color}dd)`
                            : `color-mix(in srgb, ${accent.color} 15%, transparent)`,
                          boxShadow: isActive
                            ? `0 8px 24px ${accent.shadow}`
                            : "none",
                        }}
                      />
                    )}

                    {/* glow ring on active */}
                    {isActive && (
                      <span
                        className="absolute -inset-[3px] rounded-full opacity-30 blur-sm transition duration-300"
                        style={{
                          background: `linear-gradient(135deg, ${accent.color}, transparent)`,
                        }}
                      />
                    )}

                    <span className="relative z-10 text-sm">{item.icon}</span>
                    <span className="relative z-10 hidden text-xs font-semibold lg:inline">
                      {item.label}
                    </span>
                  </div>

                  {/* Tooltip on hover (when label hidden) */}
                  <span className="pointer-events-none absolute left-1/2 top-[calc(100%+0.6rem)] z-30 hidden -translate-x-1/2 whitespace-nowrap rounded-full border border-white/20 bg-[color:var(--card-solid)] px-3.5 py-1.5 text-[11px] font-semibold text-[var(--text-primary)] shadow-[0_12px_30px_rgba(0,0,0,0.15)] backdrop-blur-xl group-hover:block lg:hidden">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* ── Right controls ────────────────────────────────── */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* ── Language ── */}
            <div
              ref={languageMenuRef}
              className={`relative hidden md:block ${isLanguageMenuOpen ? "z-40" : "z-10"}`}
            >
              {/* Glow orb */}
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,110,160,0.2),transparent_68%)] blur-3xl" />

              <button
                type="button"
                onClick={() => setIsLanguageMenuOpen((c) => !c)}
                className={`group cursor-pointer relative inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/12 shadow-[0_18px_40px_rgba(15,23,42,0.12),inset_0_1px_0_rgba(255,255,255,0.3)] backdrop-blur-2xl transition-all duration-400 dark:bg-slate-950/22 ${
                  isLanguageMenuOpen ? "scale-105" : "hover:scale-105"
                }`}
                aria-expanded={isLanguageMenuOpen}
                aria-label={t("common.language")}
              >
                <span
                  className={`pointer-events-none absolute inset-[-0.2rem] rounded-full bg-gradient-to-br ${selectedLanguage.tone} opacity-0 blur-lg transition duration-500 ${
                    isLanguageMenuOpen ? "opacity-55" : "group-hover:opacity-35"
                  }`}
                />
                <span className="pointer-events-none absolute inset-[1px] rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.35),rgba(255,255,255,0.06))] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.02))]" />
                <span className="pointer-events-none absolute left-2 top-2 h-2.5 w-6 rounded-full bg-white/28 blur-sm" />
                <img
                  src={selectedLanguage.asset}
                  alt={selectedLanguage.code.toUpperCase()}
                  className={`relative h-9 w-9 rounded-full object-cover shadow-[0_10px_22px_rgba(15,23,42,0.22)] transition duration-500 ${
                    isLanguageMenuOpen ? "translate-y-[-1px]" : "translate-y-0"
                  }`}
                />
              </button>

              {/* Dropdown flags – fly out to the left */}
              <div className="absolute right-[calc(100%+0.55rem)] top-1/2 z-50 flex -translate-y-1/2 items-center gap-2">
                {languageOptions
                  .filter((l) => l.code !== currentLanguage)
                  .map((language, index) => (
                    <button
                      key={language.code}
                      type="button"
                      onClick={() => handleLanguageChange(language.code)}
                      className={`group cursor-pointer relative inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-white/24 bg-white/12 shadow-[0_16px_34px_rgba(15,23,42,0.14),inset_0_1px_0_rgba(255,255,255,0.28)] backdrop-blur-2xl transition-all duration-500 dark:bg-slate-950/20 ${
                        isLanguageMenuOpen
                          ? "pointer-events-auto translate-x-0 opacity-100 scale-100"
                          : "pointer-events-none translate-x-8 opacity-0 scale-75"
                      }`}
                      aria-label={`${t("common.language")}: ${language.code.toUpperCase()}`}
                      style={{
                        transitionDelay: isLanguageMenuOpen
                          ? `${index * 70}ms`
                          : "0ms",
                      }}
                    >
                      <span
                        className={`pointer-events-none absolute inset-[-0.2rem] rounded-full bg-gradient-to-br ${language.tone} opacity-0 blur-md transition duration-300 group-hover:opacity-55`}
                      />
                      <span className="pointer-events-none absolute inset-[1px] rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.28),rgba(255,255,255,0.04))] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.01))]" />
                      <span className="pointer-events-none absolute left-2 top-2 h-2 w-5 rounded-full bg-white/22 blur-sm" />
                      <img
                        src={language.asset}
                        alt={language.code.toUpperCase()}
                        className={`relative h-9 w-9 rounded-full object-cover shadow-[0_10px_22px_rgba(15,23,42,0.18)] transition duration-300 group-hover:-translate-y-1 group-hover:scale-[1.06] ${language.glow}`}
                      />
                    </button>
                  ))}
              </div>
            </div>

            {/* ── Theme ── */}
            <div
              ref={themeMenuRef}
              className={`relative hidden md:block ${isThemeMenuOpen ? "z-30" : "z-10"}`}
            >
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(125,211,252,0.16),transparent_68%)] blur-3xl" />

              <button
                type="button"
                onClick={() => setIsThemeMenuOpen((c) => !c)}
                className={`group cursor-pointer relative inline-flex h-12 w-12 items-center justify-center rounded-full border bg-white/12 shadow-[0_18px_40px_rgba(15,23,42,0.12),inset_0_1px_0_rgba(255,255,255,0.3)] backdrop-blur-2xl transition-all duration-400 dark:bg-slate-950/22 ${
                  selectedTheme.activeClass
                } ${isThemeMenuOpen ? "scale-105" : "hover:scale-105"}`}
                aria-expanded={isThemeMenuOpen}
                aria-label={toggleLabel}
                title={toggleLabel}
              >
                <span
                  className={`pointer-events-none absolute inset-[-0.2rem] rounded-full bg-gradient-to-br ${selectedTheme.tone} opacity-0 blur-lg transition duration-500 ${
                    isThemeMenuOpen ? "opacity-55" : "group-hover:opacity-35"
                  }`}
                />
                <span className="pointer-events-none absolute inset-[1px] rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.35),rgba(255,255,255,0.08))] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.02))]" />
                <span className="relative text-lg [&>svg]:drop-shadow-[0_2px_6px_rgba(0,0,0,0.15)]">
                  {selectedTheme.icon}
                </span>
              </button>

              {/* Dropdown – appears below */}
              <div className="absolute left-1/2 top-[calc(100%+0.55rem)] z-30 flex -translate-x-1/2 flex-col items-center gap-2">
                {themeOptions
                  .filter((o) => o.id !== theme)
                  .map((option, index) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => handleThemeChange(option.id)}
                      className={`group cursor-pointer relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-white/24 bg-white/12 shadow-[0_16px_34px_rgba(15,23,42,0.14),inset_0_1px_0_rgba(255,255,255,0.28)] backdrop-blur-2xl transition-all duration-500 dark:bg-slate-950/20 ${
                        isThemeMenuOpen
                          ? "pointer-events-auto translate-y-0 opacity-100 scale-100"
                          : "pointer-events-none -translate-y-3 opacity-0 scale-75"
                      }`}
                      aria-label={
                        option.id === "light"
                          ? t("common.theme.switchToLight")
                          : t("common.theme.switchToDark")
                      }
                      style={{
                        transitionDelay: isThemeMenuOpen
                          ? `${index * 70}ms`
                          : "0ms",
                      }}
                    >
                      <span
                        className={`pointer-events-none absolute inset-[-0.2rem] rounded-full bg-gradient-to-br ${option.tone} opacity-0 blur-md transition duration-300 group-hover:opacity-55`}
                      />
                      <span className="pointer-events-none absolute inset-[1px] rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.28),rgba(255,255,255,0.04))] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.01))]" />
                      <span className="relative text-base text-[var(--text-primary)]">
                        {option.icon}
                      </span>
                    </button>
                  ))}
              </div>
            </div>

            {/* ── Mobile theme toggle ── */}
            <button
              className={`md:hidden inline-flex h-11 w-11 items-center justify-center rounded-[1.25rem] border text-[var(--text-primary)] shadow-[0_16px_36px_rgba(15,23,42,0.12)] backdrop-blur-2xl transition-all duration-300 active:scale-90 ${
                theme === "light"
                  ? "border-amber-200/80 bg-[linear-gradient(180deg,#fff4bf_0%,#fde68a_55%,#fbbf24_100%)] text-amber-950"
                  : "border-slate-700/90 bg-[linear-gradient(180deg,#334155_0%,#1e293b_55%,#0f172a_100%)] text-white"
              }`}
              onClick={onToggleTheme}
              aria-label={toggleLabel}
              title={toggleLabel}
              type="button"
            >
              {theme === "light" ? <FaSun /> : <FaMoon />}
            </button>

            {/* ── Mobile hamburger ── */}
            <button
              className="relative inline-flex h-11 w-11 items-center justify-center rounded-[1.25rem] border border-white/18 bg-white/10 text-[var(--text-primary)] shadow-[0_16px_36px_rgba(255,107,154,0.08)] backdrop-blur-2xl transition-all duration-300 active:scale-90 dark:bg-slate-950/18 md:hidden"
              onClick={() => setIsMobileMenuOpen((c) => !c)}
              aria-label="Toggle mobile menu"
            >
              {/* Hamburger icon with smooth cross transition */}
              <span className="relative h-4 w-4">
                <span
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-400 ${
                    isMobileMenuOpen
                      ? "rotate-90 scale-0 opacity-0"
                      : "rotate-0 scale-100 opacity-100"
                  }`}
                >
                  <FaBars className="h-4 w-4" />
                </span>
                <span
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-400 ${
                    isMobileMenuOpen
                      ? "rotate-0 scale-100 opacity-100"
                      : "-rotate-90 scale-0 opacity-0"
                  }`}
                >
                  <FaTimes className="h-4 w-4" />
                </span>
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile overlay menu ───────────────────────────────── */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-500 md:hidden ${
          isMobileMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu panel */}
        <div
          className={`absolute bottom-0 left-0 right-0 rounded-t-[2.5rem] border-t border-white/15 bg-[color:var(--card-solid)]/95 shadow-[0_-30px_80px_rgba(0,0,0,0.2)] backdrop-blur-3xl transition-all duration-500 ease-out ${
            isMobileMenuOpen
              ? "translate-y-0 opacity-100"
              : "translate-y-12 opacity-0"
          }`}
        >
          {/* Handle indicator */}
          <div className="mx-auto mt-3 h-1.5 w-16 rounded-full bg-white/20" />

          {/* Language selector */}
          <div className="mt-4 flex items-center justify-center gap-2.5 px-6">
            {languageOptions.map((language, idx) => {
              const isCurrent = currentLanguage === language.code;
              return (
                <button
                  key={language.code}
                  type="button"
                  onClick={() => handleLanguageChange(language.code)}
                  style={{
                    transitionDelay: isMobileMenuOpen ? `${idx * 60}ms` : "0ms",
                  }}
                  className={`group relative flex h-12 w-12 items-center justify-center rounded-full border border-white/24 bg-white/14 shadow-[0_16px_34px_rgba(15,23,42,0.14),inset_0_1px_0_rgba(255,255,255,0.28)] backdrop-blur-2xl transition-all duration-400 dark:bg-slate-950/20 hover:-translate-y-0.5 ${
                    isCurrent ? "scale-110" : ""
                  } ${
                    isMobileMenuOpen
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  }`}
                  aria-label={`${t("common.language")}: ${language.code.toUpperCase()}`}
                >
                  <span
                    className={`absolute inset-[-0.2rem] rounded-full bg-gradient-to-br ${language.tone} opacity-0 blur-md transition duration-300 ${
                      isCurrent ? "opacity-55" : "group-hover:opacity-35"
                    }`}
                  />
                  <span className="absolute inset-[1px] rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.28),rgba(255,255,255,0.04))] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.01))]" />
                  <span className="absolute left-2 top-2 h-2 w-5 rounded-full bg-white/22 blur-sm" />
                  <img
                    src={language.asset}
                    alt={language.code.toUpperCase()}
                    className={`relative h-9 w-9 rounded-full object-cover shadow-[0_10px_22px_rgba(15,23,42,0.18)] ${
                      isCurrent ? language.glow : ""
                    }`}
                  />
                  {isCurrent && (
                    <span className="absolute -right-1 -top-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-white text-[9px] text-slate-900 shadow-[0_8px_18px_rgba(15,23,42,0.2)]">
                      <FaCheck />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Navigation grid */}
          <nav className="mt-5 grid grid-cols-3 gap-3 px-6 pb-8">
            {navItems.map((item, idx) => {
              const accent =
                navAccents.find((a) => a.id === item.id) ?? navAccents[0];
              const isActive = activeSection === item.id && location.pathname === "/";

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  style={{
                    transitionDelay: isMobileMenuOpen ? `${idx * 50}ms` : "0ms",
                  }}
                  className={`relative flex flex-col items-center justify-center gap-1.5 rounded-[1.5rem] py-4 text-sm font-medium transition-all duration-400 ${
                    isActive
                      ? "text-white shadow-lg"
                      : "bg-white/45 text-[var(--text-secondary)] hover:bg-white/60 hover:text-[var(--text-primary)] dark:bg-white/5 dark:hover:bg-white/10"
                  } ${
                    isMobileMenuOpen
                      ? "translate-y-0 opacity-100 scale-100"
                      : "translate-y-6 opacity-0 scale-90"
                  }`}
                  aria-label={item.label}
                  title={item.label}
                >
                  {/* Active background */}
                  {isActive && (
                    <span
                      className="absolute inset-0 rounded-[1.5rem] transition-all"
                      style={{
                        background: `linear-gradient(135deg, ${accent.color}, ${accent.color}dd)`,
                        boxShadow: `0 8px 24px ${accent.shadow}`,
                      }}
                    />
                  )}
                  <span className="relative z-10 text-lg">{item.icon}</span>
                  <span className="relative z-10 text-[10px] font-semibold uppercase tracking-wider">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* ── Scroll-to-top button ──────────────────────────────── */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-6 right-6 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-[color:var(--card-solid)]/90 text-[var(--text-primary)] shadow-[0_12px_30px_rgba(0,0,0,0.15)] backdrop-blur-xl transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.2)] active:scale-90 ${
          isScrolled && scrollProgress > 0.15
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
        aria-label="Scroll to top"
        title="Scroll to top"
      >
        <FaArrowUp className="h-4 w-4" />
      </button>
    </>
  );
};

export default Header;
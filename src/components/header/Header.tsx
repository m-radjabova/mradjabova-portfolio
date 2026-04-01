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
}> = [
  {
    code: "en",
    asset: flagEn,
    tone: "from-sky-500 via-blue-500 to-indigo-500",
    glow: "shadow-[0_20px_40px_rgba(59,130,246,0.28)]",
  },
  {
    code: "ru",
    asset: flagRu,
    tone: "from-indigo-500 via-violet-500 to-fuchsia-500",
    glow: "shadow-[0_20px_40px_rgba(139,92,246,0.28)]",
  },
  {
    code: "uz",
    asset: flagUz,
    tone: "from-emerald-500 via-teal-500 to-cyan-500",
    glow: "shadow-[0_20px_40px_rgba(16,185,129,0.28)]",
  },
];

const Header = ({ theme, onToggleTheme }: HeaderProps) => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const languageMenuRef = useRef<HTMLDivElement | null>(null);
  const themeMenuRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activeSection = searchParams.get("section") ?? "home";

  const navItems = [
    { id: "home", label: t("nav.home"), icon: <FaHome /> },
    { id: "skills", label: t("nav.skills"), icon: <HiSparkles /> },
    { id: "about", label: t("nav.about"), icon: <FaUser /> },
    { id: "projects", label: t("nav.projects"), icon: <FaFolderOpen /> },
    { id: "resume", label: t("nav.resume"), icon: <FaFileAlt /> },
    { id: "contact", label: t("nav.contact"), icon: <FaEnvelope /> },
  ];

  const currentLanguage = (
    languageOptions.find(({ code }) => i18n.resolvedLanguage?.startsWith(code) || i18n.language?.startsWith(code))
      ?.code ?? "en"
  ) as SupportedLanguage;
  const selectedLanguage = languageOptions.find(({ code }) => code === currentLanguage) ?? languageOptions[0];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
    if (nextTheme !== theme) {
      onToggleTheme();
    }

    setIsThemeMenuOpen(false);
  };

  const themeToggleLabel =
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
        "border-amber-200/80 bg-[linear-gradient(180deg,#fff4bf_0%,#fde68a_55%,#fbbf24_100%)] text-amber-950 shadow-[0_16px_34px_rgba(251,191,36,0.28)]",
    },
    {
      id: "dark",
      icon: <FaMoon />,
      tone: "from-slate-500 via-slate-700 to-slate-900",
      activeClass:
        "border-slate-600/90 bg-[linear-gradient(180deg,#334155_0%,#1e293b_55%,#0f172a_100%)] text-white shadow-[0_16px_34px_rgba(15,23,42,0.34)]",
    },
  ];
  const selectedTheme = themeOptions.find((option) => option.id === theme) ?? themeOptions[0];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[linear-gradient(180deg,rgba(7,15,31,0.5),rgba(7,15,31,0))]"
          : "bg-transparent"
      }`}
    >
      <div
        className={`mx-auto mt-2 flex max-w-7xl items-center justify-between gap-3 rounded-[1.7rem] border px-4 py-3 transition-all duration-300 sm:px-6 sm:py-4 lg:px-8 ${
          isScrolled
            ? "translate-y-1 border-white/18 bg-[color:var(--card-bg)]/88 py-2.5 shadow-[0_24px_60px_rgba(15,23,42,0.22)] backdrop-blur-3xl dark:bg-slate-950/28"
            : "border-transparent bg-transparent shadow-none"
        }`}
      >
        <button
          onClick={() => handleNavClick("home")}
          className="group cursor-pointer flex items-center gap-3 rounded-full px-1 text-left transition-transform duration-300 hover:scale-[1.01]"
        >
          <div className="h-11 w-11 rounded-[1.35rem]">
            <div className="flex h-full w-full items-center justify-center rounded-[1.25rem] bg-[var(--card-solid)] text-sm font-bold text-[var(--text-primary)] backdrop-blur">
              <img src={Logo} alt="Logo" className="h-10 w-8" />
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

        <nav className="hidden items-center gap-1.5 rounded-full border border-white/18 bg-white/10 p-2 shadow-[0_16px_36px_rgba(255,107,154,0.08)] backdrop-blur-2xl dark:bg-slate-950/18 md:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`group cursor-pointer relative inline-flex h-11 w-11 items-center justify-center rounded-full text-base transition duration-300 ${
                activeSection === item.id && location.pathname === "/"
                  ? "bg-gradient-to-r from-[var(--accent-primary)]/90 to-[var(--accent-secondary)]/90 text-white shadow-[0_10px_24px_rgba(255,107,154,0.28)]"
                  : "text-[var(--text-secondary)] hover:bg-white/40 hover:text-[var(--text-primary)] dark:hover:bg-white/8"
              }`}
              aria-label={item.label}
              title={item.label}
            >
              <span className="text-[1.05rem]">{item.icon}</span>
              <span className="pointer-events-none absolute left-1/2 top-[calc(100%+0.7rem)] hidden -translate-x-1/2 whitespace-nowrap rounded-full border border-[var(--border-soft)] bg-[color:var(--card-solid)] px-3 py-1 text-[11px] font-semibold text-[var(--text-primary)] shadow-[var(--shadow-soft)] group-hover:block">
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div ref={languageMenuRef} className={`relative hidden md:block ${isLanguageMenuOpen ? "z-30" : "z-10"}`}>
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,110,160,0.2),transparent_68%)] blur-2xl" />

            <button
              type="button"
              onClick={() => setIsLanguageMenuOpen((current) => !current)}
              className={`group cursor-pointer relative inline-flex h-13 w-13 items-center justify-center rounded-full border border-white/24 bg-white/12 shadow-[0_18px_40px_rgba(15,23,42,0.18),inset_0_1px_0_rgba(255,255,255,0.32)] backdrop-blur-2xl transition duration-500 dark:bg-slate-950/22 ${
                isLanguageMenuOpen
                  ? "scale-105"
                  : "hover:scale-105"
              }`}
              aria-expanded={isLanguageMenuOpen}
              aria-label={t("common.language")}
            >
              <span className={`pointer-events-none absolute inset-[-0.2rem] rounded-full bg-gradient-to-br ${selectedLanguage.tone} opacity-0 blur-md transition duration-500 ${
                isLanguageMenuOpen ? "opacity-55" : "group-hover:opacity-35"
              }`} />
              <span className="pointer-events-none absolute inset-[1px] rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.3),rgba(255,255,255,0.06))] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.02))]" />
              <span className="pointer-events-none absolute left-2 top-2 h-2.5 w-6 rounded-full bg-white/28 blur-sm" />
              <img
                src={selectedLanguage.asset}
                alt={selectedLanguage.code.toUpperCase()}
                className={`relative h-10 w-10 rounded-full object-cover shadow-[0_10px_22px_rgba(15,23,42,0.22)] transition duration-500 ${
                  isLanguageMenuOpen ? "translate-y-[-1px]" : "translate-y-0"
                }`}
              />
            </button>

            <div className="absolute right-[calc(100%+0.55rem)] top-1/2 z-40 flex -translate-y-1/2 items-center gap-2">
              {languageOptions
                .filter((language) => language.code !== currentLanguage)
                .map((language, index) => (
                <button
                  key={language.code}
                  type="button"
                  onClick={() => handleLanguageChange(language.code)}
                  className={`group cursor-pointer relative inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-white/24 bg-white/12 shadow-[0_16px_34px_rgba(15,23,42,0.14),inset_0_1px_0_rgba(255,255,255,0.28)] backdrop-blur-2xl transition-all duration-500 dark:bg-slate-950/20 ${
                    isLanguageMenuOpen
                      ? "pointer-events-auto translate-x-0 opacity-100"
                      : "pointer-events-none translate-x-6 opacity-0"
                  }`}
                  aria-label={`${t("common.language")}: ${language.code.toUpperCase()}`}
                  style={{
                    transitionDelay: isLanguageMenuOpen ? `${index * 70}ms` : "0ms",
                  }}
                >
                  <span className={`pointer-events-none absolute inset-[-0.2rem] rounded-full bg-gradient-to-br ${language.tone} opacity-0 blur-md transition duration-300 group-hover:opacity-55`} />
                  <span className="pointer-events-none absolute inset-[1px] rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.28),rgba(255,255,255,0.04))] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.01))]" />
                  <span className={`pointer-events-none absolute inset-0 transition duration-500 ${
                    isLanguageMenuOpen ? "animate-[float-petal_5.5s_ease-in-out_infinite]" : ""
                  }`} />
                  <span className="pointer-events-none absolute left-2 top-2 h-2 w-5 rounded-full bg-white/22 blur-sm" />
                  <img
                    src={language.asset}
                    alt={language.code.toUpperCase()}
                    className={`relative h-9 w-9 rounded-full object-cover shadow-[0_10px_22px_rgba(15,23,42,0.18)] transition duration-300 group-hover:-translate-y-1 group-hover:scale-[1.05] ${language.glow}`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div ref={themeMenuRef} className={`relative hidden md:block ${isThemeMenuOpen ? "z-20" : "z-10"}`}>
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(125,211,252,0.18),transparent_68%)] blur-2xl" />

            <button
              type="button"
              onClick={() => setIsThemeMenuOpen((current) => !current)}
              className={`group cursor-pointer relative inline-flex h-13 w-13 items-center justify-center rounded-full border bg-white/12 shadow-[0_18px_40px_rgba(15,23,42,0.18),inset_0_1px_0_rgba(255,255,255,0.32)] backdrop-blur-2xl transition duration-500 dark:bg-slate-950/22 ${
                selectedTheme.activeClass
              } ${isThemeMenuOpen ? "scale-105" : "hover:scale-105"}`}
              aria-expanded={isThemeMenuOpen}
              aria-label={themeToggleLabel}
              title={themeToggleLabel}
            >
              <span className={`pointer-events-none absolute inset-[-0.2rem] rounded-full bg-gradient-to-br ${selectedTheme.tone} opacity-0 blur-md transition duration-500 ${
                isThemeMenuOpen ? "opacity-55" : "group-hover:opacity-35"
              }`} />
              <span className="pointer-events-none absolute inset-[1px] rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.32),rgba(255,255,255,0.08))] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.02))]" />
              <span className="relative text-lg">{selectedTheme.icon}</span>
            </button>

            <div className="absolute left-1/2 top-[calc(100%+0.55rem)] z-30 flex -translate-x-1/2 flex-col items-center gap-2">
              {themeOptions
                .filter((option) => option.id !== theme)
                .map((option, index) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleThemeChange(option.id)}
                    className={`group cursor-pointer relative inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-white/24 bg-white/12 shadow-[0_16px_34px_rgba(15,23,42,0.14),inset_0_1px_0_rgba(255,255,255,0.28)] backdrop-blur-2xl transition-all duration-500 dark:bg-slate-950/20 ${
                      isThemeMenuOpen
                        ? "pointer-events-auto translate-y-0 opacity-100"
                        : "pointer-events-none -translate-y-3 opacity-0"
                    }`}
                    aria-label={option.id === "light" ? t("common.theme.switchToLight") : t("common.theme.switchToDark")}
                    style={{
                      transitionDelay: isThemeMenuOpen ? `${index * 70}ms` : "0ms",
                    }}
                  >
                    <span className={`pointer-events-none absolute inset-[-0.2rem] rounded-full bg-gradient-to-br ${option.tone} opacity-0 blur-md transition duration-300 group-hover:opacity-55`} />
                    <span className="pointer-events-none absolute inset-[1px] rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.28),rgba(255,255,255,0.04))] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.01))]" />
                    <span className="relative text-base text-[var(--text-primary)]">{option.icon}</span>
                  </button>
                ))}
            </div>
          </div>

          <button
            className={`md:hidden inline-flex h-11 w-11 items-center justify-center rounded-[1.25rem] border text-[var(--text-primary)] shadow-[0_16px_36px_rgba(15,23,42,0.12)] backdrop-blur-2xl transition duration-300 ${
              theme === "light"
                ? "border-amber-200/80 bg-[linear-gradient(180deg,#fff4bf_0%,#fde68a_55%,#fbbf24_100%)] text-amber-950"
                : "border-slate-700/90 bg-[linear-gradient(180deg,#334155_0%,#1e293b_55%,#0f172a_100%)] text-white"
            }`}
            onClick={onToggleTheme}
            aria-label={themeToggleLabel}
            title={themeToggleLabel}
            type="button"
          >
            {theme === "light" ? <FaSun /> : <FaMoon />}
          </button>

          <button
            className="inline-flex h-11 w-11 items-center justify-center rounded-[1.25rem] border border-white/18 bg-white/10 text-[var(--text-primary)] shadow-[0_16px_36px_rgba(255,107,154,0.08)] backdrop-blur-2xl dark:bg-slate-950/18 md:hidden"
            onClick={() => setIsMobileMenuOpen((current) => !current)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="mx-4 mt-2 rounded-[1.7rem] border border-white/18 bg-[color:var(--card-bg)]/86 px-4 pb-4 pt-2 shadow-[0_20px_50px_rgba(15,23,42,0.18)] backdrop-blur-3xl md:hidden">
          <div className="mb-3 flex items-center justify-center gap-3 pt-2">
            {languageOptions.map((language) => (
              <button
                key={language.code}
                type="button"
                onClick={() => handleLanguageChange(language.code)}
                className={`group relative flex h-12 w-12 items-center justify-center rounded-full border border-white/24 bg-white/14 shadow-[0_16px_34px_rgba(15,23,42,0.14),inset_0_1px_0_rgba(255,255,255,0.28)] backdrop-blur-2xl transition duration-300 dark:bg-slate-950/20 ${
                  currentLanguage === language.code
                    ? "scale-105"
                    : "hover:-translate-y-0.5"
                }`}
                aria-label={`${t("common.language")}: ${language.code.toUpperCase()}`}
              >
                <span className={`absolute inset-[-0.2rem] rounded-full bg-gradient-to-br ${language.tone} opacity-0 blur-md transition duration-300 ${
                  currentLanguage === language.code ? "opacity-55" : "group-hover:opacity-35"
                }`} />
                <span className="absolute inset-[1px] rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.28),rgba(255,255,255,0.04))] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.01))]" />
                <span className="absolute left-2 top-2 h-2 w-5 rounded-full bg-white/22 blur-sm" />
                <img
                  src={language.asset}
                  alt={language.code.toUpperCase()}
                  className={`relative h-9 w-9 rounded-full object-cover shadow-[0_10px_22px_rgba(15,23,42,0.18)] ${
                    currentLanguage === language.code ? language.glow : ""
                  }`}
                />
                {currentLanguage === language.code ? (
                  <span className="absolute -right-1 -top-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-white text-[9px] text-slate-900 shadow-[0_8px_18px_rgba(15,23,42,0.2)]">
                    <FaCheck />
                  </span>
                ) : null}
              </button>
            ))}
          </div>
          <nav className="grid grid-cols-3 gap-2 pt-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`inline-flex h-14 items-center justify-center rounded-[1.4rem] text-lg transition duration-300 ${
                  activeSection === item.id && location.pathname === "/"
                    ? "bg-gradient-to-r from-[var(--accent-primary)]/90 to-[var(--accent-secondary)]/90 text-white shadow-[0_10px_24px_rgba(255,107,154,0.25)]"
                    : "bg-white/45 text-[var(--text-secondary)] hover:bg-white/60 hover:text-[var(--text-primary)] dark:bg-white/5 dark:hover:bg-white/8"
                }`}
                aria-label={item.label}
                title={item.label}
              >
                {item.icon}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

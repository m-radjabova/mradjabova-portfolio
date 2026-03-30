import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaMoon, FaSun, FaTimes } from "react-icons/fa";
import Logo from "../../../public/logo.png";

type HeaderProps = {
  theme: "light" | "dark";
  onToggleTheme: () => void;
};

const Header = ({ theme, onToggleTheme }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleSectionChange = () => {
      if (location.pathname !== "/") return;
      const sections = ["home", "about", "projects", "contact"];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });

      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", handleSectionChange);
    handleSectionChange();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleSectionChange);
    };
  }, [location.pathname]);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);

    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: sectionId } });
      return;
    }

    const element = document.getElementById(sectionId);
    if (!element) return;

    const headerHeight = 80;
    const elementPosition = element.offsetTop - headerHeight;

    window.scrollTo({
      top: elementPosition,
      behavior: "smooth",
    });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "border-b border-[var(--border-soft)] bg-[color:var(--card-bg)] shadow-[var(--shadow-soft)] backdrop-blur-2xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <button
          onClick={() => handleNavClick("home")}
          className="group flex items-center gap-3 rounded-full px-1 text-left transition-transform duration-300 hover:scale-[1.01]"
        >
          <div className="h-11 w-11 rounded-[1.35rem] ">
            <div className="flex h-full w-full items-center justify-center rounded-[1.25rem] bg-[var(--card-solid)] text-sm font-bold text-[var(--text-primary)] backdrop-blur">
              <img src={Logo} alt="Logo" className="h-10 w-8" />
            </div>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--text-secondary)]">
              Portfolio
            </p>
            <p className="text-base font-semibold text-[var(--text-primary)] transition group-hover:text-[var(--accent-primary)]">
              Muslima Radjabova
            </p>
          </div>
        </button>

        <nav className="hidden items-center gap-1.5 rounded-full border border-[var(--border-soft)] bg-[color:var(--card-bg)] p-2 shadow-[var(--shadow-soft)] backdrop-blur-2xl md:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`group relative rounded-full px-4 py-2.5 text-sm font-medium transition duration-300 ${
                activeSection === item.id && location.pathname === "/"
                  ? "bg-gradient-to-r from-[var(--accent-primary)]/90 to-[var(--accent-secondary)]/90 text-white shadow-[0_10px_24px_rgba(255,107,154,0.28)]"
                  : "text-[var(--text-secondary)] hover:bg-white/40 hover:text-[var(--text-primary)] dark:hover:bg-white/8"
              }`}
            >
              {item.label}
              <span className="absolute inset-x-4 bottom-1 h-px origin-left scale-x-0 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] transition-transform duration-300 group-hover:scale-x-100" />
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            className="hidden h-11 items-center gap-2 rounded-full border border-[var(--border-soft)] bg-[color:var(--card-bg)] px-4 text-sm font-medium text-[var(--text-primary)] shadow-[var(--shadow-soft)] backdrop-blur-2xl transition duration-300 hover:-translate-y-0.5 hover:text-[var(--accent-primary)] md:inline-flex"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? <FaMoon /> : <FaSun />}
            {/* <span>{theme === "light" ? "Dark" : "Light"}</span> */}
          </button>

          <button
            className="inline-flex h-11 w-11 items-center justify-center rounded-[1.25rem] border border-[var(--border-soft)] bg-[color:var(--card-bg)] text-[var(--text-primary)] shadow-[var(--shadow-soft)] backdrop-blur-2xl md:hidden"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button>

          <button
            className="inline-flex h-11 w-11 items-center justify-center rounded-[1.25rem] border border-[var(--border-soft)] bg-[color:var(--card-bg)] text-[var(--text-primary)] shadow-[var(--shadow-soft)] backdrop-blur-2xl md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="border-t border-[var(--border-soft)] bg-[color:var(--card-bg)] px-4 pb-4 pt-2 shadow-[var(--shadow-soft)] backdrop-blur-2xl md:hidden">
          <nav className="flex flex-col gap-2 pt-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`rounded-[1.4rem] px-4 py-3 text-left text-sm font-medium transition duration-300 ${
                  activeSection === item.id && location.pathname === "/"
                    ? "bg-gradient-to-r from-[var(--accent-primary)]/90 to-[var(--accent-secondary)]/90 text-white shadow-[0_10px_24px_rgba(255,107,154,0.25)]"
                    : "bg-white/45 text-[var(--text-secondary)] hover:bg-white/60 hover:text-[var(--text-primary)] dark:bg-white/5 dark:hover:bg-white/8"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

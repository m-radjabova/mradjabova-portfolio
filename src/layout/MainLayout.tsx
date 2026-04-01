import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import sakuraDark from "../assets/sakura_dark.png";
import sakuraLight from "../assets/sakura_light.png";

type ThemeMode = "light" | "dark";

function getInitialTheme(): ThemeMode {
  if (typeof window === "undefined") {
    return "light";
  }

  const storedTheme = window.localStorage.getItem("theme-mode");

  if (storedTheme === "dark" || storedTheme === "light") {
    return storedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export default function MainLayout() {
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.dataset.theme = theme;
    window.localStorage.setItem("theme-mode", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === "light" ? "dark" : "light"));
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-transparent text-[var(--text-primary)]">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div
          className={`absolute inset-0 bg-cover bg-[center_right] bg-no-repeat transition-all duration-500 ${
            theme === "dark"
              ? "brightness-[0.56] saturate-[1.02] contrast-[1.08]"
              : "brightness-[1.03] saturate-[1.02] contrast-[1.01]"
          }`}
          style={{
            backgroundImage: `url(${theme === "dark" ? sakuraDark : sakuraLight})`,
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,250,252,0.64)_0%,rgba(255,245,250,0.42)_30%,rgba(248,247,255,0.14)_62%,rgba(242,247,255,0.22)_100%),linear-gradient(180deg,rgba(255,252,253,0.06)_0%,rgba(255,248,250,0.14)_35%,rgba(244,247,255,0.24)_100%)] dark:bg-[linear-gradient(90deg,rgba(6,10,20,0.68)_0%,rgba(7,14,24,0.42)_30%,rgba(10,19,31,0.16)_62%,rgba(12,22,36,0.28)_100%),linear-gradient(180deg,rgba(3,8,18,0.16)_0%,rgba(7,15,28,0.22)_40%,rgba(8,18,32,0.42)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,115,164,0.1),transparent_24%),radial-gradient(circle_at_82%_18%,rgba(180,216,255,0.14),transparent_24%),radial-gradient(circle_at_bottom_center,rgba(255,255,255,0.04),transparent_34%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(255,115,164,0.12),transparent_24%),radial-gradient(circle_at_82%_18%,rgba(104,214,255,0.16),transparent_22%),radial-gradient(circle_at_bottom_center,rgba(15,23,42,0.1),transparent_38%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(255,255,255,0.2),transparent_18%),radial-gradient(circle_at_70%_12%,rgba(255,255,255,0.14),transparent_18%)] opacity-80 dark:opacity-50" />
      </div>
      <div className="relative z-10">
        <Header theme={theme} onToggleTheme={toggleTheme} />
        <Outlet />
      </div>
    </div>
  );
}

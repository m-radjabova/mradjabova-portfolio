import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import sakuraDark from "../assets/sakura_dark.jpg";
import sakuraLight from "../assets/sakura_light.jpg";

type ThemeMode = "light" | "dark";

export default function MainLayout() {
  const [theme, setTheme] = useState<ThemeMode>("light");

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("theme-mode");
    const initialTheme: ThemeMode =
      storedTheme === "dark" || storedTheme === "light"
        ? storedTheme
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";

    setTheme(initialTheme);
  }, []);

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
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-100 brightness-[0.72] saturate-[0.82] contrast-[0.92] transition-all duration-500 dark:opacity-0 dark:brightness-100 dark:saturate-100 dark:contrast-100"
          style={{ backgroundImage: `url(${sakuraLight})` }}
        />
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-0 brightness-[0.58] saturate-[0.82] contrast-[0.96] transition-all duration-500 dark:opacity-100"
          style={{ backgroundImage: `url(${sakuraDark})` }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,248,250,0.54),rgba(255,243,246,0.58),rgba(253,247,248,0.68))] dark:bg-[linear-gradient(180deg,rgba(2,6,23,0.56),rgba(15,23,42,0.68),rgba(17,24,39,0.76))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,107,154,0.09),transparent_22%),radial-gradient(circle_at_top_right,rgba(243,196,255,0.08),transparent_24%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(255,107,154,0.18),transparent_22%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.22),transparent_24%),radial-gradient(circle_at_center,rgba(15,23,42,0.28),transparent_62%)]" />
      </div>
      <div className="relative z-10">
        <Header theme={theme} onToggleTheme={toggleTheme} />
        <Outlet />
      </div>
    </div>
  );
}

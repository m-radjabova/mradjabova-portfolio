import { useEffect, useState, useRef } from "react";
import { FaGithub, FaPython } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { SiMysql, SiReact, SiTailwindcss } from "react-icons/si";
import { IoCodeSlash } from "react-icons/io5";
import myPhoto from "../../assets/pixar_img.png";
import TypewriterTitle from "./TypewriterTitle";

interface CustomStyle extends React.CSSProperties {
  "--mouse-x": string;
  "--mouse-y": string;
}

const orbitIcons = [
  {
    label: "React",
    className:
      "left-0 top-8 h-24 w-24 rounded-[1.9rem] text-[var(--accent-primary)] animate-orbit-icon",
    icon: <SiReact className="h-12 w-12" />,
    delay: "0s",
  },
  {
    label: "Tailwind",
    className:
      "right-0 top-8 h-24 w-24 rounded-full text-sky-400 animate-orbit-icon",
    icon: <SiTailwindcss className="h-12 w-12" />,
    delay: "0.8s",
  },
  {
    label: "Github",
    className:
      "-left-10 top-1/2 h-22 w-22 -translate-y-1/2 rounded-[1.7rem] text-orange-500 animate-orbit-icon",
    icon: <FaGithub className="h-10 w-10" />,
    delay: "1.6s",
  },
  {
    label: "Python",
    className:
      "-right-10 top-1/2 h-22 w-22 -translate-y-1/2 rounded-full text-yellow-500 animate-orbit-icon",
    icon: <FaPython className="h-10 w-10" />,
    delay: "2.4s",
  },
  {
    label: "SQL",
    className:
      "bottom-0 left-1/2 h-22 w-22 -translate-x-1/2 rounded-[1.7rem] text-violet-500 animate-orbit-icon",
    icon: <SiMysql className="h-10 w-10" />,
    delay: "3.2s",
  },
];

const Hero = () => {
  const { t } = useTranslation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 100,
        y: (event.clientY / window.innerHeight) * 100,
      });

      // Parallax effect on image
      if (imageRef.current) {
        const rect = imageRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (event.clientX - centerX) / 40;
        const deltaY = (event.clientY - centerY) / 40;
        imageRef.current.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-4 pb-16 pt-24 sm:px-6 sm:pb-24 sm:pt-10"
      id="home"
    >
      {/* Ambient background layers */}
      <div
        className="pointer-events-none absolute inset-0"
        style={
          {
            "--mouse-x": `${mousePosition.x}%`,
            "--mouse-y": `${mousePosition.y}%`,
          } as CustomStyle
        }
      >
        {/* Soft gradient overlay */}
        <div className="absolute inset-y-0 left-0 w-[58%] bg-[linear-gradient(90deg,rgba(255,255,255,0.28)_0%,rgba(255,255,255,0.12)_55%,rgba(255,255,255,0)_100%)] dark:bg-[linear-gradient(90deg,rgba(15,23,42,0.22)_0%,rgba(15,23,42,0.08)_55%,rgba(15,23,42,0)_100%)]" />

        {/* Mouse-following spotlight */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(255,95,147,0.08),transparent_16%)] dark:bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(255,115,164,0.1),transparent_16%)]" />

        {/* Glowing orbs */}
        <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-[var(--accent-secondary)]/12 blur-3xl animate-[glow-drift_14s_ease-in-out_infinite]" />
        <div className="absolute right-0 top-6 h-80 w-80 rounded-full bg-[var(--accent-primary)]/10 blur-3xl animate-[glow-drift_16s_ease-in-out_infinite]" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-[var(--accent-tertiary)]/10 blur-3xl animate-[glow-drift_12s_ease-in-out_infinite]" />

        {/* Floating particles (decorative dots) */}
        <div className="absolute left-[15%] top-[20%] h-1.5 w-1.5 rounded-full bg-[var(--accent-primary)]/20 animate-twinkle-soft" />
        <div className="absolute right-[25%] top-[30%] h-2 w-2 rounded-full bg-[var(--accent-secondary)]/15 animate-twinkle-soft" style={{ animationDelay: "1.5s" }} />
        <div className="absolute left-[50%] bottom-[15%] h-1 w-1 rounded-full bg-[var(--accent-tertiary)]/20 animate-twinkle-soft" style={{ animationDelay: "3s" }} />
        <div className="absolute left-[10%] bottom-[40%] h-1.5 w-1.5 rounded-full bg-[var(--accent-primary)]/15 animate-twinkle-soft" style={{ animationDelay: "2.2s" }} />
        <div className="absolute right-[15%] bottom-[25%] h-2 w-2 rounded-full bg-[var(--accent-secondary)]/12 animate-twinkle-soft" style={{ animationDelay: "0.8s" }} />
        <div className="absolute left-[65%] top-[12%] h-1 w-1 rounded-full bg-[var(--accent-tertiary)]/18 animate-twinkle-soft" style={{ animationDelay: "4s" }} />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
        {/* Left column: text content */}
        <div
          className={`relative min-w-0 space-y-6 sm:space-y-8 sm:p-8 lg:p-10 transition-all duration-1000 ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >

          <TypewriterTitle />

          <p className="max-w-2xl text-base leading-7 text-[var(--text-dark)] sm:text-xl sm:leading-8">
            {t("hero.intro")}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <a
              href="#projects"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-6 py-3 font-bold text-white transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)]" />
              <span className="absolute inset-0 bg-gradient-to-r from-[var(--accent-secondary)] to-[var(--accent-primary)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <IoCodeSlash className="relative z-10 h-4 w-4" />
              <span className="relative z-10">{t("hero.cta.explore") || "View Projects"}</span>
            </a>
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-[var(--border-soft)] px-6 py-3 font-semibold text-[var(--text-primary)] transition-all duration-300 hover:border-[var(--accent-primary)]/30 hover:shadow-[0_0_30px_color-mix(in_srgb,var(--accent-primary)_12%,transparent)] hover:scale-[1.03] active:scale-[0.97]"
              style={{
                background: "var(--card-bg)",
                backdropFilter: "blur(12px)",
              }}
            >
              <span className="relative z-10">{"Contact Me"}</span>
            </a>
          </div>

          {/* Stats */}
          <div className="flex gap-3 sm:gap-4 sm:grid-cols-3">
            {[
              ["20+", t("hero.stats.projects")],
              ["2+", t("hero.stats.years")],
            ].map(([value, label]) => (
              <div
                key={label}
                className="group rounded-[1.4rem] border border-[var(--border-soft)] bg-[color:var(--card-bg)] p-4 shadow-[var(--shadow-soft)] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-glow)] sm:rounded-[1.8rem] sm:p-5"
              >
                <p className="text-2xl font-black text-[var(--text-primary)] sm:text-3xl">
                  {value}
                </p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-[var(--text-secondary)] sm:text-sm sm:tracking-[0.24em]">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right column: photo with orbital icons */}
        <div
          className={`relative mx-auto w-full max-w-xl transition-all duration-1000 delay-300 ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-12 opacity-0"
          }`}
        >
          {/* Glow behind photo */}
          <div className="absolute -inset-4 rounded-[2.8rem] bg-gradient-to-br from-[var(--accent-primary)]/18 via-[var(--accent-secondary)]/10 to-[var(--accent-tertiary)]/16 blur-3xl sm:-inset-8" />

          <div className="relative mx-auto flex min-h-[24rem] items-center justify-center sm:min-h-[32rem] lg:min-h-[44rem]">
            {/* Radial overlay */}
            <div className="absolute inset-0 rounded-[3rem] bg-[radial-gradient(circle,rgba(255,255,255,0.3),transparent_60%)] dark:bg-[radial-gradient(circle,rgba(255,255,255,0.08),transparent_60%)]" />

            {/* Orbital icons */}
            <div className="absolute inset-0">
              {orbitIcons.map((item) => (
                <div
                  key={item.label}
                  className={`absolute ${item.className}`}
                  style={{
                    animationDelay: item.delay,
                    animationDuration: `${8 + Math.random() * 4}s`,
                  }}
                >
                  <div className="flex h-full w-full items-center justify-center drop-shadow-[0_10px_22px_rgba(255,107,154,0.18)] transition-all duration-500 hover:scale-110 dark:drop-shadow-[0_10px_22px_rgba(168,85,247,0.18)]">
                    <div className="relative">
                      {item.icon}
                      {/* Glow ring behind icon */}
                      <div className="absolute -inset-3 rounded-full bg-current opacity-10 blur-md" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Photo container */}
            <div
              ref={imageRef}
              className="relative z-10 mx-auto aspect-square w-full max-w-[16rem] transition-transform duration-200 ease-out sm:max-w-[22rem] lg:max-w-[30rem]"
            >
              {/* Decorative ring */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-[var(--accent-primary)]/20 via-[var(--accent-secondary)]/10 to-[var(--accent-tertiary)]/20 p-[2px] animate-spin-slow">
                <div className="h-full w-full rounded-full bg-[var(--bg-base)]" />
              </div>

              {/* Inner ring */}
              <div className="absolute -inset-2 rounded-full border border-[var(--border-soft)]/30" />

              {/* Photo */}
              <div className="relative h-full w-full overflow-hidden rounded-full ring-2 ring-[var(--border-soft)]/50 ring-offset-2 ring-offset-[var(--bg-base)]">
                <img
                  src={myPhoto}
                  alt="Muslima"
                  className="h-full w-full rounded-full object-cover object-center transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

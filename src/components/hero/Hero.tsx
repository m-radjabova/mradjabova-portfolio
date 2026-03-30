import { useEffect, useState } from "react";
import { FaArrowRight, FaGithub, FaPython } from "react-icons/fa";
import { SiMysql, SiReact, SiTailwindcss } from "react-icons/si";
import myPhoto from "../../assets/photo_2025-11-03_08-23-39.jpg";
import TypewriterTitle from "./TypewriterTitle";

interface CustomStyle extends React.CSSProperties {
  "--mouse-x": string;
  "--mouse-y": string;
}

const orbitIcons = [
  {
    label: "React",
    className:
      "left-0 top-8 h-24 w-24 rounded-[1.9rem] text-[var(--accent-primary)] animate-[float-petal_9s_ease-in-out_infinite]",
    icon: <SiReact className="h-12 w-12" />,
  },
  {
    label: "Tailwind",
    className:
      "right-0 top-8 h-24 w-24 rounded-full text-sky-400 animate-[float-petal_11s_ease-in-out_infinite]",
    icon: <SiTailwindcss className="h-12 w-12" />,
  },
  {
    label: "Github",
    className:
      "-left-10 top-1/2 h-22 w-22 -translate-y-1/2 rounded-[1.7rem] text-orange-500 animate-[float-petal_10s_ease-in-out_infinite]",
    icon: <FaGithub className="h-10 w-10" />,
  },
  {
    label: "Python",
    className:
      "-right-10 top-1/2 h-22 w-22 -translate-y-1/2 rounded-full text-yellow-500 animate-[float-petal_12s_ease-in-out_infinite]",
    icon: <FaPython className="h-10 w-10" />,
  },
  {
    label: "SQL",
    className:
      "bottom-0 left-1/2 h-22 w-22 -translate-x-1/2 rounded-[1.7rem] text-violet-500 animate-[float-petal_13s_ease-in-out_infinite]",
    icon: <SiMysql className="h-10 w-10" />,
  }
];

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 100,
        y: (event.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      className="relative overflow-hidden px-4 pb-24 pt-10 sm:px-6"
      id="home"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={
          {
            "--mouse-x": `${mousePosition.x}%`,
            "--mouse-y": `${mousePosition.y}%`,
          } as CustomStyle
        }
      >
        <div className="absolute inset-y-0 left-0 w-[58%] bg-[linear-gradient(90deg,rgba(255,255,255,0.28)_0%,rgba(255,255,255,0.12)_55%,rgba(255,255,255,0)_100%)] dark:bg-[linear-gradient(90deg,rgba(15,23,42,0.22)_0%,rgba(15,23,42,0.08)_55%,rgba(15,23,42,0)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(255,95,147,0.08),transparent_16%)] dark:bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(255,115,164,0.1),transparent_16%)]" />
        <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-[var(--accent-secondary)]/12 blur-3xl animate-[glow-drift_14s_ease-in-out_infinite]" />
        <div className="absolute right-0 top-6 h-80 w-80 rounded-full bg-[var(--accent-primary)]/10 blur-3xl animate-[glow-drift_16s_ease-in-out_infinite]" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-[var(--accent-tertiary)]/10 blur-3xl animate-[glow-drift_12s_ease-in-out_infinite]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
        <div className="relative space-y-8 sm:p-8 lg:p-10">
          <TypewriterTitle />

          <p className="max-w-2xl text-lg leading-8 text-[var(--text-secondary)] sm:text-xl">
            I build responsive, modern and visually strong web interfaces with React,
            TypeScript and Tailwind CSS. My focus is turning design ideas into clean,
            polished and production-ready user experiences.
          </p>

          <div className="grid max-w-xl grid-cols-2 gap-4 sm:grid-cols-3">
            {[
              ["20+", "Projects"],
              ["2+", "Years"]
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-[1.8rem] border border-[var(--border-soft)] bg-[color:var(--card-bg)] p-5 shadow-[var(--shadow-soft)] backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-glow)]"
              >
                <p className="text-3xl font-black text-[var(--text-primary)]">{value}</p>
                <p className="mt-1 text-sm uppercase tracking-[0.24em] text-[var(--text-secondary)]">
                  {label}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_36px_rgba(255,107,154,0.28)] transition duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_20px_40px_rgba(255,107,154,0.34)]"
            >
              Explore Projects
              <FaArrowRight />
            </a>
            <a
              href="https://github.com/m-radjabova"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border-soft)] bg-[color:var(--card-bg)] px-6 py-3 text-sm font-semibold text-[var(--text-primary)] shadow-[var(--shadow-soft)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[var(--accent-primary)]/35 hover:text-[var(--accent-primary)]"
            >
              <FaGithub />
              GitHub
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl animate-[fade-up_1s_ease-out_both]">
          <div className="absolute -inset-8 rounded-[2.8rem] bg-gradient-to-br from-[var(--accent-primary)]/18 via-[var(--accent-secondary)]/10 to-[var(--accent-tertiary)]/16 blur-3xl" />

          <div className="relative mx-auto flex min-h-[44rem] items-center justify-center">
            <div className="absolute inset-0 rounded-[3rem] bg-[radial-gradient(circle,rgba(255,255,255,0.3),transparent_60%)] dark:bg-[radial-gradient(circle,rgba(255,255,255,0.08),transparent_60%)]" />

            <div className="absolute inset-0">
              {orbitIcons.map((item) => (
                <div key={item.label} className={`absolute ${item.className}`}>
                  <div className="flex h-full w-full items-center justify-center drop-shadow-[0_10px_22px_rgba(255,107,154,0.18)] dark:drop-shadow-[0_10px_22px_rgba(168,85,247,0.18)]">
                    {item.icon}
                  </div>
                </div>
              ))}
            </div>

            <div className="relative z-10 mx-auto aspect-square w-full max-w-[24rem] sm:max-w-[30rem]">
              <div className="absolute -inset-8 rounded-full " />
              <div className="relative h-full w-full overflow-hidden rounded-full ">
                <img
                  src={myPhoto}
                  alt="Muslima"
                  className="h-full w-full rounded-full object-cover object-center"
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

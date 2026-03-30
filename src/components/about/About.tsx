import { useState } from "react";
import {
  FaCode,
  FaFigma,
  FaGitAlt,
  FaGraduationCap,
  FaHeart,
  FaJs,
  FaPython,
  FaReact,
} from "react-icons/fa";
import {
  SiCss3,
  SiFastapi,
  SiHtml5,
  SiPostgresql,
  SiTailwindcss,
  SiTypescript,
  SiVite,
} from "react-icons/si";

const About = () => {
  const [activeTab, setActiveTab] = useState("skills");

  const skills = [
    { name: "React", level: 90, icon: <FaReact />, tone: "from-cyan-400 to-sky-500" },
    { name: "JavaScript", level: 90, icon: <FaJs />, tone: "from-amber-300 to-yellow-500" },
    { name: "TypeScript", level: 90, icon: <SiTypescript />, tone: "from-blue-500 to-indigo-500" },
    { name: "Python", level: 86, icon: <FaPython />, tone: "from-sky-500 to-amber-400" },
    { name: "HTML5", level: 95, icon: <SiHtml5 />, tone: "from-orange-400 to-red-500" },
    { name: "CSS3", level: 100, icon: <SiCss3 />, tone: "from-sky-400 to-blue-600" },
    { name: "Tailwind", level: 85, icon: <SiTailwindcss />, tone: "from-cyan-400 to-teal-500" },
    { name: "Vite", level: 80, icon: <SiVite />, tone: "from-violet-400 to-fuchsia-500" },
    { name: "FastAPI", level: 82, icon: <SiFastapi />, tone: "from-emerald-400 to-teal-500" },
    { name: "PostgreSQL", level: 80, icon: <SiPostgresql />, tone: "from-blue-500 to-cyan-400" },
    { name: "UI/UX Design", level: 90, icon: <FaFigma />, tone: "from-pink-400 to-rose-500" },
    { name: "Git", level: 85, icon: <FaGitAlt />, tone: "from-orange-500 to-rose-500" },
  ];

  const education = [
    {
      year: "2023 - Present",
      degree: "Programming Technology",
      institution: "Asia International University (AIU)",
      description:
        "Bachelor's degree focused on software development, algorithms, system thinking and practical engineering fundamentals.",
      icon: <FaGraduationCap />,
    },
  ];

  return (
    <section id="about" className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,107,154,0.08),transparent_25%),radial-gradient(circle_at_80%_30%,rgba(168,85,247,0.06),transparent_25%)] dark:bg-[radial-gradient(circle_at_20%_20%,rgba(255,107,154,0.14),transparent_25%),radial-gradient(circle_at_80%_30%,rgba(168,85,247,0.12),transparent_25%)]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center animate-[fade-up_0.8s_ease-out_both]">
          <h2 className="mt-6 text-4xl font-black tracking-[-0.03em] text-[var(--text-primary)] sm:text-5xl">
            Building polished interfaces with
            <span className="bg-gradient-to-r from-[var(--accent-gradient-from)] via-[var(--accent-gradient-via)] to-[var(--accent-gradient-to)] bg-clip-text text-transparent">
              {" "}
              clean front-end systems
            </span>
          </h2>
          <p className="mt-4 text-lg leading-8 text-[var(--text-secondary)]">
            I enjoy turning visual ideas into responsive, reliable and modern
            products. My workflow combines interface design sensitivity with
            practical engineering decisions.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2.25rem] border border-[var(--border-soft)] bg-[color:var(--card-bg)] p-8 shadow-[var(--shadow-soft)] backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-glow)]">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] text-2xl text-white shadow-[0_16px_34px_rgba(255,107,154,0.28)]">
                <FaHeart />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-[var(--text-secondary)]">
                  Personal profile
                </p>
                <h3 className="mt-1 text-2xl font-bold text-[var(--text-primary)]">
                  Muslima Radjabova
                </h3>
              </div>
            </div>

            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent-primary)]">
                Frontend Developer & UI/UX Designer
              </p>
              <p className="text-base leading-8 text-[var(--text-secondary)]">
                I specialize in building beautiful, functional and user-centered
                web experiences. I work comfortably across layout systems,
                component architecture and visual refinement.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  "Responsive landing pages",
                  "Component-based React apps",
                  "Design-to-code translation",
                  "Strong visual hierarchy",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.35rem] border border-[var(--border-soft)] bg-white/78 px-4 py-3 text-sm text-[var(--text-secondary)] backdrop-blur-xl dark:bg-white/5"
                  >
                    {item}
                  </div>
                ))}
              </div>
              <div className="inline-flex items-center gap-3 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-500 dark:text-emerald-300">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
                Available for projects
              </div>
            </div>
          </div>

          <div className="rounded-[2.25rem] border border-[var(--border-soft)] bg-[color:var(--card-bg)] p-6 shadow-[var(--shadow-soft)] backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-glow)]">
            <div className="mb-6 flex flex-wrap gap-3">
              <button
                className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition duration-300 ${
                  activeTab === "skills"
                    ? "bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white shadow-[0_12px_28px_rgba(255,107,154,0.24)]"
                    : "border border-[var(--border-soft)] bg-white/78 text-[var(--text-secondary)] hover:bg-white/90 hover:text-[var(--text-primary)] dark:bg-white/5 dark:hover:bg-white/8"
                }`}
                onClick={() => setActiveTab("skills")}
              >
                <FaCode />
                Skills
              </button>
              <button
                className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition duration-300 ${
                  activeTab === "education"
                    ? "bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white shadow-[0_12px_28px_rgba(255,107,154,0.24)]"
                    : "border border-[var(--border-soft)] bg-white/78 text-[var(--text-secondary)] hover:bg-white/90 hover:text-[var(--text-primary)] dark:bg-white/5 dark:hover:bg-white/8"
                }`}
                onClick={() => setActiveTab("education")}
              >
                <FaGraduationCap />
                Education
              </button>
            </div>

            {activeTab === "skills" && (
              <div className="grid gap-4 md:grid-cols-2">
                {skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="rounded-[1.8rem] border border-[var(--border-soft)] bg-white/78 p-5 shadow-[0_10px_24px_rgba(255,107,154,0.08)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 dark:bg-white/5"
                  >
                    <div className="mb-4 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${skill.tone} text-lg text-white`}
                        >
                          {skill.icon}
                        </div>
                        <span className="font-semibold text-[var(--text-primary)]">{skill.name}</span>
                      </div>
                      <span className="text-sm font-semibold text-[var(--text-secondary)]">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-[var(--border-soft)]">
                      <div
                        className={`h-2 rounded-full bg-gradient-to-r ${skill.tone}`}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "education" && (
              <div className="space-y-4">
                {education.map((edu) => (
                  <div
                    key={edu.degree}
                    className="rounded-[1.8rem] border border-[var(--border-soft)] bg-white/78 p-6 shadow-[0_10px_24px_rgba(255,107,154,0.08)] backdrop-blur-xl dark:bg-white/5"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] text-xl text-white">
                        {edu.icon}
                      </div>
                      <div>
                        <p className="text-sm uppercase tracking-[0.24em] text-[var(--accent-primary)]">
                          {edu.year}
                        </p>
                        <h4 className="mt-2 text-xl font-bold text-[var(--text-primary)]">
                          {edu.degree}
                        </h4>
                        <p className="mt-1 text-sm font-semibold text-[var(--text-secondary)]">
                          {edu.institution}
                        </p>
                        <p className="mt-3 leading-7 text-[var(--text-secondary)]">
                          {edu.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

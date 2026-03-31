import type { ReactElement } from "react";
import {
  FaFigma,
  FaGitAlt,
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

export type SkillItem = {
  name: string;
  level: number;
  icon: ReactElement;
  tone: string;
};

export const skills: SkillItem[] = [
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
] as const;

import type { ReactElement } from "react";
import {
  FaCode,
  FaFigma,
  FaGitAlt,
  FaJs,
  FaPython,
  FaReact,
} from "react-icons/fa";
import {
  SiFastapi,
  SiHtml5,
  SiCss3,
  SiFirebase,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiTailwindcss,
  SiTypescript,
  SiVite,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

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
  { name: "Next.js", level: 85, icon: <SiNextdotjs />, tone: "from-slate-700 to-black" },
  { name: "Node.js", level: 80, icon: <SiNodedotjs />, tone: "from-lime-500 to-green-600" },
] as const;

export const otherSkills = [
  { name: "Git & GitHub", icon: <FaGitAlt /> },
  { name: "FastAPI", icon: <SiFastapi /> },
  { name: "PostgreSQL", icon: <SiPostgresql /> },
  { name: "Firebase", icon: <SiFirebase /> },
  { name: "Figma", icon: <FaFigma /> },
  { name: "VS Code", icon: <VscVscode /> },
  { name: "CSS", icon: <SiCss3 /> },
  { name: "HTML", icon: <FaCode /> },
] as const;

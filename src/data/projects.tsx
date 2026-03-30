import type { ReactElement } from "react";
import { FaIceCream, FaStar, FaUtensils } from "react-icons/fa";
import { LuFlower } from "react-icons/lu";

import photo1 from "../assets/Снимок экрана 2025-11-01 201302.png";
import photo2 from "../assets/Снимок экрана 2025-11-01 201336.png";
import photo3 from "../assets/Снимок экрана 2025-11-01 201350.png";
import photo4 from "../assets/Снимок экрана 2025-11-01 201416.png";
import photo5 from "../assets/Снимок экрана 2025-11-01 201436.png";
import photo6 from "../assets/Снимок экрана 2025-11-01 201452.png";
import photo7 from "../assets/Снимок экрана 2025-11-01 201506.png";
import photo8 from "../assets/Снимок экрана 2025-11-01 201527.png";
import photo9 from "../assets/Снимок экрана 2025-11-01 201540.png";
import photo10 from "../assets/Снимок экрана 2025-11-01 201557.png";
import photo11 from "../assets/Снимок экрана 2025-11-01 201618.png";
import photo12 from "../assets/Снимок экрана 2025-11-01 201741.png";
import photo13 from "../assets/Снимок экрана 2025-11-01 201804.png";
import photo14 from "../assets/Снимок экрана 2025-11-01 201819.png";

import meal1 from "../assets/Снимок экрана 2025-11-01 204005.png";
import meal2 from "../assets/Снимок экрана 2025-11-01 204018.png";
import meal3 from "../assets/Снимок экрана 2025-11-01 204037.png";
import meal4 from "../assets/Снимок экрана 2025-11-01 204050.png";
import meal5 from "../assets/Снимок экрана 2025-11-01 204108.png";
import meal6 from "../assets/Снимок экрана 2025-11-01 204208.png";
import meal7 from "../assets/Снимок экрана 2025-11-01 204223.png";

import ice1 from "../assets/Снимок экрана 2025-11-01 205140.png";
import ice2 from "../assets/Снимок экрана 2025-11-01 205156.png";
import ice3 from "../assets/Снимок экрана 2025-11-01 205209.png";
import ice4 from "../assets/Снимок экрана 2025-11-01 205222.png";
import ice5 from "../assets/Снимок экрана 2025-11-01 205241.png";
import ice6 from "../assets/Снимок экрана 2025-11-01 205301.png";
import ice7 from "../assets/Снимок экрана 2025-11-01 205325.png";
import ice8 from "../assets/Снимок экрана 2025-11-01 205348.png";
import ice9 from "../assets/Снимок экрана 2025-11-01 205415.png";
import ice10 from "../assets/Снимок экрана 2025-11-01 205432.png";
import ice11 from "../assets/Снимок экрана 2025-11-01 205529.png";

export type LocalProject = {
  id: number;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  images: string[];
  technologies: string[];
  liveLink: string;
  githubLink: string;
  icon: ReactElement;
  accentColor: string;
  stats: string;
  category: string;
  features: string[];
};

export const localProjects: LocalProject[] = [
  {
    id: 1,
    slug: "floral-elegance",
    title: "Floral Elegance",
    shortDescription: "Elegant flower shop landing page with premium visual direction.",
    description:
      "A refined flower shop experience built around strong product presentation, rich screenshots and a polished responsive layout.",
    images: [photo1, photo2, photo3, photo4, photo5, photo6, photo7, photo8, photo9, photo10, photo11, photo12, photo13, photo14],
    technologies: ["React", "TypeScript", "CSS", "Bootstrap", "Figma"],
    liveLink: "",
    githubLink: "https://github.com/m-radjabova/vite-project.git",
    icon: <LuFlower />,
    accentColor: "#ff8fab",
    stats: "14 screenshots",
    category: "Frontend UI",
    features: ["Responsive landing sections", "Brand-driven hero layout", "Product showcase blocks", "UI based on Figma"],
  },
  {
    id: 2,
    slug: "culinary-master",
    title: "Culinary Master",
    shortDescription: "Meal and recipe UI designed for clear hierarchy and conversion.",
    description:
      "A warm and bold food interface focused on recipe discovery, section hierarchy and strong call-to-action placement.",
    images: [meal1, meal2, meal3, meal4, meal5, meal6, meal7],
    technologies: ["React", "TypeScript", "CSS", "Bootstrap", "Figma"],
    liveLink: "",
    githubLink: "https://github.com/m-radjabova/vite-project.git",
    icon: <FaUtensils />,
    accentColor: "#f59e0b",
    stats: "7 screenshots",
    category: "Food UI",
    features: ["Recipe-first layout", "Category navigation", "Warm branded palette", "Responsive marketing sections"],
  },
  {
    id: 3,
    slug: "frozen-delights",
    title: "Frozen Delights",
    shortDescription: "Playful dessert brand interface with soft gradients and product imagery.",
    description:
      "A bright and playful website concept for an ice cream brand, using softer color transitions, product framing and high-impact visuals.",
    images: [ice1, ice2, ice3, ice4, ice5, ice6, ice7, ice8, ice9, ice10, ice11],
    technologies: ["React", "TypeScript", "CSS", "Bootstrap", "Figma"],
    liveLink: "",
    githubLink: "https://github.com/m-radjabova/vite-project.git",
    icon: <FaIceCream />,
    accentColor: "#60a5fa",
    stats: "11 screenshots",
    category: "Brand UI",
    features: ["Soft pastel art direction", "Product storytelling", "Animated presentation blocks", "Responsive showcase design"],
  },
];

export const getLocalProjectBySlug = (slug?: string) =>
  localProjects.find((project) => project.slug === slug);

export const localProjectHighlights = [
  {
    title: "Design-focused builds",
    value: "3 projects",
    icon: <FaStar />,
  },
  {
    title: "Total screenshots",
    value: `${localProjects.reduce((sum, project) => sum + project.images.length, 0)}`,
    icon: <FaStar />,
  },
];

import { useSearchParams } from "react-router-dom";
import About from "../../components/about/About";
import Contact from "../../components/contact/Contact";
import Hero from "../../components/hero/Hero";
import Projects from "../../components/projects/Projects";
import ResumeSection from "../../components/resume/ResumeSection";
import SkillsCarousel from "../../components/skills/SkillsCarousel";

type SectionId = "home" | "skills" | "about" | "projects" | "resume" | "contact";

const validSections: SectionId[] = ["home", "skills", "about", "projects", "resume", "contact"];

function Home() {
  const [searchParams] = useSearchParams();
  const sectionParam = searchParams.get("section");
  const activeSection: SectionId =
    sectionParam && validSections.includes(sectionParam as SectionId)
      ? (sectionParam as SectionId)
      : "home";

  const renderActiveSection = () => {
    switch (activeSection) {
      case "skills":
        return <SkillsCarousel />;
      case "about":
        return <About />;
      case "projects":
        return <Projects />;
      case "resume":
        return <ResumeSection />;
      case "contact":
        return <Contact />;
      case "home":
      default:
        return <Hero />;
    }
  };

  return <div key={activeSection} className=" animate-[fade-up_0.45s_ease-out_both]">{renderActiveSection()}</div>;
}

export default Home;

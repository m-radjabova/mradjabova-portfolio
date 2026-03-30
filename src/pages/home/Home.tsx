import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import About from "../../components/about/About";
import Contact from "../../components/contact/Contact";
import Hero from "../../components/hero/Hero";
import Projects from "../../components/projects/Projects";

function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null;
    if (!state?.scrollTo) return;

    const timer = window.setTimeout(() => {
      document.getElementById(state.scrollTo || "")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      navigate(location.pathname, { replace: true, state: null });
    }, 100);

    return () => window.clearTimeout(timer);
  }, [location.pathname, location.state, navigate]);

  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Contact />
    </>
  );
}

export default Home;

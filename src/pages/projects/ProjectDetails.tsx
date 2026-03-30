import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { SiBootstrap, SiCss3, SiFigma, SiReact, SiTypescript } from "react-icons/si";
import NotFound from "../../components/NotFound";
import { getLocalProjectBySlug } from "../../data/projects";

const techIcons = {
  react: <SiReact />,
  typescript: <SiTypescript />,
  bootstrap: <SiBootstrap />,
  figma: <SiFigma />,
  css: <SiCss3 />,
};

function ProjectDetails() {
  const { slug } = useParams();
  const project = useMemo(() => getLocalProjectBySlug(slug), [slug]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [slug]);

  if (!project) {
    return <NotFound />;
  }

  const safeCurrentIndex = Math.min(currentIndex, project.images.length - 1);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === project.images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? project.images.length - 1 : prev - 1));
  };

  return (
    <section className="relative px-4 pb-20 pt-32 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,107,154,0.08),transparent_22%),radial-gradient(circle_at_top_right,rgba(243,196,255,0.08),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.08),transparent)] dark:bg-[radial-gradient(circle_at_top_left,rgba(255,107,154,0.14),transparent_22%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.16),transparent_22%),linear-gradient(180deg,rgba(2,6,23,0.18),rgba(15,23,42,0.3))]" />
      <div className="relative mx-auto max-w-7xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full border border-[var(--border-soft)] bg-[color:var(--card-bg)] px-5 py-3 text-sm font-semibold text-[var(--text-primary)] shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5 hover:border-[var(--accent-primary)]/35 hover:text-[var(--accent-primary)]"
        >
          <FaArrowLeft />
          Back to home
        </Link>

        <div className="mt-8 grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="overflow-hidden rounded-[2rem] border border-[var(--border-soft)] bg-[color:var(--card-bg)] p-5 shadow-[var(--shadow-soft)] backdrop-blur-xl">
            <div className="relative overflow-hidden rounded-[1.5rem] border border-[var(--border-soft)] bg-[var(--bg-soft)]">
              <img
                src={project.images[safeCurrentIndex]}
                alt={`${project.title} screenshot ${safeCurrentIndex + 1}`}
                className="aspect-[16/10] w-full object-contain"
              />
              {project.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--border-soft)] bg-slate-950/70 text-white backdrop-blur transition hover:bg-slate-900"
                  >
                    <FaArrowLeft />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--border-soft)] bg-slate-950/70 text-white backdrop-blur transition hover:bg-slate-900"
                  >
                    <FaArrowRight />
                  </button>
                </>
              )}
            </div>

            <div className="mt-5 flex items-center justify-between text-sm text-[var(--text-secondary)]">
              <span>
                Screenshot {safeCurrentIndex + 1} / {project.images.length}
              </span>
              <span>{project.stats}</span>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-4">
              {project.images.map((image, index) => (
                <button
                  key={`${project.slug}-${index}`}
                  onClick={() => setCurrentIndex(index)}
                  className={`overflow-hidden rounded-2xl border transition ${
                    safeCurrentIndex === index
                      ? "border-[var(--accent-primary)]"
                      : "border-[var(--border-soft)] hover:border-[var(--accent-primary)]/35"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${project.title} thumbnail ${index + 1}`}
                    className="aspect-[4/3] w-full object-cover object-top"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] border border-[var(--border-soft)] bg-[color:var(--card-bg)] p-8 shadow-[var(--shadow-soft)] backdrop-blur-xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-soft)] bg-white/70 px-4 py-2 text-sm font-medium text-[var(--text-primary)] dark:bg-white/5">
                <span style={{ color: project.accentColor }}>{project.icon}</span>
                {project.category}
              </div>

              <h1 className="mt-5 text-4xl font-black text-[var(--text-primary)]">{project.title}</h1>
              <p className="mt-4 text-lg leading-8 text-[var(--text-secondary)]">{project.description}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--border-soft)] bg-white/72 px-4 py-2 text-sm text-[var(--text-primary)] dark:bg-white/5"
                  >
                    {techIcons[tech.toLowerCase() as keyof typeof techIcons] || <SiReact />}
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--border-soft)] bg-white/82 px-5 py-3 text-sm font-semibold text-[var(--text-primary)] shadow-[0_10px_24px_rgba(255,107,154,0.08)] transition duration-300 hover:-translate-y-0.5 hover:border-[var(--accent-primary)]/35 hover:text-[var(--accent-primary)] dark:bg-white/5"
                  >
                    <FaGithub />
                    Source Code
                  </a>
                )}
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(255,107,154,0.22)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(255,107,154,0.28)]"
                  >
                    <FaExternalLinkAlt />
                    Live Demo
                  </a>
                )}
              </div>
            </div>

            <div className="rounded-[2rem] border border-[var(--border-soft)] bg-[color:var(--card-bg)] p-8 shadow-[var(--shadow-soft)] backdrop-blur-xl">
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">Key features</h2>
              <div className="mt-5 space-y-3">
                {project.features.map((feature) => (
                  <div
                    key={feature}
                    className="rounded-2xl border border-[var(--border-soft)] bg-white/72 px-4 py-3 text-[var(--text-secondary)] dark:bg-white/5"
                  >
                    {feature}
                  </div>
                ))}
              </div>
              {project.note && (
                <div className="mt-5 rounded-2xl border border-[var(--border-soft)] bg-white/72 px-4 py-3 text-[var(--text-secondary)] dark:bg-white/5">
                  <strong>Note:</strong> {project.note}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProjectDetails;

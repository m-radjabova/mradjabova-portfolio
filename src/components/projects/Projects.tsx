import WithoutBackend from "./WithoutBackend";
import WithBackend from "./WithBackend";

function Projects() {
  return (
    <section id="projects" className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(168,85,247,0.06),transparent_25%),radial-gradient(circle_at_90%_20%,rgba(255,107,154,0.08),transparent_30%),linear-gradient(180deg,transparent,rgba(255,255,255,0.2))] dark:bg-[radial-gradient(circle_at_10%_20%,rgba(168,85,247,0.12),transparent_25%),radial-gradient(circle_at_90%_20%,rgba(255,107,154,0.14),transparent_30%),linear-gradient(180deg,transparent,rgba(15,23,42,0.52))]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center animate-[fade-up_0.8s_ease-out_both]">
          <h2 className="mt-6 text-4xl font-black tracking-[-0.03em] text-[var(--text-primary)] sm:text-5xl">
            Featured work with
            <span className="bg-gradient-to-r from-[var(--accent-gradient-from)] via-[var(--accent-gradient-via)] to-[var(--accent-gradient-to)] bg-clip-text text-transparent">
              {" "}
              strong visuals and usable structure
            </span>
          </h2>
          <p className="mt-4 text-lg leading-8 text-[var(--text-secondary)]">
            Frontend showcase projects and dynamic app projects are separated below.
            Local showcase cards now open their own detail page with all screenshots.
          </p>
        </div>

        <div className="mt-16">
          <WithoutBackend />
        </div>

        <div className="mt-16">
          <WithBackend />
        </div>
      </div>
    </section>
  );
}

export default Projects;

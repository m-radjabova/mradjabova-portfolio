import { useEffect, useState, type ReactElement, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { createPortal } from "react-dom";

type ProjectAction = {
  href?: string;
  to?: string;
  label: string;
  icon: ReactNode;
  variant: "primary" | "secondary";
};

type ProjectShowcaseCardProps = {
  title: string;
  shortDescription: string;
  description: string;
  image: string;
  imageAlt: string;
  badge: string;
  badgeIcon: ReactElement;
  badgeAccent?: string;
  technologies: string[];
  techIcons: Record<string, ReactElement>;
  stats?: string;
  actions: ProjectAction[];
  previewHref?: string;
};

function ProjectActionButton({ action }: { action: ProjectAction }) {
  const baseClassName =
    action.variant === "primary"
      ? "project-card-cta project-card-cta-primary"
      : "project-card-cta project-card-cta-secondary";

  const content = (
    <>
      <span className="text-sm transition duration-300 group-hover:translate-x-0.5">{action.icon}</span>
      <span>{action.label}</span>
    </>
  );

  if (action.to) {
    return (
      <Link to={action.to} className={`${baseClassName} group`}>
        {content}
      </Link>
    );
  }

  return (
    <a href={action.href} target="_blank" rel="noopener noreferrer" className={`${baseClassName} group`}>
      {content}
    </a>
  );
}

function ProjectShowcaseCard({
  title,
  shortDescription,
  description,
  image,
  imageAlt,
  badge,
  badgeIcon,
  badgeAccent,
  technologies,
  techIcons,
  stats,
  actions,
  previewHref,
}: ProjectShowcaseCardProps) {
  const { t } = useTranslation();
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  useEffect(() => {
    if (!isDetailsOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsDetailsOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isDetailsOpen]);

  const previewContent = (
    <div className="project-card-media relative overflow-hidden rounded-[1.55rem]">
      <img
        src={image}
        alt={imageAlt}
        className="h-56 w-full object-cover object-top transition duration-700 group-hover:scale-[1.06] sm:h-64"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,10,20,0.08),rgba(6,10,20,0.3)_44%,rgba(6,10,20,0.82)_100%)]" />

      <div className="absolute inset-x-0 top-0 h-14 bg-[linear-gradient(180deg,rgba(255,255,255,0.42),transparent)] opacity-80" />

      <div className="absolute left-4 top-4 flex max-w-[calc(100%-2rem)] items-center gap-3 rounded-full border border-white/20 bg-black/20 px-4 py-2 text-xs font-semibold text-white/92 backdrop-blur-xl sm:left-5 sm:top-5">
        <span
          className="project-card-badge-icon inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/14 text-base shadow-[0_0_24px_rgba(255,255,255,0.14)]"
          style={badgeAccent ? { color: badgeAccent } : undefined}
        >
          {badgeIcon}
        </span>
        <span className="truncate uppercase tracking-[0.18em] text-white/78">{badge}</span>
      </div>

      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-end justify-between gap-3 sm:bottom-5 sm:left-5 sm:right-5">
        <div className="flex max-w-full flex-wrap gap-2">
          {technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center gap-2 rounded-full border border-white/16 bg-white/10 px-3 py-1.5 text-[11px] font-medium text-white/92 backdrop-blur-xl"
            >
              {techIcons[tech.toLowerCase()] || badgeIcon}
              <span>{tech}</span>
            </span>
          ))}
        </div>

        {stats && (
          <span className="rounded-full border border-white/14 bg-black/20 px-3 py-1.5 text-[11px] font-medium tracking-[0.14em] text-white/72 backdrop-blur-xl">
            {stats}
          </span>
        )}
      </div>
    </div>
  );

  return (
    <article className="project-card group flex h-full flex-col">
      <div className="project-card-glow" aria-hidden="true" />
      <div className="project-card-shine" aria-hidden="true" />

      {previewHref ? (
        <a href={previewHref} target="_blank" rel="noopener noreferrer" className="block">
          {previewContent}
        </a>
      ) : (
        previewContent
      )}

      <div className="flex flex-1 flex-col gap-6 px-5 pb-5 pt-6 sm:px-6 sm:pb-6">
        <div className="flex min-h-[13rem] flex-1 flex-col gap-4">
          <div className="space-y-3">
            <h4 className="text-[1.75rem] font-black leading-[1.05] tracking-[-0.04em] text-[var(--text-primary)] sm:text-[2rem]">
              {title}
            </h4>
            <p className="text-sm leading-7 text-[var(--text-secondary)] sm:text-[15px]">
              {shortDescription}
            </p>
          </div>

          <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">
            <button
              type="button"
              onClick={() => setIsDetailsOpen(true)}
              className="inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-[var(--accent-secondary)] transition duration-300 hover:text-[var(--accent-primary)]"
            >
              {t("projects.actions.showDescription")}
              <FaChevronDown />
            </button>
            <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]/82">
              {shortDescription}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          {actions.map((action) => (
            <ProjectActionButton key={action.label} action={action} />
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-white/8 pt-1 text-xs uppercase tracking-[0.18em] text-[var(--text-secondary)]/80">
          <span>{badge}</span>
          <span className="inline-flex items-center gap-2 text-[var(--accent-tertiary)]">
            {t("projects.actions.openPage")}
            <FaArrowRight className="transition duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>

      {isDetailsOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[120] flex items-end justify-center bg-slate-950/56 px-4 pb-4 pt-16 backdrop-blur-md sm:items-center sm:p-6"
            onClick={() => setIsDetailsOpen(false)}
          >
            <div
              className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.04)),color-mix(in_srgb,var(--card-solid)_92%,transparent)] shadow-[0_30px_120px_rgba(5,10,24,0.45)] backdrop-blur-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-tertiary)] shadow-[0_0_24px_rgba(255,130,185,0.45)]" />

              <div className="flex items-start justify-between gap-4 border-b border-white/8 px-5 pb-4 pt-6 sm:px-7">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/6 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)]">
                    <span
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/8 text-sm"
                      style={badgeAccent ? { color: badgeAccent } : undefined}
                    >
                      {badgeIcon}
                    </span>
                    <span>{badge}</span>
                  </div>
                  <h5 className="text-2xl font-black tracking-[-0.04em] text-[var(--text-primary)] sm:text-3xl">{title}</h5>
                </div>

                <button
                  type="button"
                  onClick={() => setIsDetailsOpen(false)}
                  className="inline-flex cursor-pointer h-11 min-w-11 items-center justify-center rounded-full border border-white/10 bg-white/6 px-4 text-sm font-semibold text-[var(--text-primary)] transition duration-300 hover:border-[var(--accent-primary)]/30 hover:text-[var(--accent-primary)]"
                >
                  {t("projects.actions.hideDescription")}
                  <FaChevronUp className="ml-2" />
                </button>
              </div>

              <div className="space-y-5 px-5 py-5 sm:px-7 sm:py-6">
                <p className="text-base leading-8 text-[var(--text-secondary)]">{description}</p>

                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-3.5 py-2 text-xs font-semibold text-[var(--text-primary)]"
                    >
                      {techIcons[tech.toLowerCase()] || badgeIcon}
                      <span>{tech}</span>
                    </span>
                  ))}
                </div>

                <div className="flex flex-col gap-3 border-t border-white/8 pt-5 sm:flex-row">
                  {actions.map((action) => (
                    <ProjectActionButton key={`modal-${action.label}`} action={action} />
                  ))}
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </article>
  );
}

export default ProjectShowcaseCard;

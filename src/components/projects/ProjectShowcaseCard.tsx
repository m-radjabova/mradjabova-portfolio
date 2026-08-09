import { useEffect, useState, useRef, type ReactElement, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaChevronDown, FaTimes, FaStar } from "react-icons/fa";
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

/* ── Action Button ── */
function ProjectActionButton({ action }: { action: ProjectAction }) {
  const isPrimary = action.variant === "primary";

  const baseClasses = `group/action relative inline-flex min-h-[2.9rem] flex-1 items-center justify-center gap-2 overflow-hidden rounded-xl px-5 text-sm font-semibold tracking-[-0.01em] transition-all duration-300 ease-out lg:flex-none lg:px-6 ${
    isPrimary
      ? "text-white shadow-[0_8px_24px_-8px_var(--accent-primary)]"
      : "border border-[var(--border-soft)]/50 bg-white/[0.03] text-[var(--text-primary)]/85"
  }`;

  const hoverClasses = isPrimary
    ? "hover:-translate-y-0.5 hover:shadow-[0_14px_32px_-8px_var(--accent-primary)] active:translate-y-0"
    : "hover:-translate-y-0.5 hover:border-[var(--accent-primary)]/30 hover:bg-white/[0.06] hover:text-[var(--accent-primary)] active:translate-y-0";

  const buttonContent = (
    <>
      {isPrimary && (
        <span className="absolute inset-0 rounded-[inherit] bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)]" />
      )}
      <span className="relative z-10 text-[0.85em] transition-transform duration-300 group-hover/action:translate-x-0.5">
        {action.icon}
      </span>
      <span className="relative z-10">{action.label}</span>
    </>
  );

  const combinedClasses = `${baseClasses} ${hoverClasses}`;

  if (action.to) {
    return (
      <Link to={action.to} className={combinedClasses}>
        {buttonContent}
      </Link>
    );
  }

  return (
    <a href={action.href} target="_blank" rel="noopener noreferrer" className={combinedClasses}>
      {buttonContent}
    </a>
  );
}

/* ── Main Card ── */
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
  const [isClosing, setIsClosing] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const closeTimerRef = useRef<number | null>(null);

  const openDetails = () => {
    setIsClosing(false);
    setIsDetailsOpen(true);
  };

  const closeDetails = () => {
    if (!isDetailsOpen || isClosing) return;
    setIsClosing(true);
    closeTimerRef.current = window.setTimeout(() => {
      setIsDetailsOpen(false);
      setIsClosing(false);
    }, 220);
  };

  useEffect(() => {
    if (!isDetailsOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeDetails();
    };
    window.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDetailsOpen]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current !== null) window.clearTimeout(closeTimerRef.current);
    };
  }, []);

  /* ── Image area ── */
  const imageContent = (
    <div className="relative h-full w-full overflow-hidden rounded-xl">
      {!imageLoaded && (
        <div className="absolute inset-0 z-10 animate-pulse bg-gradient-to-br from-white/[0.08] via-white/[0.02] to-white/[0.08]" />
      )}

      <img
        src={image}
        alt={imageAlt}
        loading="lazy"
        onLoad={() => setImageLoaded(true)}
        className={`h-56 w-full object-cover object-top transition-[opacity,transform] duration-700 sm:h-64 lg:h-full lg:min-h-[22rem] ${
          imageLoaded ? "opacity-100" : "opacity-0"
        } group-hover:scale-[1.04]`}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(5,10,24,0.85)] via-[rgba(5,10,24,0.1)] to-transparent" />

      {/* Badge */}
      <div className="absolute left-3 top-3 z-20 inline-flex max-w-[calc(100%-1.5rem)] items-center gap-2 rounded-lg border border-white/15 bg-black/35 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-md sm:left-4 sm:top-4">
        <span className="text-[0.9em]" style={badgeAccent ? { color: badgeAccent } : undefined}>
          {badgeIcon}
        </span>
        <span className="truncate">{badge}</span>
      </div>

      {/* Bottom tech tags */}
      <div className="absolute bottom-3 left-3 right-3 z-20 flex flex-wrap gap-1.5 sm:bottom-4 sm:left-4 sm:right-4">
        {technologies.slice(0, 3).map((tech) => (
          <span
            key={tech}
            className="inline-flex items-center gap-1.5 rounded-md border border-white/15 bg-black/35 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur-md"
          >
            {techIcons[tech.toLowerCase()] || badgeIcon}
            <span>{tech}</span>
          </span>
        ))}
        {stats && (
          <span className="ml-auto inline-flex items-center gap-1.5 rounded-md border border-white/15 bg-black/35 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur-md">
            <FaStar className="text-[9px] text-amber-300" />
            {stats}
          </span>
        )}
      </div>
    </div>
  );

  return (
    <article className="project-card group">
      <div className="project-card-glow" aria-hidden="true" />
      <div className="project-card-shine" aria-hidden="true" />

      <div className="flex flex-col lg:flex-row lg:items-stretch">
        {/* ── Image Column ── */}
        <div className="relative lg:w-[40%] lg:min-w-[18rem] xl:w-[38%]">
          <div className="p-3 pb-0 lg:h-full lg:p-3 lg:pb-0">
            {previewHref ? (
              <a href={previewHref} target="_blank" rel="noopener noreferrer" className="block h-full">
                {imageContent}
              </a>
            ) : (
              imageContent
            )}
          </div>
        </div>

        {/* ── Content Column ── */}
        <div className="flex flex-1 flex-col gap-4 px-5 pb-5 pt-4 sm:px-6 sm:pb-6 lg:px-6 lg:py-5">
          <div className="flex flex-1 flex-col gap-3.5">
            {/* Title */}
            <h4 className="max-w-[22ch] text-[1.5rem] font-extrabold leading-[1.08] tracking-[-0.02em] text-[var(--text-primary)] transition-colors duration-300 group-hover:text-[var(--accent-primary)] sm:text-[1.8rem]">
              {title}
            </h4>

            {/* Short description */}
            <p className="max-w-2xl text-sm leading-7 text-[var(--text-secondary)]/80">{shortDescription}</p>

            {/* Tech pills */}
            <div className="flex flex-wrap gap-1.5">
              {technologies.slice(0, 5).map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/8 bg-white/[0.03] px-2.5 py-1.5 text-[11px] font-semibold text-[var(--text-primary)]/85"
                >
                  {techIcons[tech.toLowerCase()] || badgeIcon}
                  <span>{tech}</span>
                </span>
              ))}
            </div>

            {/* Details toggle — quiet, single-purpose control */}
            <button
              type="button"
              onClick={openDetails}
              className="group/btn inline-flex w-fit items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--accent-secondary)] transition-colors duration-200 hover:text-[var(--accent-primary)]"
            >
              {t("projects.actions.showDescription")}
              <FaChevronDown className="text-[9px] transition-transform duration-300 group-hover/btn:translate-y-0.5" />
            </button>
          </div>

          {/* ── Actions Footer ── */}
          <div className="mt-auto space-y-3">
            <div className="flex flex-col gap-2.5 sm:flex-row lg:flex-wrap">
              {actions.map((action) => (
                <ProjectActionButton key={action.label} action={action} />
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-white/6 pt-3 text-[10px] uppercase tracking-[0.14em] text-[var(--text-secondary)]/55">
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent-primary)]/50" />
                {badge}
              </span>
              <span className="inline-flex items-center gap-1.5 text-[var(--accent-tertiary)] transition-all duration-200 group-hover:gap-2.5">
                {t("projects.actions.openPage")}
                <FaArrowRight className="text-[10px] transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Detail Modal ── */}
      {isDetailsOpen &&
        createPortal(
          <div
            className={`fixed inset-0 z-[120] flex items-end justify-center bg-[rgba(20,14,26,0.55)] px-4 pb-4 pt-16 backdrop-blur-sm sm:items-center sm:p-6 ${
              isClosing ? "project-overlay-out" : "project-overlay-in"
            }`}
            onClick={closeDetails}
          >
            <div
              className={`relative max-h-[92vh] w-full max-w-2xl overflow-hidden overflow-y-auto rounded-2xl border border-white/10 bg-[#0d0a16] shadow-[0_40px_120px_-20px_rgba(0,0,0,0.6)] ${
                isClosing ? "project-modal-out" : "project-modal-in"
              }`}
              onClick={(event) => event.stopPropagation()}
            >
              {/* Top gradient bar */}
              <div className="h-1 w-full bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-tertiary)]" />

              {/* Header */}
              <div className="flex items-start justify-between gap-4 border-b border-white/8 px-5 pb-4 pt-4 sm:px-7">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 rounded-lg border border-white/8 bg-white/[0.04] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--text-secondary)]">
                    <span className="text-[0.9em]" style={badgeAccent ? { color: badgeAccent } : undefined}>
                      {badgeIcon}
                    </span>
                    <span>{badge}</span>
                  </div>
                  <h5 className="text-xl font-extrabold tracking-[-0.02em] text-[var(--text-primary)] sm:text-2xl">
                    {title}
                  </h5>
                </div>

                <button
                  type="button"
                  onClick={closeDetails}
                  aria-label="Close"
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/8 bg-white/[0.04] text-sm text-[var(--text-primary)] transition-all duration-200 hover:border-[var(--accent-primary)]/25 hover:bg-white/[0.08] hover:text-[var(--accent-primary)]"
                >
                  <FaTimes className="text-sm" />
                </button>
              </div>

              {/* Body */}
              <div className="space-y-5 px-5 py-4 sm:px-7 sm:py-5">
                <div className="overflow-hidden rounded-xl border border-white/8">
                  <img src={image} alt={imageAlt} className="max-h-48 w-full object-cover object-top" />
                </div>

                <p className="text-sm leading-7 text-[var(--text-secondary)]/85 sm:text-[15px]">{description}</p>

                <div>
                  <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
                    Technologies
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {technologies.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-white/8 bg-white/[0.03] px-3 py-1.5 text-[11px] font-semibold text-[var(--text-primary)]"
                      >
                        {techIcons[tech.toLowerCase()] || badgeIcon}
                        <span>{tech}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2.5 border-t border-white/8 pt-4 sm:flex-row">
                  {actions.map((action) => (
                    <ProjectActionButton key={`modal-${action.label}`} action={action} />
                  ))}
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </article>
  );
}

export default ProjectShowcaseCard;
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

  const baseClasses = `group/action relative inline-flex min-h-[3.2rem] flex-1 items-center justify-center gap-2.5 overflow-hidden rounded-[0.85rem] px-5 text-sm font-bold tracking-[-0.01em] transition-all duration-400 ease-out lg:flex-none lg:px-6 ${
    isPrimary
      ? "text-white"
      : "text-[var(--text-primary)]/90 border border-[var(--border-soft)]/40 bg-white/5 backdrop-blur-sm"
  }`;

  const hoverClasses = isPrimary
    ? "hover:scale-[1.03] hover:shadow-2xl hover:shadow-[var(--accent-primary)]/30 active:scale-[0.97]"
    : "hover:scale-[1.03] hover:border-[var(--accent-primary)]/25 hover:bg-white/10 hover:text-[var(--accent-primary)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] active:scale-[0.97]";

  const buttonContent = (
    <>
      {/* Primary bg gradient */}
      {isPrimary && (
        <span className="absolute inset-0 rounded-[inherit] bg-gradient-to-br from-[var(--accent-primary)] via-[var(--accent-primary)] to-[var(--accent-secondary)]" />
      )}
      {/* Hover glow overlay */}
      <span className={`absolute inset-0 rounded-[inherit] transition-all duration-400 ${
        isPrimary
          ? "bg-gradient-to-br from-white/0 via-white/0 to-white/[0.08] opacity-0 group-hover/action:opacity-100"
          : "bg-gradient-to-br from-white/[0.04] to-transparent opacity-0 group-hover/action:opacity-100"
      }`} />
      {/* Shimmer sweep */}
      <span className={`absolute inset-0 -translate-x-full skew-x-[-15deg] bg-gradient-to-r from-transparent ${
        isPrimary ? "via-white/20" : "via-white/8"
      } to-transparent transition-transform duration-[800ms] group-hover/action:translate-x-full`} />
      {/* Glow ring */}
      <span className={`absolute -inset-[1.5px] rounded-[inherit] blur-md transition-all duration-500 ${
        isPrimary
          ? "bg-gradient-to-r from-[var(--accent-primary)]/30 to-[var(--accent-secondary)]/30 opacity-0 group-hover/action:opacity-100"
          : "bg-gradient-to-r from-[var(--accent-primary)]/10 to-[var(--accent-secondary)]/10 opacity-0 group-hover/action:opacity-80"
      }`} aria-hidden="true" />
      <span className="relative z-10 transition-all duration-300 group-hover/action:translate-x-0.5 group-hover/action:scale-110">{action.icon}</span>
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
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLElement>(null);

  /* ── Lock scroll & close on Escape ── */
  useEffect(() => {
    if (!isDetailsOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsDetailsOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isDetailsOpen]);

  /* ── 3D Parallax tilt on hover ── */
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    card.style.setProperty("--mx", `${(x - 0.5) * 4}deg`);
    card.style.setProperty("--my", `${(y - 0.5) * -3}deg`);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (card) {
      card.style.setProperty("--mx", "0deg");
      card.style.setProperty("--my", "0deg");
    }
    setIsHovered(false);
  };

  /* ── Image area ── */
  const imageContent = (
    <div className="relative h-full w-full overflow-hidden rounded-xl">
      {/* Skeleton shimmer */}
      {!imageLoaded && (
        <div className="absolute inset-0 z-10 animate-pulse bg-gradient-to-br from-white/[0.08] via-white/[0.02] to-white/[0.08]" />
      )}

      <img
        src={image}
        alt={imageAlt}
        loading="lazy"
        onLoad={() => setImageLoaded(true)}
        className={`h-56 w-full object-cover object-top transition-all duration-700 sm:h-64 lg:h-full lg:min-h-[22rem] ${
          imageLoaded ? "opacity-100" : "opacity-0"
        } ${isHovered ? "scale-105" : "scale-100"}`}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(5,10,24,0.88)] via-[rgba(5,10,24,0.15)] to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[rgba(5,10,24,0.3)] to-transparent opacity-30" />

      {/* Top edge light */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

      {/* Hover glow */}
      <div
        className={`absolute inset-0 rounded-xl transition-opacity duration-500 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
        style={{
          boxShadow: "inset 0 0 50px rgba(168,85,247,0.08), inset 0 0 100px rgba(255,107,154,0.04)",
        }}
      />

      {/* Badge */}
      <div className="absolute left-3 top-3 z-20 flex max-w-[calc(100%-1.5rem)] items-center gap-2.5 rounded-xl border border-white/15 bg-black/25 px-3.5 py-2 text-[11px] font-semibold text-white/90 backdrop-blur-xl transition-all duration-300 hover:bg-black/35 hover:border-white/25 sm:left-4 sm:top-4">
        <span
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-white/12 text-sm shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300"
          style={badgeAccent ? { color: badgeAccent } : undefined}
        >
          {badgeIcon}
        </span>
        <span className="truncate uppercase tracking-[0.16em] text-white/75">{badge}</span>
      </div>

      {/* Bottom tech tags + stats */}
      <div className="absolute bottom-3 left-3 right-3 z-20 flex flex-col items-start gap-2 sm:bottom-4 sm:left-4 sm:right-4">
        <div className="flex max-w-full flex-wrap gap-1.5">
          {technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/12 bg-white/10 px-2.5 py-1 text-[10px] font-medium text-white/90 backdrop-blur-xl transition-all duration-200 hover:bg-white/18 hover:border-white/20"
            >
              {techIcons[tech.toLowerCase()] || badgeIcon}
              <span>{tech}</span>
            </span>
          ))}
        </div>

        {stats && (
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-black/20 px-2.5 py-1 text-[10px] font-medium tracking-[0.12em] text-white/80 backdrop-blur-xl">
            <FaStar className="text-[9px] text-yellow-300/80" />
            {stats}
          </span>
        )}
      </div>
    </div>
  );

  return (
    <article
      ref={cardRef}
      className="project-card group"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={
        {
          "--mx": "0deg",
          "--my": "0deg",
          perspective: "1100px",
          transform: "rotateY(var(--mx)) rotateX(var(--my))",
          transformStyle: "preserve-3d",
        } as React.CSSProperties
      }
    >
      <div className="project-card-glow" aria-hidden="true" />
      <div className="project-card-shine" aria-hidden="true" />

      <div className="flex flex-col lg:flex-row lg:items-stretch">
        {/* ── Image Column ── */}
        <div className="relative lg:w-[40%] lg:min-w-[18rem] xl:w-[38%]">
          <div className="p-3 pb-0 lg:p-3 lg:pb-0 lg:h-full">
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
          <div className="flex flex-1 flex-col gap-4">
            {/* Badge + Stats row */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/8 bg-white/[0.03] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--text-secondary)]/80">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent-primary)]/60" />
                {badge}
              </span>
              {stats && (
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--accent-secondary)]/12 bg-[var(--accent-secondary)]/6 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--accent-secondary)]">
                  <FaStar className="text-[9px]" />
                  {stats}
                </span>
              )}
            </div>

            {/* Title */}
            <h4 className="max-w-[20ch] text-[1.6rem] font-extrabold leading-[1.05] tracking-[-0.03em] text-[var(--text-primary)] transition-all duration-300 group-hover:text-[var(--accent-primary)] sm:text-[1.9rem]">
              {title}
            </h4>

            {/* Short description */}
            <p className="max-w-2xl text-sm leading-7 text-[var(--text-secondary)]/80 sm:text-[14px]">
              {shortDescription}
            </p>

            {/* Tech pills */}
            <div className="flex flex-wrap gap-2">
              {technologies.slice(0, 5).map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/8 bg-white/[0.04] px-3 py-1.5 text-[11px] font-semibold text-[var(--text-primary)]/90 backdrop-blur-lg transition-all duration-200 hover:border-[var(--accent-primary)]/20 hover:bg-white/[0.07]"
                >
                  {techIcons[tech.toLowerCase()] || badgeIcon}
                  <span>{tech}</span>
                </span>
              ))}
            </div>

            {/* Details expander */}
            <div className="group/expand relative overflow-hidden rounded-[1.1rem] border border-white/6 bg-gradient-to-br from-white/[0.02] to-white/[0.01] p-4 backdrop-blur-lg transition-all duration-300 hover:border-[var(--accent-primary)]/12 hover:bg-white/[0.04] hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] sm:p-4">
              {/* Gradient accent line */}
              <div className="absolute top-0 left-3 right-3 h-px bg-gradient-to-r from-transparent via-[var(--accent-primary)]/20 to-transparent opacity-0 transition-opacity duration-300 group-hover/expand:opacity-100" />
              
              <button
                type="button"
                onClick={() => setIsDetailsOpen(true)}
                className="group/btn inline-flex cursor-pointer items-center gap-2.5 text-sm font-semibold transition-all duration-300"
              >
                <span className="relative inline-flex items-center gap-2 text-[var(--accent-secondary)] group-hover/btn:text-[var(--accent-primary)] transition-colors duration-300">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-[var(--accent-secondary)]/12 bg-[var(--accent-secondary)]/6 text-[10px] transition-all duration-300 group-hover/btn:bg-[var(--accent-primary)]/6 group-hover/btn:border-[var(--accent-primary)]/12">
                    <FaChevronDown className="text-[9px] transition-all duration-300 group-hover/btn:translate-y-0.5" />
                  </span>
                  <span>{t("projects.actions.showDescription")}</span>
                </span>
                {/* Animated underline */}
                <span className="h-px flex-1 max-w-[40px] bg-gradient-to-r from-[var(--accent-secondary)]/30 to-transparent transition-all duration-300 group-hover/btn:max-w-[60px] group-hover/btn:from-[var(--accent-primary)]/40" />
              </button>
              <p className="mt-2.5 text-sm leading-7 text-[var(--text-secondary)]/70 line-clamp-2 pl-[2.25rem]">
                {description}
              </p>
            </div>
          </div>

          {/* ── Actions Footer ── */}
          <div className="mt-auto space-y-3">
            <div className="flex flex-col gap-2.5 sm:flex-row lg:flex-wrap">
              {actions.map((action) => (
                <ProjectActionButton key={action.label} action={action} />
              ))}
            </div>

            {/* Bottom bar */}
            <div className="flex items-center justify-between border-t border-white/6 pt-3 text-[10px] uppercase tracking-[0.16em] text-[var(--text-secondary)]/60">
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent-primary)]/50" />
                {badge}
              </span>
              <span className="inline-flex items-center gap-1.5 text-[var(--accent-tertiary)] transition-all duration-200 group-hover:gap-2.5">
                {t("projects.actions.openPage")}
                <FaArrowRight className="text-[10px] transition-all duration-200 group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Detail Modal ── */}
      {isDetailsOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[120] flex items-end justify-center bg-slate-950/60 px-4 pb-4 pt-16 backdrop-blur-xl sm:items-center sm:p-6 animate-[fade-up_0.35s_ease-out_both]"
            onClick={() => setIsDetailsOpen(false)}
          >
            <div
              className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-[var(--card-solid)] shadow-[0_40px_120px_rgba(5,10,24,0.5)] backdrop-blur-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              {/* Top gradient bar */}
              <div className="relative h-1 w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-tertiary)]" />
                <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </div>

              {/* Header */}
              <div className="flex items-start justify-between gap-4 border-b border-white/8 px-5 pb-4 pt-4 sm:px-7">
                <div className="space-y-2.5">
                  <div className="inline-flex items-center gap-2.5 rounded-xl border border-white/8 bg-white/6 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--text-secondary)]">
                    <span
                      className="inline-flex h-6 w-6 items-center justify-center rounded-lg border border-white/8 bg-white/8 text-xs"
                      style={badgeAccent ? { color: badgeAccent } : undefined}
                    >
                      {badgeIcon}
                    </span>
                    <span>{badge}</span>
                  </div>
                  <h5 className="text-xl font-extrabold tracking-[-0.03em] text-[var(--text-primary)] sm:text-2xl">
                    {title}
                  </h5>
                </div>

                <button
                  type="button"
                  onClick={() => setIsDetailsOpen(false)}
                  className="inline-flex cursor-pointer h-10 min-w-10 items-center justify-center rounded-xl border border-white/8 bg-white/6 px-3 text-sm font-semibold text-[var(--text-primary)] transition-all duration-200 hover:border-[var(--accent-primary)]/25 hover:bg-white/10 hover:text-[var(--accent-primary)] hover:rotate-90"
                >
                  <FaTimes className="text-sm" />
                </button>
              </div>

              {/* Body */}
              <div className="space-y-5 px-5 py-4 sm:px-7 sm:py-5">
                {/* Image preview */}
                <div className="overflow-hidden rounded-xl border border-white/6 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                  <img
                    src={image}
                    alt={imageAlt}
                    className="w-full object-cover object-top max-h-48 transition-transform duration-500 hover:scale-[1.03]"
                  />
                </div>

                <p className="text-sm leading-7 text-[var(--text-secondary)]/85 sm:text-[15px]">
                  {description}
                </p>

                {/* Tech pills */}
                <div>
                  <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                    Technologies
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {technologies.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-white/8 bg-white/5 px-3 py-1.5 text-[11px] font-semibold text-[var(--text-primary)] transition-all duration-200 hover:bg-white/10 hover:border-white/14"
                      >
                        {techIcons[tech.toLowerCase()] || badgeIcon}
                        <span>{tech}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2.5 border-t border-white/6 pt-4 sm:flex-row">
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
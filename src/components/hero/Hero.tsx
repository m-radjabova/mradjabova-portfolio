import { useTranslation } from "react-i18next";
import portrait from "../../assets/me/hero_portrait.png";

type HeroProps = {
  onNavigate?: (sectionId: "projects" | "contact" | "resume") => void;
};

const Hero = ({ onNavigate }: HeroProps) => {
  const { t } = useTranslation();

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-[var(--hero-bg)] lg:h-screen lg:min-h-0"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="animate-hero-veil-flow absolute inset-y-0 left-1/2 hidden w-[28rem] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-3xl lg:block"
          aria-hidden="true"
        />

        {/* Primary morphing blob - large */}
        <div
          className="absolute -left-[10%] -top-[10%] h-[40vh] w-[40vw] sm:h-[60vh] sm:w-[50vw] animate-morph-blob opacity-20"
          style={{
            background: "radial-gradient(circle at 30% 40%, #dba4af 0%, #c18fa0 40%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        {/* Secondary morphing blob */}
        <div
          className="absolute -bottom-[15%] -right-[5%] h-[35vh] w-[35vw] sm:h-[55vh] sm:w-[45vw] animate-morph-blob-delayed opacity-15"
          style={{
            background: "radial-gradient(circle at 70% 60%, #b3aad7 0%, #8c83aa 40%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        {/* Third floating blob - hidden on mobile */}
        <div
          className="hidden sm:block absolute left-[40%] top-[30%] h-[35vh] w-[30vw] animate-float-gentle opacity-10"
          style={{
            background: "radial-gradient(circle at 50% 50%, #f0dacd 0%, #e8c8b8 40%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />
      </div>

      {/* ====== AURA GLOW BEHIND PORTRAIT ====== */}
      <div className="pointer-events-none absolute right-0 top-1/2 h-[50vh] w-[40vw] sm:h-[70vh] sm:w-[50vw] -translate-y-1/2">
        <div
          className="absolute left-1/2 top-1/2 h-[35vh] w-[35vh] sm:h-[50vh] sm:w-[50vh] -translate-x-1/2 -translate-y-1/2 animate-aura-pulse rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(193,143,160,0.15) 0%, rgba(179,170,215,0.08) 40%, transparent 70%)",
          }}
        />
      </div>

      {/* ====== FLOATING PARTICLES - fewer on mobile ====== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute left-[15%] top-[20%] h-2 w-2 animate-particle-rise rounded-full"
          style={{
            background: "radial-gradient(circle, #c18fa0 0%, transparent 70%)",
            boxShadow: "0 0 8px rgba(193,143,160,0.4)",
          }}
        />
        <div
          className="absolute right-[25%] top-[30%] h-1.5 w-1.5 animate-particle-rise-delayed rounded-full"
          style={{
            background: "radial-gradient(circle, #b3aad7 0%, transparent 70%)",
            boxShadow: "0 0 6px rgba(179,170,215,0.4)",
          }}
        />
        <div
          className="hidden sm:block absolute left-[60%] top-[15%] h-2.5 w-2.5 animate-particle-rise-slow rounded-full"
          style={{
            background: "radial-gradient(circle, #d996a4 0%, transparent 70%)",
            boxShadow: "0 0 10px rgba(217,150,164,0.3)",
          }}
        />
        <div
          className="hidden sm:block absolute right-[10%] top-[60%] h-1.5 w-1.5 animate-particle-rise rounded-full"
          style={{
            background: "radial-gradient(circle, #8c83aa 0%, transparent 70%)",
            boxShadow: "0 0 6px rgba(140,131,170,0.4)",
          }}
        />
        <div
          className="absolute left-[30%] top-[70%] h-2 w-2 animate-particle-rise-delayed rounded-full"
          style={{
            background: "radial-gradient(circle, #c18fa0 0%, transparent 70%)",
            boxShadow: "0 0 8px rgba(193,143,160,0.3)",
          }}
        />
      </div>

      {/* ====== SPARKLE DECORATIONS - fewer on mobile ====== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="absolute left-[8%] top-[12%] animate-sparkle-pop text-[10px] sm:text-[14px] text-[#c18fa0]/40 select-none">✦</span>
        <span className="absolute right-[18%] top-[18%] animate-sparkle-pop-delayed text-[8px] sm:text-[10px] text-[#b3aad7]/35 select-none">✦</span>
        <span className="hidden sm:block absolute left-[50%] top-[8%] animate-sparkle-pop-slow text-[12px] text-[#d996a4]/30 select-none">✦</span>
        <span className="hidden sm:block absolute right-[30%] bottom-[25%] animate-sparkle-pop text-[11px] text-[#c18fa0]/35 select-none">✦</span>
        <span className="absolute left-[22%] bottom-[15%] animate-sparkle-pop-delayed text-[9px] text-[#8c83aa]/30 select-none">✦</span>
        <span className="hidden sm:block absolute right-[8%] top-[40%] animate-sparkle-pop-slow text-[13px] text-[#b3aad7]/30 select-none">✦</span>
      </div>

      {/* ====== DECORATIVE RINGS - fewer on mobile ====== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[8%] top-[20%] h-12 w-12 sm:h-16 sm:w-16 animate-ring-expand rounded-full border border-[#c18fa0]/20" />
        <div className="absolute left-[8%] top-[20%] h-12 w-12 sm:h-16 sm:w-16 animate-ring-expand-delayed rounded-full border border-[#c18fa0]/15" />
        <div className="hidden sm:block absolute right-[15%] bottom-[30%] h-12 w-12 animate-ring-expand rounded-full border border-[#b3aad7]/20" style={{ animationDelay: "1s" }} />
        <div className="hidden sm:block absolute right-[15%] bottom-[30%] h-12 w-12 animate-ring-expand-delayed rounded-full border border-[#b3aad7]/15" style={{ animationDelay: "1s" }} />

        {/* Slow spinning rings - smaller on mobile */}
        <div className="absolute -left-24 -top-24 h-48 w-48 sm:h-72 sm:w-72 animate-spin-slow rounded-full border border-[#c18fa0]/8" />
        <div className="hidden sm:block absolute -right-36 -top-16 h-96 w-96 animate-spin-slow rounded-full border border-[#8c83aa]/6" style={{ animationDirection: "reverse" }} />
        <div className="absolute -bottom-20 left-[30%] h-40 w-40 sm:h-56 sm:w-56 animate-spin-slow rounded-full border border-[#b3aad7]/8" style={{ animationDuration: "25s" }} />
      </div>

      {/* ====== MAIN GRID ====== */}
      <div className="relative z-10 mx-auto grid min-h-screen max-w-[1500px] grid-cols-1 items-center gap-4 lg:h-full lg:min-h-0 lg:grid-cols-[1fr_1.2fr] lg:gap-6">
        {/* ====== LEFT CONTENT ====== */}
        <div className="relative px-4 pt-16 sm:px-6 sm:pt-20 lg:px-12 lg:pt-0">
          {/* Elegant badge with shimmer */}
          <div
            className="animate-hero-content-reveal group inline-flex items-center gap-2 sm:gap-3 rounded-full border border-[#c18fa0]/20 bg-white/45 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.3em] text-[#7d719e] shadow-lg shadow-[#8c83aa]/6 backdrop-blur-md transition-all duration-500 hover:border-[#c18fa0]/35 hover:bg-white/55 hover:shadow-[#c18fa0]/10 sm:px-6 sm:py-2.5 sm:text-xs lg:text-sm"
            style={{ animationDelay: "0.08s" }}
          >
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[#c18fa0] animate-pulse" />
            <span className="relative">
              {t("hero.badge")}
              <span className="absolute inset-0 animate-shimmer-text bg-gradient-to-r from-transparent via-white/30 to-transparent bg-[length:200%_100%]" />
            </span>
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[#c18fa0] animate-pulse" />
          </div>

          {/* Main title with gradient text */}
          <h1
            className="animate-hero-content-reveal mt-6 font-serif text-[clamp(3.5rem,12vw,11rem)] leading-[0.75] tracking-[-0.06em] select-none sm:mt-10"
            style={{ animationDelay: "0.18s" }}
          >
            <span
              className="bg-gradient-to-r from-[#716895] via-[#8c83aa] to-[#b3aad7] bg-clip-text text-transparent animate-shimmer-text"
              style={{ backgroundSize: "200% 200%" }}
            >
              {t("hero.title")}
            </span>
          </h1>

          {/* Name and role with decorative elements */}
          <div
            className="animate-hero-content-reveal mt-6 sm:mt-12"
            style={{ animationDelay: "0.28s" }}
          >
            <h2
              className="text-[clamp(2rem,5vw,5rem)] leading-none text-[#c18fa0] transition-all duration-700"
              style={{ fontFamily: "var(--font-script)" }}
            >
              Muslima Radjabova
            </h2>

            <div className="mt-3 sm:mt-5 flex items-center gap-3 sm:gap-4">
              <div className="h-px w-6 sm:w-10 bg-gradient-to-r from-[#c18fa0]/60 to-transparent" />
              <p className="text-[10px] sm:text-sm font-semibold uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[#716895]">
                {t("hero.badge")}
              </p>
              <div className="h-px w-6 sm:w-10 bg-gradient-to-l from-[#c18fa0]/60 to-transparent" />
            </div>
          </div>

          {/* Intro text with elegant styling */}
          <div
            className="animate-hero-content-reveal mt-6 flex max-w-[600px] items-start gap-3 sm:mt-10 sm:gap-5"
            style={{ animationDelay: "0.38s" }}
          >
            <span className="mt-1 text-xl sm:text-2xl leading-none text-[#c18fa0] animate-float-gentle select-none">
              ✦
            </span>
            <div>
              <p className="text-sm sm:text-base font-medium leading-relaxed text-[#6f6b74] sm:text-lg sm:leading-[1.75]">
                {t("hero.intro")}
              </p>

              {/* CTA Buttons */}
              <div className="mt-4 sm:mt-6 flex flex-wrap gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate?.("contact")}
                  className="cursor-pointer animate-hero-cta-breathe group relative overflow-hidden rounded-full bg-gradient-to-r from-[#716895] to-[#8c83aa] px-5 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_32px_rgba(113,104,149,0.3)]"
                >
                  <span className="relative z-10">{t("hero.cta.hire")}</span>
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-[#8c83aa] via-[#b3aad7] to-[#c18fa0] transition-transform duration-500 group-hover:translate-x-0" />
                  <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate?.("projects")}
                  className="cursor-pointer group relative overflow-hidden rounded-full border-2 border-[#716895] px-5 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-[#716895] transition-all duration-300 hover:scale-105 hover:text-white hover:shadow-[0_8px_24px_rgba(113,104,149,0.2)]"
                >
                  <span className="relative z-10">{t("hero.cta.projects")}</span>
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-[#716895] to-[#8c83aa] transition-transform duration-500 group-hover:translate-x-0" />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate?.("resume")}
                  className="cursor-pointer animate-hero-cta-breathe group relative overflow-hidden rounded-full border border-[#c18fa0]/30 bg-white/65 px-5 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-[#c18fa0] transition-all duration-300 hover:scale-105 hover:border-[#c18fa0] hover:bg-white hover:shadow-[0_8px_24px_rgba(193,143,160,0.2)]"
                  style={{ animationDelay: "1.2s" }}
                >
                  <span className="relative z-10">{t("hero.cta.resume")}</span>
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-[#c18fa0]/10 to-[#d996a4]/10 transition-transform duration-500 group-hover:translate-x-0" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ====== RIGHT - Portrait with Aesthetic Frame ====== */}
        <div className="relative flex h-full w-full items-end justify-center self-end lg:-ml-16 lg:justify-start">
          {/* Decorative morphing blob behind portrait - smaller on mobile */}
          <div className="absolute -bottom-8 sm:-bottom-16 left-1/2 h-[20rem] w-[20rem] sm:h-[38rem] sm:w-[38rem] -translate-x-1/2 animate-breathe-glow rounded-full border border-[#c18fa0]/12 bg-gradient-to-br from-[#c18fa0]/6 via-[#b3aad7]/4 to-transparent blur-xl sm:blur-2xl lg:h-[45rem] lg:w-[45rem]" />

          {/* Secondary decorative ring - hidden on mobile */}
          <div className="hidden sm:block absolute -bottom-10 left-1/2 h-[30rem] w-[30rem] -translate-x-1/2 animate-float-gentle-delayed rounded-full border border-[#8c83aa]/6 bg-gradient-to-tr from-[#8c83aa]/3 via-transparent to-[#c18fa0]/3 blur-xl lg:h-[36rem] lg:w-[36rem]" />

          {/* Third decorative ring - smaller on mobile */}
          <div className="absolute -bottom-12 sm:-bottom-24 left-1/2 h-[24rem] w-[24rem] sm:h-[44rem] sm:w-[44rem] -translate-x-1/2 animate-spin-slow rounded-full border border-dashed border-[#c18fa0]/8 lg:h-[52rem] lg:w-[52rem]" style={{ animationDuration: "30s" }} />

          {/* Portrait container blended into hero background */}
          <div
            className="animate-hero-content-reveal relative z-10 w-full max-w-[28rem] sm:max-w-[48rem] lg:max-w-[62rem]"
            style={{ animationDelay: "0.32s" }}
          >
            {/* Portrait without shadow so it sits flush with the hero */}
            <div className="relative">
              <img
                src={portrait}
                alt="Muslima Radjabova"
                className="mx-auto block h-auto w-full max-w-[28rem] sm:max-w-[52rem] object-contain lg:max-w-[58rem]"
              />
            </div>
          </div>

          {/* Floating decorative elements - fewer on mobile */}
          <div className="hidden sm:block absolute left-4 top-1/3 h-4 w-4 animate-float-gentle rounded-full bg-[#c18fa0]/20" />
          <div className="hidden sm:block absolute right-[15%] top-[28%] h-6 w-6 animate-float-gentle-delayed rounded-full bg-[#8c83aa]/15" />
          <div className="absolute bottom-[18%] left-[10%] h-2 w-2 sm:h-3 sm:w-3 animate-float rounded-full bg-[#716895]/20" />

          {/* Sparkle effects - fewer on mobile */}
          <div className="absolute left-[20%] top-[18%] animate-sparkle-pop text-[8px] sm:text-[10px] text-[#c18fa0]/30 select-none">✦</div>
          <div className="hidden sm:block absolute right-[25%] bottom-[30%] animate-sparkle-pop-delayed text-[8px] text-[#b3aad7]/30 select-none">✦</div>
          <div className="hidden sm:block absolute left-[5%] bottom-[40%] animate-sparkle-pop-slow text-[9px] text-[#d996a4]/25 select-none">✦</div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

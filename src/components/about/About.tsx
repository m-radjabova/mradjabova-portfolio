import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  FaAward,
  FaBookOpen,
  FaCode,
  FaDatabase,
  FaHeart,
  FaPalette,
  FaUser,
  FaQuoteLeft,
} from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import flowerImage from "../../assets/me/flower.png";

type AboutCardItem = {
  title: string;
  description: string;
};

const About = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const whatIDo = t("about.cards.whatIDo.items", {
    returnObjects: true,
  }) as AboutCardItem[];
  const values = t("about.cards.values.items", {
    returnObjects: true,
  }) as AboutCardItem[];

  const whatIDoIcons = [<FaCode />, <FaPalette />, <FaDatabase />];
  const valueIcons = [<FaAward />, <FaUser />, <FaBookOpen />];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-up");
          }
        });
      },
      { threshold: 0.08 },
    );

    const section = sectionRef.current;
    if (section) {
      const children = section.querySelectorAll(".stagger-item");
      children.forEach((child, index) => {
        (child as HTMLElement).style.animationDelay = `${index * 0.07}s`;
        observer.observe(child);
      });
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!glowRef.current) return;
      const rect = glowRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      glowRef.current.style.setProperty("--mx", `${x}px`);
      glowRef.current.style.setProperty("--my", `${y}px`);
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      if (section) section.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden px-3 pb-10 pt-6 sm:px-4 sm:pb-12 sm:pt-8 lg:px-8 lg:pb-16 lg:pt-10"
    >
      {/* --- Ambient Glow (quiet, single source of atmosphere) --- */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={
          {
            "--mx": "50%",
            "--my": "50%",
          } as React.CSSProperties
        }
      >
        <div
          className="absolute h-[20rem] w-[20rem] sm:h-[30rem] sm:w-[30rem] rounded-full opacity-25 sm:opacity-35 blur-[90px] sm:blur-[130px] transition-all duration-700 ease-out"
          style={{
            background:
              "radial-gradient(circle, rgba(217,192,207,0.45), rgba(179,170,215,0.22) 50%, transparent 72%)",
            left: "calc(var(--mx) - 10rem)",
            top: "calc(var(--my) - 10rem)",
          }}
        />

        {/* One large soft ring — the only structural decoration left */}
        <div className="absolute right-[6%] top-[10%] h-[16rem] w-[16rem] sm:h-[26rem] sm:w-[26rem] rounded-full border border-[#e7dbe9]/35 bg-[radial-gradient(circle,rgba(236,228,244,0.35),rgba(248,243,248,0.04)_66%,transparent_80%)] animate-glow-drift" />

        {/* A small constellation, not a scatter — three points, deliberately placed */}
        <div className="absolute left-[10%] top-[14%] text-[0.8rem] sm:text-[1rem] text-[#d8bfd1]/55 animate-twinkle-soft">✦</div>
        <div className="hidden sm:block absolute left-[6%] bottom-[16%] text-[0.9rem] text-[#b3aad7]/40 animate-twinkle-soft" style={{ animationDelay: "0.8s" }}>✦</div>
        <div className="absolute right-[16%] bottom-[10%] text-[0.7rem] sm:text-[0.85rem] text-[#cfbfd7]/40 animate-twinkle-soft" style={{ animationDelay: "1.4s" }}>✦</div>
      </div>

      <div className="relative mx-auto max-w-[1500px]">
        {/* --- Eyebrow --- */}
        <div className="stagger-item mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3 opacity-0">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d9c0cf]/50 to-transparent" />
          <span className="flex items-center gap-1.5 sm:gap-2 text-[0.65rem] sm:text-[0.8rem] tracking-[0.25em] sm:tracking-[0.3em] text-[#c4aec4]/70 uppercase">
            <span className="inline-block h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-[#d9c0cf]/60" />
            <span>about</span>
            <span className="inline-block h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-[#d9c0cf]/60" />
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d9c0cf]/50 to-transparent" />
        </div>

        {/* --- Heading --- */}
        <div className="stagger-item opacity-0">
          <h2 className="section-title-display text-[clamp(2.75rem,9vw,7.5rem)] text-[#5f458f] leading-[0.82]">
            {t("about.heading")}
            <span className="ml-2 sm:ml-3 inline-block align-top text-[0.26em] text-[#9aa0d7] animate-orbit-icon">✦</span>
          </h2>

          <p
            className="mt-2 sm:mt-3 text-[clamp(1.4rem,3.6vw,2.8rem)] text-[#d5a1b6]"
            style={{ fontFamily: "var(--font-script)" }}
          >
            {t("about.scriptLine")}
          </p>

          {/* Pull-quote intro — one large watermark glyph instead of a border + icon combo */}
          <div className="relative mt-5 sm:mt-7 max-w-3xl">
            <FaQuoteLeft className="absolute -left-1 -top-3 sm:-top-4 text-[2.2rem] sm:text-[2.8rem] text-[#e7d5e2]/70 -z-0" />
            <p className="relative pl-7 sm:pl-9 text-[1rem] sm:text-[1.25rem] leading-[1.85rem] sm:leading-[2.35rem] text-[var(--text-secondary)] italic">
              {t("about.intro")}
            </p>
          </div>
        </div>

        {/* --- Cards --- */}
        <div className="relative mt-8 sm:mt-12">
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
          {/* Card 1: Story / Bio */}
          <article className="stagger-item group relative flex flex-col rounded-[1.6rem] sm:rounded-[2rem] border border-[rgba(239,230,239,0.9)] bg-[linear-gradient(160deg,rgba(255,252,252,0.85),rgba(249,242,247,0.72))] p-5 sm:p-7 shadow-[0_18px_48px_rgba(196,178,209,0.08)] backdrop-blur-xl opacity-0 transition-all duration-500 hover:shadow-[0_26px_64px_rgba(196,178,209,0.16)] hover:-translate-y-1 focus-within:-translate-y-1">
            <img
              src={flowerImage}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-0 hidden w-20 -translate-y-1/2 opacity-55 sm:block md:w-24"
            />
            <div
              className="pointer-events-none absolute inset-0 rounded-[1.6rem] sm:rounded-[2rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ boxShadow: "inset 0 0 0 1.5px rgba(217,192,207,0.28)" }}
            />

            <h3 className="section-title-display text-[1.6rem] sm:text-[2.15rem] text-[#5f458f]">
              {t("about.cards.story.title")}
            </h3>

            <p className="mt-4 sm:mt-5 flex-1 text-[0.95rem] sm:text-[1.02rem] leading-7 sm:leading-8 text-[var(--text-secondary)]">
              {t("about.cards.story.description")}
            </p>

            <div className="mt-5 sm:mt-6 flex flex-wrap gap-2">
              <span className="rounded-full bg-[rgba(217,192,207,0.14)] px-3 py-1.5 text-[0.72rem] sm:text-[0.8rem] font-medium text-[#8b7a9e]">
                3+ years
              </span>
              <span className="rounded-full bg-[rgba(179,170,215,0.14)] px-3 py-1.5 text-[0.72rem] sm:text-[0.8rem] font-medium text-[#8b7a9e]">
                Full-Stack
              </span>
            </div>

            <div className="mt-6 flex items-end justify-between gap-4 border-t border-[rgba(217,192,207,0.22)] pt-4 sm:pt-5">
              <div>
                <p
                  className="text-[1.4rem] sm:text-[1.9rem] leading-[1] text-[#d39db4]"
                  style={{ fontFamily: "var(--font-script)" }}
                >
                  Muslima Radjabova
                </p>
                <p className="mt-1 text-[0.72rem] sm:text-[0.8rem] tracking-wide text-[#b3aad7]">
                  Web Developer &amp; Designer
                </p>
              </div>
              <span className="flex h-9 w-9 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,rgba(239,228,245,0.95),rgba(252,245,247,0.92))] text-[1.05rem] sm:text-[1.4rem] text-[#e2a9c0] shadow-[0_8px_20px_rgba(193,143,160,0.1)] transition-transform duration-300 group-hover:scale-110">
                <FaHeart />
              </span>
            </div>
          </article>

          {/* Card 2: What I Do */}
          <article className="stagger-item group relative rounded-[1.6rem] sm:rounded-[2rem] border border-[rgba(239,230,239,0.9)] bg-[linear-gradient(160deg,rgba(255,252,252,0.85),rgba(249,242,247,0.72))] p-5 sm:p-7 shadow-[0_18px_48px_rgba(196,178,209,0.08)] backdrop-blur-xl opacity-0 transition-all duration-500 hover:shadow-[0_26px_64px_rgba(196,178,209,0.16)] hover:-translate-y-1">
            <img
              src={flowerImage}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-0 hidden w-20 -translate-y-1/2 opacity-55 sm:block md:w-24"
            />
            <div
              className="pointer-events-none absolute inset-0 rounded-[1.6rem] sm:rounded-[2rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ boxShadow: "inset 0 0 0 1.5px rgba(217,192,207,0.28)" }}
            />

            <h3 className="section-title-display text-[1.6rem] sm:text-[2.15rem] text-[#5f458f]">
              {t("about.cards.whatIDo.title")}
            </h3>

            <div className="mt-5 sm:mt-6 space-y-1">
              {whatIDo.map((item, index) => (
                <div
                  key={item.title}
                  className="group/item flex items-start gap-3 sm:gap-4 rounded-2xl p-2.5 sm:p-3 transition-all duration-300 hover:bg-[rgba(217,192,207,0.07)]"
                >
                  <div className="flex h-11 w-11 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-[linear-gradient(135deg,rgba(239,228,245,0.95),rgba(252,245,247,0.92))] text-[1rem] sm:text-[1.3rem] text-[#9a83b7] shadow-[0_10px_22px_rgba(193,143,160,0.06)] transition-all duration-300 group-hover/item:scale-105 group-hover/item:text-[#d39db4]">
                    {whatIDoIcons[index]}
                  </div>
                  <div className="min-w-0 flex-1 pt-0.5">
                    <p className="text-[1.02rem] sm:text-[1.3rem] font-semibold leading-6 sm:leading-7 text-[#5f458f]">
                      {item.title}
                    </p>
                    <p className="mt-1 text-[0.85rem] sm:text-[0.95rem] leading-6 sm:leading-7 text-[var(--text-secondary)]">
                      {item.description}
                    </p>
                  </div>
                  <FiArrowUpRight className="mt-1 text-[0.85rem] sm:text-[1rem] text-[#d9c0cf]/0 transition-all duration-300 group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 group-hover/item:text-[#d9c0cf]/70 shrink-0" />
                </div>
              ))}
            </div>
          </article>

          {/* Card 3: Values */}
          <article className="stagger-item group relative rounded-[1.6rem] sm:rounded-[2rem] border border-[rgba(239,230,239,0.9)] bg-[linear-gradient(160deg,rgba(255,252,252,0.85),rgba(249,242,247,0.72))] p-5 sm:p-7 shadow-[0_18px_48px_rgba(196,178,209,0.08)] backdrop-blur-xl opacity-0 transition-all duration-500 hover:shadow-[0_26px_64px_rgba(196,178,209,0.16)] hover:-translate-y-1 md:col-span-2 xl:col-span-1">
            <img
              src={flowerImage}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-0 hidden w-20 -translate-y-1/2 opacity-55 sm:block md:w-24"
            />
            <div
              className="pointer-events-none absolute inset-0 rounded-[1.6rem] sm:rounded-[2rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ boxShadow: "inset 0 0 0 1.5px rgba(217,192,207,0.28)" }}
            />

            <h3 className="section-title-display text-[1.6rem] sm:text-[2.15rem] text-[#5f458f]">
              {t("about.cards.values.title")}
            </h3>

            <div className="mt-5 sm:mt-6 grid gap-1 sm:grid-cols-1">
              {values.map((item, index) => (
                <div
                  key={item.title}
                  className="group/item flex items-start gap-3 sm:gap-4 rounded-2xl p-2.5 sm:p-3 transition-all duration-300 hover:bg-[rgba(179,170,215,0.07)]"
                >
                  <div className="flex h-11 w-11 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-[linear-gradient(135deg,rgba(239,228,245,0.95),rgba(252,245,247,0.92))] text-[1rem] sm:text-[1.3rem] text-[#9a83b7] shadow-[0_10px_22px_rgba(193,143,160,0.06)] transition-all duration-300 group-hover/item:scale-105 group-hover/item:text-[#d39db4]">
                    {valueIcons[index]}
                  </div>
                  <div className="min-w-0 flex-1 pt-0.5">
                    <p className="text-[1.02rem] sm:text-[1.3rem] font-semibold leading-6 sm:leading-7 text-[#5f458f]">
                      {item.title}
                    </p>
                    <p className="mt-1 text-[0.85rem] sm:text-[0.95rem] leading-6 sm:leading-7 text-[var(--text-secondary)]">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </article>
          </div>
        </div>

        {/* --- Closing flourish --- */}
        <div className="stagger-item mt-8 sm:mt-12 flex flex-col items-center gap-3 opacity-0">
          <div className="flex items-center gap-2 sm:gap-3 text-[#d9c0cf]/50">
            <span className="inline-block h-[1px] w-6 sm:w-8 bg-gradient-to-r from-transparent to-[#d9c0cf]/40" />
            <span className="text-[1rem] sm:text-[1.15rem]">✦</span>
            <span className="inline-block h-[1px] w-6 sm:w-8 bg-gradient-to-l from-transparent to-[#d9c0cf]/40" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

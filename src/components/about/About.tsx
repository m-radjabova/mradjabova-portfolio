import { useEffect, useRef, type JSX } from "react";
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

  const cardGroups: {
    key: "whatIDo" | "values";
    title: string;
    items: AboutCardItem[];
    icons: JSX.Element[];
  }[] = [
    { key: "whatIDo", title: t("about.cards.whatIDo.title"), items: whatIDo, icons: whatIDoIcons },
    { key: "values", title: t("about.cards.values.title"), items: values, icons: valueIcons },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden px-3 pb-10 pt-6 sm:px-4 sm:pb-12 sm:pt-8 lg:px-8 lg:pb-16 lg:pt-10"
    >
      {/* ── Background: one interactive glow + quiet grid texture, nothing scattered ── */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{ "--mx": "50%", "--my": "50%" } as React.CSSProperties}
      >
        <div
          className="absolute h-[20rem] w-[20rem] rounded-full opacity-20 blur-[100px] transition-all duration-700 ease-out sm:h-[30rem] sm:w-[30rem] sm:opacity-30 sm:blur-[130px]"
          style={{
            background:
              "radial-gradient(circle, rgba(143,127,174,0.4), rgba(217,192,207,0.2) 50%, transparent 72%)",
            left: "calc(var(--mx) - 10rem)",
            top: "calc(var(--my) - 10rem)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
            backgroundSize: "22px 22px",
            color: "#5f458f",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1500px]">
       

        {/* ── Heading ── */}
        <div className="stagger-item opacity-0">
          <h2 className="section-title-display text-[clamp(2.75rem,9vw,7.5rem)] leading-[0.86] text-[#5f458f]">
            {t("about.heading")}
          </h2>

          <p
            className="mt-2 text-[clamp(1.4rem,3.6vw,2.8rem)] text-[#d5a1b6] sm:mt-3"
            style={{ fontFamily: "var(--font-script)" }}
          >
            {t("about.scriptLine")}
          </p>

          {/* Pull-quote intro */}
          <div className="relative mt-6 max-w-3xl border-l-2 border-[#e7d5e2] pl-5 sm:mt-8 sm:pl-7">
            <FaQuoteLeft className="absolute -left-[0.6rem] -top-2 text-[1.1rem] text-[#e7d5e2] sm:-top-2.5 sm:text-[1.3rem]" />
            <p className="text-[1rem] leading-[1.85rem] text-[var(--text-secondary)] sm:text-[1.2rem] sm:leading-[2.2rem]">
              {t("about.intro")}
            </p>
          </div>
        </div>

        {/* ── Cards ── */}
        <div className="relative mt-10 sm:mt-14">
          <div className="grid gap-5 sm:gap-6 md:grid-cols-2 xl:grid-cols-[0.86fr_1fr_1fr]">
            {/* Card 1: Story / Bio — the one card that earns a little more warmth */}
            <article className="stagger-item group relative flex flex-col overflow-hidden rounded-2xl border border-[rgba(232,222,235,0.9)] bg-white/70 p-6 opacity-0 backdrop-blur-sm transition-all duration-400 hover:-translate-y-1 hover:border-[#8f7fae]/30 hover:shadow-[0_24px_50px_rgba(114,106,156,0.1)] sm:p-7">
              <img
                src={flowerImage}
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute -right-2 -top-4 hidden w-24 opacity-[0.35] sm:block md:w-28"
              />

              <span className="relative font-mono text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#8f7fae]">
                {t("about.cards.story.title")}
              </span>

              <p className="relative mt-4 flex-1 text-[0.95rem] leading-7 text-[var(--text-secondary)] sm:mt-5 sm:text-[1rem] sm:leading-8">
                {t("about.cards.story.description")}
              </p>

              <div className="relative mt-5 flex flex-wrap gap-2 sm:mt-6">
                <span className="rounded-full border border-[#e7d5e2] px-3 py-1 text-[0.72rem] font-medium text-[#8b7a9e] sm:text-[0.78rem]">
                  {t("about.yearsExp")}
                </span>
                <span className="rounded-full border border-[#dcd6ee] px-3 py-1 text-[0.72rem] font-medium text-[#8b7a9e] sm:text-[0.78rem]">
                  {t("about.fullStack")}
                </span>
              </div>

              <div className="relative mt-6 flex items-end justify-between gap-4 border-t border-[rgba(217,192,207,0.35)] pt-4 sm:pt-5">
                <div>
                  <p
                    className="text-[1.35rem] leading-[1] text-[#d39db4] sm:text-[1.7rem]"
                    style={{ fontFamily: "var(--font-script)" }}
                  >
                    Muslima Radjabova
                  </p>
                  <p className="mt-1 text-[0.7rem] tracking-wide text-[var(--text-muted)] sm:text-[0.78rem]">
                    {t("about.webRole")}
                  </p>
                </div>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[rgba(217,192,207,0.7)] text-[0.95rem] text-[#d39db4] transition-transform duration-300 group-hover:scale-110 sm:h-10 sm:w-10">
                  <FaHeart />
                </span>
              </div>
            </article>

            {/* Card 2 & 3: What I Do / Values — hairline lists, no boxed noise */}
            {cardGroups.map((group) => (
              <article
                key={group.key}
                className="stagger-item group relative rounded-2xl border border-[rgba(232,222,235,0.9)] bg-white/70 p-6 opacity-0 backdrop-blur-sm transition-all duration-400 hover:-translate-y-1 hover:border-[#8f7fae]/30 hover:shadow-[0_24px_50px_rgba(114,106,156,0.1)] sm:p-7"
              >
                <span className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#8f7fae]">
                  {group.title}
                </span>

                <div className="mt-4 divide-y divide-[rgba(217,192,207,0.25)] sm:mt-5">
                  {group.items.map((item, index) => (
                    <div key={item.title} className="group/item flex items-start gap-3.5 py-3.5 first:pt-0 last:pb-0 sm:gap-4">
                      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[rgba(217,192,207,0.7)] text-[0.85rem] text-[#9a83b7] transition-colors duration-300 group-hover/item:border-[#8f7fae]/50 group-hover/item:text-[#726a9c]">
                        {group.icons[index]}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-[1rem] font-semibold leading-6 text-[#5f458f] sm:text-[1.08rem]">
                          {item.title}
                        </p>
                        <p className="mt-0.5 text-[0.85rem] leading-6 text-[var(--text-secondary)] sm:text-[0.9rem]">
                          {item.description}
                        </p>
                      </div>
                      <FiArrowUpRight className="mt-1 shrink-0 -translate-x-1 text-[0.85rem] text-[var(--text-muted)] opacity-0 transition-all duration-300 group-hover/item:translate-x-0 group-hover/item:text-[#8f7fae] group-hover/item:opacity-100" />
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* ── Closing flourish: one quiet line, not a scatter ── */}
        <div className="stagger-item mt-10 flex justify-center opacity-0 sm:mt-14">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#d9c0cf]/50 to-transparent sm:w-32" />
        </div>
      </div>
    </section>
  );
};

export default About;
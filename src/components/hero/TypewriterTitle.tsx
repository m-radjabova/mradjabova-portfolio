import { useEffect, useMemo, useState, useRef } from "react";
import { useTranslation } from "react-i18next";

const TypewriterTitle = () => {
  const { t } = useTranslation();
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [isTypingPause, setIsTypingPause] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  const texts = useMemo(
    () => t("hero.typewriter", { returnObjects: true }) as string[],
    [t]
  );
  const longestText = useMemo(
    () =>
      texts.reduce(
        (longest, current) =>
          current.length > longest.length ? current : longest,
        ""
      ),
    [texts]
  );

  useEffect(() => {
    setDisplayText("");
    setCurrentIndex(0);
    setIsDeleting(false);
    setLoopNum(0);
    setIsTypingPause(false);
  }, [texts]);

  useEffect(() => {
    if (texts.length === 0) return;

    const currentText = texts[loopNum % texts.length] || "";
    const typingSpeed = isDeleting ? 40 : 70;
    const pauseTime = isDeleting ? 400 : 1800;

    if (isTypingPause) return;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        const nextIndex = currentIndex + 1;
        setDisplayText(currentText.substring(0, nextIndex));
        setCurrentIndex(nextIndex);

        if (nextIndex > currentText.length) {
          setIsTypingPause(true);
          setTimeout(() => {
            setIsDeleting(true);
            setIsTypingPause(false);
          }, pauseTime);
        }
      } else {
        const nextIndex = currentIndex - 1;
        setDisplayText(currentText.substring(0, nextIndex));
        setCurrentIndex(nextIndex);

        if (nextIndex <= 0) {
          setIsTypingPause(true);
          setTimeout(() => {
            setIsDeleting(false);
            setLoopNum((prev) => prev + 1);
            setIsTypingPause(false);
          }, 300);
        }
      }
    }, isTypingPause ? pauseTime : typingSpeed);

    return () => clearTimeout(timer);
  }, [currentIndex, isDeleting, loopNum, texts, isTypingPause]);

  const isComplete = !isDeleting && currentIndex > 0 && currentIndex >= (texts[loopNum % texts.length]?.length || 0);

  return (
    <h1 className="mt-4 min-w-0 max-w-2xl pt-2 text-3xl font-black leading-[1.08] tracking-[-0.03em] text-[var(--text-primary)] sm:mt-6 sm:pt-3 sm:text-5xl sm:leading-[1.12] lg:text-5xl xl:text-6xl">
      <span className="block">{t("hero.greeting")}</span>

      <span className="relative mt-2 block min-w-0">
        <span
          aria-hidden="true"
          className="invisible block max-w-full whitespace-normal break-words"
        >
          {longestText}
        </span>

        <span className="absolute inset-0 block min-w-0">
          {/* Decorative background glow behind text */}
          <span
            className="absolute -inset-x-4 -inset-y-2 rounded-2xl opacity-0 transition-opacity duration-700 xl:opacity-100"
            style={{
              background:
                "radial-gradient(ellipse at center, color-mix(in srgb, var(--accent-primary) 8%, transparent) 0%, transparent 70%)",
              opacity: isComplete ? 0.6 : 0,
            }}
          />

          <span
            ref={containerRef}
            className="relative inline-flex max-w-full items-end whitespace-normal break-words"
          >
            <span
              className="bg-gradient-to-r from-[var(--accent-gradient-from)] via-[var(--accent-gradient-via)] to-[var(--accent-gradient-to)] bg-clip-text text-transparent"
              style={{
                backgroundSize: "200% 100%",
                animation: "shimmer-text 4s ease-in-out infinite",
              }}
            >
              {displayText}
            </span>

            {/* Elegant cursor */}
            <span
              className="relative ml-0.5 inline-block h-[0.85em] w-[3px] rounded-full align-[-1px]"
              style={{
                background:
                  "linear-gradient(180deg, var(--accent-primary), var(--accent-secondary))",
                boxShadow: `0 0 8px color-mix(in srgb, var(--accent-primary) 50%, transparent), 0 0 20px color-mix(in srgb, var(--accent-secondary) 30%, transparent)`,
                animation: isTypingPause
                  ? "cursor-blink 0.8s ease-in-out infinite"
                  : "cursor-pulse 0.6s ease-in-out infinite",
              }}
            />
          </span>
        </span>
      </span>

      {/* Decorative line under the title */}
      <span className="relative mt-4 block h-px w-0 overflow-hidden transition-all duration-1000 sm:mt-5">
        <span
          className="absolute inset-0 block h-full w-full rounded-full transition-opacity duration-700"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--accent-primary), var(--accent-secondary), var(--accent-tertiary), transparent)",
            opacity: isComplete ? 0.4 : 0,
            width: isComplete ? "100%" : "0%",
            transition: "width 1.2s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.6s ease",
          }}
        />
      </span>
    </h1>
  );
};

export default TypewriterTitle;

import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

const TypewriterTitle = () => {
  const { t } = useTranslation();
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  const texts = useMemo(
    () => t("hero.typewriter", { returnObjects: true }) as string[],
    [t]
  );

  useEffect(() => {
    setDisplayText("");
    setCurrentIndex(0);
    setIsDeleting(false);
    setLoopNum(0);
  }, [texts]);

  useEffect(() => {
    const currentText = texts[loopNum % texts.length];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = isDeleting ? 500 : 1500;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentText.substring(0, currentIndex + 1));
        setCurrentIndex((prev) => prev + 1);

        if (currentIndex === currentText.length) {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        setDisplayText(currentText.substring(0, currentIndex - 1));
        setCurrentIndex((prev) => prev - 1);

        if (currentIndex === 0) {
          setIsDeleting(false);
          setLoopNum((prev) => prev + 1);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentIndex, isDeleting, loopNum, texts]);

  return (
    <h1 className="max-w-4xl mt-4 text-3xl font-black leading-[1.05] tracking-[-0.03em] text-[var(--text-primary)] sm:text-5xl lg:text-7xl sm:leading-[1.1] sm:mt-6">
      <span className="block">{t("hero.greeting")}</span>

      <span className="relative block min-h-[1.95em] sm:h-[1.15em]">
        <span className="absolute left-0 top-0 max-w-full whitespace-normal break-words sm:whitespace-nowrap">
          <span className="bg-gradient-to-r from-[var(--accent-gradient-from)] via-[var(--accent-gradient-via)] to-[var(--accent-gradient-to)] bg-clip-text text-transparent">
            {displayText}
          </span>

          <span className="ml-1 inline-block animate-pulse leading-none text-[var(--accent-primary)]">
            |
          </span>
        </span>
      </span>
    </h1>
  );
};

export default TypewriterTitle;

import { useEffect, useMemo, useState } from "react";

const TypewriterTitle = () => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  const texts = useMemo(
    () => [
      "Muslima Radjabova",
      "a Frontend Developer",
      "a Backend Developer",
      "a UI/UX Designer",
      "a Creative Coder",
    ],
    []
  );

  useEffect(() => {
    const currentText = texts[loopNum % texts.length];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = isDeleting ? 500 : 1500;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentText.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);

        if (currentIndex === currentText.length) {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        setDisplayText(currentText.substring(0, currentIndex - 1));
        setCurrentIndex(currentIndex - 1);

        if (currentIndex === 0) {
          setIsDeleting(false);
          setLoopNum(loopNum + 1);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentIndex, isDeleting, loopNum, texts]);

  return (
    <h1 className="max-w-4xl text-4xl font-black leading-[1.05] tracking-[-0.03em] text-[var(--text-primary)] sm:text-5xl lg:text-7xl">
      Hi, I&apos;m{" "}
      <span className="bg-gradient-to-r from-[var(--accent-gradient-from)] via-[var(--accent-gradient-via)] to-[var(--accent-gradient-to)] bg-clip-text text-transparent">
        {displayText}
        <span className="ml-1 inline-block animate-pulse text-[var(--accent-primary)]">|</span>
      </span>
    </h1>
  );
};

export default TypewriterTitle;

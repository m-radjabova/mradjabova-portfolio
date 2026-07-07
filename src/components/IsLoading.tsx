import { useEffect, useRef } from "react";
import lottie from "lottie-web";
import useResolvedTheme from "../hooks/useResolvedTheme";
import loadingAnimation from "./loading.json";

const IsLoading = () => {
  useResolvedTheme();
  const animationContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!animationContainerRef.current) {
      return;
    }

    const animation = lottie.loadAnimation({
      container: animationContainerRef.current,
      animationData: loadingAnimation,
      renderer: "canvas",
      loop: false,
      autoplay: true,
      rendererSettings: {
        clearCanvas: true,
        preserveAspectRatio: "xMidYMid meet",
      },
    });

    animation.setSpeed(0.62);
    animation.setSubframe(true);

    return () => {
      animation.destroy();
    };
  }, []);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--hero-bg)] px-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 48%, rgba(251,124,170,0.14) 0%, rgba(251,118,209,0.09) 24%, rgba(244,232,239,0) 56%)",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2 opacity-80"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(251,130,130,0.12) 14%, rgba(251,124,170,0.22) 50%, rgba(251,118,209,0.12) 86%, transparent 100%)",
        }}
      />

      <div className="relative z-10 flex w-full max-w-6xl flex-col items-center">
        <div
          ref={animationContainerRef}
          className="w-full max-w-[72rem] transform-gpu sm:max-w-[78rem]"
          aria-label="Loading animation"
          role="img"
        />
      </div>
    </div>
  );
};

export default IsLoading;

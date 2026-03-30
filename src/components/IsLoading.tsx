import { useState } from "react";
import useResolvedTheme from "../hooks/useResolvedTheme";

const IsLoading = () => {
  useResolvedTheme();
  const dots = useState(() => [...Array(12).keys()])[0];

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--bg-base)] px-4 text-[var(--text-primary)] transition-colors duration-300">
      <div className="relative h-40 w-40 sm:h-48 sm:w-48">
        {dots.map((index) => {
          const angle = index * 30;

          return (
            <span
              key={index}
              className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[var(--accent-secondary)] to-[var(--accent-primary)] shadow-[0_8px_18px_rgba(255,107,154,0.2)] animate-[spinner-fade_1.1s_linear_infinite]"
              style={{
                transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-64px)`,
                animationDelay: `${index * 0.09}s`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default IsLoading;

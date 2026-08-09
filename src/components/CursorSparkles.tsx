import { useEffect, useRef } from "react";

const STAR_COUNT = 6;
const EASE = 0.18; // qanchalik "yumshoq" ergashadi — kichikroq = ko'proq lag

function CursorSparkles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLSpanElement[]>([]);
  const positions = useRef(
    Array.from({ length: STAR_COUNT }, () => ({ x: -100, y: -100 })),
  );
  const target = useRef({ x: -100, y: -100 });
  const rafId = useRef<number>(0);
  const active = useRef(false);

  useEffect(() => {
    // Faqat "sichqonchali" qurilmalarda va reduced-motion yoqilmagan bo'lsa ishga tushadi
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!hasFinePointer || prefersReducedMotion) return;

    const section = document.getElementById("home");
    if (!section) return;

    const handleMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      target.current.x = e.clientX - rect.left;
      target.current.y = e.clientY - rect.top;
      if (!active.current) {
        active.current = true;
        containerRef.current?.style.setProperty("opacity", "1");
      }
    };

    const handleLeave = () => {
      active.current = false;
      containerRef.current?.style.setProperty("opacity", "0");
    };

    const tick = () => {
      let px = target.current.x;
      let py = target.current.y;

      positions.current.forEach((pos, i) => {
        pos.x += (px - pos.x) * EASE;
        pos.y += (py - pos.y) * EASE;
        const el = starsRef.current[i];
        if (el) {
          // Faqat transform — layout/paint qayta hisoblanmaydi, juda arzon
          el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) scale(${1 - i * 0.12})`;
        }
        px = pos.x;
        py = pos.y;
      });

      rafId.current = requestAnimationFrame(tick);
    };

    section.addEventListener("mousemove", handleMove, { passive: true });
    section.addEventListener("mouseleave", handleLeave, { passive: true });
    rafId.current = requestAnimationFrame(tick);

    return () => {
      section.removeEventListener("mousemove", handleMove);
      section.removeEventListener("mouseleave", handleLeave);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-30 hidden opacity-0 transition-opacity duration-300 lg:block"
      aria-hidden="true"
    >
      {Array.from({ length: STAR_COUNT }, (_, i) => (
        <span
          key={i}
          ref={(el) => {
            if (el) starsRef.current[i] = el;
          }}
          className="absolute left-0 top-0 select-none will-change-transform"
          style={{
            fontSize: `${14 - i * 1.4}px`,
            color: i % 2 === 0 ? "#c18fa0" : "#b3aad7",
            opacity: 1 - i * 0.13,
            filter: `blur(${i > 3 ? 0.4 : 0}px)`,
          }}
        >
          ✦
        </span>
      ))}
    </div>
  );
}

export default CursorSparkles;
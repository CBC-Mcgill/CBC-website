"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";

const subscribe = (callback: () => void) => {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
};
const getSnapshot = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Progressive enhancement: content remains visible before hydration and without JS. */
export function MotionEffects() {
  const pathname = usePathname();
  const reduced = useSyncExternalStore(subscribe, getSnapshot, () => false);
  const [paused, setPaused] = useState(false);
  const enabled = !reduced && !paused;

  useEffect(() => {
    document.documentElement.dataset.motion = enabled ? "on" : "off";
    if (!enabled) return;
    const animations: Animation[] = [];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ isIntersecting, target }) => {
          if (!isIntersecting) return;
          animations.push(
            target.animate(
              [
                { opacity: 0.25, transform: "translateY(28px)" },
                { opacity: 1, transform: "translateY(0)" },
              ],
              { duration: 800, easing: "cubic-bezier(.16,1,.3,1)" },
            ),
          );
          observer.unobserve(target);
        });
      },
      { threshold: 0.08 },
    );
    document
      .querySelectorAll("main section, main header")
      .forEach((el) => observer.observe(el));

    const finePointer = window.matchMedia("(pointer: fine)");
    let frame = 0;
    let active: HTMLElement | null = null;
    const reset = () => {
      if (active) {
        active.style.removeProperty("--rx");
        active.style.removeProperty("--ry");
      }
      active = null;
    };
    const move = (event: PointerEvent) => {
      if (!finePointer.matches || event.pointerType === "touch") return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const target = (event.target as HTMLElement).closest<HTMLElement>(
          "[data-tilt]",
        );
        if (target !== active) reset();
        active = target;
        document.documentElement.style.setProperty(
          "--pointer-x",
          `${(event.clientX / innerWidth) * 100}%`,
        );
        document.documentElement.style.setProperty(
          "--pointer-y",
          `${(event.clientY / innerHeight) * 100}%`,
        );
        if (!target) return;
        const rect = target.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        target.style.setProperty("--rx", `${(0.5 - y) * 7}deg`);
        target.style.setProperty("--ry", `${(x - 0.5) * 9}deg`);
        target.style.setProperty("--shine-x", `${x * 100}%`);
        target.style.setProperty("--shine-y", `${y * 100}%`);
      });
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", reset);
    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
      cancelAnimationFrame(frame);
      reset();
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", reset);
    };
  }, [enabled, pathname]);

  return (
    <>
      <div className="atmosphere" aria-hidden="true">
        <div className="aurora aurora-one" />
        <div className="aurora aurora-two" />
        <div className="ambient-grid" />
        {Array.from({ length: 18 }, (_, i) => (
          <i
            key={i}
            className="spark"
            style={{
              left: `${(i * 37 + 7) % 100}%`,
              top: `${(i * 23 + 13) % 100}%`,
              animationDelay: `${i * -1.7}s`,
              animationDuration: `${12 + (i % 6)}s`,
            }}
          />
        ))}
      </div>
      <button
        className="motion-toggle"
        type="button"
        onClick={() => setPaused((value) => !value)}
        disabled={reduced}
        aria-pressed={enabled}
        aria-label={
          reduced
            ? "Reduced motion enabled"
            : enabled
              ? "Pause animations"
              : "Enable animations"
        }
      >
        <span aria-hidden="true">{enabled ? "Ⅱ" : "▷"}</span>
        {reduced ? "Reduced motion" : enabled ? "Motion on" : "Motion off"}
      </button>
    </>
  );
}

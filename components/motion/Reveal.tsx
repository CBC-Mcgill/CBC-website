"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Reveals [data-reveal] elements once they scroll into view by setting data-inview.
 * Children of [data-reveal-group] get a --i index so CSS can stagger them.
 * Styles live in globals.css and only apply when <html class="js">, so content
 * stays visible without JavaScript.
 */
export function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.add("js");

    document.querySelectorAll<HTMLElement>("[data-reveal-group]").forEach((group) => {
      Array.from(group.children).forEach((child, i) => {
        if (child instanceof HTMLElement) {
          child.dataset.reveal = child.dataset.reveal ?? "";
          child.style.setProperty("--i", String(i));
        }
      });
    });

    const targets = document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-inview])");
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.inview = "";
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );

    targets.forEach((el) => {
      // Already on screen at load: show without waiting for a scroll.
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) el.dataset.inview = "";
      else observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}

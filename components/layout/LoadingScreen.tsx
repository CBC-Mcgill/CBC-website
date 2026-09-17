"use client";

import { useEffect, useState } from "react";

const LOAD_DURATION = 1500;
const EXIT_DURATION = 650;

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const duration = reducedMotion ? 120 : LOAD_DURATION;
    const exitDuration = reducedMotion ? 80 : EXIT_DURATION;
    const startedAt = performance.now();
    let frame = 0;

    document.body.style.overflow = "hidden";

    const tick = (now: number) => {
      const elapsed = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - elapsed, 3);
      setProgress(Math.min(100, Math.round(eased * 100)));

      if (elapsed < 1) {
        frame = requestAnimationFrame(tick);
        return;
      }

      setLeaving(true);
      window.setTimeout(() => setVisible(false), exitDuration);
    };

    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    if (!visible) document.body.style.overflow = "";
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className={`loading-screen${leaving ? " is-leaving" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Loading Claude Builder Club"
    >
      <div className="loading-grain" aria-hidden="true" />
      <div className="loading-orbit" aria-hidden="true">
        <span className="loading-orbit-ring loading-orbit-ring-one" />
        <span className="loading-orbit-ring loading-orbit-ring-two" />
        <span className="loading-star">✳</span>
      </div>

      <div className="loading-copy">
        <p className="loading-kicker">McGill University</p>
        <p className="loading-title">Claude Builder Club</p>
        <p className="loading-message">Making room for wild ideas.</p>
      </div>

      <div className="loading-progress" aria-hidden="true">
        <div className="loading-progress-meta">
          <span>Building something good</span>
          <span>{progress.toString().padStart(2, "0")}</span>
        </div>
        <div className="loading-progress-track">
          <span style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
}

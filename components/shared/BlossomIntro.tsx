'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const INTRO_KEY = 'cbcIntroPlayed';

const PETAL_ANGLES = [0, 60, 120, 180, 240, 300];

export function BlossomIntro() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('intro-play');

    if (pathname !== '/' || reduceMotion) {
      root.classList.add('intro-complete');
      return;
    }

    let hasPlayed = false;
    try {
      hasPlayed = sessionStorage.getItem(INTRO_KEY) === 'true';
    } catch {
      hasPlayed = false;
    }

    if (hasPlayed) {
      root.classList.add('intro-complete');
      return;
    }

    try {
      sessionStorage.setItem(INTRO_KEY, 'true');
    } catch {
      // ignore
    }

    root.classList.remove('intro-complete');
    root.classList.add('intro-play');

    const timeout = window.setTimeout(() => {
      root.classList.add('intro-complete');
      root.classList.remove('intro-play');
    }, 2400);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [pathname, reduceMotion]);

  return (
    <div id="blossom-intro" aria-hidden="true">
      <div className="wash" />
      <div className="blossom">
        {PETAL_ANGLES.map((angle) => (
          <span
            key={angle}
            className="petal"
            style={{ '--angle': `${angle}deg` } as React.CSSProperties}
          />
        ))}
        <span className="core" />
      </div>
    </div>
  );
}

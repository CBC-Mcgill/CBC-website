'use client';

import { type CSSProperties, useEffect } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const INTRO_KEY = 'cbcIntroPlayed';
const TITLE_LETTERS = Array.from('CLAUDE');
const RING_COUNT = [0, 1, 2];
const SPARK_COUNT = Array.from({ length: 14 }, (_, index) => index);

export function BlossomIntro() {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('intro-play');

    if (reduceMotion) {
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
    }, 3000);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [reduceMotion]);

  return (
    <div id="blossom-intro" aria-hidden="true">
      <div className="intro-backdrop" />
      <div className="intro-orbit">
        {RING_COUNT.map((ring) => (
          <span
            key={ring}
            className="orbit-ring"
            style={{ '--ring-index': ring } as CSSProperties}
          />
        ))}
        {SPARK_COUNT.map((spark) => (
          <span
            key={spark}
            className="orbit-spark"
            style={{ '--spark-index': spark } as CSSProperties}
          />
        ))}
      </div>
      <div className="intro-wordmark">
        <div className="wordmark-title">
          {TITLE_LETTERS.map((letter, index) => (
            <span
              key={`${letter}-${index}`}
              className="title-letter"
              style={{ '--letter-index': index } as CSSProperties}
            >
              {letter}
            </span>
          ))}
        </div>
        <div className="wordmark-subtitle">@ McGill</div>
      </div>
      <div className="intro-flash" />
    </div>
  );
}

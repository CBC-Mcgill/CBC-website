'use client';

import { type CSSProperties, useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const INTRO_KEY = 'cbcIntroPlayed';
const INTRO_DURATION_MS = 3000;
const TITLE_LETTERS = Array.from('CLAUDE');
const RING_COUNT = [0, 1, 2];
const SPARK_COUNT = Array.from({ length: 14 }, (_, index) => index);

const setIntroPlayed = () => {
  try {
    sessionStorage.setItem(INTRO_KEY, 'true');
  } catch {
    // ignore
  }
};

const hasIntroPlayed = () => {
  try {
    return sessionStorage.getItem(INTRO_KEY) === 'true';
  } catch {
    return false;
  }
};

export function BlossomIntro() {
  const reduceMotion = useReducedMotion();
  const completionTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const root = document.documentElement;

    const clearCompletionTimeout = () => {
      if (completionTimeoutRef.current === null) return;
      window.clearTimeout(completionTimeoutRef.current);
      completionTimeoutRef.current = null;
    };

    const markIntroComplete = () => {
      root.classList.remove('intro-play');
      root.classList.add('intro-complete');
      setIntroPlayed();
    };

    if (reduceMotion) {
      clearCompletionTimeout();
      markIntroComplete();
      return clearCompletionTimeout;
    }

    if (hasIntroPlayed()) {
      clearCompletionTimeout();
      markIntroComplete();
      return clearCompletionTimeout;
    }

    setIntroPlayed();

    if (!root.classList.contains('intro-play')) {
      root.classList.remove('intro-complete');
      root.classList.add('intro-play');
    }

    clearCompletionTimeout();
    completionTimeoutRef.current = window.setTimeout(() => {
      completionTimeoutRef.current = null;
      markIntroComplete();
    }, INTRO_DURATION_MS);

    return clearCompletionTimeout;
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

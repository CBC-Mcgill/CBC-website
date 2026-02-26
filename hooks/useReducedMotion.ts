'use client';

import { useSyncExternalStore } from 'react';

const subscribeToMotionPreference = (callback: () => void) => {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const handler = () => callback();
  mediaQuery.addEventListener('change', handler);
  return () => mediaQuery.removeEventListener('change', handler);
};

const getMotionPreference = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const getServerMotionPreference = () => false;

export const useReducedMotion = (): boolean =>
  useSyncExternalStore(
    subscribeToMotionPreference,
    getMotionPreference,
    getServerMotionPreference,
  );

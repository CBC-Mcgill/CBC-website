'use client';

import { useEffect, useRef } from 'react';

export const useNavIndicator = () => {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const indicator = nav.querySelector('.nav-indicator') as HTMLElement | null;
    if (!indicator) return;

    const updateIndicator = (target?: Element | null) => {
      const link = target || nav.querySelector('a.active') || nav.querySelector('a');
      if (!link) return;
      const navRect = nav.getBoundingClientRect();
      const linkRect = link.getBoundingClientRect();
      nav.style.setProperty('--nav-left', `${linkRect.left - navRect.left}px`);
      nav.style.setProperty('--nav-width', `${linkRect.width}px`);
      nav.classList.add('has-indicator');
    };

    const onPointerOver = (e: PointerEvent) => {
      const link = (e.target as Element).closest('a');
      if (!link) return;
      updateIndicator(link);
    };

    const onPointerLeave = () => updateIndicator();
    const onResize = () => updateIndicator();

    nav.addEventListener('pointerover', onPointerOver);
    nav.addEventListener('pointerleave', onPointerLeave);
    window.addEventListener('resize', onResize);

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => updateIndicator());
    }

    updateIndicator();

    return () => {
      nav.removeEventListener('pointerover', onPointerOver);
      nav.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return navRef;
};

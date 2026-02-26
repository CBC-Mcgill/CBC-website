'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const PAGE_MAP: Record<string, string> = {
  '/': 'home',
  '/about': 'about',
  '/people': 'people',
  '/hackathon': 'hackathon',
  '/contact': 'contact',
};

// Longest reveal chain is ~1.5s (0.6s delay + 0.9s animation).
const PAGE_REVEAL_DURATION_MS = 1800;

interface PageShellProps {
  children: React.ReactNode;
}

export function PageShell({ children }: PageShellProps) {
  const pathname = usePathname();
  const initializedTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const body = document.body;
    const pageName = PAGE_MAP[pathname] || '';
    const lastPathname = body.dataset.routePathname || '';
    const isNewPath = lastPathname !== pathname;

    const clearInitializedTimeout = () => {
      if (initializedTimeoutRef.current === null) return;
      window.clearTimeout(initializedTimeoutRef.current);
      initializedTimeoutRef.current = null;
    };

    body.classList.remove('page-leave');
    body.dataset.page = pageName;

    if (isNewPath) {
      body.classList.remove('page-loaded', 'page-initialized');
      // Force reflow so route transitions can restart cleanly.
      void body.offsetWidth;
      body.classList.add('page-loaded');
      body.dataset.routePathname = pathname;
    }

    if (body.classList.contains('page-loaded') && !body.classList.contains('page-initialized')) {
      clearInitializedTimeout();
      initializedTimeoutRef.current = window.setTimeout(() => {
        initializedTimeoutRef.current = null;
        body.classList.add('page-initialized');
      }, PAGE_REVEAL_DURATION_MS);
    }

    return clearInitializedTimeout;
  }, [pathname]);

  return <div className="page-shell">{children}</div>;
}

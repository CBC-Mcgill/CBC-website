'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const PAGE_MAP: Record<string, string> = {
  '/': 'home',
  '/about': 'about',
  '/people': 'people',
  '/contact': 'contact',
};

interface PageShellProps {
  children: React.ReactNode;
}

export function PageShell({ children }: PageShellProps) {
  const pathname = usePathname();

  useEffect(() => {
    const body = document.body;
    const pageName = PAGE_MAP[pathname] || '';

    body.classList.remove('page-loaded', 'page-initialized');
    // Force reflow
    void body.offsetWidth;

    body.dataset.page = pageName;
    body.classList.add('page-loaded');

    const timeout = window.setTimeout(() => {
      body.classList.add('page-initialized');
    }, 1200);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [pathname]);

  return <div className="page-shell">{children}</div>;
}

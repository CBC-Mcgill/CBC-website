'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavIndicator } from '@/components/navigation/NavIndicator';

export function SiteHeader() {
  const pathname = usePathname();
  const [openPathname, setOpenPathname] = useState<string | null>(null);
  const isMenuOpen = openPathname === pathname;

  const menuId = 'primary-navigation';

  return (
    <header className="site-header">
      <div className="container">
        <div className="header-bar">
          <Link className="logo" href="/">
            <span className="logo-mark">CBC</span>
            <span className="logo-text">Claude Builder Club</span>
            <span className="logo-sub">McGill University Chapter</span>
          </Link>
          <button
            className="nav-toggle"
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls={menuId}
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => {
              setOpenPathname((currentPath) => (currentPath === pathname ? null : pathname));
            }}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
        <div className={`header-nav-wrap${isMenuOpen ? ' is-open' : ''}`} id={menuId}>
          <NavIndicator
            className={isMenuOpen ? 'is-open' : undefined}
            onNavigate={() => setOpenPathname(null)}
          />
        </div>
      </div>
    </header>
  );
}

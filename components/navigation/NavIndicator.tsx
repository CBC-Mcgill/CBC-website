'use client';

import { useNavIndicator } from '@/hooks/useNavIndicator';
import { NavLink } from './NavLink';

export function NavIndicator() {
  const navRef = useNavIndicator();

  return (
    <nav className="site-nav" aria-label="Primary" ref={navRef as React.RefObject<HTMLElement>}>
      <NavLink href="/" navKey="home">Home</NavLink>
      <NavLink href="/people" navKey="people">People</NavLink>
      <NavLink href="/contact" navKey="contact">Contact</NavLink>
      <span className="nav-indicator" aria-hidden="true" />
    </nav>
  );
}

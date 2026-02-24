'use client';

import { useNavIndicator } from '@/hooks/useNavIndicator';
import { NavLink } from './NavLink';

interface NavIndicatorProps {
  className?: string;
  onNavigate?: () => void;
}

export function NavIndicator({ className, onNavigate }: NavIndicatorProps) {
  const navRef = useNavIndicator();

  const navClassName = className ? `site-nav ${className}` : 'site-nav';

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!(event.target as HTMLElement).closest('a')) return;
    onNavigate?.();
  };

  return (
    <nav
      className={navClassName}
      aria-label="Primary"
      ref={navRef as React.RefObject<HTMLElement>}
      onClick={handleClick}
    >
      <NavLink href="/" navKey="home">Home</NavLink>
      <NavLink href="/about" navKey="about">About</NavLink>
      <NavLink href="/people" navKey="people">People</NavLink>
      <NavLink href="/hackathon" navKey="hackathon">Hackathon</NavLink>
      <NavLink href="/contact" navKey="contact">Contact</NavLink>
      <span className="nav-indicator" aria-hidden="true" />
    </nav>
  );
}

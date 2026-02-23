'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLinkProps {
  href: string;
  navKey: string;
  children: React.ReactNode;
}

export function NavLink({ href, navKey, children }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));

  return (
    <Link href={href} data-nav={navKey} className={isActive ? 'active' : undefined}>
      {children}
    </Link>
  );
}

import { clubLinks } from '@/data/links';
import type { ClubLinks } from '@/types';

interface ClubLinkProps {
  linkKey: keyof ClubLinks;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}

export function ClubLink({ linkKey, children, className, target = '_blank', rel = 'noopener noreferrer' }: ClubLinkProps) {
  const href = clubLinks[linkKey] || '#';
  return (
    <a href={href} className={className} target={target} rel={rel}>
      {children}
    </a>
  );
}

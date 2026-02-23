import { normalizeSocialHref } from '@/lib/normalizeSocialHref';
import { EmailIcon, LinkedInIcon, GitHubIcon } from '@/components/icons';
import type { Person } from '@/types';

type SocialType = 'email' | 'linkedin' | 'github';

const ICONS: Record<SocialType, React.ReactNode> = {
  email: <EmailIcon />,
  linkedin: <LinkedInIcon />,
  github: <GitHubIcon />,
};

interface PersonSocialsProps {
  person: Person;
}

export function PersonSocials({ person }: PersonSocialsProps) {
  const entries: { type: SocialType; href: string }[] = [];

  const socials: Array<{ type: SocialType; value: string }> = [
    { type: 'email', value: person.email || '' },
    { type: 'linkedin', value: person.linkedin || '' },
    { type: 'github', value: person.github || '' },
  ];

  for (const { type, value } of socials) {
    const href = normalizeSocialHref(type, value);
    if (href) entries.push({ type, href });
  }

  if (!entries.length) return null;

  return (
    <div className="person-socials">
      {entries.map(({ type, href }) => (
        <a
          key={type}
          className="person-social-link"
          href={href}
          aria-label={`${person.name} ${type}`}
          {...(type !== 'email' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {ICONS[type]}
        </a>
      ))}
    </div>
  );
}

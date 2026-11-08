import { normalizeSocialHref } from "@/lib/normalizeSocialHref";
import { EmailIcon, LinkedInIcon, GitHubIcon } from "@/components/icons";
import type { Person } from "@/types";
import s from "./people.module.css";

type SocialType = "email" | "linkedin" | "github";

const SOCIALS: Record<SocialType, { icon: React.ReactNode; label: (name: string) => string }> = {
  email: { icon: <EmailIcon />, label: (name) => `Email ${name}` },
  linkedin: { icon: <LinkedInIcon />, label: (name) => `${name} on LinkedIn` },
  github: { icon: <GitHubIcon />, label: (name) => `${name} on GitHub` },
};

export function PersonSocials({ person }: { person: Person }) {
  const entries = (["email", "linkedin", "github"] as const)
    .map((type) => ({ type, href: normalizeSocialHref(type, person[type] || "") }))
    .filter((e) => e.href);

  if (!entries.length) return null;

  return (
    <div className={s.socials}>
      {entries.map(({ type, href }) => (
        <a
          key={type}
          className={s.social}
          href={href}
          aria-label={SOCIALS[type].label(person.name)}
          {...(type !== "email" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {SOCIALS[type].icon}
        </a>
      ))}
    </div>
  );
}

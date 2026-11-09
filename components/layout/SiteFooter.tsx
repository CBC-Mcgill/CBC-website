import Link from "next/link";
import { Clawd } from "@/components/Clawd";
import { clubLinks } from "@/data/links";
import {
  DiscordIcon,
  EmailIcon,
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
} from "@/components/icons";

const [emailUser, emailHost] = clubLinks.email.split("@");

const elsewhere = [
  { label: "Discord", href: clubLinks.discord, icon: <DiscordIcon /> },
  { label: "Instagram", href: clubLinks.instagram, icon: <InstagramIcon /> },
  { label: "LinkedIn", href: clubLinks.linkedin, icon: <LinkedInIcon /> },
  { label: "GitHub", href: clubLinks.github, icon: <GitHubIcon /> },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <Link className="footer-wordmark" href="/">
          Claude Builder Club McGill
        </Link>
        <div className="footer-grid">
          <div className="footer-brand">
            <p>
              A student community that learns to build with AI and ships tools
              people use. Montréal, Québec.
            </p>
          </div>
          <nav aria-label="Site">
            <h3>Site</h3>
            <Link href="/projects">Projects</Link>
            <Link href="/hackathon">Hackathon</Link>
            <Link href="/people">Team</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <a href="/sponsors">Sponsor us</a>
          </nav>
          <nav aria-label="Elsewhere">
            <h3>Elsewhere</h3>
            {elsewhere.map((item) => (
              <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer">
                <span className="footer-icon">{item.icon}</span>
                {item.label}
              </a>
            ))}
            <a href={`mailto:${clubLinks.email}`}>
              <span className="footer-icon">
                <EmailIcon />
              </span>
              <span>
                {emailUser}
                <wbr />@{emailHost}
              </span>
            </a>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>A student club at McGill University.</span>
          <span className="footer-campus">
            <Clawd size={22} />
            Part of the Claude Campus program.
          </span>
        </div>
      </div>
    </footer>
  );
}

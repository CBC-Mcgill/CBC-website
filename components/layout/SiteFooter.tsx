import Link from "next/link";
import { clubLinks } from "@/data/links";

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
            <a href={clubLinks.discord} target="_blank" rel="noopener noreferrer">
              Discord
            </a>
            <a href={clubLinks.instagram} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href={clubLinks.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href={clubLinks.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href={`mailto:${clubLinks.email}`}>{clubLinks.email}</a>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>A student club at McGill University.</span>
          <span>Part of the Claude Campus program.</span>
        </div>
      </div>
    </footer>
  );
}

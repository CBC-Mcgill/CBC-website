import Link from 'next/link';
import { clubLinks } from '@/data/links';
import { DiscordIcon, InstagramIcon, LinkedInIcon, SignupIcon } from '@/components/icons';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <h3>Claude Builder Club</h3>
          <p className="section-copy">
            Anyone can build with AI. McGill students join CBC for free Claude Pro access,
            API credits, workshops, and a high-accountability builder community.
          </p>
        </div>
        <div className="footer-links">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/people">People</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div className="footer-links footer-socials">
          <a href={clubLinks.discord} target="_blank" rel="noopener noreferrer" className="club-link-with-icon">
            <span className="club-link-icon"><DiscordIcon /></span>Discord
          </a>
          <a href={clubLinks.instagram} target="_blank" rel="noopener noreferrer" className="club-link-with-icon">
            <span className="club-link-icon"><InstagramIcon /></span>Instagram
          </a>
          <a href={clubLinks.linkedin} target="_blank" rel="noopener noreferrer" className="club-link-with-icon">
            <span className="club-link-icon"><LinkedInIcon /></span>LinkedIn
          </a>
          <a href={clubLinks.signup} target="_blank" rel="noopener noreferrer" className="club-link-with-icon">
            <span className="club-link-icon"><SignupIcon /></span>Sign-up Form
          </a>
        </div>
      </div>
    </footer>
  );
}

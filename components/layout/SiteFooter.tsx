import Link from 'next/link';
import { clubLinks } from '@/data/links';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <h3>Claude Builder Club</h3>
          <p className="section-copy">
            Anyone can build with AI. Join CBC for free Claude Pro access, API credits,
            workshops, and a high-accountability builder community.
          </p>
        </div>
        <div className="footer-links">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/people">People</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div className="footer-links footer-socials">
          <a href={clubLinks.discord} target="_blank" rel="noopener noreferrer">Discord</a>
          <a href={clubLinks.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href={clubLinks.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={clubLinks.signup} target="_blank" rel="noopener noreferrer">Sign-up Form</a>
        </div>
      </div>
    </footer>
  );
}

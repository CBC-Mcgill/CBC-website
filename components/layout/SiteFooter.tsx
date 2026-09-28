import Link from "next/link";
import { clubLinks } from "@/data/links";
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Link className="logo" href="/">
            Claude Builder Club
          </Link>
          <p>A community of curious builders at McGill.</p>
          <small>Montréal, Québec</small>
        </div>
        <nav aria-label="Footer">
          <Link href="/about">About</Link>
          <Link href="/people">Team</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <nav aria-label="Social links">
          <a href={clubLinks.discord}>Discord ↗</a>
          <a href={clubLinks.instagram}>Instagram ↗</a>
          <a href={clubLinks.linkedin}>LinkedIn ↗</a>
          <a href={clubLinks.github}>GitHub ↗</a>
        </nav>
      </div>
    </footer>
  );
}

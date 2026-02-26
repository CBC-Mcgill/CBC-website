import Link from 'next/link';
import { clubLinks } from '@/data/links';
import { ImgFrame } from '@/components/shared/ImgFrame';

export function HeroSection() {
  return (
    <section className="section">
      <div className="container hero">
        <div className="hero-copy">
          <p className="eyebrow reveal" style={{ '--delay': '0.1s' } as React.CSSProperties}>
            Claude Builder Club
          </p>
          <h1 className="reveal" style={{ '--delay': '0.2s' } as React.CSSProperties}>
            Anyone can build with AI.
          </h1>
          <div className="hero-actions reveal" style={{ '--delay': '0.45s' } as React.CSSProperties}>
            <a
              className="btn"
              href={clubLinks.signup}
              target="_blank"
              rel="noopener noreferrer"
            >
              Join CBC
            </a>
            <Link className="btn btn-ghost" href="/hackathon">
              Join our first Claude Hackathon
            </Link>
          </div>
          <div className="hero-meta reveal" style={{ '--delay': '0.6s' } as React.CSSProperties}>
            <div className="meta-card">
              <div className="meta-label">Free Claude Pro</div>
              <div className="meta-value">McGill students get free access to the latest models via Claude Code</div>
            </div>
            <div className="meta-card">
              <div className="meta-label">Workshops</div>
              <div className="meta-value">Biweekly lectures headed by McGill students + Frequent workshops</div>
            </div>
            <div className="meta-card">
              <div className="meta-label">Build with Claude</div>
              <div className="meta-value">Work on any of our open dev projects and build something lasting for your peers.</div>
            </div>
            <div className="meta-card">
              <div className="meta-label">Join a Hackathon</div>
              <div className="meta-value">Compete in our biannual hackathons to win prizes and stand out to sponsors.</div>
            </div>
          </div>
        </div>

        <div className="hero-visual reveal" style={{ '--delay': '0.35s' } as React.CSSProperties}>
          <ImgFrame
            src="assets/ui/hero.png"
            alt="Students collaborating in Claude Builder Club"
            label="CBC Builders"
            priority
          />
        </div>
      </div>
    </section>
  );
}

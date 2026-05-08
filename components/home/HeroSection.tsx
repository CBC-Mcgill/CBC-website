import { HeroShader } from './HeroShader';

export function HeroSection() {
  return (
    <section className="section section--hero-shader">
      <HeroShader />
      <div className="container hero">
        <div className="hero-copy">
          <h1 className="reveal" style={{ '--delay': '0.2s' } as React.CSSProperties}>
            Anyone can build with AI.
          </h1>
          <div className="hero-actions reveal" style={{ '--delay': '0.45s' } as React.CSSProperties}>
          </div>
          <div className="hero-meta reveal" style={{ '--delay': '0.6s' } as React.CSSProperties}>
            <div className="meta-card">
              <div className="meta-label">Free Claude Pro</div>
              <div className="meta-value">McGill students get free access to Claude Pro, allowing more usage and access to Claude Code.</div>
            </div>
            <div className="meta-card">
              <div className="meta-label">Workshops</div>
              <div className="meta-value">Biweekly workshops + demos on AI tools where McGill builders can connect.</div>
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
      </div>
    </section>
  );
}

import { Claude } from '@lobehub/icons';

export function HeroSection() {
  return (
    <section className="section">
      <div className="container hero">
        <div className="hero-copy">
          <h1 className="reveal" style={{ '--delay': '0.2s' } as React.CSSProperties}>
            <span className="hero-gold">AI Fluency</span> is the <span className="hero-display">skill of this century</span>
          </h1>
          <p className="lead reveal" style={{ '--delay': '0.4s' } as React.CSSProperties}>
            That&rsquo;s why we <em className="hero-italic">build with AI</em> actively and unapologetically. <br/> If that is you, come learn and build with us.
          </p>
          <div className="hero-actions reveal" style={{ '--delay': '0.5s' } as React.CSSProperties}>
          </div>
          <p className="hero-footnote reveal" style={{ '--delay': '0.6s' } as React.CSSProperties}>
            In partnership with Anthropic, we can also provide free Claude Pro for McGill students <Claude.Color size={24} />
          </p>
        </div>
      </div>
    </section>
  );
}

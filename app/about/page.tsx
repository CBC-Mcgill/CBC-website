import type { Metadata } from 'next';
import { CampusMapSection } from '@/components/about/CampusMapSection';
import { ImgFrame } from '@/components/shared/ImgFrame';

export const metadata: Metadata = {
  title: 'Claude Builder Club · About',
};

export default function AboutPage() {
  return (
    <>
      <CampusMapSection />

      <section className="section">
        <div className="container soft-panel">
          <div>
            <p className="eyebrow reveal" style={{ '--delay': '0.05s' } as React.CSSProperties}>
              Backed by Anthropic
            </p>
            <h2 className="section-title reveal" style={{ '--delay': '0.15s' } as React.CSSProperties}>
              A global initiative
            </h2>
          </div>
          <div style={{ display: 'grid', gap: 'var(--space-3)' }}>
            <p className="section-copy reveal" style={{ '--delay': '0.2s' } as React.CSSProperties}>
              Claude Builder Clubs are part of Anthropic&rsquo;s Claude Campus Program — a network of
              student-led chapters at universities around the world. The program spans 75+ schools
              with over 15,000 students enrolled globally.
            </p>
            <p className="section-copy reveal" style={{ '--delay': '0.3s' } as React.CSSProperties}>
              Each chapter is student-run and officially Anthropic-backed. Anthropic gives us free Claude Pro
              access and API credits, and the support needed to run AI tools and fluency workshops, hackathons,
              and demo days on campuses.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <h2 className="section-title reveal" style={{ '--delay': '0.1s' } as React.CSSProperties}>
              CBC at McGill
            </h2>
            <p className="section-copy reveal" style={{ '--delay': '0.2s' } as React.CSSProperties}>
              We are a builder first club. We want to build and inspire other to build. We run regular workshops to teach students how to use Claude and other AI tools, and we have project pods where members ship projects together in a high-accountability environment. We also run hackathons and demo days to celebrate and reward the amazing projects our members build.
            </p>
          </div>
          <div className="card reveal" style={{ '--delay': '0.3s' } as React.CSSProperties}>
            <h3>What members get</h3>
            <ul style={{ display: 'grid', gap: '0.55rem', marginTop: '0.85rem', padding: 0, listStyle: 'none' }}>
              {[
                'Free Claude Pro access',
                'Anthropic API credits',
                'Claude Code workshops',
                'Hackathons & demo days',
                'High-accountability build team',
              ].map((item) => (
                <li
                  key={item}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', color: 'var(--color-muted)', fontSize: '0.93rem' }}
                >
                  <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--color-accent)', flexShrink: 0 }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container soft-panel">
          <h2 className="section-title reveal" style={{ '--delay': '0.1s' } as React.CSSProperties}>
            How the term runs
          </h2>
          <div className="schedule-list">
            <div className="schedule-item reveal" style={{ '--delay': '0.15s' } as React.CSSProperties}>
              <div>
                <strong>Kickoff + onboarding</strong>
                <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem', marginTop: '0.2rem' }}>Get tools, join project pods, set build goals</p>
              </div>
              <span>Week 1</span>
            </div>
            <div className="schedule-item reveal" style={{ '--delay': '0.25s' } as React.CSSProperties}>
              <div>
                <strong>Workshop cycles</strong>
                <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem', marginTop: '0.2rem' }}>Weekly practical sessions with experts and peers</p>
              </div>
              <span>Weekly</span>
            </div>
            <div className="schedule-item reveal" style={{ '--delay': '0.35s' } as React.CSSProperties}>
              <div>
                <strong>Demo days + hackathon</strong>
                <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem', marginTop: '0.2rem' }}>Ship, present, and compete for prizes with sponsors</p>
              </div>
              <span>Seasonal</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <ImgFrame
            src="/assets/ui/claudeHats.jpg"
            alt="Claude Builder Club members wearing Claude hats"
            label="CBC Hats"
          />
          <ImgFrame
            src="/assets/ui/hero.png"
            alt="Students collaborating in Claude Builder Club"
            label="CBC Builders"
          />
        </div>
      </section>
    </>
  );
}

import type { Metadata } from 'next';
import { ImgFrame } from '@/components/shared/ImgFrame';

export const metadata: Metadata = {
  title: 'Claude Builder Club · About',
};

export default function AboutPage() {
  return (
    <>
      <section className="section">
        <div className="container page-hero">
          <p className="eyebrow reveal" style={{ '--delay': '0.1s' } as React.CSSProperties}>
            About CBC
          </p>
          <h1 className="reveal" style={{ '--delay': '0.2s' } as React.CSSProperties}>
            A student AI builder club at McGill.
          </h1>
          <p className="lead reveal" style={{ '--delay': '0.35s' } as React.CSSProperties}>
            We help members turn ideas into real products with modern tools, mentorship, and community support.
          </p>
        </div>
      </section>

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
              student-led chapters at universities around the world. The program spans 60+ schools
              with over 15,000 students enrolled globally.
            </p>
            <p className="section-copy reveal" style={{ '--delay': '0.3s' } as React.CSSProperties}>
              Each chapter is student-run and Anthropic-backed: McGill members receive free Claude Pro
              access and API credits, and chapters are supported to run workshops, hackathons,
              and demo days on their campuses.
            </p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {[
              'MIT',
              'Princeton',
              'UCLA',
              'Waterloo',
              'UofT',
              'CMU',
              'Cambridge',
              '60+ universities worldwide',
            ].map((school) => (
              <span
                key={school}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '0.3rem 0.85rem',
                  borderRadius: '999px',
                  background: 'rgba(201, 130, 69, 0.09)',
                  border: '1px solid rgba(201, 130, 69, 0.22)',
                  color: 'var(--accent-strong)',
                  fontSize: '0.83rem',
                  letterSpacing: '0.01rem',
                }}
              >
                {school}
              </span>
            ))}
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
              Our chapter makes high-impact AI building accessible to every McGill student.
              We lower the barrier with free access, practical learning, and a strong peer network.
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
                  style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', color: 'var(--muted)', fontSize: '0.93rem' }}
                >
                  <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--accent)', flexShrink: 0 }} />
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
                <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginTop: '0.2rem' }}>Get tools, join project pods, set build goals</p>
              </div>
              <span>Week 1</span>
            </div>
            <div className="schedule-item reveal" style={{ '--delay': '0.25s' } as React.CSSProperties}>
              <div>
                <strong>Workshop cycles</strong>
                <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginTop: '0.2rem' }}>Weekly practical sessions with experts and peers</p>
              </div>
              <span>Weekly</span>
            </div>
            <div className="schedule-item reveal" style={{ '--delay': '0.35s' } as React.CSSProperties}>
              <div>
                <strong>Demo day + hackathons</strong>
                <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginTop: '0.2rem' }}>Ship, present, and compete for prizes with sponsors</p>
              </div>
              <span>Seasonal</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <h2 className="section-title reveal" style={{ '--delay': '0.1s' } as React.CSSProperties}>
              What we optimize for
            </h2>
            <p className="section-copy reveal" style={{ '--delay': '0.2s' } as React.CSSProperties}>
              Learn quickly, build responsibly, and launch with confidence.
            </p>
            <div className="note-list">
              <div className="note reveal" style={{ '--delay': '0.25s' } as React.CSSProperties}>
                <h4>Practical learning</h4>
                <p>Every session focuses on hands-on workflows you can apply to your own projects.</p>
              </div>
              <div className="note reveal" style={{ '--delay': '0.35s' } as React.CSSProperties}>
                <h4>Builder accountability</h4>
                <p>Work in teams, set milestones, and keep momentum with consistent check-ins.</p>
              </div>
              <div className="note reveal" style={{ '--delay': '0.45s' } as React.CSSProperties}>
                <h4>Responsible building</h4>
                <p>Ship thoughtfully — with attention to ethical AI use and real-world impact.</p>
              </div>
            </div>
          </div>
          <div>
            <ImgFrame
              src="/assets/ui/notebook.png"
              alt="Claude Builder Club planning notebook"
              label="CBC Notebook"
            />
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from 'next';
import Countdown from '@/components/hackathon/Countdown';

export const metadata: Metadata = {
  title: 'Claude Builder Club · Hackathon 2026',
  description:
    'Claude Builders Hackathon at McGill — April 4th, 2026. Free, open to all universities. Build meaningful AI products in one day with Claude Code, the Claude API, or both.',
};

const SIGN_UP_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSc30XH0k_ZZdgyZ2tU-txvbN9lJtdC6XzVVRkBofVMWLwGZrg/viewform?usp=sharing&ouid=102839564480593837548';
const DETAILS_URL = 'https://docs.google.com/document/d/1TEndbv3OXdaNVJrUVNzrXNNZ1ajDU1Ywh9OF3JF0lw0/edit?usp=sharing';
const VOLUNTEER_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSeB5iUV9eD6u3xY4Lm9-VL5RkWaOvOiEbhts8a9jgVgyur9ig/viewform';

export default function HackathonPage() {
  return (
    <div className="hack-bg">

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="hack-section">
        <div className="container">
          <div className="hackathon-hero-panel">
            <div className="hackathon-hero-grid">

              {/* Left: copy */}
              <div className="hackathon-hero-copy reveal" style={{ '--delay': '0.1s' } as React.CSSProperties}>
                <div className="hackathon-eyebrow">
                  <span className="hackathon-org-label">CBC @ McGill</span>
                  <span style={{
                    fontFamily: "'SF Mono', 'Fira Code', monospace",
                    fontSize: '0.75rem',
                    color: 'rgba(201, 130, 69, 0.6)',
                    border: '1px solid rgba(201, 130, 69, 0.25)',
                    borderRadius: '4px',
                    padding: '0.15rem 0.55rem',
                    letterSpacing: '0.06em',
                  }}>
                    April 4, 2026
                  </span>
                </div>
                <h1 className="hackathon-title">
                  Claude Builders AI Hackathon 2026<br />
                </h1>
                <p className="hackathon-lead">
                  One day. One theme. Build with Claude and ship something that matters.
                </p>
                <div className="hack-btn-row">
                  <a
                    href={SIGN_UP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn hackathon-btn-primary"
                  >
                    Register — Free
                  </a>
                  <a
                    href={DETAILS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn hackathon-btn-ghost-dark"
                  >
                    View Full Details
                  </a>
                </div>
                <p style={{
                  fontFamily: "'SF Mono', 'Fira Code', monospace",
                  fontSize: 'clamp(0.85rem, 1.2vw, 1rem)',
                  color: '#e8a870',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  borderLeft: '3px solid rgba(201, 130, 69, 0.7)',
                  paddingLeft: '0.75rem',
                  margin: 0,
                }}>
                  ⚠ Applications close March 16th
                </p>
              </div>

              {/* Right: meta grid */}
              <div className="hackathon-hero-visual reveal" style={{ '--delay': '0.25s' } as React.CSSProperties}>
                <div className="hackathon-meta-grid">
                  <div className="hackathon-meta-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    April 4, 2026
                  </div>
                  <div className="hackathon-meta-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                    8 hours
                  </div>
                  <div className="hackathon-meta-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                    1–3 members
                  </div>
                  <div className="hackathon-meta-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M20 12V22H4V12"/>
                      <path d="M22 7H2v5h20V7z"/>
                      <path d="M12 22V7"/>
                      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/>
                      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
                    </svg>
                    Free to enter
                  </div>
                </div>
              </div>

            </div>
            <div className="hackathon-hero-footer-link reveal" style={{ '--delay': '0.32s' } as React.CSSProperties}>
              <a
                href={VOLUNTEER_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Interested in volunteering?
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── COUNTDOWN ─────────────────────────────────────────── */}
      <section className="hack-section">
        <div className="container">
          <Countdown />
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────── */}
      <section className="hack-section">
        <div className="container">
          <div className="hackathon-stats reveal" style={{ '--delay': '0.1s' } as React.CSSProperties}>
            <div className="hackathon-stat-card">
              <div className="hackathon-stat-value">April 4</div>
              <div className="hackathon-stat-label">Date</div>
            </div>
            <div className="hackathon-stat-card">
              <div className="hackathon-stat-value">6 hrs</div>
              <div className="hackathon-stat-label">Build window</div>
            </div>
            <div className="hackathon-stat-card">
              <div className="hackathon-stat-value">1–3</div>
              <div className="hackathon-stat-label">Team size</div>
            </div>
            <div className="hackathon-stat-card">
              <div className="hackathon-stat-value">Free</div>
              <div className="hackathon-stat-label">Entry</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BRIEF + TOOLS ─────────────────────────────────────── */}
      <section className="hack-section">
        <div className="container">
          <div className="hack-brief-grid">

            {/* Left: mission brief */}
            <div>
              <p className="hack-cmd reveal" style={{ '--delay': '0.1s' } as React.CSSProperties}>
                cat mission-brief.md
              </p>
              <div className="hack-file-box reveal" style={{ '--delay': '0.2s' } as React.CSSProperties}>
                <p>Claude Builders Hackathon is a one-day sprint at McGill where you build
                   real AI products with Claude — Code, API, or both.</p>
                <p>The theme is revealed on the morning of April 4th. Solo or team up to three.
                   Free to enter. Open to all universities.</p>
                <p>Build something a real person would use. You have a 6-hour build window.</p>
              </div>
            </div>

            {/* Right: tool cards */}
            <div className="reveal" style={{ '--delay': '0.25s' } as React.CSSProperties}>
              <div className="integration-grid integration-grid-single">
                <div className="integration-card">
                  <span className="option-label">01</span>
                  <div className="integration-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="16 18 22 12 16 6"/>
                      <polyline points="8 6 2 12 8 18"/>
                    </svg>
                  </div>
                  <h3>Claude Code</h3>
                  <p>Agentic coding in your terminal. Build entire features with natural language — Claude writes, runs, and iterates on code for you.</p>
                </div>
                <div className="integration-card">
                  <span className="option-label">02</span>
                  <div className="integration-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                    </svg>
                  </div>
                  <h3>Claude API</h3>
                  <p>Direct model access via <code>anthropic</code> SDK. Stream completions, tool use, vision — build any AI-powered product from scratch.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── PRIZES ────────────────────────────────────────────── */}
      <section className="hack-section">
        <div className="container">
          <div className="hack-prizes-header reveal" style={{ '--delay': '0.1s' } as React.CSSProperties}>
            <div className="hack-prizes-total">$2,000+ in prizes</div>
            <div className="hack-prizes-sub">Details announced soon. Prizes include Claude API credits + merch + cash</div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="hack-section">
        <div className="container">
          <div className="hackathon-cta-panel reveal" style={{ '--delay': '0.1s' } as React.CSSProperties}>
            <h2 className="hackathon-title" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)' }}>
              Ready to build?
            </h2>
            <p className="hackathon-lead" style={{ textAlign: 'center', marginBottom: 0 }}>
              Register now — free, open to all universities, no experience required.
            </p>
            <div className="hack-btn-row hack-btn-row-center">
              <a
                href={SIGN_UP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn hackathon-cta-btn"
              >
                Register — It&apos;s Free
              </a>
              <a
                href={DETAILS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn hackathon-btn-ghost-dark"
              >
                View Full Details
              </a>
            </div>
            <p style={{
              fontFamily: "'SF Mono', 'Fira Code', monospace",
              fontSize: '0.75rem',
              color: 'rgba(255, 235, 210, 0.22)',
              letterSpacing: '0.04em',
            }}>
              Organized by Claude Builder Club @ McGill · In partnership with Anthropic
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}

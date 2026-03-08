import type { Metadata } from 'next';
import Countdown from '@/components/hackathon/Countdown';
import TrackCard from '@/components/hackathon/TrackCard';

export const metadata: Metadata = {
  title: 'Claude Builder Club · Hackathon 2026',
  description:
    'Claude Builders Hackathon at McGill — April 4th, 2026. Free, open to all universities. Build meaningful AI products in one day with Claude Code, the Claude API, or both.',
};

const SIGN_UP_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSc30XH0k_ZZdgyZ2tU-txvbN9lJtdC6XzVVRkBofVMWLwGZrg/viewform?usp=sharing&ouid=102839564480593837548';
const DETAILS_URL = 'https://docs.google.com/document/d/1TEndbv3OXdaNVJrUVNzrXNNZ1ajDU1Ywh9OF3JF0lw0/edit?usp=sharing';
const VOLUNTEER_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSeB5iUV9eD6u3xY4Lm9-VL5RkWaOvOiEbhts8a9jgVgyur9ig/viewform';

const tracks = [
  {
    num: '01',
    name: 'Biology and Physical Health',
    problem: 'Healthcare is expensive, confusing, and out of reach for billions. Medical knowledge that could help people is locked behind jargon and paywalls.',
    examples: ['Diagnostic aids for underserved clinics', 'Patient education tools', 'Health literacy for treatment decisions'],
    modifier: 'hack-track-card--health',
    delay: '0.15s',
    icon: (
      <svg className="hack-track-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    num: '02',
    name: 'Neuroscience and Mental Health',
    problem: 'There are not enough therapists. Stigma prevents people from seeking help. Quality care is gatekept by insurance and geography.',
    examples: ['Evidence-based therapeutic support tools', 'Mental health literacy platforms', 'Early recognition and triage tools'],
    modifier: 'hack-track-card--mental',
    delay: '0.2s',
    icon: (
      <svg className="hack-track-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/>
        <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/>
      </svg>
    ),
  },
  {
    num: '03',
    name: 'Economic Empowerment and Education',
    problem: 'Talent is universal. Access to quality education and opportunity is not. Language, geography, and wealth lock people out.',
    examples: ['Adaptive tutoring', 'Career transition guidance', 'Financial literacy for underserved communities'],
    modifier: 'hack-track-card--econ',
    delay: '0.25s',
    icon: (
      <svg className="hack-track-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
        <path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    ),
  },
  {
    num: '04',
    name: 'Governance and Collaboration',
    problem: 'Civic participation is declining. Polarization makes productive dialogue difficult. Communities cannot coordinate around shared challenges.',
    examples: ['Policy explanation tools', 'Community deliberation platforms', 'Nonpartisan voter education'],
    modifier: 'hack-track-card--gov',
    delay: '0.3s',
    icon: (
      <svg className="hack-track-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="12" y1="3" x2="12" y2="21"/>
        <path d="M5 21h14"/>
        <path d="M3 9l9-6 9 6"/>
        <path d="M5 9v9M19 9v9"/>
        <path d="M9 9v9M15 9v9"/>
      </svg>
    ),
  },
  {
    num: '05',
    name: 'Creative Flourishing',
    problem: 'As AI handles routine work, questions about human purpose become urgent. Access to creative development and cultural preservation is unequal.',
    examples: ['Community storytelling platforms', 'Language and culture preservation tools', 'Purpose and meaning exploration guides'],
    modifier: 'hack-track-card--creative',
    delay: '0.35s',
    icon: (
      <svg className="hack-track-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
  },
];

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
                  <span className="hackathon-date-badge">
                    April 4, 2026
                  </span>
                </div>
                <h1 className="hackathon-title">
                  Claude Builders AI Hackathon 2026<br />
                </h1>
                <p className="hackathon-lead">
                  One day. Five tracks. Build something that could change a life.
                </p>
                <p className="hackathon-lead-sub">
                  Inspired by Dario Amodei&apos;s{' '}
                  <a href="https://darioamodei.com/essay/machines-of-loving-grace" target="_blank" rel="noopener noreferrer" className="hack-essay-link">&ldquo;Machines of Loving Grace.&rdquo;</a>
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
                <p className="hackathon-warning-text">
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
              <div className="hackathon-stat-value">3 days</div>
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
                <p>The theme is social impact. Five tracks. Real problems for real people.</p>
                <p>78 universities across 12 countries are answering the same question: how can AI help people genuinely flourish? Pick your track. Form a team. Build something worth building.</p>
                <p>Solo or up to three people. Free. Open to all universities. 8 hours to ship.</p>
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
                  <p>Agentic coding in your terminal. Build entire features with natural language: Claude writes, runs, and iterates on code for you.</p>
                </div>
                <div className="integration-card">
                  <span className="option-label">02</span>
                  <div className="integration-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                    </svg>
                  </div>
                  <h3>Claude API</h3>
                  <p>Direct model access via <code>anthropic</code> SDK. Stream completions, tool use, vision: build any AI-powered product from scratch.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── TRACKS ────────────────────────────────────────────── */}
      <section className="hack-section">
        <div className="container">
          <p className="hack-cmd reveal" style={{ '--delay': '0.1s' } as React.CSSProperties}>ls -1 tracks/</p>
          <div className="hack-track-grid">
            {tracks.map(track => (
              <TrackCard key={track.num} {...track} />
            ))}
          </div>
        </div>
      </section>

      {/* ── JUDGING CRITERIA + AWARDS ─────────────────────────── */}
      <section className="hack-section">
        <div className="container">
          <p className="hack-cmd reveal" style={{ '--delay': '0.1s' } as React.CSSProperties}>ls -1 criteria/</p>
          <div className="hack-criteria-grid">

            <div className="hack-criteria-card reveal" style={{ '--delay': '0.15s' } as React.CSSProperties}>
              <div className="hack-criteria-pts">25</div>
              <div className="hack-criteria-name">Impact Potential</div>
              <p className="hack-criteria-desc">Does this solve a real problem for a specific group of people? Could it actually reach and help them?</p>
            </div>

            <div className="hack-criteria-card reveal" style={{ '--delay': '0.2s' } as React.CSSProperties}>
              <div className="hack-criteria-pts">30</div>
              <div className="hack-criteria-name">Technical Execution</div>
              <p className="hack-criteria-desc">Does it work? Is the AI integration purposeful? Can you show it functioning for a real user?</p>
            </div>

            <div className="hack-criteria-card reveal" style={{ '--delay': '0.25s' } as React.CSSProperties}>
              <div className="hack-criteria-pts">25</div>
              <div className="hack-criteria-name">Ethical Alignment</div>
              <p className="hack-criteria-desc">Does it empower people rather than replace their judgment? Have you seriously considered what could go wrong and what you would do about it?</p>
            </div>

            <div className="hack-criteria-card reveal" style={{ '--delay': '0.3s' } as React.CSSProperties}>
              <div className="hack-criteria-pts">20</div>
              <div className="hack-criteria-name">Presentation</div>
              <p className="hack-criteria-desc">Can you clearly explain the problem, your solution, and what you would do next?</p>
            </div>

          </div>

        </div>
      </section>

      {/* ── PRIZES ────────────────────────────────────────────── */}
      <section className="hack-section">
        <div className="container">
          <div className="hack-prizes-header reveal" style={{ '--delay': '0.1s' } as React.CSSProperties}>
            <div className="hack-prizes-total">$3,000+ in prizes</div>
            <div className="hack-prizes-sub">Details announced soon. Prizes include Claude API credits + merch + cash</div>
          </div>
        </div>
      </section>

      {/* ── SPONSORS ──────────────────────────────────────────── */}
      <section className="hack-section">
        <div className="container">

          <div className="hack-sponsors-heading reveal" style={{ '--delay': '0.1s' } as React.CSSProperties}>
            <h2 className="hack-sponsors-title">Sponsors &amp; Partners</h2>
          </div>

          {/* Tier 1: Sub-challenge sponsors */}
          <div className="hack-sponsor-tier reveal" style={{ '--delay': '0.15s' } as React.CSSProperties}>
            <div className="hack-sponsor-tier-label">Sponsors</div>
            <p className="hack-sponsor-tier-note">Each sponsor hosts a sub-challenge — teams can win both the general prize and the sponsor&apos;s award.</p>
            <div className="hack-subchal-grid">

              <a href="https://rootly.com" target="_blank" rel="noopener noreferrer" className="hack-subchal-card" style={{ '--track-r': '109', '--track-g': '184', '--track-b': '154' } as React.CSSProperties}>
                <div className="hack-subchal-logo-wrap">
                  <img src="/assets/sponsors/rootlyhq_logo.jpg" alt="Rootly" width={90} height={40} className="hack-sponsor-logo" />
                </div>
                <div className="hack-subchal-info">
                  <div className="hack-subchal-name">Rootly</div>
                  <span className="hack-subchal-track-badge">Neuroscience &amp; Mental Health</span>
                </div>
              </a>

              <a href="https://pcare.ca/" target="_blank" rel="noopener noreferrer" className="hack-subchal-card" style={{ '--track-r': '224', '--track-g': '122', '--track-b': '95' } as React.CSSProperties}>
                <div className="hack-subchal-logo-wrap">
                  <img src="/assets/sponsors/pcare+_logo.jpg" alt="Pcare+" width={90} height={40} className="hack-sponsor-logo" />
                </div>
                <div className="hack-subchal-info">
                  <div className="hack-subchal-name">PCare+</div>
                  <span className="hack-subchal-track-badge">Biology &amp; Physical Health</span>
                </div>
              </a>

              <a href="https://www.brimfinancial.com" target="_blank" rel="noopener noreferrer" className="hack-subchal-card" style={{ '--track-r': '232', '--track-g': '184', '--track-b': '75' } as React.CSSProperties}>
                <div className="hack-subchal-logo-wrap">
                  <img src="/assets/sponsors/brimfinancial_logo.jpg" alt="Brim Financial" width={90} height={40} className="hack-sponsor-logo" />
                </div>
                <div className="hack-subchal-info">
                  <div className="hack-subchal-name">Brim Financial</div>
                  <span className="hack-subchal-track-badge">Economic Empowerment</span>
                </div>
              </a>

            </div>
          </div>

          {/* Tier 2: Food & Beverage */}
          <div className="hack-sponsor-tier reveal" style={{ '--delay': '0.2s' } as React.CSSProperties}>
            <div className="hack-sponsor-tier-label">Food &amp; Beverage</div>
            <div className="hack-sponsor-logos">
              <a href="https://www.dominos.com" target="_blank" rel="noopener noreferrer" className="hack-sponsor-logo-link">
                <img
                  src="/assets/sponsors/dominos_pizza_logo.jpg"
                  alt="Domino's Pizza"
                  width={100}
                  height={50}
                  className="hack-sponsor-logo"
                />
              </a>
              <a href="https://www.drinkpoppi.com" target="_blank" rel="noopener noreferrer" className="hack-sponsor-logo-link">
                <img
                  src="/assets/sponsors/poppi_logo.jpg"
                  alt="Poppi"
                  width={100}
                  height={50}
                  className="hack-sponsor-logo"
                />
              </a>
              <a href="https://www.redbull.com" target="_blank" rel="noopener noreferrer" className="hack-sponsor-logo-link">
                <img
                  src="/assets/sponsors/red_bull_logo.jpg"
                  alt="Red Bull"
                  width={100}
                  height={50}
                  className="hack-sponsor-logo"
                />
              </a>
            </div>
          </div>

          {/* Tier 3: Partners */}
          <div className="hack-sponsor-tier reveal" style={{ '--delay': '0.25s' } as React.CSSProperties}>
            <div className="hack-sponsor-tier-label">Partners</div>
            <div className="hack-sponsor-logos">
              <a href="https://mcgillvc.ca/" target="_blank" rel="noopener noreferrer" className="hack-sponsor-logo-link">
                <img
                  src="/assets/partners/mcgill_ventures_logo.jpg"
                  alt="McGill Ventures"
                  width={150}
                  height={70}
                  className="hack-sponsor-logo"
                />
              </a>
              <a href="https://www.anthropic.com" target="_blank" rel="noopener noreferrer" className="hack-sponsor-logo-link">
                <img
                  src="/assets/partners/anthropicresearch_logo.jpg"
                  alt="Anthropic"
                  width={150}
                  height={70}
                  className="hack-sponsor-logo"
                />
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="hack-section">
        <div className="container">
          <div className="hackathon-cta-panel reveal" style={{ '--delay': '0.1s' } as React.CSSProperties}>
            <h2 className="hackathon-title" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)' }}>
              Ready to take on a real problem?
            </h2>
            <p className="hackathon-lead" style={{ textAlign: 'center', marginBottom: 0 }}>
              Just pick a track and build something worth building.
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

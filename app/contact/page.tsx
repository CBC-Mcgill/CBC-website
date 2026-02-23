import type { Metadata } from 'next';
import { clubLinks } from '@/data/links';

export const metadata: Metadata = {
  title: 'Claude Builder Club · Contact',
};

export default function ContactPage() {
  return (
    <>
      <section className="section">
        <div className="container page-hero">
          <p className="eyebrow reveal" style={{ '--delay': '0.1s' } as React.CSSProperties}>
            Connect with CBC
          </p>
          <h1 className="reveal" style={{ '--delay': '0.2s' } as React.CSSProperties}>
            All our links in one place.
          </h1>
          <p className="lead reveal" style={{ '--delay': '0.35s' } as React.CSSProperties}>
            Join the community, follow updates, and build with us.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          <div className="contact-panel">
            <h2 className="panel-title">Core channels</h2>
            <p className="section-copy">Use these links for announcements, events, and applications.</p>
            <div className="social-list">
              <div className="detail-item">
                <span>Discord</span>
                <strong>
                  <a href={clubLinks.discord} target="_blank" rel="noopener noreferrer">
                    Join the server
                  </a>
                </strong>
              </div>
              <div className="detail-item">
                <span>Instagram</span>
                <strong>
                  <a href={clubLinks.instagram} target="_blank" rel="noopener noreferrer">
                    Follow CBC
                  </a>
                </strong>
              </div>
              <div className="detail-item">
                <span>LinkedIn</span>
                <strong>
                  <a href={clubLinks.linkedin} target="_blank" rel="noopener noreferrer">
                    Connect on LinkedIn
                  </a>
                </strong>
              </div>
              <div className="detail-item">
                <span>Sign-up Form</span>
              </div>
            </div>
          </div>

          <div className="contact-panel">
            <h2 className="panel-title">Build + collaborate</h2>
            <p className="section-copy">
              Project and communication channels for builders shipping work together.
            </p>
            <div className="social-list">
              <div className="detail-item">
                <span>GitHub</span>
                <strong>
                  <a href={clubLinks.github} target="_blank" rel="noopener noreferrer">
                    View repositories
                  </a>
                </strong>
              </div>
              <div className="detail-item">
                <span>Announcements</span>
                <strong>
                  <a href={clubLinks.discord} target="_blank" rel="noopener noreferrer">
                    Check updates in Discord
                  </a>
                </strong>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

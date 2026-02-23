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
        <div className="container split">
          <div>
            <h2 className="section-title">Our mission</h2>
            <p className="section-copy">
              Make high-impact AI building accessible to any student. We lower the barrier with free
              access, practical learning, and a strong peer network.
            </p>
          </div>
          <div className="card">
            <h3>What members get</h3>
            <p>
              Free Claude Pro access, API credits, official Anthropic workshops, and a group of
              builders who ship together.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container soft-panel">
          <h2 className="section-title">How the term runs</h2>
          <div className="schedule-list">
            <div className="schedule-item">
              <div>
                <strong>Kickoff + onboarding</strong>
                <div><span>Get tools, join project pods, set build goals</span></div>
              </div>
              <span>Week 1</span>
            </div>
            <div className="schedule-item">
              <div>
                <strong>Workshop cycles</strong>
                <div><span>Weekly practical sessions with experts and peers</span></div>
              </div>
              <span>Weekly</span>
            </div>
            <div className="schedule-item">
              <div>
                <strong>Demo day + hackathons</strong>
                <div><span>Ship, present, and compete for prizes with sponsors</span></div>
              </div>
              <span>Seasonal</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <h2 className="section-title">What we optimize for</h2>
            <p className="section-copy">Learn quickly, build responsibly, and launch with confidence.</p>
            <div className="note-list">
              <div className="note">
                <h4>Practical learning</h4>
                <p>Every session focuses on hands-on workflows you can apply to your own projects.</p>
              </div>
              <div className="note">
                <h4>Builder accountability</h4>
                <p>Work in teams, set milestones, and keep momentum with consistent check-ins.</p>
              </div>
            </div>
          </div>
          <div>
            <ImgFrame
              src="assets/ui/notebook.png"
              alt="Claude Builder Club planning notebook"
              label="CBC Notebook"
            />
          </div>
        </div>
      </section>
    </>
  );
}

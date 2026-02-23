import type { Metadata } from 'next';
import { PeopleGrid } from '@/components/people/PeopleGrid';
import { leadership, associates } from '@/data/people';

export const metadata: Metadata = {
  title: 'Claude Builder Club · People',
};

export default function PeoplePage() {
  return (
    <>
      <section className="section">
        <div className="container page-hero">
          <p className="eyebrow reveal" style={{ '--delay': '0.1s' } as React.CSSProperties}>
            Meet the team
          </p>
          <h1 className="reveal" style={{ '--delay': '0.2s' } as React.CSSProperties}>
            Insert cool text about team
          </h1>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Execs and Directors</h2>
          <p className="section-copy">Insert cool execDirector stuff.</p>
          <PeopleGrid people={leadership} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Associates</h2>
          <p className="section-copy">Insert Cool associate stuff.</p>
          <PeopleGrid people={associates} />
        </div>
      </section>
    </>
  );
}

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
            Builders, operators, and mentors behind CBC
          </h1>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Execs and Directors</h2>
          <p className="section-copy">Our leadership team sets direction, builds partnerships, and keeps programs moving.</p>
          <PeopleGrid people={leadership} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Associates</h2>
          <p className="section-copy">Our associates run operations, media, and member support to turn ideas into shipped work.</p>
          <PeopleGrid people={associates} />
        </div>
      </section>
    </>
  );
}

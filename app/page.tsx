import type { Metadata } from 'next';
import Link from 'next/link';
import { HeroSection } from '@/components/home/HeroSection';
import { BuildTracksSection } from '@/components/home/BuildTracksSection';
import { buildTracks } from '@/data/buildTracks';

export const metadata: Metadata = {
  title: 'Claude Builder Club · Home',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BuildTracksSection tracks={buildTracks} />
      <section className="section">
        <div className="container soft-panel">
          <div className="section-head">
            <div>
              <span className="tag">Who we are</span>
              <h2 className="section-title">A student AI builder club at McGill.</h2>
              <p className="section-copy">
                Learn how the club runs, what we optimize for, and what members get.
              </p>
            </div>
            <Link className="btn" href="/about">Learn about CBC</Link>
          </div>
        </div>
      </section>
    </>
  );
}

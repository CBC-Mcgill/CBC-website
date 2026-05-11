import type { Metadata } from 'next';
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
    </>
  );
}

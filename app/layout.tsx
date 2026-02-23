import type { Metadata } from 'next';
import { Fraunces, Source_Serif_4 } from 'next/font/google';
import './globals.css';
import { BlossomIntro } from '@/components/shared/BlossomIntro';
import { PageShell } from '@/components/shared/PageShell';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SkipLink } from '@/components/layout/SkipLink';

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: 'variable',
  axes: ['opsz', 'SOFT', 'WONK'],
  variable: '--font-fraunces',
  display: 'swap',
});

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  weight: 'variable',
  axes: ['opsz'],
  variable: '--font-source-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Claude Builder Club',
  description: 'Anyone can build with AI. Join CBC for free Claude Pro access, API credits, workshops, and a high-accountability builder community.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${sourceSerif.variable}`}
      suppressHydrationWarning
    >
      <body>
        <SkipLink />
        <BlossomIntro />
        <PageShell>
          <SiteHeader />
          <main id="main">
            {children}
          </main>
          <SiteFooter />
        </PageShell>
      </body>
    </html>
  );
}

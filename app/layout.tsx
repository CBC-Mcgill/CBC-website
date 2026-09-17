import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SkipLink } from "@/components/layout/SkipLink";
import { MotionEffects } from "@/components/motion/MotionEffects";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});
export const metadata: Metadata = {
  title: "Claude Builder Club · McGill",
  description:
    "Build useful things with AI at McGill. Explore student projects, workshops, and the Claude Builder Club community.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fraunces.variable}>
      <body>
        <LoadingScreen />
        <SkipLink />
        <MotionEffects />
        <SiteHeader />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}

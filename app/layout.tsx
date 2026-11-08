import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SkipLink } from "@/components/layout/SkipLink";
import { Reveal } from "@/components/motion/Reveal";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
  variable: "--font-bricolage",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.claudebuildersmcgill.ca"),
  title: {
    default: "Claude Builder Club at McGill",
    template: "%s | Claude Builder Club",
  },
  description:
    "McGill's student builder community. We learn to build with AI, ship tools for students, and run the Claude Builders Hackathon.",
  openGraph: {
    type: "website",
    siteName: "Claude Builder Club",
    title: "Claude Builder Club at McGill",
    description:
      "McGill's student builder community. We learn to build with AI, ship tools for students, and run the Claude Builders Hackathon.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={bricolage.variable} suppressHydrationWarning>
      <head>
        {/* Marks the document before paint so reveal styles never hide content from no-JS visitors. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body>
        <SkipLink />
        <SiteHeader />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
        <Reveal />
      </body>
    </html>
  );
}

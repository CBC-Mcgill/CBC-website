import Link from "next/link";
import s from "../editorial.module.css";
export const metadata = {
  title: "2026 Event Archive · Claude Builder Club",
  description:
    "Archived event information for the April 4, 2026 Claude Builders Hackathon at McGill.",
};
export default function ArchivePage() {
  return (
    <div className="container">
      <header className={s.pageHero}>
        <p className="eyebrow">Event archive · April 4, 2026</p>
        <h1>Claude Builders Hackathon.</h1>
        <p className="lead">McGill University · AI for social impact</p>
      </header>
      <div className={s.archiveNotice}>
        This event has ended. Registration is closed.{" "}
        <Link href="/hackathon">Explore the photo recap →</Link>
      </div>
      <section className={`section ${s.prose}`}>
        <h2>The brief</h2>
        <p>
          The 2026 event invited students to build AI projects for social
          impact, using Claude Code, the Claude API, or both. The original brief
          welcomed participants from all universities, working solo or in teams
          of up to three.
        </p>
        <p>
          Four tracks explored how AI could support health, education,
          opportunity, and creativity.
        </p>
      </section>
      <section className="section">
        <p className="eyebrow">The four tracks</p>
        <div className={s.history}>
          <article>
            <span className={s.number}>01 /</span>
            <h3>Biology and Physical Health</h3>
          </article>
          <article>
            <span className={s.number}>02 /</span>
            <h3>Neuroscience and Mental Health</h3>
          </article>
          <article>
            <span className={s.number}>03 /</span>
            <h3>Economic Empowerment and Education</h3>
          </article>
          <article>
            <span className={s.number}>04 /</span>
            <h3>Creative Flourishing</h3>
          </article>
        </div>
      </section>
      <section className="section">
        <h2>Judging criteria</h2>
        <div className={s.history}>
          {[
            ["Impact potential", "25 points"],
            ["Technical execution", "30 points"],
            ["Ethical alignment", "25 points"],
            ["Presentation", "20 points"],
          ].map(([title, points]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{points}</p>
            </article>
          ))}
        </div>
      </section>
      <section className={`section ${s.prose}`}>
        <h2>From the original event brief</h2>
        <p>
          Advertised general prizes included $100 per member and 1,000 team API
          credits for first place; $50 per member and 500 team API credits for
          second; and $50 per member for third. Claude hats were listed for all
          three placements, with $100 team prizes for sponsor sub-challenges.
        </p>
        <p>
          Event supporters included Rootly, Pcare+, Brim Financial, Domino’s,
          Poppi, and Red Bull, with Anthropic and McGill Ventures listed as
          partners.
        </p>
        <div className="actions">
          <a
            className="button secondary"
            href="https://docs.google.com/document/d/1TEndbv3OXdaNVJrUVNzrXNNZ1ajDU1Ywh9OF3JF0lw0/edit?usp=sharing"
          >
            Original event document ↗
          </a>
          <Link href="/hackathon" className="button">
            View the recap ↗
          </Link>
        </div>
      </section>
    </div>
  );
}

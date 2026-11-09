import Image from "next/image";
import Link from "next/link";
import { Clawd } from "@/components/Clawd";
import { DiscordIcon } from "@/components/icons";
import { clubLinks } from "@/data/links";
import s from "./about.module.css";

export const metadata = {
  title: "About",
  description:
    "What Claude Builder Club is, what members get, and how a semester runs.",
};

const benefits = [
  { title: "Free Claude Pro access", text: "For every member, for the whole year." },
  { title: "Anthropic API credits", text: "For your build team's project." },
  { title: "Claude Code workshops", text: "Hands-on, bi-weekly, laptop required." },
  { title: "Hackathons and demo days", text: "Build in a day, then show it to the room." },
  { title: "A build team", text: "Weekly check-ins that keep you shipping." },
];

const steps = [
  { title: "Kickoff and onboarding", text: "Meet the club, pick a track, get your Claude access." },
  { title: "Workshop cycles", text: "Bi-weekly sessions, each one ends with something running." },
  { title: "Build teams", text: "Weekly check-ins toward a shipped tool." },
  { title: "Demo day and hackathon", text: "Show it to the club and our partners." },
];

export default function AboutPage() {
  return (
    <>
      <header className={`container page-head ${s.header}`}>
        <h1>A club for people who would rather build it.</h1>
        <p className="lead">
          Claude Builder Club started at McGill as a place to learn AI by
          shipping with it. We are part of Anthropic&apos;s Claude Campus
          program, we are run by students, and everything we make is open
          source.
        </p>
      </header>

      <section className={`container ${s.split}`} aria-labelledby="what-we-do">
        <div className={s.photo}>
          <span className="tape tape-left" aria-hidden="true" />
          <div className="frame">
            <Image
              src="/assets/hackathon_26_photos/ralph_table.jpg"
              alt="Students talking with organizers at the club table"
              width={2048}
              height={1365}
              sizes="(max-width: 900px) calc(100vw - 40px), 600px"
            />
          </div>
        </div>
        <div className={s.prose}>
          <h2 id="what-we-do">What we do</h2>
          <p>
            We run hands-on workshops on Claude Code, the Claude API and agent
            patterns. Everyone leaves with something running.
          </p>
          <p>
            Members join small build teams that ship a real tool for McGill
            students over a semester, with weekly check-ins to keep it moving.
          </p>
          <p>
            Every spring we host the Claude Builders Hackathon, and through the
            year we hold demo days where members show their work to the club
            and our partners.
          </p>
          <Link className="btn btn-outline btn-sm" href="/projects">
            See the projects
          </Link>
        </div>
      </section>

      <section className="band band-ice" aria-labelledby="members-get">
        <div className="container">
          <h2 id="members-get" className={s.sectionTitle} data-reveal>
            <Clawd size={36} className={s.titleClawd} /> What members get
          </h2>
          <ul className={s.benefits} data-reveal-group>
            {benefits.map((b) => (
              <li key={b.title}>
                <h3>{b.title}</h3>
                <p className="muted">{b.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="band" aria-labelledby="semester">
        <div className="container">
          <h2 id="semester" className={s.sectionTitle} data-reveal>
            How a semester runs
          </h2>
          <ol className={s.steps} data-reveal-group>
            {steps.map((step, i) => (
              <li key={step.title}>
                <span className={s.numeral} aria-hidden="true">
                  {i + 1}
                </span>
                <div>
                  <h3>{step.title}</h3>
                  <p className="muted">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="band band-blue" aria-labelledby="join">
        <div className={`container ${s.join}`}>
          <div>
            <h2 id="join">Bring an idea. Or just yourself.</h2>
            <p className={s.joinText}>
              Membership is free for McGill students. Fill in the form and say
              hi in Discord.
            </p>
          </div>
          <div className="actions">
            <a
              className="btn"
              href={clubLinks.signup}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open the membership form
            </a>
            <a
              className="btn btn-outline"
              href={clubLinks.discord}
              target="_blank"
              rel="noopener noreferrer"
            >
              <DiscordIcon />
              Join the Discord
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

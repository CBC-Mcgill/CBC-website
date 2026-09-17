import Image from "next/image";
import Link from "next/link";
import s from "../editorial.module.css";
export const metadata = { title: "About · Claude Builder Club" };
export default function AboutPage() {
  return (
    <div className="container">
      <header className={s.pageHero}>
        <p className="eyebrow">About CBC</p>
        <h1>Curiosity is a good place to start.</h1>
        <p className="lead">
          We’re Claude Builder Club at McGill: a student-led community exploring
          what we can make with AI, together.
        </p>
      </header>
      <section className={`section ${s.split}`}>
        <div className={s.prose}>
          <h2>A place to turn ideas into something real.</h2>
          <p>
            We are a builder first club. We want to build and inspire others to
            build.
          </p>
          <p>
            We run regular workshops to teach students how to use Claude and
            other AI tools, and we have project pods where members ship projects
            together in a high-accountability environment. We also run hackathons
            and demo days to celebrate and reward the amazing projects our
            members build.
          </p>
          <div className="actions">
            <Link className="button secondary" href="/#projects">
              Explore our projects ↗
            </Link>
          </div>
        </div>
        <Image
          className={s.photo}
          src="/assets/hackathon_26_photos/ralph_table.jpg"
          alt="Students talking with club organizers at a CBC event table"
          width={1200}
          height={800}
          sizes="(max-width:600px) 100vw, 50vw"
        />
      </section>
      <section className={`section ${s.intro}`}>
        <div>
          <p className="eyebrow">Rooted at McGill</p>
          <h2>Part of a wider community.</h2>
        </div>
        <div className={s.prose}>
          <p>
            CBC at McGill is part of Anthropic’s Claude Campus program,
            connecting student-led builder communities across universities.
          </p>
          <p>
            Here at McGill, our focus is the people beside us: learning
            together, building together, and making space for the next idea.
          </p>
          <div className="actions">
            <Link href="/people">Meet the team ↗</Link>
          </div>
        </div>
      </section>
      <section className={s.join}>
        <div>
          <h2>Bring an idea. Or just yourself.</h2>
          <p>Get connected and learn how to take part.</p>
        </div>
        <Link className="button" href="/contact">
          Join CBC ↗
        </Link>
      </section>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import { Clawd } from "@/components/Clawd";
import { Bench } from "@/components/home/Bench";
import { CountUp } from "@/components/motion/CountUp";
import { FilmStrip } from "@/components/motion/FilmStrip";
import { RollingWord } from "@/components/motion/RollingWord";
import { DiscordIcon, GitHubIcon } from "@/components/icons";
import { Leads } from "@/components/projects/Leads";
import { ProjectCard, ProjectMedia } from "@/components/projects/ProjectCard";
import { clubLinks } from "@/data/links";
import { leadership } from "@/data/people";
import { projects } from "@/data/projects";
import s from "./home.module.css";

const formats = [
  {
    title: "Workshops",
    text: "Hands-on sessions on Claude Code, the Claude API and agent patterns. Bring a laptop, leave with something running.",
  },
  {
    title: "Build teams",
    text: "Small teams ship a real tool for McGill students over the semester, with weekly check-ins and a demo at the end.",
  },
  {
    title: "Hackathon and demo days",
    text: "The Claude Builders Hackathon every spring, plus demo days where you show what you made to the club and our partners.",
  },
];

const stats = [
  { value: 250, suffix: "+", label: "students hosted" },
  { value: 7, suffix: "+", label: "schools represented" },
  { value: 5000, prefix: "$", suffix: "+", label: "in sponsorship for student projects" },
];

const strip = [
  { src: "/assets/hackathon_26_photos/2U3A6039.jpg", alt: "The full room at the 2026 Claude Builders Hackathon", width: 5878, height: 3919 },
  { src: "/assets/hackathon_26_photos/2U3A5640.jpg", alt: "Speaker addressing the room from a wooden podium", width: 2496, height: 3744 },
  { src: "/assets/hackathon_26_photos/2U3A5820.jpg", alt: "Participants collaborating on laptops in the lecture hall", width: 6000, height: 4000 },
  { src: "/assets/hackathon_26_photos/thai_present.jpg", alt: "Presenters at the front of the lecture hall with slides projected behind them", width: 2048, height: 1365 },
  { src: "/assets/hackathon_26_photos/2U3A5631.jpg", alt: "Speaker greeting participants from the lecture hall podium", width: 4000, height: 6000 },
  { src: "/assets/hackathon_26_photos/2U3A6008.jpg", alt: "The audience applauding during presentations", width: 6000, height: 4000 },
  { src: "/assets/hackathon_26_photos/ralph_table.jpg", alt: "Students talking with organizers at the club table", width: 2048, height: 1365 },
  { src: "/assets/hackathon_26_photos/2U3A5833.jpg", alt: "Students discussing their work around laptops", width: 6000, height: 4000 },
];

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

export default function HomePage() {
  const featured = projects.find((p) => p.featured);
  const more = projects.filter((p) => !p.featured).slice(0, 3);

  return (
    <>
      <section className={`paper ${s.hero}`}>
        <div className={`container ${s.heroGrid}`}>
          <div className={s.heroText} data-reveal-group>
            <h1 className="display">
              Build <RollingWord words={["things", "tools", "apps", "bots"]} />{" "}
              people actually use.
            </h1>
            <p className="lead">
              Claude Builder Club is McGill&apos;s community of student
              builders. We learn to build with AI together, ship tools for
              students, and run the Claude Builders Hackathon.
            </p>
            <div className="actions">
              <a
                className="btn"
                href={clubLinks.signup}
                target="_blank"
                rel="noopener noreferrer"
              >
                Join the club
              </a>
              <Link className="btn btn-outline" href="/projects">
                See what we&apos;ve built
              </Link>
            </div>
            <p className="small muted">
              <Clawd size={18} className={s.heroClawd} />
              Free for McGill students. Members get Claude Pro and API credits.
            </p>
          </div>

          <Bench />
        </div>
      </section>

      <section className="band band-marigold">
        <div className="container">
          <h2 className={s.bandTitle} data-reveal>
            How the club works
          </h2>
          <div className={s.columns} data-reveal-group>
            {formats.map((f) => (
              <div key={f.title} className={s.column}>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="band">
        <div className="container">
          <div className="section-head" data-reveal>
            <h2>Built here</h2>
            <div className={s.headAside}>
              <p className="muted">
                Tools that members shipped for other students. Every one of
                them is open source.
              </p>
              <Link className="btn btn-outline btn-sm" href="/projects">
                All projects
              </Link>
            </div>
          </div>

          {featured && (
            <article className={s.feature} data-reveal>
              <ProjectMedia
                project={featured}
                sizes="(min-width: 1240px) 690px, (min-width: 900px) 56vw, 92vw"
              />
              <div className={s.featureText}>
                <h3>{featured.name}</h3>
                <p>{featured.summary}</p>
                <Leads leads={featured.leads} className="small muted" />
                <div className="actions">
                  {featured.url && (
                    <a
                      className="btn btn-sm"
                      href={featured.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {featured.urlLabel ?? "Open"}
                    </a>
                  )}
                  {featured.github && (
                    <a
                      className="btn btn-outline btn-sm"
                      href={featured.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <GitHubIcon />
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </article>
          )}

          <div className={s.cards} data-reveal-group>
            {more.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      <section className="band band-black">
        <div className={`container ${s.hackathon}`}>
          <div className={s.hackathonText} data-reveal-group>
            <h2>Claude Builders Hackathon</h2>
            <p>
              Our flagship event. On April 4, 2026, students from McGill and
              beyond spent a day building social-impact projects with Claude,
              judged by people who build for a living.
            </p>
            <div className="actions">
              <Link className="btn" href="/hackathon">
                See the 2026 recap
              </Link>
              <a className="btn btn-outline" href="/sponsors">
                Sponsor the next one
              </a>
            </div>
          </div>
          <dl className={s.stats} data-reveal-group>
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="small muted">{stat.label}</dt>
                <dd>
                  <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className={s.strip} data-reveal>
          <FilmStrip photos={strip} height={280} />
        </div>
      </section>

      <section className="band">
        <div className="container">
          <div className="section-head" data-reveal>
            <h2>The people running it</h2>
            <div className={s.headAside}>
              <p className="muted">
                Students who organize the workshops, run the hackathon and keep
                the Discord alive.
              </p>
              <Link className="btn btn-outline btn-sm" href="/people">
                Meet the whole team
              </Link>
            </div>
          </div>
          <ul className={s.people} data-reveal-group>
            {leadership.map((person) => (
              <li key={person.name}>
                <div className={`frame pickup ${s.portrait}`}>
                  {person.photo ? (
                    <Image
                      src={encodeURI(`/${person.photo}`)}
                      alt={`Portrait of ${person.name}`}
                      width={600}
                      height={800}
                      sizes="(min-width: 640px) 180px, 46vw"
                    />
                  ) : (
                    <span className={s.initials} aria-hidden="true">
                      {initials(person.name)}
                    </span>
                  )}
                </div>
                <h3 className={s.personName}>{person.name}</h3>
                <p className="small muted">{person.role}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="band band-blue">
        <div className={`container ${s.join}`} data-reveal-group>
          <h2>Bring an idea. Or just yourself.</h2>
          <p className="lead">
            Membership is free for McGill students. Fill in the form and say hi
            in Discord.
          </p>
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

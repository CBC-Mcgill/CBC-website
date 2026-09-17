import Image from "next/image";
import Link from "next/link";
import { GitHubIcon } from "@/components/icons";
import { clubLinks } from "@/data/links";
import { buildTracks } from "@/data/buildTracks";
import { Orbital } from "@/components/motion/Orbital";
import s from "./editorial.module.css";
export default function HomePage() {
  const projects = buildTracks.filter((project) => project.published !== false);

  return (
    <div className="container">
      <section className={s.hero}>
        <div>
          <p className="eyebrow">
            <span className={s.liveDot} /> A home for curious minds · McGill
          </p>
          <h1>
            AI Fluency is the <em>skill of this century.</em>
          </h1>
          <p className="lead">
            That’s why we build with AI actively and unapologetically. If that
            is you, come learn and build with us.
          </p>
          <div className="actions">
            <Link className="button" href="/contact">
              Join CBC <span aria-hidden="true">↗</span>
            </Link>
            <a className="button secondary" href="#projects">
              Explore projects ↓
            </a>
          </div>
        </div>
        <Orbital />
      </section>
      <div className={s.ribbon} aria-hidden="true">
        <div>
          {[0, 1, 2, 3].map((i) => (
            <span key={i}>
              MAKE SOMETHING USEFUL <b>✳</b> BREAK SOMETHING BORING <b>✳</b>{" "}
              BUILD IT TOGETHER <b>✳</b>{" "}
            </span>
          ))}
        </div>
      </div>
      <section className={s.intro} aria-labelledby="activities">
        <p id="activities" className="eyebrow">
          Less watching.
          <br />
          More making.
        </p>
        <div className={s.activities}>
          {[
            [
              "01",
              "Learn by doing",
              "Explore AI tools through practical workshops and shared experiments.",
            ],
            [
              "02",
              "Build together",
              "Work with other students on projects that solve everyday problems.",
            ],
            [
              "03",
              "Meet your people",
              "Share ideas, show your work, and connect at club events.",
            ],
          ].map(([n, title, copy]) => (
            <div key={n}>
              <span className={s.number}>{n} /</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </div>
          ))}
        </div>
      </section>
      <section id="projects" className="section">
        <div className={s.sectionHead}>
          <div>
            <p className="eyebrow">Made at CBC</p>
            <h2>What we are building for McGill students.</h2>
          </div>
          <p>
            Yes, we do what we preach! Take a look at what our members are
            working on.
          </p>
        </div>
        <div className={s.projects}>
          {projects.map((p, i) => (
            <article className={s.project} key={p.name} data-tilt>
              <div className={s.projectArt} aria-hidden="true">
                <span>{p.symbol ?? ["↗", "⌘", "✳"][i % 3]}</span>
                <i />
                <i />
                <i />
              </div>
              <span className={s.badge}>Project / {String(i + 1).padStart(2, "0")}</span>
              <h3>{p.name}</h3>
              <p>{p.description}</p>
              {p.why && (
                <div className={s.projectWhy}>
                  <h4>Why we’re building it</h4>
                  <p>{p.why}</p>
                </div>
              )}
              <dl>
                <div>
                  <dt>Project lead</dt>
                  <dd>{p.leads}</dd>
                </div>
                <div>
                  <dt>Development team</dt>
                  <dd>
                    {p.status === "full"
                      ? "Currently full"
                      : p.status === "open"
                        ? "Open to contributors"
                        : "Project complete"}
                  </dd>
                </div>
              </dl>
              {p.github && (
                <a
                  className={s.projectRepo}
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${p.name} GitHub repository (opens in a new tab)`}
                >
                  <GitHubIcon />
                  View repository <span aria-hidden="true">↗</span>
                </a>
              )}
            </article>
          ))}
        </div>
        {projects.length === 0 && <p>New projects are on the way.</p>}
        <p className={s.projectSuggestion}>
          Want to suggest an idea? Reach out to us at{" "}
          <a href={`mailto:${clubLinks.email}`}>{clubLinks.email}</a>.
        </p>
      </section>
      <section className={`section ${s.split}`}>
        <Image
          className={s.photo}
          src="/assets/hackathon_26_photos/2U3A6039.jpg"
          alt="Participants gathered in a McGill lecture hall for the 2026 hackathon"
          width={1200}
          height={800}
          sizes="(max-width:600px) 100vw, 50vw"
        />
        <div>
          <p className="eyebrow">From the community · April 4, 2026</p>
          <h2>A room full of possibilities.</h2>
          <p className="lead">
            A look back at the Claude Builders Hackathon: students coming
            together to work on AI projects at McGill.
          </p>
          <div className="actions">
            <Link className="button secondary" href="/hackathon">
              See the recap ↗
            </Link>
          </div>
        </div>
      </section>
      <section className={s.join}>
        <div>
          <p className="eyebrow">Your next idea starts here</p>
          <h2>Come build with us.</h2>
          <p>Find out how to join CBC and connect with the community.</p>
        </div>
        <Link className="button" href="/contact">
          Join CBC ↗
        </Link>
      </section>
    </div>
  );
}

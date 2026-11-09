import type { Metadata } from "next";
import { GitHubIcon } from "@/components/icons";
import { Leads } from "@/components/projects/Leads";
import { LinkIcon, ProjectMedia } from "@/components/projects/ProjectCard";
import { clubLinks } from "@/data/links";
import { projects } from "@/data/projects";
import s from "./projects.module.css";

export const metadata: Metadata = {
  title: "Projects",
  description: "Tools built by Claude Builder Club members for McGill students.",
};

export default function ProjectsPage() {
  return (
    <>
      <header className="container page-head">
        <h1>Built here</h1>
        <p className="lead">
          Tools club members shipped for other students, plus what is in
          progress right now. Everything is open source on{" "}
          <a href={clubLinks.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          .
        </p>
      </header>

      <section className={s.list} aria-label="Projects">
        <div className="container">
          {projects.map((project, i) => (
            <article
              key={project.slug}
              id={project.slug}
              className={s.row}
              // The first row is on screen at load, so it never waits for the reveal.
              data-reveal={i > 0 ? "" : undefined}
            >
              <ProjectMedia
                project={project}
                className={s.media}
                sizes="(min-width: 1240px) 580px, (min-width: 900px) 48vw, 92vw"
                preload={i === 0}
              />
              <div className={s.text}>
                {project.since && (
                  <p className="small muted">{project.since}</p>
                )}
                <h2>{project.name}</h2>
                <p className={s.summary}>{project.summary}</p>
                {project.why && <p className="muted">{project.why}</p>}
                <Leads leads={project.leads} />
                <div className="actions">
                  {project.url && (
                    <a
                      className="btn btn-sm"
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <LinkIcon href={project.url} />
                      {project.urlLabel ?? "Open"}
                    </a>
                  )}
                  {project.github && (
                    <a
                      className="btn btn-outline btn-sm"
                      href={project.github}
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
          ))}
        </div>
      </section>

      <section className="band band-ice" data-reveal>
        <div className={`container ${s.closing}`}>
          <h2>Have an idea?</h2>
          <p className="lead">
            Email <a href={`mailto:${clubLinks.email}`}>{clubLinks.email}</a> or
            pitch it in{" "}
            <a href={clubLinks.discord} target="_blank" rel="noopener noreferrer">
              Discord
            </a>
            . Build teams form at the start of each semester.
          </p>
        </div>
      </section>
    </>
  );
}

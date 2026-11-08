import Image from "next/image";
import type { Project } from "@/types";
import { statusChipClass, statusLabel } from "@/data/projects";
import s from "./ProjectCard.module.css";

/** Screenshot (or a poster-type name tile) taped to the page, with its status as a sticker. */
export function ProjectMedia({
  project,
  sizes,
  className = "",
}: {
  project: Project;
  sizes: string;
  className?: string;
}) {
  return (
    <div className={`${s.taped} ${className}`}>
      <span className="tape" aria-hidden="true" />
      <span className={`${statusChipClass[project.status]} sticker`}>
        {statusLabel[project.status]}
      </span>
      {project.image ? (
        <div className="frame">
          <Image src={project.image.src} alt={project.image.alt} fill sizes={sizes} />
        </div>
      ) : (
        <div className={`frame ${s.tile}`} aria-hidden="true">
          <span>{project.name}</span>
        </div>
      )}
    </div>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  const href = project.url ?? project.github;

  return (
    <article className={s.card}>
      <ProjectMedia
        project={project}
        className={s.media}
        sizes="(min-width: 1100px) 370px, (min-width: 640px) 46vw, 92vw"
      />
      <h3 className={s.name}>
        {href ? (
          <a href={href} target="_blank" rel="noopener noreferrer">
            {project.name}
          </a>
        ) : (
          project.name
        )}
      </h3>
      <p className="muted">{project.summary}</p>
      <div className={`small ${s.meta}`}>
        <span className="muted">Led by {project.leads}</span>
        <span className={s.links}>
          {project.url && (
            <a href={project.url} target="_blank" rel="noopener noreferrer">
              {project.urlLabel ?? "Open"}
            </a>
          )}
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          )}
        </span>
      </div>
    </article>
  );
}

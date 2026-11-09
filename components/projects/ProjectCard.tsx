import Image from "next/image";
import type { Project } from "@/types";
import { DiscordIcon, GitHubIcon } from "@/components/icons";
import { statusChipClass, statusLabel } from "@/data/projects";
import { Leads } from "./Leads";
import s from "./ProjectCard.module.css";

/** Icon for a project link, when the destination is one people recognise by its mark. */
export function LinkIcon({ href }: { href: string }) {
  if (href.includes("github.com")) return <GitHubIcon />;
  if (href.includes("discord")) return <DiscordIcon />;
  return null;
}

/** Screenshot (or a poster-type name tile) taped to the page, with its status as a sticker. */
export function ProjectMedia({
  project,
  sizes,
  className = "",
  preload = false,
}: {
  project: Project;
  sizes: string;
  className?: string;
  preload?: boolean;
}) {
  return (
    <div className={`${s.taped} ${className}`}>
      <span className="tape" aria-hidden="true" />
      <span className={`${statusChipClass[project.status]} sticker`}>
        {statusLabel[project.status]}
      </span>
      {project.image ? (
        <div className="frame">
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            sizes={sizes}
            preload={preload}
          />
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
        <Leads leads={project.leads} className="muted" />
        <span className={s.links}>
          {project.url && (
            <a href={project.url} target="_blank" rel="noopener noreferrer">
              <LinkIcon href={project.url} />
              {project.urlLabel ?? "Open"}
            </a>
          )}
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              <GitHubIcon />
              GitHub
            </a>
          )}
        </span>
      </div>
    </article>
  );
}

export interface Person {
  name: string;
  role: string;
  tagline?: string;
  photo?: string;
  email?: string;
  linkedin?: string;
  github?: string;
  details?: PersonDetail[];
  id?: string;
}

export interface PersonDetail {
  label: string;
  text: string;
}

/** live: people can use it today. building: active development. paused: no recent work. */
export type ProjectStatus = "live" | "building" | "paused";

export interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Project {
  slug: string;
  name: string;
  /** One sentence, what it does for the person using it. */
  summary: string;
  /** Optional longer paragraph for the projects page. */
  why?: string;
  status: ProjectStatus;
  /** Club-supplied names of the people leading it. */
  leads: string;
  /** Season it started or shipped, e.g. "Fall 2025". */
  since?: string;
  github?: string;
  /** Where people can use it. */
  url?: string;
  urlLabel?: string;
  image?: ProjectImage;
  /** Shown first and larger on the home page. */
  featured?: boolean;
}

export interface HackathonTrack {
  number: string;
  name: string;
  description: string;
  examples: string[];
}

export interface ClubLinks {
  discord: string;
  instagram: string;
  linkedin: string;
  signup: string;
  github: string;
  email: string;
}

export interface Person {
  name: string;
  role: string;
  tagline: string;
  photo: string;
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

export type BuildTrackStatus = 'open' | 'full' | 'complete';

export interface BuildTrack {
  name: string;
  description: string;
  leads: string;
  status: BuildTrackStatus;
  github?: string;
}

export interface ClubLinks {
  discord: string;
  instagram: string;
  linkedin: string;
  signup: string;
  github: string;
  email?: string;
}

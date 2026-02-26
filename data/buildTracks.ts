import type { BuildTrack } from '@/types';

export const buildTracks: BuildTrack[] = [
  {
    name: 'Course Notifier',
    description: 'Alert university students the moment a seat opens in a full course section.',
    leads: 'Parsa',
    status: 'full',
    github: 'https://github.com/CBC-Mcgill/McGill-Seat-Notification'
  },
  {
    name: 'Degree Planner',
    description: 'Gamified planner to build an optimized curriculum.',
    leads: 'Thai',
    status: 'open',
    github: 'https://github.com/CBC-Mcgill/McGill-Plan-Your-Degree'
  },
  {
    name: 'BeenJobBot',
    description: 'Automated job scraper for SWE/ML internships and new grad positions.',
    leads: 'Ben',
    status: 'complete',
    github: 'https://github.com/CBC-Mcgill/BeensJobBot',
  },
];

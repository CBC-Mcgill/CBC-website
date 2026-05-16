import type { BuildTrack } from '@/types';

export const buildTracks: BuildTrack[] = [
  {
    name: 'Course Notifier',
    description: 'Alert McGill students the moment a seat (CRN) opens up.',
    why: "Wanna take that class with your friends or a class that you love but it's always full? We solve that by sending you an instant notification when a seat opens up. ",
    leads: 'Parsa',
    status: 'full',
    github: 'https://github.com/CBC-Mcgill/McGill-Seat-Notification'
  },
  {
    name: 'Degree Planner',
    description: 'Gamified planner to build an optimized curriculum.',
    why: "Planning a degree shouldn't feel like spreadsheet labor or a bunch of screenshots of your curriculum with notes on it. We are turning it into something fun and genuintely easy to visualize.",
    leads: 'Thai',
    status: 'full',
    github: 'https://github.com/CBC-Mcgill/McGill-Plan-Your-Degree'
  },
  {
    name: 'BeenJobBot',
    description: 'Automated job scraper for SWE/ML internships and new grad positions.',
    why: "Only applying on Linkedin and McGill job board is so NGMI. We poll the latest drop of internships + gatekept opportunities in Canada/US/Europe and stream it on Discord for you.",
    leads: 'Ben',
    status: 'full',
    github: 'https://github.com/CBC-Mcgill/BeensJobBot',
  },
];

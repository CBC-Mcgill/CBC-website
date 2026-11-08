import type { Project } from "@/types";

/**
 * Projects built by club members. Order is display order.
 * Keep summaries factual and sourced from each repo's README.
 */
export const projects: Project[] = [
  {
    slug: "plan-your-degree",
    name: "Plan Your Degree",
    summary:
      "Import your McGill transcript, see which courses you can take next, and plan every term to graduation.",
    why: "Planning a degree used to mean spreadsheets and screenshots of the calendar. Plan Your Degree reads your unofficial transcript in the browser, checks prerequisites and program requirements, and lays out the terms until you graduate.",
    status: "live",
    leads: "Thai Tran",
    since: "Shipped Fall 2026",
    github: "https://github.com/CBC-Mcgill/McGill-Plan-Your-Degree",
    url: "https://plan-your-degree.vercel.app",
    urlLabel: "plan-your-degree.vercel.app",
    image: {
      src: "/assets/projects/plan-your-degree-planner.webp",
      alt: "The Plan Your Degree planner showing program credit progress and a term-by-term plan",
      width: 2560,
      height: 1600,
    },
    featured: true,
  },
  {
    slug: "job-bot",
    name: "Job Bot",
    summary:
      "Scans Ashby, Greenhouse and Lever job boards for internships and new-grad roles and posts the good ones to our Discord.",
    why: "Early-career listings are scattered across hundreds of company boards. Job Bot reads them directly, keeps only clearly eligible software, quant and AI roles, and routes each one to the right Discord channel with location, link and pay when the board lists it.",
    status: "live",
    leads: "Benjamin Ghaderi, Thai Tran",
    since: "Running since Fall 2026",
    github: "https://github.com/CBC-Mcgill/JobBot-V2",
    url: "https://discord.gg/BaEJnjnDdw",
    urlLabel: "See it in Discord",
  },
  {
    slug: "judging-dashboard",
    name: "Judging Dashboard",
    summary:
      "Scoring, rankings and judge onboarding for hackathons. Built for ours, open for anyone's.",
    why: "Judging a hackathon in a spreadsheet falls apart at forty teams. The dashboard lets organizers define criteria, tracks and sponsor challenges, invite judges by link, and see rankings update as scores come in.",
    status: "live",
    leads: "Joshua Zhou",
    since: "Shipped Spring 2026",
    github: "https://github.com/CBC-Mcgill/judging-dashboard",
    url: "https://judging.claudebuildersmcgill.ca",
    urlLabel: "judging.claudebuildersmcgill.ca",
    image: {
      src: "/assets/projects/judging-dashboard.webp",
      alt: "The Judging Dashboard sign-in page",
      width: 960,
      height: 600,
    },
  },
  {
    slug: "claude-roulette",
    name: "Claude Roulette",
    summary:
      "A physics-based roulette wheel for raffles of up to 37 people. Real physics decides the winner.",
    why: "We needed a fair way to pick raffle winners at events. The ball gets a random launch speed and the rest is simulated: friction, deflectors, fret bounces. Every spin is different and nothing is predetermined.",
    status: "live",
    leads: "Thai Tran",
    since: "Shipped Winter 2026",
    github: "https://github.com/CBC-Mcgill/Claude-Roulette",
    url: "https://www.claudebuildersmcgill.ca/roulette",
    urlLabel: "Spin it",
    image: {
      src: "/assets/projects/claude-roulette.webp",
      alt: "The Claude Roulette wheel with names assigned to pockets",
      width: 1440,
      height: 900,
    },
  },
  {
    slug: "course-notifier",
    name: "Course Notifier",
    summary:
      "Get an alert the moment a seat opens in a full McGill course.",
    why: "Instead of refreshing Minerva all day, enter a course code and an email. The service watches the section and tells you the moment a spot opens so you can register before it fills again.",
    status: "building",
    leads: "Parsa Rahimnia",
    since: "Started Winter 2026",
    github: "https://github.com/CBC-Mcgill/McGill-Seat-Notification",
  },
  {
    slug: "wayfind",
    name: "Wayfind",
    summary: "An iOS app to find your classes on campus faster.",
    why: "New to campus and late to a lecture in a building you have never seen? Wayfind takes your schedule and gets you to the right room.",
    status: "building",
    leads: "Parsa Rahimnia",
    since: "Started Fall 2026",
    github: "https://github.com/CBC-Mcgill/wayfind",
  },
];

export const statusLabel: Record<Project["status"], string> = {
  live: "Live",
  building: "In progress",
  paused: "Paused",
};

export const statusChipClass: Record<Project["status"], string> = {
  live: "chip chip-live",
  building: "chip chip-building",
  paused: "chip chip-muted",
};

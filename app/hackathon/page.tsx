import type { Metadata } from "next";
import Image from "next/image";
import { PhotoGallery, type GalleryPhoto } from "@/components/hackathon-gallery/PhotoGallery";
import { hackathonTracks } from "@/data/hackathonTracks";
import { clubLinks } from "@/data/links";
import s from "./hackathon.module.css";

export const metadata: Metadata = {
  title: "Hackathon",
  description:
    "Recap of the 2026 Claude Builders Hackathon at McGill: tracks, judging, prizes, sponsors and photos.",
};

const PHOTO_DIR = "/assets/hackathon_26_photos";

// Order matters: it tiles the 3-column and 2-column mosaics with no empty cells.
const photos: GalleryPhoto[] = [
  { src: `${PHOTO_DIR}/2U3A5631.jpg`, width: 4000, height: 6000, alt: "Speaker greeting participants from the lecture hall podium" },
  { src: `${PHOTO_DIR}/2U3A5820.jpg`, width: 6000, height: 4000, alt: "Participants collaborating on laptops in the lecture hall" },
  { src: `${PHOTO_DIR}/2U3A5833.jpg`, width: 6000, height: 4000, alt: "Students discussing their work around laptops" },
  { src: `${PHOTO_DIR}/2U3A6039.jpg`, width: 5878, height: 3919, alt: "Hackathon participants gathered in a McGill lecture hall", wide: true },
  { src: `${PHOTO_DIR}/thai_present.jpg`, width: 2048, height: 1365, alt: "Presenters at the front of the lecture hall with slides projected behind them", wide: true },
  { src: `${PHOTO_DIR}/2U3A5640.jpg`, width: 2496, height: 3744, alt: "Speaker addressing the room from a wooden podium" },
  { src: `${PHOTO_DIR}/2U3A6008.jpg`, width: 6000, height: 4000, alt: "Audience applauding during the hackathon presentations" },
  { src: `${PHOTO_DIR}/ralph_table.jpg`, width: 2048, height: 1365, alt: "Students talking with organizers at the club table" },
];

const figures = [
  ["4", "tracks"],
  ["1 to 3", "people per team"],
  ["$0", "to enter"],
] as const;

const criteria = [
  { label: "Technical execution", weight: 30, color: "var(--blue)" },
  { label: "Impact potential", weight: 25, color: "var(--black)" },
  { label: "Ethical alignment", weight: 25, color: "var(--blue-deep)" },
  { label: "Presentation", weight: 20, color: "var(--ice)" },
];

const prizes = [
  {
    place: "First place",
    items: ["$100 per team member", "1,000 Anthropic API credits for the team", "A Claude hat for each member"],
  },
  {
    place: "Second place",
    items: ["$50 per team member", "500 Anthropic API credits for the team", "A Claude hat for each member"],
  },
  {
    place: "Third place",
    items: ["$50 per team member", "A Claude hat for each member"],
  },
];

type Org = {
  name: string;
  url: string;
  logo: string;
  width: number;
  height: number;
  note?: string;
  /** Wordmark padded into a square file: crop the empty top and bottom so it stays legible. */
  wordmark?: boolean;
};

const orgGroups: { title: string; orgs: Org[] }[] = [
  {
    title: "Sub-challenge sponsors",
    orgs: [
      { name: "Rootly", note: "Neuroscience and Mental Health", url: "https://rootly.com", logo: "/assets/sponsors/rootlyhq_logo.jpg", width: 200, height: 200 },
      { name: "PCare+", note: "Biology and Physical Health", url: "https://pcare.ca", logo: "/assets/sponsors/pcare+_logo.jpg", width: 200, height: 200 },
      { name: "Brim Financial", note: "Economic Empowerment and Education", url: "https://brimfinancial.com", logo: "/assets/sponsors/brimfinancial_logo.jpg", width: 200, height: 200 },
    ],
  },
  {
    title: "Food and drink",
    orgs: [
      { name: "Domino's", url: "https://dominos.com", logo: "/assets/sponsors/dominos_pizza_logo.jpg", width: 200, height: 200 },
      { name: "poppi", url: "https://drinkpoppi.com", logo: "/assets/sponsors/poppi_logo.jpg", width: 200, height: 200 },
      { name: "Red Bull", url: "https://redbull.com", logo: "/assets/sponsors/red_bull_logo.jpg", width: 200, height: 200 },
    ],
  },
  {
    title: "Partners",
    orgs: [
      { name: "McGill Ventures", url: "https://mcgillvc.ca", logo: "/assets/partners/mcgill_ventures_logo.jpg", width: 200, height: 200, wordmark: true },
      { name: "Anthropic", url: "https://anthropic.com", logo: "/assets/partners/anthropic_mark.png", width: 172, height: 122 },
    ],
  },
];

export default function HackathonPage() {
  return (
    <>
      <section className={`band ${s.intro}`}>
        <div className="container">
          <h1>Claude Builders Hackathon 2026</h1>
          <p className={`lead ${s.introLead}`}>
            April 4, 2026 at McGill University. One day, four tracks, teams of one to three, free to enter.
            The theme was social impact, inspired by Dario Amodei&apos;s essay{" "}
            <a href="https://darioamodei.com/essay/machines-of-loving-grace" target="_blank" rel="noopener noreferrer">
              Machines of Loving Grace
            </a>
            .
          </p>
          <dl className={s.figures} data-reveal-group>
            {figures.map(([value, label]) => (
              <div key={label}>
                <dt className="small muted">{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div className={`container ${s.photos}`}>
        <PhotoGallery photos={photos} />
      </div>

      <section className="band band-ice" aria-labelledby="tracks-title">
        <div className="container">
          <div className="section-head">
            <h2 id="tracks-title" data-reveal>What people built for</h2>
            <p className="lead">Four tracks, all pointed at problems that matter.</p>
          </div>
          <div className={s.tracks} data-reveal-group>
            {hackathonTracks.map((track) => (
              <article key={track.name} className={s.track}>
                <h3>{track.name}</h3>
                <p>{track.description}</p>
                <ul className={s.list}>
                  {track.examples.map((example) => (
                    <li key={example}>{example}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="band" aria-labelledby="judging-title">
        <div className="container">
          <div className="section-head">
            <h2 id="judging-title" data-reveal>How projects were judged</h2>
          </div>
          <div className={s.bar} aria-hidden="true">
            {criteria.map((c) => (
              <span key={c.label} style={{ flexGrow: c.weight, background: c.color }} />
            ))}
          </div>
          <ul className={s.legend}>
            {criteria.map((c) => (
              <li key={c.label} style={{ flexGrow: c.weight }}>
                <span className={s.swatch} style={{ background: c.color }} aria-hidden="true" />
                <span>{c.label}</span>
                <strong>{c.weight}%</strong>
              </li>
            ))}
          </ul>

          <h2 id="prizes-title" className={s.prizesTitle}>
            Prizes
          </h2>
          <div className={s.prizes} data-reveal-group>
            {prizes.map((prize) => (
              <article key={prize.place} className={s.prize}>
                <h3>{prize.place}</h3>
                <ul className={s.list}>
                  {prize.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <p className={`muted ${s.prizeNote}`}>
            Sponsor sub-challenges carried their own prizes and stacked with the main ones.
          </p>
        </div>
      </section>

      <section className={`band ${s.ruled}`} aria-labelledby="sponsors-title">
        <div className="container">
          <div className="section-head">
            <h2 id="sponsors-title" data-reveal>Sponsors and partners</h2>
          </div>
          {orgGroups.map((group) => (
            <div key={group.title} className={s.orgGroup}>
              <h3>{group.title}</h3>
              <ul className={s.orgs}>
                {group.orgs.map((org) => (
                  <li key={org.name}>
                    <a className={s.org} href={org.url} target="_blank" rel="noopener noreferrer">
                      <span className={s.logoTile}>
                        <Image
                          className={org.wordmark ? s.wordmark : undefined}
                          src={org.logo}
                          width={org.width}
                          height={org.height}
                          alt=""
                          sizes={org.wordmark ? "180px" : "80px"}
                        />
                      </span>
                      <span className={s.orgName}>{org.name}</span>
                      {org.note && <span className="small muted">{org.note} track</span>}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="band band-marigold" aria-labelledby="next-title">
        <div className="container" data-reveal-group>
          <h2 id="next-title">The next one is in the works.</h2>
          <p className={`lead ${s.closingLead}`}>
            We run the hackathon every spring. Sponsors get a seat on the judging panel, a booth and a room full of
            people who ship. Students who join the club hear about it first.
          </p>
          <div className="actions">
            <a className="btn" href="/sponsors">
              Read the sponsorship package
            </a>
            <a className="btn btn-outline" href={clubLinks.signup} target="_blank" rel="noopener noreferrer">
              Join the club
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

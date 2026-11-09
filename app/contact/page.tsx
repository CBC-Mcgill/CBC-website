import Link from "next/link";
import { DiscordIcon, EmailIcon } from "@/components/icons";
import { clubLinks } from "@/data/links";
import s from "./contact.module.css";

export const metadata = {
  title: "Join and contact",
  description: "Join Claude Builder Club at McGill or get in touch.",
};

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

export default function ContactPage() {
  return (
    <div className="container">
      <header className="page-head">
        <h1>Join CBC</h1>
        <p className="lead">
          Membership is free for McGill students. Two steps and you are in.
        </p>
      </header>

      <div className={s.steps} data-reveal-group>
        <section className={s.block} aria-labelledby="member">
          <h2 id="member" className={s.title}>
            Become a member
          </h2>
          <p>
            Fill in the membership form. It takes two minutes and puts you on
            the list.
          </p>
          <a className="btn" href={clubLinks.signup} {...external}>
            Open the membership form
          </a>
        </section>
        <section className={s.block} aria-labelledby="discord">
          <h2 id="discord" className={s.title}>
            Then join the Discord
          </h2>
          <p>
            That makes you a member. Workshops get announced there, build
            teams form and Job Bot posts internships.
          </p>
          <a className="btn btn-outline" href={clubLinks.discord} {...external}>
            <DiscordIcon />
            Join the Discord
          </a>
        </section>
      </div>

      <div className={s.more} data-reveal-group>
        <section className={s.block} aria-labelledby="questions">
          <h2 id="questions" className={s.subtitle}>
            Questions and partnerships
          </h2>
          <p>
            <a className={s.iconLink} href={`mailto:${clubLinks.email}`}>
              <EmailIcon />
              {clubLinks.email}
            </a>
          </p>
        </section>
        <section className={s.block} aria-labelledby="sponsor">
          <h2 id="sponsor" className={s.subtitle}>
            Sponsor the hackathon
          </h2>
          <p>
            Read <a href="/sponsors">the package</a>, then email us.
          </p>
        </section>
        <section className={s.block} aria-labelledby="team">
          <h2 id="team" className={s.subtitle}>
            Help run the club
          </h2>
          <p>
            The internal team handles the day to day: workshops, the hackathon,
            sponsors. If you want in, contact the directors and VPs directly.
            They are all on the <Link href="/people">Team page</Link>.
          </p>
        </section>
      </div>
    </div>
  );
}

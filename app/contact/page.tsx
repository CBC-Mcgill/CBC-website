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
            Fill in the membership form. It takes two minutes and we will add
            you to the mailing list and Discord.
          </p>
          <a className="btn" href={clubLinks.signup} {...external}>
            Open the membership form
          </a>
        </section>
        <section className={s.block} aria-labelledby="discord">
          <h2 id="discord" className={s.title}>
            Say hi in Discord
          </h2>
          <p>
            That is where workshops get announced, build teams form and Job
            Bot posts internships.
          </p>
          <a className="btn btn-outline" href={clubLinks.discord} {...external}>
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
            <a href={`mailto:${clubLinks.email}`}>{clubLinks.email}</a>
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
        <section className={s.block} aria-labelledby="elsewhere">
          <h2 id="elsewhere" className={s.subtitle}>
            Elsewhere
          </h2>
          <ul className={s.links}>
            <li>
              <a href={clubLinks.instagram} {...external}>Instagram</a>
            </li>
            <li>
              <a href={clubLinks.linkedin} {...external}>LinkedIn</a>
            </li>
            <li>
              <a href={clubLinks.github} {...external}>GitHub</a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}

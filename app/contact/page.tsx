import { clubLinks } from "@/data/links";
import s from "../editorial.module.css";
export const metadata = { title: "Join CBC · Claude Builder Club" };
export default function ContactPage() {
  return (
    <div className="container">
      <header className={s.pageHero}>
        <p className="eyebrow">Join / Contact</p>
        <h1>There’s room for your curiosity.</h1>
        <p className="lead">
          Interested in learning, building, or meeting other students working
          with AI? Start here.
        </p>
      </header>
      <section className={`section ${s.contactGrid}`}>
        <article className={s.contactItem}>
          <span className={s.number}>01 / Become a member</span>
          <h2>Join the club.</h2>
          <p>
            Use our membership form to introduce yourself and express your
            interest in CBC.
          </p>
          <div className="actions">
            <a className="button" href={clubLinks.signup}>
              Open membership form ↗
            </a>
          </div>
        </article>
        <article className={s.contactItem}>
          <span className={s.number}>02 / Join the conversation</span>
          <h2>Find us on Discord.</h2>
          <p>
            Connect with the community, follow announcements, and hear about
            opportunities to get involved.
          </p>
          <div className="actions">
            <a className="button secondary" href={clubLinks.discord}>
              Join Discord ↗
            </a>
          </div>
        </article>
      </section>
      <section className={`section ${s.contactGrid}`}>
        <div className={s.contactItem}>
          <p className="eyebrow">Questions & partnerships</p>
          <h2>Let’s talk.</h2>
          <p>
            For general questions, collaborations, or sponsorship conversations,
            email the organizers.
          </p>
          <div className="actions">
            <a href={`mailto:${clubLinks.email}`}>{clubLinks.email}</a>
          </div>
        </div>
        <div className={s.contactItem}>
          <p className="eyebrow">Elsewhere</p>
          <h2>Keep in touch.</h2>
          <div className="actions">
            <a href={clubLinks.instagram}>Instagram ↗</a>
            <a href={clubLinks.linkedin}>LinkedIn ↗</a>
            <a href={clubLinks.github}>GitHub ↗</a>
          </div>
        </div>
      </section>
    </div>
  );
}

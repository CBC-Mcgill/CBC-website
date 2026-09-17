import { PeopleGrid } from "@/components/people/PeopleGrid";
import { leadership, associates } from "@/data/people";
import s from "../editorial.module.css";
export const metadata = { title: "Team · Claude Builder Club" };
export default function PeoplePage() {
  return (
    <div className="container">
      <header className={s.pageHero}>
        <p className="eyebrow">The people behind CBC</p>
        <h1>A club is the people who build it.</h1>
        <p className="lead">
          Meet the students bringing our projects, events, and community to life
          at McGill.
        </p>
      </header>
      <section className="section">
        <h2>Leadership</h2>
        <PeopleGrid people={leadership} />
      </section>
      <section className="section">
        <h2>Associates</h2>
        <PeopleGrid people={associates} />
      </section>
    </div>
  );
}

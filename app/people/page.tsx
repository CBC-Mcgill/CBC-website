import { Clawd } from "@/components/Clawd";
import { PeopleGrid } from "@/components/people/PeopleGrid";
import { leadership, associates } from "@/data/people";
import s from "./people.module.css";

export const metadata = {
  title: "Team",
  description: "The students who run Claude Builder Club at McGill.",
};

export default function PeoplePage() {
  return (
    <div className="container">
      <header className="page-head">
        <h1>The people behind CBC</h1>
        <p className="lead">
          A club is the people who build it. Here is who runs this one.
        </p>
      </header>

      <div className={s.tree}>
        <div className={s.hub}>
          <Clawd size="100%" />
        </div>
        <section className={s.group} aria-labelledby="leadership">
          <h2 id="leadership" className={s.groupTitle}>
            Leadership
          </h2>
          <PeopleGrid people={leadership} />
        </section>
        <section className={s.group} aria-labelledby="associates">
          <h2 id="associates" className={s.groupTitle}>
            Associates
          </h2>
          <PeopleGrid people={associates} />
        </section>
      </div>
    </div>
  );
}

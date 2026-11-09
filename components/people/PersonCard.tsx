import { AgentFigure } from "./AgentFigure";
import { PersonSocials } from "./PersonSocials";
import type { Person } from "@/types";
import s from "./people.module.css";

export function PersonCard({ person }: { person: Person }) {
  return (
    <article className={s.person}>
      <span className={s.stub} aria-hidden="true" />
      <AgentFigure person={person} />
      {person.tagline && (
        <p className={`small ${s.reply}`}>
          {person.tagline}
          <span className={s.caret} aria-hidden="true" />
        </p>
      )}
      <h3 className={s.name}>{person.name}</h3>
      <p className="small muted">{person.role}</p>
      <PersonSocials person={person} />
    </article>
  );
}

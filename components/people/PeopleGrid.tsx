import { PersonCard } from "./PersonCard";
import type { Person } from "@/types";
import s from "./people.module.css";

export function PeopleGrid({ people }: { people: Person[] }) {
  return (
    <ul className={s.grid}>
      {people.map((person, i) => (
        <li key={person.name} style={{ "--i": i } as React.CSSProperties}>
          <PersonCard person={person} />
        </li>
      ))}
    </ul>
  );
}

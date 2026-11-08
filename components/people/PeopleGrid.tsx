import { PersonCard } from "./PersonCard";
import type { Person } from "@/types";
import s from "./people.module.css";

export function PeopleGrid({ people }: { people: Person[] }) {
  return (
    <ul className={s.grid} data-reveal-group>
      {people.map((person) => (
        <li key={person.name}>
          <PersonCard person={person} />
        </li>
      ))}
    </ul>
  );
}

import { PersonCard } from "./PersonCard";
import type { Person } from "@/types";
import s from "@/app/editorial.module.css";
export function PeopleGrid({ people }: { people: Person[] }) {
  return (
    <div className={s.team}>
      {people.map((person) => (
        <PersonCard key={person.name} person={person} />
      ))}
    </div>
  );
}

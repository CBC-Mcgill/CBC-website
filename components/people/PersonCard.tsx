import Image from "next/image";
import { PersonSocials } from "./PersonSocials";
import type { Person } from "@/types";
import s from "./people.module.css";

const initials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("");

export function PersonCard({ person }: { person: Person }) {
  return (
    <article className={s.person}>
      <div className={`frame pickup ${s.portrait}`}>
        {person.photo ? (
          <Image
            src={"/" + encodeURI(person.photo.replace(/^\//, ""))}
            alt={person.name}
            width={600}
            height={800}
            sizes="(max-width: 600px) 50vw, (max-width: 1100px) 33vw, 25vw"
          />
        ) : (
          <span className={s.initials} aria-hidden="true">
            {initials(person.name)}
          </span>
        )}
      </div>
      <h3 className={s.name}>{person.name}</h3>
      <p className={`small muted ${s.role}`}>{person.role}</p>
      {person.tagline && <p className={`small ${s.tagline}`}>{person.tagline}</p>}
      <PersonSocials person={person} />
    </article>
  );
}

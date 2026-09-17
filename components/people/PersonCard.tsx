import Image from "next/image";
import { PersonSocials } from "./PersonSocials";
import type { Person } from "@/types";
import s from "@/app/editorial.module.css";
export function PersonCard({ person }: { person: Person }) {
  return (
    <article className={s.person} data-tilt>
      <div className={s.portrait}>
        {person.photo ? (
          <Image
            src={"/" + person.photo.replace(/^\//, "")}
            alt={person.name}
            width={600}
            height={800}
            sizes="(max-width:400px) 100vw, (max-width:900px) 50vw, 25vw"
          />
        ) : (
          <span aria-label={`Portrait unavailable for ${person.name}`}>
            {person.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </span>
        )}
      </div>
      <h3>{person.name}</h3>
      <p className={s.role}>{person.role}</p>
      {person.tagline && <p className={s.bio}>{person.tagline}</p>}
      <PersonSocials person={person} />
    </article>
  );
}

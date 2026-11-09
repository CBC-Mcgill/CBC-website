import Image from "next/image";
import type { Person } from "@/types";
import s from "./people.module.css";

const initials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("");

/** A member drawn as a little Clawd: the portrait is the body, with orange arms and legs. */
export function AgentFigure({ person }: { person: Person }) {
  return (
    <div className={s.figure} aria-hidden="true">
      <span className={`${s.arm} ${s.armLeft}`} />
      <span className={`${s.arm} ${s.armRight}`} />
      <div className={`frame ${s.body}`}>
        {person.photo ? (
          <Image
            src={"/" + encodeURI(person.photo.replace(/^\//, ""))}
            alt=""
            width={600}
            height={800}
            sizes="128px"
          />
        ) : (
          <span className={s.initials}>{initials(person.name)}</span>
        )}
      </div>
      <span className={s.legs}>
        <i />
        <i />
        <i />
        <i />
      </span>
    </div>
  );
}

import Image from "next/image";
import { associates, leadership } from "@/data/people";
import s from "./ProjectCard.module.css";

const people = [...leadership, ...associates];

/** "Led by" line with the leads' portraits in front, for leads who are on the Team page. */
export function Leads({ leads, className = "small" }: { leads: string; className?: string }) {
  const photos = leads
    .split(",")
    .map((name) => people.find((p) => p.name === name.trim())?.photo)
    .filter((photo): photo is string => Boolean(photo));

  return (
    <p className={`${className} ${s.leads}`}>
      {photos.length > 0 && (
        <span className={s.avatars} aria-hidden="true">
          {photos.map((photo) => (
            <Image
              key={photo}
              className={s.avatar}
              src={"/" + encodeURI(photo)}
              alt=""
              width={48}
              height={48}
              sizes="24px"
            />
          ))}
        </span>
      )}
      <span>Led by {leads}</span>
    </p>
  );
}

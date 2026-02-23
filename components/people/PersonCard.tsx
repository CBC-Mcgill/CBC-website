import { ImgFrame } from '@/components/shared/ImgFrame';
import { PersonSocials } from './PersonSocials';
import type { Person } from '@/types';

interface PersonCardProps {
  person: Person;
  index: number;
}

export function PersonCard({ person }: PersonCardProps) {
  const photo = person.photo || 'assets/people/placeholder.png';

  return (
    <article className="person-card">
      <ImgFrame src={photo} alt={person.name} label={person.name} />
      <div className="person-header">
        <h3>{person.name}</h3>
        <div className="person-role">{person.role}</div>
        <p className="person-meta">{person.tagline}</p>
        <PersonSocials person={person} />
      </div>
      {person.details && person.details.length > 0 && (
        <div className="person-details">
          {person.details.slice(0, 3).map((detail, i) => (
            <div key={i} className="person-detail">
              <span>{detail.label}</span>
              <p>{detail.text}</p>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}

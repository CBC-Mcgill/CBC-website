import { PersonCard } from './PersonCard';
import type { Person } from '@/types';

interface PeopleGridProps {
  people: Person[];
}

export function PeopleGrid({ people }: PeopleGridProps) {
  return (
    <div className="people-grid is-static" style={{ marginTop: '1.5rem' }}>
      {people.map((person, index) => (
        <PersonCard key={`${person.name}-${index}`} person={person} index={index} />
      ))}
    </div>
  );
}

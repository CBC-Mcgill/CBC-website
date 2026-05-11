import Image from 'next/image';
import { claudeCampusSchools } from '@/data/claudeCampusSchools';
import type { CampusSchool } from '@/types';

function dotPosition(school: CampusSchool): { left: string; top: string } {
  const left = ((school.lng + 180) / 360) * 100;
  const top = ((90 - school.lat) / 180) * 100;
  return { left: `${left}%`, top: `${top}%` };
}

export function CampusMapSection() {
  const countryCount = new Set(claudeCampusSchools.map((s) => s.country)).size;

  return (
    <section className="section">
      <div className="container">
        <figure className="campus-map-panel soft-panel">
          <figcaption className="campus-map-caption">
            <p
              className="eyebrow reveal"
              style={{ '--delay': '0.1s' } as React.CSSProperties}
            >
              Claude Campus Program
            </p>
            <h1
              className="campus-map-title reveal"
              style={{ '--delay': '0.2s' } as React.CSSProperties}
            >
              A network of student builders, worldwide.
            </h1>
            <p
              className="campus-map-lead reveal"
              style={{ '--delay': '0.3s' } as React.CSSProperties}
            >
              {claudeCampusSchools.length} universities. {countryCount} countries. One global community of students building with Claude.
            </p>
          </figcaption>

          <div
            className="campus-map"
            role="img"
            aria-label={`World map showing ${claudeCampusSchools.length} Claude Campus universities`}
          >
            <Image
              src="/assets/maps/world-equirectangular.svg"
              alt=""
              aria-hidden="true"
              width={2000}
              height={1000}
              className="campus-map__svg"
              priority={false}
              unoptimized
            />
            <ul className="campus-map__dots">
              {claudeCampusSchools.map((school, i) => {
                const pos = dotPosition(school);
                return (
                  <li
                    key={school.name}
                    className="campus-map__dot-wrap"
                    style={{
                      left: pos.left,
                      top: pos.top,
                      ['--i' as string]: i,
                    } as React.CSSProperties}
                  >
                    <button
                      type="button"
                      className="campus-map__dot"
                      aria-label={`${school.name}, ${school.country}`}
                    >
                      <span className="campus-map__tooltip">{school.name}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </figure>
      </div>
    </section>
  );
}

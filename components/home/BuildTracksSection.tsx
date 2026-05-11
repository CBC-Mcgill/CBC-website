'use client';

import { useEffect, useRef, useState } from 'react';
import type { BuildTrack, BuildTrackStatus } from '@/types';
import { GitHubIcon } from '@/components/icons';
import { clubLinks } from '@/data/links';

const STATUS_PRIORITY: Record<BuildTrackStatus, number> = {
  open: 0,
  full: 1,
  complete: 2,
};

const STATUS_LABELS: Record<BuildTrackStatus, string> = {
  open: 'Open',
  full: 'Full',
  complete: 'Complete',
};

type FilterValue = 'all' | BuildTrackStatus;

const FILTER_OPTIONS: { value: FilterValue; label: string }[] = [
  { value: 'all', label: 'All statuses' },
  { value: 'open', label: 'Open' },
  { value: 'full', label: 'Full' },
  { value: 'complete', label: 'Complete' },
];

function StatusFilter({ value, onChange }: { value: FilterValue; onChange: (v: FilterValue) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onMouseDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const current = FILTER_OPTIONS.find((o) => o.value === value)?.label ?? 'All statuses';

  return (
    <div ref={ref} className="tracks-dropdown">
      <button
        type="button"
        className="tracks-select"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Filter by status"
        onClick={() => setOpen((o) => !o)}
      >
        {current}
      </button>
      {open && (
        <ul className="tracks-dropdown-menu" role="listbox">
          {FILTER_OPTIONS.map((opt) => (
            <li
              key={opt.value}
              role="option"
              aria-selected={opt.value === value}
              className="tracks-dropdown-option"
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

interface BuildTracksSectionProps {
  tracks: BuildTrack[];
}

export function BuildTracksSection({ tracks }: BuildTracksSectionProps) {
  const [filter, setFilter] = useState<FilterValue>('all');

  const sorted = [...tracks].sort((a, b) => {
    const pa = STATUS_PRIORITY[a.status] ?? 99;
    const pb = STATUS_PRIORITY[b.status] ?? 99;
    if (pa !== pb) return pa - pb;
    return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
  });

  const filtered = filter === 'all' ? sorted : sorted.filter((t) => t.status === filter);

  return (
    <section className="section" id="build-tracks">
      <div className="container soft-panel">
        <div className="section-head">
          <div>
            <h2 className="section-title">What we are building for McGill students</h2>
            <p className="section-copy">Yes, we do what we preach!</p>
          </div>
          <div className="tracks-controls" aria-label="Build tracks controls">
            <StatusFilter value={filter} onChange={setFilter} />
            <button
              id="tracks-clear"
              className="tracks-clear"
              type="button"
              disabled={filter === 'all'}
              onClick={() => setFilter('all')}
            >
              Clear
            </button>
          </div>
        </div>

        <p className="stat-callout">
          <span className="stat-callout__number" aria-hidden="true">1</span>{' '}useful software product for all McGill students. That&rsquo;s the combined output of all the software clubs from the past few years.
          <br /> <em>But we&rsquo;re changing that.</em>
        </p>

        {filtered.length > 0 ? (
          <div className="track-canvas">
            {filtered.map((track) => (
              <article
                key={track.name}
                className="blueprint"
                data-status={track.status}
              >
                <h3 className="blueprint__name">{track.name}</h3>

                <div className="blueprint__field">
                  <span className="blueprint__label">What</span>
                  <p className="blueprint__what">{track.description}</p>
                </div>

                {track.why && (
                  <div className="blueprint__field">
                    <span className="blueprint__label">Why</span>
                    <p className="blueprint__why">{track.why}</p>
                  </div>
                )}

                <footer className="blueprint__foot">
                  <span className="blueprint__who">
                    <span className="blueprint__label blueprint__label--inline">Lead</span>
                    {track.leads}
                  </span>
                  <div className="blueprint__foot-actions">
                    <span className={`status-pill status-${track.status}`}>
                      {STATUS_LABELS[track.status]}
                    </span>
                    {track.github && (
                      <a
                        href={track.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="blueprint__repo"
                        aria-label={`${track.name} GitHub repository`}
                      >
                        <GitHubIcon />
                      </a>
                    )}
                  </div>
                </footer>
              </article>
            ))}
          </div>
        ) : (
          <div className="track-empty">
            No tracks match this filter.
          </div>
        )}

        <div className="section-footer">
          <p className="section-copy">
            Want to suggest an idea? Reach out to us at{' '}
            <a href={`mailto:${clubLinks.email}`} className="section-footer__email">
              {clubLinks.email}
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}

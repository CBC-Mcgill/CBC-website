'use client';

import { useState } from 'react';
import type { BuildTrack, BuildTrackStatus } from '@/types';

const STATUS_PRIORITY: Record<BuildTrackStatus, number> = {
  open: 0,
  full: 1,
  complete: 2,
};

const STATUS_LABELS: Record<BuildTrackStatus, string> = {
  open: 'Open (In progress)',
  full: 'Full (In progress)',
  complete: 'Complete',
};

interface BuildTracksSectionProps {
  tracks: BuildTrack[];
}

export function BuildTracksSection({ tracks }: BuildTracksSectionProps) {
  const [filter, setFilter] = useState<'all' | BuildTrackStatus>('all');

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
            <span className="tag">Build Tracks</span>
            <h2 className="section-title">What you could build this term</h2>
            <p className="section-copy">Reach out to the project leads to start contributing!</p>
          </div>
          <div className="tracks-controls" aria-label="Build tracks controls">
            <label className="sr-only" htmlFor="tracks-status">Filter by status</label>
            <select
              id="tracks-status"
              className="tracks-select"
              value={filter}
              onChange={(e) => setFilter(e.target.value as 'all' | BuildTrackStatus)}
            >
              <option value="all">All statuses</option>
              <option value="open">Open</option>
              <option value="full">Full</option>
              <option value="complete">Complete</option>
            </select>
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

        <div className="schedule-list">
          {filtered.map((track) => (
            <div key={track.name} className="schedule-item" data-status={track.status}>
              <div>
                <strong>{track.name}</strong>
                <div><span>{track.description}</span></div>
                <div><span>Lead(s): {track.leads}</span></div>
              </div>
              <span className={`status-pill status-${track.status}`}>
                {STATUS_LABELS[track.status]}
              </span>
            </div>
          ))}
        </div>

        <div className="section-footer">
          <p className="section-copy">
            Want to suggest an idea? <strong>Reach out to our directors.</strong>
          </p>
        </div>
      </div>
    </section>
  );
}

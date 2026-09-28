'use client';

import { useState } from 'react';

const CLAUDE_MASCOT = `                       ................................................
                       .+===============================================
                       .+===============================================
                       .+====+@@@@@%+======================%@@@@@+======
                       .+====*@@@@@@+======================@@@@@@#======
                       .+====*@@@@@@+======================@@@@@@*======
                       .=====+@@@@@%+======================@@@@@@*======
            ======================================================================.
            ======================================================================.
            ======================================================================.
            ======================================================================.
            ======================================================================.
            ======================================================================.
                       .================================================
                       .+===============================================
                       .+===============================================
                       .+===============================================
                       .+===============================================
                       .+===============================================
                       .+====-.....-=====-...........======:.....=======
                       .+====:     :=====.           -====+      -======
                       .+====:     :=====.           -====+      -======
                       .+====:     :=====.           -====+      -======
                       .+====:     :=====.           -====+      -======
                       .+====:     :=====.           -====+      -======
                       .+====:     :=====.           -====+      -======`;

interface TrackCardProps {
  num: string;
  name: string;
  problem: string;
  examples: string[];
  modifier: string;
  delay: string;
  icon: React.ReactNode;
}

export default function TrackCard({ num, name, problem, examples, modifier, delay, icon }: TrackCardProps) {
  const [flipped, setFlipped] = useState(false);

  function toggle() { setFlipped(f => !f); }

  return (
    <div
      className="hack-track-flip-wrapper reveal"
      style={{ '--delay': delay } as React.CSSProperties}
      onClick={toggle}
      role="button"
      tabIndex={0}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } }}
      aria-pressed={flipped}
      aria-label={`${name} — ${flipped ? 'showing details, click to close' : 'click to see details'}`}
    >
      <div className={`hack-track-flip-inner ${modifier}${flipped ? ' is-flipped' : ''}`}>

        {/* Front: name + mascot */}
        <div className="hack-track-flip-front hack-track-card">
          <div className="hack-track-card-header">
            <span className="hack-track-num">{num}</span>
            {icon}
          </div>
          <h3 className="hack-track-name">{name}</h3>
          <pre className="hack-track-mascot-art" aria-hidden="true">{CLAUDE_MASCOT}</pre>
          <span className="hack-track-flip-hint">tap to explore →</span>
        </div>

        {/* Back: details */}
        <div className="hack-track-flip-back hack-track-card">
          <div className="hack-track-card-header">
            <span className="hack-track-num">{num}</span>
            {icon}
          </div>
          <h3 className="hack-track-name">{name}</h3>
          <p className="hack-track-problem">{problem}</p>
          <ul className="hack-track-examples">
            {examples.map((ex, i) => <li key={i}>{ex}</li>)}
          </ul>
          <span className="hack-track-flip-hint">← tap to close</span>
        </div>

      </div>
    </div>
  );
}

'use client';

import { useMemo, useRef, useState, useSyncExternalStore } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from 'react-simple-maps';
import { claudeCampusSchools } from '@/data/claudeCampusSchools';

const GEO_URL = '/assets/maps/countries-110m.json';

const MIN_ZOOM = 1.4;
const MAX_ZOOM = 256;
const BUTTON_STEP = 1.5;
const DOT_RADIUS = 4;
const DOT_HOVER_RADIUS = 5.5;
const MCGILL_NAME = 'McGill University';
const MCGILL_RADIUS = 7;
const STAGGER_TOTAL_MS = 1200;

type Position = { coordinates: [number, number]; zoom: number };
type Tooltip = { name: string; country: string; x: number; y: number } | null;

const INITIAL_POSITION: Position = { coordinates: [-73.6, 45.5], zoom: 5.5};

export function CampusMapSection() {
  const countryCount = new Set(claudeCampusSchools.map((s) => s.country)).size;

  const wrapRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<Position>(INITIAL_POSITION);
  const [tooltip, setTooltip] = useState<Tooltip>(null);
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const staggerDelays = useMemo(() => {
    const n = claudeCampusSchools.length;
    const order = claudeCampusSchools
      .map((s, i) => {
        let h = 5381;
        for (let k = 0; k < s.name.length; k++) h = ((h << 5) + h + s.name.charCodeAt(k)) | 0;
        return { i, h };
      })
      .sort((a, b) => a.h - b.h)
      .map((x) => x.i);
    const step = STAGGER_TOTAL_MS / n;
    const delays = new Array<number>(n);
    order.forEach((schoolIdx, slot) => {
      delays[schoolIdx] = Math.round(slot * step);
    });
    return delays;
  }, []);

  const handleZoom = (factor: number) => {
    setPosition((p) => ({
      ...p,
      zoom: Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, p.zoom * factor)),
    }));
  };

  const handleReset = () => setPosition(INITIAL_POSITION);

  const handleMarkerEnter = (
    e: React.SyntheticEvent<SVGElement>,
    name: string,
    country: string,
  ) => {
    const wrapRect = wrapRef.current?.getBoundingClientRect();
    const markerRect = (e.currentTarget as SVGGraphicsElement).getBoundingClientRect();
    if (!wrapRect) return;
    setTooltip({
      name,
      country,
      x: markerRect.left + markerRect.width / 2 - wrapRect.left,
      y: markerRect.top - wrapRect.top,
    });
    setHoveredKey(name);
  };

  const handleMarkerLeave = () => {
    setTooltip(null);
    setHoveredKey(null);
  };

  return (
    <section className="section">
      <div className="container">
        <figure className="campus-map-panel soft-panel">
          <figcaption className="campus-map-caption">
            {/* <p
              className="eyebrow reveal"
              style={{ '--delay': '0.1s' } as React.CSSProperties}
            >
              Claude Campus Program
            </p> */}
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

          <div ref={wrapRef} className="campus-map">
            {mounted && (
            <ComposableMap
              projection="geoEqualEarth"
              projectionConfig={{ scale: 160 }}
              className="campus-map__svg-root"
            >
              <ZoomableGroup
                zoom={position.zoom}
                center={position.coordinates}
                onMoveEnd={(p) => setPosition(p)}
                minZoom={MIN_ZOOM}
                maxZoom={MAX_ZOOM}
              >
                <Geographies geography={GEO_URL}>
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        style={{
                          default: {
                            fill: 'rgba(255, 220, 180, 0.05)',
                            stroke: 'rgba(255, 235, 210, 0.55)',
                            strokeWidth: 0.5,
                            outline: 'none',
                          },
                          hover: {
                            fill: 'rgba(255, 220, 180, 0.07)',
                            stroke: 'rgba(255, 235, 210, 0.65)',
                            strokeWidth: 0.5,
                            outline: 'none',
                          },
                          pressed: {
                            fill: 'rgba(255, 220, 180, 0.07)',
                            stroke: 'rgba(255, 235, 210, 0.65)',
                            strokeWidth: 0.5,
                            outline: 'none',
                          },
                        }}
                      />
                    ))
                  }
                </Geographies>
                {claudeCampusSchools.map((school, i) => {
                  const isHovered = hoveredKey === school.name;
                  const isMcGill = school.name === MCGILL_NAME;
                  const baseRadius = isMcGill ? MCGILL_RADIUS : DOT_RADIUS;
                  const r = (isHovered ? DOT_HOVER_RADIUS : baseRadius) / position.zoom;
                  const ringR = (baseRadius + 4) / position.zoom;
                  return (
                    <Marker
                      key={school.name}
                      className="campus-map__marker"
                      coordinates={[school.lng, school.lat]}
                      onMouseEnter={(e) => handleMarkerEnter(e, school.name, school.country)}
                      onMouseLeave={handleMarkerLeave}
                      onFocus={(e) => handleMarkerEnter(e, school.name, school.country)}
                      onBlur={handleMarkerLeave}
                      style={{
                        default: { cursor: 'pointer', animationDelay: `${staggerDelays[i]}ms` },
                        hover: { cursor: 'pointer' },
                        pressed: { cursor: 'pointer' },
                      }}
                      tabIndex={0}
                      aria-label={`${school.name}, ${school.country}`}
                    >
                      {isMcGill && (
                        <circle
                          className="campus-map__pulse-ring"
                          r={ringR}
                          fill="none"
                          stroke="var(--color-accent)"
                          strokeWidth={1.5 / position.zoom}
                          style={{ ['--pulse-base-r' as string]: `${ringR}` }}
                        />
                      )}
                      {isHovered && !isMcGill && (
                        <circle
                          r={ringR}
                          fill="none"
                          stroke="var(--color-accent)"
                          strokeWidth={1.5 / position.zoom}
                          opacity={0.45}
                        />
                      )}
                      <circle r={r} fill="var(--color-accent)" />
                      {isMcGill && (
                        <text
                          textAnchor="middle"
                          y={-(baseRadius + 6) / position.zoom}
                          style={{
                            fontSize: `${10 / position.zoom}px`,
                            fontFamily: 'var(--font-body)',
                            fontWeight: 600,
                            letterSpacing: '0.04em',
                            fill: 'rgba(255, 235, 210, 0.95)',
                            pointerEvents: 'none',
                          }}
                        >
                          CBC · McGill
                        </text>
                      )}
                    </Marker>
                  );
                })}
              </ZoomableGroup>
            </ComposableMap>
            )}

            {tooltip && (
              <div
                className="campus-map__tooltip campus-map__tooltip--floating"
                style={{ left: `${tooltip.x}px`, top: `${tooltip.y}px` }}
                role="tooltip"
              >
                {tooltip.name}
              </div>
            )}

            <div className="campus-map__controls" aria-label="Map zoom controls">
              <button
                type="button"
                className="campus-map__control"
                onClick={() => handleZoom(BUTTON_STEP)}
                aria-label="Zoom in"
                disabled={position.zoom >= MAX_ZOOM}
              >
                +
              </button>
              <button
                type="button"
                className="campus-map__control"
                onClick={() => handleZoom(1 / BUTTON_STEP)}
                aria-label="Zoom out"
                disabled={position.zoom <= MIN_ZOOM}
              >
                −
              </button>
              <button
                type="button"
                className="campus-map__control"
                onClick={handleReset}
                aria-label="Reset zoom and pan"
                disabled={
                  position.zoom === INITIAL_POSITION.zoom &&
                  position.coordinates[0] === INITIAL_POSITION.coordinates[0] &&
                  position.coordinates[1] === INITIAL_POSITION.coordinates[1]
                }
              >
                ⟲
              </button>
            </div>
          </div>
        </figure>
      </div>
    </section>
  );
}

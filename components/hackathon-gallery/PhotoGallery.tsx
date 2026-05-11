'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export type GalleryPhoto = { src: string; width: number; height: number };

export function PhotoGallery({ photos }: { photos: GalleryPhoto[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [idx, setIdx] = useState<number | null>(null);

  const close = useCallback(() => setIdx(null), []);
  const prev = useCallback(
    () => setIdx((i) => (i === null ? null : (i - 1 + photos.length) % photos.length)),
    [photos.length],
  );
  const next = useCallback(
    () => setIdx((i) => (i === null ? null : (i + 1) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    if (idx !== null && !dlg.open) dlg.showModal();
    else if (idx === null && dlg.open) dlg.close();
  }, [idx]);

  useEffect(() => {
    if (idx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [idx, prev, next]);

  if (photos.length === 0) {
    return (
      <section className="section">
        <div className="container">
          <p>No photos yet.</p>
        </div>
      </section>
    );
  }

  const [hero, ...rest] = photos;
  const current = idx !== null ? photos[idx] : null;

  return (
    <>
      <section className="section gallery-header">
        <div className="container">
          <p
            className="eyebrow reveal"
            style={{ '--delay': '0.1s' } as React.CSSProperties}
          >
            Photo gallery
          </p>
          <h1
            className="gallery-title reveal"
            style={{ '--delay': '0.2s' } as React.CSSProperties}
          >
            Hackathon &rsquo;26
          </h1>
          <p
            className="gallery-dek reveal"
            style={{ '--delay': '0.3s' } as React.CSSProperties}
          >
            McGill &middot; April 4, 2026 &middot; {photos.length} frames
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <button
            type="button"
            className="gallery-hero reveal"
            onClick={() => setIdx(0)}
            aria-label={`Open photo 1 of ${photos.length}`}
            style={{ '--delay': '0.4s' } as React.CSSProperties}
          >
            <Image
              src={hero.src}
              width={hero.width}
              height={hero.height}
              alt=""
              sizes="(max-width: 1200px) 100vw, 1200px"
              priority
            />
          </button>

          <div className="gallery-grid">
            {rest.map((photo, i) => (
              <button
                type="button"
                key={photo.src}
                className="gallery-tile"
                onClick={() => setIdx(i + 1)}
                aria-label={`Open photo ${i + 2} of ${photos.length}`}
              >
                <Image
                  src={photo.src}
                  width={photo.width}
                  height={photo.height}
                  alt=""
                  sizes="(max-width: 600px) 100vw, (max-width: 1100px) 50vw, 33vw"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      <dialog
        ref={dialogRef}
        className="gallery-lightbox"
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        onClose={close}
        aria-label="Photo viewer"
      >
        <button
          type="button"
          className="gallery-lightbox__close"
          onClick={close}
          aria-label="Close photo viewer"
        >
          &times;
        </button>
        <button
          type="button"
          className="gallery-lightbox__nav gallery-lightbox__nav--prev"
          onClick={prev}
          aria-label="Previous photo"
        >
          &lsaquo;
        </button>
        <button
          type="button"
          className="gallery-lightbox__nav gallery-lightbox__nav--next"
          onClick={next}
          aria-label="Next photo"
        >
          &rsaquo;
        </button>
        {current && (
          <Image
            key={current.src}
            src={current.src}
            width={current.width}
            height={current.height}
            alt=""
            sizes="95vw"
            priority
            className="gallery-lightbox__img"
          />
        )}
        <p className="gallery-lightbox__caption">
          {(idx ?? 0) + 1} <span aria-hidden="true">/</span> {photos.length}
        </p>
      </dialog>
    </>
  );
}

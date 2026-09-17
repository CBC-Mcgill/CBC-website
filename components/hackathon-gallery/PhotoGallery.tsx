"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import s from "./gallery.module.css";
export type GalleryPhoto = {
  src: string;
  width: number;
  height: number;
  alt: string;
};
export function PhotoGallery({ photos }: { photos: GalleryPhoto[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const origin = useRef<HTMLAnchorElement | null>(null);
  useEffect(() => {
    if (index !== null && !dialog.current?.open) dialog.current?.showModal();
  }, [index]);
  const close = () => {
    dialog.current?.close();
    setIndex(null);
    origin.current?.focus();
  };
  const move = (delta: number) =>
    setIndex((i) =>
      i === null ? null : (i + delta + photos.length) % photos.length,
    );
  const current = index === null ? null : photos[index];
  if (!photos.length) return <p>Photos will be added here.</p>;
  return (
    <section className="section" aria-label="Event photographs">
      <div className={s.grid}>
        {photos.map((photo, i) => (
          <a
            className={s.tile}
            key={photo.src}
            href={photo.src}
            aria-label={`Open photo ${i + 1}: ${photo.alt}`}
            onClick={(e) => {
              e.preventDefault();
              origin.current = e.currentTarget;
              setIndex(i);
            }}
          >
            <Image
              src={photo.src}
              width={photo.width}
              height={photo.height}
              alt={photo.alt}
              sizes="(max-width:600px) 100vw, 50vw"
              priority={i < 2}
            />
            <span className={s.caption}>
              <span>{photo.alt}</span>
              <span aria-hidden="true">↗</span>
            </span>
          </a>
        ))}
      </div>
      <dialog
        ref={dialog}
        className={s.dialog}
        aria-label="Event photo viewer"
        onCancel={(e) => {
          e.preventDefault();
          close();
        }}
        onClose={() => {
          setIndex(null);
          origin.current?.focus();
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        onKeyDown={(e) => {
          if (e.key === "Tab") {
            const buttons =
              e.currentTarget.querySelectorAll<HTMLButtonElement>("button");
            const first = buttons[0];
            const last = buttons[buttons.length - 1];
            if (e.shiftKey && document.activeElement === first) {
              e.preventDefault();
              last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
              e.preventDefault();
              first.focus();
            }
          }
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            move(-1);
          }
          if (e.key === "ArrowRight") {
            e.preventDefault();
            move(1);
          }
        }}
      >
        <div className={s.controls}>
          <button
            type="button"
            onClick={() => move(-1)}
            aria-label="Previous photo"
          >
            ← Previous
          </button>
          <button
            type="button"
            onClick={close}
            autoFocus
            aria-label="Close photo viewer"
          >
            Close ×
          </button>
          <button type="button" onClick={() => move(1)} aria-label="Next photo">
            Next →
          </button>
        </div>
        {current && (
          <Image
            className={s.fullImage}
            src={current.src}
            width={current.width}
            height={current.height}
            alt={current.alt}
            sizes="95vw"
          />
        )}
        <p className={s.dialogCaption} aria-live="polite">
          {(index ?? 0) + 1} / {photos.length} · {current?.alt}
        </p>
      </dialog>
    </section>
  );
}

"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import s from "./gallery.module.css";

export type GalleryPhoto = {
  src: string;
  width: number;
  height: number;
  alt: string;
  /** Spans two columns of the mosaic. Portrait photos span two rows automatically. */
  wide?: boolean;
};

function tileLayout(photo: GalleryPhoto) {
  if (photo.wide) return { className: s.wide, sizes: "(max-width: 719px) 100vw, 800px" };
  if (photo.height > photo.width) return { className: s.tall, sizes: "(max-width: 719px) 50vw, 400px" };
  return { className: "", sizes: "(max-width: 719px) 50vw, 400px" };
}

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
  return (
    <section className={s.wall} aria-label="Event photographs">
      <div className={s.grid} data-reveal-group>
        {photos.map((photo, i) => {
          const layout = tileLayout(photo);
          return (
            <a
              className={`${s.tile} ${layout.className}`}
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
                sizes={layout.sizes}
                preload={i === 0}
              />
            </a>
          );
        })}
      </div>
      <dialog
        ref={dialog}
        className={`band-black ${s.dialog}`}
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
        <button
          type="button"
          className={`btn btn-sm ${s.close}`}
          onClick={close}
          autoFocus
          aria-label="Close photo viewer"
        >
          Close
        </button>
        <div
          className={s.stage}
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          {current && (
            <Image
              className={s.fullImage}
              src={current.src}
              width={current.width}
              height={current.height}
              alt={current.alt}
              sizes="90vw"
            />
          )}
        </div>
        <div className={s.controls}>
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={() => move(-1)}
            aria-label="Previous photo"
          >
            Previous
          </button>
          <p className={`small ${s.caption}`} aria-live="polite">
            {current?.alt}{" "}
            <span>
              {(index ?? 0) + 1} of {photos.length}
            </span>
          </p>
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={() => move(1)}
            aria-label="Next photo"
          >
            Next
          </button>
        </div>
      </dialog>
    </section>
  );
}

import Image from "next/image";

export interface StripPhoto {
  src: string;
  alt: string;
  width: number;
  height: number;
}

/**
 * A slowly scrolling strip of photos, like a contact sheet moving past.
 * Items are rendered twice so the loop is seamless; pauses on hover.
 */
export function FilmStrip({ photos, height = 260 }: { photos: StripPhoto[]; height?: number }) {
  const row = (ariaHidden: boolean) => (
    <div className="filmstrip-row" aria-hidden={ariaHidden || undefined}>
      {photos.map((p) => (
        <div
          key={p.src}
          className="filmstrip-item frame"
          style={{ height, width: Math.round((height * p.width) / p.height) }}
        >
          <Image
            src={p.src}
            alt={ariaHidden ? "" : p.alt}
            width={p.width}
            height={p.height}
            sizes={`${Math.round((height * p.width) / p.height)}px`}
          />
        </div>
      ))}
    </div>
  );

  return (
    <div className="filmstrip" style={{ height }}>
      <div className="filmstrip-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

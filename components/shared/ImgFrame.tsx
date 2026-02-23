'use client';

import { useState } from 'react';
import Image from 'next/image';
import { generateFallbackSvg } from '@/lib/generateFallbackSvg';

interface ImgFrameProps {
  src: string;
  alt: string;
  label?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

const normalizeSrc = (src: string) => {
  if (!src) return src;
  if (src.startsWith('data:') || src.startsWith('/') || src.startsWith('http')) return src;
  return `/${src}`;
};

export function ImgFrame({ src, alt, label, className, priority, sizes }: ImgFrameProps) {
  const [imgSrc, setImgSrc] = useState(normalizeSrc(src));
  const [hasFailed, setHasFailed] = useState(false);

  const handleError = () => {
    if (!hasFailed) {
      setHasFailed(true);
      setImgSrc(generateFallbackSvg(label || alt));
    }
  };

  return (
    <div className={`img-frame${className ? ` ${className}` : ''}`} data-label={label || alt}>
      {hasFailed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imgSrc} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        <Image
          src={imgSrc}
          alt={alt}
          fill
          sizes={sizes ?? '(max-width: 980px) 100vw, 50vw'}
          style={{ objectFit: 'cover' }}
          onError={handleError}
          priority={priority}
        />
      )}
    </div>
  );
}

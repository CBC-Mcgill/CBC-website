import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import { PhotoGallery } from '@/components/hackathon-gallery/PhotoGallery';

export const metadata: Metadata = {
  title: 'Claude Builder Club · Hackathon 2026 Photos',
  description:
    'Photo gallery from the Claude Builders Hackathon at McGill — April 4, 2026.',
};

const PHOTO_DIR = 'assets/hackathon_26_photos';

function readJpgDimensions(filePath: string): { width: number; height: number } | null {
  const fd = fs.openSync(filePath, 'r');
  try {
    const buf = Buffer.alloc(65536);
    const bytesRead = fs.readSync(fd, buf, 0, 65536, 0);
    let i = 2;
    while (i < bytesRead - 8) {
      if (buf[i] !== 0xff) {
        i++;
        continue;
      }
      const marker = buf[i + 1];
      // SOF (Start of Frame) markers carry image dimensions, skipping DHT/JPG/DAC variants.
      if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
        const height = (buf[i + 5] << 8) | buf[i + 6];
        const width = (buf[i + 7] << 8) | buf[i + 8];
        return { width, height };
      }
      const segmentLen = (buf[i + 2] << 8) | buf[i + 3];
      if (segmentLen < 2) break;
      i += 2 + segmentLen;
    }
    return null;
  } finally {
    fs.closeSync(fd);
  }
}

function getPhotos() {
  const dir = path.join(process.cwd(), 'public', PHOTO_DIR);
  return fs
    .readdirSync(dir)
    .filter((f) => /\.jpe?g$/i.test(f))
    .sort()
    .map((file) => {
      const size = readJpgDimensions(path.join(dir, file));
      return {
        src: `/${PHOTO_DIR}/${file}`,
        width: size?.width ?? 1500,
        height: size?.height ?? 1000,
      };
    });
}

export default function HackathonGalleryPage() {
  const photos = getPhotos();
  return <PhotoGallery photos={photos} />;
}

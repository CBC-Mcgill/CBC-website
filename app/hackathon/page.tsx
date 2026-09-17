import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { PhotoGallery } from "@/components/hackathon-gallery/PhotoGallery";

export const metadata: Metadata = {
  title: "Claude Builder Club · Hackathon 2026 Photos",
  description:
    "Photo gallery from the Claude Builders Hackathon at McGill — April 4, 2026.",
};

import Link from "next/link";
import s from "../editorial.module.css";

const descriptions: Record<string, string> = {
  "2U3A5631.jpg": "Speaker greeting participants from the lecture hall podium",
  "2U3A5640.jpg": "Speaker addressing the room from a wooden podium",
  "2U3A5820.jpg": "Participants collaborating on laptops in the lecture hall",
  "2U3A5833.jpg": "Students discussing their work around laptops",
  "2U3A6008.jpg": "Audience applauding during the hackathon presentations",
  "2U3A6039.jpg": "Hackathon participants gathered in a McGill lecture hall",
  "ralph_table.jpg": "Students talking with organizers at the CBC event table",
  "thai_present.jpg":
    "Presenters at the front of the lecture hall with AI slides projected behind them",
};
const PHOTO_DIR = "assets/hackathon_26_photos";

function readJpgDimensions(
  filePath: string,
): { width: number; height: number } | null {
  const fd = fs.openSync(filePath, "r");
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
      if (
        marker >= 0xc0 &&
        marker <= 0xcf &&
        marker !== 0xc4 &&
        marker !== 0xc8 &&
        marker !== 0xcc
      ) {
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
  const dir = path.join(process.cwd(), "public", PHOTO_DIR);
  return fs
    .readdirSync(dir)
    .filter((f) => /\.jpe?g$/i.test(f))
    .sort()
    .map((file) => {
      const size = readJpgDimensions(path.join(dir, file));
      return {
        src: `/${PHOTO_DIR}/${file}`,
        alt: descriptions[file] ?? "Claude Builders Hackathon at McGill",
        width: size?.width ?? 1500,
        height: size?.height ?? 1000,
      };
    });
}

export default function HackathonGalleryPage() {
  const photos = getPhotos();
  return (
    <div className="container">
      <header className={s.pageHero}>
        <p className="eyebrow">Community / 2026 recap</p>
        <h1>Ideas, meet possibility.</h1>
        <p className="lead">
          Claude Builders Hackathon · McGill · April 4, 2026
        </p>
        <p className="lead">
          A look back at students collaborating, building, and presenting AI
          projects at McGill.
        </p>
        <div className="actions">
          <Link href="/hackathon26">Read the archived event details ↗</Link>
        </div>
      </header>
      <PhotoGallery photos={photos} />
    </div>
  );
}

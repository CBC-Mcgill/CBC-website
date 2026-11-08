"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { PointerEvent } from "react";
import s from "./Bench.module.css";

type Key = "screen" | "left" | "right";
type Offset = { x: number; y: number };

const prints: {
  key: Key;
  src: string;
  rot: number;
  tape: string;
  sizes: string;
  preload?: boolean;
}[] = [
  {
    key: "screen",
    src: "/assets/projects/plan-your-degree-planner.webp",
    rot: -2,
    tape: "tape tape-right",
    sizes: "(min-width: 1240px) 620px, (min-width: 900px) 52vw, 92vw",
    preload: true,
  },
  {
    key: "left",
    src: "/assets/hackathon_26_photos/thai_present.jpg",
    rot: -1,
    tape: "tape",
    sizes: "(min-width: 1240px) 250px, (min-width: 900px) 22vw, 38vw",
  },
  {
    key: "right",
    src: "/assets/hackathon_26_photos/2U3A5820.jpg",
    rot: 2.5,
    tape: "tape tape-left",
    sizes: "(min-width: 1240px) 310px, (min-width: 900px) 27vw, 46vw",
  },
];

const finePointer = "(hover: hover) and (pointer: fine)";
const origin: Record<Key, Offset> = {
  screen: { x: 0, y: 0 },
  left: { x: 0, y: 0 },
  right: { x: 0, y: 0 },
};

export function Bench() {
  const [offsets, setOffsets] = useState(origin);
  const [order, setOrder] = useState<Key[]>(["screen", "left", "right"]);
  const [dragging, setDragging] = useState<Key | null>(null);
  const drag = useRef<{
    key: Key;
    startX: number;
    startY: number;
    from: Offset;
    min: Offset;
    max: Offset;
  } | null>(null);

  function onPointerDown(e: PointerEvent<HTMLDivElement>, key: Key) {
    if (e.button !== 0 || !window.matchMedia(finePointer).matches) return;
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);

    // Keep the print inside the hero: its slot is untransformed, so its rect plus the offset is where it lands.
    const slot = e.currentTarget.parentElement!.getBoundingClientRect();
    const hero = e.currentTarget.closest("section")!.getBoundingClientRect();
    const from = offsets[key];
    drag.current = {
      key,
      startX: e.clientX,
      startY: e.clientY,
      from,
      min: { x: 8 - slot.left, y: hero.top + 24 - slot.top },
      max: {
        x: document.documentElement.clientWidth - 8 - slot.right,
        y: hero.bottom - 24 - slot.bottom,
      },
    };
    setDragging(key);
    setOrder((prev) => [...prev.filter((k) => k !== key), key]);
  }

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    const d = drag.current;
    if (!d) return;
    const x = Math.min(d.max.x, Math.max(d.min.x, d.from.x + e.clientX - d.startX));
    const y = Math.min(d.max.y, Math.max(d.min.y, d.from.y + e.clientY - d.startY));
    setOffsets((prev) => ({ ...prev, [d.key]: { x, y } }));
  }

  function onPointerUp() {
    drag.current = null;
    setDragging(null);
  }

  return (
    <div className={s.root} aria-hidden="true">
      <div className={s.bench}>
        {prints.map((p) => (
          <div
            key={p.key}
            className={`${s.slot} ${s[p.key]}`}
            style={{ zIndex: order.indexOf(p.key) + 1 }}
          >
            <div
              className={`${s.print} ${dragging === p.key ? s.dragging : ""}`}
              style={{
                transform: `translate(${offsets[p.key].x}px, ${offsets[p.key].y}px) rotate(${p.rot}deg)`,
              }}
              onPointerDown={(e) => onPointerDown(e, p.key)}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
            >
              <span className={p.tape} />
              {p.key === "screen" && (
                <span className="chip chip-live sticker">Live</span>
              )}
              <div className={s.photo}>
                <Image
                  src={p.src}
                  alt=""
                  fill
                  draggable={false}
                  preload={p.preload}
                  sizes={p.sizes}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className={`small muted ${s.caption}`}>Drag them around.</p>
    </div>
  );
}

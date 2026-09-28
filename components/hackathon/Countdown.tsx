'use client';
import { useEffect, useState } from 'react';

const TARGET = new Date('2026-04-04T10:00:00');

function getTimeLeft() {
  const diff = TARGET.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

export default function Countdown() {
  const [time, setTime] = useState(getTimeLeft);
  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);
  const pad = (n: number) => String(n).padStart(2, '0');
  return (
    <div>
      <p className="hack-countdown-title">Mission start in</p>
      <div className="hack-countdown">
        {([['DAYS', time.days], ['HOURS', time.hours], ['MIN', time.minutes], ['SEC', time.seconds]] as [string, number][]).map(
          ([label, val]) => (
            <div key={label} className="hack-countdown-unit">
              <div className="hack-countdown-num">{pad(val)}</div>
              <div className="hack-countdown-label">{label}</div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

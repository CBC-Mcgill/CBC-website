import Image from "next/image";
import s from "./orbital.module.css";

export function Orbital() {
  return (
    <div className={s.scene} data-tilt>
      <div className={s.coordinates} aria-hidden="true">
        <span>45°30′ N / 73°34′ W</span>
        <span>THE BUILDER’S ORBIT</span>
      </div>
      <div className={s.orbit} aria-hidden="true">
        <div className={s.outerRing} />
        <div className={s.innerRing} />
        <svg className={s.flower} viewBox="0 0 500 500" fill="none">
          <defs>
            <linearGradient
              id="petal-copper"
              x1="70"
              y1="70"
              x2="420"
              y2="440"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#ffe2a5" />
              <stop offset=".5" stopColor="#ff9769" />
              <stop offset="1" stopColor="#8d412f" />
            </linearGradient>
          </defs>
          {Array.from({ length: 18 }, (_, i) => (
            <ellipse
              key={i}
              cx="250"
              cy="250"
              rx="68"
              ry="205"
              transform={`rotate(${i * 10} 250 250)`}
              stroke="url(#petal-copper)"
              strokeWidth="1.15"
            />
          ))}
          <circle
            cx="250"
            cy="250"
            r="28"
            fill="#ffb885"
            fillOpacity=".12"
            stroke="#ffbf86"
          />
          <path
            d="M250 231v38m-19-19h38m-32-13 26 26m0-26-26 26"
            stroke="#ffdbb3"
            strokeWidth="2"
          />
        </svg>
        <div className={s.satellite}>
          <span />
        </div>
      </div>
      <figure className={`${s.snapshot} ${s.first}`}>
        <Image
          src="/assets/hackathon_26_photos/2U3A5833.jpg"
          alt="Students collaborating around laptops at the CBC hackathon"
          width={480}
          height={320}
          sizes="(max-width:600px) 45vw, 240px"
          priority
        />
        <figcaption>01 / Build something real.</figcaption>
      </figure>
      <figure className={`${s.snapshot} ${s.second}`}>
        <Image
          src="/assets/hackathon_26_photos/2U3A6039.jpg"
          alt="The CBC hackathon community gathered at McGill"
          width={400}
          height={270}
          sizes="(max-width:600px) 40vw, 200px"
          priority
        />
        <figcaption>02 / Find your people.</figcaption>
      </figure>
      <div className={s.note}>
        <span aria-hidden="true">✳</span> A little curiosity.
        <br />A lot of possibility.
      </div>
      <span className={s.axis} aria-hidden="true">
        IDEAS → EXPERIMENTS → REAL THINGS
      </span>
    </div>
  );
}

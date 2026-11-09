/**
 * One word in a headline that rolls through four alternatives on a CSS loop (timings in globals.css).
 * The first word is the resting one and the one screen readers get.
 * Place it at the end of a line so its changing width never reflows the text.
 */
export function RollingWord({
  words,
}: {
  words: readonly [string, string, string, string];
}) {
  return (
    <span className="roll">
      <span className="roll-sr">{words[0]}</span>
      <span className="roll-track" aria-hidden="true">
        {words.map((w, i) => (
          <span
            key={w}
            className="roll-word"
            data-k={i}
            style={{ "--k": i } as React.CSSProperties}
          >
            {w}
          </span>
        ))}
      </span>
    </span>
  );
}

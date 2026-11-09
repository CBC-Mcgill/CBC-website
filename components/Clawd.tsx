/**
 * Clawd, the little Claude mascot, drawn as flat geometry so it scales anywhere.
 * Orange by default (`--claude`); the eyes blink on a CSS loop in globals.css.
 * Decorative unless a label is passed.
 */
export function Clawd({
  size = 32,
  className = "",
  label,
}: {
  size?: number | string;
  className?: string;
  label?: string;
}) {
  return (
    <svg
      className={`clawd ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role={label ? "img" : undefined}
      aria-hidden={label ? undefined : true}
    >
      {label && <title>{label}</title>}
      <rect x="10" y="14" width="44" height="34" rx="9" fill="currentColor" />
      <rect x="2" y="27" width="8" height="10" rx="3" fill="currentColor" />
      <rect x="54" y="27" width="8" height="10" rx="3" fill="currentColor" />
      <rect x="14" y="46" width="7" height="10" rx="2.5" fill="currentColor" />
      <rect x="25" y="46" width="7" height="10" rx="2.5" fill="currentColor" />
      <rect x="32" y="46" width="7" height="10" rx="2.5" fill="currentColor" />
      <rect x="43" y="46" width="7" height="10" rx="2.5" fill="currentColor" />
      <g className="clawd-eyes" fill="var(--black)">
        <rect x="23" y="25" width="6" height="11" rx="2" />
        <rect x="35" y="25" width="6" height="11" rx="2" />
      </g>
    </svg>
  );
}

import './HeroArt.css';

/* Instant prints pegged to a line, used as the Gallery hero.
   Pure inline SVG, animated with CSS. */
const SHOTS = [
  { x: 62, y: 118, rot: -7, tint: '#FFD873', deep: '#E89A22' },
  { x: 176, y: 146, rot: 4, tint: '#9BD4F2', deep: '#3E8FBE' },
  { x: 290, y: 152, rot: -3, tint: '#F5A9A2', deep: '#C9635C' },
  { x: 404, y: 124, rot: 6, tint: '#A8DCB4', deep: '#5AA772' },
];

export default function PhotoString() {
  return (
    <svg
      className="hero-art-svg photos-art"
      viewBox="0 0 520 440"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Illustration of school photographs pegged to a line"
    >
      <defs>
        <radialGradient id="ps-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFB606" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#FFB606" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="260" cy="220" r="200" fill="url(#ps-glow)" />

      {/* The line, with a gentle sag */}
      <path
        d="M8 96 Q260 168 512 96"
        fill="none"
        stroke="#FFE9C2"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.7"
      />

      {/* Prints. The outer group holds the position (an SVG transform
          attribute); the inner one is animated, since a CSS transform
          would otherwise replace the attribute outright. */}
      {SHOTS.map((s, i) => (
        <g key={s.x} transform={`translate(${s.x} ${s.y}) rotate(${s.rot} 46 0)`}>
          <g className={`ps-shot ps-shot-${i + 1}`}>
            {/* Peg */}
            <rect x="38" y="-12" width="16" height="22" rx="4" fill="#E0A22A" stroke="#B9760E" strokeWidth="2" />
            <rect x="41" y="-7" width="10" height="2.5" rx="1.25" fill="#B9760E" opacity="0.8" />

            {/* Print */}
            <rect x="0" y="4" width="92" height="108" rx="5" fill="#FFFDF6" stroke="#C9A97A" strokeWidth="2" />
            <rect x="8" y="12" width="76" height="72" rx="3" fill={s.tint} />
            {/* A simple scene inside each frame */}
            <circle cx="30" cy="36" r="9" fill={s.deep} opacity="0.55" />
            <path d="M8 84 L34 54 L54 74 L68 62 L84 84 Z" fill={s.deep} opacity="0.6" />
            {/* Caption line */}
            <rect x="14" y="92" width="46" height="4" rx="2" fill="#D8CBB2" />
          </g>
        </g>
      ))}

      {/* Camera below the line */}
      <g transform="translate(196 312)">
        <rect x="0" y="14" width="128" height="82" rx="14" fill="#1d5c46" stroke="#0f3527" strokeWidth="3" />
        <path d="M38 14 L48 0 L80 0 L90 14 Z" fill="#1d5c46" stroke="#0f3527" strokeWidth="3" strokeLinejoin="round" />
        <circle cx="64" cy="56" r="27" fill="#0f3527" stroke="#FFD873" strokeWidth="3" />
        <circle cx="64" cy="56" r="14" fill="#2b7a5e" />
        <circle cx="57" cy="49" r="5" fill="#FFF6E2" opacity="0.8" />
        {/* Flash */}
        <circle className="ps-flash" cx="108" cy="32" r="7" fill="#FFD873" />
      </g>
    </svg>
  );
}

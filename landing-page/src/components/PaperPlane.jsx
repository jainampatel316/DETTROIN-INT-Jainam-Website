import './HeroArt.css';

/* Paper plane carrying an enquiry on its way to the school, used as the
   Admission Enquiry hero. Pure inline SVG, animated with CSS. */
export default function PaperPlane() {
  return (
    <svg
      className="hero-art-svg plane-art"
      viewBox="0 0 520 440"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Illustration of a paper plane carrying an enquiry"
    >
      <defs>
        <linearGradient id="pp-light" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF6E2" />
          <stop offset="100%" stopColor="#FFE0A4" />
        </linearGradient>
        <linearGradient id="pp-mid" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD873" />
          <stop offset="100%" stopColor="#F0A62A" />
        </linearGradient>
        <linearGradient id="pp-dark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E89A22" />
          <stop offset="100%" stopColor="#C97A12" />
        </linearGradient>
        <radialGradient id="pp-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFB606" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#FFB606" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="270" cy="210" r="200" fill="url(#pp-glow)" />

      {/* Clouds */}
      <g fill="#ffffff" className="as-cloud as-cloud-1" opacity="0.13">
        <ellipse cx="86" cy="96" rx="32" ry="18" />
        <ellipse cx="112" cy="87" rx="24" ry="20" />
      </g>
      <g fill="#ffffff" className="as-cloud as-cloud-2" opacity="0.1">
        <ellipse cx="424" cy="352" rx="36" ry="19" />
        <ellipse cx="398" cy="344" rx="24" ry="17" />
      </g>

      {/* Flight path */}
      <path
        className="pp-trail"
        d="M44 392 C 118 372 132 306 106 262 C 82 220 132 178 206 204"
        fill="none"
        stroke="#FFE9C2"
        strokeWidth="3.5"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* Envelope the enquiry set off from */}
      <g transform="rotate(-12 74 372)">
        <rect x="40" y="352" width="66" height="44" rx="6" fill="#FFF6E2" stroke="#C97A12" strokeWidth="2.6" />
        <path d="M40 358 L73 380 L106 358" fill="none" stroke="#C97A12" strokeWidth="2.6" strokeLinejoin="round" />
      </g>

      {/* The plane */}
      <g className="pp-plane">
        {/* Far wing */}
        <path
          d="M436 116 L128 214 L268 246 Z"
          fill="url(#pp-light)" stroke="#C97A12" strokeWidth="3" strokeLinejoin="round"
        />
        {/* Near wing */}
        <path
          d="M436 116 L268 246 L306 330 Z"
          fill="url(#pp-mid)" stroke="#C97A12" strokeWidth="3" strokeLinejoin="round"
        />
        {/* Under fold */}
        <path
          d="M268 246 L306 330 L228 286 Z"
          fill="url(#pp-dark)" stroke="#C97A12" strokeWidth="3" strokeLinejoin="round"
        />
        {/* Centre crease */}
        <path d="M436 116 L268 246" fill="none" stroke="#C97A12" strokeWidth="2.4" opacity="0.7" />
        {/* Paper sheen */}
        <path d="M392 138 L214 214" fill="none" stroke="#FFFDF6" strokeWidth="5" strokeLinecap="round" opacity="0.5" />
      </g>

      {/* Sparkles in the slipstream */}
      <g fill="#FFB606">
        <path className="pp-spark pp-spark-1" d="M150 130 l4 10 10 4 -10 4 -4 10 -4 -10 -10 -4 10 -4 Z" />
        <path className="pp-spark pp-spark-2" d="M446 268 l3.5 9 9 3.5 -9 3.5 -3.5 9 -3.5 -9 -9 -3.5 9 -3.5 Z" />
        <path className="pp-spark pp-spark-3" d="M334 62 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3 Z" />
      </g>
    </svg>
  );
}

import './HeroArt.css';

/* Open school gate with a pupil walking in, used as the Admission
   Procedure hero. Pure inline SVG, animated with CSS. */
export default function SchoolGate() {
  return (
    <svg
      className="hero-art-svg gate-art"
      viewBox="0 0 520 440"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Illustration of a pupil walking through an open school gate"
    >
      <defs>
        <linearGradient id="gt-pillar" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFE3A0" />
          <stop offset="55%" stopColor="#F5B23F" />
          <stop offset="100%" stopColor="#D9891A" />
        </linearGradient>
        <linearGradient id="gt-path" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFF4DC" stopOpacity="0.10" />
          <stop offset="100%" stopColor="#FFF4DC" stopOpacity="0.30" />
        </linearGradient>
        <radialGradient id="gt-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFB606" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#FFB606" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="260" cy="215" r="205" fill="url(#gt-glow)" />

      {/* Clouds */}
      <g fill="#ffffff" className="as-cloud as-cloud-1" opacity="0.13">
        <ellipse cx="82" cy="72" rx="32" ry="18" />
        <ellipse cx="108" cy="63" rx="24" ry="20" />
      </g>
      <g fill="#ffffff" className="as-cloud as-cloud-3" opacity="0.1">
        <ellipse cx="430" cy="58" rx="30" ry="16" />
        <ellipse cx="452" cy="52" rx="21" ry="17" />
      </g>

      {/* Path receding towards the gate */}
      <path d="M188 356 L332 356 L392 430 L128 430 Z" fill="url(#gt-path)" />
      <g stroke="#FFE9C2" strokeWidth="3" strokeLinecap="round" opacity="0.4">
        <path d="M258 372 L258 386" />
        <path d="M258 400 L258 418" />
      </g>

      {/* Distant school building */}
      <g opacity="0.5">
        <rect x="214" y="268" width="92" height="62" rx="4" fill="#0f3527" stroke="#7FA894" strokeWidth="2" />
        <path d="M206 268 L260 238 L314 268 Z" fill="#123c2c" stroke="#7FA894" strokeWidth="2" strokeLinejoin="round" />
        <rect x="250" y="300" width="20" height="30" rx="2" fill="#FFE9C2" opacity="0.75" />
        <rect x="226" y="284" width="14" height="12" rx="2" fill="#FFE9C2" opacity="0.6" />
        <rect x="280" y="284" width="14" height="12" rx="2" fill="#FFE9C2" opacity="0.6" />
        <path d="M260 238 L260 218" stroke="#7FA894" strokeWidth="2.5" />
        <path className="gt-flag" d="M261 219 L292 226 L261 234 Z" fill="#FFB606" />
      </g>

      {/* Open gate leaves, swung outward */}
      <g stroke="#C98614" strokeWidth="2.6" fill="none" strokeLinecap="round">
        <g transform="translate(150 352) rotate(-18) translate(-150 -352)">
          <path d="M96 352 L150 352 L150 268 L96 282 Z" fill="#0f3527" fillOpacity="0.35" />
          <path d="M108 348 L108 279" />
          <path d="M122 346 L122 275" />
          <path d="M136 344 L136 271" />
        </g>
        <g transform="translate(370 352) rotate(18) translate(-370 -352)">
          <path d="M424 352 L370 352 L370 268 L424 282 Z" fill="#0f3527" fillOpacity="0.35" />
          <path d="M412 348 L412 279" />
          <path d="M398 346 L398 275" />
          <path d="M384 344 L384 271" />
        </g>
      </g>

      {/* Pupil walking through */}
      <g className="gt-child">
        {/* Backpack */}
        <rect x="243" y="304" width="17" height="22" rx="6" fill="#E4675F" stroke="#A83F38" strokeWidth="2" />
        {/* Body */}
        <path d="M248 348 Q259 306 272 348 Z" fill="#4E9FD1" stroke="#2C6C93" strokeWidth="2.2" strokeLinejoin="round" />
        {/* Legs */}
        <g stroke="#3E2716" strokeWidth="4.5" strokeLinecap="round">
          <path d="M255 348 L251 362" />
          <path d="M265 348 L271 362" />
        </g>
        {/* Head */}
        <circle cx="260" cy="294" r="11" fill="#F3C89E" stroke="#B98352" strokeWidth="2.2" />
        <path d="M250 290 Q260 279 270 290 Q260 285 250 290 Z" fill="#3E2716" />
      </g>

      {/* Gate pillars */}
      <g stroke="#B9760E" strokeWidth="3" strokeLinejoin="round">
        <rect x="132" y="150" width="36" height="206" rx="5" fill="url(#gt-pillar)" />
        <rect x="352" y="150" width="36" height="206" rx="5" fill="url(#gt-pillar)" />
        {/* Caps */}
        <rect x="124" y="138" width="52" height="16" rx="5" fill="#FFD873" />
        <rect x="344" y="138" width="52" height="16" rx="5" fill="#FFD873" />
        {/* Bases */}
        <rect x="122" y="348" width="56" height="16" rx="4" fill="#E0A22A" />
        <rect x="342" y="348" width="56" height="16" rx="4" fill="#E0A22A" />
      </g>

      {/* Lamps on the caps */}
      <g stroke="#B9760E" strokeWidth="2.4">
        <circle cx="150" cy="126" r="9" fill="#FFF3D6" className="gt-lamp" />
        <circle cx="370" cy="126" r="9" fill="#FFF3D6" className="gt-lamp gt-lamp-2" />
      </g>

      {/* Arch with a welcome plaque */}
      <path
        d="M150 138 Q260 58 370 138"
        fill="none" stroke="url(#gt-pillar)" strokeWidth="15" strokeLinecap="round"
      />
      <path
        d="M150 138 Q260 58 370 138"
        fill="none" stroke="#FFF3D6" strokeWidth="3" strokeLinecap="round" opacity="0.55"
      />
      <g>
        <rect x="212" y="76" width="96" height="30" rx="8" fill="#0f3527" stroke="#FFB606" strokeWidth="2.5" />
        <rect x="222" y="86" width="76" height="3" rx="1.5" fill="#FFB606" opacity="0.9" />
        <rect x="234" y="94" width="52" height="3" rx="1.5" fill="#FFE9C2" opacity="0.65" />
      </g>
    </svg>
  );
}

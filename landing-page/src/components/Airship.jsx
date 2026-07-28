import './HeroArt.css';

/* Hand-drawn airship carrying children, used as the About page's hero
   illustration. Pure inline SVG so it needs no assets and scales cleanly;
   the float, propeller spin and cloud drift are CSS-driven. */
export default function Airship({ className = '' }) {
  return (
    <svg
      className={`hero-art-svg airship ${className}`}
      viewBox="0 0 520 440"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Illustration of children sailing an airship through the clouds"
    >
      <defs>
        <linearGradient id="as-env" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFDE8A" />
          <stop offset="42%" stopColor="#FDB63C" />
          <stop offset="100%" stopColor="#E0821A" />
        </linearGradient>
        <linearGradient id="as-fin" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFE3A0" />
          <stop offset="100%" stopColor="#F5B23F" />
        </linearGradient>
        <linearGradient id="as-hull" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#C9622A" />
          <stop offset="100%" stopColor="#8E3D16" />
        </linearGradient>
        <radialGradient id="as-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFB606" stopOpacity="0.20" />
          <stop offset="100%" stopColor="#FFB606" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Warm halo behind the ship */}
      <circle cx="255" cy="180" r="200" fill="url(#as-glow)" />

      {/* Clouds */}
      <g fill="#ffffff" className="as-cloud as-cloud-1" opacity="0.15">
        <ellipse cx="72" cy="78" rx="34" ry="19" />
        <ellipse cx="98" cy="68" rx="25" ry="21" />
        <ellipse cx="48" cy="84" rx="21" ry="14" />
      </g>
      <g fill="#ffffff" className="as-cloud as-cloud-2" opacity="0.12">
        <ellipse cx="440" cy="352" rx="40" ry="21" />
        <ellipse cx="412" cy="342" rx="26" ry="19" />
        <ellipse cx="468" cy="360" rx="22" ry="14" />
      </g>
      <g fill="#ffffff" className="as-cloud as-cloud-3" opacity="0.09">
        <ellipse cx="404" cy="46" rx="28" ry="15" />
        <ellipse cx="428" cy="40" rx="20" ry="16" />
      </g>

      {/* ── The ship ── */}
      <g className="as-ship">
        {/* Tail fins */}
        <g stroke="#C98614" strokeWidth="2.5" strokeLinejoin="round" fill="url(#as-fin)">
          <path d="M366 122 L462 52 L470 124 Z" />
          <path d="M370 142 L478 108 L474 154 Z" />
          <path d="M370 166 L474 182 L458 212 Z" />
        </g>
        <g stroke="#C98614" strokeWidth="1.6" opacity="0.7">
          <path d="M382 128 L452 76" />
          <path d="M384 145 L466 120" />
          <path d="M382 170 L458 184" />
        </g>

        {/* Nose propeller */}
        <g className="as-prop" fill="#FFD873" stroke="#C98614" strokeWidth="2.2">
          <ellipse cx="112" cy="124" rx="9" ry="25" />
          <ellipse cx="112" cy="124" rx="9" ry="25" transform="rotate(120 112 150)" />
          <ellipse cx="112" cy="124" rx="9" ry="25" transform="rotate(240 112 150)" />
        </g>
        <circle cx="112" cy="150" r="8" fill="#E0821A" stroke="#A65D0E" strokeWidth="2" />
        <rect x="118" y="144" width="16" height="12" rx="4" fill="#E0821A" />

        {/* Envelope */}
        <ellipse
          cx="250" cy="150" rx="132" ry="78"
          fill="url(#as-env)" stroke="#C97A12" strokeWidth="3"
        />

        {/* Panel seams */}
        <g fill="none" stroke="#FFF3D6" strokeWidth="2.4" opacity="0.75">
          <path d="M180 84 Q166 150 180 216" />
          <path d="M215 75 Q206 150 215 225" />
          <path d="M285 75 Q294 150 285 225" />
          <path d="M320 84 Q334 150 320 216" />
        </g>

        {/* Windows */}
        <g fill="#FFFBF0" stroke="#C97A12" strokeWidth="2.4">
          <ellipse cx="205" cy="150" rx="21" ry="10.5" />
          <ellipse cx="250" cy="150" rx="21" ry="10.5" />
          <ellipse cx="295" cy="150" rx="21" ry="10.5" />
        </g>

        {/* Highlight along the top of the envelope */}
        <path
          d="M150 118 Q210 82 300 84"
          fill="none" stroke="#FFF6DF" strokeWidth="6"
          strokeLinecap="round" opacity="0.5"
        />

        {/* Mast and rigging down to the gondola */}
        <rect x="246" y="220" width="8" height="76" rx="3" fill="#B4541F" />
        <g stroke="#FFE9C2" strokeWidth="2.2" opacity="0.75">
          <path d="M198 220 L214 296" />
          <path d="M302 220 L286 296" />
          <path d="M172 200 L192 296" />
          <path d="M328 200 L308 296" />
        </g>

        {/* Gondola */}
        <path
          d="M176 296 L336 296 C332 334 318 354 256 359 C194 354 180 334 176 296 Z"
          fill="url(#as-hull)" stroke="#6F2E0E" strokeWidth="3" strokeLinejoin="round"
        />
        {/* Bow spar */}
        <path d="M178 300 L142 288 L146 302 Z" fill="#B4541F" stroke="#6F2E0E" strokeWidth="2.2" strokeLinejoin="round" />
        {/* Deck rail */}
        <rect x="174" y="290" width="164" height="8" rx="4" fill="#C9622A" stroke="#6F2E0E" strokeWidth="2" />
        {/* Portholes */}
        <g fill="#FFE9C2" stroke="#6F2E0E" strokeWidth="2">
          <circle cx="208" cy="318" r="6.5" />
          <circle cx="238" cy="323" r="6.5" />
          <circle cx="268" cy="324" r="6.5" />
        </g>

        {/* Cabin */}
        <rect x="288" y="262" width="46" height="30" rx="4" fill="#C9622A" stroke="#6F2E0E" strokeWidth="2.5" />
        <rect x="283" y="252" width="56" height="12" rx="4" fill="#8E3D16" stroke="#6F2E0E" strokeWidth="2.5" />
        <rect x="299" y="270" width="17" height="13" rx="2.5" fill="#FFE9C2" stroke="#6F2E0E" strokeWidth="2" />

        {/* Pennant */}
        <rect x="309" y="212" width="3.5" height="42" rx="1.75" fill="#8E3D16" />
        <path d="M312 216 L344 226 L312 236 Z" fill="#FFB606" stroke="#C98614" strokeWidth="2" strokeLinejoin="round" />

        {/* ── Children on deck ── */}
        {/* Child in blue */}
        <g>
          <path d="M200 291 Q211 276 222 291 Z" fill="#4E9FD1" stroke="#2C6C93" strokeWidth="2" strokeLinejoin="round" />
          <circle cx="211" cy="272" r="10" fill="#F3C89E" stroke="#B98352" strokeWidth="2" />
          <path d="M202 268 Q211 258 220 268 Q211 264 202 268 Z" fill="#5A3620" />
        </g>
        {/* Child in red, waving */}
        <g>
          <path d="M231 291 Q243 274 255 291 Z" fill="#E4675F" stroke="#A83F38" strokeWidth="2" strokeLinejoin="round" />
          <circle cx="243" cy="268" r="10.5" fill="#EFBC8C" stroke="#B98352" strokeWidth="2" />
          <path d="M233 264 Q243 253 253 264 Q243 259 233 264 Z" fill="#3E2716" />
          <g className="as-wave">
            <path d="M253 276 L266 260" stroke="#EFBC8C" strokeWidth="5" strokeLinecap="round" fill="none" />
            <circle cx="268" cy="257" r="4.5" fill="#EFBC8C" />
          </g>
        </g>
        {/* Child in green */}
        <g>
          <path d="M262 291 Q272 279 282 291 Z" fill="#74BE7E" stroke="#3F8A49" strokeWidth="2" strokeLinejoin="round" />
          <circle cx="272" cy="276" r="9" fill="#F7D2AE" stroke="#B98352" strokeWidth="2" />
          <path d="M264 272 Q272 263 280 272 Q272 268 264 272 Z" fill="#6B4423" />
        </g>
      </g>
    </svg>
  );
}

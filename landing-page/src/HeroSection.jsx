import { useRef, useState, useCallback, useEffect } from 'react';
import './HeroSection.css';

import { Award, Compass, Palette, ShieldCheck, Users } from 'lucide-react';

/* ─── Core values data — five curved sections ───────── */
const VALUES = [
  {
    id: 'excellence',
    label: 'Excellence',
    desc: 'The pursuit of the extraordinary',
    startAngle: -90,
    sweepAngle: 72,
    gradId: 'gradExcellence',
    Icon: Award,
    color: '#f9e7b4', // Champagne
  },
  {
    id: 'leadership',
    label: 'Leadership',
    desc: 'Courage to walk first',
    startAngle: -18,
    sweepAngle: 72,
    gradId: 'gradLeadership',
    Icon: Compass,
    color: '#bdeaff', // Pastel Sky
  },
  {
    id: 'creativity',
    label: 'Creativity',
    desc: 'Imagination given form',
    startAngle: 54,
    sweepAngle: 72,
    gradId: 'gradCreativity',
    Icon: Palette,
    color: '#e7c9ff', // Pastel Lavender
  },
  {
    id: 'integrity',
    label: 'Integrity',
    desc: 'Character in every choice',
    startAngle: 126,
    sweepAngle: 72,
    gradId: 'gradIntegrity',
    Icon: ShieldCheck,
    color: '#beffda', // Pastel Mint
  },
  {
    id: 'community',
    label: 'Community',
    desc: 'Stronger, together',
    startAngle: 198,
    sweepAngle: 72,
    gradId: 'gradCommunity',
    Icon: Users,
    color: '#ffc9cc', // Blush
  },
];

/* ─── Halo ring geometry (shared by defs + ring) ───── */
const RING_CX = 350;
const RING_CY = 350;
const RING_INNER = 238;
const RING_OUTER = 358;

/* Strips per value segment on the 3D cylinder wall (72° / 6 = 12° each) */
const CYL_STRIPS = 6;

/* School-highlight cards revealed when the cylinder unrolls into the
   hero ribbon — keyed by value id, numbered left-to-right along it */
const HIGHLIGHTS = {
  creativity: { n: '01', title: 'Campus Life', caption: 'Where days unfold' },
  leadership: { n: '02', title: 'Academics', caption: 'Classrooms & laboratories' },
  excellence: { n: '03', title: 'Sports', caption: 'Strength in motion' },
  community: { n: '04', title: 'Culture', caption: 'Arts & achievements' },
  integrity: { n: '05', title: 'Admissions', caption: 'Begin the journey' },
};

/* ─── Polar to cartesian ────────────────────────────── */
function polarToCartesian(cx, cy, r, angleDeg) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

/* ─── Build annular segment path ────────────────────── */
function annularSegmentPath(cx, cy, innerR, outerR, startDeg, sweepDeg, gap = 1.8) {
  const adjustedStart = startDeg + gap / 2;
  const adjustedSweep = sweepDeg - gap;

  const s1 = polarToCartesian(cx, cy, outerR, adjustedStart);
  const e1 = polarToCartesian(cx, cy, outerR, adjustedStart + adjustedSweep);
  const s2 = polarToCartesian(cx, cy, innerR, adjustedStart + adjustedSweep);
  const e2 = polarToCartesian(cx, cy, innerR, adjustedStart);

  const large = adjustedSweep > 180 ? 1 : 0;

  return [
    `M ${s1.x} ${s1.y}`,
    `A ${outerR} ${outerR} 0 ${large} 1 ${e1.x} ${e1.y}`,
    `L ${s2.x} ${s2.y}`,
    `A ${innerR} ${innerR} 0 ${large} 0 ${e2.x} ${e2.y}`,
    'Z',
  ].join(' ');
}

/* ─── Label position ────────────────────────────────── */
function midAngle(start, sweep) {
  return start + sweep / 2;
}

function labelPos(cx, cy, r, angleDeg) {
  return polarToCartesian(cx, cy, r, angleDeg);
}

/* ─── Icon center in segment ────────────────────────── */
function iconCenter(cx, cy, innerR, outerR, startDeg, sweepDeg) {
  const mid = startDeg + sweepDeg / 2;
  const r = innerR + (outerR - innerR) * 0.5;
  return polarToCartesian(cx, cy, r, mid);
}

/* ─── Particles component ───────────────────────────── */
const PARTICLES = [
  { top: '15%', left: '58%', size: 3, dur: '9s', delay: '0s', dx: '14px', dy: '-38px' },
  { top: '72%', left: '22%', size: 2, dur: '11s', delay: '2s', dx: '-10px', dy: '-48px' },
  { top: '28%', left: '14%', size: 2.5, dur: '8s', delay: '4s', dx: '8px', dy: '-30px' },
  { top: '80%', left: '70%', size: 2, dur: '13s', delay: '1s', dx: '16px', dy: '-42px' },
  { top: '10%', left: '40%', size: 1.5, dur: '10s', delay: '3s', dx: '-12px', dy: '-36px' },
  { top: '60%', left: '88%', size: 2, dur: '7s', delay: '5s', dx: '-8px', dy: '-28px' },
  { top: '45%', left: '6%', size: 2.5, dur: '12s', delay: '0.5s', dx: '10px', dy: '-44px' },
  { top: '88%', left: '45%', size: 1.5, dur: '9s', delay: '2.5s', dx: '6px', dy: '-32px' },
];

/* ─── SVG Defs: gradients and filters ──────────────── */
function SvgDefs() {
  return (
    <defs>
      {VALUES.map(v => (
        <radialGradient key={v.gradId} id={v.gradId} cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor={v.color} stopOpacity="1" />
          <stop offset="60%" stopColor={v.color} stopOpacity="0.8" />
          <stop offset="100%" stopColor={v.color} stopOpacity="0.5" />
        </radialGradient>
      ))}

      {/* Glass overlay gradient */}
      <linearGradient id="glassOverlay" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
        <stop offset="40%" stopColor="rgba(255,255,255,0.1)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0.25)" />
      </linearGradient>

      {/* Frosted glass blur filter */}
      <filter id="frostedGlass" x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" result="noise" />
        <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
        <feBlend in="SourceGraphic" in2="grayNoise" mode="overlay" result="blended" />
        <feGaussianBlur stdDeviation="1.2" in="blended" result="blurred" />
        <feComposite in="blurred" in2="SourceGraphic" operator="in" />
      </filter>

      {/* Soft glow filter for icons */}
      <filter id="iconGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="2.5" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>

      {/* Highlight streak filter */}
      <filter id="highlightStreak" x="0%" y="0%" width="100%" height="100%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>

      {/* Clip for halo ring annular shape */}
      <clipPath id="haloClip">
        <path d={annularSegmentPath(RING_CX, RING_CY, RING_INNER, RING_OUTER, -90, 360, 0)} />
      </clipPath>

      {/* Radial segment image placeholders */}
      {VALUES.map((v) => {
        const center = iconCenter(RING_CX, RING_CY, RING_INNER, RING_OUTER, v.startAngle, v.sweepAngle);
        return (
          <radialGradient key={`imgph-${v.id}`} id={`imgph-${v.id}`} cx={`${center.x / 700 * 100}%`} cy={`${center.y / 700 * 100}%`} r="12%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
        );
      })}

      {/* Glossy specular highlight */}
      <linearGradient id="specularHighlight" x1="0%" y1="0%" x2="60%" y2="100%">
        <stop offset="0%" stopColor="rgba(255,255,255,0.55)" />
        <stop offset="30%" stopColor="rgba(255,255,255,0.12)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
      </linearGradient>

      {/* Drop shadow filter for halo */}
      <filter id="haloShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="8" stdDeviation="20" floodColor="rgba(120,80,200,0.18)" />
        <feDropShadow dx="0" dy="2" stdDeviation="6" floodColor="rgba(180,140,255,0.12)" />
      </filter>
    </defs>
  );
}

/* ─── Halo Ring SVG ─────────────────────────────────── */
function HaloRingSVG({ onSegmentHover, onSegmentLeave }) {
  const CX = RING_CX, CY = RING_CY;
  const INNER = RING_INNER, OUTER = RING_OUTER;
  const LABEL_R = 310;
  const IMAGE_R = 298;
  const GAP = 2.2;

  return (
    <svg
      className="halo-svg"
      viewBox="0 0 700 700"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: 'drop-shadow(0 8px 40px rgba(120,80,200,0.15)) drop-shadow(0 2px 10px rgba(180,140,255,0.10))' }}
    >
      <SvgDefs />

      {/* ── Segment fills ── */}
      {VALUES.map((v) => (
        <g
          key={v.id}
          className={`halo-segment`}
          onMouseEnter={(e) => onSegmentHover(v, e)}
          onMouseLeave={onSegmentLeave}
        >
          {/* Base colour fill */}
          <path
            d={annularSegmentPath(CX, CY, INNER, OUTER, v.startAngle, v.sweepAngle, GAP)}
            fill={`url(#${v.gradId})`}
          />

          {/* Image placeholder region — swap with <image> tag when you have assets */}
          <path
            d={annularSegmentPath(CX, CY, INNER, OUTER, v.startAngle, v.sweepAngle, GAP)}
            fill={`url(#imgph-${v.id})`}
            opacity="0.7"
          />

          {/* Frosted glass overlay */}
          <path
            d={annularSegmentPath(CX, CY, INNER, OUTER, v.startAngle, v.sweepAngle, GAP)}
            fill="url(#glassOverlay)"
            opacity="0.85"
          />

          {/* Icon using lucide-react via foreignObject */}
          {(() => {
            const ic = iconCenter(CX, CY, INNER, OUTER, v.startAngle, v.sweepAngle);
            return (
              <foreignObject
                x={ic.x - 30}
                y={ic.y - 30}
                width={60}
                height={60}
                style={{ pointerEvents: 'none' }}
              >
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.15))' }}>
                  {/* Changed icon size from 28 to 44 and color to darker for contrast against pastel */}
                  <v.Icon size={44} color="#1f2937" strokeWidth={1.5} />
                </div>
              </foreignObject>
            );
          })()}

          {/* Label text and line pointing out */}
          {(() => {
            const mid = midAngle(v.startAngle, v.sweepAngle);
            const rStart = OUTER + 15;
            const rEnd = OUTER + 60;
            
            const startPos = polarToCartesian(CX, CY, rStart, mid);
            const endPos = polarToCartesian(CX, CY, rEnd, mid);
            
            // Add a horizontal line to the text
            const isRight = endPos.x > CX;
            const lineLen = 50;
            const textX = isRight ? endPos.x + lineLen : endPos.x - lineLen;
            const textAnchor = isRight ? "start" : "end";

            return (
              <g className="seg-label-group">
                {/* Line pointing out */}
                <circle cx={startPos.x} cy={startPos.y} r="3" fill="rgba(100,100,100,0.3)" />
                <circle cx={startPos.x} cy={startPos.y} r="1.5" fill="#4b5563" />
                
                <path 
                  d={`M ${startPos.x} ${startPos.y} L ${endPos.x} ${endPos.y} L ${textX} ${endPos.y}`} 
                  fill="none" 
                  stroke="#cbd5e1" 
                  strokeWidth="1.5" 
                />
                
                <circle cx={textX} cy={endPos.y} r="2.5" fill="#9ca3af" />
                
                {/* Text Label */}
                <text
                  className="seg-label-out"
                  x={isRight ? textX + 12 : textX - 12}
                  y={endPos.y - 8}
                  textAnchor={textAnchor}
                  fill={v.color}
                >
                  {v.label}
                </text>
                <text
                  className="seg-desc-out"
                  x={isRight ? textX + 12 : textX - 12}
                  y={endPos.y + 16}
                  textAnchor={textAnchor}
                >
                  {v.desc}
                </text>
              </g>
            );
          })()}
        </g>
      ))}

      {/* ── Specular highlight sweep across top ── */}
      <path
        d={annularSegmentPath(CX, CY, INNER - 2, OUTER + 2, -90, 160, 0)}
        fill="url(#specularHighlight)"
        opacity="0.55"
        pointerEvents="none"
      />

      {/* ── Inner ring edge highlight ── */}
      <circle cx={CX} cy={CY} r={INNER} className="halo-edge-inner" />

      {/* ── Outer ring edge highlight ── */}
      <circle cx={CX} cy={CY} r={OUTER} className="halo-edge-outer" />
    </svg>
  );
}

/* ─── Main Component ────────────────────────────────── */
export default function HeroSection() {
  const [tooltip, setTooltip] = useState({ visible: false, value: null, x: 0, y: 0 });
  const stageRef = useRef(null);
  const sectionRef = useRef(null);

  const handleSegmentHover = useCallback((value, e) => {
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return;
    setTooltip({
      visible: true,
      value,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const handleSegmentLeave = useCallback(() => {
    setTooltip((t) => ({ ...t, visible: false }));
  }, []);

  /* Scroll-driven stage 2: halo folds into a cylindrical glass gallery */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const clamp01 = (t) => Math.min(1, Math.max(0, t));
    const ramp = (p, a, b) => clamp01((p - a) / (b - a));
    const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    const easeOut = (t) => 1 - Math.pow(1 - t, 3);

    const strips = Array.from(section.querySelectorAll('.cyl-strip'));
    const faces = Array.from(section.querySelectorAll('.ribbon-face'));
    const panelsEl = section.querySelector('.cylinder-panels');

    const RAD = Math.PI / 180;
    const dirX = (d) => Math.sin(d * RAD);
    const dirY = (d) => -Math.cos(d * RAD);
    const FRONT = 180;   // drum angle that faces the camera after the tilt
    const CUT = -26;     // seam where the surface tears open (a segment gap)
    const HINGE_R = 142; // strips hinge on the disc rim
    /* Arc midpoint of the opened ribbon — drift recenters it on screen */
    const RIBBON_MID = HINGE_R * ((CUT + 180) * RAD);

    /* Unroll: curvature radius grows while arc angles compress, anchored at
       the front tangent line, so the surface flattens without stretching */
    const unrollPos = (angle, u) => {
      let phi = (((angle - FRONT) % 360) + 360) % 360;
      if (phi >= CUT + 360) phi -= 360; // φ ∈ [CUT, CUT + 360)
      const R = HINGE_R / (1 - u);
      const beta = FRONT + phi * (1 - u);
      const cx = dirX(FRONT) * (HINGE_R - R);
      const cy = dirY(FRONT) * (HINGE_R - R);
      return { beta, R, cx, cy, x: cx + dirX(beta) * R, y: cy + dirY(beta) * R };
    };

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = section.getBoundingClientRect();
      const range = rect.height - window.innerHeight;
      const p = range > 0 ? clamp01(-rect.top / range) : 0;
      const s = section.style;

      /* Stage 1 → 2: labels out, nav in, logo docks, ring folds into a drum */
      s.setProperty('--labels-o', String(1 - easeOut(ramp(p, 0.01, 0.12))));
      s.setProperty('--nav-o', String(easeOut(ramp(p, 0.03, 0.17))));
      s.setProperty('--logo-t', String(easeInOut(ramp(p, 0.06, 0.32))));
      const tilt = 76 * easeInOut(ramp(p, 0.09, 0.46)) + 12 * easeInOut(ramp(p, 0.52, 0.76));
      s.setProperty('--tilt', `${tilt}deg`);
      s.setProperty('--persp', `${1600 + easeInOut(ramp(p, 0.09, 0.49)) * 250}px`);
      /* Wall height: rises with the fold, then expands as the ribbon opens */
      const H = 70 + easeInOut(ramp(p, 0.26, 0.52)) * 150 + easeInOut(ramp(p, 0.52, 0.78)) * 240;
      s.setProperty('--panel-h', `${H}px`);
      const scale = 1 + 0.75 * easeInOut(ramp(p, 0.32, 0.55)) + 0.35 * easeInOut(ramp(p, 0.52, 0.78));
      s.setProperty('--cyl-scale', String(scale));
      s.setProperty('--ring-o', String(1 - ramp(p, 0.19, 0.29)));
      s.setProperty('--panel-o', String(ramp(p, 0.16, 0.26)));
      const pitch = -90 * easeInOut(ramp(p, 0.17, 0.46));
      const yaw = 28 * easeOut(ramp(p, 0, 0.55));

      /* Stage 3: the drum peels open at the seam and unrolls into the ribbon */
      const uE = easeInOut(ramp(p, 0.52, 0.78));
      const u = 0.965 * uE; // never fully flat — both ends keep a soft curl
      s.setProperty('--face-o', String(easeOut(ramp(p, 0.7, 0.82))));
      s.setProperty('--lift', `${uE * window.innerHeight * 0.38}px`);

      /* Stage 4: the school site's hero arrives — menu, left logo, headline */
      const s4 = easeInOut(ramp(p, 0.8, 0.94));
      s.setProperty('--menu-o', String(s4));
      s.setProperty('--logo-x', `${(-s4 * (window.innerWidth / 2 - 69)).toFixed(1)}px`);
      const copyIn = easeOut(ramp(p, 0.84, 0.97));
      s.setProperty('--copy-o', String(copyIn));
      s.setProperty('--copy-y', `${(1 - copyIn) * 28}px`);
      /* −24 optically recenters against the asymmetric end-curl perspective */
      panelsEl.style.transform = `translateX(${((RIBBON_MID - 24) * uE).toFixed(2)}px)`;

      for (const el of strips) {
        const theta = +el.dataset.theta + yaw;
        if (u <= 0) {
          el.style.transform =
            `rotateZ(${theta}deg) translateY(calc((142px + var(--panel-h) / 2) * -1)) ` +
            `rotateX(${pitch}deg) rotateY(180deg)`;
        } else {
          const g = unrollPos(theta, u);
          el.style.transform =
            `translate(${g.x.toFixed(2)}px, ${(g.y - H / 2).toFixed(2)}px) ` +
            `rotateZ(${g.beta.toFixed(3)}deg) rotateX(-90deg) rotateY(180deg)`;
        }
      }

      /* Cards hover a hair above the surface along its normal */
      for (const el of faces) {
        const g = unrollPos(+el.dataset.mid + yaw, Math.max(u, 0.001));
        const k = (g.R + 4) / g.R;
        const fx = g.cx + (g.x - g.cx) * k;
        const fy = g.cy + (g.y - g.cy) * k;
        el.style.transform =
          `translate(${fx.toFixed(2)}px, ${(fy - H / 2).toFixed(2)}px) ` +
          `rotateZ(${g.beta.toFixed(3)}deg) rotateX(-90deg) rotateY(180deg)`;
      }

      section.dataset.folded = p > 0.2 ? '1' : '0';
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="hero-section" aria-label="School Hero" ref={sectionRef}>
      <div className="hero-sticky">

      {/* Glass navigation bar — fades in as the transformation begins */}
      <header className="glass-nav" aria-hidden="true">
        <nav className="nav-menu">
          <span>Home</span>
          <span>About Us</span>
          <span>Academics</span>
          <span>Admissions</span>
          <span>Facilities</span>
          <span>Gallery</span>
          <span>Contact Us</span>
        </nav>
      </header>

      {/* Final hero copy — the school site's hero arrives over the ribbon */}
      <div className="hero-copy" aria-hidden="true">
        <span className="hero-badge">Admissions Open</span>
        <h1 className="hero-headline">Best School in Aligarh, Uttar&nbsp;Pradesh</h1>
        <p className="hero-tagline">Excellence International School — Shaping Future Leaders Through Quality Education</p>
        <span className="hero-cta">Quick Enquiry</span>
      </div>

      {/* Ambient background lights */}
      <div className="ambient-bg">
        <div className="ambient-blob ambient-blob-1" />
        <div className="ambient-blob ambient-blob-2" />
        <div className="ambient-blob ambient-blob-3" />
      </div>

      {/* Center radial glow */}
      <div className="center-glow" />

      {/* Stage */}
      <div className="hero-stage" ref={stageRef}>

        {/* Outer subtle ring */}
        <div className="outer-glow-ring" />

        {/* 3D scene — flat halo folds into a cylindrical glass gallery on scroll */}
        <div className="persp-wrap">
          <div className="halo-3d">

            {/* Halo ring */}
            <div className="halo-ring">
              <HaloRingSVG
                onSegmentHover={handleSegmentHover}
                onSegmentLeave={handleSegmentLeave}
              />
            </div>

            {/* Inner frosted glass disc — becomes the gallery floor */}
            <div className="inner-glass-disc" />

            {/* Chromatic dispersion edge ring */}
            <div className="chromatic-ring" />

            {/* Cylinder wall — each value sliced into thin strips so the
                surface curves smoothly, like a continuous drum */}
            <div className="cylinder-panels">
              {VALUES.map((v) => {
                const step = v.sweepAngle / CYL_STRIPS;
                return Array.from({ length: CYL_STRIPS }, (_, i) => (
                  <div
                    key={`${v.id}-${i}`}
                    className={`cyl-strip${i === 0 ? ' cyl-strip-seam' : ''}`}
                    data-theta={v.startAngle + (i + 0.5) * step}
                    style={{
                      backgroundImage:
                        `linear-gradient(115deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0) 55%, rgba(255,255,255,0.12) 85%), ` +
                        `linear-gradient(180deg, ${v.color}F2 0%, ${v.color}BF 45%, ${v.color}8C 100%)`,
                      backgroundSize: `${CYL_STRIPS * 100}% 100%`,
                      backgroundPosition: `${(i / (CYL_STRIPS - 1)) * 100}% 0`,
                    }}
                  >
                    {i === Math.floor(CYL_STRIPS / 2) && (
                      <div className="cyl-strip-icon">
                        <v.Icon size={34} color="#1f2937" strokeWidth={1.5} />
                      </div>
                    )}
                  </div>
                ));
              })}

              {/* Highlight cards — flat faces that settle onto the unrolled ribbon */}
              <div className="ribbon-faces">
                {VALUES.map((v) => {
                  const h = HIGHLIGHTS[v.id];
                  return (
                    <div
                      key={v.id}
                      className="ribbon-face"
                      data-mid={midAngle(v.startAngle, v.sweepAngle)}
                    >
                      <div
                        className="face-art"
                        style={{
                          backgroundImage:
                            `radial-gradient(120% 90% at 30% 18%, ${v.color}F0 0%, ${v.color}00 62%), ` +
                            `linear-gradient(165deg, ${v.color}E6 0%, ${v.color}59 55%, rgba(255,255,255,0.35) 100%)`,
                        }}
                      >
                        <span className="face-index">{h.n}</span>
                      </div>
                      <h3 className="face-title">{h.title}</h3>
                      <span className="face-caption">{h.caption}</span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

        {/* Logo — perfectly centered, does not rotate */}
        <div className="logo-center">
          <img
            src="/Excellence-Logo.png.webp"
            alt="Excellence International School"
            className="logo-img"
            draggable="false"
          />
        </div>

        {/* Floating particles */}
        <div className="particles-layer" aria-hidden="true">
          {PARTICLES.map((p, i) => (
            <span
              key={i}
              className="particle"
              style={{
                top: p.top,
                left: p.left,
                width: `${p.size}px`,
                height: `${p.size}px`,
                '--dur': p.dur,
                '--delay': p.delay,
                '--dx': p.dx,
                '--dy': p.dy,
              }}
            />
          ))}
        </div>

        {/* Tooltip */}
        {tooltip.value && (
          <div
            className={`seg-tooltip ${tooltip.visible ? 'visible' : ''}`}
            style={{
              left: tooltip.x + 20,
              top: tooltip.y - 40,
            }}
            role="tooltip"
          >
            <span className="seg-tooltip-title">{tooltip.value.label}</span>
            <span className="seg-tooltip-desc">{tooltip.value.desc}</span>
          </div>
        )}
      </div>

      </div>
    </section>
  );
}

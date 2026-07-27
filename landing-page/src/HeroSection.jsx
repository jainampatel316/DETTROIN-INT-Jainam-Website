import { useRef, useState, useCallback } from 'react';
import './HeroSection.css';

import { Handshake, ShieldCheck, Users, Target, Heart, ClipboardCheck } from 'lucide-react';

/* ─── Core values data ──────────────────────────────── */
const VALUES = [
  {
    id: 'honesty',
    label: 'Honesty',
    desc: 'Speaking truth with courage and grace',
    startAngle: -90,
    sweepAngle: 60,
    gradId: 'gradHonesty',
    Icon: Handshake,
    color: '#fcdeae', // Pastel Peach
  },
  {
    id: 'integrity',
    label: 'Integrity',
    desc: 'Consistent virtue in every action',
    startAngle: -30,
    sweepAngle: 60,
    gradId: 'gradIntegrity',
    Icon: ShieldCheck,
    color: '#f9f1b4', // Pastel Yellow
  },
  {
    id: 'respect',
    label: 'Respect',
    desc: 'Honouring the dignity in every person',
    startAngle: 30,
    sweepAngle: 60,
    gradId: 'gradRespect',
    Icon: Users,
    color: '#beffda', // Pastel Mint
  },
  {
    id: 'discipline',
    label: 'Discipline',
    desc: 'The foundation of every great achievement',
    startAngle: 90,
    sweepAngle: 60,
    gradId: 'gradDiscipline',
    Icon: Target,
    color: '#bdeaff', // Pastel Sky
  },
  {
    id: 'compassion',
    label: 'Compassion',
    desc: 'Leading with empathy and understanding',
    startAngle: 150,
    sweepAngle: 60,
    gradId: 'gradCompassion',
    Icon: Heart,
    color: '#e7c9ff', // Pastel Lavender
  },
  {
    id: 'responsibility',
    label: 'Responsibility',
    desc: 'Owning our actions and their consequences',
    startAngle: 210,
    sweepAngle: 60,
    gradId: 'gradResponsibility',
    Icon: ClipboardCheck,
    color: '#ffc1c4', // Pastel Pink
  },
];

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
        <path d={annularSegmentPath(350, 350, 248, 348, -90, 360, 0)} />
      </clipPath>

      {/* Radial segment image placeholders */}
      {VALUES.map((v) => {
        const center = iconCenter(350, 350, 248, 348, v.startAngle, v.sweepAngle);
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
  const CX = 350, CY = 350;
  const INNER = 248, OUTER = 348;
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

  return (
    <section className="hero-section" aria-label="School Hero">
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

        {/* Halo ring — rotates */}
        <div className="halo-ring">
          <HaloRingSVG
            onSegmentHover={handleSegmentHover}
            onSegmentLeave={handleSegmentLeave}
          />
          {/* Shimmer sweep */}
          <div className="halo-shimmer" />
        </div>

        {/* Inner frosted glass disc */}
        <div className="inner-glass-disc" />

        {/* Chromatic dispersion edge ring */}
        <div className="chromatic-ring" />

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

      {/* Bottom credits */}
      <footer className="hero-credits" aria-hidden="true">
        <div className="credit-dot" />
        <span className="credit-text">Honesty · Integrity · Respect · Discipline · Compassion · Responsibility</span>
        <div className="credit-dot" />
      </footer>

    </section>
  );
}

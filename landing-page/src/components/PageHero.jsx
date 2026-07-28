import { Link } from 'react-router-dom';
import Reveal from './Reveal';

/* Banner used at the top of every interior page. `trail` is the
   breadcrumb after Home; pass children to place an illustration
   alongside the copy. */
export default function PageHero({ title, accent, lede, trail = [], children }) {
  return (
    <header className="pg-hero">
      <div className={`wrap pg-hero-in${children ? ' has-art' : ''}`}>
        <div className="pg-hero-copy">
          <Reveal className="pg-crumb">
            <Link to="/">Home</Link>
            {trail.map((step, i) => (
              <span key={step.label} className="pg-crumb-step">
                <span aria-hidden="true">/</span>
                {i === trail.length - 1 || !step.to ? (
                  <b>{step.label}</b>
                ) : (
                  <Link to={step.to}>{step.label}</Link>
                )}
              </span>
            ))}
          </Reveal>

          <Reveal className="pg-title-wrap" delay={90}>
            <h1 className="pg-title">
              {title} {accent && <em>{accent}</em>}
            </h1>
            {lede && <p className="pg-lede">{lede}</p>}
          </Reveal>
        </div>

        {children && (
          <Reveal className="pg-hero-art" delay={200}>
            {children}
          </Reveal>
        )}
      </div>
    </header>
  );
}

import Reveal from './Reveal';

/* Standard section heading: mono kicker, serif title, optional lede */
export default function Heading({ kicker, title, lede, tone = 'light', center = true }) {
  return (
    <Reveal className={`sec-head ${center ? 'center' : ''} tone-${tone}`}>
      <span className="kicker">{kicker}</span>
      <h2 className="sec-title">{title}</h2>
      {lede && <p className="sec-lede">{lede}</p>}
    </Reveal>
  );
}

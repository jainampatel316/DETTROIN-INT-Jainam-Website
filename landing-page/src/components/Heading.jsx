import Reveal from './Reveal';

/* Standard section heading: serif title with an optional lede */
export default function Heading({ title, lede, tone = 'light', center = true }) {
  return (
    <Reveal className={`sec-head ${center ? 'center' : ''} tone-${tone}`}>
      <h2 className="sec-title">{title}</h2>
      {lede && <p className="sec-lede">{lede}</p>}
    </Reveal>
  );
}

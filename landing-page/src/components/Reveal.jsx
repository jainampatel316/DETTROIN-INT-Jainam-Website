import { useEffect, useRef } from 'react';

/* Scroll-reveal wrapper — adds .in once the element enters the viewport */
export default function Reveal({ as: Tag = 'div', className = '', delay = 0, children, ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add('in');
          io.disconnect();
        }
      },
      { threshold: 0.14 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`rv ${className}`} style={{ '--rv-d': `${delay}ms` }} {...rest}>
      {children}
    </Tag>
  );
}

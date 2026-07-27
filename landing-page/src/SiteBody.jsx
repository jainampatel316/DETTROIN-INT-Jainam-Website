import { useEffect, useRef, useState } from 'react';
import './SiteBody.css';

import {
  GraduationCap, BookOpen, FlaskConical, Bus, ShieldCheck, Users,
  Sparkles, HeartHandshake, Trophy, Palette, Compass, Phone, Mail,
  MapPin, ArrowRight, Star, Baby, School, Backpack, Sun,
} from 'lucide-react';

const EIS = 'https://excellenceinternationalschool.com/wp-content/uploads/2026/03';

/* ─── Scroll-reveal ─────────────────────────────────── */
function Reveal({ as: Tag = 'div', className = '', delay = 0, children, ...rest }) {
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

/* ─── Section heading block ─────────────────────────── */
function Heading({ kicker, title, lede, tone = 'light', center = true }) {
  return (
    <Reveal className={`sec-head ${center ? 'center' : ''} tone-${tone}`}>
      <span className="kicker">{kicker}</span>
      <h2 className="sec-title">{title}</h2>
      {lede && <p className="sec-lede">{lede}</p>}
    </Reveal>
  );
}

/* ─── Sticky site header with styled dropdowns ──────── */
const MENU = [
  { label: 'Home', href: '#top' },
  { label: 'About Us', href: '#about' },
  {
    label: 'Academics',
    href: '#stages',
    sub: [
      { label: 'Pre Primary', href: '#stages' },
      { label: 'Primary', href: '#stages' },
      { label: 'Middle School', href: '#stages' },
      { label: 'Daycare', href: '#stages' },
    ],
  },
  {
    label: 'Admissions',
    href: '#admissions',
    sub: [
      { label: 'Inquiry Form', href: '#admissions' },
      { label: 'Admission Procedure', href: '#admissions' },
    ],
  },
  { label: 'Facilities', href: '#why' },
  { label: 'Gallery', href: '#stages' },
  { label: 'Contact Us', href: '#contact' },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <a className="sh-brand" href="#top" aria-label="Excellence International School — home">
        <img src="/Excellence-Logo.png.webp" alt="" className="sh-emblem" draggable="false" />
      </a>

      <nav className="sh-nav" aria-label="Site">
        {MENU.map((item) =>
          item.sub ? (
            <div className="sh-item has-sub" key={item.label}>
              <a href={item.href} className="sh-link" aria-haspopup="true">
                {item.label}
                <i className="sh-caret" />
              </a>
              <div className="sh-drop">
                {item.sub.map((s) => (
                  <a key={s.label} href={s.href} className="sh-drop-link">
                    {s.label}
                    <ArrowRight size={13} strokeWidth={2} />
                  </a>
                ))}
              </div>
            </div>
          ) : (
            <div className="sh-item" key={item.label}>
              <a href={item.href} className="sh-link">
                {item.label}
              </a>
            </div>
          ),
        )}
      </nav>

      <a className="sh-cta" href="#admissions">
        Enquire Now
      </a>
    </header>
  );
}

/* ─── About ─────────────────────────────────────────── */
function About() {
  return (
    <section className="sec" id="about">
      <div className="wrap grid-2">
        <Reveal className="about-copy">
          <span className="kicker">About the School</span>
          <h2 className="sec-title">
            Where character, discipline and learning <em>grow together</em>
          </h2>
          <p>
            Excellence International School, on Ramghat Road in Aligarh, is built around a simple
            conviction — that a child who feels safe, seen and inspired will learn without limits.
          </p>
          <p>
            From Play Group to Class 8, our classrooms pair a strong academic core with
            experiential, concept-based learning, so curiosity turns into understanding and
            understanding into confidence.
          </p>
          <div className="about-points">
            <div className="a-point">
              <GraduationCap size={20} strokeWidth={1.8} />
              <span>Play Group to Class 8</span>
            </div>
            <div className="a-point">
              <Sparkles size={20} strokeWidth={1.8} />
              <span>STREAM &amp; skill-based learning</span>
            </div>
            <div className="a-point">
              <ShieldCheck size={20} strokeWidth={1.8} />
              <span>Safe, secure campus</span>
            </div>
            <div className="a-point">
              <HeartHandshake size={20} strokeWidth={1.8} />
              <span>Value-based education</span>
            </div>
          </div>
        </Reveal>

        <Reveal className="about-visual" delay={120}>
          <div className="about-photo" style={{ backgroundImage: `url("${EIS}/Pre-Primary-School.png")` }} />
          <div className="about-card">
            <span className="ac-num">Est.</span>
            <span className="ac-label">Shaping future leaders through quality education in Aligarh</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Vision & Mission ──────────────────────────────── */
function VisionMission() {
  return (
    <section className="sec sec-dark" id="vision">
      <div className="wrap">
        <Heading
          tone="dark"
          kicker="Our Compass"
          title={<>Vision &amp; Mission</>}
          lede="The two commitments every classroom, teacher and programme answers to."
        />
        <div className="vm-grid">
          <Reveal className="vm-card">
            <div className="vm-icon"><Compass size={26} strokeWidth={1.6} /></div>
            <h3>Vision</h3>
            <p>
              To create confident, responsible and innovative individuals who contribute
              positively to society.
            </p>
          </Reveal>
          <Reveal className="vm-card" delay={130}>
            <div className="vm-icon"><Trophy size={26} strokeWidth={1.6} /></div>
            <h3>Mission</h3>
            <ul>
              <li>Deliver high-quality, future-ready education</li>
              <li>Encourage curiosity, creativity and independent thought</li>
              <li>Build discipline, empathy and strength of character</li>
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── Academic stages ───────────────────────────────── */
const STAGES = [
  {
    title: 'Pre-Primary School',
    text: 'Early childhood as it should be — curiosity, creativity and first skills nurtured in a joyful, unhurried environment.',
    img: `${EIS}/Pre-Primary-School.png`,
    tint: '#f9e7b4',
    Icon: Baby,
  },
  {
    title: 'Primary School',
    text: 'A strong academic core takes shape while independent learning and questioning are actively encouraged.',
    img: `${EIS}/Primary-School.png`,
    tint: '#bdeaff',
    Icon: Backpack,
  },
  {
    title: 'Middle School',
    text: 'Students step into advanced learning with analytical thinking, responsibility and study discipline.',
    img: `${EIS}/Middle.png`,
    tint: '#e7c9ff',
    Icon: School,
  },
  {
    title: 'Daycare',
    text: 'A warm, safe and engaging space where the youngest members of our community are cared for like family.',
    img: `${EIS}/Daycare.png`,
    tint: '#beffda',
    Icon: Sun,
  },
];

function Stages() {
  return (
    <section className="sec" id="stages">
      <div className="wrap">
        <Heading
          kicker="Our Academics"
          title="Academic Stages"
          lede="One continuous journey, four thoughtfully designed stages."
        />
        <div className="stage-grid">
          {STAGES.map((s, i) => (
            <Reveal className="stage-card" key={s.title} delay={i * 90}>
              <div className="stage-media" style={{ '--tint': s.tint }}>
                <img
                  src={s.img}
                  alt={s.title}
                  loading="lazy"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                <span className="stage-badge"><s.Icon size={18} strokeWidth={1.8} /></span>
              </div>
              <div className="stage-body">
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <a href="#admissions" className="stage-link">
                  Admission details <ArrowRight size={14} strokeWidth={2} />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Why us ────────────────────────────────────────── */
const WHY = [
  { Icon: BookOpen, title: 'Strong Academic System', text: 'A rigorous, well-sequenced curriculum that builds real understanding, not rote habit.' },
  { Icon: Users, title: 'Experienced, Dedicated Faculty', text: 'Teachers who know every child by name — and by strength.' },
  { Icon: FlaskConical, title: 'STREAM Education', text: 'Science, technology, reading, engineering, arts and maths woven into everyday learning.' },
  { Icon: Sparkles, title: 'Skill-Based Learning', text: 'Communication, problem-solving and life skills practised, not just preached.' },
  { Icon: ShieldCheck, title: 'Safe & Secure Campus', text: 'A monitored, caring environment where parents can be at ease.' },
  { Icon: Bus, title: 'Transportation Facility', text: 'Safe and convenient transport across Aligarh.' },
];

function WhyUs() {
  return (
    <section className="sec sec-mist" id="why">
      <div className="wrap">
        <Heading
          kicker="Why Families Choose Us"
          title="The best of Aligarh, by design"
          lede="Modern infrastructure and a positive, motivating learning environment — every detail serves the child."
        />
        <div className="why-grid">
          {WHY.map((w, i) => (
            <Reveal className="why-card" key={w.title} delay={(i % 3) * 90}>
              <div className="why-icon"><w.Icon size={22} strokeWidth={1.7} /></div>
              <h3>{w.title}</h3>
              <p>{w.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Holistic development ──────────────────────────── */
const HOLISTIC = [
  { Icon: BookOpen, label: 'Concept-Based Learning' },
  { Icon: FlaskConical, label: 'Experiential Learning' },
  { Icon: HeartHandshake, label: 'Community Service' },
  { Icon: Trophy, label: 'Physical Development' },
  { Icon: Palette, label: 'Cultural & Creative Activities' },
  { Icon: Sparkles, label: 'Personality & Life Skills' },
];

function Holistic() {
  return (
    <section className="sec" id="holistic">
      <div className="wrap">
        <Heading
          kicker="Beyond the Classroom"
          title="Holistic Development Approach"
          lede="Sport, stage, service and self — every child gets the whole picture."
        />
        <div className="hol-row">
          {HOLISTIC.map((hItem, i) => (
            <Reveal className="hol-chip" key={hItem.label} delay={i * 70}>
              <hItem.Icon size={19} strokeWidth={1.7} />
              <span>{hItem.label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Values band ───────────────────────────────────── */
const SITE_VALUES = [
  { label: 'Honesty', tint: '#fcdeae' },
  { label: 'Integrity', tint: '#f9f1b4' },
  { label: 'Respect', tint: '#beffda' },
  { label: 'Discipline', tint: '#bdeaff' },
  { label: 'Compassion', tint: '#e7c9ff' },
  { label: 'Responsibility', tint: '#ffc1c4' },
];

function Values() {
  return (
    <section className="sec sec-dark" id="values">
      <div className="wrap">
        <Heading
          tone="dark"
          kicker="Value-Based Education"
          title="Six values, taught daily"
          lede="The same halo of values that opens this page lives in every classroom."
        />
        <div className="val-row">
          {SITE_VALUES.map((v, i) => (
            <Reveal className="val-pill" key={v.label} delay={i * 70}>
              <span className="val-dot" style={{ background: v.tint }} />
              {v.label}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Testimonials ──────────────────────────────────── */
function Testimonials() {
  return (
    <section className="sec" id="testimonials">
      <div className="wrap">
        <Heading
          kicker="Testimonials"
          title="What parents say"
          lede="Trust is earned one child at a time."
        />
        <div className="tst-grid">
          <Reveal className="tst-card">
            <div className="tst-stars">
              {Array.from({ length: 5 }, (_, i) => <Star key={i} size={15} strokeWidth={0} />)}
            </div>
            <p>
              “Excellence International School has been amazing for my child. The teachers are
              caring, lessons are fun, and my child is growing in confidence every single day.”
            </p>
            <div className="tst-who">
              <span className="tst-avatar">RS</span>
              <div>
                <strong>Rakesh Sharma</strong>
                <small>Parent</small>
              </div>
            </div>
          </Reveal>

          <Reveal className="tst-card" delay={110}>
            <div className="tst-stars">
              {Array.from({ length: 5 }, (_, i) => <Star key={i} size={15} strokeWidth={0} />)}
            </div>
            <p>
              “Learning here is exciting — hands-on activities, group projects and creative
              lessons. My child is developing genuine critical-thinking skills.”
            </p>
            <div className="tst-who">
              <span className="tst-avatar">AS</span>
              <div>
                <strong>Anita Singh</strong>
                <small>Parent of Krish Patel, Class 6</small>
              </div>
            </div>
          </Reveal>

          <Reveal className="tst-card tst-cta" delay={220}>
            <h3>Come see it yourself</h3>
            <p>
              The best way to know a school is to walk through it. Visit us on Ramghat Road, or
              start with a quick enquiry — we’ll take it from there.
            </p>
            <a href="#admissions" className="btn-gold">
              Book a visit <ArrowRight size={15} strokeWidth={2.2} />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── Custom select (replaces default dropdowns) ────── */
function CustomSelect({ options, value, onChange, placeholder, label }) {
  const [open, setOpen] = useState(false);
  const [hi, setHi] = useState(-1);
  const rootRef = useRef(null);

  useEffect(() => {
    const onDoc = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener('pointerdown', onDoc);
    return () => document.removeEventListener('pointerdown', onDoc);
  }, []);

  const commit = (i) => {
    onChange(options[i]);
    setOpen(false);
  };

  const onKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (open && hi >= 0) commit(hi);
      else setOpen(true);
    } else if (e.key === 'Escape') {
      setOpen(false);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
      setHi((h) => Math.min(options.length - 1, h + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHi((h) => Math.max(0, h - 1));
    }
  };

  return (
    <div className={`eis-select${open ? ' open' : ''}`} ref={rootRef}>
      <button
        type="button"
        className="eis-select-btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onKey}
      >
        <span className={value ? '' : 'is-placeholder'}>{value || placeholder}</span>
        <i className="eis-caret" />
      </button>
      <ul className="eis-list" role="listbox" aria-label={label}>
        {options.map((opt, i) => (
          <li
            key={opt}
            role="option"
            aria-selected={opt === value}
            className={`eis-opt${opt === value ? ' selected' : ''}${i === hi ? ' hi' : ''}`}
            onMouseEnter={() => setHi(i)}
            onClick={() => commit(i)}
          >
            {opt}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─── Admissions / enquiry ──────────────────────────── */
const GRADES = [
  'Play Group', 'Nursery', 'LKG', 'UKG',
  'Class 1', 'Class 2', 'Class 3', 'Class 4',
  'Class 5', 'Class 6', 'Class 7', 'Class 8',
];

function Admissions() {
  const [grade, setGrade] = useState('');
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section className="sec sec-mist" id="admissions">
      <div className="wrap grid-2 adm-grid">
        <Reveal className="adm-copy">
          <span className="kicker">Admissions Open</span>
          <h2 className="sec-title">
            Begin the journey <em>with one enquiry</em>
          </h2>
          <p>
            Admissions are open across multiple academic levels, subject to seat availability.
            Share a few details and our admissions team will call you back with the procedure,
            fees and next steps.
          </p>
          <div className="adm-contacts">
            <a className="adm-chip" href="tel:+917055582117">
              <Phone size={17} strokeWidth={1.8} /> +91 70555 82117
            </a>
            <a className="adm-chip" href="mailto:info@excellenceinternationalschool.com">
              <Mail size={17} strokeWidth={1.8} /> info@excellenceinternationalschool.com
            </a>
            <span className="adm-chip">
              <MapPin size={17} strokeWidth={1.8} /> Ramghat Road, Aligarh 202001
            </span>
          </div>
        </Reveal>

        <Reveal className="adm-form-card" delay={130}>
          {sent ? (
            <div className="adm-success">
              <span className="adm-success-ring"><GraduationCap size={28} strokeWidth={1.6} /></span>
              <h3>Thank you!</h3>
              <p>
                Your enquiry has been noted{grade ? ` for ${grade}` : ''}. Our admissions team
                will reach out shortly.
              </p>
              <button type="button" className="btn-ghost" onClick={() => setSent(false)}>
                Send another enquiry
              </button>
            </div>
          ) : (
            <form className="adm-form" onSubmit={submit}>
              <h3>Quick Enquiry</h3>
              <div className="f-row">
                <div className="f-field">
                  <label htmlFor="f-name">Parent’s name</label>
                  <input id="f-name" type="text" placeholder="Your full name" required />
                </div>
                <div className="f-field">
                  <label htmlFor="f-phone">Phone</label>
                  <input id="f-phone" type="tel" placeholder="+91" required />
                </div>
              </div>
              <div className="f-field">
                <label>Seeking admission for</label>
                <CustomSelect
                  label="Class"
                  options={GRADES}
                  value={grade}
                  onChange={setGrade}
                  placeholder="Select a class"
                />
              </div>
              <div className="f-field">
                <label htmlFor="f-msg">Message <span className="opt">(optional)</span></label>
                <textarea id="f-msg" rows="3" placeholder="Anything you’d like us to know" />
              </div>
              <button className="btn-gold btn-block" type="submit">
                Submit enquiry <ArrowRight size={15} strokeWidth={2.2} />
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/* ─── FAQ accordion (fully styled, animated) ────────── */
const FAQS = [
  {
    q: 'Where is Excellence International School located?',
    a: 'The school is on Ramghat Road, Aligarh 202001, Uttar Pradesh — easily reachable from across the city, with safe transport available.',
  },
  {
    q: 'Which classes are available for admission?',
    a: 'Admissions are open from Play Group through Class 8, along with Daycare, depending on seat availability in each level.',
  },
  {
    q: 'Does the school provide extracurricular activities?',
    a: 'Yes — students take part in sports, cultural and creative activities, visual and performing arts, community service and personality-development programmes.',
  },
  {
    q: 'Is transportation available for students?',
    a: 'Yes. The school runs a safe, convenient and monitored transportation facility covering Aligarh.',
  },
  {
    q: 'What makes Excellence International School one of the best schools in Aligarh?',
    a: 'A strong academic system, experienced faculty, STREAM and skill-based learning, a secure campus and a genuine commitment to value-based education — all under one roof.',
  },
];

function Faq() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section className="sec" id="faq">
      <div className="wrap wrap-narrow">
        <Heading
          kicker="Good to Know"
          title="Frequently Asked Questions"
        />
        <div className="faq-list">
          {FAQS.map((f, i) => {
            const open = openIdx === i;
            return (
              <Reveal className={`faq-item${open ? ' open' : ''}`} key={i} delay={i * 60}>
                <button
                  type="button"
                  className="faq-q"
                  aria-expanded={open}
                  onClick={() => setOpenIdx(open ? -1 : i)}
                >
                  <span>{f.q}</span>
                  <i className="faq-icon" aria-hidden="true" />
                </button>
                <div className="faq-a-wrap">
                  <div className="faq-a">
                    <p>{f.a}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="wrap foot-grid">
        <div className="foot-brand">
          <img src="/Excellence-Logo.png.webp" alt="" className="foot-emblem" draggable="false" />
          <h3>
            Excellence International <em>School</em>
          </h3>
          <p>Character · Discipline · Learning — shaping future leaders through quality education in Aligarh.</p>
        </div>

        <div className="foot-col">
          <h4>Quick Links</h4>
          <a href="#about">About Us</a>
          <a href="#stages">Academics</a>
          <a href="#admissions">Admissions</a>
          <a href="#why">Facilities</a>
          <a href="#faq">FAQs</a>
        </div>

        <div className="foot-col">
          <h4>Academics</h4>
          <a href="#stages">Pre-Primary School</a>
          <a href="#stages">Primary School</a>
          <a href="#stages">Middle School</a>
          <a href="#stages">Daycare</a>
        </div>

        <div className="foot-col foot-contact">
          <h4>Contact Us</h4>
          <a href="tel:+917055582117"><Phone size={15} strokeWidth={1.8} /> +91 70555 82117</a>
          <a href="mailto:info@excellenceinternationalschool.com"><Mail size={15} strokeWidth={1.8} /> info@excellenceinternationalschool.com</a>
          <span><MapPin size={15} strokeWidth={1.8} /> Ramghat Road, Aligarh 202001, Uttar Pradesh</span>
        </div>
      </div>

      <div className="foot-bar">
        <div className="wrap foot-bar-in">
          <span>© {new Date().getFullYear()} Excellence International School</span>
          <span>Aligarh · Uttar Pradesh · India</span>
        </div>
      </div>
    </footer>
  );
}

/* ─── Page body below the hero ──────────────────────── */
export default function SiteBody() {
  return (
    <div className="site-body" id="top">
      <main>
        <About />
        <VisionMission />
        <Stages />
        <WhyUs />
        <Holistic />
        <Values />
        <Testimonials />
        <Admissions />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}

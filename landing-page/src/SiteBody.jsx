import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import * as Tabs from '@radix-ui/react-tabs';
import './SiteBody.css';

import Reveal from './components/Reveal';
import Heading from './components/Heading';
import EisSelect from './components/EisSelect';
import EisAccordion from './components/EisAccordion';

import {
  GraduationCap, BookOpen, FlaskConical, Bus, ShieldCheck, Users,
  Sparkles, HeartHandshake, Trophy, Palette, Phone, Mail,
  MapPin, ArrowRight, Star, Baby, School, Backpack, Sun,
} from 'lucide-react';

const EIS = 'https://excellenceinternationalschool.com/wp-content/uploads/2026/03';

/* ─── Sticky site header with styled dropdowns ──────── */
const MENU = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about-us' },
  {
    label: 'Academics',
    to: '/#stages',
    sub: [
      { label: 'Pre Primary', to: '/#stages' },
      { label: 'Primary', to: '/#stages' },
      { label: 'Middle School', to: '/#stages' },
      { label: 'Daycare', to: '/#stages' },
    ],
  },
  {
    label: 'Admissions',
    to: '/#admissions',
    sub: [
      { label: 'Inquiry Form', to: '/#admissions' },
      { label: 'Admission Procedure', to: '/#admissions' },
    ],
  },
  { label: 'Facilities', to: '/#why' },
  { label: 'Gallery', to: '/#stages' },
  { label: 'Contact Us', to: '/#contact' },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="sh-brand" to="/" aria-label="Excellence International School home">
        <img src="/Excellence-Logo.png.webp" alt="" className="sh-emblem" draggable="false" />
      </Link>

      <nav className="sh-nav" aria-label="Site">
        {MENU.map((item) =>
          item.sub ? (
            <div className="sh-item has-sub" key={item.label}>
              <Link to={item.to} className="sh-link" aria-haspopup="true">
                {item.label}
                <i className="sh-caret" />
              </Link>
              <div className="sh-drop">
                {item.sub.map((s) => (
                  <Link key={s.label} to={s.to} className="sh-drop-link">
                    {s.label}
                    <ArrowRight size={13} strokeWidth={2} />
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="sh-item" key={item.label}>
              <Link to={item.to} className="sh-link">
                {item.label}
              </Link>
            </div>
          ),
        )}
      </nav>

      <Link className="sh-cta" to="/#admissions">
        Enquire Now
      </Link>
    </header>
  );
}

/* ─── About ─────────────────────────────────────────── */
function About() {
  return (
    <section className="sec" id="about">
      <div className="wrap grid-2">
        <Reveal className="about-copy">
          <h2 className="sec-title">
            Where character, discipline and learning <em>grow together</em>
          </h2>
          <p>
            Excellence International School, on Ramghat Road in Aligarh, is built around a simple
            conviction: that a child who feels safe, seen and inspired will learn without limits.
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

/* ─── Vision & Mission: editorial tabbed statement ─── */
const VM_TABS = [
  {
    id: 'vision',
    tab: 'Vision',
    index: '01',
    statement: 'To create confident, responsible and innovative individuals who contribute positively to society.',
    note: 'Every lesson, activity and interaction on campus is measured against this one sentence.',
    points: [
      { k: 'Confident', v: 'Children who speak, question and lead without hesitation.' },
      { k: 'Responsible', v: 'An early, lasting sense of ownership and integrity.' },
      { k: 'Innovative', v: 'Minds trained to make things, not just memorise them.' },
    ],
  },
  {
    id: 'mission',
    tab: 'Mission',
    index: '02',
    statement: 'To deliver education that is rigorous, joyful and genuinely future-ready.',
    note: 'Three working commitments our faculty holds itself to, every term.',
    points: [
      { k: 'Teach with depth', v: 'High-quality, concept-based instruction over rote learning.' },
      { k: 'Spark curiosity', v: 'Creativity and independent thought encouraged daily.' },
      { k: 'Build character', v: 'Discipline, empathy and strength of character, deliberately.' },
    ],
  },
];

function VisionMission() {
  return (
    <section className="sec sec-dark" id="vision">
      <div className="wrap">
        <Heading
          tone="dark"
          title={<>Vision &amp; Mission</>}
          lede="The two commitments every classroom, teacher and programme answers to."
        />

        <Reveal className="vm-shell">
          <Tabs.Root defaultValue="vision" className="vm-tabs">
            <Tabs.List className="vm-tablist" aria-label="Vision and Mission">
              {VM_TABS.map((t) => (
                <Tabs.Trigger key={t.id} value={t.id} className="vm-trigger">
                  <span className="vm-trigger-idx">{t.index}</span>
                  {t.tab}
                </Tabs.Trigger>
              ))}
            </Tabs.List>

            {VM_TABS.map((t) => (
              <Tabs.Content key={t.id} value={t.id} className="vm-panel">
                <div className="vm-statement">
                  <span className="vm-quote" aria-hidden="true">“</span>
                  <p className="vm-lead">{t.statement}</p>
                  <p className="vm-note">{t.note}</p>
                </div>
                <ul className="vm-points">
                  {t.points.map((p, i) => (
                    <li key={p.k} style={{ '--i': i }}>
                      <span className="vm-point-num">{String(i + 1).padStart(2, '0')}</span>
                      <div>
                        <strong>{p.k}</strong>
                        <span>{p.v}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </Tabs.Content>
            ))}
          </Tabs.Root>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── The academic journey ──────────────────────────── */
const JOURNEY = [
  {
    n: '01',
    title: 'Daycare',
    ages: 'Ages 1 – 3',
    span: 'First steps',
    text: 'A warm, safe and engaging space where our youngest are cared for like family. The first day away from home should still feel like home.',
    img: `${EIS}/day-care.png`,
    tint: '#beffda',
    Icon: Sun,
  },
  {
    n: '02',
    title: 'Pre-Primary School',
    ages: 'Ages 3 – 5',
    span: 'Play Group to UKG',
    text: 'Early childhood as it should be, with curiosity, creativity and first skills nurtured in a joyful, unhurried environment.',
    img: `${EIS}/Pre-Primary-School.png`,
    tint: '#f9e7b4',
    Icon: Baby,
  },
  {
    n: '03',
    title: 'Primary School',
    ages: 'Ages 6 – 10',
    span: 'Class 1 to 5',
    text: 'The academic core takes shape. Reading, reasoning and independent learning are encouraged until curiosity becomes capability.',
    img: `${EIS}/Primary-School.png`,
    tint: '#bdeaff',
    Icon: Backpack,
  },
  {
    n: '04',
    title: 'Middle School',
    ages: 'Ages 11 – 13',
    span: 'Class 6 to 8',
    text: 'Students step into advanced learning with analytical thinking, responsibility and the study discipline that carries them onward.',
    img: `${EIS}/Middle.png`,
    tint: '#e7c9ff',
    Icon: School,
  },
];

function Stages() {
  const railRef = useRef(null);

  /* Scroll-driven rail: the gold path fills and milestones light up as
     the reader descends, so the section reads as a journey travelled */
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const stops = Array.from(rail.querySelectorAll('.jr-stop'));
    let raf = 0;

    const update = () => {
      raf = 0;
      const r = rail.getBoundingClientRect();
      const playhead = window.innerHeight * 0.62;
      const p = Math.min(1, Math.max(0, (playhead - r.top) / r.height));
      rail.style.setProperty('--jp', p.toFixed(4));
      for (const s of stops) {
        const sr = s.getBoundingClientRect();
        s.classList.toggle('reached', sr.top + sr.height * 0.4 <= playhead);
      }
    };

    const onScroll = () => {
      if (document.hidden) { update(); return; }
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
    <section className="sec" id="stages">
      <div className="wrap">
        <Heading
          title={<>One journey, from first steps <em>to Class 8</em></>}
          lede="Twelve years of growing up, mapped as a single continuous path, each stage built on the one before it."
        />

        <div className="journey" ref={railRef}>
          <span className="jr-track" aria-hidden="true" />
          <span className="jr-fill" aria-hidden="true" />

          <div className="jr-cap jr-cap-start">
            <span className="jr-cap-dot" />
            <span className="jr-cap-label">The journey begins</span>
          </div>

          <ol className="jr-list">
            {JOURNEY.map((s) => (
              <li className="jr-stop" key={s.title}>
                <span className="jr-node" aria-hidden="true">
                  <s.Icon size={19} strokeWidth={1.8} />
                </span>

                <article className="jr-card">
                  <div className="jr-media" style={{ '--tint': s.tint }}>
                    <img
                      src={s.img}
                      alt={s.title}
                      loading="lazy"
                      onError={(e) => { e.currentTarget.style.visibility = 'hidden'; }}
                    />
                    <span className="jr-ages">{s.ages}</span>
                  </div>
                  <div className="jr-body">
                    <span className="jr-meta">
                      <b>{s.n}</b> {s.span}
                    </span>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                    <Link to="/#admissions" className="stage-link">
                      Admission details <ArrowRight size={14} strokeWidth={2} />
                    </Link>
                  </div>
                </article>
              </li>
            ))}
          </ol>

          <div className="jr-cap jr-cap-end">
            <span className="jr-cap-dot" />
            <span className="jr-cap-label">…and onward, ready for what follows</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Why us ────────────────────────────────────────── */
const WHY = [
  { Icon: BookOpen, title: 'Strong Academic System', text: 'A rigorous, well-sequenced curriculum that builds real understanding, not rote habit.' },
  { Icon: Users, title: 'Experienced, Dedicated Faculty', text: 'Teachers who know every child by name, and by strength.' },
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
          title="The best of Aligarh, by design"
          lede="Modern infrastructure and a positive, motivating learning environment. Every detail serves the child."
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
          title="Holistic Development Approach"
          lede="Sport, stage, service and self. Every child gets the whole picture."
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
  { label: 'Honesty', tint: '#fcdeae', img: `${EIS}/Honesty1.png` },
  { label: 'Integrity', tint: '#f9f1b4', img: `${EIS}/integrity1.png` },
  { label: 'Respect', tint: '#beffda', img: `${EIS}/Respect1.png` },
  { label: 'Discipline', tint: '#bdeaff', img: `${EIS}/Discipline01.png` },
  { label: 'Compassion', tint: '#e7c9ff', img: `${EIS}/Compassion01.png` },
  { label: 'Responsibility', tint: '#ffc1c4', img: `${EIS}/Responsibility01.png` },
];

function Values() {
  return (
    <section className="sec sec-dark" id="values">
      <div className="wrap">
        <Heading
          tone="dark"
          title={<>Value-Based <em>Education</em></>}
          lede="Excellence International School strongly believes in developing moral values alongside academic excellence."
        />
        <div className="val-row">
          {SITE_VALUES.map((v, i) => (
            <Reveal className="val-card" key={v.label} delay={i * 80} style={{ '--tint': v.tint }}>
              <span className="val-badge">
                <img src={v.img} alt="" loading="lazy" />
              </span>
              <span className="val-name">{v.label}</span>
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
              “Learning here is exciting, with hands-on activities, group projects and creative
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
              start with a quick enquiry and we’ll take it from there.
            </p>
            <Link to="/#admissions" className="btn-gold">
              Book a visit <ArrowRight size={15} strokeWidth={2.2} />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
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
                <EisSelect
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
    a: 'The school is on Ramghat Road, Aligarh 202001, Uttar Pradesh, easily reachable from across the city, with safe transport available.',
  },
  {
    q: 'Which classes are available for admission?',
    a: 'Admissions are open from Play Group through Class 8, along with Daycare, depending on seat availability in each level.',
  },
  {
    q: 'Does the school provide extracurricular activities?',
    a: 'Yes. Students take part in sports, cultural and creative activities, visual and performing arts, community service and personality-development programmes.',
  },
  {
    q: 'Is transportation available for students?',
    a: 'Yes. The school runs a safe, convenient and monitored transportation facility covering Aligarh.',
  },
  {
    q: 'What makes Excellence International School one of the best schools in Aligarh?',
    a: 'A strong academic system, experienced faculty, STREAM and skill-based learning, a secure campus and a genuine commitment to value-based education, all under one roof.',
  },
];

function Faq() {
  return (
    <section className="sec" id="faq">
      <div className="wrap wrap-narrow">
        <Heading
          title="Frequently Asked Questions"
        />
        <Reveal>
          <EisAccordion items={FAQS} defaultOpen={0} />
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Footer ────────────────────────────────────────── */
export function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="wrap foot-grid">
        <div className="foot-brand">
          <img src="/Excellence-Logo.png.webp" alt="" className="foot-emblem" draggable="false" />
          <h3>
            Excellence International <em>School</em>
          </h3>
          <p>Character · Discipline · Learning. Shaping future leaders through quality education in Aligarh.</p>
        </div>

        <div className="foot-col">
          <h4>Quick Links</h4>
          <Link to="/about-us">About Us</Link>
          <Link to="/#stages">Academics</Link>
          <Link to="/#admissions">Admissions</Link>
          <Link to="/#why">Facilities</Link>
          <Link to="/#faq">FAQs</Link>
        </div>

        <div className="foot-col">
          <h4>Academics</h4>
          <Link to="/#stages">Pre-Primary School</Link>
          <Link to="/#stages">Primary School</Link>
          <Link to="/#stages">Middle School</Link>
          <Link to="/#stages">Daycare</Link>
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

import { Link } from 'react-router-dom';
import './SiteBody.css';
import './AboutPage.css';

import Reveal from './components/Reveal';
import Heading from './components/Heading';
import Airship from './components/Airship';
import { Footer } from './SiteBody';

import {
  BookOpen, Sparkles, Building2, Users, ShieldCheck, HeartHandshake,
  Check, ArrowRight, Phone, Compass, Target,
} from 'lucide-react';

const EIS = 'https://excellenceinternationalschool.com/wp-content/uploads/2026/03';

/* What the school aims to develop in every student */
const VISION_POINTS = [
  'Think independently',
  'Act responsibly',
  'Respect values and discipline',
  'Contribute positively to society',
  'Excel in academics and life',
];

const MISSION_POINTS = [
  'High academic standards',
  'Value-based education',
  'A modern learning environment',
  'Skill development opportunities',
  'A safe and disciplined campus',
];

/* The six pillars the school is built on */
const PILLARS = [
  {
    title: 'Academic Excellence',
    Icon: BookOpen,
    img: `${EIS}/Concept-Based-Learning.png`,
    text: 'A structured academic system built on concept clarity and strong learning foundations.',
    points: [
      'Well-planned syllabus coverage',
      'Regular assessments and evaluations',
      'Concept-based teaching methods',
      'Practical and activity-based learning',
      'Continuous performance monitoring',
    ],
  },
  {
    title: 'Holistic Development',
    Icon: Sparkles,
    img: `${EIS}/Cultural-and-Creative-Activities.png`,
    text: 'Education here goes well beyond the classroom, because a child is more than a report card.',
    points: [
      'Sports and physical education',
      'Cultural programs and competitions',
      'Music, dance, and creative arts',
      'Leadership and personality development',
      'Public speaking and communication skills',
    ],
  },
  {
    title: 'Modern Infrastructure',
    Icon: Building2,
    img: `${EIS}/Middle.png`,
    text: 'Facilities designed so that every lesson can be seen, touched and tried, not only heard.',
    points: [
      'Smart and interactive classrooms',
      'Science laboratories',
      'Computer laboratory',
      'Mathematics learning spaces',
      'Library with educational resources',
      'Activity and creative learning rooms',
    ],
  },
  {
    title: 'Experienced Faculty',
    Icon: Users,
    img: `${EIS}/Experienced-and-Dedicated-Faculty-1.png`,
    text: 'Teachers shape futures. Ours are qualified, dedicated and genuinely invested in every student.',
    points: [
      'Knowledgeable and professionally trained',
      'Student-focused and supportive',
      'Committed to academic excellence',
      'Dedicated to mentoring and guidance',
    ],
  },
  {
    title: 'Safe & Disciplined Campus',
    Icon: ShieldCheck,
    img: `${EIS}/Primary-School.png`,
    text: 'A secure, structured environment is the precondition for real learning, not an afterthought.',
    points: [
      'CCTV monitoring',
      'Well-defined discipline policies',
      'Supervised activities and classrooms',
      'Secure entry and exit systems',
      'Safe and supervised campus environment',
    ],
  },
  {
    title: 'Values & Ethics',
    Icon: HeartHandshake,
    img: `${EIS}/Personality-Development-and-Life-Skills.png`,
    text: 'Character is taught as deliberately as any subject on the timetable.',
    points: ['Honesty', 'Respect', 'Responsibility', 'Discipline', 'Integrity'],
  },
];

const COMMITMENTS = [
  'Delivering high-quality education',
  'Maintaining strong academic standards',
  'Providing modern learning facilities',
  'Ensuring student safety and discipline',
];

/* ─── Page banner ───────────────────────────────────── */
function PageHero() {
  return (
    <header className="pg-hero">
      <div className="wrap pg-hero-in">
        <div className="pg-hero-copy">
          <Reveal className="pg-crumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <b>About Us</b>
          </Reveal>
          <Reveal className="pg-title-wrap" delay={90}>
            <h1 className="pg-title">
              About <em>Us</em>
            </h1>
            <p className="pg-lede">
              Excellence International School, a leading school on Ramghat Road in Aligarh, where
              academics, values and personal growth are treated as one continuous education.
            </p>
          </Reveal>
        </div>

        <Reveal className="pg-hero-art" delay={200}>
          <Airship />
        </Reveal>
      </div>
    </header>
  );
}

/* ─── Who we are ────────────────────────────────────── */
function Intro() {
  return (
    <section className="sec" id="who">
      <div className="wrap grid-2">
        <Reveal className="about-copy">
          <h2 className="sec-title">
            A leading school in <em>Aligarh</em>
          </h2>
          <p>
            Excellence International School was built on a straightforward belief: that quality
            education is not only about results, but about the kind of person a child becomes on
            the way to them.
          </p>
          <p>
            From Play Group through Class 8, students learn in an environment that is structured
            enough to give them discipline and warm enough to let them take risks. Strong
            academics, modern facilities and a steady moral compass work together rather than
            competing for attention.
          </p>
          <div className="intro-stats">
            <div className="i-stat">
              <b>Play Group – Class 8</b>
              <span>Academic span</span>
            </div>
            <div className="i-stat">
              <b>Ramghat Road</b>
              <span>Aligarh, Uttar Pradesh</span>
            </div>
            <div className="i-stat">
              <b>STREAM</b>
              <span>Skill-based learning</span>
            </div>
          </div>
        </Reveal>

        <Reveal className="about-visual" delay={120}>
          <div
            className="about-photo"
            style={{ backgroundImage: `url("${EIS}/Pre-Primary-School.png")` }}
          />
          <div className="about-card">
            <span className="ac-label">
              Academics, values, discipline and personal development, in balance.
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Vision & Mission ──────────────────────────────── */
function VisionMission() {
  return (
    <section className="sec sec-dark" id="vision-mission">
      <div className="wrap">
        <Heading
          tone="dark"
          title={<>Vision &amp; <em>Mission</em></>}
          lede="What we are working towards, and what we promise to provide along the way."
        />
        <div className="vmx-grid">
          <Reveal className="vmx-col">
            <span className="vmx-icon"><Compass size={24} strokeWidth={1.6} /></span>
            <h3>Our Vision</h3>
            <p>
              To be one of the most respected educational institutions in Aligarh, delivering
              quality education that shapes academic excellence, leadership and strong moral
              values. We aim to develop individuals who:
            </p>
            <ul className="vmx-list">
              {VISION_POINTS.map((p) => (
                <li key={p}>
                  <Check size={15} strokeWidth={2.6} />
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="vmx-col" delay={130}>
            <span className="vmx-icon"><Target size={24} strokeWidth={1.6} /></span>
            <h3>Our Mission</h3>
            <p>
              To provide an education that holds together the academic, the practical and the
              personal. Our mission is to provide:
            </p>
            <ul className="vmx-list">
              {MISSION_POINTS.map((p) => (
                <li key={p}>
                  <Check size={15} strokeWidth={2.6} />
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── The six pillars ───────────────────────────────── */
function Pillars() {
  return (
    <section className="sec sec-mist" id="pillars">
      <div className="wrap">
        <Heading
          title={<>What the school is <em>built on</em></>}
          lede="Six commitments that shape daily life at Excellence International School."
        />
        <div className="pil-grid">
          {PILLARS.map((p, i) => (
            <Reveal className="pil-card" key={p.title} delay={(i % 2) * 110}>
              <div className="pil-media">
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  onError={(e) => { e.currentTarget.style.visibility = 'hidden'; }}
                />
                <span className="pil-badge"><p.Icon size={19} strokeWidth={1.8} /></span>
              </div>
              <div className="pil-body">
                <h3>{p.title}</h3>
                <p>{p.text}</p>
                <ul className="pil-list">
                  {p.points.map((pt) => (
                    <li key={pt}>
                      <Check size={14} strokeWidth={2.8} />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Commitment ────────────────────────────────────── */
function Commitment() {
  return (
    <section className="sec sec-dark" id="commitment">
      <div className="wrap">
        <Heading
          tone="dark"
          title={<>Our <em>Commitment</em></>}
          lede="Four things families can hold us to."
        />
        <div className="cmt-row">
          {COMMITMENTS.map((c, i) => (
            <Reveal className="cmt-item" key={c} delay={i * 90}>
              <span className="cmt-num">{String(i + 1).padStart(2, '0')}</span>
              <p>{c}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Join CTA ──────────────────────────────────────── */
function Join() {
  return (
    <section className="sec" id="join">
      <div className="wrap">
        <Reveal className="join-card">
          <h2>
            Join Excellence <em>International School</em>
          </h2>
          <p>
            Choosing the right school plays an important role in shaping a child’s future. We offer
            the balance of academics, values, discipline and personal development that lasts well
            past Class 8. Admissions are open for multiple classes.
          </p>
          <div className="join-actions">
            <Link to="/#admissions" className="btn-gold">
              Start an enquiry <ArrowRight size={15} strokeWidth={2.2} />
            </Link>
            <a href="tel:+917055582117" className="btn-ghost-light">
              <Phone size={15} strokeWidth={2} /> +91 70555 82117
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── About Us page ─────────────────────────────────── */
export default function AboutPage() {
  return (
    <div className="site-body page-body">
      <PageHero />
      <main>
        <Intro />
        <VisionMission />
        <Pillars />
        <Commitment />
        <Join />
      </main>
      <Footer />
    </div>
  );
}

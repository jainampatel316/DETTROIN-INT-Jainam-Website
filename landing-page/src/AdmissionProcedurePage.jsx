import { Link } from 'react-router-dom';
import './SiteBody.css';
import './PageShell.css';
import './AdmissionsPage.css';

import Reveal from './components/Reveal';
import Heading from './components/Heading';
import PageHero from './components/PageHero';
import SchoolGate from './components/SchoolGate';
import { Footer } from './SiteBody';

import {
  ClipboardList, FileText, FolderOpen, CalendarClock, HeartHandshake,
  GraduationCap, PencilRuler, Wallet, Mail, Phone, ArrowRight,
} from 'lucide-react';

/* The registration steps, in the order the school lists them */
const STEPS = [
  {
    Icon: ClipboardList,
    title: 'Visit the front desk',
    text: 'Contact the school front desk to begin registration for the session.',
  },
  {
    Icon: FileText,
    title: 'Collect the forms',
    text: 'Take the admission forms and attach the necessary documents for both student and parents.',
  },
  {
    Icon: FolderOpen,
    title: 'Bring previous records',
    text: 'For direct admission, approach the school with your previous school documents in hand.',
  },
  {
    Icon: CalendarClock,
    title: 'First come, first served',
    text: 'Admission is granted on a first-come, first-served basis, so early registration helps.',
  },
  {
    Icon: HeartHandshake,
    title: 'Single girl child',
    text: 'A special term applies for the single girl child of parents. Ask us for the details.',
  },
];

/* Three things families ask about most */
const NOTES = [
  {
    Icon: GraduationCap,
    title: 'Direct Admission',
    text: 'Direct admission from Play Group to Class VIII is also offered to meritorious students. Contact us with all the necessary documents and we will take it from there.',
  },
  {
    Icon: PencilRuler,
    title: 'Entrance Test',
    text: 'Every application goes through a standard entrance test. It is followed by counselling for the parents and the student, so everyone starts with the same clear picture.',
  },
  {
    Icon: Wallet,
    title: 'Payment Method',
    text: 'Fees can be paid directly at the bank or at the school office. All modes of payment are accepted.',
  },
];

export default function AdmissionProcedurePage() {
  return (
    <div className="site-body page-body">
      <PageHero
        title="Admission"
        accent="Procedure"
        trail={[{ label: 'Admissions' }, { label: 'Procedure' }]}
        lede="Everything that happens between your first visit and your child's first day, set out plainly."
      >
        <SchoolGate />
      </PageHero>

      <main>
        {/* ─── The steps ─── */}
        <section className="sec" id="steps">
          <div className="wrap">
            <Heading
              title={<>How admission <em>works</em></>}
              lede="Five steps, in the order you will meet them."
            />

            {/* Horizontal timeline: the rail fills and each milestone
                lights up in turn once the section scrolls into view */}
            <Reveal className="step-rail">
              <span className="step-track" aria-hidden="true" />
              <span className="step-fill" aria-hidden="true" />

              <ol className="step-list">
                {STEPS.map((s, i) => (
                  <li className="step" key={s.title} style={{ '--i': i }}>
                    <div className="step-mark">
                      <span className="step-num">{String(i + 1).padStart(2, '0')}</span>
                      <span className="step-icon"><s.Icon size={20} strokeWidth={1.8} /></span>
                    </div>
                    <div className="step-body">
                      <h3>{s.title}</h3>
                      <p>{s.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </section>

        {/* ─── Notes ─── */}
        <section className="sec sec-mist" id="notes">
          <div className="wrap">
            <Heading
              title={<>Good to <em>know</em></>}
              lede="The three questions we are asked most often."
            />
            <div className="note-grid">
              {NOTES.map((n, i) => (
                <Reveal className="note-card" key={n.title} delay={i * 100}>
                  <span className="note-icon"><n.Icon size={22} strokeWidth={1.7} /></span>
                  <h3>{n.title}</h3>
                  <p>{n.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Queries ─── */}
        <section className="sec" id="queries">
          <div className="wrap">
            <Reveal className="join-card">
              <h2>
                Have an admission <em>query?</em>
              </h2>
              <p>
                Reach the school directly, or send us an email and our admissions team will get
                back to you with the next steps.
              </p>
              <div className="join-actions">
                <Link to="/admission-enquiry-form" className="btn-gold">
                  Fill the enquiry form <ArrowRight size={15} strokeWidth={2.2} />
                </Link>
                <a className="btn-ghost-light" href="mailto:excellenceinternationalschool@gmail.com">
                  <Mail size={15} strokeWidth={2} /> Email the school
                </a>
                <a className="btn-ghost-light" href="tel:+917055582117">
                  <Phone size={15} strokeWidth={2} /> +91 70555 82117
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

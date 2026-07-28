import { useState } from 'react';
import { Link } from 'react-router-dom';
import './SiteBody.css';
import './PageShell.css';
import './AdmissionsPage.css';

import Reveal from './components/Reveal';
import EisSelect from './components/EisSelect';
import PageHero from './components/PageHero';
import PaperPlane from './components/PaperPlane';
import { Footer } from './SiteBody';

import {
  CalendarRange, ClipboardCheck, PencilRuler, Award, BadgeInfo,
  Send, CheckCircle2, ArrowRight,
} from 'lucide-react';

/* Options taken from the school's own enquiry form */
const SESSIONS = ['2026-2027'];
const BOARDS = ['CBSE'];
const ATTENDANCE = ['Day Scholar'];
const GRADES = [
  'Play Group', 'Nursery', 'Kindergarten', 'Daycare',
  '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th',
];
const GENDERS = ['Male', 'Female'];

/* What the school publishes about how admission is decided */
const INFO = [
  {
    Icon: CalendarRange,
    title: 'Academic session',
    text: 'The academic session runs from April to March.',
  },
  {
    Icon: ClipboardCheck,
    title: 'Registration',
    text: 'Registration opens each year from 1 December. The registration card is filled in and submitted at the school office.',
  },
  {
    Icon: PencilRuler,
    title: 'Written test & interview',
    text: 'A written test is held on a specified date, followed by an interview with the child and their parents.',
  },
  {
    Icon: Award,
    title: 'Granted on merit',
    text: 'Admission is granted on the basis of the child’s performance, purely on merit.',
  },
  {
    Icon: BadgeInfo,
    title: 'Two things to note',
    text: 'The admission form must be completed in full and signed. There is no written test for admission to Nursery.',
  },
];

export default function AdmissionEnquiryPage() {
  const [form, setForm] = useState({
    session: SESSIONS[0],
    board: BOARDS[0],
    attendance: ATTENDANCE[0],
    grade: '',
    gender: '',
  });
  const [sent, setSent] = useState(false);

  const set = (key) => (value) => setForm((f) => ({ ...f, [key]: value }));

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="site-body page-body">
      <PageHero
        title="Admission"
        accent="Enquiry"
        trail={[{ label: 'Admissions' }, { label: 'Enquiry Form' }]}
        lede="Tell us a little about your child and we will come back to you with the procedure, dates and everything else you need."
      >
        <PaperPlane />
      </PageHero>

      <main>
        <section className="sec" id="enquiry">
          <div className="wrap enq-grid">
            {/* ─── Admission information ─── */}
            <div className="enq-info">
              <Reveal>
                <h2 className="sec-title">
                  Admission <em>information</em>
                </h2>
                <p className="enq-intro">
                  How admission is decided at Excellence International School, before you fill
                  anything in.
                </p>
              </Reveal>

              <ol className="info-list">
                {INFO.map((it, i) => (
                  <Reveal as="li" className="info-item" key={it.title} delay={i * 70}>
                    <span className="info-icon"><it.Icon size={19} strokeWidth={1.8} /></span>
                    <div>
                      <h3>{it.title}</h3>
                      <p>{it.text}</p>
                    </div>
                  </Reveal>
                ))}
              </ol>

              <Reveal className="info-cta" delay={120}>
                <span>Want the full step-by-step first?</span>
                <Link to="/admission-procedure" className="stage-link">
                  Read the admission procedure <ArrowRight size={14} strokeWidth={2} />
                </Link>
              </Reveal>
            </div>

            {/* ─── The form ─── */}
            <Reveal className="enq-form-card" delay={140}>
              {sent ? (
                <div className="adm-success">
                  <span className="adm-success-ring">
                    <CheckCircle2 size={30} strokeWidth={1.6} />
                  </span>
                  <h3>Enquiry received</h3>
                  <p>
                    Thank you. We have noted your enquiry
                    {form.grade ? ` for ${form.grade}` : ''} and our admissions team will contact
                    you shortly with the next steps.
                  </p>
                  <button type="button" className="btn-ghost" onClick={() => setSent(false)}>
                    Send another enquiry
                  </button>
                </div>
              ) : (
                <form className="adm-form enq-form" onSubmit={submit}>
                  <h3>Admission Enquiry Form</h3>
                  <p className="enq-form-note">Fields marked * are required.</p>

                  <div className="f-row">
                    <div className="f-field">
                      <label>Session</label>
                      <EisSelect
                        label="Session"
                        options={SESSIONS}
                        value={form.session}
                        onChange={set('session')}
                        placeholder="Select session"
                      />
                    </div>
                    <div className="f-field">
                      <label>Board</label>
                      <EisSelect
                        label="Board"
                        options={BOARDS}
                        value={form.board}
                        onChange={set('board')}
                        placeholder="Select board"
                      />
                    </div>
                  </div>

                  <div className="f-field">
                    <label htmlFor="e-student">Student’s name *</label>
                    <input id="e-student" type="text" placeholder="Full name of the child" required />
                  </div>

                  <div className="f-row">
                    <div className="f-field">
                      <label>Grade *</label>
                      <EisSelect
                        label="Grade"
                        options={GRADES}
                        value={form.grade}
                        onChange={set('grade')}
                        placeholder="Select a grade"
                      />
                    </div>
                    <div className="f-field">
                      <label>Gender</label>
                      <EisSelect
                        label="Gender"
                        options={GENDERS}
                        value={form.gender}
                        onChange={set('gender')}
                        placeholder="Select a gender"
                      />
                    </div>
                  </div>

                  <div className="f-row">
                    <div className="f-field">
                      <label htmlFor="e-dob">Date of birth</label>
                      <input id="e-dob" type="date" />
                    </div>
                    <div className="f-field">
                      <label>Attendance</label>
                      <EisSelect
                        label="Attendance"
                        options={ATTENDANCE}
                        value={form.attendance}
                        onChange={set('attendance')}
                        placeholder="Select type"
                      />
                    </div>
                  </div>

                  <div className="f-field">
                    <label htmlFor="e-parent">Parent’s name *</label>
                    <input id="e-parent" type="text" placeholder="Full name" required />
                  </div>

                  <div className="f-row">
                    <div className="f-field">
                      <label htmlFor="e-email">Parent’s email *</label>
                      <input id="e-email" type="email" placeholder="name@example.com" required />
                    </div>
                    <div className="f-field">
                      <label htmlFor="e-tel">Parent’s mobile *</label>
                      <input id="e-tel" type="tel" placeholder="+91" required />
                    </div>
                  </div>

                  <div className="f-field">
                    <label htmlFor="e-msg">Message <span className="opt">(optional)</span></label>
                    <textarea id="e-msg" rows="3" placeholder="Anything you would like us to know" />
                  </div>

                  <button className="btn-gold btn-block" type="submit">
                    Submit enquiry <Send size={15} strokeWidth={2.2} />
                  </button>
                </form>
              )}
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

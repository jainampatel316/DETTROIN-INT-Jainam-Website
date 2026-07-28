import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import './SiteBody.css';
import './PageShell.css';
import './AdmissionsPage.css';

import Reveal from './components/Reveal';
import EisSelect from './components/EisSelect';
import FieldError from './components/FieldError';
import { EMAIL_RE, validatePhone, TODAY } from './validation';
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
  const [sent, setSent] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onTouched',
    defaultValues: {
      session: SESSIONS[0],
      board: BOARDS[0],
      attendance: ATTENDANCE[0],
      student: '',
      grade: '',
      gender: '',
      dob: '',
      parent: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  const onSubmit = async (values) => {
    /* No endpoint yet: the enquiry is validated and acknowledged locally. */
    setSent(values);
  };

  const startOver = () => {
    reset();
    setSent(null);
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
                    Thank you, {sent.parent.split(' ')[0]}. We have noted your enquiry for{' '}
                    {sent.student} ({sent.grade}) and our admissions team will contact you on{' '}
                    {sent.phone} shortly with the next steps.
                  </p>
                  <button type="button" className="btn-ghost" onClick={startOver}>
                    Send another enquiry
                  </button>
                </div>
              ) : (
                <form className="adm-form enq-form" onSubmit={handleSubmit(onSubmit)} noValidate>
                  <h3>Admission Enquiry Form</h3>
                  <p className="enq-form-note">Fields marked * are required.</p>

                  <div className="f-row">
                    <div className="f-field">
                      <label>Session</label>
                      <Controller
                        name="session"
                        control={control}
                        render={({ field }) => (
                          <EisSelect
                            label="Session"
                            options={SESSIONS}
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Select session"
                          />
                        )}
                      />
                    </div>
                    <div className="f-field">
                      <label>Board</label>
                      <Controller
                        name="board"
                        control={control}
                        render={({ field }) => (
                          <EisSelect
                            label="Board"
                            options={BOARDS}
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Select board"
                          />
                        )}
                      />
                    </div>
                  </div>

                  <div className={`f-field${errors.student ? ' has-error' : ''}`}>
                    <label htmlFor="e-student">Student’s name *</label>
                    <input
                      id="e-student"
                      type="text"
                      placeholder="Full name of the child"
                      aria-invalid={!!errors.student}
                      {...register('student', {
                        required: 'Please enter the student’s name.',
                        minLength: { value: 2, message: 'That name looks too short.' },
                      })}
                    />
                    {errors.student && <FieldError message={errors.student.message} />}
                  </div>

                  <div className="f-row">
                    <div className={`f-field${errors.grade ? ' has-error' : ''}`}>
                      <label>Grade *</label>
                      <Controller
                        name="grade"
                        control={control}
                        rules={{ required: 'Please choose a grade.' }}
                        render={({ field }) => (
                          <EisSelect
                            label="Grade"
                            options={GRADES}
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Select a grade"
                          />
                        )}
                      />
                      {errors.grade && <FieldError message={errors.grade.message} />}
                    </div>
                    <div className="f-field">
                      <label>Gender</label>
                      <Controller
                        name="gender"
                        control={control}
                        render={({ field }) => (
                          <EisSelect
                            label="Gender"
                            options={GENDERS}
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Select a gender"
                          />
                        )}
                      />
                    </div>
                  </div>

                  <div className="f-row">
                    <div className={`f-field${errors.dob ? ' has-error' : ''}`}>
                      <label htmlFor="e-dob">Date of birth</label>
                      <input
                        id="e-dob"
                        type="date"
                        max={TODAY}
                        aria-invalid={!!errors.dob}
                        {...register('dob', {
                          validate: (v) =>
                            !v || v <= TODAY || 'Date of birth cannot be in the future.',
                        })}
                      />
                      {errors.dob && <FieldError message={errors.dob.message} />}
                    </div>
                    <div className="f-field">
                      <label>Attendance</label>
                      <Controller
                        name="attendance"
                        control={control}
                        render={({ field }) => (
                          <EisSelect
                            label="Attendance"
                            options={ATTENDANCE}
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Select type"
                          />
                        )}
                      />
                    </div>
                  </div>

                  <div className={`f-field${errors.parent ? ' has-error' : ''}`}>
                    <label htmlFor="e-parent">Parent’s name *</label>
                    <input
                      id="e-parent"
                      type="text"
                      placeholder="Full name"
                      aria-invalid={!!errors.parent}
                      {...register('parent', {
                        required: 'Please enter the parent’s name.',
                        minLength: { value: 2, message: 'That name looks too short.' },
                      })}
                    />
                    {errors.parent && <FieldError message={errors.parent.message} />}
                  </div>

                  <div className="f-row">
                    <div className={`f-field${errors.email ? ' has-error' : ''}`}>
                      <label htmlFor="e-email">Parent’s email *</label>
                      <input
                        id="e-email"
                        type="email"
                        placeholder="name@example.com"
                        aria-invalid={!!errors.email}
                        {...register('email', {
                          required: 'Please enter an email address.',
                          pattern: { value: EMAIL_RE, message: 'Please check that email address.' },
                        })}
                      />
                      {errors.email && <FieldError message={errors.email.message} />}
                    </div>
                    <div className={`f-field${errors.phone ? ' has-error' : ''}`}>
                      <label htmlFor="e-tel">Parent’s mobile *</label>
                      <input
                        id="e-tel"
                        type="tel"
                        placeholder="+91 98765 43210"
                        aria-invalid={!!errors.phone}
                        {...register('phone', {
                          required: 'Please enter a mobile number.',
                          validate: validatePhone,
                        })}
                      />
                      {errors.phone && <FieldError message={errors.phone.message} />}
                    </div>
                  </div>

                  <div className="f-field">
                    <label htmlFor="e-msg">Message <span className="opt">(optional)</span></label>
                    <textarea
                      id="e-msg"
                      rows="3"
                      placeholder="Anything you would like us to know"
                      {...register('message', {
                        maxLength: { value: 500, message: 'Please keep this under 500 characters.' },
                      })}
                    />
                    {errors.message && <FieldError message={errors.message.message} />}
                  </div>

                  <button className="btn-gold btn-block" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending…' : 'Submit enquiry'}
                    <Send size={15} strokeWidth={2.2} />
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

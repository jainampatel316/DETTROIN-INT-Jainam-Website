import { useState } from 'react';
import { Link } from 'react-router-dom';
import './SiteBody.css';
import './PageShell.css';
import './GalleryPage.css';

import Reveal from './components/Reveal';
import PageHero from './components/PageHero';
import Lightbox from './components/Lightbox';
import PhotoString from './components/PhotoString';
import Masonry from './components/Masonry';
import { Footer } from './SiteBody';

import { Camera, ArrowRight, Phone } from 'lucide-react';

const EIS = 'https://excellenceinternationalschool.com/wp-content/uploads/2026/03';

/* The school's gallery photographs. 10 and 16 are absent from the
   source library, so the sequence skips them. */
const PHOTO_IDS = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 17,
  18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
];

const PHOTOS = [
  ...PHOTO_IDS.map((n) => ({
    src: `${EIS}/${n}.jpg`,
    alt: `Life at Excellence International School, photograph ${n}`,
  })),
  {
    src: `${EIS}/gallery2.jpg.jpeg`,
    alt: 'Life at Excellence International School',
  },
];

/* Every photograph is 600x400, so a content-driven masonry would come out
   as a plain grid. These heights give the columns their rhythm; Masonry
   halves each value when it lays the grid out. */
const HEIGHT_CYCLE = [560, 700, 460, 620, 780, 500, 660, 440];

const MASONRY_ITEMS = PHOTOS.map((p, i) => ({
  id: String(i),
  img: p.src,
  alt: p.alt,
  height: HEIGHT_CYCLE[i % HEIGHT_CYCLE.length],
}));

export default function GalleryPage() {
  const [open, setOpen] = useState(null);

  return (
    <div className="site-body page-body">
      <PageHero
        title="Our"
        accent="Gallery"
        trail={[{ label: 'Gallery' }]}
        lede="Assemblies, classrooms, sports days and celebrations. A look at ordinary days at Excellence International School."
      >
        <PhotoString />
      </PageHero>

      <main>
        <section className="sec" id="photos">
          <div className="wrap">
            <Reveal className="g-lead">
              <span className="g-count">
                <Camera size={16} strokeWidth={1.9} />
                {PHOTOS.length} photographs
              </span>
              <p>Select any photograph to view it full screen.</p>
            </Reveal>

            <Masonry
              items={MASONRY_ITEMS}
              animateFrom="bottom"
              duration={0.6}
              stagger={0.05}
              scaleOnHover
              hoverScale={0.96}
              blurToFocus
              onItemClick={(item, index) => setOpen(index)}
            />
          </div>
        </section>

        <section className="sec" id="visit">
          <div className="wrap">
            <Reveal className="join-card">
              <h2>
                Better still, <em>come and see</em>
              </h2>
              <p>
                Photographs only go so far. Visit the campus on Ramghat Road and see a school day
                for yourself, or start with an enquiry and we will arrange a time.
              </p>
              <div className="join-actions">
                <Link to="/admission-enquiry-form" className="btn-gold">
                  Book a visit <ArrowRight size={15} strokeWidth={2.2} />
                </Link>
                <a className="btn-ghost-light" href="tel:+917055582117">
                  <Phone size={15} strokeWidth={2} /> +91 70555 82117
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Lightbox photos={PHOTOS} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />

      <Footer />
    </div>
  );
}

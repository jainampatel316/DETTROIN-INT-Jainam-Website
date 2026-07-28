# Excellence International School — Website Redesign

A complete redesign of the Excellence International School website, rebuilt as a modern React
application with a consistent design system, a scroll-driven hero experience, and fully styled
interface components throughout.

---

## Submission Details

| Field | Detail |
| --- | --- |
| **Full Name** | Jainam Patel |
| **Intern ID** | `<!-- TODO: add your intern ID -->` |
| **Email Address** | jainampatel087@gmail.com |
| **GitHub Username** | [jainampatel316](https://github.com/jainampatel316) |
| **Selected Website** | [excellenceinternationalschool.com](https://excellenceinternationalschool.com/) |
| **Live Demo Link** | `<!-- TODO: add deployed URL -->` |
| **Repository** | [DETTROIN-INT-Jainam-Website](https://github.com/jainampatel316/DETTROIN-INT-Jainam-Website) |

---

## Technologies Used

| Technology | Version | Purpose |
| --- | --- | --- |
| **React** | 19.2 | Component architecture and state |
| **Vite** | 8.1 | Build tool and dev server |
| **React Router** | 7.18 | Multi-page routing with cross-page anchors |
| **Radix UI** | — | Accessible headless primitives: Accordion, Dialog, Select, Tabs |
| **lucide-react** | 1.27 | Icon set |
| **CSS** | — | Hand-authored design system using custom properties |
| **oxlint** | 1.71 | Linting |

No CSS framework is used. Styling is a bespoke token-driven system so the visual language stays
deliberate rather than templated.

---

## Key Improvements Made

### 1. Fixed the original site's UI/UX inconsistencies

The brief for this redesign was that the original site's styling "stopped at the fold" — several
interactive elements fell back to raw browser defaults. Each was rebuilt:

- **Unstyled FAQ accordion** — the expanded panels on the homepage rendered with no styling at all.
  Replaced with a Radix Accordion: measured height animation, animated plus/minus indicator, gold
  active border, and a fully styled answer panel.
- **Unstyled form dropdowns** — the enquiry form used raw native `<select>` elements. Replaced with
  a custom Radix Select component with a glass dropdown panel, focus ring, highlighted and selected
  states, typeahead, and full keyboard support.
- **Unstyled navbar dropdowns** — the Academics and Admissions menus were browser defaults. Rebuilt
  as animated glass panels with hover bridges so they don't flicker shut.

### 2. A single, coherent design system

Deep-green ink with the school's own gold accent (`#FFB606`), Cormorant Garamond for display type
over a clean sans body, one shared card / radius / shadow language, and consistent scroll-reveal
animation. Defined once as CSS custom properties and reused across every page.

### 3. Signature scroll-driven hero

The homepage opens with a glass halo divided into the school's five values. As the visitor scrolls,
the object never disappears — it only changes form:

1. **Halo** — a frosted glass ring with the logo centred inside.
2. **Cylinder** — the ring tilts and folds into a rotating 3D glass drum as the logo docks into the
   navigation bar.
3. **Ribbon** — the drum peels open at a seam and unrolls flat, using real developable-surface maths
   so the curvature flattens without stretching.
4. **Hero carousel** — the flattened ribbon becomes the school's actual banner slider, complete with
   working arrows, bullets and auto-advance.

### 4. Rebuilt every page

| Route | Page |
| --- | --- |
| `/` | Home — hero journey, about, vision & mission, academic journey, facilities, values, testimonials, admissions, FAQ |
| `/about-us` | About Us — with a hand-drawn animated airship illustration |
| `/admission-procedure` | Admission Procedure — horizontal scroll-animated timeline |
| `/admission-enquiry-form` | Admission Enquiry Form |
| `/gallery` | Gallery — mosaic grid with a full-screen lightbox |

### 5. Content-led, not lorem ipsum

Every heading, paragraph, FAQ answer, academic stage, testimonial and form field is taken from the
live site's own content, rewritten for clarity rather than invented.

### 6. Reusable component architecture

Shared UI is extracted rather than duplicated: `PageHero`, `Heading`, `Reveal`, `EisSelect`,
`EisAccordion`, `Lightbox` and `Airship`, with common interior-page chrome in `PageShell.css`.

### 7. Accessibility and motion safety

Radix primitives supply focus trapping, ARIA wiring and keyboard navigation. The lightbox supports
arrow-key paging and Escape. Every scroll-driven animation is disabled under
`prefers-reduced-motion`, so no content is ever hidden behind an animation that never runs.

### 8. Responsive throughout

Layouts reflow at 1120px, 940px and 640px. The admission timeline switches from horizontal to a
vertical spine on narrow screens, and the gallery mosaic steps from four columns down to two.

---

## Project Structure

```
landing-page/
├── public/                     Logo and favicon
└── src/
    ├── App.jsx                 Routes and cross-page hash scrolling
    ├── HeroSection.jsx/.css    Scroll-driven halo → cylinder → ribbon → carousel
    ├── SiteBody.jsx/.css       Homepage sections, site header, footer, design tokens
    ├── AboutPage.jsx/.css
    ├── AdmissionProcedurePage.jsx
    ├── AdmissionEnquiryPage.jsx
    ├── AdmissionsPage.css
    ├── GalleryPage.jsx/.css
    ├── PageShell.css           Shared interior-page chrome
    └── components/
        ├── Airship.jsx         Animated inline-SVG illustration
        ├── EisAccordion.jsx    Radix Accordion
        ├── EisSelect.jsx       Radix Select
        ├── Heading.jsx
        ├── Lightbox.jsx        Radix Dialog photo viewer
        ├── PageHero.jsx
        └── Reveal.jsx          Scroll-reveal wrapper
```

---

## Running Locally

```bash
cd landing-page
npm install
npm run dev
```

The dev server starts on `http://localhost:5173`.

Other scripts:

```bash
npm run build      # production build
npm run preview    # preview the production build
npm run lint       # oxlint
```

---

## Notes

- Photography, the wordmark and the value icons are currently referenced from the live school
  website. Copy them into `public/` and update the `EIS` constant in each page before deploying.
- The admission enquiry form is a styled front-end only. It shows a confirmation state but needs a
  backend or form service (for example Formspree) wired up to actually deliver submissions.

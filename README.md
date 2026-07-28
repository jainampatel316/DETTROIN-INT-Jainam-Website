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
| **React Hook Form** | 7.83 | Enquiry form state and validation |
| **Radix UI** | — | Accessible headless primitives: Accordion, Dialog, Select, Tabs |
| **React Bits** | — | Masonry gallery layout |
| **GSAP** | 3.15 | Animation engine behind the masonry grid |
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

### 2. Real form validation

Both enquiry forms run on React Hook Form rather than relying on browser defaults:

- Required fields, minimum lengths, and a 500-character cap on free text.
- Email checked against a proper pattern; mobile numbers normalised before validation, so
  `+91 98765 43210`, `9876543210` and `098765-43210` all pass while `12345` and numbers not
  starting 6–9 are rejected.
- Date of birth cannot be set in the future.
- Errors appear inline beneath the offending field with an icon, the field turns red, and the
  message is exposed to screen readers via `role="alert"` and `aria-invalid`.
- Validation runs once a field has been touched, so nothing shouts at the visitor while they type.
- The Radix selects are bound through RHF's `Controller`, so custom dropdowns validate exactly
  like native inputs.

### 3. A single, coherent design system

Deep-green ink with the school's own gold accent (`#FFB606`), Cormorant Garamond for display type
over a clean sans body, one shared card / radius / shadow language, and consistent scroll-reveal
animation. Defined once as CSS custom properties and reused across every page.

### 4. Signature scroll-driven hero

The homepage opens with a glass halo divided into the school's five values. As the visitor scrolls,
the object never disappears — it only changes form:

1. **Halo** — a frosted glass ring with the logo centred inside.
2. **Cylinder** — the ring tilts and folds into a rotating 3D glass drum as the logo docks into the
   navigation bar.
3. **Ribbon** — the drum peels open at a seam and unrolls flat, using real developable-surface maths
   so the curvature flattens without stretching.
4. **Hero carousel** — the flattened ribbon becomes the school's actual banner slider, complete with
   working arrows, bullets and auto-advance.

### 5. Rebuilt every page

| Route | Page |
| --- | --- |
| `/` | Home — hero journey, about, vision & mission, academic journey, facilities, values, testimonials, admissions, FAQ |
| `/about-us` | About Us — with a hand-drawn animated airship illustration |
| `/admission-procedure` | Admission Procedure — horizontal scroll-animated timeline |
| `/admission-enquiry-form` | Admission Enquiry Form |
| `/gallery` | Gallery — React Bits masonry grid with a full-screen lightbox |

Each interior page carries its own hand-drawn inline-SVG illustration: an airship for About Us, an
opening school gate for Admission Procedure, a paper plane for the enquiry form, and pegged photo
prints for the Gallery.

### 6. Content-led, not lorem ipsum

Every heading, paragraph, FAQ answer, academic stage, testimonial and form field is taken from the
live site's own content, rewritten for clarity rather than invented.

### 7. Reusable component architecture

Shared UI is extracted rather than duplicated: `PageHero`, `Heading`, `Reveal`, `EisSelect`,
`EisAccordion`, `Lightbox`, `FieldError` and the illustration components, with common interior-page
chrome in `PageShell.css` and shared validation rules in `validation.js`.

### 8. Accessibility and motion safety

Radix primitives supply focus trapping, ARIA wiring and keyboard navigation. The lightbox supports
arrow-key paging and Escape. Every scroll-driven animation is disabled under
`prefers-reduced-motion`, so no content is ever hidden behind an animation that never runs.

### 9. Responsive throughout

Layouts reflow at 1120px, 940px and 640px. The admission timeline switches from horizontal to a
vertical spine on narrow screens, and the masonry gallery steps from five columns down to one.

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
    ├── validation.js           Shared form validation rules
    └── components/
        ├── Airship.jsx         About Us illustration
        ├── SchoolGate.jsx      Admission Procedure illustration
        ├── PaperPlane.jsx      Admission Enquiry illustration
        ├── PhotoString.jsx     Gallery illustration
        ├── HeroArt.css         Illustration animations
        ├── EisAccordion.jsx    Radix Accordion
        ├── EisSelect.jsx       Radix Select
        ├── FieldError.jsx      Inline validation message
        ├── Heading.jsx
        ├── Lightbox.jsx        Radix Dialog photo viewer
        ├── Masonry.jsx/.css    React Bits masonry grid
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
- The enquiry forms validate fully on the client and show a confirmation state, but there is no
  endpoint behind them yet. Point `onSubmit` at a backend or form service (for example Formspree)
  to actually deliver submissions.
- The `Masonry` component is adapted from [React Bits](https://github.com/DavidHDev/react-bits)
  (MIT). Three changes are documented in the file header: an `onItemClick` prop so it can drive the
  lightbox, a computed container height so the page below it does not overlap, and keyboard access
  on the tiles.

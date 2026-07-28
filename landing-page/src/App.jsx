import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import HeroSection from './HeroSection';
import SiteBody, { SiteHeader } from './SiteBody';
import AboutPage from './AboutPage';

/* Anchor links carry a hash across routes; scroll to it once the target
   page has mounted, otherwise start every new page at the top */
function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

function Home() {
  return (
    <>
      <HeroSection />
      <SiteBody />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <SiteHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  );
}

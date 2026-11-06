'use client';

import { useEffect } from 'react';
import './ag-landing.css';

// The landing page, merged 2026-11-03 from Phils Website/redesign/index.html: the mockup landing version 8, Phil's choice
// of 2026-11-01. INFO FILM MUSIC INDEX fill the height in ITC Avant Garde Gothic Bold capitals; the name sits small at the
// top in the site's header type, DM Sans Bold. The page loads Phil's Adobe Fonts kit (app/library/adobe-kit.tsx).
// 2026-11-05: Film and Music open the stand of Library covers.
export function AgLanding() {
  useEffect(() => {
    document.title = 'Philip Di Fiore — Film & Music';
  }, []);
  return (
    <div className="ag-landing">
      <a className="ag-landing-name" href="#home">Philip Di Fiore</a>
      <nav className="ag-landing-menu" aria-label="Site navigation">
        <a href="#info">Info</a>
        <a href="#film">Film</a>
        <a href="#music">Music</a>
        <a href="/index/index.html#people-artists">Index</a>
      </nav>
    </div>
  );
}

'use client';

import { useEffect, useRef } from 'react';
import { SectionNavigation } from './navigation';
import './info.css';

export function InfoPage({ filmSlug }: { filmSlug: string }) {
  const biography = useRef<HTMLElement>(null);
  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Info — Philip Di Fiore';
    return () => { document.title = previousTitle; };
  }, []);

  useEffect(() => {
    const article = biography.current;
    if (!article) return;
    const sync = () => {
      if (new URLSearchParams(window.location.search).get('info') === 'bold') {
        article.dataset.infoFont = 'bold';
      } else {
        delete article.dataset.infoFont;
      }
    };
    sync();
    window.addEventListener('popstate', sync);
    return () => {
      window.removeEventListener('popstate', sync);
      delete article.dataset.infoFont;
    };
  }, []);

  return (
    <div className="info-site">
      <div className="info-frame">
        <header className="info-header">
          <a href="#film/if-you-call" aria-label="Philip Di Fiore — Home">Philip Di Fiore</a>
          <SectionNavigation active="info" filmSlug={filmSlug} />
        </header>
        <main className="info-content" aria-label="Info about Philip Di Fiore">
          <h1 className="info-sr-only">Philip Di Fiore</h1>
          <article ref={biography} className="info-bio" aria-label="Biography">
            <figure className="info-portrait">
            <img
              src="/images/info/philip-modern-noir.png"
              alt="Black-and-white portrait of Philip Di Fiore"
              width={1122}
              height={1402}
            />
            </figure>
            <p>Philip Di Fiore is an award-winning filmmaker known for his cinematic storytelling and mind-bending narratives. He writes his own stories and edits his own films.</p>
            <p>The Academy of Motion Picture Arts and Sciences selected his film <em>Stranger: Bernie Worrell on Earth</em> for inclusion in the Academy Film Archive, its permanent film collection.</p>
            <p>Di Fiore produces music projects and film scores. He built a recording studio and soundstage in Brooklyn, NY (The Rumpus Room) which he operated for ten years.</p>
            <p>Di Fiore organizes and MC’s <em>Recording Parties</em>- relaxed gatherings where musicians from different circles could meet, socialize and play. These parties are recorded and archived.</p>
            <p>Di Fiore builds tools for writing, filmmaking and the creative process.</p>
          </article>
        </main>
      </div>
    </div>
  );
}

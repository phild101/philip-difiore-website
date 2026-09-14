'use client';

import { useEffect } from 'react';
import { SectionNavigation } from './navigation';
import './info.css';

export function InfoPage({ filmSlug }: { filmSlug: string }) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Info — Philip Di Fiore';
    return () => { document.title = previousTitle; };
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
          <article className="info-bio" aria-label="Biography">
            <figure className="info-portrait">
            <img
              src="/images/info/philip-modern-noir.png"
              alt="Black-and-white portrait of Philip Di Fiore"
              width={1122}
              height={1402}
            />
            </figure>
            <p>Philip Di Fiore is an award-winning filmmaker known for his cinematic storytelling, mind-bending narratives and visual innovation. He writes his own stories and edits his own films.</p>
            <p>His first film <em>Stranger: Bernie Worrell on Earth</em> was selected for inclusion in the permanent collection of the Academy of Motion Picture Arts and Sciences.</p>
            <p>Besides his film work, he has produced music projects and film scores. He founded and operated a soundstage and recording studio called The Rumpus Room in Brooklyn, New York. It was here that he organized and MC’d events called Recording Parties—loose gatherings where musicians from different circles could meet, socialize and improvise music freely. These parties were recorded and archived.</p>
            <p>Philip builds creative tools for writing, filmmaking and the creative process.</p>
          </article>
        </main>
      </div>
    </div>
  );
}

'use client';

import { useEffect } from 'react';
import './info.css';

export function InfoPage({ featuredSlug }: { featuredSlug: string }) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Info — Philip Di Fiore';
    return () => { document.title = previousTitle; };
  }, []);

  return (
    <div className="info-site">
      <div className="info-frame">
        <header className="info-header">
          <a href="#featured/if-you-call" aria-label="Philip Di Fiore — Home">Philip Di Fiore</a>
          <nav aria-label="Main navigation">
            <a href={'#featured/' + featuredSlug}>Featured</a>
            <a href="#info" aria-current="page">Info</a>
          </nav>
        </header>
        <main className="info-content" aria-label="Info about Philip Di Fiore">
          <h1 className="info-sr-only">Philip Di Fiore</h1>
          <figure className="info-portrait">
            <img
              src="/images/info/philip-modern-noir.png"
              alt="Black-and-white portrait of Philip Di Fiore"
              width={1122}
              height={1402}
            />
          </figure>
          <article className="info-bio" aria-label="Biography">
            <p>Philip Di Fiore is an award-winning filmmaker known for his cinematic storytelling and mind-bending narratives.</p>
            <p>His first film <em>Stranger: Bernie Worrell on Earth</em> was selected for inclusion in the permanent collection of the Academy of Motion Picture Arts and Sciences.</p>
            <p>Besides his film work, Philip has directed music videos and has produced music albums and film scores. He founded and operated a film and music recording studio called The Rumpus Room in Brooklyn, New York. It was here that he organized and MC’d events called Recording Parties—loose gatherings where musicians from different circles could meet, socialize, improvise and record live music together.</p>
            <p>Philip writes and builds creative tools for writing, filmmaking and the creative process.</p>
          </article>
        </main>
      </div>
    </div>
  );
}

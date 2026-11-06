'use client';

import { useEffect } from 'react';
import './ag-info.css';

// The Info page, merged 2026-11-03 from Phils Website/redesign/info.html: the mockup AG5 inverted, Phil's choice of 2026-11-02
// with his revision of 2026-11-03. The five phrases in ITC Avant Garde Gothic Bold, red; the other words as light tracked
// capitals; on rollover a phrase's whole band goes red and its words white. The header is the site's, locked at the top.
// The page loads Phil's Adobe Fonts kit (app/library/adobe-kit.tsx). 2026-11-05: Film and Music open the stand of Library covers.
export function AgInfo() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Info — Philip Di Fiore';
    return () => { document.title = previousTitle; };
  }, []);
  return (
    <div className="ag-info">
      <header className="ag-info-header">
        <a href="#home" aria-label="Philip Di Fiore — Home">Philip Di Fiore</a>
        <nav aria-label="Main navigation">
          <a href="#info" aria-current="page">Info</a>
          <a href="#film">Film</a>
          <a href="#music">Music</a>
          <a href="/index/index.html#people-artists">Index</a>
        </nav>
      </header>
      <main className="ag-info-col" aria-label="Info about Philip Di Fiore">
        <h1 className="ag-info-sr-only">Philip Di Fiore</h1>
        <div className="ag-info-blk ag-b1">
          <p className="ag-info-small">Philip Di Fiore is an award-winning filmmaker known for his</p>
          <span className="ag-info-big"><span>cinematic</span><span>storytelling</span></span>
          <p className="ag-info-small">and mind-bending narratives. He writes his own stories and edits his own films.</p>
        </div>
        <div className="ag-info-blk ag-b2">
          <span className="ag-info-big"><span>The Academy</span><span>of Motion</span><span>Picture Arts</span><span>and Sciences</span></span>
          <p className="ag-info-small">selected his film <em>Stranger: Bernie Worrell on Earth</em> for inclusion in the Academy Film Archive, its permanent film collection.</p>
        </div>
        <div className="ag-info-blk ag-b3">
          <p className="ag-info-small">Di Fiore produces</p>
          <span className="ag-info-big"><span>music</span><span>projects</span><span>and film</span><span>scores.</span></span>
          <p className="ag-info-small">He built a recording studio and soundstage in Brooklyn, NY (The Rumpus Room) which he operated for ten years.</p>
        </div>
        <div className="ag-info-blk ag-b4">
          <p className="ag-info-small">Di Fiore organizes and MC’s</p>
          <span className="ag-info-big"><span>Recording</span><span>Parties</span></span>
          <p className="ag-info-small">- relaxed gatherings where musicians from different circles meet, socialize and play. The music from these parties is recorded and archived.</p>
        </div>
        <div className="ag-info-blk ag-b5">
          <p className="ag-info-small">He builds</p>
          <span className="ag-info-big"><span>apps, tools</span><span>and games</span></span>
          <p className="ag-info-small">for writing, filmmaking and the creative process.</p>
        </div>
        <p className="ag-info-mail"><a href="mailto:info@philipdifiore.com">info@philipdifiore.com</a></p>
      </main>
    </div>
  );
}

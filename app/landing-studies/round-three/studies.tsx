'use client';

import './studies.css';

export const identities = [
  { id: 'oxblood', name: 'Oxblood title page', note: 'A name, two disciplines, and a single field of color.', number: 11 },
  { id: 'portrait', name: 'Petrol portrait', note: 'Philip himself, with a straight photographic layout.', number: 12 },
  { id: 'masthead', name: 'Yellow masthead', note: 'An expansive name, anchored to a quiet editorial grid.', number: 13 },
  { id: 'blue', name: 'Blue letterhead', note: 'The Info page’s type, set within a calm blue field.', number: 14 },
  { id: 'coral', name: 'Coral panel', note: 'A compact identity inside a broad, architectural color frame.', number: 15 },
];

function Header() {
  return <header className="lt-header"><a href="/#info">Philip Di Fiore</a><nav aria-label="Main navigation"><a href="/#info">Info</a><a href="/#film/in-the-city">Film</a><a href="/#music/recording-parties">Music</a><a href="/index/index.html#people-artists">Index</a></nav></header>;
}
function Roles() { return <p className="lt-roles">Filmmaker.<br />Music producer.</p>; }

export function ThirdSurface({ direction }: { direction: string }) {
  return <div className={`lt-canvas lt-${direction}`}><div className="lt-frame"><Header />
    {direction === 'oxblood' && <main className="lt-title-page"><h1>PHILIP<br />DI FIORE</h1><Roles /></main>}
    {direction === 'portrait' && <main className="lt-portrait-page"><figure><img src="/images/landing-studies/philip.webp" alt="Philip Di Fiore" /></figure><div><h1>PHILIP<br />DI FIORE</h1><p>Filmmaker and music producer.<br />He writes his own stories and edits his own films.</p></div></main>}
    {direction === 'masthead' && <main className="lt-masthead-page"><div className="lt-masthead-top"><Roles /><span className="lt-masthead-rule" aria-hidden="true" /></div><div className="lt-masthead-name"><h1>PHILIP<br />DI FIORE</h1></div></main>}
    {direction === 'blue' && <main className="lt-blue-page"><div className="lt-blue-identity"><h1>Philip Di Fiore</h1><Roles /></div><p className="lt-blue-copy">An award-winning filmmaker known for his cinematic storytelling and mind-bending narratives.</p></main>}
    {direction === 'coral' && <main className="lt-coral-page"><div className="lt-coral-panel"><h1>PHILIP<br />DI FIORE</h1><Roles /></div></main>}
  </div></div>;
}

export function ThirdStudy({ direction }: { direction: string }) {
  return <div className="lt-study"><nav className="lt-switcher" aria-label="Landing page previews"><a href="/landing-studies/all">All 15</a><div>{identities.map(item => <a key={item.id} href={`/landing-studies/round-three/${item.id}`} aria-label={`Preview ${item.number}: ${item.name}`} aria-current={direction === item.id ? 'page' : undefined}><span>{item.number}</span><span className="lt-switch-name">{item.name}</span></a>)}</div></nav><ThirdSurface direction={direction} /></div>;
}

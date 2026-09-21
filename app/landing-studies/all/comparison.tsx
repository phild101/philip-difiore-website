'use client';

import { directions, Surface as FirstSurface } from '../studies';
import { openings, Surface as SecondSurface } from '../round-two/studies';
import { identities, yellowEntries, ThirdSurface } from '../round-three/studies';
import './comparison.css';

export function AllLandingStudies() {
  return <div className="la-review"><header className="la-header"><a href="/#info">Philip Di Fiore</a><a href="/#info">Current site</a></header><main>
    <div className="la-intro"><h1>Landing pages</h1><p>Five yellow entrances, followed by all fifteen earlier studies.</p><nav aria-label="Study rounds"><a href="#latest">Yellow · 16–20</a><a href="#new">11–15</a><a href="#first">First set · 01–05</a><a href="#second">Second set · 06–10</a></nav></div>
    <section id="latest" aria-labelledby="latest-title"><div className="la-section-title"><h2 id="latest-title">Five yellow entrances</h2><span>16–20 · New</span></div><div className="la-grid">{yellowEntries.map(item => <article className="la-card" key={item.id}><div className="la-mini"><div className="la-mini-inner" inert aria-hidden="true"><ThirdSurface direction={item.id} /></div></div><div className="la-caption"><span>{item.number}</span><h3>{item.name}</h3><span aria-hidden="true">↗</span></div><p>{item.note}</p><a className="la-open" href={`/landing-studies/round-three/${item.id}`} aria-label={`Preview ${item.number}: ${item.name}`} /></article>)}</div></section>
    <section id="new" aria-labelledby="new-title"><div className="la-section-title"><h2 id="new-title">New studies</h2><span>11–15</span></div><div className="la-grid">{identities.map(item => <article className="la-card" key={item.id}>
      <div className="la-mini"><div className="la-mini-inner" inert aria-hidden="true"><ThirdSurface direction={item.id} /></div></div>
      <div className="la-caption"><span>{item.number}</span><h3>{item.name}</h3><span aria-hidden="true">↗</span></div><p>{item.note}</p><a className="la-open" href={`/landing-studies/round-three/${item.id}`} aria-label={`Preview ${item.number}: ${item.name}`} />
    </article>)}</div></section>
    <section id="first" aria-labelledby="first-title"><div className="la-section-title"><h2 id="first-title">First set</h2><span>01–05 · Saved</span></div><div className="la-grid">{directions.map((item, i) => <article className="la-card" key={item.id}>
      <div className="ls-mini"><div className="ls-mini-inner" inert aria-hidden="true"><FirstSurface direction={item.id} /></div></div>
      <div className="la-caption"><span>{String(i + 1).padStart(2, '0')}</span><h3>{item.name}</h3><span aria-hidden="true">↗</span></div><p>{item.note}</p><a className="la-open" href={`/landing-studies/${item.id}`} aria-label={`Preview ${i + 1}: ${item.name}`} />
    </article>)}</div></section>
    <section id="second" aria-labelledby="second-title"><div className="la-section-title"><h2 id="second-title">Second set</h2><span>06–10 · Saved</span></div><div className="la-grid">{openings.map((item, i) => <article className="la-card" key={item.id}>
      <div className="lr-mini"><div className="lr-mini-inner" inert aria-hidden="true"><SecondSurface direction={item.id} miniature /></div></div>
      <div className="la-caption"><span>{String(i + 6).padStart(2, '0')}</span><h3>{item.name}</h3><span aria-hidden="true">↗</span></div><p>{item.note}</p><a className="la-open" href={`/landing-studies/round-two/${item.id}`} aria-label={`Preview ${i + 6}: ${item.name}`} />
    </article>)}</div></section>
  </main></div>;
}

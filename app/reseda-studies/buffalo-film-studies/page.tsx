import type { Metadata } from 'next';
import { buffaloFilmStudies } from '../overprint-centered/buffalo-film-studies';
import '../antibalas-studies/studies.css';
import '../improvisczario-figure-studies/studies.css';

export const metadata: Metadata = {title: 'The Buffalo Hunt — Film Artwork Studies | Philip Di Fiore'};
const site = '/?header=bold&info=bold&layout=stacked';

export default function BuffaloFilmStudies() {
  return <main className="anti-review figure-review">
    <header className="anti-review-header">
      <a href={site + '#info'}>Philip Di Fiore</a>
      <nav aria-label="Main navigation">
        <a href={site + '#film/in-the-city'}>Film</a>
        <a href={site + '#music/buffalo-hunt-soundtrack'}>Music</a>
        <a href={site + '#info'}>Info</a>
      </nav>
    </header>
    <div className="anti-review-heading"><h1>The Buffalo Hunt</h1><p>Film / Bufftry overprint studies</p></div>
    <section className="anti-review-grid" aria-label="Current film artwork and two new overprint versions">
      {buffaloFilmStudies.map(study => {
        const href = site + '&bufffilm=' + study.option + '#film/buffalo-hunt';
        return <article className="anti-review-card" key={study.option}>
          <div className="anti-review-caption"><h2>{study.title}</h2><span>{study.subject}</span></div>
          <a className="anti-review-image" style={{background:study.ground}} href={href} aria-label={'Preview ' + study.title + ' on the site'}>
            <img src={'/images/' + study.image} alt={'The Buffalo Hunt film artwork — ' + study.title} width={1122} height={1402} />
          </a>
          <a className="anti-review-link" href={href}>View on site</a>
        </article>;
      })}
    </section>
    <footer className="figure-review-footer"><a href="/reseda-studies/buffalo-fifth-face-studies">Soundtrack / Fifth Face studies</a></footer>
  </main>;
}

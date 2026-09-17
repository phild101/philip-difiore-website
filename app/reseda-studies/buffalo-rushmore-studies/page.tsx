import type { Metadata } from 'next';
import { buffaloSoundtrackStudies } from '../../music/projects';
import '../antibalas-studies/studies.css';
import '../improvisczario-figure-studies/studies.css';
import '../improvisczario-photo-overprint-studies/studies.css';

export const metadata: Metadata = {title: 'The Buffalo Hunt Soundtrack — Rushmore Studies | Philip Di Fiore'};
const site = '/?header=bold&info=bold&layout=stacked';

export default function BuffaloRushmoreStudies() {
  return <main className="anti-review figure-review photo-overprint-review">
    <header className="anti-review-header">
      <a href={site + '#info'}>Philip Di Fiore</a>
      <nav aria-label="Main navigation">
        <a href={site + '#film/in-the-city'}>Film</a>
        <a href={site + '#music/buffalo-hunt-soundtrack'}>Music</a>
        <a href={site + '#info'}>Info</a>
      </nav>
    </header>
    <div className="anti-review-heading"><h1>The Buffalo Hunt</h1><p>Soundtrack / Rushmore studies</p></div>
    <section className="anti-review-grid" aria-label="Original artwork and three Rushmore concepts">
      {buffaloSoundtrackStudies.map(study => {
        const href = site + '&buffalo=' + study.option + '#music/buffalo-hunt-soundtrack';
        return <article className="anti-review-card" key={study.option}>
          <div className="anti-review-caption"><h2>{study.title}</h2><span>{study.subject}</span></div>
          <a className="anti-review-image" style={{background:study.ground}} href={href} aria-label={'Preview ' + study.title + ' on the site'}>
            <img src={'/images/music/' + study.image} alt={'Buffalo soundtrack artwork — ' + study.title} width={1122} height={1402} />
          </a>
          <a className="anti-review-link" href={href}>View on site</a>
        </article>;
      })}
    </section>
  </main>;
}

import type { Metadata } from 'next';
import { improvisczarioLynchStudies } from '../../music/projects';
import '../antibalas-studies/studies.css';
import '../improvisczario-figure-studies/studies.css';

export const metadata: Metadata = {title: 'Improvisczario — Lynchian Studies | Philip Di Fiore'};
const site = '/?header=bold&info=bold&layout=stacked';

export default function ImprovisczarioLynchStudies() {
  return <main className="anti-review figure-review">
    <header className="anti-review-header">
      <a href={site + '#film/if-you-call'}>Philip Di Fiore</a>
      <nav aria-label="Main navigation">
        <a href={site + '#film/if-you-call'}>Film</a>
        <a href={site + '#music/improvisczario'}>Music</a>
        <a href={site + '#info'}>Info</a>
      </nav>
    </header>
    <div className="anti-review-heading"><h1>Improvisczario</h1><p>Lynchian studies</p></div>
    <section className="anti-review-grid" aria-label="Selected artwork and saved alternatives">
      {improvisczarioLynchStudies.map(study => {
        const href = site + '&improv=' + study.option + '#music/improvisczario';
        return <article className="anti-review-card" key={study.option}>
          <div className="anti-review-caption"><h2>{study.title}</h2><span>{study.subject}</span></div>
          <a className="anti-review-image" style={{background:study.ground}} href={href} aria-label={'Preview ' + study.title + ' on the site'}>
            <img src={'/images/music/' + study.image} alt={'Synthesizer musician — ' + study.title + ' treatment'} />
          </a>
          <a className="anti-review-link" href={href}>View on site</a>
        </article>;
      })}
    </section>
    <footer className="figure-review-footer"><a href="/reseda-studies/improvisczario-figure-studies">Earlier musician studies</a></footer>
  </main>;
}

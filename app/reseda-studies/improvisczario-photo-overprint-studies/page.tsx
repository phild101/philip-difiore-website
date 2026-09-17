import type { Metadata } from 'next';
import { improvisczarioPhotoOverprintStudies, improvisczarioWildStudies } from '../../music/projects';
import '../antibalas-studies/studies.css';
import '../improvisczario-figure-studies/studies.css';
import './studies.css';

export const metadata: Metadata = {title: 'Improvisczario — Photographic Overprints | Philip Di Fiore'};
const site = '/?header=bold&info=bold&layout=stacked';

export default function ImprovisczarioPhotoOverprintStudies() {
  return <main className="anti-review figure-review photo-overprint-review">
    <header className="anti-review-header">
      <a href={site + '#info'}>Philip Di Fiore</a>
      <nav aria-label="Main navigation">
        <a href={site + '#film/in-the-city'}>Film</a>
        <a href={site + '#music/improvisczario'}>Music</a>
        <a href={site + '#info'}>Info</a>
      </nav>
    </header>
    <div className="anti-review-heading"><h1>Improvisczario</h1><p>Photographic overprints</p></div>
    <section className="anti-review-grid" aria-label="Selected artwork and three saved options">
      {[...improvisczarioWildStudies, ...improvisczarioPhotoOverprintStudies].map(study => {
        const href = site + '&improv=' + study.option + '#music/improvisczario';
        return <article className="anti-review-card" key={study.option}>
          <div className="anti-review-caption"><h2>{study.title}</h2><span>{study.subject}</span></div>
          <a className="anti-review-image" style={{background:study.ground}} href={href} aria-label={'Preview ' + study.title + ' on the site'}>
            <img src={'/images/music/' + study.image} alt={'Photographic synthesizer musician — ' + study.title + ' overprint'} width={1122} height={1402} />
          </a>
          <a className="anti-review-link" href={href}>View on site</a>
        </article>;
      })}
    </section>
    <footer className="figure-review-footer"><a href="/reseda-studies/improvisczario-lynch-studies">Earlier Signal Ghost studies</a></footer>
  </main>;
}

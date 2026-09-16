/* oxlint-disable next/no-img-element -- These are the original generated artwork files. */
import type { Metadata } from 'next';
import '../antibalas-studies/studies.css';
import './studies.css';

export const metadata: Metadata = {
  title: 'Antibalas — Amber / Oxblood Room Studies | Philip Di Fiore',
};

const studies = [
  { option: '3-photo-amber', title: 'Saved favorite', subject: 'Circular overprint', image: 'antibalas-anti-3-photo-amber.webp', ground: '#6b1d25' },
  { option: '3-amber-room-plates', title: 'New 1', subject: 'Ink plates', image: 'antibalas-anti-3-amber-room-plates.webp', ground: '#6b1d25' },
  { option: '3-amber-room-rhythm', title: 'New 2', subject: 'Ink bands', image: 'antibalas-anti-3-amber-room-rhythm.webp', ground: '#6b1d25' },
];
const site = '/?header=bold&info=bold&layout=stacked';

export default function AntibalasAmberStudies() {
  return (
    <main className="anti-review">
      <header className="anti-review-header">
        <a href={site + '#film/if-you-call'}>Philip Di Fiore</a>
        <nav aria-label="Main navigation">
          <a href={site + '#film/antibalas'}>Film</a>
          <a href={site + '#music/recording-parties'}>Music</a>
          <a href={site + '#info'}>Info</a>
        </nav>
      </header>
      <div className="anti-review-heading">
        <h1>Antibalas</h1>
        <p>Amber / Oxblood — Room studies</p>
      </div>
      <section className="anti-review-grid anti-review-grid-three" aria-label="Saved Amber Oxblood artwork and two new overprint treatments with more photographic background detail">
        {studies.map(study => {
          const href = site + '&anti=' + study.option + '#film/antibalas';
          return (
            <article className="anti-review-card" key={study.option}>
              <div className="anti-review-caption">
                <h2>{study.title}</h2>
                <span>{study.subject}</span>
              </div>
              <a className="anti-review-image" style={{ background: study.ground }} href={href} aria-label={'Preview ' + study.title + ' — ' + study.subject + ' on the site'}>
                <img src={'/images/sequence/' + study.image} alt={'Antibalas — ' + study.title + ' — ' + study.subject} />
              </a>
              <a className="anti-review-link" href={href}>View on site</a>
            </article>
          );
        })}
      </section>
    </main>
  );
}

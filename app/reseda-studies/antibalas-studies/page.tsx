/* oxlint-disable next/no-img-element -- These are the original generated artwork files. */
import type { Metadata } from 'next';
import './studies.css';

export const metadata: Metadata = {
  title: 'Antibalas — Artwork Comparison | Philip Di Fiore',
};

const studies = [
  { option: 'current', title: 'Current', subject: 'Existing artwork', image: 'antibalas-overprint.webp', ground: '#681e21' },
  { option: '1', title: 'Anti 1', subject: 'Keyboard', image: 'antibalas-anti-1.webp', ground: '#efaf25' },
  { option: '2', title: 'Anti 2', subject: 'Horns', image: 'antibalas-anti-2.webp', ground: '#233dbc' },
  { option: '3', title: 'Anti 3', subject: 'Voice', image: 'antibalas-anti-3.webp', ground: '#075345' },
];
const site = '/?header=bold&info=bold&layout=stacked';

export default function AntibalasStudies() {
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
        <p>Artwork comparison</p>
      </div>
      <section className="anti-review-grid" aria-label="Current artwork and three alternatives">
        {studies.map(study => {
          const href = site + '&anti=' + study.option + '#film/antibalas';
          return (
            <article className="anti-review-card" key={study.option}>
              <div className="anti-review-caption">
                <h2>{study.title}</h2>
                <span>{study.subject}</span>
              </div>
              <a className="anti-review-image" style={{ background: study.ground }} href={href} aria-label={'Preview ' + study.title + ' on the site'}>
                <img src={'/images/sequence/' + study.image} alt={'Antibalas — ' + study.subject} />
              </a>
              <a className="anti-review-link" href={href}>View on site</a>
            </article>
          );
        })}
      </section>
    </main>
  );
}

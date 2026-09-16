/* oxlint-disable next/no-img-element -- These are the original generated artwork files. */
import type { Metadata } from 'next';
import '../antibalas-studies/studies.css';

export const metadata: Metadata = {
  title: 'Antibalas — Anti 3 Color Comparison | Philip Di Fiore',
};

const studies = [
  { option: '3', title: 'Original Anti 3', subject: 'Magenta / Emerald', image: 'antibalas-anti-3.webp', ground: '#075345' },
  { option: '3-cyan-coral', title: 'Cyan / Coral', subject: 'Option 1', image: 'antibalas-anti-3-cyan-coral.webp', ground: '#087a83' },
  { option: '3-violet-citron', title: 'Violet / Citron', subject: 'Option 2', image: 'antibalas-anti-3-violet-citron.webp', ground: '#421b7c' },
  { option: '3-amber-oxblood', title: 'Amber / Oxblood', subject: 'Option 3', image: 'antibalas-anti-3-amber-oxblood.webp', ground: '#6b1d25' },
];
const site = '/?header=bold&info=bold&layout=stacked';

export default function AntibalasColorStudies() {
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
        <p>Anti 3 — Color comparison</p>
      </div>
      <section className="anti-review-grid" aria-label="Original Anti 3 artwork and three color alternatives">
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

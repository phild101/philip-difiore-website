/* oxlint-disable next/no-img-element -- These are the original generated artwork files. */
import type { Metadata } from 'next';
import '../antibalas-studies/studies.css';

export const metadata: Metadata = {
  title: 'Antibalas — Anti 3 Photographic Studies | Philip Di Fiore',
};

const studies = [
  { option: '3', title: 'Magenta / Emerald', subject: 'Saved', image: 'antibalas-anti-3.webp', ground: '#075345' },
  { option: '3-photo-original', title: 'Magenta / Emerald', subject: 'New', image: 'antibalas-anti-3-photo-original.webp', ground: '#075345' },
  { option: '3-cyan-coral', title: 'Cyan / Coral', subject: 'Saved', image: 'antibalas-anti-3-cyan-coral.webp', ground: '#087a83' },
  { option: '3-photo-cyan', title: 'Cyan / Coral', subject: 'New', image: 'antibalas-anti-3-photo-cyan.webp', ground: '#087a83' },
  { option: '3-amber-oxblood', title: 'Amber / Oxblood', subject: 'Saved', image: 'antibalas-anti-3-amber-oxblood.webp', ground: '#6b1d25' },
  { option: '3-photo-amber', title: 'Amber / Oxblood', subject: 'New', image: 'antibalas-anti-3-photo-amber.webp', ground: '#6b1d25' },
];
const site = '/?header=bold&info=bold&layout=stacked';

export default function AntibalasPhotoStudies() {
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
        <p>Anti 3 — Photographic studies</p>
      </div>
      <section className="anti-review-grid" aria-label="Three saved color treatments paired with new photographic versions">
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

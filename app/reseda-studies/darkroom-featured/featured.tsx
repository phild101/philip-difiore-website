'use client';
/* oxlint-disable next/no-img-element -- These photographs are original portfolio assets. */
import { useEffect, useState } from 'react';
import { artworks, type Artwork } from '../../artworks/data';
import { Screening } from '../../studies/screening';
import { PressFilmstrip } from './press';
import './featured.css';
const featuredFilms = [5, 0];
const archiveOrder = [5, 0, 2, 1, 3, 4, 6, 7];
type View = 'featured' | 'about' | 'archive';
function hashView(): View {
  const hash = window.location.hash.slice(1);
  return hash === 'about' || hash === 'archive' ? hash : 'featured';
}
function ProjectName({ index }: { index: number }) {
  return (
    <h2>
      {index === 0 ? (
        <>
          SHARON JONES
          <br />& THE
          <br />
          DAP-KINGS
        </>
      ) : (
        <>
          OLD
          <br />
          FRIEND
        </>
      )}
    </h2>
  );
}
export function DarkroomFeatured({ preview = false }: { preview?: boolean }) {
  const [view, setView] = useState<View>('featured');
  const [index, setIndex] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const [film, setFilm] = useState<Artwork | null>(null);
  const [turn, setTurn] = useState(0);
  useEffect(() => {
    if (preview) return;
    function changeView() {
      setView(hashView());
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
    changeView();
    window.addEventListener('hashchange', changeView);
    for (const n of featuredFilms) {
      const photo = new Image();
      photo.src = '/images/' + artworks[n].image;
    }
    return () => window.removeEventListener('hashchange', changeView);
  }, [preview]);
  useEffect(() => {
    if (previous === null) return;
    const timer = window.setTimeout(() => setPrevious(null), 720);
    return () => window.clearTimeout(timer);
  }, [previous]);
  function next() {
    if (previous !== null) return;
    setPrevious(index);
    setIndex((value) => (value + 1) % featuredFilms.length);
    setTurn((value) => value + 1);
  }
  function slide(n: number, exiting = false) {
    const work = artworks[featuredFilms[n]];
    return (
      <div
        className={
          'df-slide' +
          (exiting ? ' df-slide-exit' : turn ? ' df-slide-enter' : '')
        }
        key={exiting ? 'previous' : turn}
        aria-hidden={exiting ? true : undefined}
        inert={exiting ? true : undefined}
      >
        <button
          className={
            'dr-print df-print ' + (n === 0 ? 'dr-lead-print' : 'dr-red-print')
          }
          onClick={() => setFilm(work)}
          aria-label={'Watch ' + work.title}
        >
          <span className="dr-print-image">
            <img
              src={'/images/' + work.image}
              alt={work.title + ' — ' + work.artist}
              loading="eager"
            />
          </span>
          <span className="dr-print-edge" aria-hidden="true" />
        </button>
        <div className="df-project-name">
          <ProjectName index={n} />
        </div>
      </div>
    );
  }
  return (
    <div className={'darkroom df-site' + (preview ? ' df-preview' : '')}>
      <div className="dr-room">
        <header className="dr-nav df-nav">
          <nav aria-label="Main navigation">
            {(['featured', 'about', 'archive'] as View[]).map((item) => (
              <a
                href={'#' + item}
                key={item}
                aria-current={view === item ? 'page' : undefined}
              >
                {item}
              </a>
            ))}
          </nav>
        </header>
        <h1 className="dr-masthead df-masthead">
          <span className="dr-given-name">PHILIP</span>{' '}
          <span className="dr-family-name">DI FIORE</span>
        </h1>
        {view === 'featured' && (
          <section
            className="df-featured"
            id={preview ? undefined : 'featured'}
            aria-label="Featured films"
          >
            {previous !== null && slide(previous, true)}
            {slide(index)}
            <span className="sr-only" aria-live="polite" aria-atomic="true">
              {artworks[featuredFilms[index]].artist}:{' '}
              {artworks[featuredFilms[index]].title}
            </span>
            <button
              className="df-next"
              onClick={next}
              aria-disabled={previous !== null}
              aria-label={
                'Next project: ' +
                artworks[featuredFilms[(index + 1) % featuredFilms.length]]
                  .title
              }
            >
              <svg viewBox="0 0 120 200" fill="none" aria-hidden="true">
                <path
                  d="M18 12 104 100 18 188"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </button>
          </section>
        )}
        {view === 'about' && (
          <section
            className="df-about"
            id="about"
            aria-label="About Philip Di Fiore"
          >
            <div className="df-about-grid">
              <figure className="df-portrait">
                <img
                  src="/images/phil-2026.jpg"
                  alt="Philip Di Fiore in red darkroom light"
                />
              </figure>
              <div className="df-bio">
                <h2>ABOUT</h2>
                <p>
                  Philip Di Fiore is an award-winning filmmaker and writer known
                  for his cinematic storytelling style.
                </p>
                <p>
                  He founded and operated a 4000 sq. ft recording and film
                  studio in Brooklyn, NY (The Rumpus Room) and has produced
                  music albums and film scores.
                </p>
                <p>
                  In addition to directing, he is currently writing screenplays
                  and building A.I. creative tools (and attempting to learn
                  Italian).
                </p>
              </div>
            </div>
            <PressFilmstrip
              watch={(work) =>
                setFilm({
                  title: work.title,
                  vimeo: work.vimeo,
                  artist: 'Philip Di Fiore',
                  image: '',
                })
              }
            />
          </section>
        )}
        {view === 'archive' && (
          <section
            className="dr-contact df-archive"
            id="archive"
            aria-labelledby="df-archive-title"
          >
            <div className="dr-section-heading">
              <h2 id="df-archive-title">CONTACT SHEET</h2>
              <span>08 FILMS</span>
            </div>
            <div className="dr-contact-board">
              {archiveOrder.map((n, i) => (
                <button
                  className="dr-contact-frame"
                  key={n}
                  onClick={() => setFilm(artworks[n])}
                  aria-label={'Watch ' + artworks[n].title}
                >
                  <span className="dr-contact-photo">
                    <img
                      src={'/images/' + artworks[n].image}
                      alt={artworks[n].title + ' — ' + artworks[n].artist}
                      loading="eager"
                    />
                  </span>
                  <span className="dr-contact-edge">
                    <span>{String(i + 1).padStart(2, '0')}</span>
                    <span aria-hidden="true">↗</span>
                  </span>
                </button>
              ))}
            </div>
          </section>
        )}
      </div>
      {!preview && <Screening work={film} close={() => setFilm(null)} />}
    </div>
  );
}

'use client';
/* oxlint-disable next/no-img-element -- These photographs are original portfolio assets. */
import { Fragment, useEffect, useState } from 'react';
import type { Artwork } from '../../artworks/data';
import {
  overprintProjects,
  darkroomProjects,
  overprintArchive,
  darkroomArchive,
  type FeaturedWork,
} from '../overprint/projects';
import { Screening } from '../../studies/screening';
import { PressArticle, PressFilmstrip } from './press';
import { pressItems, type PressItem, type PressFilm } from './press-data';
import {
  chromaticProperties,
  featuredPoster,
  type OverprintEdition,
} from '../overprint/chromatic';
import { sequenceCategories } from '../overprint-sequence/categories';
import './featured.css';
type View = 'featured' | 'about' | 'archive';
function hashView(): View {
  const hash = window.location.hash.slice(1);
  return hash === 'about' || hash === 'archive' ? hash : 'featured';
}
function ProjectName({ lines }: { lines: string[] }) {
  return (
    <h2>
      {lines.map((line, i) => (
        <Fragment key={i + '-' + line}>
          {i > 0 && <br />}
          {line}
        </Fragment>
      ))}
    </h2>
  );
}
export function DarkroomFeatured({
  preview = false,
  treatment = 'darkroom',
  edition = 'original',
}: {
  preview?: boolean;
  treatment?: 'darkroom' | 'overprint';
  edition?: OverprintEdition;
}) {
  const chromatic = treatment === 'overprint' && edition === 'chromatic';
  const sequence = treatment === 'overprint' && edition === 'sequence';
  const projects =
    treatment === 'overprint' ? overprintProjects : darkroomProjects;
  const archive =
    treatment === 'overprint' ? overprintArchive : darkroomArchive;
  const [view, setView] = useState<View>('featured');
  const [index, setIndex] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const [film, setFilm] = useState<Artwork | null>(null);
  const [article, setArticle] = useState<PressItem | null>(null);
  const [turn, setTurn] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  useEffect(() => {
    if (preview) return;
    function changeView() {
      const nextView = hashView();
      setView(nextView);
      if (treatment === 'overprint' && nextView === 'featured') {
        const slug = window.location.hash.slice(1).split('/')[1];
        const selected = overprintProjects.findIndex(
          (project) => project.slug === slug,
        );
        setIndex(selected >= 0 ? selected : 0);
      }
      setPrevious(null);
      setTurn(0);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
    changeView();
    window.addEventListener('hashchange', changeView);
    window.addEventListener('popstate', changeView);
    return () => {
      window.removeEventListener('hashchange', changeView);
      window.removeEventListener('popstate', changeView);
    };
  }, [preview, treatment]);
  useEffect(() => {
    if (preview) return;
    for (const offset of sequence ? [1, -1] : [1]) {
      const nextProject =
        projects[(index + offset + projects.length) % projects.length];
      const photo = new Image();
      photo.src =
        treatment === 'overprint'
          ? featuredPoster(nextProject, edition)
          : '/images/' + nextProject.work.image;
    }
  }, [index, preview, treatment, projects, edition, sequence]);
  useEffect(() => {
    if (previous === null) return;
    const timer = window.setTimeout(
      () => setPrevious(null),
      sequence ? 320 : 720,
    );
    return () => window.clearTimeout(timer);
  }, [previous, sequence]);
  function move(step: 1 | -1) {
    if (previous !== null) return;
    setDirection(step);
    setPrevious(index);
    const nextIndex = (index + step + projects.length) % projects.length;
    setIndex(nextIndex);
    if (treatment === 'overprint')
      window.history.pushState(
        null,
        '',
        '#featured/' + projects[nextIndex].slug,
      );
    setTurn((value) => value + 1);
  }
  function openWork(work: FeaturedWork) {
    if ('articleSlug' in work) {
      setArticle(
        pressItems.find((item) => item.slug === work.articleSlug) ?? null,
      );
    } else {
      setFilm(work);
    }
  }
  function watchPressFilm(work: PressFilm) {
    setFilm({
      title: work.title,
      vimeo: work.vimeo,
      artist: 'Philip Di Fiore',
      image: '',
    });
  }
  function slide(n: number, exiting = false) {
    const project = projects[n];
    const work = project.work;
    return (
      <div
        className={
          'df-slide' +
          (exiting ? ' df-slide-exit' : turn ? ' df-slide-enter' : '') +
          (treatment === 'overprint'
            ? ' op-layout-' + project.composition + ' op-film-' + project.slug
            : '')
        }
        key={exiting ? 'previous' : turn}
        style={chromatic ? chromaticProperties(project.slug) : undefined}
        aria-hidden={exiting ? true : undefined}
        inert={exiting ? true : undefined}
      >
        <button
          className={
            'dr-print df-print ' + (n === 0 ? 'dr-lead-print' : 'dr-red-print')
          }
          onClick={() => openWork(work)}
          aria-label={('articleSlug' in work ? 'Open ' : 'Watch ') + work.title}
        >
          <span className="dr-print-image">
            <img
              src={
                treatment === 'overprint'
                  ? featuredPoster(project, edition)
                  : '/images/' + work.image
              }
              alt={work.title + ' — ' + work.artist}
              loading="eager"
            />
          </span>
          <span className="dr-print-edge" aria-hidden="true" />
        </button>
        <div className="df-project-name">
          <ProjectName lines={project.heading} />
        </div>
      </div>
    );
  }
  return (
    <div
      style={chromatic ? chromaticProperties(projects[index].slug) : undefined}
      className={
        'darkroom df-site' +
        (chromatic ? ' op-chromatic' : '') +
        (sequence
          ? ' op-sequence' + (direction === -1 ? ' sq-backwards' : '')
          : '') +
        (preview ? ' df-preview' : '') +
        (treatment === 'overprint'
          ? ' op-site op-' +
            view +
            ' op-' +
            projects[index].palette +
            ' op-project-' +
            projects[index].slug
          : '')
      }
    >
      <div className="dr-room">
        <header className="dr-nav df-nav">
          <nav aria-label="Main navigation">
            {(['featured', 'about', 'archive'] as View[]).map((item) => (
              <a
                href={
                  item === 'featured' && treatment === 'overprint'
                    ? '#featured/' + projects[index].slug
                    : '#' + item
                }
                key={item}
                aria-current={view === item ? 'page' : undefined}
              >
                {item}
              </a>
            ))}
          </nav>
        </header>
        {sequence ? (
          <h1
            className={
              view === 'featured'
                ? 'dr-masthead df-masthead sq-category'
                : 'sr-only'
            }
          >
            <span className="dr-family-name">
              {view === 'featured'
                ? sequenceCategories[projects[index].slug]
                : view === 'about'
                  ? 'About'
                  : 'Archive'}
            </span>
          </h1>
        ) : (
          <h1 className="dr-masthead df-masthead">
            <span className="dr-given-name">PHILIP</span>{' '}
            <span className="dr-family-name">DI FIORE</span>
          </h1>
        )}
        {view === 'featured' && (
          <section
            className="df-featured"
            id={preview ? undefined : 'featured'}
            aria-label={
              treatment === 'overprint' ? 'Featured works' : 'Featured films'
            }
          >
            {sequence ? (
              <div className="sq-stage">
                {previous !== null && slide(previous, true)}
                {slide(index)}
              </div>
            ) : (
              <>
                {previous !== null && slide(previous, true)}
                {slide(index)}
              </>
            )}
            <span className="sr-only" aria-live="polite" aria-atomic="true">
              {projects[index].work.artist}: {projects[index].work.title}
            </span>
            {sequence ? (
              <nav className="sq-controls" aria-label="Featured navigation">
                {([-1, 1] as const).map((step) => (
                  <button
                    className={'sq-arrow' + (step === -1 ? ' sq-previous' : '')}
                    key={step}
                    onClick={() => move(step)}
                    aria-disabled={previous !== null}
                    aria-label={
                      (step === -1 ? 'Previous project: ' : 'Next project: ') +
                      projects[
                        (index + step + projects.length) % projects.length
                      ].work.title
                    }
                  >
                    <svg viewBox="0 0 120 200" fill="none" aria-hidden="true">
                      <path
                        d="M18 12 104 100 18 188"
                        stroke="currentColor"
                        strokeWidth="5"
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                  </button>
                ))}
              </nav>
            ) : (
              <button
                className="df-next"
                onClick={() => move(1)}
                aria-disabled={previous !== null}
                aria-label={
                  'Next project: ' +
                  projects[(index + 1) % projects.length].work.title
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
            )}
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
                  src={
                    treatment === 'overprint'
                      ? '/images/overprint/philip.png'
                      : '/images/phil-2026.jpg'
                  }
                  alt={
                    treatment === 'overprint'
                      ? 'Philip Di Fiore — photographic collage'
                      : 'Philip Di Fiore in red darkroom light'
                  }
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
            <PressFilmstrip watch={watchPressFilm} />
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
              <span>
                {String(archive.length).padStart(2, '0')}{' '}
                {treatment === 'overprint' ? 'WORKS' : 'FILMS'}
              </span>
            </div>
            <div className="dr-contact-board">
              {archive.map((work, i) => (
                <button
                  className="dr-contact-frame"
                  key={work.image}
                  onClick={() => openWork(work)}
                  aria-label={
                    ('articleSlug' in work ? 'Open ' : 'Watch ') + work.title
                  }
                >
                  <span className="dr-contact-photo">
                    <img
                      src={'/images/' + work.image}
                      alt={work.title + ' — ' + work.artist}
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
      {!preview && (
        <>
          <Screening work={film} close={() => setFilm(null)} />
          <PressArticle
            article={article}
            close={() => setArticle(null)}
            watch={watchPressFilm}
          />
        </>
      )}
    </div>
  );
}

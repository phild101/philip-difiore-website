'use client';
/* oxlint-disable next/no-img-element -- These photographs are original portfolio assets. */
import {
  Fragment,
  useEffect,
  useState,
  type ReactNode,
  type CSSProperties,
} from 'react';
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
import {
  sequencePaletteProjects,
  sequenceArchive,
  type RivalPalette,
} from '../overprint-sequence/projects';
import {
  centeredCityProjects,
  centeredArchive,
  type CityOption,
} from '../overprint-centered/projects';
import './featured.css';
function CompositionScale({
  enabled,
  children,
}: {
  enabled: boolean;
  children: ReactNode;
}) {
  return enabled ? (
    <div className="ps-scaled-composition">{children}</div>
  ) : (
    children
  );
}
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
function artworkRatio(slug: string, ratio?: number) {
  if (ratio) return ratio;
  if (slug === 'i-learned-the-hard-way' || slug === 'game-gets-old')
    return 1072 / 1467;
  if (slug === 'diiv') return 1058 / 1487;
  if (slug === 'rdgldgrn' || slug === 'antibalas') return 1073 / 1466;
  return 4 / 5;
}
const categoryAdvance = {
  FILM: 2.415,
  VIDEO: 3.185,
  LIVE: 2.304,
  MUSIC: 3.351,
};
export function DarkroomFeatured({
  preview = false,
  reduced = false,
  treatment = 'darkroom',
  edition = 'original',
  fitScreen = false,
  fluid = false,
  posterLayout,
}: {
  preview?: boolean;
  reduced?: boolean;
  treatment?: 'darkroom' | 'overprint';
  edition?: OverprintEdition;
  fitScreen?: boolean;
  fluid?: boolean;
  posterLayout?: 'vertical' | 'horizontal' | 'centered';
}) {
  const horizontal = posterLayout === 'horizontal';
  const centered = posterLayout === 'centered';
  const chromatic = treatment === 'overprint' && edition === 'chromatic';
  const sequence = treatment === 'overprint' && edition === 'sequence';
  const [rivalPalette, setRivalPalette] = useState<RivalPalette>('uganda');
  const [cityOption, setCityOption] = useState<CityOption>('vertigo');
  const projects = sequence
    ? (centered ? centeredCityProjects[cityOption] : sequencePaletteProjects)[
        rivalPalette
      ]
    : treatment === 'overprint'
      ? overprintProjects
      : darkroomProjects;
  const archive = sequence
    ? centered
      ? centeredArchive
      : sequenceArchive
    : treatment === 'overprint'
      ? overprintArchive
      : darkroomArchive;
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
      const city = new URLSearchParams(window.location.search).get('city');
      setCityOption(
        city === 'night-glass' || city === 'original' ? city : 'vertigo',
      );
      setRivalPalette(
        new URLSearchParams(window.location.search).get('rival') === 'vivid'
          ? 'vivid'
          : 'uganda',
      );
      const nextView = horizontal ? 'featured' : hashView();
      setView(nextView);
      if (treatment === 'overprint' && nextView === 'featured') {
        const slug = window.location.hash.slice(1).split('/')[1];
        const selected = projects.findIndex((project) => project.slug === slug);
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
  }, [preview, treatment, projects, horizontal]);
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
  const currentCategory = sequenceCategories[projects[index].slug];
  const navigationIndices = projects.flatMap((project, projectIndex) =>
    !horizontal || sequenceCategories[project.slug] === currentCategory
      ? [projectIndex]
      : [],
  );
  function adjacentIndex(step: 1 | -1) {
    const position = navigationIndices.indexOf(index);
    return navigationIndices[
      (position + step + navigationIndices.length) % navigationIndices.length
    ];
  }
  function move(step: 1 | -1) {
    if (previous !== null || navigationIndices.length < 2) return;
    setDirection(step);
    setPrevious(index);
    const nextIndex = adjacentIndex(step);
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
    const print = (
      <>
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
          {fluid ? (
            <h2>
              {(project.slug === 'buffalo-hunt'
                ? ['THE BUFFALO HUNT']
                : project.heading
              ).map((line, lineIndex) => (
                <span
                  className={'fl-title-line fl-title-line-' + lineIndex}
                  key={lineIndex + '-' + line}
                >
                  {line}
                </span>
              ))}
            </h2>
          ) : (
            <ProjectName lines={project.heading} />
          )}
        </div>
      </>
    );
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
        {fluid ? (
          <div
            className="fl-print-group"
            style={
              {
                '--fl-art-ratio': artworkRatio(
                  project.slug,
                  project.aspectRatio,
                ),
              } as CSSProperties
            }
          >
            {print}
          </div>
        ) : (
          print
        )}
      </div>
    );
  }
  const site = (
    <div
      style={
        chromatic
          ? chromaticProperties(projects[index].slug)
          : fluid || posterLayout
            ? ({
                '--fl-art-ratio': artworkRatio(
                  projects[index].slug,
                  projects[index].aspectRatio,
                ),
                '--fl-word-advance':
                  categoryAdvance[sequenceCategories[projects[index].slug]],
              } as CSSProperties)
            : undefined
      }
      className={
        'darkroom df-site' +
        (chromatic ? ' op-chromatic' : '') +
        (sequence
          ? ' op-sequence' + (direction === -1 ? ' sq-backwards' : '')
          : '') +
        (preview ? ' df-preview' : '') +
        (sequence && fitScreen ? ' op-screen-fit' : '') +
        (sequence && fluid ? ' op-fluid' : '') +
        (posterLayout ? ' op-poster op-' + posterLayout : '') +
        (centered && cityOption !== 'original'
          ? ' op-city-' + cityOption
          : '') +
        (reduced ? ' op-reduced' : '') +
        (sequence && rivalPalette === 'uganda' ? ' op-rival-uganda' : '') +
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
          {sequence && (
            <a
              className="sq-home"
              href="#featured/if-you-call"
              aria-label="Philip Di Fiore — Home"
            >
              PHILIP DI FIORE
            </a>
          )}
          {!horizontal && (
            <nav aria-label="Main navigation">
              {(
                (centered
                  ? ['about', 'featured']
                  : ['featured', 'about', 'archive']) as View[]
              ).map((item) => (
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
              {centered && <a href="mailto:phild101@gmail.com">Contact</a>}
            </nav>
          )}
        </header>
        {sequence ? (
          view !== 'featured' && (
            <h1
              id={view === 'archive' ? 'sq-archive-title' : undefined}
              className={
                view === 'archive' ? 'dr-masthead df-masthead' : 'sr-only'
              }
            >
              <span className="dr-family-name">
                {view === 'archive' ? 'ARCHIVE' : 'About'}
              </span>
            </h1>
          )
        ) : (
          <h1 className="dr-masthead df-masthead">
            <span className="dr-given-name">PHILIP</span>{' '}
            <span className="dr-family-name">DI FIORE</span>
          </h1>
        )}
        {view === 'featured' && (
          <CompositionScale enabled={reduced}>
            <div className={fitScreen ? 'sq-fit-area' : 'sq-flow-area'}>
              <section
                className="df-featured"
                id={preview ? undefined : 'featured'}
                aria-label={
                  treatment === 'overprint'
                    ? 'Featured works'
                    : 'Featured films'
                }
              >
                {sequence ? (
                  <>
                    {horizontal ? (
                      <nav
                        className="ps-category-menu df-masthead"
                        aria-label="Project categories"
                      >
                        {(['FILM', 'VIDEO', 'MUSIC', 'LIVE'] as const).map(
                          (category) => {
                            const first = projects.find(
                              (project) =>
                                sequenceCategories[project.slug] === category,
                            )!;
                            return (
                              <a
                                key={category}
                                href={'#featured/' + first.slug}
                                aria-current={
                                  currentCategory === category
                                    ? 'page'
                                    : undefined
                                }
                                style={
                                  {
                                    '--ps-condense': Math.min(
                                      1,
                                      categoryAdvance.FILM /
                                        categoryAdvance[category],
                                    ),
                                  } as CSSProperties
                                }
                              >
                                <span>{category}</span>
                              </a>
                            );
                          },
                        )}
                      </nav>
                    ) : (
                      <h1 className="dr-masthead df-masthead sq-category">
                        <span className="dr-family-name">
                          {sequenceCategories[projects[index].slug]}
                        </span>
                      </h1>
                    )}
                    <div className="sq-stage">
                      {previous !== null && slide(previous, true)}
                      {slide(index)}
                    </div>
                  </>
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
                  <div
                    className="sq-control-rail"
                    hidden={horizontal && navigationIndices.length < 2}
                  >
                    <nav
                      className="sq-controls"
                      aria-label="Featured navigation"
                    >
                      {([-1, 1] as const).map((step) => (
                        <button
                          className={
                            'sq-arrow' + (step === -1 ? ' sq-previous' : '')
                          }
                          key={step}
                          onClick={() => move(step)}
                          aria-disabled={previous !== null}
                          aria-label={
                            (step === -1
                              ? 'Previous project: '
                              : 'Next project: ') +
                            projects[adjacentIndex(step)].work.title
                          }
                        >
                          <svg
                            viewBox="0 0 120 200"
                            fill="none"
                            aria-hidden="true"
                          >
                            {centered ? (
                              <path
                                d="M3 4H57L117 94V106L57 196H3L64 100Z"
                                fill="currentColor"
                              />
                            ) : posterLayout ? (
                              <path
                                d="M17 11 40 8 110 96 107 107 38 193 15 186 13 171 76 100 14 29Z"
                                fill="currentColor"
                                stroke="#132323"
                                strokeWidth="4"
                                strokeLinejoin="bevel"
                              />
                            ) : (
                              <path
                                d="M18 12 104 100 18 188"
                                stroke="currentColor"
                                strokeWidth="5"
                                vectorEffect="non-scaling-stroke"
                              />
                            )}
                          </svg>
                        </button>
                      ))}
                    </nav>
                  </div>
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
            </div>
          </CompositionScale>
        )}
        {view === 'about' && (
          <section
            className="df-about"
            id="about"
            aria-label="About Philip Di Fiore"
          >
            <div className="df-about-grid">
              {!centered && (
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
              )}
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
            aria-labelledby={sequence ? 'sq-archive-title' : 'df-archive-title'}
          >
            <div className="dr-section-heading">
              {!sequence && <h2 id="df-archive-title">CONTACT SHEET</h2>}
              <span>
                {String(archive.length).padStart(2, '0')}{' '}
                {treatment === 'overprint' ? 'WORKS' : 'FILM'}
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
          <Screening
            work={film}
            close={() => setFilm(null)}
            fullscreen={!!posterLayout}
          />
          <PressArticle
            article={article}
            fullscreen={!!posterLayout}
            close={() => setArticle(null)}
            watch={watchPressFilm}
          />
        </>
      )}
    </div>
  );
  return sequence && fitScreen && view === 'featured' ? (
    <div className={'sf-fit-viewport' + (preview ? ' sf-fit-preview' : '')}>
      <div className="sf-fit-frame">{site}</div>
    </div>
  ) : (
    site
  );
}

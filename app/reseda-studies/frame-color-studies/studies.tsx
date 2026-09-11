'use client';
/* oxlint-disable next/no-img-element -- The mockups retain the original artwork. */
import { Fragment, useEffect, useState, type CSSProperties } from 'react';
import { sequencePaletteProjects } from '../overprint-sequence/projects';
import { sequenceCategories } from '../overprint-sequence/categories';
import { featuredPoster } from '../overprint/chromatic';
import './mockup-base.css';
import './studies.css';

const studies = [
  {
    slug: 'stranger',
    title: 'Stranger',
    palette: 'Cobalt from the blue stripe',
    ground: '#014FA8',
    ink: '#F6DCB7',
  },
  {
    slug: 'recording-parties',
    title: 'Recording Parties',
    palette: 'Turquoise from the torn paper',
    ground: '#02A09E',
    ink: '#000000',
  },
  {
    slug: 'buffalo-hunt',
    title: 'Buffalo Hunt',
    palette: 'Yellow from the triangular accent',
    ground: '#F1D53F',
    ink: '#0C1215',
  },
  {
    slug: 'young-trouble',
    title: 'Young Trouble',
    palette: 'Orange from the light trails',
    ground: '#F92F02',
    ink: '#000000',
  },
  {
    slug: 'naomi-shelton',
    title: 'Naomi Shelton',
    palette: 'Ink blue from the portrait shadows',
    ground: '#101724',
    ink: '#F7E5C2',
  },
];
const livePath = '/reseda-studies/overprint-centered';

export function FrameColorStudies() {
  const [index, setIndex] = useState(0);
  const [proposed, setProposed] = useState(true);
  useEffect(() => {
    const sync = () => {
      const slug = window.location.hash.slice(1);
      const selected = studies.findIndex((study) => study.slug === slug);
      setIndex(selected < 0 ? 0 : selected);
    };
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);
  const study = studies[index];
  const project = sequencePaletteProjects.uganda.find(
    (p) => p.slug === study.slug,
  )!;
  const next = studies[(index + 1) % studies.length];
  const paletteStyle = {
    '--fl-art-ratio': 4 / 5,
    ...(proposed
      ? {
          '--fc-ground': study.ground,
          '--fc-ink': study.ink,
          '--cf-frame-ink': study.ink,
        }
      : {}),
  } as CSSProperties;
  return (
    <main className={'fc-review' + (proposed ? ' fc-proposed' : '')}>
      <div className="fc-review-toolbar">
        <div className="fc-review-label">
          Color studies — Round 2{' '}
          <span>Colors from the artwork · Review only</span>
        </div>
        <nav className="fc-projects" aria-label="Color mockups">
          {studies.map((item) => (
            <a
              key={item.slug}
              href={'#' + item.slug}
              aria-current={item.slug === study.slug ? 'page' : undefined}
            >
              {item.title}
            </a>
          ))}
        </nav>
        <div
          className="fc-compare"
          role="group"
          aria-label="Compare frame colors"
        >
          <button aria-pressed={!proposed} onClick={() => setProposed(false)}>
            Current
          </button>
          <button aria-pressed={proposed} onClick={() => setProposed(true)}>
            Round 2
          </button>
        </div>
      </div>
      <div className="fc-palette-caption" aria-live="polite">
        {proposed && (
          <span
            className="fc-swatch"
            style={{ background: study.ground }}
            aria-hidden="true"
          />
        )}
        {study.title} · {proposed ? study.palette : 'Current frame color'}
      </div>
      <div
        style={paletteStyle}
        className={
          'darkroom df-site op-site op-sequence op-poster op-centered op-featured op-' +
          project.palette +
          ' op-project-' +
          project.slug
        }
      >
        <div className="dr-room">
          <header className="dr-nav df-nav">
            <a className="sq-home" href={livePath + '#featured/if-you-call'}>
              PHILIP DI FIORE
            </a>
            <nav aria-label="Main navigation">
              <a href={livePath + '#about'}>About</a>
              <a
                href={livePath + '#featured/' + study.slug}
                aria-current="page"
              >
                Featured
              </a>
              <a href="mailto:phild101@gmail.com">Contact</a>
            </nav>
          </header>
          <div className="sq-flow-area">
            <section
              className="df-featured"
              aria-label={study.title + ' color mockup'}
            >
              <h1 className="dr-masthead df-masthead sq-category">
                <span className="dr-family-name">
                  {sequenceCategories[study.slug]}
                </span>
              </h1>
              <div className="sq-stage">
                <div
                  className={
                    'df-slide op-layout-' +
                    project.composition +
                    ' op-film-' +
                    project.slug
                  }
                >
                  <div className="dr-print df-print dr-red-print">
                    <span className="dr-print-image">
                      <img
                        src={featuredPoster(project, 'sequence')}
                        alt={project.work.title + ' — ' + project.work.artist}
                      />
                    </span>
                    <span className="dr-print-edge" aria-hidden="true" />
                  </div>
                  <div className="df-project-name">
                    <h2>
                      {project.heading.map((line, i) => (
                        <Fragment key={line}>
                          {i > 0 && <br />}
                          {line}
                        </Fragment>
                      ))}
                    </h2>
                  </div>
                </div>
              </div>
              <div className="sq-control-rail">
                <nav
                  className="sq-controls"
                  aria-label="Color study navigation"
                >
                  <a
                    href={'#' + next.slug}
                    className="sq-arrow"
                    aria-label={'Next color mockup: ' + next.title}
                  >
                    <svg viewBox="0 0 120 200" fill="none" aria-hidden="true">
                      <path
                        d="M3 4H57L117 94V106L57 196H3L64 100Z"
                        fill="currentColor"
                      />
                    </svg>
                  </a>
                </nav>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

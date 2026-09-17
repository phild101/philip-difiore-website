'use client';

import { useEffect, useState } from 'react';
import type { Artwork } from '../../artworks/data';
import { isMusicProject } from '../../music/projects';
import { RecordingParties } from '../../music/recording-parties/listening';
import { InfoPage } from '../../reseda-studies/overprint-centered/info';
import type { FeaturedProject } from '../../reseda-studies/overprint/projects';
import { pressItems, projectLinks, type PressItem, type PressFilm } from '../../reseda-studies/darkroom-featured/press-data';
import { PressArticle } from '../../reseda-studies/darkroom-featured/press';
import '../../reseda-studies/darkroom-featured/featured.css';
import { Screening } from '../../studies/screening';
import { quietProjects, quietPhotograph } from './catalog';
import './quiet.css';

type Section = 'info' | 'film' | 'music';
type Route = { section: Section; slug?: string; listen?: boolean };
const films = quietProjects.filter(project => !isMusicProject(project.slug));
const music = quietProjects.filter(project => isMusicProject(project.slug));
const href = (project: FeaturedProject) => '#' + (isMusicProject(project.slug) ? 'music/' : 'film/') + project.slug;

function readRoute(): Route {
  const [section, slug, action] = window.location.hash.slice(1).split('/');
  if (section !== 'film' && section !== 'music') return { section: 'info' };
  const collection = section === 'film' ? films : music;
  return { section, slug: collection.some(project => project.slug === slug) ? slug : undefined,
    listen: section === 'music' && slug === 'recording-parties' && action === 'listen' };
}

function Navigation({ section }: { section: Section }) {
  return <nav aria-label="Main navigation">
      {(['film', 'music', 'info'] as const).map(item => <a key={item} href={'#' + item} aria-current={section === item ? 'page' : undefined}>{item}</a>)}
    </nav>;
}

function Header({ section }: { section: Section }) {
  return <header className="info-header" data-header-font="bold">
    <a href="#info" aria-label="Philip Di Fiore — Home">Philip Di Fiore</a>
    <Navigation section={section} />
  </header>;
}

function Index({ section, collection }: { section: 'film' | 'music'; collection: FeaturedProject[] }) {
  return <main className="quiet-content quiet-index" aria-label={section === 'film' ? 'Films' : 'Music projects'}>
    <h1>{section === 'film' ? 'Film' : 'Music'}</h1>
    <ul className="quiet-projects">
      {collection.map(project => <li key={project.slug}>
        <a className="quiet-project" href={href(project)}>
          <span className="quiet-project-caption"><span>{project.work.title}</span>{project.work.artist && <span className="quiet-secondary"> — {project.work.artist}</span>}</span>
        </a>
      </li>)}
    </ul>
  </main>;
}

export function QuietEdition() {
  const [route, setRoute] = useState<Route>({ section: 'info' });
  const [film, setFilm] = useState<Artwork | null>(null);
  const [article, setArticle] = useState<PressItem | null>(null);
  const collection = route.section === 'music' ? music : films;
  const project = collection.find(item => item.slug === route.slug);
  const index = project ? collection.indexOf(project) : -1;
  const work = project?.work;
  const articles = work ? pressItems.filter(item => 'articleSlug' in work
    ? item.slug === work.articleSlug
    : 'vimeo' in work && item.videos.some(video => video.vimeo === work.vimeo)) : [];
  const references = project ? projectLinks.filter(item => item.projectSlug === project.slug) : [];

  useEffect(() => {
    const navigate = () => {
      setRoute(readRoute()); setFilm(null); setArticle(null);
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    navigate();
    window.addEventListener('hashchange', navigate);
    window.addEventListener('popstate', navigate);
    return () => { window.removeEventListener('hashchange', navigate); window.removeEventListener('popstate', navigate); };
  }, []);

  useEffect(() => {
    document.title = (project?.work.title || (route.section === 'film' ? 'Film' : route.section === 'music' ? 'Music' : 'Info')) + ' — Philip Di Fiore';
  }, [route.section, project]);

  function playProject() {
    if (!project) return;
    if ('vimeo' in project.work) setFilm(project.work);
  }
  function watchPress(work: PressFilm) {
    setArticle(null);
    setFilm({ title: work.title, vimeo: work.vimeo, artist: 'Philip Di Fiore', image: '' });
  }

  return <div className="quiet-site">
    {route.section === 'info' ? <InfoPage filmSlug="" homeHref="#info" projects={quietProjects} projectImage={quietPhotograph} navigation={<Navigation section="info" />} /> :
      <div className="info-site"><div className="info-frame">
        <Header section={route.section} />
        {route.listen ? <div className="quiet-content quiet-listening">
          <RecordingParties filmSlug="" homeHref="#info" />
          <p className="quiet-back"><a href="#music/recording-parties">Recording Parties</a></p>
        </div> : project ? <main className="quiet-content quiet-detail" aria-label={project.work.title}>
          <div className="quiet-detail-heading"><div><h1>{project.work.title}</h1><p className="quiet-secondary">{project.work.artist}</p></div>
            <a href={'#' + route.section}>All {route.section === 'film' ? 'films' : 'music'}</a>
          </div>
          <figure className={'quiet-photograph' + (route.section === 'music' ? ' quiet-album' : '')}>
            {'vimeo' in project.work ? <button onClick={playProject} aria-label={'Play ' + project.work.title}>
              <img src={quietPhotograph(project)} alt={project.work.title} />
            </button> : project.slug === 'recording-parties' ? <a href="#music/recording-parties/listen" aria-label="Listen to Recording Parties"><img src={quietPhotograph(project)} alt="Musicians recording together at The Rumpus Room" /></a> : <img src={quietPhotograph(project)} alt={project.work.title} />}
          </figure>
          <div className="quiet-project-actions">
            {'vimeo' in project.work && <button onClick={playProject}>Play film</button>}
            {project.slug === 'recording-parties' && <a href="#music/recording-parties/listen">Listen to the recordings</a>}
            {references.filter(item => item.icon).map(item => <a href={item.href} key={item.outlet} target="_blank" rel="noreferrer">{item.outlet}</a>)}
          </div>
          {(articles.length > 0 || references.some(item => !item.icon)) && <section className="quiet-references" aria-label="Press and references">
            <h2>Press &amp; links</h2><div>
              {articles.map(item => <button key={item.slug} onClick={() => setArticle(item)}>{item.outlet}</button>)}
              {references.filter(item => !item.icon).map(item => <a href={item.href} key={item.outlet} target="_blank" rel="noreferrer">{item.outlet}</a>)}
            </div>
          </section>}
          <nav className="quiet-adjacent" aria-label="Project navigation">
            {index > 0 ? <a href={href(collection[index - 1])}>Previous</a> : <span />}
            {index < collection.length - 1 ? <a href={href(collection[index + 1])}>Next</a> : <span />}
          </nav>
        </main> : <Index section={route.section} collection={collection} />}
      </div></div>}
    <PressArticle article={article} close={() => setArticle(null)} watch={watchPress} fullscreen />
    <Screening work={film} close={() => setFilm(null)} fullscreen />
  </div>;
}

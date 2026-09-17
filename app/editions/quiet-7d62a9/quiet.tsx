'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import type { Artwork } from '../../artworks/data';
import { isMusicProject } from '../../music/projects';
import { RecordingParties } from '../../music/recording-parties/listening';
import { InfoPage } from '../../reseda-studies/overprint-centered/info';
import type { FeaturedProject } from '../../reseda-studies/overprint/projects';
import { pressItems, projectLinks, type PressItem, type PressFilm } from '../../reseda-studies/darkroom-featured/press-data';
import { PressArticle } from '../../reseda-studies/darkroom-featured/press';
import '../../reseda-studies/darkroom-featured/featured.css';
import { Screening } from '../../studies/screening';
import { quietProjects, quietPhotograph, quietPhotographSize } from './catalog';
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

function PlayMark() {
  return <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true"><path fill="currentColor" d="M4 2 14 8 4 14Z" /></svg>;
}

export function AustereEdition() {
  const [route, setRoute] = useState<Route>({ section: 'info' });
  const [film, setFilm] = useState<Artwork | null>(null);
  const [article, setArticle] = useState<PressItem | null>(null);
  const screeningTrigger = useRef<HTMLButtonElement>(null);
  const collection = route.section === 'music' ? music : films;
  const project = collection.find(item => item.slug === route.slug);
  const index = project ? collection.indexOf(project) : -1;
  const work = project?.work;
  const photoSize = project ? quietPhotographSize(project) : undefined;
  const picture = project && <img src={quietPhotograph(project)} alt={project.work.title} width={photoSize?.[0]} height={photoSize?.[1]} />;
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
    document.title = (project?.work.title || (route.section === 'film' ? 'Film' : route.section === 'music' ? 'Music' : 'Info')) + ' — Philip Di Fiore · Austere';
  }, [route.section, project]);

  useEffect(() => {
    if (!project || route.listen || film || article) return;
    const navigateProject = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.isComposing || event.repeat || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if (event.target instanceof Element && event.target.closest('input,textarea,select,button,audio,video,[contenteditable],[role="slider"],[role="combobox"],[role="dialog"]')) return;
      const direction = event.key === 'ArrowLeft' ? -1 : event.key === 'ArrowRight' ? 1 : 0;
      const destination = direction && collection[index + direction];
      if (destination) { event.preventDefault(); window.location.hash = href(destination); }
    };
    window.addEventListener('keydown', navigateProject);
    return () => window.removeEventListener('keydown', navigateProject);
  }, [project, route.listen, film, article, collection, index]);

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
          <figure key={project.slug} className={'quiet-photograph' + (route.section === 'music' ? ' quiet-album' : '')} style={photoSize ? { '--quiet-photo-ratio': photoSize[0] / photoSize[1] } as CSSProperties : undefined}>
            {'vimeo' in project.work ? <button ref={screeningTrigger} className="quiet-image-link" onClick={playProject} aria-label={'Play ' + project.work.title}>
              {picture}
              <span className="quiet-image-action"><PlayMark />Play film</span>
            </button> : project.slug === 'recording-parties' ? <a className="quiet-image-link" href="#music/recording-parties/listen" aria-label="Listen to Recording Parties">{picture}<span className="quiet-image-action"><PlayMark />Listen to the recordings</span></a> : picture}
          </figure>
          {references.some(item => item.icon) && <div className="quiet-project-actions">
            {references.filter(item => item.icon).map(item => <a href={item.href} key={item.outlet} target="_blank" rel="noreferrer">{item.outlet}</a>)}
          </div>}
          <nav className="quiet-adjacent" aria-label="Project navigation">
            {index > 0 ? <a href={href(collection[index - 1])} rel="prev" aria-label={'Previous project: ' + collection[index - 1].work.title}><span aria-hidden="true">←</span><span>{collection[index - 1].work.title}</span></a> : <span />}
            <a className="quiet-index-link" href={'#' + route.section}>{route.section === 'film' ? 'Film' : 'Music'} index</a>
            {index < collection.length - 1 ? <a href={href(collection[index + 1])} rel="next" aria-label={'Next project: ' + collection[index + 1].work.title}><span>{collection[index + 1].work.title}</span><span aria-hidden="true">→</span></a> : <span />}
          </nav>
          {(articles.length > 0 || references.some(item => !item.icon)) && <section className="quiet-references" aria-label="Press and references">
            <h2>Press &amp; links</h2><div>
              {articles.map(item => <button key={item.slug} onClick={() => setArticle(item)}>{item.outlet}</button>)}
              {references.filter(item => !item.icon).map(item => <a href={item.href} key={item.outlet} target="_blank" rel="noreferrer">{item.outlet}</a>)}
            </div>
          </section>}
        </main> : <Index section={route.section} collection={collection} />}
      </div></div>}
    <PressArticle article={article} close={() => setArticle(null)} watch={watchPress} fullscreen />
    <Screening work={film} close={() => setFilm(null)} fullscreen finalFocus={screeningTrigger} />
  </div>;
}

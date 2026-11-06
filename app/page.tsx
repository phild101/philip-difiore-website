'use client';
import {useEffect,useState} from 'react';
import {Centered} from './reseda-studies/overprint-centered/centered';
import CollectionOne from './collection-one/collection';
import CollectionTwo from './collection-two/page';
import { AgLanding } from './landing/ag-landing';
import { AgInfo } from './reseda-studies/overprint-centered/ag-info';
import { Library } from './library/library';
import { AdobeKit } from './library/adobe-kit';

// 2026-11-03: the landing (#home) and Info (#info) are the redesign's pages in ITC Avant Garde Gothic.
// 2026-11-05: Film and Music are the stand of Library covers. #film and #music show the stand, and #film/<slug> and
// #music/<slug> open that work above it, so every address of a work stays the same. Every other address keeps the page it
// had: the Recording Parties listening page (#music/recording-parties/listen), the archive and the legacy views.
type View =
  | { kind: 'landing' | 'info' | 'site' }
  | { kind: 'library'; section: 'film' | 'music'; slug: string };

function readView(): View {
  const hash = window.location.hash;
  if (!hash || hash === '#' || hash === '#home') return { kind: 'landing' };
  if (hash === '#info' || hash === '#about') return { kind: 'info' };
  const work = hash.match(/^#(film|music)(?:\/([^/]*))?$/);
  if (work) {
    let slug = '';
    try { slug = decodeURIComponent(work[2] || ''); } catch { slug = ''; }
    return { kind: 'library', section: work[1] as 'film' | 'music', slug };
  }
  return { kind: 'site' };
}

export default function Home() {
  const [legacy, setLegacy] = useState('');
  const [view, setView] = useState<View>({ kind: 'landing' });
  useEffect(() => {
    const read = () => {
      const query = new URLSearchParams(window.location.search);
      setLegacy(query.has('concept') ? 'one' : query.has('room') ? 'two' : '');
      setView(readView());
    };
    read();
    window.addEventListener('hashchange', read);
    window.addEventListener('popstate', read);
    return () => {
      window.removeEventListener('hashchange', read);
      window.removeEventListener('popstate', read);
    };
  }, []);
  if (legacy === 'one') return <CollectionOne />;
  if (legacy === 'two') return <CollectionTwo />;
  return <>
    <AdobeKit />
    {view.kind === 'landing' ? <AgLanding />
      : view.kind === 'info' ? <AgInfo />
      : view.kind === 'library' ? <Library section={view.section} slug={view.slug} />
      : <Centered landingView="info" />}
  </>;
}

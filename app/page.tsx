'use client';
import {useEffect,useState} from 'react';
import {Centered} from './reseda-studies/overprint-centered/centered';
import CollectionOne from './collection-one/collection';
import CollectionTwo from './collection-two/page';
import { AgLanding } from './landing/ag-landing';
import { AgInfo } from './reseda-studies/overprint-centered/ag-info';

// 2026-11-03: the landing (#home) and Info (#info) are the redesign's pages in ITC Avant Garde Gothic; Film, Music, Index and
// the press pages stay as they were, at the same addresses.
type View = 'landing' | 'info' | 'site';

export default function Home() {
  const [legacy, setLegacy] = useState('');
  const [view, setView] = useState<View>('landing');
  useEffect(() => {
    const read = () => {
      const query = new URLSearchParams(window.location.search);
      setLegacy(query.has('concept') ? 'one' : query.has('room') ? 'two' : '');
      const hash = window.location.hash;
      setView(!hash || hash === '#' || hash === '#home' ? 'landing' : hash === '#info' ? 'info' : 'site');
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
  if (view === 'landing') return <AgLanding />;
  if (view === 'info') return <AgInfo />;
  return <Centered landingView="info" />;
}

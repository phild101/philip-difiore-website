'use client';
import {useEffect,useState} from 'react';
import {Centered} from './reseda-studies/overprint-centered/centered';
import CollectionOne from './collection-one/collection';
import CollectionTwo from './collection-two/page';
import { Masthead } from './landing/masthead';

export default function Home() {
  const [legacy, setLegacy] = useState('');
  const [landing, setLanding] = useState(true);
  useEffect(() => {
    const read = () => {
      const query = new URLSearchParams(window.location.search);
      setLegacy(query.has('concept') ? 'one' : query.has('room') ? 'two' : '');
      setLanding(!window.location.hash || window.location.hash === '#' || window.location.hash === '#home');
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
  return landing ? <Masthead /> : <Centered landingView="info" />;
}

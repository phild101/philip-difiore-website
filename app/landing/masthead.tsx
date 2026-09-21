'use client';

import { useEffect } from 'react';
import './masthead.css';

export function Masthead({ sectionPrefix = '' }: { sectionPrefix?: string }) {
  useEffect(() => {
    if (!sectionPrefix) document.title = 'Philip Di Fiore — Film & Music';
  }, [sectionPrefix]);
  return <div className="mh-landing"><main className="mh-page">
    <h1><span>PHILIP</span>{' '}<span>DI FIORE</span></h1>
    <nav aria-label="Site navigation">
      <a href={`${sectionPrefix}#info`}>INFO</a>
      <a href={`${sectionPrefix}#film/in-the-city`}>FILM</a>
      <a href={`${sectionPrefix}#music/recording-parties`}>MUSIC</a>
      <a href="/index/index.html#people-artists">INDEX</a>
    </nav>
  </main></div>;
}

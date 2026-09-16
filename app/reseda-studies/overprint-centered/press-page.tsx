'use client';

import { useEffect, useState } from 'react';
import type { Artwork } from '../../artworks/data';
import { Screening } from '../../studies/screening';
import { PressArticle } from '../darkroom-featured/press';
import { pressItems, type PressItem, type PressFilm } from '../darkroom-featured/press-data';
import { SectionNavigation } from './navigation';
import './info.css';
import './press-page.css';

export function PressPage({ filmSlug }: { filmSlug: string }) {
  const [article, setArticle] = useState<PressItem | null>(null);
  const [film, setFilm] = useState<Artwork | null>(null);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Press — Philip Di Fiore';
    return () => { document.title = previousTitle; };
  }, []);

  function watch(work: PressFilm) {
    setArticle(null);
    setFilm({ title: work.title, vimeo: work.vimeo, artist: 'Philip Di Fiore', image: '' });
  }

  return (
    <div className="info-site press-page">
      <div className="info-frame">
        <header className="info-header">
          <a href="#film/if-you-call" aria-label="Philip Di Fiore — Home">Philip Di Fiore</a>
          <SectionNavigation active="press" filmSlug={filmSlug} />
        </header>
        <main className="press-content" aria-labelledby="press-page-title">
          <h1 id="press-page-title">PRESS</h1>
          <div className="press-grid">
            {pressItems.map(item => (
              <button key={item.slug} className="press-entry" onClick={() => setArticle(item)}
                aria-label={'Read ' + item.outlet + ': ' + item.project}>
                <span className="press-publication">
                  {item.logo ? (
                    <img src={'/press-logos/' + item.logo} alt={item.outlet} />
                  ) : item.outlet}
                </span>
                <span className="press-project">{item.project}</span>
              </button>
            ))}
          </div>
        </main>
      </div>
      <PressArticle article={article} close={() => setArticle(null)} watch={watch} fullscreen />
      <Screening work={film} close={() => setFilm(null)} fullscreen />
    </div>
  );
}

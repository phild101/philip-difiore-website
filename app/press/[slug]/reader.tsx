'use client';

import { useState } from 'react';
import type { Artwork } from '../../artworks/data';
import { Screening } from '../../studies/screening';
import { Centered } from '../../reseda-studies/overprint-centered/centered';
import { PressArticle } from '../../reseda-studies/darkroom-featured/press';
import type { PressItem } from '../../reseda-studies/darkroom-featured/press-data';

// Preserve existing published article URLs in the current site's press reader.
export function LegacyPressReader({ article }: { article: PressItem }) {
  const [film, setFilm] = useState<Artwork | null>(null);
  return <>
    <Centered landingView="info" />
    <PressArticle article={film ? null : article} fullscreen
      close={() => window.location.assign('/#info')}
      watch={work => setFilm({ title: work.title, vimeo: work.vimeo, artist: 'Philip Di Fiore', image: '' })} />
    <Screening work={film} close={() => setFilm(null)} fullscreen />
  </>;
}
